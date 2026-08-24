# CHANGELOG.md

## CV document drop — 24 Aug 2026

First design of the CV as a printed artefact. Replaces an eleven page document whose weight sat in the wrong end.

**Structure.** A4 portrait, four pages, 15 mm and 18 mm margins. Identity, opening statement, skills in three bands, seventeen experience entries plus an earlier career block, education, references. Page one stands alone as a summary.

**Fifteen paragraph styles, four character styles, no tables.** See `STYLES.md`.

**Dates on a right tab stop**, not in a per-entry table. The single biggest decision in the drop: it removes eighteen table objects from the generated document.

**Technology lines given a 2 pt brand left border**, echoing the spine marker on the site's Experience section, so the CV and the site read as one identity. That was the brief's complaint about the two looking like different people made them.

**Density gradient by space-before only**, 14 pt to 11 pt across three tiers.

**Print palette narrowed.** `--ink-subtle` is dropped entirely; it is below the brief's mid-grey floor and dies in a photocopier. `--ink-muted` is the lightest ink in the document. Recorded as a PRINT-SUBSET block in `_ds/tokens.css`.

**Email changed to `ben@feedmypixel.com`.** `hello@` receives but cannot send, and a CV exists to get a reply. The site has not been changed to match — flagged in `README.md`.

**Section heads set sentence case**, not the capitals in the source text file, per the locked system's no-ALL-CAPS rule.

### Corrected during design
- **DEFRA service templates did not use Postgres.** They defaulted to MongoDB with Postgres on request. The prose now names no database at all, which is the right level of detail for a CV, and MongoDB carries in the technology line. The error survives in `tasks/cv-paste.txt` and `tasks/cv-draft.md`.
- **All three pages clipped on the first pass.** Explicitly paginated pages hide overflow, and `scrollHeight` is clamped by `overflow: hidden`, so the obvious check falsely reports a fit. Measured the last child's bottom against the page box instead, found 81, 119 and 156 px of lost content, and repaginated to four pages. Any future edit to this document needs the same check, not the `scrollHeight` one.

### Not changed
`_ds/` is otherwise identical to `design_handoff_tenure`. No new tokens. The colour-direction explorations (`[data-palette]`) carry through untouched and remain proposals.

### Full history and full education restored (Ben, same day)
The first pass followed the rewritten copy, which folded seven pre-2010 roles into an "Earlier career" block and cut education to a single line. Ben has reversed both. Every role now appears as its own entry, slimmer for the older work but with the same structure, and education carries the degree with what it covered, the Oxford College of Further Education certificates and all eight GCSEs with grades. Document grew from four pages to five.

The module list and GCSE grades were recovered from the text layer of the old `static/BenChidgeyCV.pdf`; they exist nowhere in the repository. No Lazy Gramophone URL: the link is broken.

Three new paragraph styles (`EduHead`, `EduDetail`, `EduModules`) and one character style (`Grade`). No new experience styles were needed: the older entries reuse `RoleHeadEarly`.

### Missing entry recovered
`feedMyPixel, Research and Development, Feb 2014 to Mar 2014` was absent. The rewritten copy in `tasks/cv-paste.txt` had dropped it, and the restoration pass rebuilt only from Design Haus onward, so this entry — which sits earlier, between Guardian and Deutsche Telekom — was never re-audited. It left an unexplained Jan to Mar 2014 gap in the date column, the exact thing the full history is meant to prevent. Now 24 entries and 24 technology lines.

**Audit rule:** diff the CV against `src/lib/data/experience.ts`, never against `tasks/cv-paste.txt`. The paste file is lossy: it is missing this role and it created the "Earlier career" block.

Entry ordering documented in `STYLES.md`: by end date descending, not start date.

### Three brief additions applied (24 Aug 2026)

**1. Supplied text is now verbatim.** The first pass paraphrased in seven places. All reverted to the source strings, which live in `src/lib/data/experience.ts` and, for education, in the text layer of the old `static/BenChidgeyCV.pdf`:

| Was rendered as | Source string, now used |
|---|---|
| "Research and development time between contracts..." | "R&D time between contracts, getting to know AngularJS." |
| "Development work across a large dynamic website..." | "Extended my development work across a large dynamic website..." |
| Trusted Digital: a merged sentence about Mobile Profile HTML and mobile first | "Interactive SMS marketing services for mobile handsets and the mobile web." |
| "Research and Development", "Web Developer and Designer", "Developer and Designer" | "Research & Development", "Web Developer & Designer", "Developer & Designer" |
| "The degree covered computer generated imaging, digital image..." (recased, reordered, serial comma removed) | "My degree covered: Computer generated imaging, Digital image and sound processes, ... Critical and theoretical responses to the broader cultural contexts." |
| Oxford certificates with Computing first | Visual Basic 1 first, then Computing, as in the source |
| Three technology lines reordered | Tag order restored to `experience.ts` |

**Two passages conflict with the house style rather than the layout**, flagged rather than rewritten, per the instruction:
- The degree list uses **sentence-case items after a colon** ("Computer generated imaging, Digital image and sound processes"), which reads as inconsistent capitalisation. It is set verbatim.
- The same list ends with a **serial comma** before its final item. The brief bans serial commas; the supplied text has one. Set verbatim.
- Titles now carry **ampersands** ("Research & Development") while company names in the newer copy spell out "and" ("Marks and Spencer", "HM Revenue and Customs"). Both are verbatim from their own source, so the document is internally inconsistent by faithfulness. Ben's call.

