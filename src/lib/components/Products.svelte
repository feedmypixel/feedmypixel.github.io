<script lang="ts">
  import { asset } from '$app/paths'
  import Button from './Button.svelte'
  import Carousel from './Carousel.svelte'
  import GitHubMark from './GitHubMark.svelte'
  import type { Slide } from './Carousel.svelte'

  const slides: Slide[] = [
    {
      src: asset('/pipes/framed-popup.png'),
      alt: 'Pipes: status from your toolbar',
      label: 'Status from your toolbar'
    },
    {
      src: asset('/pipes/framed-sidepanel.png'),
      alt: 'Pipes: every repo in a side panel',
      label: 'Every repo in a side panel'
    },
    {
      src: asset('/pipes/framed-options.png'),
      alt: 'Pipes: connect GitHub and GitLab',
      label: 'Connect GitHub and GitLab'
    },
    {
      src: asset('/pipes/framed-notification.png'),
      alt: 'Pipes: loud the moment it breaks',
      label: 'Loud the moment it breaks'
    }
  ]
</script>

<section id="products" class="products">
  <div class="container inner">
    <p class="eyebrow">Products</p>
    <h2>Real tools for real needs</h2>
    <p class="lede">Designed, built and shipped end to end.</p>

    <div class="entry">
      <div class="intro">
        <div class="name">
          <span class="mark" aria-hidden="true"><span></span><span></span></span>
          <h3>Pipes</h3>
        </div>
        <p class="pitch">
          CI/CD pipeline monitoring that lives in your browser and goes loud the moment a default
          branch breaks.
        </p>
        <div class="links">
          <Button
            variant="solid"
            external
            href="https://chromewebstore.google.com/detail/pipes-watch-your-cicd-pip/aoijidjpiiphnblbeddcmmfkbdildnpl"
          >
            Chrome Web Store
          </Button>
          <Button variant="ghost" external href="https://addons.mozilla.org/firefox/addon/pipes/">
            Firefox Add-ons
          </Button>
          <Button variant="ghost" external href="https://github.com/feedmypixel/pipes">
            <GitHubMark />
            Source
          </Button>
        </div>
      </div>

      <Carousel {slides} label="Pipes screenshots" />

      <div class="story">
        <div>
          <p class="label" data-kind="problem">Problem</p>
          <p>
            You find out the default branch is broken from a teammate on Slack, not from your own
            tools. Pipeline dashboards live in tabs you forget to open.
          </p>
        </div>
        <div>
          <p class="label" data-kind="solution">Solution</p>
          <p>
            Pipes watches the repos you choose across GitHub Actions and GitLab CI/CD and surfaces
            the status in your toolbar. Loud when the default branch fails, quiet when it is green.
          </p>
        </div>
        <div>
          <p class="label" data-kind="product">Product</p>
          <p>
            A browser extension built on Manifest V3 with Svelte 5 and TypeScript, shipping on
            Chrome and Firefox. Fully client-side: no server, no tracking, your tokens never leave
            your browser.
          </p>
        </div>
      </div>
    </div>
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

  .entry {
    display: flex;
    flex-direction: column;
    gap: var(--space-10);
    margin-top: var(--space-16);
  }

  .intro {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .name {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .mark {
    display: flex;
    flex: none;
    gap: 3px;
  }

  .mark span {
    width: 11px;
    height: 11px;
    background: var(--brand);
  }

  .mark span:last-child {
    opacity: 0.45;
  }

  h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
  }

  .pitch {
    max-width: 46ch;
    font-size: var(--font-size-lg);
    line-height: var(--line-height-snug);
    color: var(--ink);
    text-wrap: pretty;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4);
  }

  .story {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
    gap: var(--space-8);
    padding-top: var(--space-4);
  }

  .story p:not(.label) {
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--ink);
  }

  .label {
    margin-bottom: var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-wide);
  }

  .label[data-kind='problem'] {
    color: var(--mood-critical);
  }

  .label[data-kind='solution'] {
    color: var(--brand-text);
  }

  .label[data-kind='product'] {
    color: var(--mood-positive);
  }
</style>
