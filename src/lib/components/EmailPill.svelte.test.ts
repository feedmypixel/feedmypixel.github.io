import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import EmailPill from './EmailPill.svelte'

afterEach(() => {
  vi.restoreAllMocks()
  window.getSelection()?.removeAllRanges()
})

const mockClipboard = (clipboard: Partial<Clipboard> | undefined) =>
  vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(clipboard as Clipboard)

const selectedText = () => window.getSelection()?.toString()

test('links the address for mail clients', async () => {
  render(EmailPill)
  const link = page.getByRole('link', { name: 'ben@feedmypixel.com' })
  await expect.element(link).toBeInTheDocument()
  expect(document.querySelector('a.address')?.getAttribute('href')).toBe(
    'mailto:ben@feedmypixel.com'
  )
})

test('copies the address and says so beside it', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined)
  mockClipboard({ writeText })

  render(EmailPill)
  await page.getByRole('button', { name: 'Copy email address' }).click()

  expect(writeText).toHaveBeenCalledWith('ben@feedmypixel.com')
  await expect.element(page.getByRole('status')).toHaveTextContent('Copied')
})

test('selects the address to copy by hand when the clipboard rejects', async () => {
  mockClipboard({ writeText: vi.fn().mockRejectedValue(new Error('denied')) })

  render(EmailPill)
  await page.getByRole('button', { name: 'Copy email address' }).click()

  await vi.waitFor(() => expect(selectedText()).toBe('ben@feedmypixel.com'))
  await expect.element(page.getByRole('link', { name: 'ben@feedmypixel.com' })).toHaveFocus()
  await expect.element(page.getByRole('status')).toHaveTextContent('')
})

test('selects the address to copy by hand when there is no clipboard API', async () => {
  mockClipboard(undefined)

  render(EmailPill)
  await page.getByRole('button', { name: 'Copy email address' }).click()

  await vi.waitFor(() => expect(selectedText()).toBe('ben@feedmypixel.com'))
})
