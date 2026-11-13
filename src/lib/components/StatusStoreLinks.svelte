<script lang="ts">
  import Button from './Button.svelte'
  import { statusAppStoreUrl, statusGooglePlayUrl } from '#lib/config.js'

  let { size = 'default' }: { size?: 'default' | 'large' } = $props()
</script>

{#if statusAppStoreUrl}
  <Button variant="ghost" {size} external href={statusAppStoreUrl}>App Store</Button>
{/if}
{#if statusGooglePlayUrl}
  <Button variant="ghost" {size} external href={statusGooglePlayUrl}>Google Play</Button>
{/if}
