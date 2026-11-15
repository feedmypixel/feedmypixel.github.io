<script lang="ts">
  import { slideNumber } from '#lib/carousel.js'
  import type { slides as statusSlides } from '#lib/data/status.js'
  import Carousel from '../Carousel.svelte'
  import ComposedSlide from '../ComposedSlide.svelte'

  let { slides, label }: { slides: typeof statusSlides; label: string } = $props()
</script>

<Carousel items={slides} {label}>
  {#snippet slide(item, index)}
    <ComposedSlide
      number={slideNumber(index)}
      caption={item.label}
      sub={item.sub}
      shots={item.shots}
      layout={item.layout}
    />
  {/snippet}
</Carousel>
