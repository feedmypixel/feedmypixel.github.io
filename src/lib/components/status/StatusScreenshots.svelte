<script lang="ts">
  import { frames, story } from '#lib/data/status.js'
  import Carousel from '../Carousel.svelte'
  import ProductScreenshots from '../product/ProductScreenshots.svelte'
</script>

<ProductScreenshots
  heading="Post. React. Reply. Natter."
  story={{ problem: story.problem, solution: story.solution, product: story.product }}
>
  <Carousel items={frames} label="status store screenshots" slideWidth="clamp(200px, 24vw, 280px)">
    {#snippet slide(frame)}
      <figure class="frame">
        <div class="card" style:aspect-ratio="{frame.width} / {frame.height}">
          <img
            src={frame.src}
            alt={frame.alt}
            width={frame.width}
            height={frame.height}
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption>
          <span class="number">{frame.number}</span>
          <span>{frame.label}</span>
        </figcaption>
      </figure>
    {/snippet}
  </Carousel>
</ProductScreenshots>

<style>
  .frame {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--space-3);
    min-width: 0;
  }

  .card {
    overflow: hidden;
    background: var(--surface-raised);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
  }

  .card img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  figcaption {
    display: flex;
    gap: var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    color: var(--ink-muted);
  }

  .number {
    color: var(--ink-subtle);
  }
</style>
