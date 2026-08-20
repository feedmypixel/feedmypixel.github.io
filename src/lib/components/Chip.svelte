<script lang="ts">
  let { label, onRemove }: { label: string; onRemove: () => void } = $props()
</script>

<button class="chip" type="button" onclick={onRemove}>
  <span>{label}</span>
  <span class="cross" aria-hidden="true">
    <svg
      width="11"
      height="11"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  </span>
  <span class="visually-hidden">Remove filter</span>
</button>

<style>
  .chip {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 34px;
    padding: 0 var(--space-2) 0 var(--space-3);
    background: var(--brand-tint);
    color: var(--brand-text);
    border: 1px solid var(--brand-tint-strong);
    border-radius: var(--radius-pill);
    font-family: var(--font-text);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: border-color var(--transition) var(--ease-standard);
  }

  .chip:hover {
    border-color: var(--indicator);
  }

  .cross {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }
</style>
