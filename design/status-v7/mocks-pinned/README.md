# Handoff: status product page + Products carousel rework

Builds on `design_handoff_onepager` (live at feedmypixel.com). Two deliverables:

1. **New route `/status`**: feedMyPixel's page about status, Ben's second product.
2. **Home page Products section**: status entry added above Pipes, and both product carousels
   reworked to composed slides whose screenshots follow the site theme.

## About the design files

`render/*.dc.html` are **design references in HTML**. They run for real in a browser (open with
`support.js` and the asset folders alongside, as copied here) and every state is reachable by
interacting with them. The job is to **recreate them as Svelte 5 components in the existing
SvelteKit site**, using the patterns already in place from the one-pager build. Do not ship the
HTML.

## Fidelity

**High-fidelity.** Colours, type, spacing and copy are final. Copy is Ben's and must be used as
written (first person, plain hyphens, no em or en dashes, no comma before "and" or "or").

## Build on the locked system

`_ds/tokens.css` and `_ds/base.css` are re-exported verbatim from the live file for the
conformance check. Tokens are unchanged from `design_handoff_onepager`. `base.css` adds:

- `[data-status-slide]` / `[data-status-cap]` / `[data-status-phones]` mobile rules (stack the
  composed slide below 760px).
- `.fmp-prose` link styling and `.fmp-toc a:hover` (status page only).

Default typeface is `modern` (Plus Jakarta Sans). Drop the unused `[data-type]` variants at build
time as before.

---

## 1. `/status` page (`render/Status.dc.html`)

Lives inside the site's existing header and footer. Header nav links and footer links point back
to the home page sections (`/#products`, `/#experience`, `/#contact`). Header logo goes to `/`.

### Hero
- Breadcrumb (mono, xs): `feedMyPixel / Products / status`, first two are links.
- Two pixel squares (14px, `--accent`, second at 45% opacity) beside `h1` "status" (`--size-5xl`,
  bold, `--tracking-tight`). The squares mirror the 11px pair used on the Products h3s.
- Pitch, display font `--size-2xl` medium, `--ink-strong`, max 30ch:
  "An emoji and your status: break the ice and spark a conversation."
- Lead, `--size-lg`, `--ink-muted`, max 46ch:
  "React, reply and natter. Post an emoji and a few words. Your people react, reply or message you
  for a natter."
- Buttons (`[data-hero-actions]`, column below 760px, row above): solid "Open status.me" →
  https://status.me; ghost "App Store"; ghost "Google Play". **Store URLs are placeholders**
  (`apps.apple.com`, `play.google.com`), swap for the real listings.
- Fact line (mono xs, `--ink-subtle`, top rule): "Web, iPhone and Android · No ads · No tracking ·
  For 13 and over · Soft launched on the web, November 2026".

### Screenshots (sunken band, `#screenshots`)
- Eyebrow "Screenshots", h2 "Post. React. Reply. Natter."
- **Frame strip**: the seven store frames at their native 1:2 ratio, each
  `width:clamp(200px, 24vw, 280px)`, `gap:--space-4`, `scroll-snap-type:x mandatory`,
  `scroll-snap-align:start`. Several frames are visible at once with the next one peeking. Each has
  a mono caption below (`01 Everyone`, `02 People`, `03 Emoji`, `04 React`, `05 Year`, `06 Natter`,
  `07 No ads`).
- Chevrons and dots are the Pipes pattern unchanged (`.fmp-caro-frame` 64px gutter, hidden below
  680px). Counter caption reads `01 / 07  Everyone`.
- Prev/next scroll to the frame's `offsetLeft`. **Guard**: ignore `scroll` events for 700ms after
  a programmatic scroll, otherwise the first intermediate event re-syncs state to the old index
  and the snap container cancels the scroll. Same guard is needed on both home page carousels.
- Problem / Solution / Product columns below, same grid and mood colours as the Pipes entry.
  Copy is in the file.

### Build story (`#story`)
- Eyebrow "The build story", h2 "How and why I built status, with Claude, on SvelteKit".
- `[data-story-grid]`: one column; from 960px `220px minmax(0,1fr)` with `--space-16` gap and a
  sticky aside (`top: header-height + space-8`).
- Aside: "In this story" TOC linking to `#why #how #claude #try #thanks`, then a `dl` stack list
  (Web / Api / Apps / Built with) with every tool linked.
- Article: `.fmp-prose`, `max-width:66ch`, `--size-md`, `--leading-relaxed`, `gap:--space-5`.
  h3s are `--size-xl` semibold with `scroll-margin-top: header-height + space-6`. Use the copy as
  it is in the file (it has Ben's edits, including the "Claude is great when:" bullet list and the
  ADR / PRD / CC expansions). The tip paragraph sits in a `--surface-sunken` box, `--radius-lg`,
  `--ink-strong`, medium weight.
- Inside "How it's built": an inset strip (`--surface-inset`, `--radius-lg`, padding `--space-4`)
  of the nine plain screens at `clamp(132px, 14vw, 168px)` wide, 1:2, `scroll-snap-type:x
  proximity`. Screens follow the site theme (`light/` or `dark/` folder). Tweak `screensTheme`
  (follow | light | dark) exists in the render for review only; ship "follow".
- "Try it" repeats the three buttons at the 44px size.

### More from feedMyPixel (`#more`, sunken band)
Eyebrow, h2 "status is the second product. Pipes came first.", one line of copy, buttons: solid
"Home" (chevron icon) → `/`, ghosts "Pipes" → `/#products`, "Experience", "Contact".

