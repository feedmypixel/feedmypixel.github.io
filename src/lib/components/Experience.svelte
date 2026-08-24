<script lang="ts">
  import { tick } from 'svelte'
  import { asset } from '$app/paths'
  import { roles } from '$lib/data/experience'
  import {
    QUICK_FILTERS,
    TYPE_FILTERS,
    addChip,
    countLabel,
    deriveFacets,
    filterByControls,
    filterRoles,
    nextActiveIndex,
    suggestFacets,
    type Chip as FilterChip,
    type Facet,
    type TypeFilter
  } from '$lib/cv-filter'
  import SearchCombobox from './SearchCombobox.svelte'
  import SegmentedControl from './SegmentedControl.svelte'
  import Chip from './Chip.svelte'
  import RoleRun from './RoleRun.svelte'
  import { buildRuns } from '$lib/role-runs'
  import EmptyState from './EmptyState.svelte'
  import Button from './Button.svelte'

  let query = $state('')
  let chips = $state<FilterChip[]>([])
  let type = $state<TypeFilter>('All')
  let open = $state(false)
  let activeIndex = $state(-1)
  let suppressListbox = false

  const chipButtons = () => [...document.querySelectorAll<HTMLButtonElement>('.chips .chip')]
  const searchInput = () => document.querySelector<HTMLInputElement>('#cv-search')

  const facets = deriveFacets(roles)

  const inScope = $derived(filterByControls(roles, type, chips))
  const results = $derived(filterRoles(roles, type, chips, query))
  const runs = $derived(buildRuns(results, new Date()))
  const suggestions = $derived(suggestFacets(facets, inScope, chips, query))
  const anyFilter = $derived(chips.length > 0 || query.length > 0 || type !== 'All')

  function select(facet: Facet) {
    chips = addChip(chips, { label: facet.label, kind: facet.kind })
    query = ''
    open = false
    activeIndex = -1
  }

  /* Focus must land on something that survives the re-render this triggers.
     Not the tag: its row may be filtered out of the DOM a moment later, which
     drops focus to the body. Not the search input: focusing it opens the
     suggestion listbox unasked. */
  async function selectTag(label: string) {
    const before = chips.length
    chips = addChip(chips, { label, kind: 'skill' })
    if (chips.length === before) {
      return
    }
    await tick()
    chipButtons()[chips.length - 1]?.focus()
  }

  /* The remove button destroys the element it sits on, so the next holder of
     focus is chosen here rather than left to the browser. */
  async function removeChipAt(index: number) {
    chips = chips.filter((_, position) => position !== index)
    await tick()
    const remaining = chipButtons()
    const next = remaining.at(index) ?? remaining.at(-1)
    if (next) {
      next.focus()
      return
    }
    suppressListbox = true
    searchInput()?.focus()
  }

  function clearAll() {
    chips = []
    query = ''
    type = 'All'
    open = false
    activeIndex = -1
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      open = true
      activeIndex = nextActiveIndex(
        activeIndex,
        suggestions.length,
        event.key === 'ArrowDown' ? 1 : -1
      )
      return
    }
    const active = activeIndex >= 0 ? suggestions.at(activeIndex) : undefined
    if (event.key === 'Enter' && open && active) {
      event.preventDefault()
      select(active)
      return
    }
    if (event.key === 'Escape') {
      open = false
      activeIndex = -1
      return
    }
    if (event.key === 'Backspace' && query === '' && chips.length > 0) {
      chips = chips.slice(0, -1)
    }
  }
</script>

