import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import StoreBadge from './StoreBadge.svelte'

const chromeUrl = 'https://chromewebstore.google.com/detail/pipes/abc'

test('links to the listing in a new tab, named by the official artwork', async () => {
  render(StoreBadge, { props: { store: 'chrome', href: chromeUrl } })
  const link = page.getByRole('link', {
    name: 'Available in the Chrome Web Store (opens in a new tab)'
  })
  await expect.element(link).toHaveAttribute('href', chromeUrl)
  await expect.element(link).toHaveAttribute('target', '_blank')
  await expect.element(link).toHaveAttribute('rel', 'noopener noreferrer')
})

test('shows the official Firefox artwork', async () => {
  render(StoreBadge, { props: { store: 'firefox', href: 'https://addons.mozilla.org/x' } })
  const image = page.getByRole('img', { name: 'Get the add-on for Firefox' })
  await expect
    .element(image)
    .toHaveAttribute('src', expect.stringMatching(/badges\/firefox-add-ons\.svg$/))
})

test('the default size is 52px tall and the large size 56px', () => {
  render(StoreBadge, { props: { store: 'chrome', href: chromeUrl } })
  render(StoreBadge, { props: { store: 'chrome', href: chromeUrl, size: 'large' } })
  const [standard, large] = document.querySelectorAll('img')
  expect(standard.getBoundingClientRect().height).toBe(52)
  expect(large.getBoundingClientRect().height).toBe(56)
})

test('keeps the artwork in proportion', () => {
  render(StoreBadge, { props: { store: 'chrome', href: chromeUrl } })
  const image = document.querySelector('img')!
  const { width, height } = image.getBoundingClientRect()
  expect(width / height).toBeCloseTo(496 / 150, 1)
})
