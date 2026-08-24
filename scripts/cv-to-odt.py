"""Render tasks/cv-draft.md into an ODT laid out to design/design_handoff_cv/STYLES.md.

The four RoleHead tiers collapse to three, which STYLES.md allows: RoleHeadFirst keys off a
page break the generator cannot see until the document is paginated.
"""

import html
import re
import struct
import zipfile
import zlib
from pathlib import Path

SOURCE = Path('tasks/cv-draft.md')
OUTPUT = Path('tasks/BenChidgeyCV.odt')

LOGO_GRID = 30
LOGO_SCALE = 16
LOGO_RADIUS = 2


def logo_png():
    """The pixel mark, drawn straight to PNG.

    LibreOffice's SVG import flattens the mark to a bare rectangle, so the shape is rasterised
    here rather than handed over as vector.
    """
    size = LOGO_GRID * LOGO_SCALE
    radius = LOGO_RADIUS * LOGO_SCALE
    blue = bytes.fromhex('3294fc') + b'\xff'
    white = b'\xff\xff\xff\xff'
    clear = b'\x00\x00\x00\x00'
    holes = [(5, 5), (12, 5)]

    def pixel(x, y):
        for hole_x, hole_y in holes:
            left, top = hole_x * LOGO_SCALE, hole_y * LOGO_SCALE
            if left <= x < left + 5 * LOGO_SCALE and top <= y < top + 5 * LOGO_SCALE:
                return white
        corner_x = radius - x if x < radius else x - (size - radius) + 1
        corner_y = radius - y if y < radius else y - (size - radius) + 1
        if corner_x > 0 and corner_y > 0 and corner_x**2 + corner_y**2 > radius**2:
            return clear
        return blue

    rows = b''.join(
        b'\x00' + b''.join(pixel(x, y) for x in range(size)) for y in range(size)
    )

    def chunk(tag, data):
        return (
            struct.pack('>I', len(data))
            + tag
            + data
            + struct.pack('>I', zlib.crc32(tag + data))
        )

    return (
        b'\x89PNG\r\n\x1a\n'
        + chunk(b'IHDR', struct.pack('>IIBBBBB', size, size, 8, 6, 0, 0, 0))
        + chunk(b'IDAT', zlib.compress(rows, 9))
        + chunk(b'IEND', b'')
    )

DATED = re.compile(r'^(?:[A-Z][a-z]{2} )?\d{4}\b.*·')
INSTITUTION = re.compile(r'^\*\*(.+?)\*\*, (?:(.+?), )?(\d{4}(?: to \d{4})?)\. (.+)$')
SKILL = re.compile(r'^\*\*(.+?)\*\* (.+)$')
END_YEAR = re.compile(r'(present|\d{4})\s*$')
GRADE = re.compile(r'\b([A-D]{1,2})(?=[,.])')

CONTENT_WIDTH = '17.4cm'

# The three lines under the name, in the order the draft lists them.
IDENTITY_LINES = {3: 'IdentityRole', 2: 'IdentityContact', 1: 'IdentityLinks'}


def escape(text):
    return html.escape(text, quote=False)


def paragraph(style, inner):
    return f'<text:p text:style-name="{style}">{inner}</text:p>'


def run_span(style, text):
    return f'<text:span text:style-name="{style}">{escape(text)}</text:span>'


def role_head_style(dates):
    match = END_YEAR.search(dates)
    year = 2100 if match.group(1) == 'present' else int(match.group(1))
    if year >= 2020:
        return 'RoleHeadRecent'
    return 'RoleHeadMid' if year >= 2014 else 'RoleHeadEarly'


def dated_head(style, left, dates):
    return paragraph(style, escape(left) + '<text:tab/>' + run_span('DateStamp', dates))


def skill_row(style, label, items):
    cells = (
        f'<table:table-cell office:value-type="string">{paragraph(style, run_span("SkillLabel", label))}</table:table-cell>'
        f'<table:table-cell office:value-type="string">{paragraph(style, escape(items))}</table:table-cell>'
    )
    return f'<table:table-row>{cells}</table:table-row>'