Nothing in this document is invented. The only editorial change is one Ben made directly in conversation: DEFRA's prose no longer names a database, because the .NET templates defaulted to MongoDB with Postgres on request and that detail is below the level a CV needs. MongoDB carries in the technology line.

**2. Absolute print units throughout.** Every relative unit removed from the render: line heights converted from ratios to points at each style's own size (1.5 at 10.5 pt became 15.75 pt), letter spacing from em to points (−0.025 em at 26 pt became −0.65 pt), rules and borders from pixels to points, and the logo from a unitless SVG attribute to 15 × 15 pt. Verified: zero px, em or rem remain. Margins and column widths are in millimetres.

**3. `TABLES.md` added.** Four side-by-side blocks named with column widths in millimetres, each totalling the 174 mm content width, plus the derivation for each figure and a list of the blocks that must NOT be wrapped in a table.

**Skills bands corrected (Ben).** Kubernetes removed from "Also". Core is unchanged at SvelteKit, TypeScript, Node, Fastify, AWS. Kubernetes still appears in the Wayfair and Ministry of Justice technology lines, which is accurate history and stays.

### Late content corrections (Ben, same day)
- **JavaScript not added to Core** after all; TypeScript covers it. Core stands at SvelteKit, TypeScript, Node, Fastify, AWS.
- **Capacitor added** to the Whisky Invest Direct technology line.
- **"WhiskyInvestDirect" set as "Whisky Invest Direct"**, three words.

The last two do not match `src/lib/data/experience.ts`, which still has the company as one word and omits Capacitor. The site and the CV disagree until that file is updated; the CV is correct.

### Current copy applied verbatim (24 Aug 2026)

The supplied CV draft is the source of truth and is now in the render word for word. Changes taken from it:

- **Whisky Invest Direct** gains the mobile apps: "building the iOS and Android apps from that same codebase with Capacitor, both in progress", and `Capacitor, iOS, Android` in its technology line.
- **Earlier career lump split into seven entries**: Freelance 2007 to 2010, Lazy Gramophone, Design Haus, Trusted Digital, Hotxt, Freelance 2005 to 2006, Babel Media.
- **feedMyPixel, Feb to Mar 2014** restored; it had been missing entirely.
- **Education expanded**: degree content, both City and Guilds certificates, all eight GCSEs with grades.
- **No Lazy Gramophone URL.** The link is broken and is deliberately absent.
- Contact address is `hello@feedmypixel.com` as supplied.

Earlier flags about the education block are **withdrawn**: the new draft fixed the sentence-case module list, the serial comma and the "Craft, Design and Technology" commas. Nothing in the document now conflicts with the house style, so there is nothing outstanding to decide.

**Three points where the render departs from the supplied draft, each on Ben's spoken instruction, not a rewrite:**

| Draft says | Render says | Why |
|---|---|---|
| `WhiskyInvestDirect` | **Whisky Invest Direct** | Ben asked for three words |
| Also: "... GitHub Actions, Kubernetes" | Kubernetes removed | Ben: "Kubernetes is not a core skill of mine". It stays in the Wayfair and Ministry of Justice technology lines, which is accurate history |
| DEFRA: ".NET service with Postgres" | ".NET service" | Ben: the templates defaulted to MongoDB with Postgres on request, and that detail is below the level a CV needs |

**Repaginated to six pages.** The longer Whisky Invest Direct entry pushed pages one and two past the page box. Repacked from measured block heights rather than by eye. Pages one to five carry 179 to 247 pt of spare each; page six holds Education and References alone, which puts a clean break between the career and the qualifications. Five pages is arithmetically impossible: the content needs 4,911 pt of flow against 4,957 pt of five-page capacity, which leaves no room for keep-with-next to do its job.

### Provenance check

Run against the rendered text, not the source, so it proves what a reader sees:

- Present: "Capacitor, both in progress", "three to six months down to hours", "multi-file upload component", "Mobile Profile HTML", "three people to over 150", "GCSE English Literature", "City and Guilds Certificate", "Research and development between contracts".
- Absent: spearhead, cross-functional, leveraged, synergy, passionate, results-driven.
- No Lazy Gramophone URL. No en or em dashes. 24 entries, 24 technology lines.

The specifics are the ones that only Ben's history contains, and none of the generic vocabulary appears. This check is cheap to repeat and worth running on any future render.

### Freelance 2005 to 2006 detail added (Ben)
The Brighton freelance entry now names the 3D work for the **Concorde2 website** and the **Battleships mobile game**. Ben supplied the facts, not a sentence, so the surrounding wording extends his existing line rather than replacing it: "Web and mobile media, J2ME game graphics and 3D modelling, including the 3D work for the Concorde2 website and the Battleships mobile game."

**This is the one clause in the document not verbatim from Ben.** If he supplies his own phrasing it replaces this outright. The same detail is absent from `src/lib/data/experience.ts`, which still reads "Web and mobile media, J2ME game graphics and 3D modelling."

### J2ME added
`J2ME` added to the Freelance 2005 to 2006 technology line, which now reads "Flash, Photoshop, 3D, J2ME, Design". The prose already said "J2ME game graphics", so the two agree. Also absent from `experience.ts`.

### Final state at handoff
Six A4 pages, 24 entries, 24 technology lines. Spare per page: 182, 179, 247, 188, 165, 583 pt. Zero relative units. No en or em dashes. Provenance check clean: every Ben-specific phrase present, no invented-copy vocabulary.
