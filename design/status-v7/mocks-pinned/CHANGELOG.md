# CHANGELOG vs design_handoff_onepager

## Added
- `/status` route (`render/Status.dc.html`).
- status entry in home Products, placed first.
- Theme-following screenshots for both products.
- Light-scheme Pipes screenshots and both-scheme notification.

## Changed
- Pipes and status carousels: slides are composed (live caption + raw screenshot) instead of a
  single framed image. `assets/pipes/framed-*.png` retired.
- Pipes entry now second, with a top rule.
- Carousel scroll handlers gained an in-flight guard (bug fix: chevrons did not move the strip).
- Fly.io removed from all copy.

## Unchanged
- Tokens, type, header, footer, hero, Experience, Services/FAQ, Contact, consent banner, toasts.
