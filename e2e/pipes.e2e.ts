import { expect, test, type Page } from '@playwright/test'

const counter = (page: Page, stripLabel: string) =>
  page
    .locator('figure.carousel', { has: page.getByLabel(stripLabel, { exact: true }) })
    .locator('figcaption > .caption')

test('the home page links to the Pipes build story', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'How I built it Pipes' }).click()
  await page.waitForURL('**/pipes')
  await expect(page.getByRole('heading', { level: 1, name: 'Pipes' })).toBeVisible()
})

test('the Pipes page links back to the home page', async ({ page }) => {
  await page.goto('/pipes')
  await page
    .getByRole('navigation', { name: 'Breadcrumb' })
    .getByRole('link', { name: 'feedMyPixel', exact: true })
    .click()
  await page.waitForURL((url) => url.pathname === '/')
})

test('the Pipes page does not scroll sideways on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 })
  await page.goto('/pipes')
  await expect(page.locator('#story figcaption .dot').first()).toBeVisible()
  const { scrollWidth, clientWidth } = await page.evaluate(() => {
    const { scrollWidth, clientWidth } = document.documentElement
    return { scrollWidth, clientWidth }
  })
  expect(scrollWidth).toBe(clientWidth)
})

test('the chevrons move the framed store set and its counter', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/pipes')
  const strip = page.getByLabel('Pipes store screenshots', { exact: true })
  await strip.scrollIntoViewIfNeeded()
  await page.locator('#story').getByRole('button', { name: 'Next screenshot' }).click()
  await expect(counter(page, 'Pipes store screenshots')).toHaveText('02 / 05  Author attribution')
  await expect.poll(() => strip.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0)
  await page.waitForTimeout(400)
  await expect(counter(page, 'Pipes store screenshots')).toHaveText('02 / 05  Author attribution')
})

test('the build story points at the status workflow section', async ({ page }) => {
  await page.goto('/pipes')
  await page.getByRole('link', { name: 'that workflow' }).click()
  await page.waitForURL('**/status#claude')
  await expect(page.locator('#claude')).toBeInViewport()
})

test('the fact line links to the privacy policy', async ({ page }) => {
  await page.goto('/pipes')
  await page.getByRole('link', { name: 'Privacy policy' }).click()
  await page.waitForURL('**/pipes/privacy')
  await expect(page.getByRole('heading', { level: 1, name: 'Privacy policy' })).toBeVisible()
})

test('the store badge artwork loads', async ({ page }) => {
  await page.goto('/pipes')
  const badges = page.locator('.hero .badge img')
  await expect(badges).toHaveCount(2)
  for (const badge of await badges.all()) {
    await expect
      .poll(() => badge.evaluate((image: HTMLImageElement) => image.naturalWidth))
      .toBeGreaterThan(0)
  }
})
