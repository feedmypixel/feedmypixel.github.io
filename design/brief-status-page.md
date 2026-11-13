# feedMyPixel - status product page brief

Two parts. **Part 1 is for Ben to fill in.** Part 2 is the brief for
[claude.ai/design](https://claude.ai/design), already written from known facts. Once Part 1 is done,
its answers go into the Part 2 copy and the whole file goes to Claude Design.

No deadline. The page goes live once the iPhone and Android apps are through review and Ben says yes.

## Part 1 - Ben fills in

Rough notes are fine. Claude tidies them into the same voice but keeps your words.

### 1. Why status?

What was missing, who it is for and what made you start. Two or three sentences.

> For me this really is about an ice breaker. Sometimes reaching out to people invovles a lot of effort and at times
> it invovles saying something in a group chat, for me status was a way of simply saying waht your up to and being a
> conversation starter. Something people see pop up and they can comment on or react to. If they wish to chat more
> they can privately with you. If they wish to take it elsewhere, WhatsApp, Zoom, facetime they can. This app brings
> your status up front and cneter rather than it being something you post on the side

### 2. One build decision

The one you would defend in a thread. For example Capacitor shells around the live site instead of
native apps, no passwords or web first and stores second. What you chose and why.

> Simplicity, speed and a function that does one thing and that one thing well. SveleteKit and fastify were chosen
> due to their ease of use and modern practices. TypeScript chosen to make my life easier. Capacitor was used for
> ease. There will be a future build natively if the app calls for it. Capacitor has worked pretty well with SvelteKit

### 3. Building with Claude

The part maker communities read for. Answer any of these:

- How did you split the work between Claude Design and Claude Code?
- What did Claude do well?
- Where did you step in or steer?
- One tip for another builder.

> So a practice of starting with detailed requirements, think ADR. These would then go via a-dev-tasks where PRD's
> and Tasks would be created accordingly. Briefs would then be created for Claude Design (lovelingly known as CD)
> and then once we have a handoff that I am hjappy with, usually it takes a few tweaks in CD. I would then use my
> skills (link to my github repo) for design to code and principles so that we have rules about how this is built
> and how we known the design build matches the designs.
> Claude is great when you give it the correct context, provide harnesses for how it should build and what it should be
> build. Making sure insrtructions, rules, tests, context and skills are kept up to date and lean. The use of
> caveman and RTK alongside custom hooks to help claude with not adding reams of usless comments and being too
> verbose have helped a lot with my sanity and keeping token consupmtion down.
> I have been steering all the way. ADR's, PRD's understanding and teaching how to build via skills and context.
> Making sure that things are correct by looking at whats built and paying atttention to whats built. The final
> tweaks and using the flows and application as a user would are where the tweaks and adjustments come from and are
> what provides the final polish and something that has parity and works as a whole.
> Pay attention, if you dont tell the robots how to behave and then check how they ahve behaved your going to get
> something that you did not ask for.

### 4. Off limits

Anything not to say publicly, such as costs, numbers or timelines.

> not really. This is in its infancy so numbers are not relevant at the moment. This is an idea I have had for a
> while. Everything has a status, whatsapp, slack, facebook etc and this app just brings that out and focuses on it.
> Rather than status being soemthing which few people use in an app that has a different desitnation.

### 5. Launch date

OK to print "full launch Fri 13 Nov" on the page or leave dates out?

> its not friday 13th. We soft launched on Monday 9th, Im easy TBH. Probs just say we soft launched in the first/second
> week of Novemeber?

### 6. Anything else

Screens to feature or leave out, a quote, a thank-you, a call to action.

> so basically I think we should make sure we have a decent amount of the frames from teh app stores and maybe some
> other frames. We should also link to the apps once they are out. I dont see this being released until the apps are
> through. I dont think I have a quote, but this has been an immense amount of fun to build and produce a modern
> webapp, IOS, Andoid application using SveleteKit, Fastify and Claude. There are a few shout-outs SveleteKit,
> Fastify, capacitor, Claude, ai-dev-tasks authur

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

status is Ben's second product under feedMyPixel, after Pipes. It soft launched on the web at
[status.me](https://status.me) in early November 2026 and the page goes live once the phone apps are
in the stores. The page is where maker communities land, so it has to tell the build story: how and
why Ben built status, with Claude, on SvelteKit. The home page Products entry links here and this
page links back.

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
- **Launch:** soft launched on the web in early November 2026. No other dates.
- **Links:** status.me, App Store and Google Play. All three are live by the time the page ships.
- **Share image:** status.me serves `og.png`. Reuse it.

### Screenshots

Ben wants plenty of them. Seven store frames, 1080x2160 (1:2 portrait), each a screenshot under a
caption: `01-everyone`, `02-people`, `03-emoji`, `04-react`, `05-year`, `06-natter`, `07-no-ads`.
There are also plain screenshots of nine screens in light and dark (home, composer, replies,
reactions, discover, search, messages, profile, activity) if a second set helps, for example in the
build story.

Show the frames the way the Pipes entry shows its framed shots, but the Pipes carousel assumes 16:10
landscape slides. Design how tall phone frames sit in it without one frame filling the screen. Attach
the frames from `stat-ui/docs/store-listing/frames/google-play/1080x2160/`.

### What to design

1. **Hero:** name, pitch and the buttons.
2. **Screenshots.**
3. **Problem / Solution / Product,** matching the home page entry.
4. **The build story:** the copy below. Long-form reading, so set a comfortable measure.
5. **A way back** to the home page and feedMyPixel's other work.

### Build story copy

Ben's words from Part 1, tidied. Use as written. Suggest cuts, do not rewrite.

#### Why I built it

For me status is about breaking the ice. Reaching out to people can take real effort and sometimes it
means saying something in a group chat. status is a simple way to say what you're up to and start a
conversation. Your people see it pop up and can react or comment. If they want to chat more they can
message you privately. If they want to take it elsewhere, to WhatsApp, Zoom or FaceTime, they can.

Everything has a status already: WhatsApp, Slack, Facebook. But there it sits on the side, something
few people use in an app built for something else. status brings it up front and centre.

#### How it's built

Simplicity and speed: one thing, done well. I chose SvelteKit and Fastify because they are easy to
work with and modern. TypeScript makes my life easier. The iPhone and Android apps are Capacitor
shells around the live site. Capacitor has worked well with SvelteKit. If status calls for it,
native apps can come later.

#### Built with Claude

I start with detailed requirements, written like ADRs. From those
[ai-dev-tasks](https://github.com/snarktank/ai-dev-tasks) makes a PRD and a task list. Then I write
briefs for Claude Design (CD to its friends). A handoff I'm happy with usually takes a few
tweaks in CD. Claude Code then builds it with
[my own skills for design to code and for principles](https://github.com/feedmypixel/principles), so
there are rules for how things are built and a way to know the build matches the design.

Claude is great when you give it the right context and a harness for how to build and what to build.
Keep the instructions, rules, tests, context and skills up to date and lean.
[caveman](https://github.com/JuliusBrussee/caveman) and [RTK](https://www.rtk-ai.app/) keep Claude
brief and my own hooks stop reams of useless comments. Together they have helped my sanity and kept
token use down.

I steered all the way: writing the ADRs and PRDs and teaching it how to build through skills and
context. Then I checked what was built by paying attention to it. The final polish came from using the flows
as a user would. That's where the tweaks come from that make it work as a whole.

My tip: pay attention. If you don't tell the robots how to behave and then check how they behaved,
you'll get something you didn't ask for.

#### Try it

This has been an immense amount of fun: a modern web app plus iPhone and Android apps, built with
SvelteKit, Fastify and Claude. Try it at [status.me](https://status.me) or in the App Store and
Google Play.

#### Thanks

- [SvelteKit](https://svelte.dev/docs/kit)
- [Fastify](https://fastify.dev)
- [Capacitor](https://capacitorjs.com)
- [Claude](https://claude.com) by [Anthropic](https://www.anthropic.com)
- [Ryan Carson](https://github.com/snarktank) for [ai-dev-tasks](https://github.com/snarktank/ai-dev-tasks)

### Copy rules

First person, plain English, no marketing register. **No em dashes or en dashes anywhere** - plain
hyphens only. **No comma before "and" or "or".**
