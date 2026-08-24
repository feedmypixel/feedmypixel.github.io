# CV: where this stopped, 24 Aug 2026

Branch `feat/cv-enrichment`.

## Done

- `tasks/cv-draft.md` is the source of truth. 24 entries, every role, education in full.
  Six corrections applied from Ben's Claude Design conversation: DEFRA prose names no
  database and gains MongoDB in its tech line, Kubernetes out of headline skills,
  Whisky Invest Direct as three words, Concorde2 and Battleships plus J2ME on the
  2005 to 2006 freelance entry.
- CD handoff received and verified, not just trusted: 23 of 24 role paragraphs verbatim,
  the exception being the DEFRA database change. Fingerprint phrases present, invented-copy
  vocabulary absent, zero relative units. It laid the words out, it did not write them.
- Handoff copied into the repo at `design/design_handoff_cv/`.
- `scripts/cv-to-odt.py` rewritten against `STYLES.md`. Absolute print units throughout,
  A4 with 15 mm and 18 mm margins, dates on a right tab stop at 174 mm, `RoleTech` carrying
  the 2 pt `#3294fc` left paragraph border, running header from page two, brand mark
  rasterised into the document.
- Exported to PDF at **five pages**, not the handoff's six, so the length worry Ben opened
  with did not need the spacing lever. `static/BenChidgeyCV.pdf` replaced.

## Deviations from STYLES.md, both deliberate

- **Three RoleHead tiers, not four.** `RoleHeadFirst` keys off "first role after a running
  header", which a generator cannot know until the document is paginated. STYLES.md permits
  the collapse.
- **`RoleBody` carries keep-with-next.** Without it the BBC entry's technology line stranded
  alone at the top of page four. Cheapest fix and it holds the entry together.

## Open, not blocking

`experience.ts` disagrees with the CV: company is one word, no Capacitor tag, and the
Rewind, Design Haus and Marks and Spencer summaries are thinner than the CV versions.
Concorde2, Battleships and J2ME are absent there too.

Still parked from before: tenure gates 5.1, 5.2 and 5.4 in `tasks-tenure-v2.md`, the tag
vocabulary pass, and merging this branch to main.
