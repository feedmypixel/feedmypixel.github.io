# Tasks: FeedMyPixel Site (brochure + dev blog)

From `prd-feedmypixel-site.md`. Junior-dev implementable.

## Relevant Files

- `design/brief-global.md` - Brief for Claude Design: tokens, typography, header/footer (do first).
- `design/brief-home.md` - Brief: home/brochure sections.
- `design/brief-experience.md` - Brief: Work / experience explorer (search/filter/toggle + PDF).
- `design/brief-blog.md` - Brief: blog index + post template.
- `design/brief-about.md` - Brief: about page.
- `design/vN/` - Claude Design visual outputs (versioned), source for translation.
- `src/lib/styles/app.css` - Style entry: `@layer tokens, base, objects, utilities, patterns;` + imports (mirrors stat-ui).
- `src/lib/styles/tokens.css` - Design tokens; only place raw hex (stylelint-enforced).
- `src/lib/styles/base.css` - Josh Comeau reset + element defaults.
- `src/lib/styles/objects.css` - Every-Layout primitives (`.stack/.cluster/.center`), page/layout call-site only.
- `src/lib/styles/utilities.css` - Single-purpose classes (`.visually-hidden`).
- `src/lib/styles/patterns.css` - Named patterns (`.card`, `.page-header`).
- `src/lib/styles/README.md` - Component/utility boundary (Camp B), mirrored from stat-ui.
- `.stylelintrc.json` - Stylelint (hex-only-in-tokens), mirrored from stat-ui.
- `src/lib/config.ts` - Central config: site URL, Buttondown endpoint, GA id, social links (named exports).
- `src/routes/+layout.svelte` - App shell: header + footer, imports `app.css` + fontsource fonts.
- `src/routes/+layout.ts` - `export const prerender = true`.
- `src/lib/components/Header.svelte` - Site header (logo + nav).
- `src/lib/components/Footer.svelte` - Site footer (socials, company line, RSS link).
- `src/lib/components/Seo.svelte` - Per-page title/meta/canonical/OG/Twitter tags.
- `src/lib/components/JsonLd.svelte` - Emits JSON-LD structured data (Person/Org/BlogPosting/roles).
- `src/lib/seo/structured-data.ts` - Builders for the JSON-LD objects (typed).
- `src/lib/seo/structured-data.test.ts` - Tests for the JSON-LD builders.
- `src/lib/components/Analytics.svelte` - Google Analytics (gtag).
- `src/lib/components/NewsletterSignup.svelte` - Buttondown subscribe form (PE: native POST fallback).
- `src/lib/components/NewsletterSignup.test.ts` - Tests for signup states.
- `src/routes/+page.svelte` - Home (brochure): hero, services, work/proof, products, latest posts, CTA.
- `src/routes/about/+page.svelte` - About Ben (fuller).
- `src/lib/data/experience.ts` - Single source of truth: all roles (feeds explorer + JSON-LD + PDF).
- `src/lib/data/experience.test.ts` - Tests for the experience data shape/integrity.
- `src/lib/components/ExperienceExplorer.svelte` - Static role list + JS-enhanced search/filter/toggle.
- `src/lib/components/ExperienceExplorer.test.ts` - Tests for filter/search/empty-state logic.
- `src/routes/work/+page.svelte` - Work page (renders the explorer + PDF download).
- `static/ben-chidgey-cv.pdf` - Maintained CV PDF for download.
- `src/lib/posts.ts` - Load + sort post frontmatter, exclude `draft` in production.
- `src/lib/posts.test.ts` - Tests for post loading/sorting/draft filtering.
- `src/routes/blog/+page.svelte` - Blog index (newest-first list).
- `src/routes/blog/[slug]/+page.svelte` - Post template (title, date, body, subscribe prompt).
- `src/routes/blog/[slug]/+page.ts` - Resolve post by slug, prerender entries.
- `src/posts/pipes-build-story.md` - First post (the Pipes build story).
- `src/routes/rss.xml/+server.ts` - Prerendered RSS/Atom feed from post frontmatter.
- `src/routes/rss.xml/server.test.ts` - Test feed validity/contents.
- `src/routes/sitemap.xml/+server.ts` - Sitemap (excludes drafts).
- `static/robots.txt` - Robots file (allows reputable AI crawlers).
- `static/llms.txt` - Concise factual brief of the site for LLMs (AEO).
- `static/CNAME` - `feedmypixel.com` (preserve through cutover).
- `svelte.config.js` - adapter-static + mdsvex (already present); extend mdsvex (highlighting) if needed.
- `mdsvex.config.js` - mdsvex options (syntax highlighting, layout) if extracted from svelte.config.
- `.github/workflows/deploy.yml` - Build + deploy to GitHub Pages.
- `e2e/site.spec.ts` - Playwright e2e for critical flows (nav, experience filter, subscribe, post, RSS).
- `playwright.config.ts` - Playwright config.

