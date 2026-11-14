# PRD: Pipes product page

Source: `design_handoff_pipes_v8` (Claude Design, 14 Nov 2026), pinned at `design/pipes-v8/mocks-pinned/`.
The render is the spec. Where this file and the render disagree, the render wins unless a decision
below says otherwise. Brief: `design/brief-pipes-page.md`.

**Not for release.** Built on `feat/product-pages` with the status page; both release together.
Nothing merges to `main` (which deploys) until Ben says go.

## 1. Overview

Pipes is Ben's first product under feedMyPixel: a browser extension that watches CI/CD pipelines.
`/pipes` explains what it is and tells the build story, on the same template as `/status`. The home
page Pipes entry gains a "How I built it" link to it.

## 2. Goals

1. Ship `/pipes`: hero, screenshots, problem / solution / product, build story.
2. Link the home page Pipes entry to `/pipes`.
3. `/status` and `/pipes` share one set of page sections, so the two pages cannot drift apart.
4. Spec diff against the pinned mocks: 0 defects (or reasoned waivers) at 375 and 1440, both themes.

## 3. User stories

- As a developer who followed a link, I can read what Pipes is, see it, install it and read how it
  was built.
- As a visitor on the home page, I can reach the Pipes story from the Pipes entry.
- As a keyboard or screen-reader user, the badges, carousels and table of contents are operable and
  announced. Links that open a new tab say so.

## 4. Functional requirements

### /pipes

1. Prerendered route at `/pipes` inside the existing header, footer and theme.
2. Hero: breadcrumb `feedMyPixel / Products / Pipes`, pixel pair beside h1 "Pipes", pitch, lead,
   actions (solid "Chrome Web Store", ghost "Firefox Add-ons", ghost "Source" with the GitHub mark),
   fact line with a "Privacy policy" link to `/pipes/privacy` (render copy, June 2026).
3. Screenshots band: eyebrow, h2, the home page Pipes carousel unchanged (four composed slides,
   theme-following shots, counter `01 / 04  Status from your toolbar`), then Problem / Solution /
   Product with the home page copy.
4. Build story: sticky table of contents and stack list from 960px; article with five sections;
   the framed store set carousel (five 1280x800 shots, counter `01 / 05  Side panel`) after the
   stack paragraph in "How it's built"; "Built with Claude" as one paragraph; both store buttons
   under "Try it".
5. Nothing after the build story but the footer.
6. Title "Pipes - CI/CD pipeline monitoring in your browser | feedMyPixel", render description,
   share image `static/pipes/og-image.png` (the 1400x560 marquee tile, decision 13).
7. Listed in `sitemap.xml`.

### Home Products

8. Pipes entry links: solid "Chrome Web Store", ghost "Firefox Add-ons", ghost "Source", ghost
   "How I built it" with a chevron to `/pipes`, as the status entry's link.

### Shared

9. Store links are the site's own buttons, not badges (decision 4).
10. External links open a new tab and carry the visually hidden "(opens in a new tab)" hint.

## 5. Decisions (taken at build)

| # | Question | Decision |
|---|---|---|
| 1 | Live month | June 2026 (Ben). |
| 2 | Sharing with `/status` | Extract `ProductHero`, `ProductScreenshots` and `BuildStory` from the status sections; status migrates in the same change. Two pages showing the same thing is one component with different content. |
| 3 | Pipes slides and copy | Move from `Products.svelte` to `src/lib/data/pipes.ts`; home and `/pipes` read the same data. |
| 4 | Store links | The site's own buttons (solid Chrome, ghost Firefox), as the home entry. The official badges were built and dropped: next to each other they took the eye (Ben, after review). Same for status's App Store and Google Play. |
| 5 | (merged into 4) | |
| 6 | (merged into 4) | |
| 7 | Store URLs | The real listings already in `config.ts`, not the render's placeholders. |
| 8 | Header and footer | Unchanged site-wide (status decision 8). The render's "Pipes privacy" footer link is not added; the fact line links to the policy. |
| 9 | "that workflow" sentence | Removed with its `/status#claude` link (Ben, after review). |
| 10 | Carousel internals | The repo's `Carousel` as on `/status` (status decisions 5 and 6): settle-then-sync guard, dots as `role=group` with `aria-current`. |
| 11 | Framed store set | Not themed (it is the store listing as published). WebP derivatives at 2x display width from the pinned originals, by `scripts/resize-screens.py`. |
| 12 | Element map | Moves from `design/status-v7/` to `design/element-map.json` now it covers more than one bundle. The home surface points at the v8 home mock. |
| 13 | Share image | The bundle's `marquee.png` is a 960x720 side-panel crop; the README's 1400x560 is `framed/7-marquee-tile.png`, the store marquee. The tile is used, as `og-image.png` like the site's own. |
| 14 | "Why I built it" copy | Ben's rewrite after review: "current gig", "multiple repositories", "(PRs)" and "(MRs)", "to be able to see" and the closing line about teams. "teammates work" without an apostrophe (Ben). "what's" keeps its apostrophe; full stop added. |
| 15 | "How it's built" opening | Ben's rewrite after review: "The browser is where I am a lot... out of the corner of my eye felt ideal. I had always wanted to build a browser extension as I use them a lot, so this ticked all the boxes." The no-server and tokens sentences go (the hero facts and Product copy still say both). "this felt ticked" read as "this ticked". |
| 16 | Carousel caption row | On a phone the dots always sit on their own row under the counter, so they do not jump between slides. From 680px the counter and dots align with the slides' edges. From 1280px the slides take the full content width and the chevrons sit in the page margin (Ben, after review). Applies to every carousel. |

## 6. Non-goals

- Release, merging to `main` or adding `/pipes` to `llms.txt` before go.
- A dedicated OG image (the marquee tile stands in).
- The promo and marquee tiles in the framed carousel.
- Changing the header, footer or any other home section.

## 7. Design considerations

Tokens only, scoped component CSS, existing bricks first (`Button`, `Carousel`, `ComposedSlide`,
`ProductStory`, `PixelMark`, `Seo`, `ExternalLink`). New bricks: `StoreBadge` and the three shared
page sections.

## 8. Technical considerations

- Shared sections take content through snippets; their class names stay as on `/status` so the
  status element map keeps measuring the same nodes.
- Design check: `pnpm design:check` with `design/element-map.json`.

## 9. Success metrics

- Spec diff empty or waived with reasons: `/pipes`, `/status` and home products, 375 and 1440,
  both themes.
- Paired gallery viewed. check, lint, unit, e2e (incl. axe) and visual tests green.

## 10. Open questions

None.
