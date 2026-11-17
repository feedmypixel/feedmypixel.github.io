import { Copier } from './copier.svelte.js'

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

const mockClipboard = (writeText: () => Promise<void>) =>
  vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue({ writeText } as unknown as Clipboard)

test('shows copied for two seconds after a copy', async () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  mockClipboard(vi.fn().mockResolvedValue(undefined))
  const copier = new Copier()

  expect(await copier.copy('text')).toBe(true)
  expect(copier.copied).toBe(true)

  vi.advanceTimersByTime(2000)
  expect(copier.copied).toBe(false)
})

test('a second copy restarts the two seconds', async () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  mockClipboard(vi.fn().mockResolvedValue(undefined))
  const copier = new Copier()

  await copier.copy('text')
  vi.advanceTimersByTime(1500)
  await copier.copy('text')
  vi.advanceTimersByTime(1500)
  expect(copier.copied).toBe(true)

  vi.advanceTimersByTime(500)
  expect(copier.copied).toBe(false)
})

test('reports a failed copy and shows nothing', async () => {
  mockClipboard(vi.fn().mockRejectedValue(new Error('denied')))
  const copier = new Copier()

  expect(await copier.copy('text')).toBe(false)
  expect(copier.copied).toBe(false)
})
