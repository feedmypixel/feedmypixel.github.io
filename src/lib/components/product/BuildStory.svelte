<script lang="ts">
  import type { Snippet } from 'svelte'
  import { passedSectionIndex } from '#lib/story-section.js'

  let {
    heading,
    sections,
    stack,
    children
  }: {
    heading: string
    sections: { id: string; label: string }[]
    stack: Snippet
    children: Snippet
  } = $props()

  let current = $state<string>()

  $effect(() => {
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((heading): heading is HTMLElement => heading !== null)
    let frame = 0

    function update() {
      frame = 0
      const tops = headings.map((heading) => heading.getBoundingClientRect().top)
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1
      current = headings[passedSectionIndex(tops, window.innerHeight / 3, { atBottom })]?.id
    }

    function onScroll() {
      frame ||= requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  })
</script>

<section id="story" class="story">
  <div class="container inner">
    <p class="eyebrow">The build story</p>
    <h2>{heading}</h2>

    <div class="grid">
      <aside>
        <nav aria-label="In this story">
          <p class="nav-label">In this story</p>
          {#each sections as section (section.id)}
            <a href="#{section.id}" aria-current={current === section.id ? 'true' : undefined}
              >{section.label}</a
            >
          {/each}
        </nav>

        <dl class="stack">
          {@render stack()}
        </dl>
      </aside>

      <article>
        {@render children()}
      </article>
    </div>
  </div>
</section>

<style>
  .story {
    border-bottom: 1px solid var(--border-subtle);
  }

  .inner {
    padding-block: var(--band);
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
    max-width: 24ch;
    font-family: var(--font-display);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
    text-wrap: balance;
  }

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-10);
    align-items: start;
    margin-top: var(--space-12);
  }

  aside {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .nav-label,
  .stack :global(dt) {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    letter-spacing: var(--tracking-wide);
    color: var(--ink-subtle);
  }

  nav a {
    padding-block: var(--space-1);
    padding-left: var(--space-3);
    font-size: var(--font-size-sm);
    color: var(--ink-muted);
    text-decoration: none;
    border-left: 2px solid var(--border-subtle);
    transition:
      color var(--transition) var(--ease-standard),
      border-color var(--transition) var(--ease-standard);
  }

  nav a:hover {
    color: var(--ink-strong);
  }

  nav a[aria-current='true'] {
    color: var(--ink-strong);
    border-left-color: var(--brand);
  }

  .stack {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-4);
    padding-top: var(--space-6);
    border-top: 1px solid var(--border-subtle);
  }

  .stack :global(div) {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .stack :global(dd) {
    font-size: var(--font-size-sm);
    color: var(--ink);
  }

  article {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    max-width: 66ch;
    font-size: var(--font-size-md);
    line-height: var(--line-height-relaxed);
    color: var(--ink);
    text-wrap: pretty;
  }

  article :global(h3) {
    margin-top: var(--space-8);
    scroll-margin-top: calc(var(--header-height) + var(--space-6));
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
  }

  article :global(h3:first-child) {
    margin-top: 0;
  }

  article :global(ul) {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding-left: 1.25em;
  }

  article :global(.thanks) {
    padding-left: 0;
    font-size: var(--font-size-base);
    list-style: none;
  }

  article :global(.actions) {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-top: var(--space-2);
  }

  @media (min-width: 60rem) {
    .grid {
      grid-template-columns: 220px minmax(0, 1fr);
      gap: var(--space-16);
    }

    aside {
      position: sticky;
      top: calc(var(--header-height) + var(--space-8));
    }
  }
</style>
