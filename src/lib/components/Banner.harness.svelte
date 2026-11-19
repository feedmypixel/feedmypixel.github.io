<script lang="ts">
  import Banner from './Banner.svelte'

  let { variant, title, body }: { variant: 'positive' | 'critical'; title: string; body?: string } =
    $props()

  let element: HTMLElement | undefined = $state()
</script>

{#if body}
  <Banner {variant} {title} bind:element>{body}</Banner>
{:else}
  <Banner {variant} {title} bind:element />
{/if}

<button type="button" onclick={() => element?.focus()}>Focus the banner</button>
