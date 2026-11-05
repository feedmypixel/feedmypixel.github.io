import { toasts } from './toasts.svelte.js'

beforeEach(() => {
  vi.useFakeTimers()
  toasts.items = []
})

afterEach(() => {
  vi.useRealTimers()
})

test('keeps a toast until six seconds have passed', () => {
  toasts.push('info', 'Hello there')
  vi.advanceTimersByTime(5999)
  expect(toasts.items).toHaveLength(1)
  vi.advanceTimersByTime(1)
  expect(toasts.items).toHaveLength(0)
})
