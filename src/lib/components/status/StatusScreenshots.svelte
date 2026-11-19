<script lang="ts">
  import { slides, story } from '#lib/data/status.js'
  import ProductScreenshots from '../product/ProductScreenshots.svelte'
  import ScreenshotCarousel from '../ScreenshotCarousel.svelte'
</script>

<ProductScreenshots
  heading="Post. React. Reply. Natter."
  story={{ problem: story.problem, solution: story.solution, product: story.product }}
>
  <ScreenshotCarousel {slides} label="status screenshots" />
</ProductScreenshots>
