<script lang="ts">
  import { Copier } from '#lib/copier.svelte.js'
  import { slugify } from '#lib/slugify.js'
  import CopiedNote from './CopiedNote.svelte'

  let {
    text,
    level = 2,
    size = '3xl',
    id = slugify(text)
  }: { text: string; level?: 2 | 3; size?: '3xl' | '2xl' | 'xl' | 'lg'; id?: string } = $props()

  const copier = new Copier()

  const opensElsewhere = (event: MouseEvent) =>
    event.metaKey || event.ctrlKey || event.shiftKey || event.altKey

  async function copyLink(event: MouseEvent) {
    if (opensElsewhere(event)) {
      return
    }
    event.preventDefault()
    if (!(await copier.copy(new URL(`#${id}`, location.href).href))) {
      location.hash = id
    }
  }
</script>

<svelte:element this={`h${level}`} {id} class="title size-{size}" aria-labelledby="{id}-text">
  <span id="{id}-text">{text}</span><span class="link"
    ><a class="anchor" href="#{id}" aria-label="Copy link to {text}" onclick={copyLink}
      ><svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M6.5 9.5a3 3 0 0 0 4.24 0l2.12-2.12a3 3 0 0 0-4.24-4.24l-.7.7" />
        <path d="M9.5 6.5a3 3 0 0 0-4.24 0L3.14 8.62a3 3 0 0 0 4.24 4.24l.7-.7" />
      </svg></a
    ><CopiedNote shown={copier.copied} /></span
  >
</svelte:element>

<style>
  .title {
    scroll-margin-top: var(--space-6);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    text-wrap: balance;
  }

  .size-3xl {
    font-size: var(--font-size-3xl);
  }

  .size-2xl {
    font-size: var(--font-size-2xl);
  }

  .size-xl {
    font-size: var(--font-size-xl);
  }

  .size-lg {
    font-size: var(--font-size-lg);
  }

  .anchor {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-1);
    vertical-align: middle;
    font-size: var(--font-size-md);
    border-radius: var(--radius-md);
    color: var(--ink-subtle);
    opacity: 0;
    transition:
      opacity var(--transition-fast),
      color var(--transition-fast);
  }

  .anchor svg {
    width: 1em;
    height: 1em;
  }

  .title:hover .anchor,
  .anchor:focus-visible {
    opacity: 1;
  }

  .anchor:hover {
    color: var(--brand-hover);
  }

  @media (hover: none) {
    .anchor {
      opacity: 1;
    }
  }

  .link {
    position: relative;
  }

  .link > :global(.copied-note) {
    position: absolute;
    top: 50%;
    left: calc(100% + var(--space-1));
    translate: 0 -50%;
  }
</style>
