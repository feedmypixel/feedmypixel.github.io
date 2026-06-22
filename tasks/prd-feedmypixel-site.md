# PRD: FeedMyPixel Site (brochure + dev blog)

**Status:** Draft for review · **Owner:** Ben Chidgey · **Created:** 2026-06-22
**Repo:** `feedmypixel.github.io` · **Branch model:** features → PRs into `dev`; `master` stays live until cutover

---

## 1. Introduction / Overview

FeedMyPixel.com is Ben Chidgey's professional home: a senior contract full-stack engineer
who builds simple, well-made, quality products. The current live page (a single static
holding page on `master`) reads as a 2012-era business card and undersells 20+ years of
work across the Guardian, BBC, HMRC/GDS, DEFRA, Wayfair and a current greenfield SvelteKit
rebuild.

This project replaces it with an **awesome, design-led brochure site plus a dev blog** —
rebuilt on the proven SvelteKit static stack. Two jobs:

1. **Hire-me / credibility.** A site that *is* the portfolio piece — its craft proves the
   pitch. Services-led: Ben as the engineer you hire.
2. **Owned channel.** A blog + email list that compounds, so products (Pipes now, stat
   next) launch to an audience that already exists instead of from zero each time
   (see `MARKETING.md`, moved into this repo).

The site is also the **first real design→code pipeline run with Claude Design** — designs
are produced in Claude Design, then translated to Svelte. Defining that translation is part
of this work.

## 2. Goals

1. Ship a brochure home, a dev blog (mdsvex) with RSS, and email capture — the full owned
   channel — in v1.
2. Make the site itself evidence of craft: fast, accessible (WCAG 2.1 AA), progressively
   enhanced, works without JS.
3. Keep the FeedMyPixel brand — name, logo, colour — while raising the bar on everything else.
4. Establish a repeatable Claude Design → Claude Code translation pipeline (briefs → design →
   tokens → Svelte components).
5. Deploy via GitHub Actions → Pages with zero-downtime, reversible cutover from the legacy
   `master` page.
6. Present Ben's work experience as a snazzy, interactive explorer (search / filter / toggle)
   with a downloadable PDF — from a single structured data source.
7. Win at both SEO and AEO: structured data (JSON-LD), AI-crawler-friendly, factual and
   well-structured so Google ranks it and answer engines (ChatGPT/Perplexity/etc.) cite it.

## 3. User Stories

- **As a prospective client / hiring lead**, I land on the home page and within seconds
  understand what Ben does, the calibre of his work, and how to contact him.
- **As a fellow developer** arriving from Hacker News / Reddit / a blog post, I read a
  genuinely useful write-up, see the products behind it (Pipes, stat), and can subscribe so
  I hear about the next thing.
- **As a returning reader**, I subscribe by email or RSS and get notified of new posts and
  product launches without checking back.
- **As Ben**, I write a post in Markdown, commit it, and it publishes — index, RSS and (via
  Buttondown) email all update with no manual steps.
- **As any visitor on any device**, the site loads fast, is keyboard- and screen-reader
  friendly, and works even if JavaScript fails.

## 4. Functional Requirements

### Site-wide
1. The site must be a statically prerendered SvelteKit app (`adapter-static`, full prerender)
   served from GitHub Pages at `feedmypixel.com`.
2. Every page must render its core content and navigation without JavaScript (progressive
   enhancement); JS enhances, never gates.
3. The site must provide a persistent header (logo + nav) and footer (social links: GitHub,
   LinkedIn; company line; copyright).
4. The site must meet WCAG 2.1 AA: semantic landmarks, visible focus, colour contrast,
   keyboard operability, reduced-motion support.
5. The site must set per-page `<title>`, meta description, canonical URL, and Open
   Graph / Twitter card tags for shareable previews.
6. The site must include `sitemap.xml`, `robots.txt`, and a favicon/app-icon set.
7. The site must carry Google Analytics (gtag, ID `G-9LQ8KHG828` from the current site),
   loaded async and not blocking core content.

### SEO + AEO (answer-engine optimisation)
7a. Every page must emit valid **JSON-LD structured data**: `Person` (Ben) + `Organization`
    (FeedMyPixel) site-wide; `BlogPosting` per post; the work history as structured roles;
    `BreadcrumbList` where relevant. Validate against Google Rich Results.
7b. `robots.txt` must explicitly **allow reputable AI crawlers** (e.g. GPTBot, ClaudeBot,
    PerplexityBot, Google-Extended) — discoverability by answer engines is a goal.
