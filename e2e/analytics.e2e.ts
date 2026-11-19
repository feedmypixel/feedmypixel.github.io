import { expect, test, type Page } from '@playwright/test'
import { appHasStarted, rememberConsent } from './fixtures/visitor.ts'

const googleDomains = ['googletagmanager.com', 'google-analytics.com', 'doubleclick.net']

const isGoogle = ({ hostname }: URL) =>
  googleDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`))

const banner = (page: Page) => page.getByRole('dialog', { name: 'Cookie consent' })

async function recordGoogleRequests(page: Page) {
  const requested: string[] = []
  await page.route(isGoogle, (route) => {
    requested.push(route.request().url())
    return route.fulfill({ contentType: 'text/javascript', body: '' })
  })
  return requested
}

const analyticsTag = [expect.stringContaining('googletagmanager.com/gtag/js?id=G-')]

test('nothing is requested from Google before a choice is made', async ({ page }) => {
  const requested = await recordGoogleRequests(page)
  await page.goto('/')
  await expect(banner(page)).toBeFocused()
  await page.waitForLoadState('networkidle')
  expect(requested).toEqual([])
})

test('accepting requests the analytics tag', async ({ page }) => {
  const requested = await recordGoogleRequests(page)
  await page.goto('/')
  await expect(banner(page)).toBeFocused()
  await page.getByRole('button', { name: 'Accept analytics' }).click()
  await expect.poll(() => requested).toEqual(analyticsTag)
})

test('declining requests nothing from Google, then or on the next visit', async ({ page }) => {
  const requested = await recordGoogleRequests(page)
  await page.goto('/')
  await expect(banner(page)).toBeFocused()
  await page.getByRole('button', { name: 'Decline' }).click()
  await expect(banner(page)).toBeHidden()
  await page.reload()
  await appHasStarted(page)
  await page.waitForLoadState('networkidle')
  expect(requested).toEqual([])
})

test('a returning visitor who accepted gets the analytics tag without being asked', async ({
  page
}) => {
  const requested = await recordGoogleRequests(page)
  await rememberConsent(page, 'granted')
  await page.goto('/')
  await expect.poll(() => requested).toEqual(analyticsTag)
  await expect(banner(page)).toBeHidden()
})

test('Global Privacy Control requests nothing from Google, even after an earlier yes', async ({
  page
}) => {
  const requested = await recordGoogleRequests(page)
  await rememberConsent(page, 'granted')
  await page.addInitScript(() =>
    Object.defineProperty(Navigator.prototype, 'globalPrivacyControl', { get: () => true })
  )
  await page.goto('/')
  await appHasStarted(page)
  await page.waitForLoadState('networkidle')
  expect(requested).toEqual([])
})
