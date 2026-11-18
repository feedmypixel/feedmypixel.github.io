import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
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

test('the large size is a 48px target with base-size text', () => {
  render(ButtonHarness, { props: { size: 'large', label: 'Open status.me' } })
  const button = document.querySelector<HTMLElement>('.button')!
  const style = getComputedStyle(button)
  expect(style.minHeight).toBe('48px')
  expect(style.fontSize).toBe(getComputedStyle(document.documentElement).fontSize)
})

test('the default size stays a 44px target', () => {
  render(ButtonHarness, { props: { label: 'Source' } })
  expect(getComputedStyle(document.querySelector('.button')!).minHeight).toBe('44px')
})

test('carries the ghost variant', () => {
  render(ButtonHarness, { props: { variant: 'ghost', label: 'Source' } })
  expect(document.querySelector('.button')?.classList.contains('ghost')).toBe(true)
})

test('a download link saves under the name it is given', () => {
  render(ButtonHarness, { props: { href: '/cv.pdf', download: 'BenChidgeyCV.pdf', label: 'CV' } })
  expect(document.querySelector('a.button')?.getAttribute('download')).toBe('BenChidgeyCV.pdf')
})

test('an external link opens in a new tab, safely, and says so', async () => {
  render(ButtonHarness, { props: { href: 'https://example.com', external: true, label: 'Store' } })
  const link = document.querySelector('a.button')
  expect(link?.getAttribute('target')).toBe('_blank')
  expect(link?.getAttribute('rel')).toBe('noopener noreferrer')
  await expect
    .element(page.getByRole('link', { name: 'Store (opens in a new tab)' }))
    .toBeInTheDocument()
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
