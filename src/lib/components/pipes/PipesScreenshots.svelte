<script lang="ts">
  import { slides, story } from '#lib/data/pipes.js'
  import ProductScreenshots from '../product/ProductScreenshots.svelte'
  import ScreenshotCarousel from '../ScreenshotCarousel.svelte'
</script>

<ProductScreenshots heading="A popup for a glance, a side panel to keep open" {story}>
  <ScreenshotCarousel {slides} label="Pipes screenshots" />
</ProductScreenshots>
