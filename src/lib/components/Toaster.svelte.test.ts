import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import Toaster from './Toaster.svelte'
import { toasts } from '#lib/toasts.svelte.js'

beforeEach(() => {
  toasts.items = []
})

test('is a live region before any toast arrives, so each toast is announced once', async () => {
  render(Toaster)
  const region = page.getByRole('region', { name: 'Notifications' })
  await expect.element(region).toHaveAttribute('aria-live', 'polite')

  toasts.push('info', 'Hello there')
  await expect.element(region).toHaveTextContent('Hello there')
  expect(document.querySelector('.toaster [role="status"]')).toBeNull()
})

test('renders toasts pushed to the store and removes them on dismiss', async () => {
  render(Toaster)
  toasts.push('info', 'Hello there')
  await expect.element(page.getByText('Hello there')).toBeVisible()
  await page.getByRole('button', { name: 'Dismiss notification' }).click()
  await expect.element(page.getByText('Hello there')).not.toBeInTheDocument()
})
