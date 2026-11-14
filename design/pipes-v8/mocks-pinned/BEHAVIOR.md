# Behaviour: /pipes

## Theme
Same as /status: `data-theme` on the page root, read from and written to `localStorage['fmp-theme']`.
The four screenshots-band shots swap between `-light` and `-dark` files with the theme. The framed
store set does not (it is the store listing as published).

## Shared carousel (both strips)
- Native horizontal scroll, `scroll-snap-type:x mandatory`, scrollbar hidden.
- Prev / next: scroll the strip to `children[i].offsetLeft` with smooth behaviour. Set an in-flight
  flag for 700ms and ignore `scroll` events while it is set, otherwise the first intermediate
  event re-syncs the index and the snap container cancels the scroll.
- `scroll` (when not in flight): the active index is the child whose `offsetLeft` is nearest
  `scrollLeft`; if the strip is scrolled to its end, the last index.
- Dots: `role="tablist"` of `role="tab"` buttons, `aria-selected` on the active one. Active dot
  opacity 1, scale 1; others 0.32, scale 0.8. Hit target 24px (28px below 760px).
- Counter: `NN / NN  Label`.
- Below 680px the chevrons are removed and the frame gutter goes; swipe and dots carry it.
- Below 760px the figcaption wraps: dots drop beneath the counter.

## Screenshots band slide
`[data-status-slide]` 16:10 above 760px, caption and shot side by side; below 760px it stacks,
image column 300px, shot full width (`img[data-wide]`). Same rules as the home page.

## Back to top
Appears after 600px of scroll. Smooth scroll to top; `prefers-reduced-motion` disables smoothing.

## Mobile nav
Burger below 760px toggles a sticky panel under the header with Home, Products, Experience, Contact.