### Meta
`og:image` and `twitter:image` → https://status.me/og.png (reuse, do not copy). Title
"status - an emoji and your status | feedMyPixel".

---

## 2. Home page Products section (`render/feedMyPixel.dc.html`)

### Order
status first, Pipes second. The second entry has `padding-top:--space-16` and a
`--border-default` top rule; the first has `margin-top:--space-16` only.

### status entry
Same anatomy as Pipes: pixel pair + h3 "status", lead (the pitch plus "React, reply and
natter."), buttons: solid "Open status.me", ghosts "App Store", "Google Play", "How I built it"
(chevron icon) → `/status`. Then the carousel, then Problem / Solution / Product.

### Composed carousel slides (both products)
The store frames are portrait and the Pipes shots are near-square, so neither fits a 16:10 slide
as an image. Slides are now **composed live**:

```
<div data-status-slide  flex:0 0 100%; aspect-ratio:16/10; display:flex; surface-raised; 1px border-subtle; radius-lg; overflow:hidden>
  <div data-status-cap   flex:1 1 0; column; justify:center; gap:space-4; padding: space-10 space-6 space-10 space-10>
    <span>  mono xs, tracking-wide, ink-subtle           e.g. "01"
    <p>     display, size-3xl, bold, leading-tight, ink-strong, text-wrap:balance   caption
    <p>     size-base, leading-relaxed, ink-muted, max 30ch                          sub-line
  <div data-status-phones flex:1.1 1 0; display:flex; align-items:flex-start; justify:center; gap:space-5; padding: 8% space-8 0; overflow:hidden>
    <img …>
```

Below 760px (`base.css`): the slide drops its aspect ratio and stacks; the image column is 300px
tall, phones are `min(60%, 220px)` wide and a second phone is hidden; Pipes shots go full width.

**status slides (7)**, screenshots from `uploads/1206x2622/<light|dark>/`, following the site
theme. Slide 02 uses the opposite theme so home is not shown twice in a row (as the store set
does). Phones: `height:104%; width:auto`, top corners `--radius-lg`, `1px border-default` with no
bottom border, `--shadow-lg`, so they bleed off the slide floor by ~15px. Paired slides (01, 04,
07) overlap: second phone `margin-top:12%; margin-left:-18%; position:relative; z-index:1`.

| # | Caption | Sub-line | Shots |
|---|---|---|---|
| 01 | How is everyone? | Post an emoji and a few words. Your people see it pop up. | home, replies |
| 02 | Bring your people | Follow friends and family. Everyone gets a square. | home (flipped theme) |
| 03 | Your status with an emoji | One emoji, one line. A full post is not required. | composer |
| 04 | React and reply, spark that conversation | React with an emoji or reply under the status. | replies, reactions |
| 05 | Your week, your year | Every status becomes a square on your profile. | profile |
| 06 | Natter more, privately | Take it to a private message when there is more to say. | messages |
| 07 | No ads. No tracking. | Sign in by email link or passkey. For 13 and over. | discover, activity |

**Pipes slides (4)**, screenshots from `assets/pipes/<view>-<light|dark>.png`, following the site
theme. Shots are shorter than the column, so they sit as finished cards: `width:100%;
height:auto; align-self:center; margin-bottom:8%; --shadow-lg`; windows get `--radius-lg` and a
`1px border-default`, the notification gets `--radius-2xl` and no border.

| # | Caption | Sub-line | File |
|---|---|---|---|
| 01 | Status from your toolbar | One click through to the run that failed. | popup |
| 02 | Every repo in a side panel | GitHub Actions and GitLab CI/CD, grouped how you choose. | sidepanel |
| 03 | Connect GitHub and GitLab | Your tokens never leave your browser. No server. | options |
| 04 | Loud the moment it breaks | A notification the moment a default branch fails. | failure-notification |

The old `framed-*.png` Pipes images are no longer used.

Counter caption format on both carousels: `NN / 07  Caption`.

### Product copy change
Fly.io is no longer mentioned anywhere. status Product column: "A SvelteKit and Svelte 5 web app
with a Fastify and PostgreSQL api. iPhone and Android apps are Capacitor shells around the live
site. Sign in by email link or passkey. No ads and no tracking."

---

## State
- Home: `theme`, `slide` (Pipes), `slide2` (status), plus the existing state. Each carousel has its
  own strip ref and in-flight guard.
- Status page: `theme` (read from `localStorage['fmp-theme']`, same key as home), `slide`,
  `mobileOpen`, `showTop` (back-to-top appears past 600px scroll).

## Assets in this drop
- `render/uploads/1206x2622/01..07-*.png`: seven store frames, 1206x2622.
- `render/uploads/1206x2622/{light,dark}/01..09-*.png`: nine plain screens, both schemes.
- `render/assets/pipes/{popup,sidepanel,options,failure-notification}-{light,dark}.png`.
- `render/assets/favicon.png`, `apple-touch-icon.png`, `Ben-Chidgey-CV.pdf` (unchanged, for the
  render to run).
In the site repo, put the status images under `static/assets/status/` and update paths.

## Open items (owner: Ben)
- Real App Store and Google Play URLs (three places on `/status`, one on home).
- Whether to keep the `screensTheme` tweak; recommendation is to drop it.
- "Then I checked what was built by looking over, making sure its done correctly and iterating
  and teching if its not." is verbatim from Ben; confirm "its" and "teching" before shipping.
