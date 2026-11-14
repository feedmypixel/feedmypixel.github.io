<script lang="ts">
  import type { Snippet } from 'svelte'
  import ProductStory from '../ProductStory.svelte'

  let {
    heading,
    story,
    children
  }: {
    heading: string
    story: { problem: string; solution: string; product: string }
    children: Snippet
  } = $props()
</script>

<section id="screenshots" class="screenshots">
  <div class="container inner">
    <div>
      <p class="eyebrow">Screenshots</p>
      <h2>{heading}</h2>
    </div>

    {@render children()}

    <ProductStory {...story} />
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
</style>
