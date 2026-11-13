<script lang="ts">
  import { frames, story } from '#lib/data/status.js'
  import Carousel from '../Carousel.svelte'
  import ProductStory from '../ProductStory.svelte'

  const product =
    'A SvelteKit and Svelte 5 web app with a Fastify and PostgreSQL api. The iPhone and Android apps are Capacitor shells around the live site. Sign in by email link or passkey, no passwords. Push notifications and fingerprint or face app lock. No ads and no tracking.'
</script>

<section id="screenshots" class="screenshots">
  <div class="container inner">
    <div>
      <p class="eyebrow">Screenshots</p>
      <h2>Post. React. Reply. Natter.</h2>
    </div>

    <Carousel
      items={frames}
      label="status store screenshots"
      slideWidth="clamp(200px, 24vw, 280px)"
    >
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

    <ProductStory {...story} {product} />
  </div>
</section>

<style>
  .screenshots {
    background: var(--surface-sunken);
    border-bottom: 1px solid var(--border-subtle);
  }

  .inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
    padding-block: var(--band);
  }

  .eyebrow {
    margin-bottom: var(--space-4);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    letter-spacing: var(--tracking-wide);
    color: var(--brand-text);
  }

  h2 {
    max-width: 26ch;
    font-family: var(--font-display);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
    text-wrap: balance;
  }

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
