import { siteUrl } from '$lib/config'

export const prerender = true

const pages = [
  { path: '/', priority: '1.0' },
  { path: '/components', priority: '0.5' },
  { path: '/pipes/privacy', priority: '0.3' }
]

export function GET() {
  const urls = pages
    .map(
      ({ path, priority }) =>
        `  <url>\n    <loc>${siteUrl}${path === '/' ? '/' : path}</loc>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join('\n')

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

  return new Response(body, { headers: { 'Content-Type': 'application/xml' } })
}
