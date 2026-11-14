<script lang="ts">
  import { asset } from '$app/paths'
  import NewTabHint from './NewTabHint.svelte'

  const badges = {
    chrome: {
      src: asset('badges/chrome-web-store.png'),
      alt: 'Available in the Chrome Web Store',
      width: 496,
      height: 150
    },
    firefox: {
      src: asset('badges/firefox-add-ons.svg'),
      alt: 'Get the add-on for Firefox',
      width: 172,
      height: 60
    }
  }

  let {
    store,
    href,
    size = 'default'
  }: { store: keyof typeof badges; href: string; size?: 'default' | 'large' } = $props()

  const badge = $derived(badges[store])
</script>

<a class="badge" class:large={size === 'large'} {href} target="_blank" rel="noopener noreferrer">
  <img src={badge.src} alt={badge.alt} width={badge.width} height={badge.height} />
  <NewTabHint />
</a>

<style>
  .badge {
    display: inline-flex;
    flex: none;
    border-radius: var(--radius-md);
  }

  img {
    width: auto;
    height: 52px;
    transition: filter var(--transition) var(--ease-standard);
  }

  .large img {
    height: 56px;
  }

  .badge:hover img {
    filter: drop-shadow(var(--shadow-md));
  }
</style>
