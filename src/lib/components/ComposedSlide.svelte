<script lang="ts" module>
  export type Shot = {
    light: string
    dark: string
    alt: string
    width: number
    height: number
    frame?: 'window' | 'notification'
  }
</script>

<script lang="ts">
  import ThemedImage from './ThemedImage.svelte'

  let {
    number,
    caption,
    sub,
    shots,
    layout
  }: {
    number: string
    caption: string
    sub: string
    shots: Shot[]
    layout: 'phones' | 'wide'
  } = $props()
</script>

<div class="slide">
  <div class="caption-column">
    <span class="number">{number}</span>
    <p class="caption">{caption}</p>
    <p class="sub">{sub}</p>
  </div>
  <div class="shots {layout}">
    {#each shots as shot, shotIndex (shotIndex)}
      <span
        class="shot"
        data-frame={shot.frame ?? 'window'}
        style:aspect-ratio="{shot.width} / {shot.height}"
      >
        <ThemedImage
          light={shot.light}
          dark={shot.dark}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
        />
      </span>
    {/each}
  </div>
</div>

<style>
  .slide {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: stretch;
    overflow: hidden;
    background: var(--surface-raised);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
  }

  .caption-column {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    justify-content: center;
    gap: var(--space-4);
    min-width: 0;
    padding: var(--space-6) var(--space-5) var(--space-2);
  }

  .number {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    letter-spacing: var(--tracking-wide);
    color: var(--ink-subtle);
  }

  .caption {
    font-family: var(--font-display);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
    text-wrap: balance;
  }

  .sub {
    max-width: 30ch;
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--ink-muted);
    text-wrap: pretty;
  }

  .shots {
    display: flex;
    flex: none;
    align-items: flex-start;
    justify-content: center;
    height: 300px;
    min-width: 0;
    padding: var(--space-4) var(--space-5) 0;
    overflow: hidden;
  }

  .shot {
    display: block;
    flex: none;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
  }

  .shot :global(img) {
    width: 100%;
    height: 100%;
  }

  .phones {
    gap: var(--space-5);
  }

  .phones .shot {
    width: min(60%, 220px);
    border: 1px solid var(--border-default);
    border-bottom: none;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }

  .phones .shot + .shot {
    display: none;
    position: relative;
    z-index: 1;
    margin-top: 12%;
    margin-left: -18%;
  }

  .wide .shot {
    align-self: flex-start;
    width: 100%;
    margin-bottom: 8%;
  }

  .wide .shot[data-frame='window'] {
    border: 1px solid var(--border-default);
    border-radius: var(--radius-lg);
  }

  .wide .shot[data-frame='notification'] {
    border-radius: var(--radius-2xl);
  }

  @media (min-width: 47.5rem) {
    .slide {
      flex-direction: row;
      aspect-ratio: 16 / 10;
    }

    .caption-column {
      padding: var(--space-10) var(--space-6) var(--space-10) var(--space-10);
    }

    .shots {
      flex: 1.1 1 0;
      height: auto;
      padding: 8% var(--space-8) 0;
    }

    .phones .shot {
      width: auto;
      height: 104%;
    }

    .phones .shot + .shot {
      display: block;
    }

    .wide .shot {
      align-self: center;
    }
  }
</style>
