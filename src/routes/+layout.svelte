<script lang="ts">
  import '$lib/styles/app.css'
  import '@fontsource-variable/plus-jakarta-sans/wght.css'
  import '@fontsource/dm-mono/400.css'
  import '@fontsource/dm-mono/500.css'
  import favicon from '$lib/assets/favicon.svg'

  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
