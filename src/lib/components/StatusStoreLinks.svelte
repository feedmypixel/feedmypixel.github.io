<script lang="ts">
  import Button from './Button.svelte'
  import { statusAppStoreUrl, statusGooglePlayUrl } from '#lib/config.js'

  let { size = 'default' }: { size?: 'default' | 'large' } = $props()
</script>

<Button variant="ghost" {size} external href={statusAppStoreUrl}>App Store</Button>
<Button variant="ghost" {size} external href={statusGooglePlayUrl}>Google Play</Button>
