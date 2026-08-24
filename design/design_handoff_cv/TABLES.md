# TABLES.md — side-by-side blocks and column widths

Every place two things sit on one line. **Content width is 174 mm** on every page (A4 210 mm less 18 mm left and 18 mm right margins), so every table below totals 174 mm.

All tables: **borders off, cell padding 0, one row, vertical alignment top.** Spacing comes from the paragraph style inside the cell, never from cell padding — that keeps the vertical rhythm in one place.

| Block | Left cell | Right cell | Total | Right cell contains | Alignment |
|---|---|---|---|---|---|
| `RoleHead` | 134 mm | 40 mm | 174 mm | Dates, `DateStamp` | Left cell left, right cell **right** |
| `EduHead` | 134 mm | 40 mm | 174 mm | Dates, `DateStamp` | Left cell left, right cell **right** |
| `SkillLine` / `SkillLineCore` | 23 mm | 151 mm | 174 mm | The skill list | Both left |
| `PageHeader` | 154 mm | 20 mm | 174 mm | Page number, `PageNumber` | Left cell left, right cell **right** |

## How the widths were derived

Not eyeballed. Each right-hand cell is sized to its longest possible string in its own font at its own size, then rounded up.

**40 mm date cell.** Longest strings are `Feb 2014 to Mar 2014` and `Sep 2015 to Apr 2017`, both 20 characters. DM Mono is a fixed 0.6 em advance, so at 9 pt each character is 5.4 pt: 20 × 5.4 = 108 pt = 38.1 mm. Rounded to 40 mm, leaving 1.9 mm of slack. **A date longer than 20 characters will wrap and break the row** — if one is ever added, widen this cell and narrow the left one by the same amount.

**23 mm skills label cell.** Longest label is `Throughout`, 10 characters at DM Mono 9 pt = 54 pt = 19.05 mm, plus 4 mm of gutter so the list never touches the label.

**20 mm page number cell.** `5 of 5` is 6 characters at DM Mono 8.5 pt = 30.6 pt = 10.8 mm. Generous on purpose; it costs nothing and survives a sixth page.

**134 mm left cells.** Whatever remains. Comfortable: the longest company name, `Department for International Trade` at Plus Jakarta Sans 12 pt semibold, measures roughly 77 mm, and the longest institution, `Gosford Hill School, Kidlington, Oxford` at 11 pt, roughly 83 mm. Both sit at about 60 per cent of the cell, so neither wraps.

## Blocks that are NOT tables

Worth stating so nobody wraps them in one:

- **`RoleTech`** — the technology line. Its 2 pt blue rule is a **left paragraph border** with 8 pt of padding between border and text, not a narrow first column. A table here would break the border across page splits.
- **`RoleTitle`** — the job title and its ` · location · type` tail are one paragraph, with the tail in the `MetaText` character style.
- **GCSE grades** — subject and grade run inline in one `EduDetail` paragraph, grades in the `Grade` character style. Eight two-cell rows would waste roughly 40 mm of vertical space and lose the comma rhythm.
- **`BrandMark`** — the logo is a 5.3 mm square image (15 pt) anchored as character, with a 2.1 mm gap before the wordmark. Anchored, not celled.

## If you would rather not use tables

`RoleHead`, `EduHead` and `PageHeader` are all "text left, text hard right", which a **right-aligned tab stop at 174 mm** does in a single paragraph with no table at all. That was the original recommendation: it removes about 45 table objects from the generated document, restyles globally from one paragraph style, and cannot break a row across a page.

The table widths above are given because you asked for them and they are correct. If the generator can emit a tab stop, prefer it — but do not mix the two approaches, because the two would then drift apart under any margin change. `SkillLine` genuinely wants the table, since its second cell is a wrapping paragraph rather than a single right-aligned run.
