<script lang="ts">
  import { asset, resolve } from '$app/paths'
  import Button from './Button.svelte'
  import Carousel from './Carousel.svelte'
  import Chevron from './Chevron.svelte'
  import ComposedSlide from './ComposedSlide.svelte'
  import GitHubMark from './GitHubMark.svelte'
  import ProductEntry from './ProductEntry.svelte'
  import StatusStoreLinks from './StatusStoreLinks.svelte'
  import { slides as statusSlides, story as statusStory } from '#lib/data/status.js'
  import { pipesChromeUrl, pipesFirefoxUrl, pipesSourceUrl, statusUrl } from '#lib/config.js'

  const pipesShot = (
    view: 'popup' | 'sidepanel' | 'options' | 'failure-notification',
    label: string,
    width: number,
    height: number
  ) => ({
    light: asset(`pipes/${view}-light.png`),
    dark: asset(`pipes/${view}-dark.png`),
    alt: `Pipes: ${label.toLowerCase()}`,
    width,
    height,
    frame: view === 'failure-notification' ? ('notification' as const) : ('window' as const)
  })

  const pipesSlides = [
    {
      label: 'Status from your toolbar',
      sub: 'One click through to the run that failed.',
      shot: pipesShot('popup', 'Status from your toolbar', 880, 1000)
    },
    {
      label: 'Every repo in a side panel',
      sub: 'GitHub Actions and GitLab CI/CD, grouped how you choose.',
      shot: pipesShot('sidepanel', 'Every repo in a side panel', 1080, 880)
    },
    {
      label: 'Connect GitHub and GitLab',
      sub: 'Your tokens never leave your browser. No server.',
      shot: pipesShot('options', 'Connect GitHub and GitLab', 1360, 1200)
    },
    {
      label: 'Loud the moment it breaks',
      sub: 'A notification the moment a default branch fails.',
      shot: pipesShot('failure-notification', 'Loud the moment it breaks', 728, 170)
    }
  ]

  const slideNumber = (index: number) => String(index + 1).padStart(2, '0')
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
        ...statusStory,
        product:
          'A SvelteKit and Svelte 5 web app with a Fastify and PostgreSQL api. iPhone and Android apps are Capacitor shells around the live site. Sign in by email link or passkey. No ads and no tracking.'
      }}
    >
      {#snippet links()}
        <Button variant="solid" external href={statusUrl}>Open status.me</Button>
        <StatusStoreLinks />
        <Button variant="ghost" href={resolve('/status')}>
          How I built it
          <Chevron direction="right" />
        </Button>
      {/snippet}
      {#snippet screenshots()}
        <Carousel items={statusSlides} label="status screenshots">
          {#snippet slide(item, index)}
            <ComposedSlide
              number={slideNumber(index)}
              caption={item.label}
              sub={item.sub}
              shots={item.shots}
              layout="phones"
            />
          {/snippet}
        </Carousel>
      {/snippet}
    </ProductEntry>

    <ProductEntry
      name="Pipes"
      divided
      pitch="CI/CD pipeline monitoring that lives in your browser and goes loud the moment a default branch breaks."
      story={{
        problem:
          'You find out the default branch is broken from a teammate on Slack, not from your own tools. Pipeline dashboards live in tabs you forget to open.',
        solution:
          'Pipes watches the repos you choose across GitHub Actions and GitLab CI/CD and surfaces the status in your toolbar. Loud when the default branch fails, quiet when it is green.',
        product:
          'A browser extension built on Manifest V3 with Svelte 5 and TypeScript, shipping on Chrome and Firefox. Fully client-side: no server, no tracking, your tokens never leave your browser.'
      }}
    >
      {#snippet links()}
        <Button variant="solid" external href={pipesChromeUrl}>Chrome Web Store</Button>
        <Button variant="ghost" external href={pipesFirefoxUrl}>Firefox Add-ons</Button>
        <Button variant="ghost" external href={pipesSourceUrl}>
          <GitHubMark />
          Source
        </Button>
      {/snippet}
      {#snippet screenshots()}
        <Carousel items={pipesSlides} label="Pipes screenshots">
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
    font-size: var(--font-size-md);
    line-height: var(--line-height-snug);
    color: var(--ink-muted);
    text-wrap: pretty;
  }
</style>
