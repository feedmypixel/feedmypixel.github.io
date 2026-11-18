import { render } from 'vitest-browser-svelte'
import DownloadArrow from './DownloadArrow.svelte'

test('renders a decorative 15px arrow', () => {
  render(DownloadArrow)
  const arrow = document.querySelector('svg')
  expect(arrow?.getAttribute('width')).toBe('15')
  expect(arrow?.getAttribute('height')).toBe('15')
  expect(arrow?.getAttribute('aria-hidden')).toBe('true')
})