def parse(blocks):
    """Turn the draft's blocks into (kind, payload) pairs, kind being the style name.

    Experience collapses to a single ('Roles', [...]) pair so the run grouping can see every
    role at once.
    """
    out = []
    section = None
    roles = []
    identity = 0

    for block in blocks:
        if block.startswith('## '):
            section = block[3:]
            if not out:
                out.append(('NameTitle', section))
                identity = 3
            else:
                out.append(('SectionHead', section))
            continue

        if identity:
            out.append((IDENTITY_LINES[identity], block))
            identity -= 1
            continue

        if block.startswith('### '):
            company, title = block[4:].split(', ', 1)
            if not roles:
                out.append(('Roles', roles))
            roles.append({'company': company, 'title': title, 'blocks': []})
            continue

        if roles and DATED.match(block) and 'dates' not in roles[-1]:
            roles[-1]['dates'], roles[-1]['meta'] = block.split(' · ', 1)
            continue

        if section == 'Skills':
            label, items = SKILL.match(block).groups()
            out.append(('SkillLineCore' if label == 'Core' else 'SkillLine', (label, items)))
            continue

        if section == 'Education':
            found = INSTITUTION.match(block)
            if found:
                name, place, dates, detail = found.groups()
                out.append(('EduHead', (f'{name}, {place}' if place else name, dates)))
                out.append(('EduDetail', detail))
            else:
                out.append(('EduModules', block))
            continue

        if section == 'Experience':
            roles[-1]['blocks'].append(('RoleBody' if block.endswith('.') else 'RoleTech', block))
            continue

        out.append(('Statement' if section is None else 'RoleBody', block))

    return out


def consecutive_runs(roles):
    """Consecutive entries at one employer, matching src/lib/role-runs.ts.

    Keying on the company name alone would merge the two Freelance stints that sit years and
    other jobs apart.
    """
    runs = []
    for role in roles:
        if runs and runs[-1][0]['company'] == role['company']:
            runs[-1].append(role)
            continue
        runs.append([role])
    return runs


def span_of(run):
    start = run[-1]['dates'].split(' to ')[0]
    end = run[0]['dates'].split(' to ')[-1]
    return start if start == end else f'{start} to {end}'


def render_roles(roles):
    """A run prints its employer and span once; each role carries its own dates in the title."""
    out = []
    for run in consecutive_runs(roles):
        span = span_of(run)
        out.append(dated_head(role_head_style(span), run[0]['company'], span))
        for index, role in enumerate(run):
            meta = role['meta'] if len(run) == 1 else f"{role['dates']} · {role['meta']}"
            title_style = 'RoleTitle' if index == 0 else 'RoleTitleChapter'
            out.append(
                paragraph(title_style, escape(role['title']) + run_span('MetaText', f' · {meta}'))
            )
            last = index == len(run) - 1
            for style, text in role['blocks']:
                if style == 'RoleTech' and not last:
                    style = 'RoleTechChapter'
                out.append(paragraph(style, escape(text)))
    return out


def render(parsed):
    body = [
        paragraph(
            'BrandMark',
            '<draw:frame draw:style-name="Logo" text:anchor-type="as-char" '
            'svg:width="5.3mm" svg:height="5.3mm" draw:z-index="0">'
            '<draw:image xlink:href="Pictures/logo.png" xlink:type="simple" xlink:show="embed" '
            'xlink:actuate="onLoad"/></draw:frame>feedMyPixel Ltd.',
        )
    ]
    skills = []

    for position, (style, payload) in enumerate(parsed):
        if style in ('SkillLineCore', 'SkillLine'):
            skills.append(skill_row(style, *payload))
            continue
        if skills:
            body.append(
                '<table:table table:name="Skills" table:style-name="Skills">'
                '<table:table-column table:style-name="SkillsLabel"/>'
                '<table:table-column table:style-name="SkillsList"/>'
                + ''.join(skills)
                + '</table:table>'
            )
            skills = []

        if style == 'Roles':
            body.extend(render_roles(payload))
        elif style == 'EduHead':
            body.append(dated_head(style, *payload))
        elif style == 'EduDetail' and parsed[position + 1][0] == 'EduModules':
            body.append(paragraph('EduDetailKeep', escape(payload)))
        elif style == 'EduDetail' and 'GCSE' in payload:
            marked = GRADE.sub(r'<text:span text:style-name="Grade">\1</text:span>', escape(payload))
            body.append(paragraph(style, marked))
        else:
            body.append(paragraph(style, escape(payload)))

    return ''.join(body)


