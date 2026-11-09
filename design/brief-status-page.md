# feedMyPixel - status product page brief

Two parts. **Part 1 is for Ben to fill in.** Part 2 is the brief for
[claude.ai/design](https://claude.ai/design), already written from known facts. Once Part 1 is done,
its answers go into the Part 2 copy and the whole file goes to Claude Design.

Deadline: live by **Fri 13 Nov 2026**, after Ben's yes. Maker communities link to it 16 to 20 Nov.
Public announcement Tue 24 Nov.

## Part 1 - Ben fills in

Rough notes are fine. Claude tidies them into the same voice but keeps your words.

### 1. Why status?

What was missing, who it is for and what made you start. Two or three sentences.

>

### 2. One build decision

The one you would defend in a thread. For example Capacitor shells around the live site instead of
native apps, no passwords or web first and stores second. What you chose and why.

>

### 3. Building with Claude

The part maker communities read for. Answer any of these:

- How did you split the work between Claude Design and Claude Code?
- What did Claude do well?
- Where did you step in or steer?
- One tip for another builder.

>

### 4. Off limits

Anything not to say publicly, such as costs, numbers or timelines.

>

### 5. Launch date

OK to print "full launch Fri 13 Nov" on the page or leave dates out?

>

### 6. Anything else

Screens to feature or leave out, a quote, a thank-you, a call to action.

>

## Part 2 - brief for Claude Design

**For:** [claude.ai/design](https://claude.ai/design). One new page on the existing site at
`feedmypixel.com/status`. Output is a **visual brief** for re-implementation as Svelte 5 components,
not production code.

### Build on the locked system - do not restate it

The site is **live** at <https://feedmypixel.com>, built from the `design_handoff_onepager_v1` bundle.
Everything in `_ds/` (tokens, Plus Jakarta Sans + DM Mono, the blue brand, 2-4px pixel-square radii,
the surfaces/ink/mood scales) is implemented and must be reused as-is. **Ship the same `_ds/` back
with this drop** so the conformance check can run.

The page lives inside the site's existing header and footer. Reuse what exists: the `.eyebrow` label,
the solid and ghost buttons, the sunken-band section rhythm, the Products entry and its carousel and
the Problem / Solution / Product columns.

### Why this page exists

status is Ben's second product under feedMyPixel, after Pipes. It is live at
[status.me](https://status.me) and the phone apps are in store review. The page is where maker
communities land, so it has to tell the build story: how and why Ben built status, with Claude, on
SvelteKit. The home page Products entry links here and this page links back.

status has its own brand (coral, Quicksand). This page is feedMyPixel's page **about** status, so it
uses feedMyPixel's system. status's own look shows only through its screenshots.

### Facts

- **Name:** status, lowercase.
- **Pitch:** An emoji and your status: break the ice and spark a conversation. React, reply and
  natter.
- **What you do:** post an emoji and a few words. Your people react, reply or message you for a
  natter.
- **Problem:** Keeping in touch takes more than it should. A full post feels like a performance and a
  message out of the blue needs a reason.
- **Solution:** status keeps it small. Post an emoji and a few words and your people can react, reply
  or message you for a natter. A small update is all it takes to start a conversation.
- **Build:** SvelteKit and Svelte 5 web app. Fastify and PostgreSQL api on Fly.io. iPhone and
  Android apps are Capacitor shells around the live site. Sign in by email link or passkey, no
  passwords. Push notifications on web, iPhone and Android. Fingerprint or face app lock. Designed
  with Claude Design, built with Claude Code.
- **Privacy:** no ads and no tracking. For 13 and over.
- **Links:** status.me now. App Store and Google Play once approved: design the buttons with a
  placeholder state.
- **Share image:** status.me serves `og.png`. Reuse it.

### Screenshots

Seven store frames, 1080x2160 (1:2 portrait), each a screenshot under a caption, light and dark:
`01-everyone`, `02-people`, `03-emoji`, `04-react`, `05-year`, `06-natter`, `07-no-ads`. Show them
the way the Pipes entry shows its framed shots, but the Pipes carousel assumes 16:10 landscape slides.
Design how tall phone frames sit in it without one frame filling the screen. Attach the frames from
`stat-ui/docs/store-listing/frames/google-play/1080x2160/`.

### What to design

1. **Hero:** name, pitch and the buttons.
2. **Screenshots.**
3. **Problem / Solution / Product,** matching the home page entry.
4. **The build story:** Part 1's answers under short headings. Long-form reading, so set a comfortable
   measure.
5. **A way back** to the home page and feedMyPixel's other work.

### Copy rules

First person, plain English, no marketing register. **No em dashes or en dashes anywhere** - plain
hyphens only. **No comma before "and" or "or".**
