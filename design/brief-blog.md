# FeedMyPixel — Dev blog design brief

**For:** [claude.ai/design](https://claude.ai/design). Builds on `brief-global.md` (tokens, type,
header, footer). Mirrors stat's system (`~/Projects/status/stat-ui/src/lib/styles`). Deliver
**two screens** — blog index + a post page — as self-contained HTML + CSS, light theme primary
(dark a bonus), desktop + mobile.

## Goal

The dev blog is the **owned channel** — quality write-ups that compound an audience for product
launches. The reading experience must be calm, focused, and long-form legible: this is where Ben's
craft shows in typography and rhythm.

## Screen 1 — Blog index

- Newest-first list of posts: **title, date, summary**, each linking to the post.
- A short intro/header for the blog (what it is, who writes it).
- Newsletter signup + RSS link present (subscribe paths obvious, never dead-ends).
- Scales gracefully from 1 post (launch) to many. Consider tags as a later nicety — don't over-build.

## Screen 2 — Post page

- **Header:** title, publish date, optional reading time.
- **Body:** the long-form reading column — measured line length, strong vertical rhythm, clear
  heading hierarchy. This is the typography showcase.
- **Code blocks** with syntax highlighting (these are dev posts — show a realistic code sample,
  light + dark if doing dark).
- Rich content states: headings, lists, blockquotes, inline code, links, images/figures, callouts.
- **Footer of post:** author line + a subscribe prompt (newsletter) so readers convert.

## Notes

- Mobile-first; show both. Reading column comfortable on desktop, full-bleed-sensible on mobile.
- Works as plain HTML/CSS (content + nav without JS).
- Keep chrome quiet — the writing is the hero.

## Deliver

Blog index + post page, all the post content states above, light theme (dark optional), desktop +
mobile, annotated against the global tokens (flag any new token a long-form reading surface needs —
e.g. a measure/`--reading-width`, prose spacing).
