# feedmypixel.github.io

The FeedMyPixel site — brochure + dev blog for Ben Chidgey (senior contract full-stack engineer)
and his products (Pipes, stat). A statically prerendered SvelteKit app (`@sveltejs/adapter-static`)
deployed to GitHub Pages at [feedmypixel.com](https://feedmypixel.com).

Project planning + PRDs live under [`tasks/`](./tasks). Visual design reference (claude.ai/design
output) lives under [`design/`](./design).

- [Stack](#stack)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Scripts](#scripts)
- [Layout](#layout)
- [Brand](#brand)
- [Styling](#styling)
- [Design](#design)
- [Deploy](#deploy)
- [Tasks / PRDs](#tasks--prds)

## Stack

- **SvelteKit 2** + **Svelte 5** (runes mode)
- **Vite 8** for bundling, **adapter-static** (full prerender) for output
- **mdsvex** for the Markdown dev blog
- **Vitest 4** + **Playwright** (e2e + axe a11y) for tests
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

## Layout

Target structure (built feature-by-feature per the task list):

```
src/
├── app.html                     # HTML shell, brand meta, favicons
├── app.d.ts                     # App namespace globals
├── lib/
│   ├── components/              # Header, Footer, Seo, NewsletterSignup, … (Svelte 5)
│   ├── data/                    # experience.ts (roles → explorer + JSON-LD + PDF)
│   ├── seo/                     # structured-data.ts (JSON-LD builders)
│   └── styles/                  # Layered app CSS — see styles/README.md
├── posts/                       # mdsvex blog posts
└── routes/
    ├── +layout.svelte           # Header + main + footer shell
    ├── +page.svelte             # Home (brochure)
    ├── work/                    # Experience explorer
    ├── about/                   # About
    ├── blog/                    # Blog index + [slug] posts
    ├── rss.xml/                 # RSS feed endpoint (prerendered)
    └── sitemap.xml/             # Sitemap endpoint (prerendered)

static/                          # CV PDF, robots.txt, llms.txt, icons — served at root
e2e/                             # Playwright specs
```

## Brand

Brand colour **Pixel Blue `#3294fc`** (the logo's blue square + white pixel motif; same blue family
as Pipes `#3194FC`). Used for identity/accent only. Typeface is being upgraded from Quicksand at the
design step. Full token vocabulary is established at the design-foundation step (`tasks/`).

## Styling

App-wide CSS is split by concern into cascade layers under `src/lib/styles/`
(`tokens` / `base` / `objects` / `utilities` / `patterns`) behind one `app.css` entry — mirroring the
[stat-ui](https://github.com/feedmypixel) architecture.

The load-bearing rule: **components are self-contained** (scoped `<style>`, depending only on
**tokens**) and **never use global utility classes**; utilities + layout objects
(`.stack`/`.cluster`/`.center`) are a **page/route call-site tool**; cross-component duplication is
DRY'd via **tokens, not shared classes**. Raw hex lives only in `tokens.css` (Stylelint-enforced).

## Design

Locked visual reference (HTML + CSS prototypes from [claude.ai/design](https://claude.ai/design))
lives under [`design/`](./design). Briefs (`design/brief-*.md`) drive each screen; outputs land in
`design/vN/`. Use those bundles as source-of-truth when implementing screens — but **don't import the
design CSS wholesale**; every component owns its own scoped styles using the tokens. No Figma.

## Deploy

Static build served by **GitHub Pages**. During the build phase the legacy holding page keeps serving
live from `master`; at cutover, Pages switches to a GitHub Actions build of `main` and `master` is
retired. CNAME `feedmypixel.com` is preserved throughout.

## Tasks / PRDs

Project plan, PRD, task list, and decisions live under [`tasks/`](./tasks):
[`prd-feedmypixel-site.md`](./tasks/prd-feedmypixel-site.md) and
[`tasks-prd-feedmypixel-site.md`](./tasks/tasks-prd-feedmypixel-site.md).
