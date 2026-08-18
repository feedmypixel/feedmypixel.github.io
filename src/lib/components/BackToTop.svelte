<script lang="ts">
  const REVEAL_AFTER = 600

  let scrolled = $state(0)

  $effect(() => {
    const update = () => {
      scrolled = window.scrollY
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  })

  const visible = $derived(scrolled > REVEAL_AFTER)

  function scrollToTop() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }
</script>

{#if visible}
  <button class="back-to-top" type="button" aria-label="Back to top" onclick={scrollToTop}>
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M8 13V3m0 0L3.5 7.5M8 3l4.5 4.5" />
    </svg>
  </button>
{/if}

<style>
  .back-to-top {
    position: fixed;
    right: var(--gutter);
    bottom: var(--space-5);
    z-index: var(--z-header);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    background: var(--surface-raised);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    color: var(--ink-strong);
    cursor: pointer;
    animation: rise var(--transition-slow) var(--ease-emphasized);
  }

  .back-to-top:hover {
    border-color: var(--brand);
    color: var(--brand-text);
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(0.5rem) scale(0.9);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .back-to-top {
      animation: none;
    }
  }
</style>
