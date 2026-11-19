<script lang="ts" module>
  import type { Layout, Shot } from './ComposedSlide.svelte'

  export type Slide = { label: string; sub: string; shots: Shot[]; layout: Layout }
</script>

<script lang="ts">
  import { slideNumber } from '#lib/carousel.js'
  import Carousel from './Carousel.svelte'
  import ComposedSlide from './ComposedSlide.svelte'

  let { slides, label }: { slides: Slide[]; label: string } = $props()
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
