<script lang="ts">
  import type { Snippet } from 'svelte'
  import Eyebrow from './Eyebrow.svelte'
  import HeadingLink from './HeadingLink.svelte'

  let {
    eyebrow,
    heading,
    lede,
    actions
  }: { eyebrow: string; heading: string; lede?: string; actions?: Snippet } = $props()
</script>

<header class="section-header">
  <Eyebrow text={eyebrow} />
  <div class="heading-row" class:with-actions={actions}>
    <HeadingLink text={heading} />
    {@render actions?.()}
  </div>
  {#if lede}
    <p class="lede">{lede}</p>
  {/if}
</header>

<style>
  .section-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .heading-row > :global(h2) {
    max-width: 26ch;
  }

  .with-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .lede {
    max-width: 50ch;
    font-size: var(--font-size-md);
    line-height: var(--line-height-snug);
    color: var(--ink-muted);
    text-wrap: pretty;
  }
</style>
