<script lang="ts">
  import { resolve } from '$app/paths'
  import { pipesChromeUrl, pipesFirefoxUrl, pipesSourceUrl } from '#lib/config.js'
  import { pitch } from '#lib/data/pipes.js'
  import Button from '../Button.svelte'
  import GitHubMark from '../GitHubMark.svelte'
  import ProductHero from '../product/ProductHero.svelte'
</script>

<ProductHero
  name="Pipes"
  {pitch}
  lead="Watches the repos you choose across GitHub Actions and GitLab CI/CD. A badge in your toolbar, a popup for a glance and a side panel to keep open."
>
  {#snippet actions()}
    <Button variant="solid" size="large" external href={pipesChromeUrl}>Chrome Web Store</Button>
    <Button variant="ghost" size="large" external href={pipesFirefoxUrl}>Firefox Add-ons</Button>
    <Button variant="ghost" size="large" external href={pipesSourceUrl}>
      <GitHubMark />
      Source
    </Button>
  {/snippet}
  {#snippet facts()}
    Chrome and Firefox · No server · No tracking · Read-only tokens, kept in your browser ·
    <a href={resolve('/pipes/privacy')}>Privacy policy</a> · Live in the Chrome Web Store and Firefox
    Add-ons, summer 2026
  {/snippet}
</ProductHero>
