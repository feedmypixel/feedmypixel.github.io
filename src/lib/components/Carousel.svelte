<script lang="ts">
  import { browser } from '$app/environment'
  import { clampIndex, nearestSlide, scrollOffsetFor } from '$lib/carousel'

  export type Slide = { src: string; alt: string; label: string }

  let { slides, label }: { slides: Slide[]; label: string } = $props()

  let index = $state(0)
  let stripEl: HTMLElement | undefined = $state()
  const enhanced = browser

  const caption = $derived(slides[clampIndex(index, slides.length)].label)

  function slideWidth(strip: HTMLElement) {
    return strip.clientWidth + 16
  }

  function syncFromScroll() {
    if (!stripEl) {
      return
    }
    const midpoints = [...stripEl.children].map((slide) => {
      const el = slide as HTMLElement
      return el.offsetLeft + el.offsetWidth / 2
    })
    index = nearestSlide(stripEl.scrollLeft + stripEl.clientWidth / 2, midpoints)
  }

  function goTo(next: number) {
    const target = clampIndex(next, slides.length)
    index = target
    if (stripEl) {
      stripEl.scrollTo({ left: scrollOffsetFor(target, slideWidth(stripEl)), behavior: 'smooth' })
    }
  }

  let settleTimer: ReturnType<typeof setTimeout> | undefined

  function onScroll() {
    clearTimeout(settleTimer)
    settleTimer = setTimeout(syncFromScroll, 120)
  }

  $effect(() => {
    const strip = stripEl
    if (!strip) {
      return
    }
    strip.addEventListener('scrollend', syncFromScroll)
    return () => {
      clearTimeout(settleTimer)
      strip.removeEventListener('scrollend', syncFromScroll)
    }
  })
</script>

<figure class="carousel">
  <div class="frame">
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <!-- A scrollable region must be keyboard-reachable (WCAG 2.1.1) -->
    <div
      bind:this={stripEl}
      class="strip"
      role="group"
      tabindex="0"
      aria-label={label}
      onscroll={onScroll}
    >
      {#each slides as slide (slide.src)}
        <div class="slide">
          <img src={slide.src} alt={slide.alt} width="1280" height="800" loading="lazy" />
        </div>
      {/each}
    </div>

    {#if enhanced}
      <button
        class="step prev"
        type="button"
        aria-label="Previous screenshot"
        onclick={() => goTo(index - 1)}
      >
        <svg width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M10 3.5 5.5 8l4.5 4.5"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button
        class="step next"
        type="button"
        aria-label="Next screenshot"
        onclick={() => goTo(index + 1)}
      >
        <svg width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M6 3.5 10.5 8 6 12.5"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    {/if}
  </div>

  <figcaption>
    <span class="caption">{caption}</span>
    {#if enhanced}
      <span class="dots" role="group" aria-label="Choose screenshot">
        {#each slides as slide, i (slide.src)}
          <button
            class="dot"
            type="button"
            aria-label="Show {slide.label}"
            aria-current={i === index ? 'true' : undefined}
            onclick={() => goTo(i)}
          ></button>
        {/each}
      </span>
    {/if}
  </figcaption>
</figure>

<style>
  .carousel {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin: 0;
  }

  .frame {
    position: relative;
  }

  .strip {
    display: flex;
    gap: var(--space-4);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    border-radius: var(--radius-lg);
    scrollbar-width: none;
  }

  .strip::-webkit-scrollbar {
    display: none;
  }

  .slide {
    flex: 0 0 100%;
    scroll-snap-align: center;
    overflow: hidden;
    background: var(--surface-raised);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
  }

  .slide img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 10;
  }

  .step {
    display: none;
    position: absolute;
    bottom: 16px;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    padding: 0;
    background: color-mix(in srgb, var(--surface-raised) 82%, transparent);
    border: none;
    border-radius: 50%;
    box-shadow: var(--shadow-sm);
    color: var(--brand-text);
    cursor: pointer;
    backdrop-filter: blur(8px);
  }

  .step:hover {
    background: var(--surface-raised);
    color: var(--brand-hover);
  }

  .prev {
    left: 10px;
  }

  .next {
    right: 10px;
  }

  figcaption {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .caption {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    color: var(--ink-muted);
  }

  .dots {
    display: flex;
    flex: none;
    gap: var(--space-2);
  }

  .dot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
  }

  .dot::before {
    content: '';
    width: 14px;
    height: 14px;
    background: var(--indicator);
    border-radius: var(--radius-pixel);
    opacity: 0.32;
    transform: scale(0.85);
    transition:
      opacity var(--transition) var(--ease-standard),
      transform var(--transition) var(--ease-standard);
  }

  .dot[aria-current='true']::before {
    opacity: 1;
    transform: scale(1);
  }

  @media (min-width: 47.5rem) {
    .dot {
      width: 24px;
      height: 24px;
    }

    .dot::before {
      width: 10px;
      height: 10px;
      border-radius: 1px;
    }
  }

  @media (min-width: 47.5rem) {
    .step {
      display: inline-flex;
    }
  }

  @media (min-width: 87.5rem) {
    .prev {
      left: -56px;
    }

    .next {
      right: -56px;
    }

    .step {
      top: 50%;
      bottom: auto;
      background: transparent;
      box-shadow: none;
      color: var(--indicator);
      backdrop-filter: none;
      transform: translateY(-50%);
    }

    .step:hover {
      background: color-mix(in srgb, var(--ink) 9%, transparent);
    }
  }
</style>
