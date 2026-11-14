# feedMyPixel - Pipes product page brief

**Ready for Claude Design** once Ben confirms the go-live month (Part 2, Facts).

Two parts. **Part 1 is for Ben to fill in.** Part 2 is the brief for
[claude.ai/design](https://claude.ai/design), already written from known facts. Once Part 1 is done,
its answers go into the Part 2 copy and the whole file goes to Claude Design.

The page follows the status page (`/status`, built from `design_handoff_status_v7`): same anatomy,
same components, Pipes content. The site becomes a one-page home plus a page per product.

## Part 1 - Ben fills in

Rough notes are fine. Claude tidies them into the same voice but keeps your words.

### 1. Why Pipes?

What was missing, who it is for and what made you start. Two or three sentences.

> At my current contract we use GitLab and for my work I use GitHub. I also have multiple repositories on both and I
> wanted a simple way I can see what state my Pull Requests (PRs) and Merge Requests (MRs) are in. As well as seeing
> my teammates and getting alerted when main fails

### 2. One build decision

The one you would defend in a thread. For example fully client-side with no server, read-only
tokens kept in the browser or Chrome and Firefox from one codebase. What you chose and why.

> I didn't need this to be a server ran project and felt like something in the browser was ideal as this is where I
> am when making applications. Something on the side that I can easily see. Something without the need to safely
> store a users token on a server. I had also always wanted to build a browser extension as I use them a lot so this
> felt perfect

### 3. Building with Claude

Was it the same workflow as status (requirements, ai-dev-tasks, Claude Design, Claude Code with your
skills) or different? Pipes came first, so anything you learned here that shaped status is worth a
line.

> Same as status

### 4. Off limits

Anything not to say publicly, such as installs, ratings or timelines.

> Nope

### 5. Dates and numbers

When Pipes went live in the Chrome Web Store and Firefox Add-ons. Should the page print it?

> Put the month it went live

### 6. Anything else

Screens to feature or leave out, a quote, a thank-you, a call to action.

> I use it daily, its incredibly useful expecially when working with multiple repositories and multiple developers

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
build story with a sticky contents list and stack list. Change the content, not the structure.
Two changes from v7, already built:

- Every scrolling strip uses the shared carousel (arrows, dots, counter). The build-story inset
  scroll strip was replaced by it. On a phone the dots drop below the counter when they do not fit.
- The "More from feedMyPixel" section was removed. The breadcrumb and the header lead back. Do not
  add it to Pipes.

### Why this page exists

Pipes is Ben's first product under feedMyPixel. It is live in the Chrome Web Store and Firefox
Add-ons. The page is where developers land from Show HN, Reddit and dev write-ups, so it tells the
build story: why Ben built Pipes and how, with Claude. The home page Pipes entry gains a "How I
built it" link here and this page links back.

### Facts

- **Name:** Pipes.
- **Live since:** June 2026 in the Chrome Web Store and Firefox Add-ons. Print the month, as status
  prints its fact line. (Month to be confirmed by Ben.)
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
4. **The build story:** the copy below. Long-form reading, comfortable measure. Same sections,
   contents list and stack list as status.

Nothing after the build story: the footer follows, as on status.

### Build story copy

Ben's words, tidied. Use them verbatim. Nothing is off limits.

**Heading:** How and why I built Pipes, with Claude.

**Why I built it**

At my current gig we use GitLab and for my own work I use GitHub. I have multiple repositories on
both and I wanted a simple way to see what state my pull requests (PRs) and merge requests (MRs) are
in. I also wanted to be able to see my teammates work and get alerted when main fails. Add this to
a team and it becomes a very simple way to see what's going on with your work.

**How it's built**

The browser is where I am a lot when I'm making applications, so something on the side that I can
easily read out of the corner of my eye felt ideal. I had always wanted to build a browser extension
as I use them a lot, so this ticked all the boxes.

Then the stack: Svelte 5, TypeScript, Vite and the crxjs plugin on Manifest V3, with Chrome and
Firefox from one codebase. Put the screens carousel in this section, as on status.

**Built with Claude**

Requirements first, a task list with ai-dev-tasks, a design pass in Claude Design, then the build
in Claude Code with my own skills. Use
the same layout as the status page's "Built with Claude" section.

**Try it**

I use it daily. It's incredibly useful, especially when working with multiple repositories and
multiple developers. Then the Chrome Web Store and Firefox Add-ons badges.

**Thanks**

Svelte, crxjs, Claude by Anthropic and Ryan Carson for ai-dev-tasks. Same format as status.

### Copy rules

First person, plain English, no marketing register. **No em dashes or en dashes anywhere** - plain
hyphens only. **No comma before "and" or "or".**
