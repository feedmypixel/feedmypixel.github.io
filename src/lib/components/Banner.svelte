<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    variant,
    title,
    element = $bindable(),
    children
  }: {
    variant: 'positive' | 'critical'
    title: string
    element?: HTMLElement
    children?: Snippet
  } = $props()
</script>

<div
  bind:this={element}
  class="banner {variant}"
  role={variant === 'critical' ? 'alert' : 'status'}
  tabindex="-1"
>
  <p class="title">{title}</p>
  {#if children}
    <div class="body">{@render children()}</div>
  {/if}
</div>

<style>
  .banner {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-5);
    border: 1px solid;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
  }

  .positive {
    background: var(--mood-positive-tint);
    border-color: var(--mood-positive);
  }

  .critical {
    background: var(--mood-critical-tint);
    border-color: var(--mood-critical);
  }

  .title {
    font-weight: var(--font-weight-semibold);
    color: var(--ink-strong);
  }

  .body {
    color: var(--ink);
  }
</style>