7c. The site must publish an **`llms.txt`** (root) summarising who Ben is, what FeedMyPixel
    does, the products, and key links — a concise, factual brief for LLMs.
7d. Content must be semantic and factual (clear headings, real prose, no keyword stuffing) so
    answer engines can extract and cite it accurately.

### Home (brochure)
8. The home page must lead with a hero stating who Ben is and the value he offers
   (senior contract full-stack engineer; simple, well-made, quality products).
9. The home page must present a **What I do / services** section (e.g. full-stack build,
   web design, architecture, dev-ops/infra, accessibility, design systems).
10. The home page must present **selected work / proof**: client pedigree (e.g. Guardian,
    BBC, HMRC/GDS, DEFRA, Wayfair) and the current WhiskyInvestDirect SvelteKit rebuild.
11. The home page must present **products**: Pipes (live, link to Chrome Web Store + repo)
    and stat (coming soon), as proof Ben ships his own products.
12. The home page must surface the **latest blog posts** (most recent 2–3, linking to the blog).
13. The home page must present a clear primary **contact / hire CTA** (email; never a
    dead-end disabled control) and the **newsletter signup**.

### Experience explorer
13a. Ben's full work history must live in a **single structured data source**
     (`src/lib/data/experience.ts`): per role — company, title, dates, location, type
     (contract/permanent), summary, sector, and expertise tags. This source feeds the
     explorer UI, the JSON-LD, and the PDF.
13b. An experience page/section must render **all roles as static HTML** (works with no JS),
     newest-first.
13c. JavaScript must **enhance** the list with: free-text **search**, **filter** by expertise
     tag and/or sector, and a **toggle** control (e.g. group/sort, or contract-only). With JS
     off, all roles remain visible and readable.
13d. Filter/search controls must never dead-end: empty results show a clear "no matches +
     clear filters" state; controls stay operable.
13e. The page must offer a **downloadable CV PDF**. v1: a maintained PDF in `static/`
     (the current CV) with a download link. (Build-time generation from the data source is a
     possible later enhancement — out of scope for v1.)

### Dev blog
14. Blog posts must be authored as Markdown/mdsvex files in the repo and prerendered to
    static HTML.
15. There must be a blog index listing posts newest-first with title, date, and summary.
16. Each post must render title, publish date, reading time (optional), body, and
    author/footer with a subscribe prompt.
17. Posts must support code blocks with syntax highlighting (these are dev write-ups).
18. The blog must expose a valid **RSS/Atom feed** at a stable URL, linked from `<head>` and
    the footer.
19. Post metadata (title, date, summary, slug, tags, draft flag) must come from frontmatter;
    `draft: true` posts must be excluded from the index, RSS and sitemap in production.

### Email capture (Buttondown)
20. The site must let a visitor subscribe by email via Buttondown (embedded form or Buttondown
    API), with success and error states shown inline (no dead-ends).
21. Subscription must degrade gracefully: with JS disabled, the form must still submit to
    Buttondown (native form POST) or clearly link to the hosted Buttondown page.
22. New blog posts should be deliverable to subscribers via Buttondown's RSS-to-email
    (configuration, not code — documented in the repo).

### Deploy & cutover
23. A GitHub Actions workflow must build the SvelteKit site and deploy it to GitHub Pages on
    merge to the chosen production branch.
24. `CNAME` (`feedmypixel.com`) and apex DNS behaviour must be preserved through cutover.
25. Cutover must be zero-downtime and reversible: `master` keeps serving the legacy page until
    the Actions build is verified, then Pages source is switched; rollback is switching back.
26. The `feedmypixel.com/pipes-feedback/` privacy URL (separate `pipes-feedback` repo) must
    not be touched.

## 5. Non-Goals (Out of Scope)

- No CMS, database, comments, or any server-side runtime — static only.
- No user accounts, auth, or gated content.
- No e-commerce, booking, or payment.
- No full case-study detail pages in v1 (selected-work summaries only; deep case studies
  are a later iteration).
- No multi-language / i18n.
- No redesign of the Pipes extension or stat — they are linked-to, not rebuilt here.
- No paid newsletter tier.

## 6. Design Considerations

- **Brand kept:** name `feedMyPixel`, the existing logo, and the brand colour stay. Exact
  brand hex to be locked from the logo SVG at the design-brief step. Typeface is open —
  upgrade from Quicksand, options proposed at the design-brief step.
- **About:** short "about Ben" on the home page plus a fuller `/about` route — exact split is
  Claude Design's call.
- **Voice:** simple, well-made, quality. Authentic builder-scratching-own-itch tone (per
  `MARKETING.md`) over polished-agency gloss.
