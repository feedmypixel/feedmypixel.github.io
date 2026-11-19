<script lang="ts">
  import type { Snippet } from 'svelte'
  import { resolve } from '$app/paths'
  import PixelMark from '../PixelMark.svelte'

  let {
    name,
    pitch,
    lead,
    actions,
    facts
  }: {
    name: string
    pitch: string
    lead: string
    actions: Snippet
    facts: Snippet
  } = $props()

  const home = resolve('/')
</script>

<section class="hero">
  <div class="container inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href={home}>feedMyPixel</a>
      <span aria-hidden="true">/</span>
      <a href="{home}#products">Products</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{name}</span>
    </nav>

    <div class="title">
      <PixelMark size="large" />
      <h1>{name}</h1>
    </div>

    <p class="pitch">{pitch}</p>
    <p class="lead">{lead}</p>

    <div class="actions">
      {@render actions()}
    </div>

    <p class="facts">{@render facts()}</p>
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
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    letter-spacing: var(--tracking-tight);
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

  .facts :global(a:not(:hover)) {
    color: inherit;
  }

  @media (min-width: 47.5rem) {
    .actions {
      flex-direction: row;
      align-items: center;
    }
  }
</style>
