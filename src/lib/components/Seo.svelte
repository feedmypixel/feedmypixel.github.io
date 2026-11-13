<script lang="ts">
  import { siteUrl } from '#lib/config.js'

  let {
    title,
    description,
    path = '/',
    structuredData,
    image = { url: `${siteUrl}/og-image.png`, width: 1200, height: 630 },
    imageAlt = 'feedMyPixel - Ben Chidgey, contract full-stack engineer'
  }: {
    title: string
    description: string
    path?: string
    structuredData?: string
    image?: { url: string; width: number; height: number }
    imageAlt?: string
  } = $props()

  const canonical = $derived(`${siteUrl}${path}`)
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
  <meta property="og:image" content={image.url} />
  <meta property="og:image:width" content={String(image.width)} />
  <meta property="og:image:height" content={String(image.height)} />
  <meta property="og:image:alt" content={imageAlt} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image.url} />
  <meta name="twitter:image:alt" content={imageAlt} />

  {#if safeStructuredData}
    {@html `<script type="application/ld+json">${safeStructuredData}<\/script>`}
  {/if}
</svelte:head>
