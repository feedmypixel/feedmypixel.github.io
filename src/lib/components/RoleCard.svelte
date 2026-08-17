<script lang="ts">
  import type { Role } from '$lib/data/experience'
  import { isTagHot, type Chip } from '$lib/cv-filter'

  let { role, chips, query }: { role: Role; chips: Chip[]; query: string } = $props()
</script>

<li class="row">
  <div class="grid">
    <div class="when">
      <span class="dates">{role.dates}</span>
      <span class="meta">{role.type} · {role.location}</span>
    </div>
    <div class="what">
      <h3>{role.company}</h3>
      <p class="title">{role.title}</p>
      <p class="summary">{role.summary}</p>
      <ul class="tags">
        {#each role.tags as tag (tag)}
          <li class="tag" data-hot={isTagHot(tag, chips, query)}>{tag}</li>
        {/each}
      </ul>
    </div>
  </div>
</li>

<style>
  .row {
    border-bottom: 1px solid var(--border-subtle);
    transition: background var(--transition) var(--ease-standard);
  }

  .row:hover {
    background: var(--surface-sunken);
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

  .dates {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    color: var(--ink-muted);
    white-space: nowrap;
  }

  .meta {
    font-family: var(--font-mono);
    font-size: 0.625rem;
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

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: var(--space-4);
    padding: 0;
    list-style: none;
  }

  .tag {
    padding: 4px var(--space-3);
    background: var(--surface-sunken);
    border-radius: var(--radius-pill);
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--ink-muted);
  }

  .tag[data-hot='true'] {
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
