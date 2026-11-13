# BEHAVIOR.md - what moves, and the data behind it

Only what is new or changed since `design_handoff_onepager/BEHAVIOR.md`.

## Carousels (home: status and Pipes; /status: frame strip)
- Native `scroll-snap-type:x mandatory` strip; swipe works with no JS.
- Prev/next and dots are enhancement. They set the active index in state and call
  `scrollTo({left, behavior:'smooth'})`. Home slides are full width so `left = i * (clientWidth +
  16)`; the /status frame strip uses the child's `offsetLeft`.
- `scroll` handler derives the active index from `scrollLeft` (nearest child for the frame strip,
  round(scrollLeft / (clientWidth + 16)) for full-width slides). It must early-return while a
  programmatic scroll is in flight (700ms flag), or the first intermediate event resets state and
  the snap container snaps back.
- Caption and dots derive from the active index. Dots are `role="tab"` with `aria-selected`.
- Below 680px chevrons are removed; dots grow to 28px hit targets.

## Theme-following screenshots
- status: `uploads/1206x2622/<theme>/NN-screen.png`. Slide 02 inverts the theme.
- Pipes: `assets/pipes/<view>-<theme>.png`.
- /status build-story strip: same folders as status slides, `screensTheme` prop can pin a scheme.
- Theme comes from `localStorage['fmp-theme']`; both pages read and write the same key so the
  choice carries across routes.

## /status page
- Header is the home header minus the scroll-spy indicator (links leave the page). Mobile drawer
  lists Home / Products / Experience / Contact.
- TOC links scroll to `h3` ids with `scroll-margin-top` clearing the sticky header.
- Back-to-top button appears after 600px of scroll, `scrollTo({top:0, behavior:'smooth'})`.
- `prefers-reduced-motion` kills smooth scroll and transitions, as on home.

## Slide data shapes
```
status: { caption, sub, shots: ['01-home', ...], flip?: boolean }
pipes:  { file: 'popup'|'sidepanel'|'options'|'failure-notification', label, sub, center?: boolean }
frames: { file: '01-everyone'..'07-no-ads', label }
```
