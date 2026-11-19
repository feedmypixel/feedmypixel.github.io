<script lang="ts">
  import { resolve } from '$app/paths'
  import Button from './Button.svelte'
  import Chevron from './Chevron.svelte'
  import GitHubMark from './GitHubMark.svelte'
  import SectionHeader from './SectionHeader.svelte'
  import ProductEntry from './ProductEntry.svelte'
  import StatusStoreLinks from './StatusStoreLinks.svelte'
  import ScreenshotCarousel from './ScreenshotCarousel.svelte'
  import { slides as statusSlides, story as statusStory } from '#lib/data/status.js'
  import {
    pitch as pipesPitch,
    slides as pipesSlides,
    story as pipesStory
  } from '#lib/data/pipes.js'
  import { pipesChromeUrl, pipesFirefoxUrl, pipesSourceUrl, statusUrl } from '#lib/config.js'
</script>

<section id="products" class="products">
  <div class="container inner">
    <SectionHeader
      eyebrow="Products"
      heading="Real tools for real needs"
      lede="Designed, built and shipped end to end"
    />

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
        <ScreenshotCarousel slides={statusSlides} label="status screenshots" />
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
        <ScreenshotCarousel slides={pipesSlides} label="Pipes screenshots" />
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
</style>
