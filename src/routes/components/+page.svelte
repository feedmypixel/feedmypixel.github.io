<script lang="ts">
  import { asset } from '$app/paths'
  import Seo from '$lib/components/Seo.svelte'
  import Logo from '$lib/components/Logo.svelte'
  import ThemeToggle from '$lib/components/ThemeToggle.svelte'
  import Toast from '$lib/components/Toast.svelte'
  import Button from '$lib/components/Button.svelte'
  import EmailPill from '$lib/components/EmailPill.svelte'
  import Carousel from '$lib/components/Carousel.svelte'
  import type { Slide } from '$lib/components/Carousel.svelte'
  import Chip from '$lib/components/Chip.svelte'
  import SegmentedControl from '$lib/components/SegmentedControl.svelte'
  import RoleCard from '$lib/components/RoleCard.svelte'
  import EmptyState from '$lib/components/EmptyState.svelte'
  import { roles } from '$lib/data/experience'
  import { TYPE_FILTERS, type TypeFilter } from '$lib/cv-filter'
  import { toasts } from '$lib/toasts.svelte'

  let segment = $state<TypeFilter>('All')

  const slides: Slide[] = [
    {
      src: asset('/pipes/framed-popup.png'),
      alt: 'Pipes: status from your toolbar',
      label: 'Status from your toolbar'
    },
    {
      src: asset('/pipes/framed-sidepanel.png'),
      alt: 'Pipes: every repo in a side panel',
      label: 'Every repo in a side panel'
    }
  ]
</script>

<Seo
  title="Components — feedMyPixel"
  description="The component catalogue behind feedmypixel.com — every brick in its states, light and dark."
  path="/components"
/>

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

  <section aria-labelledby="button-h">
    <h2 id="button-h">Button</h2>
    <div class="row">
      <Button variant="solid">Send message</Button>
      <Button variant="ghost">Clear all filters</Button>
      <Button variant="solid" href="https://example.com">Solid link</Button>
      <Button variant="ghost" href="https://example.com">Ghost link</Button>
    </div>
  </section>

  <section aria-labelledby="email-h">
    <h2 id="email-h">Email pill</h2>
    <div class="row">
      <EmailPill />
    </div>
  </section>

  <section aria-labelledby="carousel-h">
    <h2 id="carousel-h">Carousel</h2>
    <div class="carousel-demo">
      <Carousel {slides} label="Example screenshots" />
    </div>
  </section>

  <section aria-labelledby="chip-h">
    <h2 id="chip-h">Chip</h2>
    <div class="row">
      <Chip label="SvelteKit" onRemove={() => {}} />
      <Chip label="Government" onRemove={() => {}} />
    </div>
  </section>

  <section aria-labelledby="segment-h">
    <h2 id="segment-h">Segmented control</h2>
    <div class="row">
      <SegmentedControl
        options={TYPE_FILTERS}
        value={segment}
        label="Role type"
        onSelect={(next) => (segment = next)}
      />
    </div>
  </section>

  <section aria-labelledby="role-h">
    <h2 id="role-h">Role card</h2>
    <ol class="rolecards">
      <RoleCard role={roles[0]} chips={[{ label: 'SvelteKit', kind: 'skill' }]} query="" />
    </ol>
  </section>

  <section aria-labelledby="empty-h">
    <h2 id="empty-h">Empty state</h2>
    <EmptyState
      title="Nothing matches those filters"
      message="Try a broader term, or start again"
      actionLabel="Clear all filters"
      onAction={() => {}}
    />
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

  .carousel-demo {
    max-width: 34rem;
  }

  .rolecards {
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--border-subtle);
    list-style: none;
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
