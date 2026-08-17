<script lang="ts">
  import { roleCountLabel, type Facet } from '$lib/cv-filter'

  let {
    query = $bindable(),
    suggestions,
    open,
    activeIndex,
    countLabel,
    anyFilter,
    placeholder,
    onKeyDown,
    onOpen,
    onClose,
    onSelect,
    onHover,
    onClearAll
  }: {
    query: string
    suggestions: Facet[]
    open: boolean
    activeIndex: number
    countLabel: string
    anyFilter: boolean
    placeholder: string
    onKeyDown: (event: KeyboardEvent) => void
    onOpen: () => void
    onClose: () => void
    onSelect: (facet: Facet) => void
    onHover: (index: number) => void
    onClearAll: () => void
  } = $props()

  let fieldEl: HTMLElement | undefined = $state()

  const showList = $derived(open && (suggestions.length > 0 || query.trim().length > 0))
  const noSuggestions = $derived(open && suggestions.length === 0 && query.trim().length > 0)

  $effect(() => {
    if (!open) {
      return
    }
    const onPointerDown = (event: MouseEvent) => {
      if (fieldEl && !fieldEl.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  })
</script>

<div bind:this={fieldEl} class="field">
  <svg
    class="search-icon"
    width="17"
    height="17"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    aria-hidden="true"
  >
    <circle cx="7" cy="7" r="4.5" />
    <path d="M10.5 10.5 14 14" />
  </svg>

  <label class="visually-hidden" for="cv-search"> Search roles, skills, clients and sectors </label>
  <input
    id="cv-search"
    type="text"
    name="q"
    autocomplete="off"
    role="combobox"
    aria-expanded={open}
    aria-controls="cv-suggestions"
    aria-autocomplete="list"
    aria-activedescendant={activeIndex >= 0 ? `cv-suggestion-${activeIndex}` : undefined}
    {placeholder}
    bind:value={query}
    onfocus={onOpen}
    oninput={onOpen}
    onkeydown={onKeyDown}
  />

  <span class="count" aria-hidden="true">{countLabel}</span>

  {#if anyFilter}
    <button class="clear" type="button" aria-label="Clear all filters" onclick={onClearAll}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M4 4l8 8M12 4l-8 8" />
      </svg>
    </button>
  {/if}

  {#if showList}
    <ul id="cv-suggestions" class="listbox" role="listbox" aria-label="Suggested filters">
      {#each suggestions as facet, index (facet.kind + facet.label)}
        <li
          id="cv-suggestion-{index}"
          class="option"
          role="option"
          aria-selected={index === activeIndex}
          onmousedown={(event) => {
            event.preventDefault()
            onSelect(facet)
          }}
          onmouseenter={() => onHover(index)}
        >
          <span class="kind">{facet.kind}</span>
          <span class="label">{facet.label}</span>
          <span class="hits">{roleCountLabel(facet.count)}</span>
        </li>
      {/each}

      {#if noSuggestions}
        <li class="none" role="option" aria-selected="false" aria-disabled="true">
          No matching skill, client or sector. Free text still filters the timeline.
        </li>
      {/if}
    </ul>
  {/if}
</div>

<style>
  .field {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: 56px;
    padding: 0 var(--space-3) 0 var(--space-4);
    background: var(--field-bg);
    border: 1px solid var(--field-border);
    border-radius: var(--radius-md);
    transition:
      border-color var(--transition) var(--ease-standard),
      box-shadow var(--transition) var(--ease-standard);
  }

  .field:focus-within {
    border-color: var(--brand);
    box-shadow: var(--focus-ring);
  }

  .search-icon {
    flex: none;
    color: var(--ink-subtle);
  }

  input {
    flex: 1 1 auto;
    min-width: 0;
    padding: var(--space-3) 0;
    background: transparent;
    border: none;
    outline: none;
    font-family: var(--font-text);
    font-size: var(--font-size-base);
    color: var(--ink-strong);
  }

  .count {
    flex: none;
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    color: var(--ink-subtle);
    white-space: nowrap;
  }

  .clear {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: var(--radius-md);
    color: var(--ink-muted);
    cursor: pointer;
  }

  .clear:hover {
    background: color-mix(in srgb, var(--ink) 9%, transparent);
    color: var(--brand-hover);
  }

  .listbox {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    left: 0;
    z-index: var(--z-overlay);
    max-height: 340px;
    margin: 0;
    padding: var(--space-2);
    overflow-y: auto;
    list-style: none;
    background: var(--surface-overlay);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
  }

  .option {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    border-radius: var(--radius-sm);
    cursor: pointer;
  }

  .option:hover,
  .option[aria-selected='true'] {
    background: var(--surface-sunken);
  }

  .kind {
    flex: none;
    min-width: 58px;
    padding: 3px var(--space-2);
    background: var(--surface-sunken);
    border-radius: var(--radius-pill);
    font-family: var(--font-mono);
    font-size: 0.625rem;
    color: var(--ink-subtle);
    text-align: center;
  }

  .label {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--ink-strong);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hits {
    flex: none;
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    color: var(--ink-subtle);
  }

  .none {
    padding: var(--space-3);
    font-size: var(--font-size-sm);
    color: var(--ink-muted);
  }
</style>