<section id="experience" class="experience">
  <div class="container intro">
    <p class="eyebrow">Experience</p>
    <div class="heading-row">
      <h2>Search my CV</h2>
      <Button variant="solid" href={asset('/BenChidgeyCV.pdf')} download="BenChidgeyCV.pdf">
        <svg
          width="15"
          height="15"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M8 2v8m0 0 3-3m-3 3L5 7M3 13h10" />
        </svg>
        Download CV
      </Button>
    </div>
    <p class="lede">Type to filter or just scroll the timeline.</p>
  </div>

  <div class="container controls">
    <SearchCombobox
      bind:query
      {suggestions}
      {open}
      {activeIndex}
      {anyFilter}
      countLabel={countLabel(results.length, roles.length)}
      label="Search"
      onOpen={() => {
        if (suppressListbox) {
          suppressListbox = false
          return
        }
        open = true
        activeIndex = -1
      }}
      onClose={() => {
        open = false
        activeIndex = -1
      }}
      onSelect={select}
      onHover={(index) => (activeIndex = index)}
      onClearAll={clearAll}
      {onKeyDown}
    />

    {#if chips.length > 0}
      <ul class="chips" aria-label="Active filters">
        {#each chips as chip, index (chip.kind + chip.label)}
          <li>
            <Chip label={chip.label} onRemove={() => removeChipAt(index)} />
          </li>
        {/each}
      </ul>
    {/if}

    <div class="filters">
      <SegmentedControl
        options={TYPE_FILTERS}
        value={type}
        label="Role type"
        onSelect={(next) => (type = next)}
      />
      <div class="quick">
        <span class="quick-label">Quick:</span>
        {#each QUICK_FILTERS as quick (quick.kind + quick.label)}
          <button
            class="quick-chip"
            type="button"
            onclick={() => {
              chips = addChip(chips, quick)
              query = ''
              open = false
            }}
          >
            {quick.label}
          </button>
        {/each}
      </div>
    </div>

    <noscript>
      <p class="noscript">
        Search and filtering need JavaScript. The full history is listed below and the
        <a href={asset('/BenChidgeyCV.pdf')} download="BenChidgeyCV.pdf">CV is downloadable</a>.
      </p>
    </noscript>
  </div>

  <div class="container results" aria-live="polite">
    {#if results.length > 0}
      <ol class="rows">
        {#each runs as run (run.company + run.spanLabel)}
          <RoleRun {run} {chips} {query} onSelectTag={selectTag} />
        {/each}
      </ol>
    {:else}
      <EmptyState
        title="Nothing matches those filters"
        message="Try a broader term or start again"
        actionLabel="Clear all filters"
        onAction={clearAll}
      />
    {/if}
  </div>
</section>

<style>
  .experience {
    border-bottom: 1px solid var(--border-subtle);
  }

  .intro {
    padding: var(--band) var(--gutter) var(--space-8);
  }

  .heading-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .eyebrow {
    margin-bottom: var(--space-4);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    letter-spacing: var(--tracking-wide);
    color: var(--brand-text);
  }

  h2 {
    max-width: 26ch;
    font-family: var(--font-display);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
    text-wrap: balance;
  }

  .lede {
    max-width: 50ch;
    margin-top: var(--space-4);
    font-size: var(--font-size-md);
    line-height: var(--line-height-snug);
    color: var(--ink-muted);
    text-wrap: pretty;
  }

  .controls {
    padding-bottom: var(--space-6);
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: var(--space-4);
    padding: 0;
    list-style: none;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4);
    margin-top: var(--space-4);
  }

  .quick {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
  }

  .quick-label {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    color: var(--ink-subtle);
  }

  .quick-chip {
    min-height: 32px;
    padding: 0 var(--space-3);
    background: transparent;
    color: var(--ink-muted);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-pill);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    cursor: pointer;
    transition:
      border-color var(--transition) var(--ease-standard),
      color var(--transition) var(--ease-standard);
  }

  .quick-chip:hover {
    border-color: var(--indicator);
    color: var(--brand-text);
  }

  .noscript {
    margin-top: var(--space-4);
    font-size: var(--font-size-sm);
    color: var(--ink-muted);
  }

  .results {
    padding-bottom: var(--band);
  }

  .rows {
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--border-subtle);
    list-style: none;
  }
</style>
