import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import ConsentBanner from './ConsentBanner.svelte'
import { consent, CONSENT_KEY } from '$lib/consent.svelte'

beforeEach(() => {
  localStorage.removeItem(CONSENT_KEY)
  consent.choice = 'unknown'
})

afterEach(() => {
  vi.restoreAllMocks()
})

const banner = () => document.querySelector('[role="dialog"][aria-label="Analytics cookies"]')

test('asks before anything is loaded', async () => {
  render(ConsentBanner)
  await vi.waitFor(() => expect(banner()).not.toBeNull())
  await expect.element(page.getByRole('button', { name: 'Accept analytics' })).toBeInTheDocument()
  await expect.element(page.getByRole('button', { name: 'Decline' })).toBeInTheDocument()
})

test('accepting is remembered and closes the banner', async () => {
  render(ConsentBanner)
  await vi.waitFor(() => expect(banner()).not.toBeNull())
  await page.getByRole('button', { name: 'Accept analytics' }).click()

  await vi.waitFor(() => expect(banner()).toBeNull())
  expect(consent.choice).toBe('granted')
  expect(localStorage.getItem(CONSENT_KEY)).toBe('granted')
})

test('declining is remembered and closes the banner', async () => {
  render(ConsentBanner)
  await vi.waitFor(() => expect(banner()).not.toBeNull())
  await page.getByRole('button', { name: 'Decline' }).click()

  await vi.waitFor(() => expect(banner()).toBeNull())
  expect(consent.choice).toBe('denied')
  expect(localStorage.getItem(CONSENT_KEY)).toBe('denied')
})

test('a previous answer is not asked again', async () => {
  localStorage.setItem(CONSENT_KEY, 'denied')
  render(ConsentBanner)
  await vi.waitFor(() => expect(consent.choice).toBe('denied'))
  expect(banner()).toBeNull()
})

test('a browser-level opt-out is honoured without asking', async () => {
  vi.spyOn(navigator, 'doNotTrack', 'get').mockReturnValue('1')
  render(ConsentBanner)
  await vi.waitFor(() => expect(consent.choice).toBe('denied'))
  expect(banner()).toBeNull()
  expect(localStorage.getItem(CONSENT_KEY)).toBeNull()
})

test('the banner takes focus so it is announced', async () => {
  render(ConsentBanner)
  await vi.waitFor(() => {
    expect(document.activeElement).toBe(banner())
  })
})
