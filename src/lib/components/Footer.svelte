<script lang="ts">
  import { resolve } from '$app/paths'
  import Logo from './Logo.svelte'
  import { consent } from '$lib/consent.svelte'

  const home = resolve('/')
</script>

<footer class="footer">
  <div class="inner">
    <div class="brand">
      <Logo size={22} />
      <span class="line">feedMyPixel Ltd · Ben Chidgey</span>
    </div>
    <nav class="nav" aria-label="Footer">
      <a href="{home}#products">Products</a>
      <a href="{home}#experience">Experience</a>
      <a href="{home}#contact">Contact</a>
      <a href={resolve('/components')}>Components</a>
      <a href="https://www.gov.uk/digital-marketplace">Digital Marketplace</a>
      <a href="https://github.com/feedmypixel">GitHub</a>
      <button type="button" onclick={() => consent.ask()}>Cookie settings</button>
    </nav>
  </div>
</footer>

<style>
  .footer {
    background: var(--surface-page);
  }

  .inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-6);
    max-width: var(--container-max);
    margin-inline: auto;
    padding: var(--space-10) var(--gutter);
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
  }

  .line {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    color: var(--ink-subtle);
  }

  .nav {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-5);
  }

  .nav a,
  .nav button {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    color: var(--ink-muted);
    text-decoration: none;
  }

  .nav button {
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
  }

  .nav button:hover {
    color: var(--link-hover);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
</style>