PJS = 'style:font-name="Plus Jakarta Sans"'
DMM = 'style:font-name="DM Mono"'
INK = '#0a1020'
BODY_INK = '#1c2635'
BLUE = '#0f52a8'
MUTED = '#4a586b'
RULE = '#c2ccda'
PIXEL_BLUE = '#3294fc'
KEEP = 'fo:keep-with-next="always" '
TECH_BLOCK = (
    'fo:margin-top="9pt" fo:margin-bottom="0pt" fo:line-height="12.33pt" '
    'fo:border-left="2pt solid #3294fc" fo:padding-left="8pt"'
)
WIDOWS = 'fo:widows="2" fo:orphans="2" '
RIGHT_TAB = (
    '<style:tab-stops><style:tab-stop style:position="'
    + CONTENT_WIDTH
    + '" style:type="right"/></style:tab-stops>'
)


def paragraph_style(name, block, text, children='', master=''):
    return (
        f'<style:style style:name="{name}" style:family="paragraph" '
        f'style:parent-style-name="Standard"{master}>'
        f'<style:paragraph-properties {WIDOWS}{block}>{children}</style:paragraph-properties>'
        f'<style:text-properties {text} fo:language="en" fo:country="GB"/>'
        f'</style:style>'
    )


def character_style(name, text):
    return (
        f'<style:style style:name="{name}" style:family="text">'
        f'<style:text-properties {text}/></style:style>'
    )


