<script lang="ts">
  import { story } from '#lib/data/pipes.js'
  import ProductScreenshots from '../product/ProductScreenshots.svelte'
  import PipesCarousel from './PipesCarousel.svelte'
</script>

<ProductScreenshots heading="A popup for a glance, a side panel to keep open" {story}>
  <PipesCarousel />
</ProductScreenshots>
