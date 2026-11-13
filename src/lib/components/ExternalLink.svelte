<script lang="ts">
  import type { Snippet } from 'svelte'
  import NewTabHint from './NewTabHint.svelte'

  let { href, children }: { href: string; children: Snippet } = $props()
</script>

<a {href} target="_blank" rel="noopener noreferrer">{@render children()}<NewTabHint /></a>