STYLES = ''.join(
    [
        paragraph_style(
            'BrandMark',
            'fo:margin-top="0pt" fo:margin-bottom="0pt" fo:line-height="12pt"',
            f'{PJS} fo:font-size="10pt" fo:font-weight="600" fo:color="{INK}" fo:letter-spacing="-0.1pt"',
            master=' style:master-page-name="First"',
        ),
        paragraph_style(
            'NameTitle',
            'fo:margin-top="9pt" fo:margin-bottom="0pt" fo:line-height="27.3pt"',
            f'{PJS} fo:font-size="26pt" fo:font-weight="700" fo:color="{INK}" fo:letter-spacing="-0.65pt"',
        ),
        paragraph_style(
            'IdentityRole',
            'fo:margin-top="12pt" fo:margin-bottom="0pt" fo:line-height="14.25pt"',
            f'{DMM} fo:font-size="9.5pt" fo:color="{BLUE}"',
        ),
        paragraph_style(
            'IdentityContact',
            'fo:margin-top="4pt" fo:margin-bottom="0pt" fo:line-height="13.6pt"',
            f'{DMM} fo:font-size="8.5pt" fo:color="{MUTED}"',
        ),
        paragraph_style(
            'IdentityLinks',
            f'fo:margin-top="10pt" fo:margin-bottom="0pt" fo:line-height="13.6pt" '
            f'fo:border-bottom="1pt solid {PIXEL_BLUE}" fo:padding-bottom="10pt"',
            f'{DMM} fo:font-size="8.5pt" fo:color="{MUTED}"',
        ),
        paragraph_style(
            'Statement',
            'fo:margin-top="26pt" fo:margin-bottom="0pt" fo:line-height="18.5pt"',
            f'{PJS} fo:font-size="11pt" fo:color="{BODY_INK}"',
        ),
        paragraph_style(
            'SectionHead',
            f'{KEEP}fo:margin-top="26pt" fo:margin-bottom="0pt" fo:line-height="12pt" '
            f'fo:border-bottom="1pt solid {RULE}" fo:padding-bottom="4pt"',
            f'{DMM} fo:font-size="9pt" fo:font-weight="500" fo:color="{BLUE}" fo:letter-spacing="0.81pt"',
        ),
        paragraph_style(
            'SkillLineCore',
            'fo:margin-top="8pt" fo:margin-bottom="0pt" fo:line-height="15.23pt"',
            f'{PJS} fo:font-size="10.5pt" fo:font-weight="600" fo:color="{INK}"',
        ),
        paragraph_style(
            'SkillLine',
            'fo:margin-top="5pt" fo:margin-bottom="0pt" fo:line-height="15.23pt"',
            f'{PJS} fo:font-size="10.5pt" fo:color="{BODY_INK}"',
        ),
        paragraph_style(
            'RoleHeadRecent',
            f'{KEEP}fo:margin-top="30pt" fo:margin-bottom="0pt" fo:line-height="14.4pt"',
            f'{PJS} fo:font-size="12pt" fo:font-weight="600" fo:color="{INK}" fo:letter-spacing="-0.15pt"',
            RIGHT_TAB,
        ),
        paragraph_style(
            'RoleHeadMid',
            f'{KEEP}fo:margin-top="26pt" fo:margin-bottom="0pt" fo:line-height="14.4pt"',
            f'{PJS} fo:font-size="12pt" fo:font-weight="600" fo:color="{INK}" fo:letter-spacing="-0.15pt"',
            RIGHT_TAB,
        ),
        paragraph_style(
            'RoleHeadEarly',
            f'{KEEP}fo:margin-top="22pt" fo:margin-bottom="0pt" fo:line-height="14.4pt"',
            f'{PJS} fo:font-size="12pt" fo:font-weight="600" fo:color="{INK}" fo:letter-spacing="-0.15pt"',
            RIGHT_TAB,
        ),
        paragraph_style(
            'RoleTitle',
            f'{KEEP}fo:margin-top="5pt" fo:margin-bottom="0pt" fo:line-height="13pt"',
            f'{PJS} fo:font-size="9.5pt" fo:font-weight="600" fo:color="{BODY_INK}"',
        ),
        paragraph_style(
            'RoleTitleChapter',
            f'{KEEP}fo:margin-top="14pt" fo:margin-bottom="0pt" fo:line-height="13pt"',
            f'{PJS} fo:font-size="9.5pt" fo:font-weight="600" fo:color="{BODY_INK}"',
        ),
        paragraph_style(
            'RoleBody',
            f'{KEEP}fo:margin-top="9pt" fo:margin-bottom="0pt" fo:line-height="17.5pt"',
            f'{PJS} fo:font-size="10.5pt" fo:color="{BODY_INK}"',
        ),
        paragraph_style(
            'RoleTech',
            f'{TECH_BLOCK}',
            f'{DMM} fo:font-size="8.5pt" fo:color="{MUTED}"',
        ),
        paragraph_style(
            'RoleTechChapter',
            f'{KEEP}{TECH_BLOCK}',
            f'{DMM} fo:font-size="8.5pt" fo:color="{MUTED}"',
        ),
        paragraph_style(
            'EduHead',
            f'{KEEP}fo:margin-top="16pt" fo:margin-bottom="0pt" fo:line-height="13.2pt"',
            f'{PJS} fo:font-size="11pt" fo:font-weight="600" fo:color="{INK}" fo:letter-spacing="-0.13pt"',
            RIGHT_TAB,
        ),
        paragraph_style(
            'EduDetail',
            'fo:margin-top="6pt" fo:margin-bottom="0pt" fo:line-height="17.5pt"',
            f'{PJS} fo:font-size="10.5pt" fo:color="{BODY_INK}"',
        ),
        paragraph_style(
            'EduDetailKeep',
            f'{KEEP}fo:margin-top="6pt" fo:margin-bottom="0pt" fo:line-height="17.5pt"',
            f'{PJS} fo:font-size="10.5pt" fo:color="{BODY_INK}"',
        ),
        paragraph_style(
            'EduModules',
            'fo:margin-top="4pt" fo:margin-bottom="0pt" fo:line-height="15pt"',
            f'{PJS} fo:font-size="10pt" fo:color="{MUTED}"',
        ),
        paragraph_style(
            'PageHeader',
            f'fo:margin-top="0pt" fo:margin-bottom="0pt" fo:line-height="11.9pt" '
            f'fo:border-bottom="1pt solid {RULE}" fo:padding-bottom="5pt"',
            f'{DMM} fo:font-size="8.5pt" fo:color="{MUTED}"',
            RIGHT_TAB,
        ),
        character_style('DateStamp', f'{DMM} fo:font-size="9pt" fo:color="{MUTED}"'),
        character_style('MetaText', f'{DMM} fo:font-size="8.5pt" fo:color="{MUTED}"'),
        character_style('SkillLabel', f'{DMM} fo:font-size="9pt" fo:color="{BLUE}"'),
        character_style('PageNumber', f'{DMM} fo:font-size="8.5pt" fo:color="{MUTED}"'),
        character_style('Grade', f'{DMM} fo:font-size="9.5pt" fo:color="{BLUE}"'),
    ]
)

PAGE = (
    'fo:page-width="210mm" fo:page-height="297mm" style:print-orientation="portrait" '
    'fo:margin-top="15mm" fo:margin-bottom="15mm" fo:margin-left="18mm" fo:margin-right="18mm"'
)

PAGE_LAYOUTS = (
    f'<style:page-layout style:name="pmFirst"><style:page-layout-properties {PAGE}/>'
    f'</style:page-layout>'
    f'<style:page-layout style:name="pmRunning"><style:page-layout-properties {PAGE}/>'
    f'<style:header-style><style:header-footer-properties fo:min-height="0mm" '
    f'fo:margin-bottom="13pt"/></style:header-style></style:page-layout>'
)

