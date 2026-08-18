<script lang="ts">
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
  import RoleCard from './RoleCard.svelte'
  import EmptyState from './EmptyState.svelte'

  let query = $state('')
  let chips = $state<FilterChip[]>([])
  let type = $state<TypeFilter>('All')
  let open = $state(false)
  let activeIndex = $state(-1)

  const facets = deriveFacets(roles)

  const inScope = $derived(filterByControls(roles, type, chips))
  const results = $derived(filterRoles(roles, type, chips, query))
  const suggestions = $derived(suggestFacets(facets, inScope, chips, query))
  const anyFilter = $derived(chips.length > 0 || query.length > 0 || type !== 'All')

  function select(facet: Facet) {
    chips = addChip(chips, { label: facet.label, kind: facet.kind })
    query = ''
    open = false
    activeIndex = -1
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
    <h2>Search the whole CV</h2>
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
            <Chip
              label={chip.label}
              onRemove={() => (chips = chips.filter((_, position) => position !== index))}
            />
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
        Search and filtering need JavaScript. The full history is listed below, and the
        <a href={asset('/BenChidgeyCV.pdf')} download="BenChidgeyCV.pdf">CV is downloadable</a>.
      </p>
    </noscript>
  </div>

  <div class="container results" aria-live="polite">
    {#if results.length > 0}
      <ol class="rows">
        {#each results as role (role.company + role.dates)}
          <RoleCard {role} {chips} {query} />
        {/each}
      </ol>
    {:else}
      <EmptyState
        title="Nothing matches those filters"
        message="Try a broader term, or start again"
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
    border-color: var(--brand);
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
