# Handoff: Pipes product page

Builds on `design_handoff_status_v7` (live at feedmypixel.com). One deliverable plus two small home page edits:

1. **New route `/pipes`**: feedMyPixel's page about Pipes, Ben's first product.
2. **Home page Pipes entry**: a "How I built it" ghost button (chevron icon) → `/pipes`, after
   "Source". The Solution column loses its comma before "and" (copy rule).

## About the design files

`render/*.dc.html` are **design references in HTML**. They run for real in a browser (open with
`support.js` and the asset folders alongside, as copied here) and every state is reachable by
interacting with them. Recreate `/pipes` as Svelte 5 components in the existing SvelteKit site,
reusing the `/status` components. Do not ship the HTML.

## Fidelity

**High-fidelity.** Colours, type, spacing and copy are final. Build story copy is Ben's and must be
used as written (first person, plain hyphens, no em or en dashes, no comma before "and" or "or").

## Build on the locked system

`_ds/tokens.css` and `_ds/base.css` are the same files as `design_handoff_status`; nothing new
is added to the system. The one new state class is `.fmp-badge:hover` (border-strong + shadow-md),
used on the store badges only.

**`/pipes` is `/status` with different content.** Same header, footer, breadcrumb hero, sunken
screenshots band, Problem / Solution / Product grid, build story grid with sticky aside, TOC and
stack `dl`, back-to-top. Two structural differences, both already live on `/status`:

- Every scrolling strip is the shared carousel (arrows, dots, counter). The `figcaption` is
  `flex-wrap:wrap` with `gap: space-2 space-4` so on a phone the dots drop below the counter.
- No "More from feedMyPixel" section. The build story is followed by the footer.

---

## `/pipes` (`render/Pipes.dc.html`)

### Hero
- Breadcrumb: `feedMyPixel / Products / Pipes`.
- Pixel pair + h1 "Pipes".
- Pitch: "CI/CD pipeline monitoring that lives in your browser and goes loud the moment a default
  branch breaks."
- Lead: "Watches the repos you choose across GitHub Actions and GitLab CI/CD. A badge in your
  toolbar, a popup for a glance and a side panel to keep open."
- Actions (`[data-hero-actions]`): **Chrome Web Store badge**, **Firefox Add-ons badge**, ghost
  "Source" (GitHub icon) → https://github.com/feedmypixel/pipes.
- Fact line (mono xs, top rule): "Chrome and Firefox · No server · No tracking · Read-only tokens,
  kept in your browser · Privacy policy · Live in the Chrome Web Store and Firefox Add-ons, June
  2026". "Privacy policy" links to `/pipes/privacy`. **Month to be confirmed by Ben.**

### Store badges
The render draws the badges in HTML at 56px (hero) and 52px ("Try it") so the layout is exact.
**Replace them with the official badge assets at build time**: Google's "Available in the Chrome
Web Store" badge and Mozilla's "Get the Add-on" Firefox badge, same heights, `--radius-md` is
not applied to the official images. Store URLs are placeholders (`chromewebstore.google.com`,
`addons.mozilla.org`): swap for the real listings. One `aria-label` per badge as in the render.

### Screenshots (sunken band, `#screenshots`)
- Eyebrow "Screenshots", h2 "A popup for a glance, a side panel to keep open."
- The **home page Pipes carousel, unchanged**: four composed 16:10 slides (`[data-status-slide]`),
  caption left, shot right as a finished card, shots follow the site theme from
  `assets/pipes/<view>-<light|dark>.png`. Captions, sub-lines and image styling are in the
  status handoff README; the render has them too.
- Counter: `01 / 04  Status from your toolbar`.
- Problem / Solution / Product: the home page copy (Solution without the comma).

### Build story (`#story`)
- Eyebrow "The build story", h2 "How and why I built Pipes, with Claude."
- Aside: TOC (`#why #how #claude #try #thanks`) and stack list:
  Extension: Svelte 5, TypeScript, Manifest V3 · Build: Vite, crxjs · Stores: Chrome Web Store,
  Firefox Add-ons · Source: GitHub, public for reference · Built with: Claude Design, Claude Code.
  Every tool linked (URLs in the render).
- Article: copy verbatim from the render. Links inside the copy: GitLab, GitHub, Svelte 5,
  TypeScript, Vite, crxjs, Manifest V3, ai-dev-tasks, Claude Design, Claude Code, "my own skills"
  (github.com/feedmypixel/principles), "that workflow" → `/status#claude`.
- Inside "How it's built", after the stack paragraph: the **framed store set carousel**. Five
  1280x800 shots from `assets/pipes/framed/`, one slide per viewport, `aspect-ratio:16/10`,
  `--surface-inset` ground, `1px border-default`, `--radius-lg`, `object-fit:cover`. Shared
  carousel chrome. Counter: `01 / 05  Side panel`. Labels: Side panel, Author attribution,
  Popup, Failure notification, Options. The promo and marquee tiles are not used.
- "Built with Claude" is one paragraph. No bullet list and no tip box on this page.
- "Try it": the paragraph, then both store badges at 52px.
- "Thanks": Svelte, crxjs, Claude by Anthropic, Ryan Carson for ai-dev-tasks.

### Meta
Title "Pipes - CI/CD pipeline monitoring in your browser | feedMyPixel". `og:image` points at
`assets/pipes/marquee.png` (1400x560) on the site; swap if a dedicated OG image is made.

### State
`theme` (from `localStorage['fmp-theme']`), `slide` (screenshots band), `slide2` (framed
set), `mobileOpen`, `showTop`. Each carousel has its own strip ref and 700ms in-flight guard.

---

## Home page (`render/feedMyPixel.dc.html`)
- Pipes entry buttons: solid "Chrome Web Store", ghost "Firefox Add-ons", ghost "Source", ghost
  "How I built it" (chevron) → `/pipes`. Same markup as the status entry's link.
- Solution: "Pipes watches the repos you choose across GitHub Actions and GitLab CI/CD and
  surfaces the status in your toolbar. Loud when the default branch fails, quiet when it is green."

## Assets in this drop
- `render/assets/pipes/{popup,sidepanel,options,failure-notification}-{light,dark}.png` (as live).
- `render/assets/pipes/framed/1..5-*.png`: five framed store shots, 1280x800.
- `render/assets/pipes/marquee.png`: OG image candidate.
- `render/assets/favicon.png`, `apple-touch-icon.png` (unchanged).

## Open items (owner: Ben)
- Live month (June 2026) in the fact line.
- Real Chrome Web Store and Firefox Add-ons listing URLs (hero, aside, "Try it", home page).
- Official badge image files from Google and Mozilla.