- **System reference — base off `stat`:** mirror the mature design system + CSS architecture in
  `~/Projects/status/stat-ui` (Ben's most current product). Adopt its *system* — token vocabulary,
  cascade layers, component/utility boundary, self-hosted fonts — while keeping FeedMyPixel's own
  Pixel Blue brand (stat is coral; this is blue). They are sibling brands under FeedMyPixel, not the
  same skin.
- **Craft bar:** typography scale, vertical rhythm, rem units, and a small token set per the
  `claude-principles` css/ux skills. The site must look intentional, not templated.
- **Design source:** screens designed in **Claude Design** (no Figma), then translated
  straight to Svelte from the visual references. Mirror the existing Pipes convention
  (`design/BRIEF-*.md` + versioned `design/vN/` folders) in this repo:
  - Per-page/section **briefs** (`design/brief-<page>.md`) kick off Claude Design.
  - Design outputs land in `design/vN/`.
  - A defined translation step turns designs into design tokens + Svelte components.
- **Deliverable — Claude Design briefs:** before build, produce briefs for the home sections,
  blog index, post template, and the global header/footer so Claude Design can start.

## 7. Technical Considerations

- **Stack (proven):** SvelteKit 2 + Svelte 5 runes + `adapter-static` (full prerender) +
  `mdsvex` + pnpm. Build already emits static `build/`.
- **CSS architecture (mirror `stat`):** one `app.css` entry declaring
  `@layer tokens, base, objects, utilities, patterns;` then `@import` per file. `tokens.css` is the
  only place raw hex lives (stylelint-enforced). Josh Comeau reset in `base.css`; Every-Layout
  objects (`.stack/.cluster/.center`). **Camp B boundary:** components are self-contained — scoped
  `<style>`, tokens the only global dependency, never a global utility/object class inside a
  component; cross-component DRY via tokens, not shared classes. Self-host variable fonts via
  `@fontsource-variable` (no Google Fonts). Optional dark theme = token swap via `[data-theme]`.
- **Config discipline:** any env/config (e.g. Buttondown endpoint, site URL) read once via a
  central config module, consumed by named exports — no scattered `import.meta.env` /
  `process.env`.
- **RSS:** generate at build time from post frontmatter (prerendered endpoint).
- **Design→code pipeline (no Figma):** Claude Design output (visual references) is translated
  straight to Svelte — extract design tokens from the designs, map to Svelte components, then a
  review/sync loop against the reference. No Figma, no Figma MCP.
- **Testing:** behaviour-focused per `claude-principles` testing-strategy — a few e2e
  (Playwright) for critical flows (nav, subscribe, post renders, RSS valid), light unit tests
  for feed/frontmatter logic. Tests next to source, `test` not `it`.
- **Accessibility & performance** verified before cutover (axe / Lighthouse).

## 8. Success Metrics

- Lighthouse: Performance, Accessibility, Best Practices, SEO all ≥ 95 on home and a post.
- Zero axe-core violations on home, blog index, and post template.
- Site fully usable with JavaScript disabled (nav, content, full experience list, subscribe path).
- JSON-LD validates clean in Google Rich Results (Person, Organization, BlogPosting, roles);
  `llms.txt` published and AI crawlers allowed in `robots.txt`.
- Experience explorer: search/filter/toggle work as an enhancement and degrade to the full list;
  CV PDF downloads.
- Email list exists and grows from zero post-launch; new posts auto-deliver to subscribers.
- Owned-channel goal met: the Pipes build-story post live at launch, with the email list and
  RSS wired so the next posts compound toward the stat launch.
- Cutover completed with no downtime on `feedmypixel.com` and a proven rollback path.

## 9. Open Questions

1. ~~Analytics~~ — **Resolved: keep Google Analytics** (gtag `G-9LQ8KHG828`). The no-tracking
   stance is Pipes' (the product), not this site — no conflict.
2. ~~Design pipeline routing~~ — **Resolved: no Figma.** Claude Design → visual references →
   tokens → Svelte direct.
3. **Brand hex:** confirm exact brand colour(s) from the logo SVG at the design-brief step.
   ~~Typeface~~ — **Resolved: upgrade from Quicksand**, options proposed at design-brief step.
4. ~~About page~~ — **Resolved: both** — short on home + fuller `/about`; split is Claude
   Design's call.
5. ~~Cutover target~~ — **Resolved: as planned** — Pages builds `dev` via Actions, then rename
   `master` → `main` as live/default. Reversible.
6. ~~Launch posts~~ — **Resolved: one post for v1 — the Pipes build story.** Topics for
   later posts are Ben's call, written from real work.
