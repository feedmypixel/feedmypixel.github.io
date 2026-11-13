import { render } from 'vitest-browser-svelte'
import { createRawSnippet } from 'svelte'
import ExternalLink from './ExternalLink.svelte'

const children = createRawSnippet(() => ({ render: () => '<span>Fastify</span>' }))

test('opens in a new tab and says so to screen readers', () => {
  render(ExternalLink, { props: { href: 'https://fastify.dev', children } })
  const link = document.querySelector('a')
  expect(link?.getAttribute('target')).toBe('_blank')
  expect(link?.getAttribute('rel')).toBe('noopener noreferrer')
  expect(link?.textContent).toContain('(opens in a new tab)')
})
