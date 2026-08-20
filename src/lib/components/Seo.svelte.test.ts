import { render } from 'vitest-browser-svelte'
import Seo from './Seo.svelte'

const props = {
  title: 'feedMyPixel - test',
  description: 'A description used by the tests.'
}

function headContent(selector: string) {
  return document.head.querySelector(selector)?.getAttribute('content')
}

test('renders the canonical, locale and image metadata', () => {
  render(Seo, { props: { ...props, path: '/components' } })

  expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
    'https://feedmypixel.com/components'
  )
  expect(headContent('meta[property="og:locale"]')).toBe('en_GB')
  expect(headContent('meta[property="og:image:width"]')).toBe('1200')
  expect(headContent('meta[property="og:image:alt"]')).toContain('Ben Chidgey')
  expect(headContent('meta[name="twitter:image:alt"]')).toContain('Ben Chidgey')
})

test('a closing script tag in structured data cannot break out of the script element', () => {
  const hostile = JSON.stringify({
    '@context': 'https://schema.org',
    name: '</script><script>window.pwned = true</script>'
  })

  render(Seo, { props: { ...props, structuredData: hostile } })

  const scripts = document.head.querySelectorAll('script[type="application/ld+json"]')
  expect(scripts.length).toBe(1)
  expect(scripts[0].textContent).not.toContain('</script>')
  expect(JSON.parse(scripts[0].textContent ?? '{}').name).toBe(
    '</script><script>window.pwned = true</script>'
  )
  expect(Reflect.get(window, 'pwned')).toBeUndefined()
})
