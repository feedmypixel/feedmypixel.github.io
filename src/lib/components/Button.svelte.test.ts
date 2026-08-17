import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import Button from './Button.svelte'
import ButtonHarness from './Button.harness.svelte'

test('renders a link when given an href', async () => {
  render(ButtonHarness, { props: { href: '/somewhere', label: 'Download CV' } })
  const link = page.getByRole('link', { name: 'Download CV' })
  await expect.element(link).toBeInTheDocument()
  expect(document.querySelector('a.button')?.classList.contains('solid')).toBe(true)
})

test('renders a button when given no href', async () => {
  render(ButtonHarness, { props: { label: 'Send message' } })
  await expect.element(page.getByRole('button', { name: 'Send message' })).toBeInTheDocument()
})

test('carries the ghost variant', () => {
  render(ButtonHarness, { props: { variant: 'ghost', label: 'Source' } })
  expect(document.querySelector('.button')?.classList.contains('ghost')).toBe(true)
})

test('a download link saves under the name it is given', () => {
  render(ButtonHarness, { props: { href: '/cv.pdf', download: 'BenChidgeyCV.pdf', label: 'CV' } })
  expect(document.querySelector('a.button')?.getAttribute('download')).toBe('BenChidgeyCV.pdf')
})

test('an external link opens in a new tab, safely, and says so', () => {
  render(ButtonHarness, { props: { href: 'https://example.com', external: true, label: 'Store' } })
  const link = document.querySelector('a.button')
  expect(link?.getAttribute('target')).toBe('_blank')
  expect(link?.getAttribute('rel')).toBe('noopener noreferrer')
  expect(link?.textContent).toContain('opens in a new tab')
})

test('an internal link stays in the tab', () => {
  render(ButtonHarness, { props: { href: '/somewhere', label: 'Internal' } })
  const link = document.querySelector('a.button')
  expect(link?.getAttribute('target')).toBeNull()
  expect(link?.textContent).not.toContain('opens in a new tab')
})

test('calls onclick', async () => {
  const onclick = vi.fn()
  render(ButtonHarness, { props: { label: 'Clear all filters', onclick } })
  await page.getByRole('button', { name: 'Clear all filters' }).click()
  expect(onclick).toHaveBeenCalledOnce()
})

test('is exported as the default component', () => {
  expect(Button).toBeTypeOf('function')
})
