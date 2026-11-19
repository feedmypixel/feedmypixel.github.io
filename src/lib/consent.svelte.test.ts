import { consent, CONSENT_KEY } from './consent.svelte'

const storageUnavailable = () => {
  throw new Error('storage unavailable')
}

beforeEach(() => {
  localStorage.removeItem(CONSENT_KEY)
  consent.choice = 'unknown'
})

afterEach(() => {
  vi.restoreAllMocks()
  Reflect.deleteProperty(navigator, 'globalPrivacyControl')
})

test('Global Privacy Control is honoured as a decline, even over an earlier yes', () => {
  localStorage.setItem(CONSENT_KEY, 'granted')
  Object.defineProperty(navigator, 'globalPrivacyControl', { value: true, configurable: true })
  consent.init()
  expect(consent.choice).toBe('denied')
})

test('a corrupt stored value is treated as never asked', () => {
  localStorage.setItem(CONSENT_KEY, 'yes please')
  consent.choice = 'granted'
  consent.init()
  expect(consent.choice).toBe('unknown')
})

test('storage that cannot be read is treated as never asked', () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(storageUnavailable)
  consent.choice = 'granted'
  consent.init()
  expect(consent.choice).toBe('unknown')
})

test('a choice still applies when storage cannot be written', () => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(storageUnavailable)
  consent.grant()
  expect(consent.choice).toBe('granted')
  consent.deny()
  expect(consent.choice).toBe('denied')
})

test('asking again forgets the stored answer', () => {
  consent.grant()
  expect(localStorage.getItem(CONSENT_KEY)).toBe('granted')
  consent.ask()
  expect(consent.choice).toBe('unknown')
  expect(localStorage.getItem(CONSENT_KEY)).toBeNull()
})

test('asking again still works when storage cannot be cleared', () => {
  consent.choice = 'granted'
  vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(storageUnavailable)
  consent.ask()
  expect(consent.choice).toBe('unknown')
})
