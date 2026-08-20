<script lang="ts">
  import Logo from './Logo.svelte'
  import ThemeToggle from './ThemeToggle.svelte'
  import MobileNav from './MobileNav.svelte'
  import { resolve } from '$app/paths'
  import { mostVisibleId, indicatorGeometry } from '$lib/nav-indicator'

  const home = resolve('/')

  const sections = [
    { id: 'products', label: 'Products' },
    { id: 'experience', label: 'Experience' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ]

  let active = $state<string | null>(null)
  let drawerOpen = $state(false)
  let indicator = $state({ left: 0, width: 0, ready: false })

  let navEl: HTMLElement | undefined
  let hamEl: HTMLButtonElement | undefined

  $effect(() => {
    const els = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) {
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const id = mostVisibleId(entries)
        if (id) {
          active = id
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  })

  function measure(current: string | null) {
    const link = current && navEl ? navEl.querySelector<HTMLElement>('a.active') : null
    if (!link || !navEl) {
      indicator = { left: 0, width: 0, ready: false }
      return
    }
    const geometry = indicatorGeometry(link.getBoundingClientRect(), navEl.getBoundingClientRect())
    indicator = { ...geometry, ready: true }
  }

  $effect(() => {
    measure(active)
  })

  let drawerWasOpen = false
  $effect(() => {
    if (drawerWasOpen && !drawerOpen) {
      hamEl?.focus()
    }
    drawerWasOpen = drawerOpen
  })
</script>

<svelte:window onresize={() => measure(active)} />

<header class="header" class:drawer-open={drawerOpen}>
  <div class="inner">
    <a href="{home}#top" class="brand" aria-label="feedMyPixel, back to top">
      <Logo size={26} />
      <span class="wordmark">feedMyPixel</span>
    </a>

    <div class="actions">
      <nav bind:this={navEl} class="nav" aria-label="Sections">
        {#each sections as section (section.id)}
          <a
            href="{home}#{section.id}"
            class:active={active === section.id}
            aria-current={active === section.id ? 'true' : undefined}
          >
            {section.label}
          </a>
        {/each}
        <span
          class="indicator"
          class:ready={indicator.ready}
          aria-hidden="true"
          style:left="{indicator.left}px"
          style:width="{indicator.width}px"
        ></span>
      </nav>

      <ThemeToggle />

      <button
        bind:this={hamEl}
        class="ham"
        class:open={drawerOpen}
        type="button"
        aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
        aria-controls="mobile-nav"
        aria-expanded={drawerOpen}
        onclick={() => (drawerOpen = !drawerOpen)}
      >
        <span class="bars" aria-hidden="true">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </span>
      </button>
    </div>
  </div>
</header>

<MobileNav open={drawerOpen} onclose={() => (drawerOpen = false)} />

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: var(--z-header);
    background: color-mix(in srgb, var(--surface-page) 88%, transparent);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border-subtle);
  }

  .header.drawer-open {
    z-index: calc(var(--z-overlay) + 1);
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    max-width: var(--container-max);
    min-height: var(--header-height);
    margin-inline: auto;
    padding-inline: var(--gutter);
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    text-decoration: none;
  }

  .brand:hover {
    text-decoration: none;
  }

  .wordmark {
    font-family: var(--font-display);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
  }

  .actions {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .nav {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }

  .nav a {
    display: inline-block;
    margin: 0 var(--space-2);
    padding: var(--space-2) var(--space-1) calc(var(--space-2) - 4px);
    border-bottom: 4px solid transparent;
    color: var(--ink-muted);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    text-decoration: none;
    transition: color var(--transition) var(--ease-standard);
  }

  .nav a:hover {
    color: var(--ink-strong);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .nav a.active {
    color: var(--ink-strong);
  }

  .indicator {
    position: absolute;
    bottom: 0;
    height: 4px;
    background: var(--indicator);
    border-radius: 1px;
    opacity: 0;
    transition:
      left var(--transition-slow) var(--ease-emphasized),
      width var(--transition-slow) var(--ease-emphasized),
      opacity var(--transition) var(--ease-standard);
  }

  .indicator.ready {
    opacity: 1;
  }

  .ham {
    display: none;
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
  }

  .ham:hover {
    color: var(--ink-strong);
    border-color: var(--border-strong);
  }

  .bars {
    position: relative;
    width: 16px;
    height: 14px;
  }

  .bar {
    position: absolute;
    left: 0;
    height: 2px;
    background: currentColor;
    border-radius: 1px;
    transition:
      top var(--transition) var(--ease-standard),
      width var(--transition) var(--ease-standard),
      opacity var(--transition-fast) var(--ease-standard),
      transform var(--transition) var(--ease-standard);
  }

  .bar:nth-child(1) {
    top: 0;
    width: 16px;
  }

  .bar:nth-child(2) {
    top: 6px;
    width: 16px;
  }

  .bar:nth-child(3) {
    top: 12px;
    width: 10px;
  }

  .ham.open .bar:nth-child(1) {
    top: 6px;
    width: 16px;
    transform: rotate(45deg);
  }

  .ham.open .bar:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }

  .ham.open .bar:nth-child(3) {
    top: 6px;
    width: 16px;
    transform: rotate(-45deg);
  }

  @media (max-width: 47.5rem) {
    .nav {
      display: none;
    }

    .ham {
      display: inline-flex;
    }
  }
</style>
