<script lang="ts">
  let { shown }: { shown: boolean } = $props()
</script>

<span class="copied-note" role="status">
  {#if shown}
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8.5l3.5 3.5L13 4.5" />
    </svg>
    Copied
  {/if}
</span>

<style>
  .copied-note {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    vertical-align: middle;
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-regular);
    letter-spacing: normal;
    white-space: nowrap;
    color: var(--mood-positive);
  }

  svg {
    width: 1em;
    height: 1em;
  }
</style>
