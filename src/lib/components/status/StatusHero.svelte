<script lang="ts">
  import { resolve } from '$app/paths'
  import { statusUrl } from '#lib/config.js'
  import Button from '../Button.svelte'
  import PixelMark from '../PixelMark.svelte'
  import StatusStoreLinks from '../StatusStoreLinks.svelte'

  const home = resolve('/')
</script>

<section class="hero">
  <div class="container inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href={home}>feedMyPixel</a>
      <span aria-hidden="true">/</span>
      <a href="{home}#products">Products</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">status</span>
    </nav>

    <div class="title">
      <PixelMark size="large" />
      <h1>status</h1>
    </div>

    <p class="pitch">An emoji and your status: break the ice and spark a conversation.</p>
    <p class="lead">
      React, reply and natter. Post an emoji and a few words. Your people react, reply or message
      you for a natter.
    </p>

    <div class="actions">
      <Button variant="solid" size="large" external href={statusUrl}>Open status.me</Button>
      <StatusStoreLinks size="large" />
    </div>

    <p class="facts">
      Web, iPhone and Android · No ads · No tracking · For 13 and over · Soft launched on the web,
      November 2026
    </p>
  </div>
</section>

<style>
  .hero {
    border-bottom: 1px solid var(--border-subtle);
  }

  .inner {
    padding-block: var(--band);
  }

  .breadcrumb {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-6);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    letter-spacing: var(--tracking-wide);
    color: var(--ink-subtle);
  }

  .breadcrumb a {
    color: var(--ink-subtle);
    text-decoration: none;
  }

  .breadcrumb a:hover {
    color: var(--link-hover);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .breadcrumb [aria-current] {
    color: var(--ink-muted);
  }

  .title {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  h1 {
    font-family: var(--font-display);
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
  }

  .pitch {
    max-width: 30ch;
    margin-top: var(--space-8);
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-snug);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
    text-wrap: balance;
  }

  .lead {
    max-width: 46ch;
    margin-top: var(--space-4);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-snug);
    color: var(--ink-muted);
    text-wrap: pretty;
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
    margin-top: var(--space-10);
  }

  .facts {
    max-width: 64ch;
    margin-top: var(--space-16);
    padding-top: var(--space-6);
    border-top: 1px solid var(--border-subtle);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    line-height: var(--line-height-relaxed);
    color: var(--ink-subtle);
  }

  @media (min-width: 47.5rem) {
    .actions {
      flex-direction: row;
      align-items: center;
    }
  }
</style>
