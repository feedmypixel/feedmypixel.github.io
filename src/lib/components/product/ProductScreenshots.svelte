<script lang="ts">
  import type { Snippet } from 'svelte'
  import SectionHeader from '../SectionHeader.svelte'
  import ProductStory from '../ProductStory.svelte'

  let {
    heading,
    story,
    children
  }: {
    heading: string
    story: { problem: string; solution: string; product: string }
    children: Snippet
  } = $props()
</script>

<section id="screenshots" class="screenshots">
  <div class="container inner">
    <SectionHeader eyebrow="Screenshots" {heading} />

    {@render children()}

    <ProductStory {...story} />
  </div>
</section>

<style>
  .screenshots {
    background: var(--surface-sunken);
    border-bottom: 1px solid var(--border-subtle);
  }

  .inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
    padding-block: var(--band);
  }
</style>
