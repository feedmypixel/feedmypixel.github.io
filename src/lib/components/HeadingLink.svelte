<script lang="ts">
  import { copyText } from '#lib/clipboard.js'
  import { slugify } from '#lib/slugify.js'

  const COPIED_FOR_MS = 2000

  let {
    text,
    level = 2,
    size = '3xl',
    id = slugify(text)
  }: { text: string; level?: 2 | 3; size?: '3xl' | '2xl' | 'xl' | 'lg'; id?: string } = $props()

  let copied = $state(false)
  let copiedTimeout: ReturnType<typeof setTimeout> | undefined

  const opensElsewhere = (event: MouseEvent) =>
    event.metaKey || event.ctrlKey || event.shiftKey || event.altKey

  async function copyLink(event: MouseEvent) {
    if (opensElsewhere(event)) {
      return
    }
    event.preventDefault()
    if (!(await copyText(new URL(`#${id}`, location.href).href))) {
      location.hash = id
      return
    }
    copied = true
    clearTimeout(copiedTimeout)
    copiedTimeout = setTimeout(() => (copied = false), COPIED_FOR_MS)
  }
</script>

<svelte:element this={`h${level}`} {id} class="title size-{size}" aria-labelledby="{id}-text">
  <span id="{id}-text">{text}</span><a
    class="anchor"
    href="#{id}"
    aria-label="Copy link to {text}"
    onclick={copyLink}
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
  ><span class="copied" role="status">
    {#if copied}
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M3 8.5l3.5 3.5L13 4.5" />
      </svg>
      Copied
    {/if}
  </span>
</svelte:element>

<style>
  .title {
    scroll-margin-top: var(--space-6);
    font-family: var(--font-display);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
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

  .copied {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    margin-left: var(--space-1);
    vertical-align: middle;
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-regular);
    letter-spacing: normal;
    color: var(--mood-positive);
  }

  .copied svg {
    width: 1em;
    height: 1em;
  }
</style>
