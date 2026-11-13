# status v7 build inventory

Sources (all under `design/status-v7/mocks-pinned/`): `README.md`, `BEHAVIOR.md`, `CHANGELOG.md`, `_ds/base.css`, `_ds/tokens.css`, `render/Status.dc.html` (line refs `S:n`), `render/feedMyPixel.dc.html` (line refs `H:n`). Repo refs are relative to the repo root. An element map for the fix loop already exists at `design/status-v7/element-map.json`.

Token naming: the mock uses `--size-*`, `--leading-*`, `--weight-*`, `--dur*`. The repo uses `--font-size-*`, `--line-height-*`, `--font-weight-*`, `--transition*` (`src/lib/styles/tokens.css`). Same values. Tokens below are written in repo names.

Link convention: mock `Status.dc.html` -> `/status`, `feedMyPixel.dc.html` -> `/`, `feedMyPixel.dc.html#x` -> `/#x`.

## 0. Copy-rule check (node, not grep)

Script counted U+2014, U+2013, `&mdash;`, `&ndash;` and `, and` / `, or` in text content of both mocks plus README and BEHAVIOR.

- Em or en dashes: 0 in both mocks. Middots are `&middot;` (U+00B7), not dashes.
- **VIOLATION (1) in scope: `H:484`, Pipes Solution: "...GitHub Actions and GitLab CI/CD, and surfaces the status in your toolbar."** Comma before "and". The live repo already has it fixed (`src/lib/components/Products.svelte`, no comma). Use the repo wording, not the mock's. Reproduced below in section 3 with the comma removed.
- Out of scope but same rule, in the mock's FAQ and consent copy: `H:322`, `H:1077` (2), `H:1079` (2), `H:1082`, `H:1083`, and `H:678` ("Try a broader term, or start again" is "or" after a comma, so also a hit). Not part of this handoff; not checked against the repo.
- Grammar in Ben's verbatim copy, not a rule break, flagged by the README itself: "its done correctly", "teching" (S:327). Bullet list capitalisation is inconsistent (S:318-323). Copy kept as is.

## 1. Copy, verbatim

Blockquote lines are the exact text nodes. `·` is U+00B7. Apostrophes are straight (U+0027). Markdown links show the exact href.

### 1.1 /status page

Meta (S:12-24)

> status - an emoji and your status | feedMyPixel
> status: an emoji and your status. Break the ice and spark a conversation. React, reply and natter. Built by Ben Chidgey with SvelteKit, Fastify and Claude.
> status - an emoji and your status
> Break the ice and spark a conversation. React, reply and natter. How and why I built status with SvelteKit, Fastify and Claude.
> Break the ice and spark a conversation. React, reply and natter.

Order above: `<title>` and `description`; `og:title` and `twitter:title`; `og:description`; `twitter:description`. Images: `og:image` and `twitter:image` = `https://status.me/og.png`.

Chrome (S:146-199)

> Skip to content
> feedMyPixel
> Products
> Experience
> Contact
> Home

Aria and titles: `feedMyPixel home` (logo), `Site`, `Open menu` / `Close menu`, `Switch colour theme` (aria-label and title), `Breadcrumb`, `Back to top` (aria-label and title).

Hero (S:206-230)

> feedMyPixel
> Products
> status
> An emoji and your status: break the ice and spark a conversation.
> React, reply and natter. Post an emoji and a few words. Your people react, reply or message you for a natter.
> Open status.me
> App Store
> Google Play
> Web, iPhone and Android · No ads · No tracking · For 13 and over · Soft launched on the web, November 2026

Breadcrumb separators are `/` (aria-hidden). Hrefs: `feedMyPixel` -> `/`, `Products` -> `/#products`, `status` is `aria-current="page"` (not a link). `h1` text is `status`. Buttons: `Open status.me` -> `https://status.me`; `App Store` -> `https://apps.apple.com/` (placeholder); `Google Play` -> `https://play.google.com/` (placeholder).

Screenshots band (S:233-290)

> Screenshots
> Post. React. Reply. Natter.

Frame figcaption (number then label), alt, dot label:

| # | Caption label | alt | Dot aria-label |
|---|---|---|---|
| 01 | Everyone | status store screenshot 01: Everyone | Show Everyone |
| 02 | People | status store screenshot 02: People | Show People |
| 03 | Emoji | status store screenshot 03: Emoji | Show Emoji |
| 04 | React | status store screenshot 04: React | Show React |
| 05 | Year | status store screenshot 05: Year | Show Year |
| 06 | Natter | status store screenshot 06: Natter | Show Natter |
| 07 | No ads | status store screenshot 07: No ads | Show No ads |

Counter caption: `01 / 07  Everyone` (two spaces before the label, S:`slideCaption`). Strip `aria-label`: `status store screenshots`. Buttons: `Previous screenshot`, `Next screenshot`. Tablist `aria-label`: `Choose screenshot`.

Problem / Solution / Product (same node in both places on /status except the Product paragraph; see 7.2)

> Problem
> Keeping in touch takes more than it should. A full post feels like a performance and a message out of the blue needs a reason.
> Solution
> status keeps it small. Post an emoji and a few words and your people can react, reply or message you for a natter. A small update is all it takes to start a conversation.
> Product
> A SvelteKit and Svelte 5 web app with a Fastify and PostgreSQL api. The iPhone and Android apps are Capacitor shells around the live site. Sign in by email link or passkey, no passwords. Push notifications and fingerprint or face app lock. No ads and no tracking.

Build story header and aside (S:293-330)

