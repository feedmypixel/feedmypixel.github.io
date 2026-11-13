# feedMyPixel - Pipes product page brief

**DRAFT.** Not for Claude Design until Ben has filled in Part 1.

Two parts. **Part 1 is for Ben to fill in.** Part 2 is the brief for
[claude.ai/design](https://claude.ai/design), already written from known facts. Once Part 1 is done,
its answers go into the Part 2 copy and the whole file goes to Claude Design.

The page follows the status page (`/status`, built from `design_handoff_status_v7`): same anatomy,
same components, Pipes content. The site becomes a one-page home plus a page per product.

## Part 1 - Ben fills in

Rough notes are fine. Claude tidies them into the same voice but keeps your words.

### 1. Why Pipes?

What was missing, who it is for and what made you start. Two or three sentences.

>

### 2. One build decision

The one you would defend in a thread. For example fully client-side with no server, read-only
tokens kept in the browser or Chrome and Firefox from one codebase. What you chose and why.

>

### 3. Building with Claude

Was it the same workflow as status (requirements, ai-dev-tasks, Claude Design, Claude Code with your
skills) or different? Pipes came first, so anything you learned here that shaped status is worth a
line.

>

### 4. Off limits

Anything not to say publicly, such as installs, ratings or timelines.

>

### 5. Dates and numbers

When Pipes went live in the Chrome Web Store and Firefox Add-ons. Should the page print it?

>

### 6. Anything else

Screens to feature or leave out, a quote, a thank-you, a call to action.

>

## Part 2 - brief for Claude Design

**For:** [claude.ai/design](https://claude.ai/design). One new page on the existing site at
`feedmypixel.com/pipes`. Output is a **visual brief** for re-implementation as Svelte 5 components,
not production code.

### Build on the locked system - do not restate it

The site is **live** at <https://feedmypixel.com>. Everything in `_ds/` (tokens, Plus Jakarta Sans +
DM Mono, the blue brand, 2-4px pixel-square radii, the surfaces/ink/mood scales) is implemented and
must be reused as-is. **Ship the same `_ds/` back with this drop** so the conformance check can run.

**Use the status page as the template.** `/status` from `design_handoff_status_v7` is built and is
the pattern: breadcrumb hero, screenshots band with a carousel, Problem / Solution / Product, the
build story with a sticky contents list and stack list, then "More from feedMyPixel". Change the
content, not the structure. One change from v7: every scrolling strip uses the shared carousel
(arrows, dots, counter). The build-story inset scroll strip was replaced by it.

### Why this page exists

Pipes is Ben's first product under feedMyPixel. It is live in the Chrome Web Store and Firefox
Add-ons. The page is where developers land from Show HN, Reddit and dev write-ups, so it tells the
build story: why Ben built Pipes and how, with Claude. The home page Pipes entry gains a "How I
built it" link here and this page links back.

### Facts

- **Name:** Pipes.
- **Pitch:** CI/CD pipeline monitoring that lives in your browser and goes loud the moment a
  default branch breaks.
- **Problem:** You find out the default branch is broken from a teammate on Slack, not from your own
  tools. Pipeline dashboards live in tabs you forget to open.
- **Solution:** Pipes watches the repos you choose across GitHub Actions and GitLab CI/CD and
  surfaces the status in your toolbar. Loud when the default branch fails, quiet when it is green.
- **Product:** A browser extension built on Manifest V3 with Svelte 5 and TypeScript, shipping on
  Chrome and Firefox. Fully client-side: no server, no tracking, your tokens never leave your
  browser.
- **What it does:** watches several GitHub and GitLab accounts, including self-hosted and
  Enterprise. Repos are picked from the API, no hand-entered ids. Notifies on changes only: a
  default-branch failure is loud and stays until dismissed, a failing pull or merge request is a
  normal notification, recovery is optional. Toolbar badge counts failing pipelines. A popup for a
  glance and a side panel to keep open.
- **Privacy:** read-only tokens, kept in the browser, never synced, never logged. Privacy policy at
  `/pipes/privacy` (already live).
- **Build:** Svelte 5, TypeScript, Vite and the crxjs plugin, Manifest V3.
- **Source:** public on GitHub for reference. It is not open source, so do not call it that.
- **Links:** Chrome Web Store, Firefox Add-ons, Source. Show the stores as the official Chrome Web
  Store and Firefox Add-ons badges.

### Screenshots

Light and dark captures of four views, same seeded data, following the site theme as on the home
page: `popup`, `sidepanel`, `options`, `failure-notification` (`-light` / `-dark`). Also the store
set in `store-screenshots/framed/` (1280x800 framed shots plus promo tiles) if a frames carousel
like the status one helps. Attach both folders from the pipes repo.

### What to design

1. **Hero:** breadcrumb, name, pitch, lead, store badges and Source.
2. **Screenshots.**
3. **Problem / Solution / Product,** matching the home page entry.
4. **The build story:** Ben's words from Part 1. Long-form reading, comfortable measure.
5. **A way back** to the home page and to status.

### Build story copy

Filled in from Part 1 once Ben has answered.

### Copy rules

First person, plain English, no marketing register. **No em dashes or en dashes anywhere** - plain
hyphens only. **No comma before "and" or "or".**
