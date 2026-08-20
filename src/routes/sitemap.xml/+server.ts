import { siteUrl } from '$lib/config'

export const prerender = true

const pages = [
  { path: '/', priority: '1.0', lastmod: '2026-08-20' },
  { path: '/components', priority: '0.5', lastmod: '2026-08-18' },
  { path: '/pipes/privacy', priority: '0.3', lastmod: '2026-08-17' }
]

export function GET() {
  const urls = pages
    .map(
      ({ path, priority, lastmod }) =>
        `  <url>\n    <loc>${siteUrl}${path === '/' ? '/' : path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join('\n')

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

  return new Response(body, { headers: { 'Content-Type': 'application/xml' } })
}
