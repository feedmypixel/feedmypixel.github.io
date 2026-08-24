# feedmypixel.github.io

The feedMyPixel site: a one-page portfolio for Ben Chidgey (contract full-stack engineer) and his
product Pipes. A statically prerendered SvelteKit app (`@sveltejs/adapter-static`) deployed to GitHub
Pages at [feedmypixel.com](https://feedmypixel.com).

Planning notes live under [`tasks/`](./tasks). Design briefs and claude.ai/design output live under
[`design/`](./design).

- [Stack](#stack)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Scripts](#scripts)
- [Layout](#layout)
- [Brand](#brand)
- [Styling](#styling)
- [Design](#design)
- [CV](#cv)
- [Privacy and analytics](#privacy-and-analytics)
- [SEO and AEO](#seo-and-aeo)
- [Deploy](#deploy)
- [Licence](#licence)

## Stack

- **SvelteKit 2** + **Svelte 5** (runes mode)
- **Vite 8** for bundling, **adapter-static** (full prerender) for output
- **Vitest 4** (browser mode) + **Playwright** (e2e + axe a11y) for tests
- **ESLint** + **Prettier** + **Stylelint** + **husky** + **lint-staged**

## Prerequisites

- Node `v24.14.1` (pinned via `.nvmrc`; `.npmrc` enforces it)
- pnpm (corepack-managed)

```bash
nvm use
```

## Setup

```bash
pnpm install
pnpm dev
```

The contact form posts to [Web3Forms](https://web3forms.com). Copy `.env.example` to `.env` and set
`VITE_WEB3FORMS_KEY` to exercise it locally; the same value is a repository secret for CI.

## Scripts

| Script                | Purpose                                       |
| --------------------- | --------------------------------------------- |
| `pnpm dev`            | Vite dev server                               |
| `pnpm build`          | Static build (adapter-static → `build/`)      |
| `pnpm preview`        | Preview the production build                  |
| `pnpm check`          | `svelte-kit sync && svelte-check`             |
| `pnpm lint`           | `prettier --check . && eslint . && stylelint` |
| `pnpm format`         | `prettier --write .`                          |
| `pnpm test:unit`      | Vitest unit tests with coverage               |
| `pnpm test:e2e`       | Playwright e2e (builds + previews, then runs) |
| `pnpm test:a11y`      | axe accessibility checks                      |
| `pnpm test:visual`    | Playwright visual-regression                  |
| `pnpm test`           | Unit + e2e                                    |
| `pnpm security-audit` | `pnpm audit --audit-level=moderate`           |

Unit tests run in **Vitest browser mode** against real Chromium, so `pnpm exec playwright install
chromium` must have run or whole test files skip silently.

## Layout

```
src/
├── app.html                     # HTML shell, no-flash theme script
├── app.d.ts                     # App namespace globals
├── lib/
│   ├── components/              # Header, Footer, Hero, Products, Experience, Contact, … (Svelte 5)
│   ├── data/                    # experience.ts (roles → CV search + JSON-LD)
│   ├── seo/                     # structured-data.ts (JSON-LD builders)
│   ├── styles/                  # Layered app CSS - see styles/README.md
│   ├── config.ts                # All environment + constant access, one place
│   └── consent.svelte.ts        # Consent state, gates analytics
└── routes/
    ├── +layout.svelte           # Header + main + footer shell
    ├── +page.svelte             # The one-pager (hero, products, CV search, contact)
    ├── components/              # Public component catalogue
    ├── pipes/privacy/           # Privacy policy for the Pipes extension
    └── sitemap.xml/             # Sitemap endpoint (prerendered)

scripts/cv-to-odt.py             # Renders tasks/cv-draft.md into the CV - see CV below
static/                          # CV PDF, robots.txt, llms.txt, icons, CNAME - served at root
e2e/                             # Playwright specs
```

## Brand

Brand colour **Pixel Blue `#3294fc`** (the logo's blue square + white pixel motif; same blue family
as Pipes `#3194FC`). Used for identity and accent only. Typefaces are **Plus Jakarta Sans** (display
and text) and **DM Mono**, self-hosted via `@fontsource`.

## Styling

App-wide CSS is split by concern into cascade layers under `src/lib/styles/`
(`tokens` / `base` / `objects` / `utilities` / `patterns`) behind one `app.css` entry - mirroring the
stat-ui architecture.

The load-bearing rule: **components are self-contained** (scoped `<style>`, depending only on
**tokens**) and **never use global utility classes**; utilities and layout objects
(`.stack`/`.cluster`/`.center`) are a **page/route call-site tool**; cross-component duplication is
DRY'd via **tokens, not shared classes**. Raw hex lives only in `tokens.css` (Stylelint-enforced).

Links follow one rule: hover always **changes** the underline state. Content links are underlined at
rest and lose it on hover; chrome links (nav, footer, buttons) are clean at rest and gain it.

## Design

Visual reference (HTML + CSS prototypes from [claude.ai/design](https://claude.ai/design)) lives
under [`design/`](./design). Briefs (`design/brief-*.md`) drive each screen. Use those bundles as
source-of-truth when implementing - but **don't import the design CSS wholesale**; every component
owns its own scoped styles using the tokens. No Figma.

## CV

`tasks/cv-draft.md` is the words. Everything else is generated from it.

```bash
python3 scripts/cv-to-odt.py                                              # → tasks/BenChidgeyCV.odt
soffice --headless --convert-to pdf --outdir static tasks/BenChidgeyCV.odt # → static/BenChidgeyCV.pdf
```

The ODT is gitignored, so edit the draft, never the ODT. Rendering needs **Plus Jakarta Sans** and
**DM Mono** installed locally, and LibreOffice for the PDF step.

Layout follows [`design/design_handoff_cv/STYLES.md`](./design/design_handoff_cv/STYLES.md), with
two deliberate deviations: `RoleHeadFirst` collapses into the other tiers (it keys off a page break
the generator cannot see), and `RoleBody`, chapter `RoleTech` and a degree's `EduDetail` carry
keep-with-next so a technology line, a role or a modules paragraph cannot strand from what it
belongs to.

Consecutive roles at one employer group into a run - employer and span printed once, each role
carrying its own dates - matching `src/lib/role-runs.ts`, so the CV and the site's Experience
section group identically.

> [!IMPORTANT]
> `src/lib/data/experience.ts` carries the same summaries, and its tags are a superset of the CV's.
> Nothing enforces that. Edit `cv-draft.md` and the site silently drifts - update both.

## Privacy and analytics

Google Analytics is **consent-gated**: nothing from Google is requested until the visitor accepts.
A browser-level opt-out (Global Privacy Control / Do Not Track) auto-declines and the banner never
appears. The choice is remembered and can be withdrawn from the footer.

## SEO and AEO

- Per-page title, description, canonical, Open Graph and Twitter cards via `Seo.svelte`
- JSON-LD `@graph` (`Organization`, `Person`, `WebSite`) built from the CV data
- `sitemap.xml` (prerendered), `robots.txt`, and an `llms.txt` summary for
  answer engines
- `robots.txt` explicitly welcomes answer-engine crawlers, including the retrieval bots
  (`OAI-SearchBot`, `Claude-SearchBot`, `Perplexity-User`) that fetch pages in order to cite them

## Deploy

Static build served by **GitHub Pages** from a GitHub Actions build of `main`
(`.github/workflows/deploy.yml`). `static/CNAME` keeps `feedmypixel.com` attached, and the workflow
fails the build if it goes missing. Documentation-only paths are excluded from the trigger so they
don't burn a deploy.

## Licence

Source code is [MIT](./LICENSE). The CV, feedMyPixel branding, product screenshots, and site copy are
**not** covered by it and remain all rights reserved. See [`NOTICE.md`](./NOTICE.md) for the full
list.
