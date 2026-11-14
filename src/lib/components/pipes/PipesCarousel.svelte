<script lang="ts">
  import { slideNumber } from '#lib/carousel.js'
  import { slides } from '#lib/data/pipes.js'
  import Carousel from '../Carousel.svelte'
  import ComposedSlide from '../ComposedSlide.svelte'
</script>

<Carousel items={slides} label="Pipes screenshots">
  {#snippet slide(item, index)}
    <ComposedSlide
      number={slideNumber(index)}
      caption={item.label}
      sub={item.sub}
      shots={[item.shot]}
      layout="wide"
    />
  {/snippet}
</Carousel>
