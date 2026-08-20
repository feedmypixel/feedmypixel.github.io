<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    variant = 'solid',
    href,
    download,
    external = false,
    type = 'button',
    disabled = false,
    onclick,
    children,
    ...rest
  }: {
    variant?: 'solid' | 'ghost'
    href?: string
    download?: string
    external?: boolean
    type?: 'button' | 'submit'
    disabled?: boolean
    onclick?: (event: MouseEvent) => void
    'aria-label'?: string
    children: Snippet
  } = $props()
</script>

{#if href}
  <a
    class="button {variant}"
    {href}
    {download}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    {onclick}
    {...rest}
  >
    {@render children()}
    {#if external}
      <span class="visually-hidden">(opens in a new tab)</span>
    {/if}
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
    padding-inline: var(--button-padding-inline, var(--space-5));
    border-radius: var(--radius-md);
    font-family: var(--font-text);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    white-space: nowrap;
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
    background: var(--button-ghost-bg, var(--surface-raised));
    color: var(--ink-strong);
    border: 1px solid var(--border-default);
  }

  .ghost:hover {
    border-color: var(--indicator);
    color: var(--brand-text);
  }

  .button:disabled {
    opacity: 0.7;
    cursor: progress;
  }
</style>
