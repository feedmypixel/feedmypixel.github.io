<script lang="ts" generics="Option extends string">
  let {
    options,
    value,
    label,
    onSelect
  }: {
    options: readonly Option[]
    value: Option
    label: string
    onSelect: (option: Option) => void
  } = $props()
</script>

<div class="segmented" role="group" aria-label={label}>
  {#each options as option (option)}
    <button
      class="segment"
      type="button"
      aria-pressed={option === value}
      onclick={() => onSelect(option)}
    >
      {option}
    </button>
  {/each}
</div>

<style>
  .segmented {
    display: inline-flex;
    gap: 2px;
    padding: 3px;
    background: var(--surface-inset);
    border-radius: var(--radius-md);
  }

  .segment {
    min-height: 34px;
    padding: 0 var(--space-4);
    background: transparent;
    border: none;
    border-radius: var(--radius-sm);
    color: var(--ink-muted);
    font-family: var(--font-text);
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition:
      background var(--transition) var(--ease-standard),
      color var(--transition) var(--ease-standard);
  }

  .segment:hover {
    color: var(--ink-strong);
  }

  .segment[aria-pressed='true'] {
    background: var(--surface-raised);
    color: var(--ink-strong);
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-sm);
  }
</style>
