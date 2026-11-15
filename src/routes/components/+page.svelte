<script lang="ts">
  import { resolve } from '$app/paths'
  import Seo from '#lib/components/Seo.svelte'
  import Logo from '#lib/components/Logo.svelte'
  import ThemeToggle from '#lib/components/ThemeToggle.svelte'
  import Toast from '#lib/components/Toast.svelte'
  import Button from '#lib/components/Button.svelte'
  import EmailPill from '#lib/components/EmailPill.svelte'
  import Carousel from '#lib/components/Carousel.svelte'
  import ComposedSlide from '#lib/components/ComposedSlide.svelte'
  import Chevron from '#lib/components/Chevron.svelte'
  import PixelMark from '#lib/components/PixelMark.svelte'
  import ProductStory from '#lib/components/ProductStory.svelte'
  import { slides as statusSlides, story as statusStory } from '#lib/data/status.js'
  import { slides as pipesSlides } from '#lib/data/pipes.js'
  import { slideNumber } from '#lib/carousel.js'
  import Chip from '#lib/components/Chip.svelte'
  import SegmentedControl from '#lib/components/SegmentedControl.svelte'
  import RoleRun from '#lib/components/RoleRun.svelte'
  import { buildRuns } from '#lib/role-runs.js'
  import EmptyState from '#lib/components/EmptyState.svelte'
  import BackToTop from '#lib/components/BackToTop.svelte'
  import Eyebrow from '#lib/components/Eyebrow.svelte'
  import HeadingLink from '#lib/components/HeadingLink.svelte'
  import SectionHeader from '#lib/components/SectionHeader.svelte'
  import Services from '#lib/components/Services.svelte'
  import { roles } from '#lib/data/experience.js'
  import { TYPE_FILTERS, type TypeFilter } from '#lib/cv-filter.js'
  import { toasts } from '#lib/toasts.svelte.js'

  let segment = $state<TypeFilter>('All')

  const [pipesSlide] = pipesSlides
</script>

<Seo
  title="Components - feedMyPixel"
  description="The component catalogue behind feedmypixel.com - every brick in its states, light and dark"
  path="/components"
/>

<div class="container catalogue">
  <header class="intro">
    <Eyebrow text="Reference" />
    <h1>Component catalogue</h1>
    <p class="lede">Every brick this site is built from, in each of its states</p>
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
      <Carousel items={statusSlides.slice(0, 3)} label="Example screenshots">
        {#snippet slide(item, index)}
          <ComposedSlide
            number={slideNumber(index)}
            caption={item.label}
            sub={item.sub}
            shots={item.shots}
            layout="phones"
          />
        {/snippet}
      </Carousel>
    </div>
  </section>

  <section aria-labelledby="composed-h">
    <h2 id="composed-h">Composed slide</h2>
    <p class="note">
      Caption beside a screenshot that follows the site theme. Phones for status, a wide window for
      Pipes. Stacks below 760px.
    </p>
    <div class="carousel-demo">
      <ComposedSlide
        number="01"
        caption={pipesSlide.label}
        sub={pipesSlide.sub}
        shots={[pipesSlide.shot]}
        layout="wide"
      />
    </div>
  </section>

  <section aria-labelledby="pixel-h">
    <h2 id="pixel-h">Pixel mark and chevron</h2>
    <div class="row">
      <PixelMark />
      <PixelMark size="large" />
      <Chevron direction="left" />
      <Chevron direction="right" />
      <Button variant="ghost" href={resolve('/status')}>
        How I built it
        <Chevron direction="right" />
      </Button>
      <Button variant="solid" size="large" href="https://status.me">Large button</Button>
    </div>
  </section>

  <section aria-labelledby="story-h">
    <h2 id="story-h">Product story</h2>
    <ProductStory
      problem={statusStory.problem}
      solution={statusStory.solution}
      product={statusStory.productSummary}
    />
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
      <RoleRun
        run={buildRuns([roles[0]], new Date())[0]}
        chips={[{ label: 'SvelteKit', kind: 'skill' }]}
        query=""
      />
    </ol>
  </section>

  <section aria-labelledby="empty-h">
    <h2 id="empty-h">Empty state</h2>
    <EmptyState
      title="Nothing matches those filters"
      message="Try a broader term or start again"
      actionLabel="Clear all filters"
      onAction={() => {}}
    />
  </section>

  <section aria-labelledby="services-h">
    <h2 id="services-h">Services and FAQ</h2>
    <p class="note">
      The full section as it appears on the home page. Answers stay in the DOM while collapsed so
      crawlers and answer engines can read them.
    </p>
    <Services />
  </section>

  <section aria-labelledby="section-header-h">
    <h2 id="section-header-h">Section header</h2>
    <SectionHeader eyebrow="Eyebrow" heading="A section heading with a copy-link icon" />
  </section>

  <section aria-labelledby="heading-link-h">
    <h2 id="heading-link-h">Heading link sizes</h2>
    <p class="note">Hover a heading to show its link; click it to copy the address</p>
    <HeadingLink level={3} size="2xl" id="catalogue-2xl" text="Product name, 2xl" />
    <HeadingLink level={3} size="xl" id="catalogue-xl" text="Story section, xl" />
    <HeadingLink level={3} size="lg" id="catalogue-lg" text="Policy section, lg" />
  </section>

  <section aria-labelledby="totop-h">
    <h2 id="totop-h">Back to top</h2>
    <p class="note">Appears fixed, bottom right, once the page is scrolled past 600px</p>
    <BackToTop />
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

  .note {
    font-size: var(--font-size-sm);
    color: var(--ink-muted);
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
    border-color: var(--indicator);
    color: var(--brand-text);
  }
</style>
