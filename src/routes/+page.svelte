<script lang="ts">
  import Seo from '$lib/components/Seo.svelte'
  import Hero from '$lib/components/Hero.svelte'
  import Products from '$lib/components/Products.svelte'
  import Experience from '$lib/components/Experience.svelte'
  import Contact from '$lib/components/Contact.svelte'
  import { homeStructuredData } from '$lib/seo/structured-data'
</script>

<Seo
  title="feedMyPixel - Ben Chidgey, contract full-stack engineer"
  description="Ben Chidgey. Contract full-stack engineer. Twenty years building for the Guardian, the BBC and UK government. Searchable CV, products and contact."
  structuredData={homeStructuredData()}
/>

<Hero />
<Products />
<Experience />
<Contact />
