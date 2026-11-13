# Tasks: status product page and Products carousel rework

From [`prd-status-page.md`](prd-status-page.md). Branch `feat/status-page`, not merged until go.

## Relevant files

- `src/lib/carousel.ts` - pure strip maths. Extend with offset-based index and scroll target.
- `src/lib/components/Carousel.svelte` - slide snippet, strip mode, keyed by index.
- `src/lib/components/Button.svelte` - `size` prop.
- `src/lib/components/Seo.svelte` - `image` and `imageAlt` props.
- `src/lib/components/Header.svelte` - logo label off the home page.
- `src/lib/components/PixelMark.svelte` - new.
- `src/lib/components/ProductStory.svelte` - new.
- `src/lib/components/ThemedImage.svelte` - new.
- `src/lib/components/StoreBadge.svelte` - new.
- `src/lib/components/ComposedSlide.svelte` - new.
- `src/lib/components/Products.svelte` - status entry, composed slides.
- `src/lib/components/status/*.svelte` - hero, screenshots, story, more.
- `src/routes/status/+page.svelte` - new route.
- `src/routes/sitemap.xml/+server.ts` - add `/status`.
- `src/lib/config.ts` - status URLs.
- `scripts/resize-screens.py` - derivatives from pinned originals.
- `static/status/`, `static/pipes/`, `static/badges/` - assets.
- `design/status-v7/element-map.json` - design check map and waivers.

## 0.0 Setup

- [x] 0.1 Branch `feat/status-page`, pin the mocks, inventory, design-check tooling.
- [ ] 0.2 Badge artwork from the official sources (needs Ben's OK to download).

## 1.0 Assets

- [x] 1.1 Resize script: frames, screens and Pipes shots at 2x display width.
- [x] 1.2 Generate into `static/status/` and `static/pipes/`; remove `framed-*.png`.

## 2.0 Bricks

- [x] 2.1 `Button` `size` prop (default 44px, `large` 48px), tests.
- [x] 2.2 `PixelMark`, `ProductStory`, `ThemedImage`, `Chevron`, `ExternalLink`, `ProductEntry`,
      `StatusStoreLinks`, with tests where they carry behaviour.
- [ ] 2.2a `StoreBadge` swap for both products, once the official badge artwork is in.
- [x] 2.3 `carousel.ts` offset maths, tests first.
- [x] 2.4 `Carousel` slide snippet + strip mode; every consumer migrated in the same change.
- [x] 2.5 `Seo` image props; `Header` logo label.

## 3.0 Home Products

- [x] 3.1 `ComposedSlide`, status and Pipes slide data.
- [x] 3.2 status entry first, Pipes second with a top rule.
- [x] 3.3 Update `Products` tests.

## 4.0 /status

- [x] 4.1 Route, Seo, sitemap.
- [x] 4.2 Hero, screenshots band, build story, more-from.

## 5.0 Gates

- [x] 5.1 Design check loop to an empty diff (max 5 iterations), waivers recorded.
- [x] 5.2 Paired gallery, both themes, 375 and 1440, viewed.
- [x] 5.3 Copy-rule check by node: no em or en dashes, no comma before "and" or "or".
- [ ] 5.4 check, lint, unit (file count), e2e + axe, visual baselines regenerated.
- [ ] 5.5 Independent review on the branch diff.