> The build story
> How and why I built status, with Claude, on SvelteKit
> In this story
> Why I built it
> How it's built
> Built with Claude
> Try it
> Thanks

TOC hrefs: `#why`, `#how`, `#claude`, `#try`, `#thanks`. `nav aria-label`: `In this story`.

Stack list (`dl`; each `dd` is `.fmp-prose`)

> Web
> [SvelteKit](https://svelte.dev/docs/kit), [Svelte 5](https://svelte.dev), [TypeScript](https://www.typescriptlang.org)
> Api
> [Fastify](https://fastify.dev), [PostgreSQL](https://www.postgresql.org)
> Apps
> [Capacitor](https://capacitorjs.com), [iPhone](https://apps.apple.com/) and [Android](https://play.google.com/)
> Built with
> [Claude Design](https://claude.ai/design), [Claude Code](https://claude.com/product/claude-code)

Article (S:300-346). `h3` ids in brackets.

> Why I built it [#why]
> For me status is about breaking the ice. Reaching out to people can take real effort and sometimes it means saying something in a group chat. status is a simple way to say what you're up to and start a conversation. Your people see it pop up and can react or comment. If they want to chat more they can message you privately. If they want to take it elsewhere, to WhatsApp, Zoom or FaceTime, they can.
> Everything has a status already: WhatsApp, Slack, Facebook. But there it sits on the side, something few people use in an app built for something else. status brings it up front and centre.
> How it's built [#how]
> Simplicity and speed: one thing, done well. I chose [SvelteKit](https://svelte.dev/docs/kit) and [Fastify](https://fastify.dev) because they are easy to work with and modern. [TypeScript](https://www.typescriptlang.org) makes my life easier. The iPhone and Android apps are [Capacitor](https://capacitorjs.com) shells around the live site. Capacitor has worked very well with SvelteKit.

Screens strip inside "How it's built": labels are the raw file stems (S:`SCREENS`), alt `status <stem> screen, <theme> theme`, strip `aria-label` `status screens`.

> home
> composer
> replies
> reactions
> discover
> search
> messages
> profile
> activity
> Nine screens, light theme. Web app in a Capacitor shell, so the phone apps and the site are the same build.

The caption's theme word is `light` or `dark` (follows theme; see 7.4).

> Built with Claude [#claude]
> I start with detailed requirements, written like architecture decision records (ADRs). From those [ai-dev-tasks](https://github.com/snarktank/ai-dev-tasks) makes a product requirements document (PRD) and a task list. Then I write briefs for [Claude Design](https://claude.ai/design) (CD to its friends). A handoff I'm happy with usually takes a few tweaks in CD. [Claude Code](https://claude.com/product/claude-code) (CC) then builds it with [my own skills for design to code and for principles](https://github.com/feedmypixel/principles), so there are rules for how things are built and a way for CC to know the build matches the design.
> Claude is great when:
> you give it the right context
> a harness for how to build and what to build
> Keep the instructions, rules, tests, context and skills up to date and lean
> use [caveman](https://github.com/JuliusBrussee/caveman) to keep Claude concise
> [rtk](https://www.rtk-ai.app/) to save tokens
> my own hooks stop reams of stale comments
> I steered all the way: writing the ADRs and PRDs and teaching it how to build through skills and context. Then I checked what was built by looking over, making sure its done correctly and iterating and teching if its not. The final polish came from using the flows as a user would. That's where the tweaks come from that make it work as a whole.
> My tip: pay attention. If you don't tell the robots how to behave and then check how they behaved, you'll get something you didn't ask for.
> Try it [#try]
> This has been an immense amount of fun: a modern web app plus iPhone and Android apps, built with SvelteKit, Fastify and [Claude](https://claude.com). Try it at [status.me](https://status.me) or in the [App Store](https://apps.apple.com/) and [Google Play](https://play.google.com/).
> Open status.me
> App Store
> Google Play
> Thanks [#thanks]
> [SvelteKit](https://svelte.dev/docs/kit)
> [Fastify](https://fastify.dev)
> [Capacitor](https://capacitorjs.com)
> [Claude](https://claude.com) by [Anthropic](https://www.anthropic.com)
> [Ryan Carson](https://github.com/snarktank) for [ai-dev-tasks](https://github.com/snarktank/ai-dev-tasks)

The "Try it" buttons repeat the hero hrefs. The tip paragraph (`My tip: ...`) is the only `p` with a box.

More from (S:352-372)

> More from feedMyPixel
> status is the second product. Pipes came first.
> Twenty years of contract work for the Guardian, the BBC and UK government, a searchable CV and a way to get in touch are all on the home page.
> Home
> Pipes
> Experience
> Contact

Hrefs: `Home` -> `/` (chevron-left icon `M10 3.5 5.5 8l4.5 4.5`, 15px), `Pipes` -> `/#products`, `Experience` -> `/#experience`, `Contact` -> `/#contact`.

Footer (S:375-389) differs from the live footer; see 3 and 7.9. Mock text: `feedMyPixel Ltd · Ben Chidgey · St Albans, UK`; links Products, Experience, Contact, `status.me` -> `https://status.me`, GitHub.

### 1.2 Home Products section (H:356-494)

Unchanged lines (also in the repo): eyebrow `Products`, h2 `Real tools for real needs`, lede `Designed, built and shipped end to end.`

status entry (H:360-376)

> status
> An emoji and your status: break the ice and spark a conversation. React, reply and natter.
> Open status.me
> App Store
> Google Play
> How I built it

Hrefs: `https://status.me`, `https://apps.apple.com/` (placeholder), `https://play.google.com/` (placeholder), `How I built it` -> `/status` (chevron-right icon `M6 3.5 10.5 8 6 12.5`, 15px, gap `--space-2`).

status carousel (H:378-410, data H:1281-1289). Strip `aria-label`: `status screenshots`. Counter caption `01 / 07  How is everyone?` format (`NN / 07  caption`). Dot label `Show <caption>`.

| # | Caption (p) | Sub-line (p) | Shots (theme folder) |
|---|---|---|---|
| 01 | How is everyone? | Post an emoji and a few words. Your people see it pop up. | 01-home, 03-replies |
| 02 | Bring your people | Follow friends and family. Everyone gets a square. | 01-home (opposite theme) |
| 03 | Your status with an emoji | One emoji, one line. A full post is not required. | 02-composer |
| 04 | React and reply, spark that conversation | React with an emoji or reply under the status. | 03-replies, 04-reactions |
| 05 | Your week, your year | Every status becomes a square on your profile. | 08-profile |
| 06 | Natter more, privately | Take it to a private message when there is more to say. | 07-messages |
| 07 | No ads. No tracking. | Sign in by email link or passkey. For 13 and over. | 05-discover, 09-activity |

The `NN` span above each caption is `01`..`07`. Shot alt: `status <stem-after-NN-> screen, <light|dark> theme`, e.g. `status home screen, light theme`, `status replies screen, dark theme`.

status Problem / Solution / Product (H:412-430)

> Problem
> Keeping in touch takes more than it should. A full post feels like a performance and a message out of the blue needs a reason.
> Solution
> status keeps it small. Post an emoji and a few words and your people can react, reply or message you for a natter. A small update is all it takes to start a conversation.
> Product
> A SvelteKit and Svelte 5 web app with a Fastify and PostgreSQL api. iPhone and Android apps are Capacitor shells around the live site. Sign in by email link or passkey. No ads and no tracking.

Pipes entry (H:434-493)

> Pipes
> CI/CD pipeline monitoring that lives in your browser and goes loud the moment a default branch breaks.
> Chrome Web Store
> Firefox Add-ons
> Source

Hrefs: mock has `https://chromewebstore.google.com/` and `https://addons.mozilla.org/` (placeholders). The repo already has the real listings (`src/lib/config.ts:8-11`); keep those. `Source` -> `https://github.com/feedmypixel/pipes`.

Pipes carousel (data H:1275-1280). Strip `aria-label`: `Pipes screenshots`. Counter caption is the **label only** (H:1432, `slideCaption: SLIDES[si].label`), e.g. `Status from your toolbar`. Dot label `Show <label>`. Shot alt: `Pipes: <label>, <light|dark> theme`.

| # | Caption (p) | Sub-line (p) | File |
|---|---|---|---|
| 01 | Status from your toolbar | One click through to the run that failed. | popup |
| 02 | Every repo in a side panel | GitHub Actions and GitLab CI/CD, grouped how you choose. | sidepanel |
| 03 | Connect GitHub and GitLab | Your tokens never leave your browser. No server. | options |
| 04 | Loud the moment it breaks | A notification the moment a default branch fails. | failure-notification |

Pipes Problem / Solution / Product (Solution has the comma before "and" removed per section 0)

> Problem
> You find out the default branch is broken from a teammate on Slack, not from your own tools. Pipeline dashboards live in tabs you forget to open.
> Solution
> Pipes watches the repos you choose across GitHub Actions and GitLab CI/CD and surfaces the status in your toolbar. Loud when the default branch fails, quiet when it is green.
> Product
> A browser extension built on Manifest V3 with Svelte 5 and TypeScript, shipping on Chrome and Firefox. Fully client-side: no server, no tracking, your tokens never leave your browser.

## 2. Structure per section

### 2.1 /status

Page shell (S:145): root `div#top` carries `data-theme` in the mock (the repo sets it on `<html>`; see 5). Order: skip link, header, optional mobile nav, `main#main`, footer, back-to-top. All sections share the inner wrapper `max-width:1240px; margin:0 auto; padding: var(--band) var(--gutter)` (repo: `.container` + `padding-block: var(--band)`, `--container-max` is 77.5rem = 1240px). Section rule: `border-bottom:1px solid var(--border-subtle)`.

**Hero** `section[data-screen-label="Hero"]`
```
section  border-bottom subtle
  div.inner
    nav[aria-label=Breadcrumb]  mono xs, --tracking-wide, --ink-subtle, mb --space-6, flex wrap gap --space-2
      a(feedMyPixel) / a(Products) / span[aria-current=page] (--ink-muted)
    div  flex, center, gap --space-4
      span[aria-hidden]  flex gap 4px; 2 x (14px square, --accent; second opacity .45)
      h1  --font-display, bold, --font-size-5xl, --line-height-tight, --tracking-tight, --ink-strong
    p.pitch  display, --font-size-2xl, medium, --line-height-snug, --tracking-tight, --ink-strong, mt --space-8, max 30ch, balance
    p.lead   --font-size-lg, --line-height-snug, --ink-muted, mt --space-4, max 46ch, pretty
    div[data-hero-actions]  flex col (row >= 760px, align center), gap --space-3, mt --space-10
      a.solid  min-height 48px, padding 0 --space-6, --font-size-base, semibold, gap --space-3
      a.ghost x2  min-height 48px, padding 0 --space-5, --font-size-base, semibold
    p.facts  mono xs, --line-height-relaxed, --ink-subtle, mt --space-16, pt --space-6, border-top subtle, max 64ch
```
Hover: solid `background-color: var(--button-bg-hover)`; ghost `border-color: var(--indicator); color: var(--brand-text)` (matches `Button.svelte:80-94`).

**Screenshots band** `section#screenshots`, background `--surface-sunken`
```
div.inner  flex col, gap --space-12
  div  eyebrow p (mono xs, --tracking-wide, --accent-text, medium, mb --space-4) + h2 (display, --font-size-3xl, semibold, --tracking-tight, max 26ch, balance)
  figure  flex col gap --space-4
    div.fmp-caro-frame  relative, padding 0 64px (0 below 680px)
      div.fmp-strip[tabindex=0][aria-label]  flex, gap --space-4, overflow-x auto, snap x mandatory, scroll-behavior smooth, pb --space-1
        figure x7  flex 0 0 auto, width clamp(200px, 24vw, 280px), snap-align START, flex col gap --space-3
          div  bg --surface-raised, 1px --border-subtle, --radius-lg, overflow hidden, aspect-ratio 1206/2622
            img  width 1206 height 2622 lazy, block, 100%x100%, object-fit cover
          figcaption  mono xs, --ink-muted, flex gap --space-3: span(--ink-subtle) "01" + span label
      button.prev / button.next  abs, top 50%, 10px from edge, 44x44, round, chevron 22px, color --indicator, hover bg 9% --ink
    figcaption  flex between center gap --space-4
      span  mono xs --ink-muted counter
      span[role=tablist]  flex gap --space-2: 7 x button.fmp-dot[role=tab][aria-selected] > span (10px, --indicator, radius 1px, selected opacity 1 scale 1, else .32 and .8; 24px hit box, 28px/14px below 760px)
  div  Problem/Solution/Product grid: repeat(auto-fit, minmax(min(100%, 250px), 1fr)), gap --space-8, pt --space-4
    label p: mono xs, --tracking-wide, semibold, mb --space-3; colours --mood-critical, --brand-text, --mood-positive
    body p: --font-size-base, --line-height-relaxed, --ink
```

**Build story** `section#story`
```
div.inner
  eyebrow p "The build story"; h2 (--font-size-3xl, semibold, max 24ch, balance)
  div[data-story-grid]  grid 1fr, gap --space-10, mt --space-12, align start; >= 960px: 220px minmax(0,1fr), gap --space-16
    aside[data-story-aside]  flex col gap --space-8; >= 960px sticky, top calc(--header-height + --space-8)
      nav.fmp-toc  flex col gap --space-2
        p "In this story"  mono xs --ink-subtle
        a x5  --font-size-sm, --ink-muted, no underline, py --space-1; hover --ink-strong
      dl  grid 1fr gap --space-4, pt --space-6, border-top subtle
        div x4  flex col gap --space-1: dt (mono xs, --ink-subtle) + dd.fmp-prose (--font-size-sm, --ink)
    article.fmp-prose  max-width 66ch, flex col gap --space-5, --font-size-md, --line-height-relaxed, --ink, text-wrap pretty
      h3 x5 (ids why/how/claude/try/thanks)  display, --font-size-xl, semibold, --tracking-tight, --ink-strong; mt --space-8 except the first; scroll-margin-top calc(--header-height + --space-6)
      p ... ; links via .fmp-prose a: --link, underline offset 3px, hover --link-hover no underline
      figure (in "How")  mt --space-6, flex col gap --space-3
        div.fmp-strip[tabindex=0]  flex gap --space-3, overflow-x auto, snap x PROXIMITY, p --space-4, bg --surface-inset, --radius-lg
          div x9  flex 0 0 auto, width clamp(132px, 14vw, 168px), snap start, flex col gap --space-2
            div  bg --surface-raised, 1px --border-default, --radius-md, overflow hidden, aspect 1206/2622 > img (width/height 1206x2622, cover)
            span  mono xs --ink-muted (file stem)
        figcaption  mono xs --ink-muted
      ul (bullets)  m 0, padding-left 1.25em, flex col gap --space-2
      p.tip  padding --space-5 --space-6, bg --surface-sunken, --radius-lg, --ink-strong, medium
      div (Try it buttons)  flex wrap gap --space-3, mt --space-2; buttons 44px, --font-size-sm
      ul (Thanks)  list none, flex col gap --space-2, --font-size-base
```
Note `.fmp-prose p{margin:0}` exists only in the status mock `<style>` (S:121), not in `_ds/base.css`. The repo reset (`src/lib/styles/base.css:9-11`, `* {margin:0}`) already covers it.

**More from** `section#more`, background `--surface-sunken`
```
div.inner  flex wrap, align flex-end, justify between, gap --space-8
  div  eyebrow + h2 (--font-size-2xl, semibold, max 24ch, balance) + p (--font-size-base, --line-height-relaxed, --ink-muted, mt --space-4, max 50ch, pretty)
  div  flex wrap gap --space-3: solid Home (icon, gap --space-2) + 3 ghosts, all 44px / --font-size-sm
```

**Floating**: back-to-top button (S:393): fixed, bottom/right `--space-5`, 44px circle, `--surface-raised`, 1px `--border-default`, `--shadow-md`, shown after 600px scroll.

### 2.2 Home Products (changes only)

```
section#products  (unchanged shell: sunken, border-bottom subtle)
  div.inner  eyebrow + h2 + lede unchanged
  div.entry[status]  mt --space-16, flex col, gap --space-10
    div.intro  flex col gap --space-5
      div  flex center gap --space-3: span.mark (11px squares, gap 3px, --accent / .45) + h3 (--font-size-2xl, semibold, --tracking-tight)
      p.pitch  --font-size-lg, --line-height-snug, --ink, max 46ch, pretty
      div.links  flex wrap gap --space-3: solid + 2 ghost + ghost-with-chevron, all 44px
    figure (carousel, see 2.3)
    div.story  (Problem/Solution/Product, same grid as 2.1)
  div.entry[Pipes]  mt --space-16, pt --space-16, border-top 1px --border-default, same internals
```
The Pipes `.links` gap in the repo is `--space-4` (`Products.svelte:.links`); the mock is `--space-3`. See 7.10.

### 2.3 Composed slide (both home carousels)

```
div.slide[data-status-slide]  flex 0 0 100%, snap-align center, bg --surface-raised, 1px --border-subtle, --radius-lg, overflow hidden, aspect-ratio 16/10, display flex, align stretch
  div[data-status-cap]  flex 1 1 0, min-width 0, flex col, justify center, gap --space-4, padding --space-10 --space-6 --space-10 --space-10
    span  mono xs, --tracking-wide, --ink-subtle        "01"
    p     display, --font-size-3xl, bold, --line-height-tight, --tracking-tight, --ink-strong, balance
    p     --font-size-base, --line-height-relaxed, --ink-muted, max 30ch, pretty
  div[data-status-phones]  flex 1.1 1 0, min-width 0, flex, align flex-start, justify center, gap --space-5 (status only), padding 8% --space-8 0, overflow hidden
    status img  block, height 104%, width auto, flex none, radius --radius-lg --radius-lg 0 0, 1px --border-default (no bottom), --shadow-lg
      second phone (index 1): margin-top 12%, margin-left -18%, position relative, z-index 1
    Pipes img[data-wide]  block, width 100%, height auto, align-self center, margin-bottom 8%, --shadow-lg; windows: --radius-lg + 1px --border-default; notification (center:true): --radius-2xl, no border
```
Below 760px (`_ds/base.css`): `[data-status-slide]` aspect auto, column; `[data-status-cap]` padding `--space-6 --space-5 --space-2`; `[data-status-phones]` height 300px, flex none, padding `--space-4 --space-5 0`; its `img` height auto, width `min(60%, 220px)`; `img + img` hidden; `img[data-wide]` width 100% and align-self flex-start. These use `!important`; in the repo, prefer scoped component CSS and drop the `data-*` hooks (the repo's scoped CSS already beats layered global CSS, `src/lib/styles/README.md:20-21`).

## 3. Component mapping

| Piece | Verdict | Reasoning |
|---|---|---|
| `Header.svelte` | EXISTS | Already disables scroll-spy off `/` (`Header.svelte:31-33`), so `/status` needs no change. Differences from mock: repo nav has Services (`:11-16`), status mock omits it (7.8); logo `aria-label="feedMyPixel, back to top"` (`:81`) is wrong on `/status` where `/#top` navigates home. |
| `MobileNav.svelte` | EXISTS | Links `:14-19` have no Home; status mock drawer adds Home (S:174). Decide (7.8). |
| `Footer.svelte` | EXISTS | Live copy is `feedMyPixel Ltd · Ben Chidgey · number 08198085 · established 2012` (`Footer.svelte:15`); mock says `St Albans, UK` and adds `status.me`. Mock footer is not authoritative (7.9). |
| `ThemeToggle.svelte` | EXISTS | Writes `document.documentElement.dataset.theme` and `localStorage['fmp-theme']` (`:4-13`). Holds no reactive state; see 5. |
| `BackToTop.svelte` | EXISTS | Threshold 600 (`:2`) matches. Visual differs (repo square `--radius-md`, `--shadow-lg`, aligned to container; mock circle, `--shadow-md`). Keep repo. |
| `Button.svelte` | EXTEND | Needs a 48px size for hero (`min-height 48px`, `--font-size-base`, solid padding `--space-6`). Today fixed 44px / `--font-size-sm` (`Button.svelte:55,59`; padding hook `--button-padding-inline` at `:56`). Add a `size` prop (small decision, 7.5). Chevron icons fit the existing `children` snippet; gap is `--space-3` vs mock `--space-2` for icon buttons (could reuse a `--button-gap` hook like the padding one). |
| `Seo.svelte` | EXTEND | `ogImage` is hard-coded `${siteUrl}/og-image.png` (`Seo.svelte:12`), 1200x630 and alt text hard-coded to the feedMyPixel line (`:28-30,37-38`); `og:title` and `twitter:title` reuse `title`, `og:description` reuses `description` (`:23-24,33-34`). Status needs `https://status.me/og.png`, own alt, a title for og without `| feedMyPixel`, and 3 different descriptions in the mock. Needs optional props `image`, `imageAlt`, and (if kept) `shareTitle`, `shareDescription`. Also `path="/status"`. |
| `carousel.ts` | EXTEND | `scrollOffsetFor(index, slideWidth)` = `index * slideWidth` (`carousel.ts:15-17`) and `nearestSlide` by midpoint to strip centre (`:19-33`) are wrong for the frame strip (children are 200-280px, several visible). Needs offsetLeft-based offset and index, plus an end-of-strip clamp (mock S:`onStripScroll`: `scrollLeft + clientWidth >= scrollWidth - 2` -> last). Add pure fns + tests next to `carousel.test.ts`. |
| `Carousel.svelte` | EXTEND | Slide model is `{src, alt, label}` rendered as one `<img width=1280 height=800>` with `aspect-ratio:16/10` on the img (`Carousel.svelte:70-72,172-177`). Composed slides need a caption column plus 1-2 images, with the 16/10 ratio on the slide card, not the img. Make slide content a snippet (and keep `label` for caption and dot names). Also `{#each slides as slide (slide.src)}` is keyed by `src` (`:70,117`): theme-following sources would remount slides, and two Pipes slides could never share a key if `src` goes away, so key by index or an `id`. Frame strip is a second layout (fixed-width children, `snap-align:start`, offsetLeft math): either a `variant` prop or a separate `FrameStrip` built on the same pure fns. Chevron/dots/gutter CSS already match the mock (`:143-147` 64px gutter at 680px, `:261-279` 24px dots at 760px, chevrons hidden below 680px). Repo dots use `aria-current` in a `role=group` (`:114-124`); mock uses `role=tab` + `aria-selected` without tabpanels. Keep repo (7.6). |
| `Products.svelte` | EXTEND | Add status entry first, Pipes second with top rule. Pipes carousel slides become composed (new `sub` lines, theme shots from `pipes/<view>-<theme>.png`). `.mark` uses `--brand` (`Products.svelte:.mark span`) and eyebrow uses `--brand-text`; mock uses `--accent`, `--accent-text`. Same colours today (7.7). Existing tests to update: `Products.svelte.test.ts` asserts `a.button` order `hrefs[0]` is Chrome, exactly 3 `a.button`, and 4 `.strip img` (`:11-33,48-50`). |
| Pixel pair (two squares) | NEW (small) | 3 uses now (status h3, Pipes h3, hero at 14px/4px gap). Today inline in `Products.svelte` as `.mark`. Extract `PixelMark.svelte` with a `size` prop rather than copy a third time. |
| Problem / Solution / Product | NEW (extract) | Identical grid and labels used 3 times (status home, Pipes home, /status). Today inline `.story` + `.label[data-kind]` in `Products.svelte`. Extract `ProductStory.svelte` taking `{problem, solution, product}`. |
| Product entry (intro + carousel + story) | NEW (extract, optional) | status and Pipes entries have the same anatomy. A `ProductEntry` with snippets for links and carousel removes the duplicate. Surface as a choice; the simple alternative is two inline blocks. |
| Theme-following image | NEW | `<img>` pair or single element that shows the right theme file. See 5 (no reactive theme exists today). Used by status slides (7), Pipes slides (4), screens strip (9). |
| `src/routes/status/+page.svelte` | NEW | Root `+layout.ts` already sets `prerender = true` (`src/routes/+layout.ts:1`). Add `Seo` with `path="/status"`. |
| Status sections (hero, screenshots band, build story, more-from) | NEW | Follow the `Hero`/`Products`/`Experience` pattern: one component per section in `src/lib/components`. Hero section must carry class `hero`; otherwise `#main > section:not(.hero)` (`patterns.css:18`) applies the scroll-reveal to it. |
| Frame strip | NEW or EXTEND | See `Carousel.svelte` row. |
| `.fmp-prose` article styling | NEW | Scoped CSS in the build-story component, including `a` underline and hover, `ul` and tip box. Not in repo. |
| Build-story TOC and stack `dl` | NEW | Sticky aside at >= 960px (`top: calc(--header-height + --space-8)`), `scroll-margin-top` on h3s. |
| Sitemap | EXTEND | Add `/status` to `src/routes/sitemap.xml/+server.ts:7-9`. |

### Existing carousel scroll sync vs the mock's 700ms guard

- Mock (`H:1087-1100`, `S:scrollStrip`, `onStripScroll`): `scrollStrip(i)` sets `_busy=true` for 700ms, then `scrollTo`. `onStripScroll` early-returns while `_busy`. Home: `left = i * (clientWidth + 16)`, index = `round(scrollLeft / (clientWidth + 16))`. Status frames: `left = children[i].offsetLeft`, index = nearest `offsetLeft` to `scrollLeft`.
- Repo (`Carousel.svelte:19-31` `syncFromScroll`, `:30-38` `goTo`, `:40-43` `onScroll`, `:49-58` `scrollend` listener): `goTo` sets `index` first, then `scrollTo({left: index * (clientWidth+16)})`. Scroll events only restart a 120ms debounce (`:42`); `syncFromScroll` runs after 120ms of no scroll events, or on `scrollend`. So no intermediate event can reset `index` mid-smooth-scroll, which is the bug the mock's guard fixes. The repo path is already guarded; porting the 700ms flag would be redundant and would drop a user swipe made inside 700ms. Recommendation: do not port the flag. Verify in the browser that chevron clicks move the strip (UNVERIFIED here, I did not run it).
- Both agree on `+16` (= `--space-4` gap, hard-coded 16 at `Carousel.svelte:16`).
- Frame strip is where the repo logic fails: midpoint-nearest picks the centre frame (not the first visible), `index * (clientWidth + 16)` is not a frame boundary, and the strip cannot scroll far enough for the last frame's `offsetLeft` (needs the end clamp).

## 4. base.css and tokens.css delta (mock vs `src/lib/styles/`)

Compared by script (`_ds/tokens.css` vs `src/lib/styles/tokens.css`, names mapped, values normalised).

tokens.css, real differences only:

| Token | Mock | Repo | Note |
|---|---|---|---|
| `--accent`, `--accent-text` (`:root` and `[data-theme=dark]`) | `var(--brand)`, `var(--brand-text)` | absent | Aliases only; no repo consumer. Add or use `--brand`/`--brand-text` (7.7). |
| `--gutter` | `clamp(1.25rem, 4vw, 3rem)` | `clamp(1rem, 4vw, 3rem)` (`tokens.css:143`) | Repo is the live tuned value (commit "Sort out the mobile layout"). |
| `--header-height` | `4.25rem` | `4rem` (`tokens.css:179`) | Affects sticky aside `top` and h3 `scroll-margin-top`; both read the token. |
| `--font-display`, `--font-text` | `'Manrope'` in `_ds/tokens.css`; `'Plus Jakarta Sans'` in the mock `<style>` and README | `'Plus Jakarta Sans Variable'` self-hosted | Repo matches the README intent. `_ds/tokens.css` Manrope looks like an export from before the `modern` default; ignore. |
| `[data-type=*]` variants | present | absent | README says drop. |
| `--toast-ink`, `--z-consent` | absent | present | Repo-only; no action. |
| Dark `--focus-ring`, `--field-border-focus`, `--scrim`, `:root --indicator` | literal values | `var(...)` equivalents | Same result. |

base.css, new or changed (mock `_ds/base.css` vs `src/lib/styles/base.css`; everything else in the mock file is Experience/FAQ/search/toast chrome that already lives in component scoped CSS):

| Mock rule | Needed? | Where |
|---|---|---|
| `@media (max-width:759px) [data-status-slide]/[data-status-cap]/[data-status-phones]` (6 rules) | Yes, new | Composed-slide scoped CSS (section 2.3). |
| `.fmp-prose a` + `a:hover` | Yes, new | Build-story article scoped CSS. Global `a:hover` in repo (`base.css:79-82`) already drops the underline and sets `--link-hover`; repo `a` has `text-underline-offset:3px` (`:74-77`) but underline is the UA default. |
| `.fmp-toc a:hover{color:var(--ink-strong)}` (status mock only, S:123) | Yes, new | TOC scoped CSS. |
| `[data-hero-actions]` row at >= 760px | Yes, new | Hero scoped CSS (column below, row above). |
| `[data-story-grid]` / `[data-story-aside]` at >= 960px | Yes, new | Build-story scoped CSS. |
| `.fmp-top`, `.fmp-dot`, `.fmp-caro-*`, `.fmp-ghost`, `.fmp-solid`, `.fmp-strip` | No | Already in `BackToTop`, `Carousel`, `Button` scoped CSS. |
| `.fmp-prose p{margin:0}` (S:121) | No | Repo `* {margin:0}` (`base.css:9-11`). |
| `::selection` | No difference in effect | Mock `_ds/base.css` uses `--brand-tint-strong`; same as repo (`base.css:69-72`). |
| `a{color:var(--link)}`, `:focus-visible`, `prefers-reduced-motion` | No | Identical in repo (`base.css:63-102`). |

## 5. Theme mechanism

- Repo storage key: `localStorage['fmp-theme']`, values `'light'` or `'dark'` (`src/app.html:10`, `ThemeToggle.svelte:8`).
- Applied as `data-theme` on `<html>` (`app.html:17`; CSS `[data-theme='dark']` in `tokens.css:182`).
- No-flash: inline script in `<head>` before `%sveltekit.head%` (`app.html:7-19`). Reads the key; if absent follows `prefers-color-scheme`; sets `document.documentElement.dataset.theme`.
- Toggle: flips `dataset.theme` directly, writes the key in try/catch, shows a toast (`ThemeToggle.svelte:4-13`). No store or rune holds the theme.
- Mock: `state.theme` read from `localStorage['fmp-theme']` in `componentDidMount` (`S:`, `H:846`), applied as `data-theme` on the app root `div`, written back on toggle (`H:515-519`).
- **Key matches. Attribute target differs (mock root div, repo `<html>`), which is fine for CSS.** The one real gap: the mock picks image files from JS state, and the repo has no reactive theme. A client-side read after mount means prerendered HTML shows one theme's images, then swaps (flash and double fetch for dark users). A CSS-driven pair (`html[data-theme='dark'] .x` toggling two lazy `<img>`s, lazy images that are `display:none` are not fetched) avoids this and works without JS but needs theme-neutral alt text and caption (7.4). Alternative: a small reactive theme module observing `html[data-theme]` (`MutationObserver`), which keeps the mock's dynamic alt and caption but flashes. Surface the choice.
- Slide 02 inverts the theme: with the CSS pair it is the same pair with the roles reversed.

## 6. Assets

All paths relative to `design/status-v7/mocks-pinned/render/`. README says to place status images under `static/assets/status/`; the repo's current Pipes images live at `static/pipes/` (referenced as `asset('pipes/...')`, `Products.svelte`), not `static/assets/pipes/` (7.11).

| Use | Files | Size |
|---|---|---|
| Frame strip (7), `/status` | `uploads/1206x2622/01-everyone.png`, `02-people.png`, `03-emoji.png`, `04-react.png`, `05-year.png`, `06-natter.png`, `07-no-ads.png` | 1206x2622 |
| Plain screens, both themes (9 x 2 = 18) | `uploads/1206x2622/light/NN-<stem>.png` and `uploads/1206x2622/dark/NN-<stem>.png` for `01-home`, `02-composer`, `03-replies`, `04-reactions`, `05-discover`, `06-search`, `07-messages`, `08-profile`, `09-activity` | 1206x2622 (RGBA) |
| status slides | 7 slides use `01-home`, `03-replies`, `02-composer`, `04-reactions`, `08-profile`, `07-messages`, `05-discover`, `09-activity` from the folders above | same |
| Pipes slides (8) | `assets/pipes/popup-light.png` (880x1000), `popup-dark.png` (880x1000), `sidepanel-light.png` and `-dark.png` (1080x880), `options-light.png` and `-dark.png` (1360x1200), `failure-notification-light.png` and `-dark.png` (728x170) | per file |
| Head | `assets/favicon.png` (256x256), `assets/apple-touch-icon.png` (180x180) | Repo already has its own `static/favicon.png` and `static/apple-touch-icon.png`; do not overwrite. |
| Unused by the mock render | `assets/Ben-Chidgey-CV.pdf` | Repo has `static/BenChidgeyCV.pdf`; ignore. |
| External | `https://status.me/og.png` | Do not copy (README). Existence and size UNVERIFIED. |

Weight: `uploads/` is 11 MB, `assets/` 768 KB (`du -sh`). The 7 frames and 18 screens are PNG at native size; the strips display them at 132-280px. Resize or convert is a build decision (7.12). Retired: `static/pipes/framed-*.png` (4 files) once Pipes moves to composed slides (README: "no longer used").

## 7. Ambiguities and questions

1. **Copy rule hit in the mock** (`H:484`): Pipes Solution has ", and surfaces". Repo already uses the clean wording. Confirm the repo wording is what ships (assumed).
2. **Two Product paragraphs for status.** `/status` (S:274) adds "The iPhone and Android apps are...", "no passwords", "Push notifications and fingerprint or face app lock". Home (H:428) is shorter. README only specifies the shorter one. Intentional?
3. **Pipes counter caption.** README says `NN / 07  Caption` on both carousels (BEHAVIOR says the same). The mock shows `NN / 07  caption` for status only; Pipes shows the label with no number (`H:1432`). Pipes has 4 slides so "07" cannot be right there. Which?
4. **Theme word in the build-story caption and image alts.** "Nine screens, light theme." and alts `... screen, light theme` need the current theme. With a CSS-driven image pair these either go theme-neutral ("Nine screens.") or need a reactive theme. Which approach (section 5)?
5. **Hero buttons are 48px; everything else is 44px.** Add a size to `Button`, or style hero buttons locally? (Consistency rule: prefer the `Button` prop.)
6. **Dots semantics.** Mock: `role=tablist`/`role=tab`/`aria-selected` with no tabpanels. Repo: `role=group` + `aria-current`. README repeats the tab pattern. Keep the repo's (assumed)?
7. **`--accent` / `--accent-text`.** Mock uses them for pixel pairs and eyebrows; repo uses `--brand` / `--brand-text` (identical values). Introduce the aliases or keep the repo tokens (assumed keep)? The mock comment says palettes may repoint accent later (YAGNI).
8. **Header nav and drawer on `/status`.** Mock status header omits Services (home mock includes it) and the status drawer adds a Home link. Oversight, or intended? Repo nav has Services everywhere. Also logo `aria-label` says "back to top" (`Header.svelte:81`) but on `/status` it goes home.
9. **Footer.** Mock footer text (`St Albans, UK`, status.me link, no Services/Digital Marketplace/Cookie settings/Components) conflicts with the live footer. Footer lives in the layout, so a status.me link would appear on every page. Add it, or leave the footer alone (assumed leave)?
10. **Pipes `.links` gap.** Mock `--space-3` (H:`links` flex gap); repo `--space-4`. Treat as pre-existing (leave) or align?
11. **Asset location and naming.** README: `static/assets/status/`. Repo precedent: `static/pipes/`. Where do status and new Pipes images go, and does `framed-*` get deleted in this change?
12. **Image weight.** 18 full-size 1206x2622 screens plus 7 frames (11 MB) shown at <= 280px wide. Resize at build, serve as-is, or generate smaller derivatives? Pipes images carry no `width`/`height` in the mock (intrinsic sizes differ per file), so the layout-shift fix needs per-slide dimensions.
13. **`rel`/`target` on external buttons.** Mock opens `status.me`, App Store, Google Play with no new tab. Repo convention is `external` (new tab + "opens in a new tab" hint), asserted in `Products.svelte.test.ts:25-33`. Use `external` for these three (assumed)? Store URLs are placeholders (`https://apps.apple.com/`, `https://play.google.com/`): ship placeholders or hide the buttons until real URLs exist? (README open item.)
14. **`screensTheme` tweak.** README recommends dropping; mock has a `follow|light|dark` prop. Assumed dropped.
15. **Seo.** Mock has three different descriptions and an `og:title` without `| feedMyPixel`. Does the status page carry that split, or one title and description via the existing props? `og:image:width/height` (1200x630 hard-coded) unknown for `status.me/og.png`.
16. **Mobile layouts not rendered in the mock files provided** (breakpoints are in CSS but no mobile screenshots ship). Unclear: hero facts line wrapping, story strip at 375px (peek amount), `/status` frame strip at <680px (chevrons hidden, 200px frames), More-from button wrap order. Fix-loop viewports in `element-map.json` are 375 and 1440.
17. **States not shown.** Reduced motion on the frame strip smooth scroll (CSS-level only in the mock). Keyboard: strips are `tabindex=0` with no arrow-key handling beyond native scroll. Empty/failed image state is unspecified. Dark-theme frame strip: store frames are theme-independent (same files in both themes).
18. **Mock bullets in "Claude is great when:"** mix sentence case and lower case, and start with different grammatical forms. Keep verbatim (README says Ben edited it)?
19. **Visual baselines and tests.** `playwright.visual.config.ts` exists; home Products changes and the new route will need baseline regeneration; `Carousel.svelte.test.ts:6-8` and `Products.svelte.test.ts` hard-code the old slide shape. No decision needed, but plan for it.
