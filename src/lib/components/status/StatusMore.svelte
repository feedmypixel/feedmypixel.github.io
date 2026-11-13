<script lang="ts">
  import { resolve } from '$app/paths'
  import Button from '../Button.svelte'
  import Chevron from '../Chevron.svelte'

  const home = resolve('/')
</script>

<section id="more" class="more">
  <div class="container inner">
    <div class="copy">
      <p class="eyebrow">More from feedMyPixel</p>
      <h2>status is the second product. Pipes came first.</h2>
      <p class="lede">
        Twenty years of contract work for the Guardian, the BBC and UK government, a searchable CV
        and a way to get in touch are all on the home page.
      </p>
    </div>

    <div class="actions">
      <Button variant="solid" href={home}>
        <Chevron direction="left" />
        Home
      </Button>
      <Button variant="ghost" href="{home}#products">Pipes</Button>
      <Button variant="ghost" href="{home}#experience">Experience</Button>
      <Button variant="ghost" href="{home}#contact">Contact</Button>
    </div>
  </div>
</section>

<style>
  .more {
    background: var(--surface-sunken);
    border-bottom: 1px solid var(--border-subtle);
  }

  .inner {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-8);
    align-items: flex-end;
    justify-content: space-between;
    padding-block: var(--band);
  }

  .eyebrow {
    margin-bottom: var(--space-4);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    letter-spacing: var(--tracking-wide);
    color: var(--brand-text);
  }

  h2 {
    max-width: 24ch;
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
    text-wrap: balance;
  }

  .lede {
    max-width: 50ch;
    margin-top: var(--space-4);
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--ink-muted);
    text-wrap: pretty;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }
</style>
