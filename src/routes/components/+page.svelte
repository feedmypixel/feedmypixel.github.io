<script lang="ts">
  import Logo from '$lib/components/Logo.svelte'
  import ThemeToggle from '$lib/components/ThemeToggle.svelte'
  import Toast from '$lib/components/Toast.svelte'
  import { toasts } from '$lib/toasts.svelte'
</script>

<svelte:head>
  <title>Components — feedMyPixel</title>
  <meta
    name="description"
    content="The component catalogue behind feedmypixel.com — every brick in its states, light and dark."
  />
</svelte:head>

<div class="container catalogue">
  <header class="intro">
    <p class="eyebrow">Reference</p>
    <h1>Component catalogue</h1>
    <p class="lede">Every brick this site is built from, in each of its states.</p>
  </header>

  <section aria-labelledby="logo-h">
    <h2 id="logo-h">Logo</h2>
    <div class="row">
      <Logo size={22} />
      <Logo size={26} />
      <Logo size={48} />
    </div>
  </section>

  <section aria-labelledby="theme-h">
    <h2 id="theme-h">Theme toggle</h2>
    <div class="row">
      <ThemeToggle />
    </div>
  </section>

  <section aria-labelledby="toast-h">
    <h2 id="toast-h">Toast</h2>
    <div class="specimens">
      <Toast kind="info" message="Light theme on" onDismiss={() => {}} />
      <Toast kind="positive" message="Email address copied" onDismiss={() => {}} />
      <Toast
        kind="critical"
        message="Could not copy, select the address instead"
        onDismiss={() => {}}
      />
    </div>
    <div class="row">
      <button type="button" class="demo" onclick={() => toasts.push('info', 'Info toast')}
        >Fire info</button
      >
      <button type="button" class="demo" onclick={() => toasts.push('positive', 'Positive toast')}
        >Fire positive</button
      >
      <button type="button" class="demo" onclick={() => toasts.push('critical', 'Critical toast')}
        >Fire critical</button
      >
    </div>
  </section>
</div>

<style>
  .catalogue {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    padding-block: var(--band);
  }

  .intro {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .eyebrow {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    letter-spacing: var(--tracking-wide);
    color: var(--brand-text);
  }

  h1 {
    font-family: var(--font-display);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
  }

  .lede {
    color: var(--ink-muted);
  }

  section {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    padding-top: var(--space-8);
    border-top: 1px solid var(--border-subtle);
  }

  h2 {
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--ink-strong);
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4);
  }

  .specimens {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    align-items: flex-start;
  }

  .demo {
    padding: var(--space-2) var(--space-4);
    background: var(--surface-raised);
    color: var(--ink-strong);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-md);
    font-family: var(--font-text);
    font-size: var(--font-size-sm);
    cursor: pointer;
  }

  .demo:hover {
    border-color: var(--brand);
    color: var(--brand-text);
  }
</style>
