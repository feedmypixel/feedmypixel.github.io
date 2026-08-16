<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import { MediaQuery } from 'svelte/reactivity'

  let { open, onclose }: { open: boolean; onclose: () => void } = $props()

  const reducedMotion = new MediaQuery('prefers-reduced-motion: reduce')
  const slideDuration = $derived(reducedMotion.current ? 0 : 220)
  const fadeDuration = $derived(reducedMotion.current ? 0 : 160)

  const links = [
    { id: 'products', label: 'Products' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ]

  let panelEl: HTMLElement | undefined = $state()

  $effect(() => {
    if (!open) {
      return
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelEl?.querySelector<HTMLElement>('a[href]')?.focus()

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onclose()
        return
      }
      if (event.key !== 'Tab' || !panelEl) {
        return
      }
      const focusables = panelEl.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (focusables.length === 0) {
        return
      }
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeydown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeydown)
    }
  })
</script>

{#if open}
  <button
    class="scrim"
    type="button"
    aria-label="Close menu"
    tabindex="-1"
    onclick={onclose}
    transition:fade={{ duration: fadeDuration }}
  ></button>
  <div
    bind:this={panelEl}
    class="drawer"
    role="dialog"
    aria-modal="true"
    aria-label="Menu"
    id="mobile-nav"
    transition:fly={{ x: 288, duration: slideDuration }}
  >
    <nav aria-label="Sections">
      {#each links as link (link.id)}
        <a href="#{link.id}" onclick={onclose}>{link.label}</a>
      {/each}
    </nav>
  </div>
{/if}

<style>
  .scrim {
    position: fixed;
    inset: 0;
    z-index: var(--z-overlay);
    padding: 0;
    background: var(--scrim);
    border: 0;
    cursor: default;
  }

  .drawer {
    position: fixed;
    top: var(--header-height);
    right: 0;
    bottom: 0;
    z-index: var(--z-overlay);
    width: 270px;
    max-width: 85vw;
    padding: var(--space-6) var(--gutter);
    background: var(--surface-overlay);
    border-left: 1px solid var(--border-default);
    overflow-y: auto;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  nav a {
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    color: var(--ink-strong);
    font-family: var(--font-display);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    text-decoration: none;
  }

  nav a:hover {
    background: var(--surface-sunken);
    text-decoration: none;
  }
</style>
