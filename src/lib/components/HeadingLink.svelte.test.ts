import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import HeadingLink from './HeadingLink.svelte'

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

const mockClipboard = (writeText: () => Promise<void>) =>
  vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue({ writeText } as unknown as Clipboard)

test('renders the heading at its level with an id made from its text', async () => {
  render(HeadingLink, { level: 3, text: 'Why I built it' })
  const heading = page.getByRole('heading', { level: 3, name: 'Why I built it' })
  await expect.element(heading).toHaveAttribute('id', 'why-i-built-it')
})

test('keeps a given id', async () => {
  render(HeadingLink, { text: 'Why I built it', id: 'why' })
  await expect.element(page.getByRole('heading', { level: 2 })).toHaveAttribute('id', 'why')
})

test('the link points at the heading and leaves the heading name clean', async () => {
  render(HeadingLink, { text: 'Permissions' })
  await expect
    .element(page.getByRole('link', { name: 'Copy link to Permissions' }))
    .toHaveAttribute('href', '#permissions')
  await expect
    .element(page.getByRole('heading', { name: 'Permissions', exact: true }))
    .toBeVisible()
})

test('copies the full url to the section and says so', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined)
  mockClipboard(writeText)

  render(HeadingLink, { text: 'Permissions' })
  await page.getByRole('link', { name: 'Copy link to Permissions' }).click()

  expect(writeText).toHaveBeenCalledWith(new URL('#permissions', location.href).href)
  await expect.element(page.getByRole('status')).toHaveTextContent('Copied')
})

test('the copied note clears itself', async () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  mockClipboard(vi.fn().mockResolvedValue(undefined))

  render(HeadingLink, { text: 'Permissions' })
  await page.getByRole('link', { name: 'Copy link to Permissions' }).click()
  await expect.element(page.getByRole('status')).toHaveTextContent('Copied')

  vi.advanceTimersByTime(2000)
  await expect.element(page.getByRole('status')).toHaveTextContent('')
})

test('jumps to the section when the clipboard rejects', async () => {
  mockClipboard(vi.fn().mockRejectedValue(new Error('denied')))

  render(HeadingLink, { text: 'Permissions' })
  await page.getByRole('link', { name: 'Copy link to Permissions' }).click()

  await vi.waitFor(() => expect(location.hash).toBe('#permissions'))
  await expect.element(page.getByRole('status')).toHaveTextContent('')
})
