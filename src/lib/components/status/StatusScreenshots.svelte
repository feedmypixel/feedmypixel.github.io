<script lang="ts">
  import { slides, story } from '#lib/data/status.js'
  import ProductScreenshots from '../product/ProductScreenshots.svelte'
  import StatusCarousel from './StatusCarousel.svelte'
</script>

<ProductScreenshots
  heading="Post. React. Reply. Natter."
  story={{ problem: story.problem, solution: story.solution, product: story.product }}
>
  <StatusCarousel {slides} label="status screenshots" />
</ProductScreenshots>
