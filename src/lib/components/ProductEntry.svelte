<script lang="ts">
  import type { Snippet } from 'svelte'
  import HeadingLink from './HeadingLink.svelte'
  import PixelMark from './PixelMark.svelte'
  import ProductStory from './ProductStory.svelte'

  let {
    name,
    pitch,
    story,
    divided = false,
    links,
    screenshots
  }: {
    name: string
    divided?: boolean
    pitch: string
    story: { problem: string; solution: string; product: string }
    links: Snippet
    screenshots: Snippet
  } = $props()
</script>

<div class="entry" class:divided>
  <div class="intro">
    <div class="name">
      <PixelMark />
      <HeadingLink level={3} size="2xl" text={name} />
    </div>
    <p class="pitch">{pitch}</p>
    <div class="links">
      {@render links()}
    </div>
  </div>

  {@render screenshots()}

  <ProductStory {...story} />
</div>

<style>
  .entry {
    display: flex;
    flex-direction: column;
    gap: var(--space-10);
    margin-top: var(--space-16);
  }

  .divided {
    padding-top: var(--space-16);
    border-top: 1px solid var(--border-default);
  }

  .intro {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .name {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .pitch {
    max-width: 46ch;
    font-size: var(--font-size-lg);
    line-height: var(--line-height-snug);
    color: var(--ink);
    text-wrap: pretty;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }
</style>
