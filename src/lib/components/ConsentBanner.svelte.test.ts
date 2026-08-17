import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import ConsentBanner from './ConsentBanner.svelte'
import { consent, CONSENT_KEY } from '$lib/consent.svelte'
import { toasts } from '$lib/toasts.svelte'

beforeEach(() => {
  localStorage.removeItem(CONSENT_KEY)
  consent.choice = 'unknown'
  toasts.items = []
})

afterEach(() => {
  vi.restoreAllMocks()
})

const banner = () => document.querySelector('[role="dialog"][aria-label="Cookie consent"]')

test('asks before anything is loaded', async () => {
  render(ConsentBanner)
  await vi.waitFor(() => expect(banner()).not.toBeNull())
  await expect.element(page.getByRole('button', { name: 'Accept analytics' })).toBeInTheDocument()
  await expect.element(page.getByRole('button', { name: 'Decline' })).toBeInTheDocument()
})

test('sits under the header in the page rather than covering it', async () => {
  render(ConsentBanner)
  await vi.waitFor(() => expect(banner()).not.toBeNull())
  const styles = getComputedStyle(banner() as HTMLElement)
  expect(styles.position).toBe('sticky')
})

test('describes itself for screen readers and points at the copy', async () => {
  render(ConsentBanner)
  await vi.waitFor(() => expect(banner()).not.toBeNull())
  expect(banner()?.getAttribute('aria-describedby')).toBe('consent-copy')
  expect(document.querySelector('#consent-copy')?.textContent).toContain('Google Analytics')
})

test('links out to the privacy policy', async () => {
  render(ConsentBanner)
  await vi.waitFor(() => expect(banner()).not.toBeNull())
  const link = document.querySelector<HTMLAnchorElement>('#consent-copy a')
  expect(link?.href).toContain('policies.google.com/privacy')
  expect(link?.textContent).toContain('Read more')
  expect(link?.getAttribute('target')).toBe('_blank')
  expect(link?.getAttribute('rel')).toBe('noopener noreferrer')
})

test('accepting is remembered, confirmed and closes the banner', async () => {
  render(ConsentBanner)
  await vi.waitFor(() => expect(banner()).not.toBeNull())
  await page.getByRole('button', { name: 'Accept analytics' }).click()

  expect(toasts.items.at(-1)).toMatchObject({
    kind: 'positive',
    message: 'Analytics on, thank you'
  })
  await vi.waitFor(() => {
    expect(consent.choice).toBe('granted')
    expect(banner()).toBeNull()
  })
  expect(localStorage.getItem(CONSENT_KEY)).toBe('granted')
})

test('declining is remembered, acknowledged and closes the banner', async () => {
  render(ConsentBanner)
  await vi.waitFor(() => expect(banner()).not.toBeNull())
  await page.getByRole('button', { name: 'Decline' }).click()

  expect(toasts.items.at(-1)).toMatchObject({ kind: 'info', message: 'Analytics stays off' })
  await vi.waitFor(() => {
    expect(consent.choice).toBe('denied')
    expect(banner()).toBeNull()
  })
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