HEADER = (
    '<style:header><text:p text:style-name="PageHeader">Ben Chidgey · Curriculum vitae'
    '<text:tab/><text:span text:style-name="PageNumber">'
    '<text:page-number text:select-page="current"/> of <text:page-count/>'
    '</text:span></text:p></style:header>'
)

MASTER_PAGES = (
    '<style:master-page style:name="First" style:page-layout-name="pmFirst" '
    'style:next-style-name="Standard"/>'
    f'<style:master-page style:name="Standard" style:page-layout-name="pmRunning">{HEADER}'
    '</style:master-page>'
)

FONTS = (
    '<office:font-face-decls>'
    '<style:font-face style:name="Plus Jakarta Sans" svg:font-family="Plus Jakarta Sans" '
    'style:font-family-generic="swiss" style:font-pitch="variable"/>'
    '<style:font-face style:name="DM Mono" svg:font-family="DM Mono" '
    'style:font-family-generic="modern" style:font-pitch="fixed"/>'
    '</office:font-face-decls>'
)

FRAME_STYLES = (
    '<style:style style:name="Logo" style:family="graphic">'
    '<style:graphic-properties style:vertical-pos="middle" style:vertical-rel="text" '
    'fo:margin-right="2.1mm" style:wrap="none"/></style:style>'
)

TABLE_STYLES = (
    f'<style:style style:name="Skills" style:family="table">'
    f'<style:table-properties style:width="{CONTENT_WIDTH}" table:align="left"/></style:style>'
    '<style:style style:name="SkillsLabel" style:family="table-column">'
    '<style:table-column-properties style:column-width="23mm"/></style:style>'
    '<style:style style:name="SkillsList" style:family="table-column">'
    '<style:table-column-properties style:column-width="151mm"/></style:style>'
)

NS = (
    'xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" '
    'xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0" '
    'xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" '
    'xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0" '
    'xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0" '
    'xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0" '
    'xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0" '
    'xmlns:xlink="http://www.w3.org/1999/xlink" '
    'office:version="1.2"'
)

MANIFEST = (
    '<?xml version="1.0" encoding="UTF-8"?>'
    '<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" '
    'manifest:version="1.2">'
    '<manifest:file-entry manifest:full-path="/" '
    'manifest:media-type="application/vnd.oasis.opendocument.text"/>'
    '<manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>'
    '<manifest:file-entry manifest:full-path="styles.xml" manifest:media-type="text/xml"/>'
    '<manifest:file-entry manifest:full-path="Pictures/logo.png" manifest:media-type="image/png"/>'
    '</manifest:manifest>'
)

parsed = parse(
    [
        re.sub(r'\s*\n\s*', ' ', block.strip())
        for block in re.split(r'\n\s*\n', SOURCE.read_text().split('\n---\n', 1)[1])
        if block.strip()
    ]
)

styles_xml = (
    f'<?xml version="1.0" encoding="UTF-8"?><office:document-styles {NS}>{FONTS}'
    f'<office:styles>{STYLES}</office:styles>'
    f'<office:automatic-styles>{PAGE_LAYOUTS}</office:automatic-styles>'
    f'<office:master-styles>{MASTER_PAGES}</office:master-styles></office:document-styles>'
)

content_xml = (
    f'<?xml version="1.0" encoding="UTF-8"?><office:document-content {NS}>{FONTS}'
    f'<office:automatic-styles>{FRAME_STYLES}{TABLE_STYLES}</office:automatic-styles>'
    f'<office:body><office:text>{render(parsed)}</office:text></office:body>'
    f'</office:document-content>'
)

with zipfile.ZipFile(OUTPUT, 'w') as archive:
    archive.writestr(
        zipfile.ZipInfo('mimetype'),
        'application/vnd.oasis.opendocument.text',
        zipfile.ZIP_STORED,
    )
    archive.writestr('META-INF/manifest.xml', MANIFEST)
    archive.writestr('styles.xml', styles_xml)
    archive.writestr('content.xml', content_xml)
    archive.writestr('Pictures/logo.png', logo_png())

roles = next(payload for style, payload in parsed if style == 'Roles')
runs = consecutive_runs(roles)
grouped = [f"{run[0]['company']} ×{len(run)}" for run in runs if len(run) > 1]

print(f'  roles: {len(roles)} in {len(runs)} runs')
print('  grouped: ' + (', '.join(grouped) or 'none'))
print(f'  written: {OUTPUT} ({OUTPUT.stat().st_size} bytes)')
