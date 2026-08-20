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
  const safeStructuredData = $derived(structuredData?.replaceAll('<', '\\u003c'))
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
  <meta property="og:locale" content="en_GB" />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="feedMyPixel - Ben Chidgey, contract full-stack engineer" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  <meta
    name="twitter:image:alt"
    content="feedMyPixel - Ben Chidgey, contract full-stack engineer"
  />

  {#if safeStructuredData}
    {@html `<script type="application/ld+json">${safeStructuredData}<\/script>`}
  {/if}
</svelte:head>
