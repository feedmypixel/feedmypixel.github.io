# Tasks: Pipes product page

From [`prd-pipes-page.md`](prd-pipes-page.md). Branch `feat/product-pages` (status and Pipes pages
release together), not merged until go.

## Relevant files

- `src/lib/components/product/ProductHero.svelte` - new, from `StatusHero`.
- `src/lib/components/product/ProductScreenshots.svelte` - new, from `StatusScreenshots`.
- `src/lib/components/product/BuildStory.svelte` - new, from `StatusStory`.
- `src/lib/components/status/*.svelte` - status content on the shared sections.
- `src/lib/components/pipes/*.svelte` - new: hero, screenshots, story.
- `src/lib/components/StoreBadge.svelte` - new.
- `src/lib/components/Products.svelte` - Pipes data from `data/pipes.ts`, "How I built it".
- `src/lib/data/pipes.ts` - new: slides, story copy, framed set.
- `src/lib/config.ts` - Pipes share image.
- `src/routes/pipes/+page.svelte` - new route.
- `src/routes/sitemap.xml/+server.ts` - add `/pipes`.
- `scripts/resize-screens.py` - framed set derivatives.
- `scripts/design/design-check.mjs` - map path.
- `static/pipes/`, `static/badges/` - assets.
- `design/element-map.json` - moved; `pipes` surface added.
- `e2e/pipes.e2e.ts` - new.
- `src/lib/components/pipes/PipesCarousel.svelte` - new, the Pipes carousel for home and `/pipes`.
- `src/lib/carousel.ts` - `slideNumber`, replacing five copies.
- `src/lib/components/Carousel.svelte` - caption keeps its width; dots wrap below on a phone.
- `src/routes/components/+page.svelte` - `StoreBadge` entry; Pipes slide from `data/pipes.ts`.
- `eslint.config.js` - `StoreBadge` links off-site, like `ExternalLink`.

## 0.0 Setup

- [x] 0.1 Pin the v8 mocks at `design/pipes-v8/mocks-pinned/`.
- [x] 0.2 Move the element map to `design/element-map.json`; repoint the home surface at v8.

## 1.0 Assets

- [x] 1.1 Badges into `static/badges/`.
- [x] 1.2 Framed set WebP derivatives and the share image (`og-image.png`, decision 13) into
      `static/pipes/`.

## 2.0 Shared sections

- [x] 2.1 `ProductHero`, `ProductScreenshots`, `BuildStory`; status migrated, its tests and design
      check unchanged.
- [x] 2.2 `StoreBadge`, tests, catalogue entry.

## 3.0 Home Products

- [x] 3.1 `data/pipes.ts`; `Products` reads it through `PipesCarousel`.
- [x] 3.2 "How I built it" on the Pipes entry, tests.

## 4.0 /pipes

- [x] 4.1 Route, Seo, sitemap.
- [x] 4.2 Hero, screenshots band, build story.

## 5.0 Gates

- [x] 5.1 Design check loop to an empty diff (max 5 iterations), waivers recorded.
- [x] 5.2 Paired gallery, both themes, 375 and 1440, viewed.
- [x] 5.3 Copy-rule check: no em or en dashes, no comma before "and" or "or".
- [x] 5.4 check, lint, unit, e2e + axe. No visual specs exist yet (`e2e/visual/` is empty).
- [x] 5.5 Independent review on the branch diff. Applied: product names on the two "How I built
      it" links, framed card ratio from the data.
