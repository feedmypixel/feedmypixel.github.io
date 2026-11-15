<script lang="ts">
  import { resolve } from '$app/paths'
  import Button from './Button.svelte'
  import Chevron from './Chevron.svelte'
  import GitHubMark from './GitHubMark.svelte'
  import ProductEntry from './ProductEntry.svelte'
  import StatusStoreLinks from './StatusStoreLinks.svelte'
  import PipesCarousel from './pipes/PipesCarousel.svelte'
  import StatusCarousel from './status/StatusCarousel.svelte'
  import { slides as statusSlides, story as statusStory } from '#lib/data/status.js'
  import { pitch as pipesPitch, story as pipesStory } from '#lib/data/pipes.js'
  import { pipesChromeUrl, pipesFirefoxUrl, pipesSourceUrl, statusUrl } from '#lib/config.js'
</script>

<section id="products" class="products">
  <div class="container inner">
    <p class="eyebrow">Products</p>
    <h2>Real tools for real needs</h2>
    <p class="lede">Designed, built and shipped end to end.</p>

    <ProductEntry
      name="status"
      pitch="An emoji and your status: break the ice and spark a conversation. React, reply and natter."
      story={{
        problem: statusStory.problem,
        solution: statusStory.solution,
        product: statusStory.productSummary
      }}
    >
      {#snippet links()}
        <Button variant="solid" external href={statusUrl}>Open status.me</Button>
        <StatusStoreLinks />
        <Button variant="ghost" href={resolve('/status')}>
          How I built it<span class="visually-hidden"> status</span>
          <Chevron direction="right" />
        </Button>
      {/snippet}
      {#snippet screenshots()}
        <StatusCarousel slides={statusSlides} label="status screenshots" />
      {/snippet}
    </ProductEntry>

    <ProductEntry name="Pipes" divided pitch={pipesPitch} story={pipesStory}>
      {#snippet links()}
        <Button variant="solid" external href={pipesChromeUrl}>Chrome Web Store</Button>
        <Button variant="ghost" external href={pipesFirefoxUrl}>Firefox Add-ons</Button>
        <Button variant="ghost" external href={pipesSourceUrl}>
          <GitHubMark />
          Source
        </Button>
        <Button variant="ghost" href={resolve('/pipes')}>
          How I built it<span class="visually-hidden"> Pipes</span>
          <Chevron direction="right" />
        </Button>
      {/snippet}
      {#snippet screenshots()}
        <PipesCarousel />
      {/snippet}
    </ProductEntry>
  </div>
</section>

<style>
  .products {
    background: var(--surface-sunken);
    border-bottom: 1px solid var(--border-subtle);
  }

  .inner {
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

  .lede {
    max-width: 50ch;
    margin-top: var(--space-4);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-snug);
    color: var(--ink-muted);
    text-wrap: pretty;
  }
</style>
