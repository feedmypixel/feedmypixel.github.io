# FeedMyPixel — Work / experience explorer design brief

**For:** [claude.ai/design](https://claude.ai/design). Builds on `brief-global.md` (tokens, type,
header, footer). Mirrors stat's system (`~/Projects/status/stat-ui/src/lib/styles`). Deliver the
**Work page** as self-contained HTML + CSS, light theme primary (dark a bonus), desktop + mobile.

## Goal

A *snazzy*, interactive view of Ben's 20+ years of work — something a hiring lead enjoys
exploring and a fellow developer respects. It must show range without becoming a wall of text,
and it must still read perfectly as a plain list with no JavaScript.

## The data

One role = company, title, dates, location, type (contract/permanent), a one-line summary, sector,
and **expertise tags** (e.g. SvelteKit, React, Node, AWS, Accessibility, Design systems, GOV.UK).
There are ~25 roles spanning 2002→now (Guardian, BBC, HMRC/GDS, DEFRA, Wayfair, M&S, MoJ, Pret,
DWP, Deutsche Telekom, …). Recent + marquee names should stand out.

## Interaction (these are the snazzy controls)

- **Search** — free-text across company / title / summary / tags; live-filters the list.
- **Filter** — by **expertise tag** (multi-select chips) and/or **sector**. Show active filters,
  with a clear-all.
- **Toggle** — at least one view/sort toggle: e.g. **timeline ↔ grouped-by-tech**, or
  **all ↔ contract-only**, or sort newest/oldest. Pick what shows the work best.
- **Empty state** — when filters match nothing: a friendly "no matches · clear filters" with the
  controls still operable. Never a dead-end.

## Progressive enhancement (hard requirement)

- **No-JS baseline:** the full role list renders as semantic static HTML, newest-first, fully
  readable. Search/filter/toggle are **enhancements layered on top** — if JS fails, nothing is
  hidden behind a control.
- Design the static list *and* the enhanced controls; make clear which chrome is the enhancement.

## PDF

- A clear **"Download CV (PDF)"** action on the page (v1 = a maintained PDF file; the visual just
  needs the download affordance — button/link treatment).

## Layout ideas (your call)

- Role **cards** or a dense **timeline** — whichever reads as crafted and scannable.
- Tags as small chips; recent/marquee roles visually weighted. Lots of whitespace; restrained.
- Consider a compact summary stat ("20+ years · 25 roles · contract since 2014") as a header.

## Deliver

The Work page: header + controls (search, filter chips, toggle) + the role list (cards/timeline) +
active-filter and empty states + the PDF download affordance. Light theme (dark optional), desktop +
mobile, annotated against the global tokens (flag any new token — chip, timeline rail, control bar).
