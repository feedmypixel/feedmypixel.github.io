<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    variant = 'solid',
    href,
    download = false,
    type = 'button',
    disabled = false,
    onclick,
    children,
    ...rest
  }: {
    variant?: 'solid' | 'ghost'
    href?: string
    download?: boolean
    type?: 'button' | 'submit'
    disabled?: boolean
    onclick?: (event: MouseEvent) => void
    children: Snippet
  } = $props()
</script>

{#if href}
  <a class="button {variant}" {href} download={download || undefined} {onclick} {...rest}>
    {@render children()}
  </a>
{:else}
  <button class="button {variant}" {type} {disabled} {onclick} {...rest}>
    {@render children()}
  </button>
{/if}

<style>
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    min-height: 44px;
    padding-inline: var(--space-5);
    border-radius: var(--radius-md);
    font-family: var(--font-text);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    text-decoration: none;
    cursor: pointer;
    transition:
      background-color var(--transition) var(--ease-standard),
      border-color var(--transition) var(--ease-standard),
      color var(--transition) var(--ease-standard);
  }

  .button:hover {
    text-decoration: none;
  }

  .solid {
    background: var(--button-bg);
    color: var(--button-ink);
    border: 1px solid transparent;
  }

  .solid:hover {
    background: var(--button-bg-hover);
    color: var(--button-ink);
  }

  .ghost {
    background: var(--surface-raised);
    color: var(--ink-strong);
    border: 1px solid var(--border-default);
  }

  .ghost:hover {
    border-color: var(--brand);
    color: var(--brand-text);
  }

  .button:disabled {
    opacity: 0.7;
    cursor: progress;
  }
</style>
