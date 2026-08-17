<script lang="ts">
  import { siteUrl } from '$lib/config'

  let {
    title,
    description,
    path = '/',
    structuredData
  }: { title: string; description: string; path?: string; structuredData?: string } = $props()

  const canonical = $derived(`${siteUrl}${path}`)
  const ogImage = `${siteUrl}/og-image.png`
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="feedMyPixel" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={ogImage} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />

  {#if structuredData}
    {@html `<script type="application/ld+json">${structuredData}<\/script>`}
  {/if}
</svelte:head>
