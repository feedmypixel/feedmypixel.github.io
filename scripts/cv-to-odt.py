import re, zipfile, html
from pathlib import Path

src = Path('tasks/cv-draft.md').read_text()
body = src[src.index('\n---\n') + 5:]
blocks = [re.sub(r'\s*\n\s*', ' ', b.strip()) for b in re.split(r'\n\s*\n', body) if b.strip()]

DATE = re.compile(r'^[A-Z][a-z]{2} \d{4} to (present|\d{4}|[A-Z][a-z]{2} \d{4})|^\w{3} \d{4} · ')

def esc(t):
    return html.escape(t, quote=False)

def inline(t):
    parts = re.split(r'\*\*(.+?)\*\*', esc(t))
    out = ''
    for i, p in enumerate(parts):
        out += f'<text:span text:style-name="Strong">{p}</text:span>' if i % 2 else p
    return out

paras = []
for b in blocks:
    if b.startswith('### '):
        paras.append(('Role', b[4:]))
    elif b.startswith('## '):
        paras.append(('Section', b[3:]))
    elif DATE.match(b):
        paras.append(('Meta', b))
    elif b.startswith('**'):
        paras.append(('Body', b))
    elif not b.endswith('.') and ',' in b and len(b) < 160:
        paras.append(('Tags', b))
    else:
        paras.append(('Body', b))

# the name is the first Section
for i, (s, t) in enumerate(paras):
    if s == 'Section':
        paras[i] = ('Name', t)
        break

content = ''.join(
    f'<text:p text:style-name="{s}">{inline(t)}</text:p>' for s, t in paras
)

def style(name, parent, props_p='', props_t=''):
    return (f'<style:style style:name="{name}" style:family="paragraph" '
            f'style:parent-style-name="{parent}">'
            f'<style:paragraph-properties {props_p}/>'
            f'<style:text-properties {props_t} fo:language="en" fo:country="GB"/>'
            f'</style:style>')

FONT = 'style:font-name="Plus Jakarta Sans"'
MONO = 'style:font-name="DM Mono"'
styles = (
  '<style:style style:name="Strong" style:family="text">'
  '<style:text-properties fo:font-weight="bold"/></style:style>'
  + style('Name', 'Standard', 'fo:margin-bottom="0.15cm"', f'{FONT} fo:font-size="24pt" fo:font-weight="bold" fo:letter-spacing="-0.03cm"')
  + style('Section', 'Standard', 'fo:margin-top="0.7cm" fo:margin-bottom="0.2cm" fo:border-bottom="0.5pt solid #cccccc" fo:padding-bottom="0.1cm"', f'{FONT} fo:font-size="11pt" fo:font-weight="bold" fo:letter-spacing="0.04cm" fo:text-transform="uppercase"')
  + style('Role', 'Standard', 'fo:margin-top="0.45cm" fo:margin-bottom="0.05cm" fo:keep-with-next="always"', f'{FONT} fo:font-size="11.5pt" fo:font-weight="bold"')
  + style('Meta', 'Standard', 'fo:margin-bottom="0.2cm"', f'{MONO} fo:font-size="8.5pt" fo:color="#5d6b80"')
  + style('Body', 'Standard', 'fo:margin-bottom="0.2cm" fo:line-height="130%"', f'{FONT} fo:font-size="10pt"')
  + style('Tags', 'Standard', 'fo:margin-bottom="0.1cm"', f'{MONO} fo:font-size="8.5pt" fo:color="#5d6b80"')
)

page = ('<style:page-layout style:name="pm1"><style:page-layout-properties '
        'fo:page-width="21cm" fo:page-height="29.7cm" style:print-orientation="portrait" '
        'fo:margin-top="1.6cm" fo:margin-bottom="1.6cm" fo:margin-left="1.9cm" fo:margin-right="1.9cm"/>'
        '</style:page-layout>')

NS = ('xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" '
      'xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0" '
      'xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" '
      'xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0" '
      'office:version="1.2"')

styles_xml = (f'<?xml version="1.0" encoding="UTF-8"?><office:document-styles {NS}>'
              f'<office:styles>{styles}</office:styles>'
              f'<office:automatic-styles>{page}</office:automatic-styles>'
              f'<office:master-styles><style:master-page style:name="Standard" '
              f'style:page-layout-name="pm1"/></office:master-styles></office:document-styles>')

content_xml = (f'<?xml version="1.0" encoding="UTF-8"?><office:document-content {NS}>'
               f'<office:body><office:text>{content}</office:text></office:body>'
               f'</office:document-content>')

manifest = ('<?xml version="1.0" encoding="UTF-8"?>'
            '<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">'
            '<manifest:file-entry manifest:full-path="/" manifest:media-type="application/vnd.oasis.opendocument.text"/>'
            '<manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>'
            '<manifest:file-entry manifest:full-path="styles.xml" manifest:media-type="text/xml"/>'
            '</manifest:manifest>')

out = Path('tasks/BenChidgeyCV.odt')
with zipfile.ZipFile(out, 'w') as z:
    z.writestr(zipfile.ZipInfo('mimetype'), 'application/vnd.oasis.opendocument.text', zipfile.ZIP_STORED)
    z.writestr('META-INF/manifest.xml', manifest)
    z.writestr('styles.xml', styles_xml)
    z.writestr('content.xml', content_xml)

from collections import Counter
print('  paragraphs: ' + str(len(paras)))
print('  ' + ', '.join(f'{k}={v}' for k, v in Counter(s for s, _ in paras).items()))
print('  written: ' + str(out) + ' (' + str(out.stat().st_size) + ' bytes)')
