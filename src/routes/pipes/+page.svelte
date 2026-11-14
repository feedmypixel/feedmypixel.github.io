<script lang="ts">
  import { pipesShareImage } from '#lib/config.js'
  import Seo from '#lib/components/Seo.svelte'
  import PipesHero from '#lib/components/pipes/PipesHero.svelte'
  import PipesScreenshots from '#lib/components/pipes/PipesScreenshots.svelte'
  import PipesStory from '#lib/components/pipes/PipesStory.svelte'
</script>

<Seo
  title="Pipes - CI/CD pipeline monitoring in your browser | feedMyPixel"
  description="Pipes: CI/CD pipeline monitoring that lives in your browser and goes loud the moment a default branch breaks. How and why Ben Chidgey built it with Svelte 5, Manifest V3 and Claude."
  path="/pipes"
  image={pipesShareImage}
  imageAlt="Pipes - main broke? you'll know."
/>

<PipesHero />
<PipesScreenshots />
<PipesStory />
