# Pipes captures

The popup, side panel, options and failure notification shots in both themes, copied from the pipes
repo's `store-screenshots/auto/` at commit `8af3f8e`. They have no scrollbars (pipes `12db8fa`), unlike
the copies in the design bundles. `scripts/resize-screens.py` copies them into `static/pipes/`.

`framed/` holds the store set: the shots framed with captions plus the promo and marquee tiles, from
the Pipes v8 design handoff. The script turns 1 to 5 into `static/pipes/framed/*.webp` and the marquee
tile into the share image `static/pipes/og-image.png`.

To refresh: regenerate the captures in the pipes repo, copy them here and run the script.
