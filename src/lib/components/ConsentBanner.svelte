<script lang="ts">
  import { consent } from '#lib/consent.svelte.js'
  import { toasts } from '#lib/toasts.svelte.js'
  import Button from './Button.svelte'
  import ExternalLink from './ExternalLink.svelte'

  const FADE_MS = 320

  let bannerEl: HTMLElement | undefined = $state()
  let closing = $state(false)
  let focused = false
  let focusedBeforeBanner: Element | null = null

  $effect(() => {
    consent.init()
  })

  $effect(() => {
    document.documentElement.toggleAttribute('data-consent-pending', consent.choice === 'unknown')
  })

  $effect(() => {
    if (consent.choice === 'unknown' && bannerEl && !focused) {
      focusedBeforeBanner = document.activeElement
      bannerEl.focus()
      focused = true
    }
    if (consent.choice !== 'unknown') {
      focused = false
    }
  })

  $effect(() => {
    const banner = bannerEl
    if (!banner) {
      return
    }
    // On a phone the strip covers the foot of the page; its height varies as the copy wraps.
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--consent-height', `${banner.offsetHeight}px`)
    })
    observer.observe(banner)
    return () => {
      observer.disconnect()
      document.documentElement.style.removeProperty('--consent-height')
    }
  })

  function moveFocusOutOfBanner() {
    if (!bannerEl?.contains(document.activeElement)) {
      return
    }
    const nextFocus =
      focusedBeforeBanner instanceof HTMLElement && focusedBeforeBanner !== document.body
        ? focusedBeforeBanner
        : document.querySelector('main')
    nextFocus?.focus({ preventScroll: true })
  }

  function decide(accepted: boolean) {
    closing = true
    toasts.push(
      accepted ? 'positive' : 'info',
      accepted ? 'Analytics on, thank you' : 'Analytics stays off'
    )
    setTimeout(() => {
      closing = false
      moveFocusOutOfBanner()
      if (accepted) {
        consent.grant()
      } else {
        consent.deny()
      }
    }, FADE_MS)
  }
</script>

{#if consent.choice === 'unknown'}
  <div
    bind:this={bannerEl}
    class="banner"
    class:closing
    role="dialog"
    aria-label="Cookie consent"
    aria-describedby="consent-copy"
    tabindex="-1"
  >
    <p id="consent-copy" class="copy">
      I use Google Analytics to see which parts of this site are read. Nothing loads until you say
      yes. If you do, Google sets cookies and records how you use the site.
      <ExternalLink href="https://policies.google.com/privacy"
        >How Google uses your data</ExternalLink
      >
    </p>
    <div class="actions">
      <Button variant="ghost" onclick={() => decide(false)}>Decline</Button>
      <Button variant="solid" onclick={() => decide(true)}>Accept analytics</Button>
    </div>
  </div>
{/if}

<style>
  .banner {
    display: none;
    position: fixed;
    inset: auto 0 0;
    z-index: var(--z-consent);
    flex-direction: column;
    gap: var(--space-4);
    padding: var(--space-4) var(--gutter);
    background: var(--surface-raised);
    border-top: 1px solid var(--border-default);
    box-shadow: var(--shadow-lg);
    opacity: 1;
    transition: opacity var(--transition-slow) var(--ease-emphasized);
  }

  :global(html[data-consent-pending]) .banner {
    display: flex;
  }

  :global(html[data-consent-pending]) :global(body) {
    padding-bottom: var(--consent-height, 0);
  }

  .banner:focus {
    outline: none;
  }

  .closing {
    opacity: 0;
  }

  .copy {
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
    color: var(--ink);
    text-wrap: pretty;
  }

  .actions {
    --button-ghost-bg: var(--surface-page);

    display: flex;
    gap: var(--space-3);
  }

  .actions > :global(*) {
    flex: 1 1 0;
  }

  @media (min-width: 47.5rem) {
    .banner {
      inset: auto auto var(--space-5) var(--space-5);
      width: 21rem;
      padding: var(--space-5);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-lg);
    }

    :global(html[data-consent-pending]) :global(body) {
      padding-bottom: 0;
    }

    .actions > :global(*) {
      flex: 0 1 auto;
    }
  }
</style>
