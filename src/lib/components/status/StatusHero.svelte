<script lang="ts">
  import { statusUrl } from '#lib/config.js'
  import Button from '../Button.svelte'
  import ProductHero from '../product/ProductHero.svelte'
  import StatusStoreLinks from '../StatusStoreLinks.svelte'
</script>

<ProductHero
  name="status"
  pitch="An emoji and your status: break the ice and spark a conversation."
  lead="React, reply and natter. Post an emoji and a few words. Your people react, reply or message you for a natter."
>
  {#snippet actions()}
    <Button variant="solid" size="large" external href={statusUrl}>Open status.me</Button>
    <StatusStoreLinks size="large" />
  {/snippet}
  {#snippet facts()}
    Web, iPhone and Android · No ads · No tracking · For 13 and over · Soft launched on the web,
    autumn 2026
  {/snippet}
</ProductHero>
