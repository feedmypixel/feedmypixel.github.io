<script lang="ts" generics="Item extends { label: string }">
  import type { Snippet } from 'svelte'
  import { browser } from '$app/env'
  import { clampIndex, counterCaption, settledIndex } from '#lib/carousel.js'
  import Chevron from './Chevron.svelte'

  let {
    items,
    label,
    slideWidth = '100%',
    slide
  }: {
    items: Item[]
    label: string
    slideWidth?: string
    slide: Snippet<[Item, number]>
  } = $props()

  let index = $state(0)
  let stripEl: HTMLElement | undefined = $state()
  const enhanced = browser

  const current = $derived(clampIndex(index, items.length))
  const caption = $derived(counterCaption(current, items.length, items.at(current)?.label ?? ''))

  function slideOffsets(strip: HTMLElement) {
    const slides = [...strip.children] as HTMLElement[]
    const origin = slides[0]?.offsetLeft ?? 0
    return slides.map((slideElement) => slideElement.offsetLeft - origin)
  }

  function syncFromScroll() {
    if (!stripEl) {
      return
    }
    index = settledIndex({
      scrollLeft: stripEl.scrollLeft,
      offsets: slideOffsets(stripEl),
      maxScroll: maxScroll(stripEl),
      current
    })
  }

  function maxScroll(strip: HTMLElement) {
    return strip.scrollWidth - strip.clientWidth
  }

  function goTo(next: number) {
    const target = clampIndex(next, items.length)
    index = target
    if (stripEl) {
      const offset = slideOffsets(stripEl).at(target) ?? 0
      stripEl.scrollTo({ left: Math.min(offset, maxScroll(stripEl)) })
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
      style:--slide-width={slideWidth}
      onscroll={onScroll}
    >
      {#each items as item, itemIndex (itemIndex)}
        <div class="slide">
          {@render slide(item, itemIndex)}
        </div>
      {/each}
    </div>

    {#if enhanced}
      <button
        class="step prev"
        type="button"
        aria-label="Previous screenshot"
        onclick={() => goTo(current - 1)}
      >
        <Chevron direction="left" size={26} />
      </button>
      <button
        class="step next"
        type="button"
        aria-label="Next screenshot"
        onclick={() => goTo(current + 1)}
      >
        <Chevron direction="right" size={26} />
      </button>
    {/if}
  </div>

  <figcaption>
    <span class="caption">{caption}</span>
    {#if enhanced}
      <span class="dots" role="group" aria-label="Choose screenshot">
        {#each items as item, itemIndex (itemIndex)}
          <button
            class="dot"
            type="button"
            aria-label="Show {item.label}"
            aria-current={itemIndex === current ? 'true' : undefined}
            onclick={() => goTo(itemIndex)}
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

  @media (min-width: 42.5rem) {
    .frame,
    figcaption {
      padding-inline: var(--space-16);
    }
  }

  /* From here the page margin is wide enough to hold the chevrons, so the slides take the full width. */
  @media (min-width: 80rem) {
    .frame {
      margin-inline: calc(var(--space-16) * -1);
    }

    figcaption {
      padding-inline: 0;
    }
  }

  .strip {
    display: flex;
    gap: var(--space-4);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    border-radius: var(--radius-lg);
    scrollbar-width: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .strip {
      scroll-behavior: smooth;
    }
  }

  .strip::-webkit-scrollbar {
    display: none;
  }

  .slide {
    display: flex;
    flex: 0 0 var(--slide-width);
    min-width: 0;
    scroll-snap-align: start;
  }

  .step {
    display: none;
    position: absolute;
    top: 50%;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 50%;
    color: var(--ink-muted);
    cursor: pointer;
    transform: translateY(-50%);
    transition:
      background 160ms ease,
      color 160ms ease;
  }

  .step:hover {
    background: var(--surface-sunken);
    color: var(--brand-text);
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
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--space-2) var(--space-4);
  }

  .caption {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    color: var(--ink-muted);
  }

  .dots {
    display: flex;
    flex: 0 0 100%;
    flex-wrap: wrap;
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
    border: 2px solid var(--indicator);
    border-radius: var(--radius-pixel);
    transform: scale(0.85);
    transition:
      background-color var(--transition) var(--ease-standard),
      transform var(--transition) var(--ease-standard);
  }

  .dot[aria-current='true']::before {
    background-color: var(--indicator);
    transform: scale(1);
  }

  @media (min-width: 47.5rem) {
    .dots {
      flex-basis: auto;
    }

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

  @media (min-width: 42.5rem) {
    .step {
      display: inline-flex;
    }
  }
</style>
