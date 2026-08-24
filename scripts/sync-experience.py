"""Copy each role's summary and tags from tasks/cv-draft.md into src/lib/data/experience.ts.

Scans one role object at a time rather than matching the whole file with one pattern:
Prettier switches a string between single and double quotes depending on whether it
contains an apostrophe (as DEFRA's does), and a quote-style-specific pattern silently
skips whichever entries it lands on, corrupting whatever comes after. Field values are
located by scanning forward from each key to its next quoted string, so the quote
character in play never matters.

Summaries become one <p> per blank-line-separated paragraph in the draft, rendered with
{@html} by RoleRun.svelte. Site-only tags (facets the CV never carries, e.g. BuildKite)
are kept after the CV's own tags rather than replaced.
"""

import html
import re
from pathlib import Path

DRAFT = Path('tasks/cv-draft.md')
SITE_DATA = Path('src/lib/data/experience.ts')


def parse_draft():
    body = DRAFT.read_text().split('## Experience', 1)[1].split('## Education', 1)[0]
    blocks = [' '.join(b.split()) for b in re.split(r'\n\s*\n', body) if b.strip()]

    roles = {}
    role = None
    for block in blocks:
        if block.startswith('### '):
            role = {'summary': [], 'tags': []}
            continue
        if role is None:
            continue
        if 'dates' not in role and ' · ' in block and re.match(r'^(?:[A-Z][a-z]{2} )?\d{4}\b', block):
            role['dates'] = block.split(' · ')[0]
            roles[role['dates']] = role
            continue
        if block.endswith('.'):
            role['summary'].append(block)
        else:
            role['tags'] = [tag.strip() for tag in block.split(',')]
    return roles


def read_quoted(text, index):
    """From `index`, scan to the next quoted string. Return (unescaped value, span start, span end)."""
    while text[index] not in '\'"':
        index += 1
    quote_char = text[index]
    start = index + 1
    index = start
    while text[index] != quote_char:
        index += 2 if text[index] == '\\' else 1
    value = text[start:index].replace('\\' + quote_char, quote_char).replace('\\\\', '\\')
    return value, start - 1, index + 1


def read_tags(text, index):
    """From `index`, scan the `[...]` array following it. Return (values, span start, span end)."""
    while text[index] != '[':
        index += 1
    start = index + 1
    tags, cursor = [], start
    while text[cursor] != ']':
        if text[cursor] in ' \n\t,':
            cursor += 1
            continue
        value, _, cursor = read_quoted(text, cursor)
        tags.append(value)
    return tags, start, cursor


def quote(text):
    return "'" + text.replace('\\', '\\\\').replace("'", "\\'") + "'"


def as_html(paragraphs):
    return ''.join(f'<p>{html.escape(paragraph, quote=False)}</p>' for paragraph in paragraphs)


def sync_entry(chunk, roles):
    company, _, _ = read_quoted(chunk, chunk.index('company:'))
    dates, _, _ = read_quoted(chunk, chunk.index('dates:'))

    role = roles.get(dates.replace(' - ', ' to '))
    if role is None:
        return chunk, company, False, True

    old_summary, summary_start, summary_end = read_quoted(chunk, chunk.index('summary:'))
    new_summary = as_html(role['summary'])
    chunk = chunk[:summary_start] + quote(new_summary) + chunk[summary_end:]

    old_tags, tags_start, tags_end = read_tags(chunk, chunk.index('tags:'))
    merged_tags = role['tags'] + [tag for tag in old_tags if tag not in role['tags']]
    chunk = chunk[:tags_start] + ', '.join(quote(tag) for tag in merged_tags) + chunk[tags_end:]

    changed = old_summary != new_summary or merged_tags != old_tags
    return chunk, company, changed, False


roles = parse_draft()
source = SITE_DATA.read_text()
entries = re.split(r'(?=\n  \{\n)', source)

changed_companies = []
unmatched_companies = []

for index, chunk in enumerate(entries):
    if not chunk.startswith('\n  {\n'):
        continue
    updated, company, changed, unmatched = sync_entry(chunk, roles)
    entries[index] = updated
    if unmatched:
        unmatched_companies.append(company)
    elif changed:
        changed_companies.append(company)

SITE_DATA.write_text(''.join(entries))

print(f'{len(changed_companies)} roles updated, {len(unmatched_companies)} unmatched to a CV entry')
if unmatched_companies:
    print('  unmatched:', ', '.join(unmatched_companies))
for name in changed_companies:
    print(' ', name)
