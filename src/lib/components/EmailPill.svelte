<script lang="ts">
  import { toasts } from '$lib/toasts.svelte'

  let { address = 'hello@feedmypixel.com' }: { address?: string } = $props()

  async function copy() {
    if (!navigator.clipboard?.writeText) {
      toasts.push('critical', 'Could not copy, select the address instead')
      return
    }
    try {
      await navigator.clipboard.writeText(address)
      toasts.push('positive', 'Email address copied')
    } catch {
      toasts.push('critical', 'Could not copy, select the address instead')
    }
  }
</script>

<div class="pill">
  <a class="address" href="mailto:{address}">{address}</a>
  <button
    class="copy"
    type="button"
    aria-label="Copy email address"
    title="Copy email address"
    onclick={copy}
  >
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
      <path d="M10.5 3.5a1.5 1.5 0 0 0-1.5-1H4a1.5 1.5 0 0 0-1.5 1.5v5a1.5 1.5 0 0 0 1 1.4" />
    </svg>
  </button>
</div>

<style>
  .pill {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: 48px;
    padding: var(--space-1) var(--space-1) var(--space-1) var(--space-4);
    background: var(--surface-raised);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-md);
  }

  .address {
    font-family: var(--font-mono);
    font-size: var(--font-size-sm);
    color: var(--ink-strong);
    text-decoration: none;
  }

  .address:hover {
    color: var(--brand-text);
    text-decoration: underline;
  }

  .copy {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: var(--radius-md);
    color: var(--ink-muted);
    cursor: pointer;
  }

  .copy:hover {
    background: color-mix(in srgb, var(--ink) 9%, transparent);
    color: var(--brand-hover);
  }
</style>
