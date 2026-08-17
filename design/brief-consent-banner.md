# feedMyPixel — Consent banner brief

**For:** [claude.ai/design](https://claude.ai/design). One small component, to sit on the existing
one-page site. Output is a **visual brief** for re-implementation as a Svelte 5 component, not
production code.

## Build on the locked system — do not restate it

The one-pager is **built and live-ready** from your `design_handoff_onepager_v1` bundle. Everything
in that bundle's `_ds/` (tokens, Plus Jakarta Sans + DM Mono, the blue brand, 2–4px pixel-square
radii, the surfaces/ink/mood scales, `--shadow-lg`, `--z-toast`) is already implemented and must be
reused as-is. **Ship the same `_ds/` back with this drop** so the conformance check can run.

Existing components this must sit beside without looking bolted on: the solid/ghost **buttons**, the
bottom-centre **toast** stack (same corner of the screen — see Conflicts), the **email pill**, and the
sunken-band section rhythm.

## What it is

A **consent banner** asking permission before Google Analytics loads. It is the first thing every
visitor sees, on a site whose entire pitch is craft — so it has to feel deliberate rather than like
a compliance tax. It is also, honestly, an interruption: the design job is to make it small, calm,
quick to dismiss, and gone forever once answered.

**Behaviour already implemented** (design around this, don't redesign it):

- Shown only when there is no stored answer. Answer is remembered; never asked twice.
- A browser-level opt-out (Global Privacy Control / Do Not Track) auto-declines and the banner never
  appears.
- Nothing from Google is fetched until Accept. Decline means nothing loads, ever.
- A **footer control re-opens it** so consent can be withdrawn — the banner must therefore look right
  appearing *mid-page*, not only on first load.

**Current placeholder copy** (rewrite it if you can do better — plain English, no legalese, first
person, matches the site's voice):

> I use Google Analytics to see which parts of this site are read. Nothing loads until you say yes,
> and no personal data is collected either way.

Actions: **Accept analytics** (primary) and **Decline** (equal-weight escape). Both must be genuinely
easy to hit — no dark patterns, no shrunken or greyed-out decline.

## Changes since your bundle — re-export `_ds/` with these, not the originals

The build diverged from `design_handoff_onepager_v1` in a few deliberate places. Your new drop should
carry these so the two stay in step:

- **Toast progress bar inverted.** The bundle depleted a **white** bar (`rgba(255,255,255,0.9)`) over a
  dark track (`rgba(0,0,0,0.3)`). It now depletes a **dark** bar over the toast's **own mood colour** —
  the emptied space is the toast fill itself, not a lighter band. Tokens as built:
  `--toast-progress-track: transparent`, `--toast-progress-fill: rgb(0 0 0 / 38%)`, `--toast-ink: #fff`.
  This matters here: the banner sits in the same corner as the toasts, so match that treatment rather
  than the bundle's.
- **New tokens** the bundle did not have, available to you: `--scrim: rgb(10 16 32 / 40%)` (dark theme
  `rgb(0 0 0 / 55%)`), `--header-height: 4rem`, `--container-max: 77.5rem`.
- **Inline links underline by default.** The bundle relied on colour alone, which fails WCAG 1.4.1.
  Standalone nav/footer/button links opt out; links inside prose are underlined. The banner copy may
  contain a link — treat it accordingly.
- **Type/space token names** now follow the shared vocabulary: `--font-size-*`, `--line-height-*`,
  `--font-weight-*`, `--transition-*`. Values are unchanged from the bundle.
- **Store buttons are live** — Pipes shipped, so the Products section carries real Chrome Web Store and
  Firefox Add-ons buttons rather than a coming-soon line.
- **`/components` is a real public page** (the catalogue), linked from the footer.

## Conflicts to solve — the real design problem

1. **It collides with the toast stack.** Toasts are fixed bottom-centre (`--z-toast`), 8s
   auto-dismissing, and fire on theme change, email copy and form submit. The banner currently sits in
   the same place. Either move the banner, restack them, or propose a rule for how they coexist.
2. **It must not cover the hero on first paint** on a small phone, and must not trap the reader
   against the contact form at the bottom.
3. **Re-entry from the footer**: when re-opened, the reader is deep in the page. Should it be anchored
   to the viewport, or appear in place near the footer control? Your call — say which and why.

## States to render

Every one of these, as working markup in the bundle (not described in prose):

- Default, **light and dark**.
- **Mobile** (≤759px) and desktop — the one hard breakpoint on this site.
- **Keyboard focus** on each action, and on the banner container (it takes focus when it appears so
  screen readers announce it).
- Hover on both actions.
- The **moment after answering** — if you want a transition or acknowledgement, show it; if it should
  simply vanish, say so.

## Constraints

- **WCAG 2.1 AA**: contrast in both themes, visible focus, keyboard operable, sensible reading order.
  It is a `role="dialog"` that does **not** trap focus (the page stays usable while it is open) — if
  you think it should be modal instead, argue for it.
- **Tokens only.** No new raw values; if you genuinely need a new token, name it and say why.
- **Respect `prefers-reduced-motion`** on any animation.
- **No cookie-wall.** The site is fully readable whether the reader accepts, declines, or ignores it.

## Deliver

Per the usual contract: `_ds/` re-exported, one self-contained working render carrying every state
above, real copy, and a short changelog note. Flag anything you think the rest of the site should
change to accommodate this.
