import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import EmailPill from './EmailPill.svelte'
import { toasts } from '$lib/toasts.svelte'

beforeEach(() => {
  toasts.items = []
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('links the address for mail clients', async () => {
  render(EmailPill)
  const link = page.getByRole('link', { name: 'ben@feedmypixel.com' })
  await expect.element(link).toBeInTheDocument()
  expect(document.querySelector('a.address')?.getAttribute('href')).toBe(
    'mailto:ben@feedmypixel.com'
  )
})

test('copies the address and confirms it', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined)
  vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue({ writeText } as unknown as Clipboard)

  render(EmailPill)
  await page.getByRole('button', { name: 'Copy email address' }).click()

  expect(writeText).toHaveBeenCalledWith('ben@feedmypixel.com')
  await vi.waitFor(() => {
    expect(toasts.items.at(-1)).toMatchObject({
      kind: 'positive',
      message: 'Email address copied'
    })
  })
})

test('tells the reader what to do when the clipboard rejects', async () => {
  const writeText = vi.fn().mockRejectedValue(new Error('denied'))
  vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue({ writeText } as unknown as Clipboard)

  render(EmailPill)
  await page.getByRole('button', { name: 'Copy email address' }).click()

  await vi.waitFor(() => {
    expect(toasts.items.at(-1)).toMatchObject({
      kind: 'critical',
      message: 'Could not copy, select the address instead'
    })
  })
})

test('tells the reader what to do when there is no clipboard API', async () => {
  vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(undefined as unknown as Clipboard)

  render(EmailPill)
  await page.getByRole('button', { name: 'Copy email address' }).click()

  expect(toasts.items.at(-1)?.kind).toBe('critical')
})
