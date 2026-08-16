import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import ThemeToggle from './ThemeToggle.svelte'
import { toasts } from '$lib/toasts.svelte'

beforeEach(() => {
  document.documentElement.removeAttribute('data-theme')
  localStorage.clear()
  toasts.items = []
})

test('toggles the theme, persists it, and announces the change', async () => {
  render(ThemeToggle)
  const button = page.getByRole('button', { name: 'Switch colour theme' })

  await button.click()
  expect(document.documentElement.dataset.theme).toBe('dark')
  expect(localStorage.getItem('fmp-theme')).toBe('dark')
  expect(toasts.items.at(-1)?.message).toBe('Dark theme on')

  await button.click()
  expect(document.documentElement.dataset.theme).toBe('light')
  expect(localStorage.getItem('fmp-theme')).toBe('light')
})

test('still applies the theme when persistence throws', async () => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('storage unavailable')
  })
  render(ThemeToggle)
  await page.getByRole('button', { name: 'Switch colour theme' }).click()
  expect(document.documentElement.dataset.theme).toBe('dark')
  vi.restoreAllMocks()
})
