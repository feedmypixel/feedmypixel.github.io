import { expect, test, type Page } from '@playwright/test'

// Mirrors what Google's tag does with window['ga-disable-<id>'], so nothing reaches Google.
const tagStandIn = `
  const id = new URL(document.currentScript.src).searchParams.get('id')
  const reportPageView = () => {
    if (window['ga-disable-' + id]) return
    if (!document.cookie.includes('_ga=')) document.cookie = '_ga=GA1.1.new; path=/'
    fetch('https://www.google-analytics.com/g/collect?en=page_view', { mode: 'no-cors' })
  }
  reportPageView()
  navigation.addEventListener('currententrychange', reportPageView)
`

const banner = (page: Page) => page.getByRole('dialog', { name: 'Cookie consent' })

const googleCookies = async (page: Page) =>
  (await page.context().cookies()).filter((cookie) => cookie.name.startsWith('_ga'))

async function interceptGoogle(page: Page) {
  const requests: string[] = []
  await page.route('https://www.googletagmanager.com/**', (route) =>
    route.fulfill({ contentType: 'application/javascript', body: tagStandIn })
  )
  await page.route('https://www.google-analytics.com/**', (route) => {
    requests.push(route.request().url())
    return route.fulfill({ status: 204 })
  })

  // The marker request lands after any page view already on its way, so the count is settled.
  return async function countPageViews() {
    await page.evaluate(() => fetch('https://www.google-analytics.com/marker', { mode: 'no-cors' }))
    return requests.filter((url) => url.includes('en=page_view')).length
  }
}

async function choose(page: Page, choice: 'Accept analytics' | 'Decline') {
  await page.getByRole('button', { name: choice }).click()
  await expect(banner(page)).toBeHidden()
}

async function reopenCookieSettings(page: Page) {
  await page.getByRole('button', { name: 'Cookie settings' }).click()
  await expect(banner(page)).toBeVisible()
}

async function followFooterLink(page: Page, name: string, url: string) {
  await page.getByRole('contentinfo').getByRole('link', { name }).click()
  await page.waitForURL(url)
}

test('withdrawing consent stops analytics at once and removes its cookies', async ({ page }) => {
  const countPageViews = await interceptGoogle(page)
  await page.goto('/')
  await choose(page, 'Accept analytics')
  await expect.poll(countPageViews).toBeGreaterThan(0)
  expect(await googleCookies(page)).toHaveLength(1)
  const pageViewsWhileAccepted = await countPageViews()

  await reopenCookieSettings(page)
  await choose(page, 'Decline')
  await followFooterLink(page, 'Components', '**/components')

  expect(await countPageViews()).toBe(pageViewsWhileAccepted)
  expect(await googleCookies(page)).toHaveLength(0)
})

test('accepting again after withdrawing resumes analytics on the same page', async ({ page }) => {
  const countPageViews = await interceptGoogle(page)
  await page.goto('/')
  await choose(page, 'Accept analytics')
  await expect.poll(countPageViews).toBeGreaterThan(0)
  await reopenCookieSettings(page)
  await choose(page, 'Decline')
  const pageViewsBeforeAcceptingAgain = await countPageViews()

  await reopenCookieSettings(page)
  await choose(page, 'Accept analytics')
  await followFooterLink(page, 'Components', '**/components')

  expect(await countPageViews()).toBeGreaterThan(pageViewsBeforeAcceptingAgain)
  expect(await page.locator('script[src*="googletagmanager.com"]').count()).toBe(1)
})

test('a returning visitor who accepted keeps their analytics cookie', async ({ page, baseURL }) => {
  await interceptGoogle(page)
  await page.addInitScript(() => localStorage.setItem('fmp-consent', 'granted'))
  await page.context().addCookies([{ name: '_ga', value: 'GA1.1.returning', url: baseURL }])

  await page.goto('/')
  await expect(page.locator('script[src*="googletagmanager.com"]')).toBeAttached()

  const [cookie] = await googleCookies(page)
  expect(cookie.value).toBe('GA1.1.returning')
})