### Notes

- **Branch model:** each parent task (1.0–9.0) ships as its own branch off `dev` → PR into `dev`.
  `master` keeps serving the live legacy page until cutover (9.0). Task 0.0 covers the first branch;
  re-branch off `dev` per parent.
- **Design dependency:** build tasks translate Claude Design outputs in `design/vN/`. Briefs (1.x)
  come first; Ben drives Claude Design to produce the visuals; then translate to tokens + Svelte.
  No Figma.
- **stat-ui is the architecture reference** (`~/Projects/status/stat-ui/src/lib/styles`): cascade
  layers, tokens-only-hex, Camp B component/utility boundary, self-hosted fonts. Keep FMP's blue brand.
- **Progressive enhancement is load-bearing** for the experience explorer and the newsletter: render
  full content statically; JS only enhances.
- Tests live next to source. Use `test` not `it`; Vitest globals via ESLint (don't import them).
- Run unit tests with `pnpm test`, e2e with `pnpm exec playwright test`.
- Verify a11y (axe), performance (Lighthouse), and structured data (Rich Results) before cutover.
- Mark each sub-task `- [x]` on completion, updating this file as you go.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 From up-to-date `dev`, create + checkout the first feature branch (e.g. `feat/design-foundation`)

- [ ] 1.0 Design foundation (briefs → tokens → styles system)
  - [ ] 1.1 Write `design/brief-global.md` (brand kept; stat-ui system; typeface upgrade; header/footer/tokens)
  - [ ] 1.2 Write `design/brief-home.md`, `design/brief-experience.md`, `design/brief-blog.md`, `design/brief-about.md`
  - [ ] 1.3 Confirm exact brand hex from the logo SVG (`#3294fc`); record in the global brief
  - [ ] 1.4 (Ben + Claude Design) produce visual designs into `design/v1/` from the briefs
  - [ ] 1.5 Set up styles system mirroring stat-ui: `app.css` layer entry + `.stylelintrc.json` (hex-only-in-tokens) + `styles/README.md` (Camp B)
  - [ ] 1.6 Extract tokens into `tokens.css` (colour incl. Pixel Blue, type scale, spacing, radii, motion, focus, z-index) from `design/v1/`
  - [ ] 1.7 Create `base.css` (Josh Comeau reset + defaults), `objects.css` (`.stack/.cluster/.center`), `utilities.css`, `patterns.css`
  - [ ] 1.8 Self-host the chosen webfont(s) via `@fontsource-variable`, imported in `+layout.svelte` (no Google Fonts)

- [ ] 2.0 Site shell (layout, header, footer, SEO + AEO, a11y, analytics)
  - [ ] 2.1 Create `src/lib/config.ts` (site URL, social links, GA id, Buttondown endpoint — named exports)
  - [ ] 2.2 Build `Header.svelte` (logo + nav: Home/Work/Blog/About + Hire CTA; semantic, keyboard-friendly)
  - [ ] 2.3 Build `Footer.svelte` (GitHub + LinkedIn, company line, copyright, RSS link)
  - [ ] 2.4 Wire `+layout.svelte` (header/footer, import `app.css` only + fontsource fonts) and confirm `+layout.ts` prerender
  - [ ] 2.5 Build `Seo.svelte` (title, meta description, canonical, OG, Twitter card) and use per route
  - [ ] 2.6 Build `structured-data.ts` + `JsonLd.svelte`; emit `Person` + `Organization` site-wide (+ `BreadcrumbList`)
  - [ ] 2.7 Add `Analytics.svelte` (gtag `G-9LQ8KHG828`, async) and include in layout
  - [ ] 2.8 Add `static/robots.txt` (allow GPTBot/ClaudeBot/PerplexityBot/Google-Extended), `static/llms.txt`, favicon/app-icon set, confirm `static/CNAME`
  - [ ] 2.9 Verify shell renders + navigates with JavaScript disabled

- [ ] 3.0 Brochure pages (home + about)
  - [ ] 3.1 Translate home design into `+page.svelte` shell + section structure
  - [ ] 3.2 Hero (who Ben is + value: senior contract full-stack; simple, well-made, quality)
  - [ ] 3.3 Services section (full-stack build, web design, architecture, dev-ops/infra, a11y, design systems)
  - [ ] 3.4 Selected work / proof (pedigree + WhiskyInvestDirect rebuild) with a prominent link to /work
  - [ ] 3.5 Products section (Pipes — live, CWS + repo links; stat — coming soon) framed as Ben's own products under FeedMyPixel
  - [ ] 3.6 Latest posts (most recent 2–3 from `posts.ts`, link to blog) — depends on 5.1
  - [ ] 3.7 Contact / hire CTA (email; always-clickable) + short "about Ben"
  - [ ] 3.8 Build `about/+page.svelte` (fuller about) per the about design
  - [ ] 3.9 `Seo.svelte` + `JsonLd` data for home + about

- [ ] 4.0 Work / experience explorer (+ PDF)
  - [ ] 4.1 Build `src/lib/data/experience.ts` from the CV (all roles: company, title, dates, location, type, summary, sector, expertise tags) + `experience.test.ts`
  - [ ] 4.2 Build `work/+page.svelte` rendering all roles as semantic static HTML, newest-first (no-JS baseline)
  - [ ] 4.3 Build `ExperienceExplorer.svelte` — JS enhancement: free-text search across company/title/summary/tags
  - [ ] 4.4 Add filter (expertise-tag chips + sector) with active-filter display + clear-all, and a view/sort toggle
  - [ ] 4.5 Empty state ("no matches · clear filters"), controls stay operable; never dead-end + `ExperienceExplorer.test.ts`
  - [ ] 4.6 Add maintained `static/ben-chidgey-cv.pdf` + a "Download CV (PDF)" affordance on the page
  - [ ] 4.7 Emit work-history JSON-LD (roles) via `structured-data.ts`; `Seo.svelte` data for /work
  - [ ] 4.8 Verify the full experience list is readable + the PDF downloads with JavaScript disabled

- [ ] 5.0 Dev blog (mdsvex pipeline, index, post template, RSS, first post)
  - [ ] 5.1 Build `src/lib/posts.ts` (import frontmatter, sort newest-first, exclude `draft` in prod) + `posts.test.ts`
  - [ ] 5.2 Confirm/extend mdsvex config for syntax highlighting (extract `mdsvex.config.js` if cleaner)
  - [ ] 5.3 Build `blog/+page.svelte` (index: title, date, summary, newest-first)
  - [ ] 5.4 Build `blog/[slug]/+page.svelte` + `+page.ts` (post template; subscribe prompt; prerender entries)
  - [ ] 5.5 Write first post `src/posts/pipes-build-story.md` (frontmatter: title, date, summary, slug, tags)
  - [ ] 5.6 Emit `BlogPosting` JSON-LD per post; `Seo.svelte` data for index + posts
  - [ ] 5.7 Build `rss.xml/+server.ts` (valid RSS/Atom, prerendered) + `server.test.ts`; link feed in `<head>` + footer
  - [ ] 5.8 Build `sitemap.xml/+server.ts` (all routes + posts, exclude drafts)
  - [ ] 5.9 Verify post renders + code highlighting with JavaScript disabled

- [ ] 6.0 Email capture (Buttondown)
  - [ ] 6.1 Create Buttondown account/list; record endpoint in `config.ts`; document RSS-to-email setup in repo
  - [ ] 6.2 Build `NewsletterSignup.svelte` (subscribe; inline success/error; no dead-ends) + `NewsletterSignup.test.ts`
  - [ ] 6.3 Progressive enhancement: native form POST (or hosted-page link) works with JS disabled
  - [ ] 6.4 Place signup on home + work + blog/post; verify a subscribe round-trip

- [ ] 7.0 Testing & quality gates
  - [ ] 7.1 Set up Playwright (`playwright.config.ts`) for the static preview build
  - [ ] 7.2 e2e (`e2e/site.spec.ts`): nav, home renders, experience search/filter, post renders, subscribe path, RSS valid
  - [ ] 7.3 Run axe-core on home, work, blog index, post template — zero violations
  - [ ] 7.4 Run Lighthouse on home + work + a post — Perf/A11y/Best-Practices/SEO ≥ 95
  - [ ] 7.5 Validate JSON-LD in Google Rich Results (Person, Organization, BlogPosting, roles); confirm `llms.txt` reachable
  - [ ] 7.6 Confirm full no-JS usability (nav, content, experience list, subscribe)

- [ ] 8.0 Deploy (GitHub Actions → Pages)
  - [ ] 8.1 Write `.github/workflows/deploy.yml` (pnpm install, build, upload Pages artifact, deploy)
  - [ ] 8.2 Confirm `adapter-static` output + base path for apex Pages; `CNAME` preserved
  - [ ] 8.3 Trigger a build on a non-production target and verify the artifact serves correctly
  - [ ] 8.4 Confirm `feedmypixel.com/pipes-feedback/` (separate repo) untouched

- [ ] 9.0 Cutover (zero-downtime, reversible)
  - [ ] 9.1 With the Actions build verified, switch repo Pages source from legacy `master` to GitHub Actions (building `dev`)
  - [ ] 9.2 Verify `feedmypixel.com` serves the new site; smoke-test home, work, blog, RSS, subscribe
  - [ ] 9.3 Rename `master` → `main`; set as live/default
  - [ ] 9.4 Document the rollback path (switch Pages source back) in the repo
