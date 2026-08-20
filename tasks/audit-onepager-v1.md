# Audit — one-pager v1 (`design_handoff_onepager_v1`)

Source bundle: `~/Documents/feedMyPixel/portfolio/design-drops/design_handoff_onepager_v1`
Spec of record: `render/feedMyPixel.dc.html` (the `<style>` block + the `class Component` logic). `_ds/*.css`
is a diff export, not an import. Screenshots are proof, not source.

## Step 0

- **Bundle complete** ✅ — `_ds/` present (tokens.css + base.css), working render, BEHAVIOR/STATES/CHANGELOG, screenshots, real assets (CV PDF, og, Pipes shots).
- **Scope change** — this one-pager **supersedes** the earlier multi-page plan. Removed from v1: blog, RSS, mailing list, stat teaser, standalone Components page, multi-page nav, "hire me" framing. v1 = one scroll: Hero → Products (Pipes) → Experience (CV search) → Contact. `tasks/tasks-prd-feedmypixel-site.md` is stale for v1.
- **Does not fit one session** — split below (A–D), foundation first. Each slice commits to `main`.
- **Lands on** `main` (current site stays live on `master` until cutover). Commit straight to `main`, husky-gated (Ben's call).

## Build sessions

- **A · Foundation** — deps (adapter-static, fontsource), layered styles system (tokens/base/objects/utilities/patterns), self-hosted Plus Jakarta Sans + DM Mono, app shell + skip link, no-flash theme init, **Toast** brick, **ThemeToggle**, **Header** (+ sliding nav indicator), **Footer**.
- **B · Hero + Products** — Hero, **EmailPill** (shared: hero + contact aside), CV-download, Pipes copy + store badges, **Carousel**.
- **C · Experience** — `experience.ts` (27 roles) + pure `cv-filter` logic, **CvSearch** (combobox/listbox, facets, chips, segments, quick, results, empty).
- **D · Contact + wiring** — **ContactForm** (Field/validation/error-summary/honeypot/Web3Forms), aside, real URLs, SEO/AEO (JSON-LD, meta, og, sitemap, llms.txt), gates + a11y + review.

## Brick decomposition (all BUILD — greenfield, no existing inventory)

Layout `+layout.svelte` (skip-link · header · main · footer · toast region) · `Header` · `Footer` · `Logo` ·
`ThemeToggle` · `Toast` + `toasts.svelte.ts` store · `EmailPill` (shared hero+contact) · `Button` (solid/ghost treatments) ·
`Carousel` · `CvSearch` → {`SearchCombobox`, `SuggestionList`, `Chip`, `SegmentedControl`, `QuickFilters`, `RoleCard`, `Tag`, `EmptyState`} ·
`ContactForm` → {`Field`} · `Seo`. Pure logic: `experience.ts`, `cv-filter.ts` (facets, matchesChips, blob search, filter pipeline — unit-tested).

## Design debt NOT to port

| Debt in render | Port to |
| --- | --- |
| Google Fonts CDN (`fonts.googleapis.com`, 11 families) | Self-host Plus Jakarta Sans (`@fontsource-variable`) + DM Mono (`@fontsource`) |
| Inline `style=` on every element; DC `style-hover`/`style-focus` attrs | Scoped component `<style>`, real `:hover`/`:focus-visible`, tokens only |
| `[data-type]` 11-typeface switcher + Tweaks panel + `data-props` enum | Drop; root font = Plus Jakarta Sans directly |
| `quickFilters` boolean toggle (Tweaks) | Drop toggle; quick filters always on |
| `.fmp-*` global state classes in base.css | Scoped per-component styles (Camp B) |
| `!important` (used to beat inline in DC) | Unneeded once inline is gone |
| `--font-display/--font-text` default 'Manrope' in `:root` | Default to Plus Jakarta Sans (shipped face) |

## Deviations from the render (agreed)

- **Toast depleting bar** — the render depletes a white bar over the mood fill; ships as a **dark**
  bar (`--toast-progress-fill: rgb(0 0 0 / 38%)`) on a faint light track, per Ben on review.
- **Inline links underline by default** — WCAG 1.4.1; the render relied on colour alone.
- **`/components` is public and linked from the footer** (was noindex + unlinked) — it is a portfolio
  artifact in its own right.
- **Section links are root-relative via `resolve()`** (`/#products`), so header/footer/drawer work from
  `/components` too rather than dead-ending on a missing anchor.

## Coverage gate

Branch threshold is **75** (others 80). Svelte compiles each dynamic attribute into an update branch
that a unit test cannot reach — after switching hrefs to `resolve()`-based interpolation, Footer reads
50% branches on three pure-interpolation lines while statements/functions/lines stay ~98%. Gaming that
with artificial re-render tests would buy nothing.

**Resolved.** Sessions C and D added enough genuinely branchy logic (filter pipeline, keyboard
handling, validation) to lift the real figure. All four thresholds are back at **80**, with branches
measuring 86.6%.

## Questions for the product owner (Ben)

1. **Mobile nav (conflict, blocks Header).** BEHAVIOR.md + STATES.md spec a hamburger drawer ≤759px; the render has none (desktop nav just hides, logo + theme toggle remain). Render wins per skill → **no top nav on mobile** (sections reachable by scroll; footer has section links). Build the drawer BEHAVIOR describes, or ship render-as-is? **Default: build a minimal disclosure** (never dead-end) unless you say otherwise.
2. **GOV.UK Digital Marketplace URL.** Render links the generic homepage; the service has largely wound down. Do you have a live profile URL, or swap the link (drop it / point elsewhere)? Appears in contact aside + footer.
3. **Pipes store URLs.** Chrome + Firefox badges are placeholder homepages; GitHub Source is real (`github.com/feedmypixel/pipes`). Real store URLs, or is Pipes unpublished → **hide** the unpublished badges (no dead-ends), keep Source?
4. **LinkedIn** — render links generic `linkedin.com`; use `linkedin.com/in/benchidgey`? (per global brief).
5. **Footer company line.** Render: "feedMyPixel Ltd · Ben Chidgey · St Albans, UK". Global brief wanted "© feedMyPixel Ltd established 2012. Company number 08198085". Which ships?
6. **Web3Forms access key** — needed for ContactForm (session D).

## Prose-vs-render conflicts (render wins)

- Mobile drawer: specced in prose, absent in render → see Q1.
- Fonts: prose/brief say self-hosted; render uses Google CDN → self-host (brand/CSP intent beats the render's convenience CDN).

## Rows

Verdict key: **BUILD** = new brick (all rows — greenfield). Evidence = `file:line` once built. Spec source = `feedMyPixel.dc.html`.

### A · Foundation

| # | Element / behaviour | Spec source | Verdict | Codebase target | Evidence | Done |
| --- | --- | --- | --- | --- | --- | --- |
| A1 | Token set (`:root` + `[data-theme=dark]`) — surfaces, ink, blue ramp, moods (oklch), field, type scale (clamp), space, radii (pixel 2–4px), shadow, motion, z, focus | `dc.html:31-91` | BUILD | `src/lib/styles/tokens.css` | | ☐ |
| A2 | Cascade layers entry (`@layer tokens,base,objects,utilities,patterns`) | stat-ui arch | BUILD | `src/lib/styles/app.css` | | ☐ |
| A3 | Base — reset, `box-sizing`, `:focus-visible`, `::selection`, link underline-on-hover, reduced-motion, keyframes `fmp-deplete`/`fmp-rise`, iOS text-size | `dc.html:28-30,102-138` | BUILD | `src/lib/styles/base.css` | | ☐ |
| A4 | Every-Layout objects `.stack`/`.cluster`/`.center` | stat-ui arch | BUILD | `src/lib/styles/objects.css` | | ☐ |
| A5 | Utilities `.visually-hidden` (replaces inline clip-rect a11y labels) | `dc.html:273,304` | BUILD | `src/lib/styles/utilities.css` | | ☐ |
| A6 | Self-hosted Plus Jakarta Sans (display+text) | debt table | BUILD | `@fontsource-variable/plus-jakarta-sans` + tokens | | ☐ |
| A7 | Self-hosted DM Mono (mono) | `--font-mono` | BUILD | `@fontsource/dm-mono` + tokens | | ☐ |
| A8 | adapter-static + full prerender | brief | BUILD | `svelte.config.js`, root `+layout.ts` | | ☐ |
| A9 | App shell — skip link, sticky header slot, main, footer slot, toast region; body bg/ink tokens | `dc.html:142-167,446-473` | BUILD | `src/routes/+layout.svelte` | | ☐ |
| A10 | No-flash theme init from `localStorage['fmp-theme']` before paint | `dc.html:481` | BUILD | `src/app.html` inline script | | ☐ |
| A11 | Toast — `role=status`, mood bg (info/positive/critical), 8s depleting bar, dismissible, rise-in, bottom-center stack, `pointer-events` | `dc.html:464-473,703-710` | BUILD | `Toast.svelte` + `toasts.svelte.ts` | | ☐ |
| A12 | ThemeToggle — sun/moon (CSS swap), toggle `data-theme`, persist, fire info toast | `dc.html:159-162,716-721` | BUILD | `ThemeToggle.svelte` | | ☐ |
| A13 | Logo mark (blue square + 2 white pixels), → `#top`, aria-label | `dc.html:148-151` | BUILD | `Logo.svelte` | | ☐ |
| A14 | Header — sticky, blur, desktop nav (Products/Experience/Contact), `aria-current`, theme toggle | `dc.html:146-165,600-612` | BUILD | `Header.svelte` | | ☐ |
| A15 | Sliding nav indicator — IntersectionObserver active section (`-45% rootMargin`) + measured `getBoundingClientRect`, animated left/width, resize-safe, PE (no JS = no indicator) | `dc.html:157,484-518,613-614` | BUILD | `Header.svelte` | | ☐ |
| A16 | Mobile nav ≤759px | see Q1 | BUILD | `Header.svelte` | | ☐ |
| A17 | Footer — logo, company line, section + external links | `dc.html:448-462` | BUILD | `Footer.svelte` | | ☐ |
| A18 | Skip-to-content link (focus reveal) | `dc.html:144` | BUILD | `+layout.svelte` | | ☐ |

### B · Hero + Products

| # | Element / behaviour | Spec source | Verdict | Codebase target | Evidence | Done |
| --- | --- | --- | --- | --- | --- | --- |
| B1 | Hero — mono eyebrow, h1 "Software that makes you smile" (balance), sub, top rule client list | `dc.html:170-190` | BUILD | `routes/+page.svelte` / `Hero.svelte` | | ☐ |
| B2 | CV download — real `download` link to PDF in `static/` | `dc.html:177-180` | BUILD | Hero | | ☐ |
| B3 | EmailPill — `mailto:` + copy button, clipboard→positive/critical toast, fallback when no clipboard API | `dc.html:181-186,722-731` | BUILD | `EmailPill.svelte` (shared) | | ☐ |
| B4 | Hero actions reflow (column → row ≥760px) | `dc.html:134,176` | BUILD | Hero (container/media) | | ☐ |
| B5 | Products intro — eyebrow, h2, sub, sunken band | `dc.html:194-198` | BUILD | `Products.svelte` | | ☐ |
| B6 | Pipes heading (pixel dots mark) + description | `dc.html:203-207` | BUILD | Products | | ☐ |
| B7 | Store badges — Chrome (solid) / Firefox (ghost) / GitHub Source (ghost + icon) | `dc.html:208-215` | BUILD | Products (see Q3) | | ☐ |
| B8 | Carousel — scroll-snap strip, 4 real shots, lazy imgs, hidden scrollbar, `tabindex=0` | `dc.html:219-227,684-689` | BUILD | `Carousel.svelte` | | ☐ |
| B9 | Carousel prev/next — scroll by card width, overlay pill → outside at ≥1400px | `dc.html:228-229,777-778`; `base.css:26-33` | BUILD | `Carousel.svelte` | | ☐ |
| B10 | Carousel dots (`role=tablist`) + caption, both synced to scroll position (onScroll rAF) | `dc.html:231-238,691-698,772-776` | BUILD | `Carousel.svelte` | | ☐ |
| B11 | Problem/Solution/Product 3-col `auto-fit minmax(250px,1fr)` → 1-col | `dc.html:242-255` | BUILD | Products | | ☐ |
| B12 | Button treatments — `solid`/`ghost` hover states in stylesheet | `base.css:34-35`; `dc.html` various | BUILD | `Button.svelte` | | ☐ |

### C · Experience (CV search)

| # | Element / behaviour | Spec source | Verdict | Codebase target | Evidence | Done |
| --- | --- | --- | --- | --- | --- | --- |
| C1 | Data — 27 roles `{company,title,dates,type,location,sector,summary,tags[]}` | `dc.html:522-551` | BUILD | `src/lib/data/experience.ts` | | ☐ |
| C2 | Facet derivation — tags→skill, company→client, sector→sector, counts, sorted (count desc, label asc) | `dc.html:554-569` | BUILD | `cv-filter.ts` (unit) | | ☐ |
| C3 | Filter pipeline — segment AND chips AND free-text blob; chip match by kind | `dc.html:573-583,621-622` | BUILD | `cv-filter.ts` (unit) | | ☐ |
| C4 | Search combobox — `role=combobox`/`listbox`, `aria-expanded`/`-controls`/`-activedescendant`/`-autocomplete` | `dc.html:271-294,738-758` | BUILD | `SearchCombobox.svelte` | | ☐ |
| C5 | Suggestions — facets filtered by query, minus chosen, live count per (recomputed vs current controls), top 7, kind label | `dc.html:282-291,636-660` | BUILD | `SuggestionList.svelte` | | ☐ |
| C6 | Keyboard — ↑/↓ wrap, Enter adds, Esc closes, Backspace-empty pops last chip | `dc.html:738-753` | BUILD | `SearchCombobox.svelte` | | ☐ |
| C7 | Outside-click / focus close of listbox | `dc.html:492-500` | BUILD | `SearchCombobox.svelte` | | ☐ |
| C8 | Chips — kind+label, AND-combine, dedupe, remove `×`, clears query on add | `dc.html:297-309,662-671` | BUILD | `Chip.svelte` | | ☐ |
| C9 | Segmented control — All/Contract/Freelance/Permanent, `aria-pressed`, single-select | `dc.html:313-317,673-677`; `base.css:16-17` | BUILD | `SegmentedControl.svelte` | | ☐ |
| C10 | Quick filters — SvelteKit/Node/TypeScript/Accessibility/AWS/Government (Government=sector) | `dc.html:318-325,679-682` | BUILD | `QuickFilters.svelte` | | ☐ |
| C11 | Result count label — "N of 27" vs "27 roles"; clear-`×` when any filter | `dc.html:275-278,735,761-762` | BUILD | `CvSearch.svelte` | | ☐ |
| C12 | Role card — dates/meta col, company h3, title, summary, tag list, hot-tag highlight (chip or typed match) | `dc.html:337-354,624-633`; `base.css:19` | BUILD | `RoleCard.svelte` | | ☐ |
| C13 | Row grid reflow (1-col → `200px 1fr` ≥760px) | `base.css:37-38` | BUILD | `RoleCard.svelte` | | ☐ |
| C14 | Empty state — message + "Clear all filters" (resets q+chips+segment) | `dc.html:359-365,762` | BUILD | `EmptyState.svelte` | | ☐ |
| C15 | Results region `aria-live=polite` | `dc.html:334` | BUILD | `CvSearch.svelte` | | ☐ |
| C16 | No-JS fallback — full static role list + CV link; `<noscript>` | `dc.html:328-330` | BUILD | `CvSearch.svelte` (PE) | | ☐ |

### D · Contact + wiring

| # | Element / behaviour | Spec source | Verdict | Codebase target | Evidence | Done |
| --- | --- | --- | --- | --- | --- | --- |
| D1 | Contact intro — eyebrow/h2/sub, sunken band | `dc.html:370-374` | BUILD | `Contact.svelte` | | ☐ |
| D2 | Form — 2-col (form / aside) ≥760px, stacked below | `dc.html:376,135` | BUILD | `Contact.svelte` | | ☐ |
| D3 | Field brick — label → hint → error → input, `aria-describedby`/`-invalid`, focus ring | `dc.html:384-407` | BUILD | `Field.svelte` | | ☐ |
| D4 | On-submit validation — name/email(format)/message, verb-first errors, no trailing stops | `dc.html:786-801` | BUILD | `ContactForm.svelte` | | ☐ |
| D5 | Error summary `role=alert`, focus-managed, "N problems" | `dc.html:378-382,780-785` | BUILD | `ContactForm.svelte` | | ☐ |
| D6 | Honeypot — visually-hidden, `tabindex=-1` (Web3Forms `botcheck`) | `dc.html:409-412` | BUILD | `ContactForm.svelte` | | ☐ |
| D7 | Submit — Web3Forms POST, PE (native post no-JS; JS = async + success toast, no navigate), in-flight disabled window | `dc.html:377,802-804`; Q6 | BUILD | `ContactForm.svelte` | | ☐ |
| D8 | Contact aside — EmailPill, CV, Digital Marketplace, GitHub, LinkedIn | `dc.html:423-442` | BUILD | `Contact.svelte` (see Q2,Q4) | | ☐ |
| D9 | SEO head — title, description, og, twitter, icons | `dc.html:10-23` | BUILD | `Seo.svelte` / `app.html` | | ☐ |
| D10 | AEO — JSON-LD Person + Organization (roles), llms.txt, robots (AI crawlers) | PRD 7a-7d | BUILD | `structured-data.ts`, `static/` | | ☐ |
| D11 | sitemap.xml (prerendered) | PRD | BUILD | `routes/sitemap.xml/` | | ☐ |
| D12 | og-image, favicon, apple-touch-icon into `static/` | `dc.html:13-18` | BUILD | `static/` | | ☐ |

## Always-required (design won't mention) — carried as constraints on every row

Type safety (no `any`/`!`) · no silent failures · SOLID/DRY/YAGNI · tokens only, no magic numbers/raw hex outside tokens.css ·
container queries for component-internal responsive · light+dark both checked · a11y (focus-visible, keyboard, aria, WCAG AA both themes, reduced-motion) ·
no disabled buttons (bar in-flight submit) · empty/loading/error states · sentence case, plain hyphens, no trailing stop on short strings · PE (works before JS).
