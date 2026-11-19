<script lang="ts">
  import '#lib/styles/app.css'
  import '@fontsource-variable/plus-jakarta-sans/wght.css'
  import '@fontsource/dm-mono/400.css'
  import '@fontsource/dm-mono/500.css'
  import { asset } from '$app/paths'
  import { afterNavigate, onNavigate } from '$app/navigation'
  import Header from '#lib/components/Header.svelte'
  import Footer from '#lib/components/Footer.svelte'
  import Toaster from '#lib/components/Toaster.svelte'
  import BackToTop from '#lib/components/BackToTop.svelte'
  import ConsentBanner from '#lib/components/ConsentBanner.svelte'
  import { consent } from '#lib/consent.svelte.js'
  import { disableAnalytics, enableAnalytics } from '#lib/analytics.js'

  let { children } = $props()

  // The smooth scroll is for in-page links. A new page lands at its top instantly.
  onNavigate(() => {
    document.documentElement.style.scrollBehavior = 'auto'
  })
  afterNavigate(() => {
    document.documentElement.style.removeProperty('scroll-behavior')
  })

  $effect(() => {
    if (consent.choice === 'granted') {
      enableAnalytics()
    } else {
      disableAnalytics()
    }
  })
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={asset('favicon.png')} />
  <link rel="apple-touch-icon" href={asset('apple-touch-icon.png')} />
  <meta name="build-sha" content={__BUILD_SHA__} />
</svelte:head>

<a class="skip-link" href="#main">Skip to content</a>

<div id="top" class="page">
  <Header />
  <main id="main" tabindex="-1">
    <ConsentBanner />
    {@render children()}
  </main>
  <Footer />
</div>

<BackToTop />
<Toaster />

<style>
  .page {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }

  main {
    flex: 1 0 auto;
  }

  main:focus-visible {
    outline: none;
  }

  .skip-link {
    position: absolute;
    top: -3.5rem;
    left: var(--space-4);
    z-index: var(--z-toast);
    padding: var(--space-2) var(--space-4);
    background: var(--button-bg);
    color: var(--button-ink);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    text-decoration: none;
    transition: top var(--transition) var(--ease-standard);
  }

  .skip-link:focus {
    top: var(--space-4);
  }
</style>
