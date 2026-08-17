<script lang="ts">
  import { consent } from '$lib/consent.svelte'
  import Button from './Button.svelte'

  let bannerEl: HTMLElement | undefined = $state()

  $effect(() => {
    consent.init()
  })

  $effect(() => {
    if (consent.choice === 'unknown') {
      bannerEl?.focus()
    }
  })
</script>

{#if consent.choice === 'unknown'}
  <div
    bind:this={bannerEl}
    class="banner"
    role="dialog"
    aria-modal="false"
    aria-label="Analytics cookies"
    tabindex="-1"
  >
    <p class="copy">
      I use Google Analytics to see which parts of this site are read. Nothing loads until you say
      yes, and no personal data is collected either way.
    </p>
    <div class="actions">
      <Button variant="solid" onclick={() => consent.grant()}>Accept analytics</Button>
      <Button variant="ghost" onclick={() => consent.deny()}>Decline</Button>
    </div>
  </div>
{/if}

<style>
  .banner {
    position: fixed;
    right: var(--space-5);
    bottom: var(--space-5);
    left: var(--space-5);
    z-index: var(--z-toast);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    max-width: 34rem;
    margin-inline: auto;
    padding: var(--space-5);
    background: var(--surface-overlay);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
  }

  .copy {
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
    color: var(--ink);
    text-wrap: pretty;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  @media (min-width: 47.5rem) {
    .banner {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      max-width: 52rem;
    }

    .actions {
      flex: none;
    }
  }
</style>
