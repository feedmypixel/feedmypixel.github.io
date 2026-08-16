import { render } from 'vitest-browser-svelte'
import Logo from './Logo.svelte'

test('renders the pixel mark at the given size', () => {
  render(Logo, { props: { size: 48 } })
  const svg = document.querySelector('svg.logo')
  expect(svg?.getAttribute('width')).toBe('48')
  expect(svg?.querySelectorAll('.pixel')).toHaveLength(2)
})

test('defaults to 26px', () => {
  render(Logo)
  expect(document.querySelector('svg.logo')?.getAttribute('width')).toBe('26')
})
