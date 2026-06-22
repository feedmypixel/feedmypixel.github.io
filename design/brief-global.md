# FeedMyPixel — Global design brief (foundation)

**For:** [claude.ai/design](https://claude.ai/design). Deliver an HTML + CSS prototype that
establishes the **design system + global chrome** (header, footer) for feedmypixel.com. Do this
first — home/blog/about build on it. Output is a **visual brief** for re-implementation as
Svelte 5 components, not production code.

## Reference system — base off `stat`

Ben's most up-to-date product, **stat** (`~/Projects/status/stat-ui`), already has a mature,
locked design system from claude.ai/design. **Mirror its architecture and token vocabulary** so
this site feels like the same hand built it and translates cleanly. Differences: stat is a BFF
app, this is a static site; and **stat's brand is warm coral — this site keeps FeedMyPixel's own
Pixel Blue** (see Brand). Adopt stat's *system*, not its *hue*.

Mirror from stat (`src/lib/styles/`):

- **Cascade layers** via one entry `app.css`: `@layer tokens, base, objects, utilities, patterns;`
  then `@import ... layer(...)` per file.
- **`tokens.css`** — `:root` custom properties, the **only** place raw hex lives. Full vocabulary:
  surfaces, ink/neutrals, brand, form-states, mood accents, type families/sizes/weights,
  line-heights, tracking, spacing (4px base), radii, motion, z-index, focus, shadows.
- **`base.css`** — Josh Comeau reset + element defaults (token-driven body rhythm, iOS-16px input
  floor, `:focus-visible`, reduced-motion, `text-wrap: balance/pretty`).
- **`objects.css`** — Every-Layout primitives `.stack` / `.cluster` / `.center` (page/layout call-site
  tool only).
- **`utilities.css`** — single-purpose classes (`.visually-hidden`).
- **`patterns.css`** — named multi-property patterns (`.card`, `.page-header`).
- **Camp B component/utility boundary** — components are self-contained: scoped `<style>`, **tokens
  the only global dependency**; never a global utility/object class inside a component. Cross-component
  DRY via tokens, not shared classes.
- **Dark theme = pure token swap** via `[data-theme='dark']` (stat's "Steel") — no per-component dark
  CSS. Welcome bonus here, not required.
- **Self-hosted variable fonts** via `@fontsource-variable/*` (no Google Fonts) — deterministic,
  CSP-friendly.

## Who / what this is

**Ben Chidgey — FeedMyPixel.** Senior contract full-stack engineer (20+ yrs: Guardian, BBC,
HMRC/GDS, DEFRA, Wayfair; currently a greenfield SvelteKit rebuild for WhiskyInvestDirect). Also
ships his own products (**Pipes**, a Chrome extension; **stat**, coming).

Site is **services-led** — win work, prove craft — products as evidence he ships. It is also the
portfolio piece: its quality *is* the pitch. **Spirit:** *simple, well-made, quality.*

## Brand (kept — do not redesign)

- **Name:** `feedMyPixel` (lowercase f, camel; "Ltd" sometimes trails small).
- **Logo:** a `#3294fc` blue square with a white **pixel** motif. Pixel theme = the brand's DNA;
  lean into it tastefully (pixels, grid, crafted detail), never gimmicky.
- **Brand colour — Pixel Blue `#3294fc`.** Identity / accent only (CTAs, links, marks), not large
  fills. Same blue family as Pipes (`#3194FC`) — keep them related. This replaces stat's coral as
  the `--brand` accent; build the neutral scale + states around the blue, not coral.

## What's open (your call — propose)

- **Typeface.** stat uses Quicksand (display+body) + Nunito (heavy-weight fallback) + JetBrains
  Mono (labels/timestamps), self-hosted, no italic. Ben wants to **upgrade from Quicksand** for
  this site — propose a crafted, confident, long-form-legible typeface (or pairing), self-hostable
  via `@fontsource-variable`. Show headings + body + code.
- **Neutrals + theme.** Propose a neutral scale around Pixel Blue. Light theme primary; dark a bonus
  (token swap).
- **Mood.** Engineer's-craftsmanship, not agency-gloss. Confident, calm, generous whitespace,
  intentional type. Avoid templated SaaS-landing clichés.

## Global chrome to design

- **Header:** logo + name, primary nav (Home · Work · Blog · About · a Contact/Hire CTA), mobile treatment,
  keyboard-focusable, clear active state.
- **Footer:** GitHub (`github.com/feedmypixel`), LinkedIn (`in/benchidgey`), RSS link, company line
  ("© feedMyPixel Ltd established 2012. Company number 08198085"), newsletter-prompt slot.

## Constraints (the site is the proof)

- WCAG 2.1 AA: contrast, visible focus, semantic structure, reduced-motion.
- Progressive enhancement — must work as plain HTML/CSS; JS only enhances.
- Self-documenting, restrained. Every element earns its place.

## Principles to bake in

- **Units: rem, not px** — honour the user's root font size. Type + space on a modular scale; tune
  line-heights for **vertical rhythm**.
- **Responsive: container queries** (`@container`) for component-internal layout; viewport media
  queries only for page/layout decisions — keeps components drop-anywhere.
- **Never dead-end the user.** Every state offers a way forward. **No disabled buttons** (only the
  transient in-flight window after submit); empty states carry a CTA; errors say what + the way out;
  404 routes home. Action never applies in a state → hide it; not yet → keep it live + explain on click.
- **One clear primary action per screen** — main path obvious, everything else quieter. Progressive
  disclosure for secondary/advanced.
- **Honour preferences:** `prefers-reduced-motion`, `prefers-color-scheme`, user font size.

## Deliver

Token foundations (annotated hex/rem, stat vocabulary, blue brand), typography specimen, header +
footer (desktop + mobile), light theme (dark optional), one self-contained HTML page. Flag any token
the later pages will need.
