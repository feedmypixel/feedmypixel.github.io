<script lang="ts">
  import { statusShareImage } from '#lib/config.js'
  import Seo from '#lib/components/Seo.svelte'
  import StatusHero from '#lib/components/status/StatusHero.svelte'
  import StatusMore from '#lib/components/status/StatusMore.svelte'
  import StatusScreenshots from '#lib/components/status/StatusScreenshots.svelte'
  import StatusStory from '#lib/components/status/StatusStory.svelte'
</script>

<Seo
  title="status - an emoji and your status | feedMyPixel"
  description="status: an emoji and your status. Break the ice and spark a conversation. React, reply and natter. Built by Ben Chidgey with SvelteKit, Fastify and Claude."
  path="/status"
  image={statusShareImage}
  imageAlt="status - an emoji and your status"
/>

<StatusHero />
<StatusScreenshots />
<StatusStory />
<StatusMore />
