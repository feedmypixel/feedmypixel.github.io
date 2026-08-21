<script lang="ts">
  import { consent } from '$lib/consent.svelte'
  import { toasts } from '$lib/toasts.svelte'
  import Button from './Button.svelte'

  const FADE_MS = 320

  let bannerEl: HTMLElement | undefined = $state()
  let closing = $state(false)
  let focused = false

  $effect(() => {
    consent.init()
  })

  $effect(() => {
    if (consent.choice === 'unknown' && bannerEl && !focused) {
      bannerEl.focus()
      focused = true
    }
    if (consent.choice !== 'unknown') {
      focused = false
    }
  })

  function decide(accepted: boolean) {
    closing = true
    toasts.push(
      accepted ? 'positive' : 'info',
      accepted ? 'Analytics on, thank you' : 'Analytics stays off'
    )
    setTimeout(() => {
      closing = false
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
    <div class="inner">
      <p id="consent-copy" class="copy">
        I use Google Analytics to see which parts of this site are read. Nothing loads until you say
        yes and no personal data is collected either way.
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Read more<span class="visually-hidden"> (opens in a new tab)</span>
        </a>
      </p>
      <div class="actions">
        <Button variant="ghost" onclick={() => decide(false)}>Decline</Button>
        <Button variant="solid" onclick={() => decide(true)}>Accept analytics</Button>
      </div>
    </div>
  </div>
{/if}

<style>
  .banner {
    position: sticky;
    top: calc(var(--header-height) + 1px);
    z-index: var(--z-consent);
    background: var(--surface-raised);
    border-bottom: 1px solid var(--border-default);
    box-shadow: var(--shadow-md);
    opacity: 1;
    transition: opacity var(--transition-slow) var(--ease-emphasized);
  }

  .closing {
    opacity: 0;
  }

  .inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    max-width: var(--container-max);
    margin-inline: auto;
    padding: var(--space-4) var(--gutter);
  }

  .copy {
    max-width: 62ch;
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
    color: var(--ink);
    text-wrap: pretty;
  }

  .actions {
    --button-ghost-bg: var(--surface-page);

    display: flex;
    flex: none;
    gap: var(--space-3);
  }
</style>
