<script lang="ts">
  import { toasts } from '$lib/toasts.svelte'

  function toggle() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('fmp-theme', next)
    } catch {
      void 0
    }
    toasts.push('info', next === 'dark' ? 'Dark theme on' : 'Light theme on')
  }
</script>

<button
  class="theme-toggle"
  type="button"
  aria-label="Switch colour theme"
  title="Switch colour theme"
  onclick={toggle}
>
  <span class="sun" aria-hidden="true">
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path
        d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"
      />
    </svg>
  </span>
  <span class="moon" aria-hidden="true">
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a7 7 0 0 0 11.1 11.1z" />
    </svg>
  </span>
</button>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    background: transparent;
    border: 1px solid var(--border-default);
    border-radius: var(--radius-md);
    color: var(--ink-muted);
    cursor: pointer;
    transition:
      color var(--transition) var(--ease-standard),
      border-color var(--transition) var(--ease-standard);
  }

  .theme-toggle:hover {
    color: var(--ink-strong);
    border-color: var(--border-strong);
  }

  .sun {
    display: inline-flex;
  }

  .moon {
    display: none;
  }

  :global(html[data-theme='dark']) .sun {
    display: none;
  }

  :global(html[data-theme='dark']) .moon {
    display: inline-flex;
  }
</style>
