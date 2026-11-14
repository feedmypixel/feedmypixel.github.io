<script lang="ts">
  import type { Snippet } from 'svelte'

  let { width, height, children }: { width: number; height: number; children: Snippet } = $props()
</script>

<div class="shot-card" style:aspect-ratio="{width} / {height}">
  {@render children()}
</div>

<style>
  .shot-card {
    flex: 1;
    overflow: hidden;
    background: var(--surface-inset);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-lg);
  }

  .shot-card :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
