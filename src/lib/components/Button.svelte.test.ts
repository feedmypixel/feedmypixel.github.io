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

test('marks a download link as a download', () => {
  render(ButtonHarness, { props: { href: '/cv.pdf', download: true, label: 'CV' } })
  expect(document.querySelector('a.button')?.hasAttribute('download')).toBe(true)
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
