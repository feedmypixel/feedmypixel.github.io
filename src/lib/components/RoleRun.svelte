<script lang="ts">
  import { isTagHot, type Chip } from '$lib/cv-filter'
  import type { Run } from '$lib/role-runs'

  let {
    run,
    chips,
    query,
    onSelectTag
  }: { run: Run; chips: Chip[]; query: string; onSelectTag?: (tag: string) => void } = $props()

  const solo = $derived(run.chapters.length === 1)
  const only = $derived(run.chapters[0])
</script>

<li class="row">
  <div class="grid">
    <div class="when">
      <span class="dates">{run.spanLabel}</span>
      {#if run.tenureLabel}
        <span class="derived">{run.tenureLabel}</span>
      {:else if solo && only.durationLabel}
        <span class="derived">{only.durationLabel}</span>
      {/if}
      {#if run.metaLabel}
        <span class="derived">{run.metaLabel}</span>
      {/if}
    </div>

    <div class="what">
      <h3>{run.company}</h3>

      {#if solo}
        <p class="title">{only.role.title}</p>
        <!-- eslint-disable-next-line svelte/no-at-html-tags -- authored in experience.ts, never user input -->
        <div class="summary">{@html only.role.summary}</div>
        <ul class="tags">
          {#each only.role.tags as tag (tag)}
            <li>
              <button
                class="tag"
                type="button"
                data-hot={isTagHot(tag, chips, query)}
                aria-label="Filter by {tag}"
                onclick={() => onSelectTag?.(tag)}
              >
                {tag}
              </button>
            </li>
          {/each}
        </ul>
      {:else}
        <ol class="chapters">
          {#each run.chapters as chapter, index (chapter.role.dates + chapter.role.title)}
            <li class="chapter" data-last={index === run.chapters.length - 1}>
              <span class="marker" aria-hidden="true"></span>
              <h4>{chapter.role.title}</h4>
              <span class="chapter-dates">
                {chapter.role.dates}{chapter.durationLabel ? ` · ${chapter.durationLabel}` : ''}
              </span>
              {#if !run.metaLabel}
                <span class="chapter-meta">{chapter.role.type} · {chapter.role.location}</span>
              {/if}
              <!-- eslint-disable-next-line svelte/no-at-html-tags -- authored in experience.ts, never user input -->
              <div class="summary">{@html chapter.role.summary}</div>
              <ul class="tags">
                {#each chapter.role.tags as tag (tag)}
                  <li>
                    <button
                      class="tag"
                      type="button"
                      data-hot={isTagHot(tag, chips, query)}
                      aria-label="Filter by {tag}"
                      onclick={() => onSelectTag?.(tag)}
                    >
                      {tag}
                    </button>
                  </li>
                {/each}
              </ul>
            </li>
          {/each}
        </ol>
      {/if}
    </div>
  </div>
</li>

<style>
  @media (prefers-reduced-motion: no-preference) {
    @supports ((animation-timeline: view()) and (animation-range: entry)) {
      @keyframes row-rise {
        from {
          opacity: 0;
          transform: translateY(24px);
        }
      }

      .row {
        animation: row-rise auto linear backwards;
        animation-timeline: view();
        animation-range: cover 0% cover 300px;
      }
    }
  }

  .row {
    --row-bg: var(--surface-page);

    border-bottom: 1px solid var(--border-subtle);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-3);
    padding: var(--space-6) var(--space-4);
    margin-inline: calc(var(--space-4) * -1);
  }

  .when {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .dates,
  .derived {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
  }

  .dates {
    color: var(--ink-muted);
    white-space: nowrap;
  }

  .derived {
    color: var(--ink-subtle);
  }

  .what {
    min-width: 0;
  }

  h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
  }

  .title {
    margin-top: var(--space-1);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    color: var(--ink);
  }

  .summary {
    max-width: 70ch;
    margin-top: var(--space-3);
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--ink-muted);
    text-wrap: pretty;
  }

  .summary :global(p) {
    margin: 0;
  }

  .summary :global(p + p) {
    margin-top: var(--space-2);
  }

  .chapters {
    --mark: 8px;

    display: flex;
    flex-direction: column;
    gap: var(--space-8);
    margin: var(--space-5) 0 0 calc(var(--space-4) / 2);
    padding-left: calc(var(--space-4) + var(--mark));
    list-style: none;
  }

  .chapter {
    position: relative;
    min-width: 0;
  }

  .marker {
    position: absolute;
    top: 9px;
    left: calc((var(--space-4) + var(--mark)) * -1);
    width: var(--mark);
    height: var(--mark);
    background: var(--brand);
    box-shadow: 0 0 0 2px var(--row-bg);
  }

  /* One segment per chapter, marker to marker. The last has none, so the rule
     stops at the final marker rather than implying time after the last role. */
  .chapter::before {
    content: '';
    position: absolute;
    top: 13px;
    left: calc((var(--space-4) + var(--mark)) * -1 + var(--mark) / 2 - 1px);
    width: 2px;
    height: calc(100% + var(--space-8));
    background: var(--border-default);
  }

  .chapter[data-last='true']::before {
    display: none;
  }

  h4 {
    font-family: var(--font-display);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
  }

  .chapter-dates,
  .chapter-meta {
    display: block;
    margin-top: var(--space-1);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
  }

  .chapter-dates {
    color: var(--ink-muted);
  }

  .chapter-meta {
    color: var(--ink-subtle);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: var(--space-4);
    padding: 0;
    list-style: none;
  }

  .tag {
    display: inline-flex;
    border: none;
    cursor: pointer;
    transition:
      background var(--transition) var(--ease-standard),
      color var(--transition) var(--ease-standard);
    align-items: center;
    min-height: 24px;
    padding: 0 var(--space-3);
    background: var(--surface-sunken);
    border-radius: var(--radius-pill);
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--ink-muted);
  }

  .tag:hover {
    background: var(--surface-inset);
    color: var(--ink-strong);
  }

  .tag[data-hot='true'] {
    background: var(--brand-tint-strong);
    color: var(--brand-text);
  }

  .tag[data-hot='true']:hover {
    background: var(--brand-tint-strong);
    color: var(--brand-text);
  }

  @media (min-width: 47.5rem) {
    .grid {
      grid-template-columns: 200px 1fr;
      gap: var(--space-8);
    }
  }
</style>
