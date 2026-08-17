<script lang="ts">
  let {
    id,
    name,
    label,
    hint,
    error,
    type = 'text',
    rows,
    autocomplete,
    value = $bindable('')
  }: {
    id: string
    name: string
    label: string
    hint?: string
    error?: string
    type?: 'text' | 'email'
    rows?: number
    autocomplete?: 'name' | 'email'
    value?: string
  } = $props()

  const hintId = $derived(hint ? `${id}-hint` : undefined)
  const errorId = $derived(error ? `${id}-error` : undefined)
  const describedBy = $derived([hintId, errorId].filter(Boolean).join(' ') || undefined)
</script>

<div class="field">
  <label for={id}>{label}</label>

  {#if hint}
    <p id={hintId} class="hint">{hint}</p>
  {/if}

  {#if error}
    <p id={errorId} class="error">{error}</p>
  {/if}

  {#if rows}
    <textarea
      {id}
      {name}
      {rows}
      required
      aria-describedby={describedBy}
      aria-invalid={error ? 'true' : undefined}
      bind:value></textarea>
  {:else}
    <input
      {id}
      {name}
      {type}
      {autocomplete}
      required
      aria-describedby={describedBy}
      aria-invalid={error ? 'true' : undefined}
      bind:value
    />
  {/if}
</div>

<style>
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--ink-strong);
  }

  .hint {
    font-size: var(--font-size-sm);
    color: var(--ink-muted);
  }

  .error {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--field-invalid);
  }

  input,
  textarea {
    background: var(--field-bg);
    border: 1px solid var(--field-border);
    border-radius: var(--radius-md);
    font-family: var(--font-text);
    font-size: var(--font-size-base);
    color: var(--ink-strong);
  }

  input {
    min-height: 48px;
    padding: 0 var(--space-4);
  }

  textarea {
    min-height: 132px;
    padding: var(--space-3) var(--space-4);
    line-height: var(--line-height-normal);
    resize: vertical;
  }

  input:focus,
  textarea:focus {
    border-color: var(--field-border-focus);
    outline: none;
    box-shadow: var(--focus-ring);
  }

  input[aria-invalid='true'],
  textarea[aria-invalid='true'] {
    border-color: var(--field-invalid);
  }
</style>
