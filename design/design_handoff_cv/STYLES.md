# STYLES.md — named style list

**This is the implementation spec.** Every visual treatment maps to one named style. If a thing looks different, it has a different name. Nothing is styled ad hoc.

**All sizes are absolute print units: points and millimetres.** No pixels, no em, no rem, no unitless line heights anywhere in the render or in this list. A word processor has no root font size, so a relative unit would have to be guessed at and the printed result would drift from the design.

Two fonts only: **Plus Jakarta Sans** (PJS) and **DM Mono** (DMM), installed locally and embedded in the PDF.

Column widths for every side-by-side block are in **`TABLES.md`**.

## Page master

| Property | Value |
|---|---|
| Paper | A4 portrait, 210 × 297 mm |
| Margins | 15 mm top, 15 mm bottom, 18 mm left, 18 mm right |
| Content width | 174 mm |
| Widows and orphans | 2 lines minimum on every text style |

## Paragraph styles

| Style | Font | Size | Weight | Colour | Before | After | Line height | Notes |
|---|---|---|---|---|---|---|---|---|
| `BrandMark` | PJS | 10 pt | 600 | `#0a1020` | 0 pt | 0 pt | 12 pt | Letter spacing −0.1 pt. Logo 15 × 15 pt anchored as character, 2.1 mm gap |
| `NameTitle` | PJS | 26 pt | 700 | `#0a1020` | 9 pt | 0 pt | 27.3 pt | Letter spacing −0.65 pt |
| `IdentityRole` | DMM | 9.5 pt | 400 | `#0f52a8` | 6 pt | 0 pt | 14.25 pt | |
| `IdentityContact` | DMM | 8.5 pt | 400 | `#4a586b` | 4 pt | 10 pt | 13.6 pt | Bottom border 2 pt solid `#0a1020` |
| `Statement` | PJS | 11 pt | 400 | `#1c2635` | 12 pt | 0 pt | 17.05 pt | |
| `SectionHead` | DMM | 9 pt | 500 | `#0f52a8` | 18 pt | 4 pt | 12 pt | Letter spacing 0.81 pt. Bottom border 1 pt solid `#c2ccda`. **Keep with next** |
| `SkillLineCore` | PJS | 10.5 pt | 600 | `#0a1020` | 8 pt | 0 pt | 15.23 pt | Table row, see `TABLES.md` |
| `SkillLine` | PJS | 10.5 pt | 400 | `#1c2635` | 5 pt | 0 pt | 15.23 pt | Table row |
| `RoleHeadRecent` | PJS | 12 pt | 600 | `#0a1020` | 14 pt | 0 pt | 14.4 pt | Letter spacing −0.15 pt. Table row. **Keep with next** |
| `RoleHeadFirst` | PJS | 12 pt | 600 | `#0a1020` | 13 pt | 0 pt | 14.4 pt | As above; first role after a running header |
| `RoleHeadMid` | PJS | 12 pt | 600 | `#0a1020` | 12 pt | 0 pt | 14.4 pt | As above |
| `RoleHeadEarly` | PJS | 12 pt | 600 | `#0a1020` | 11 pt | 0 pt | 14.4 pt | As above |
| `RoleTitle` | PJS | 9.5 pt | 600 | `#1c2635` | 3 pt | 0 pt | 13 pt | **Keep with next** |
| `RoleBody` | PJS | 10.5 pt | 400 | `#1c2635` | 6 pt | 0 pt | 15.75 pt | |
| `RoleTech` | DMM | 8.5 pt | 400 | `#4a586b` | 6 pt | 0 pt | 12.33 pt | **Left paragraph border 2 pt solid `#3294fc`, 8 pt padding.** Not a table |
| `EduHead` | PJS | 11 pt | 600 | `#0a1020` | 11 pt | 0 pt | 13.2 pt | Letter spacing −0.13 pt. Table row. **Keep with next** |
| `EduDetail` | PJS | 10.5 pt | 400 | `#1c2635` | 4 pt | 0 pt | 15.75 pt | |
| `EduModules` | PJS | 10 pt | 400 | `#4a586b` | 4 pt | 0 pt | 15 pt | The only 10 pt in the document, sitting on the brief's body floor |
| `PageHeader` | DMM | 8.5 pt | 400 | `#4a586b` | 0 pt | 13 pt | 11.9 pt | Table row. Bottom border 1 pt solid `#c2ccda` |

The four `RoleHead*` styles differ **only** in space before. They can collapse to two if nineteen styles is too many; the density gradient survives, more coarsely.

## Character styles

| Style | Font | Size | Weight | Colour | Used in |
|---|---|---|---|---|---|
| `DateStamp` | DMM | 9 pt | 400 | `#4a586b` | Right cell of `RoleHead*` and `EduHead` |
| `MetaText` | DMM | 8.5 pt | 400 | `#4a586b` | Location and engagement type, trailing the title in `RoleTitle` |
| `SkillLabel` | DMM | 9 pt | 400 | `#0f52a8` | Left cell of `SkillLine` and `SkillLineCore` |
| `PageNumber` | DMM | 8.5 pt | 400 | `#4a586b` | Right cell of `PageHeader` |
| `Grade` | DMM | 9.5 pt | 400 | `#0f52a8` | GCSE grades inside `EduDetail`, so eight marks scan instead of dissolving into prose |

## The three decisions worth knowing

**Dates sit hard right on the same line as the company.** Either a right-aligned tab stop at 174 mm (one paragraph, no object) or a two-cell borderless table (`TABLES.md`). Not a narrow left column: that costs a table per entry and complicates every page break.

**Technology lines get a left paragraph border.** They were reading as an afterthought and they carry most of the searchable value. A 2 pt Pixel Blue border with 8 pt padding anchors them without a background block, is a native word-processor primitive, survives a page break, prints as a legible grey rule in black and white, and echoes the spine marker on the site's Experience section so the two artefacts read as one identity.

**Density is one property varied four ways.** Space before the company name, 14 pt down to 11 pt, working with copy already graded in length. No size, colour or rule changes between tiers, so a three-line 2005 entry reads as brief rather than broken next to a nine-line 2023 one.

## Entry order

By **end date, descending** — the usual convention where engagements overlap, and what the site's `experience.ts` already does.

Worth stating because it looks wrong at a glance: Design Haus (Mar 2010) renders below Freelance (Oct 2007 to Apr 2010) and Lazy Gramophone (2004 to 2010), so start dates read 2010, 2007, 2004, 2010. Sorting by start date would strand Lazy Gramophone, a six-year concurrent thread, among the 2004 entries and split it from the Freelance entry whose text says it culminated in that platform. Do not "fix" it.

## Page breaks

`SectionHead`, `RoleHead*`, `RoleTitle` and `EduHead` all carry **keep with next**, so a company name is never the last line on a page and a heading never strands from its entry.

The render is explicitly paginated at six pages to show real break positions. Unused tails run 179 to 247 pt on pages one to five, deliberately uneven: the tails are where keep-with-next has pushed a company name to the next page rather than let it strand, which is the behaviour to reproduce. A generator flowing naturally will land close to these breaks.

Page five is the "section lands badly" case the brief asked to see. Education carries three institution blocks with References after it, inside 174 pt of spare. Because `EduHead` keeps with next, a shift of a paragraph moves a whole institution to the next page rather than stranding its heading, and References travels with its own head.
