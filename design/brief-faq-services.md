# feedMyPixel - FAQ and services brief

**For:** [claude.ai/design](https://claude.ai/design). One new section on the existing one-page site,
plus a small copy problem to solve. Output is a **visual brief** for re-implementation as Svelte 5
components, not production code.

## Build on the locked system - do not restate it

The one-pager is **live** at <https://feedmypixel.com>, built from your `design_handoff_onepager_v1`
bundle and extended by `design_handoff_consent_banner_v2`. Everything in `_ds/` (tokens, Plus Jakarta
Sans + DM Mono, the blue brand, 2-4px pixel-square radii, the surfaces/ink/mood scales) is implemented
and must be reused as-is. **Ship the same `_ds/` back with this drop** so the conformance check can run.

Existing furniture this must sit beside without looking bolted on: the sunken-band section rhythm, the
`.eyebrow` label above each section heading, the solid/ghost buttons, and the faceted CV search block.

## Why this section exists

This is not a content-filler FAQ. It is the site's **answer-engine surface**.

When someone asks an assistant "who should I hire for a contract SvelteKit role" or "is Ben Chidgey
available", the assistant needs short, quotable, self-contained answers. Structured data (`FAQPage`,
`ProfessionalService`) will be attached to this section in code - but schema is only legitimate when
the same words are **visible on the page** to a human reader. So the design job is real: this has to
earn its place for people, and the machine benefit follows.

Two things are missing from the site today:

1. **No FAQ.** The obvious hiring questions go unanswered.
2. **Nothing states what is actually for sale.** The site says who Ben is and proves he ships, but
   never plainly says "here is the service, here is how engagements work, here is where I work".

## What to design

**A. A services statement.** Short. What Ben does, how he engages, where he works. This may be its own
small section, or it may fold into the hero or the FAQ - your call, but argue for it. Do not turn it
into a three-column "my services" card grid; that is agency boilerplate and this site is not that.

**B. An FAQ section.** Candidate questions below - **rewrite, merge, cut and reorder them**. Ben will
edit your copy, so write it as real answers in his voice (first person, plain English, no marketing
register, no em dashes or en dashes anywhere - plain hyphens only).

- Are you available, and how quickly can you start?
- What do you work with? (recent: SvelteKit, TypeScript, Node, AWS; 20 years total)
- Do you work remotely, and where? (remote worldwide; UK-based)
- Do you take inside-IR35 work, or outside only?
- How do you work with an existing team?
- Do you do accessibility work? (strong a11y and progressive-enhancement bias, lots of public-sector)
- What size of engagement suits you?

Answers must be **self-contained** - each one quotable on its own without the question or the page
around it. That is what makes it citable. Two to four sentences each; if an answer needs more, the
question is wrong.

## The real design problems

1. **Where does it go?** Current order is Hero → Products → Experience (faceted CV search) → Contact.
   The FAQ must not push Contact so far down that the hire-me action gets buried, and must not
   interrupt the Products → proof → contact narrative. Propose a position and justify it.
2. **How much does it weigh?** Seven questions expanded is a wall of text on a page that is currently
   tight. If you use disclosure (accordion), the answers **must still be in the DOM when collapsed** -
   crawlers and assistants read the markup, so `hidden`-until-clicked content that only exists after a
   JS fetch is worthless here. `<details>`/`<summary>` works without JS and is the obvious candidate,
   but it is visually plain; if you can do better within the system, show it.
3. **Does the services statement duplicate the hero?** The hero already says what Ben is. Find the line
   between "who" and "what you get" without saying it twice.

## Changes since your last bundle - re-export `_ds/` with these

The build has moved on since `design_handoff_consent_banner_v2`. Your new drop should carry these:

- **Link hover rule inverted, and now global.** Previously: links underline on hover. Now hover always
  *changes* the underline state - content links (prose, the contact aside list) are underlined at rest
  and **lose** the underline on hover; chrome links (header nav, footer, mobile drawer, email pill) are
  clean at rest and **gain** one. Any link you design must say which side it is on.
- **Empty states use a link, not a button.** The CV search "Clear all filters" action is now link-styled
  (link blue, underlined, underline drops on hover), because a second ghost button competed with the
  filter pills above it. It remains a `<button>` element.
- **Search field has a floating label** rather than a long placeholder, and the placeholder is just
  "Search".
- **Carousel**: arrows are hidden below 47.5rem (they obstructed on phones); page dots are larger on
  mobile (28px target / 14px mark) than desktop (24px / 10px).
- **A back-to-top control** appears after 600px of scroll.
- **The footer** carries a round GitHub octocat linking this site's own source, right of "Cookie
  settings".

## States to render

Every one of these, as working markup in the bundle (not described in prose):

- Default, **light and dark**.
- **Mobile** (≤759px) and desktop - the one hard breakpoint on this site.
- If you use disclosure: **collapsed and expanded**, plus the **keyboard focus** state on the control.
- Hover on anything interactive.
- The section at its **longest** - all questions open at once - so we can see the worst-case rhythm.

## Constraints

- **WCAG 2.1 AA**: contrast in both themes, visible focus, keyboard operable, sensible reading order,
  24px minimum target size.
- **Tokens only.** No new raw values; if you genuinely need a new token, name it and say why.
- **Respect `prefers-reduced-motion`** on any expand/collapse animation.
- **Works without JavaScript.** The whole site is prerendered static and progressively enhanced.
- **No em dashes or en dashes in any copy.** Plain hyphens only. This applies to your draft answers.

## Deliver

Per the usual contract: `_ds/` re-exported, one self-contained working render carrying every state
above, real copy (not lorem), and a short changelog note. Flag anything you think the rest of the site
should change to accommodate this.
