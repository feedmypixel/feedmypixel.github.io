import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import Toaster from './Toaster.svelte'
import { toasts } from '$lib/toasts.svelte'

beforeEach(() => {
  toasts.items = []
})

test('renders toasts pushed to the store and removes them on dismiss', async () => {
  render(Toaster)
  toasts.push('info', 'Hello there')
  await expect.element(page.getByText('Hello there')).toBeVisible()
  await page.getByRole('button', { name: 'Dismiss notification' }).click()
  await expect.element(page.getByText('Hello there')).not.toBeInTheDocument()
})
