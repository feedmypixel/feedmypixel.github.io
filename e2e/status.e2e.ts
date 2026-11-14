import { expect, test, type Page } from '@playwright/test'

const counter = (page: Page, stripLabel: string) =>
  page
    .locator('figure.carousel', { has: page.getByLabel(stripLabel, { exact: true }) })
    .locator('figcaption > .caption')

test('the status page renders and links back to the home page', async ({ page }) => {
  await page.goto('/status')
  await expect(page.getByRole('heading', { level: 1, name: 'status' })).toBeVisible()
  await page
    .getByRole('navigation', { name: 'Breadcrumb' })
    .getByRole('link', { name: 'feedMyPixel', exact: true })
    .click()
  await page.waitForURL((url) => url.pathname === '/')
})

test('the status page does not scroll sideways on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 })
  await page.goto('/status')
  await expect(page.locator('#story figcaption .dot').first()).toBeVisible()
  const { scrollWidth, clientWidth } = await page.evaluate(() => {
    const { scrollWidth, clientWidth } = document.documentElement
    return { scrollWidth, clientWidth }
  })
  expect(scrollWidth).toBe(clientWidth)
})

test('the home page links to the status build story', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'How I built it status' }).click()
  await page.waitForURL('**/status')
  await expect(page.getByRole('heading', { level: 1, name: 'status' })).toBeVisible()
})

test('the chevrons move the frame strip and its counter on /status', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/status')
  const strip = page.getByLabel('status store screenshots', { exact: true })
  await strip.scrollIntoViewIfNeeded()
  await page.locator('#screenshots').getByRole('button', { name: 'Next screenshot' }).click()
  await expect(counter(page, 'status store screenshots')).toHaveText('02 / 07  People')
  await expect.poll(() => strip.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0)
  await page.waitForTimeout(400)
  await expect(counter(page, 'status store screenshots')).toHaveText('02 / 07  People')
})

test('a frame near the end stays chosen when the strip cannot scroll to its start', async ({
  page
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/status')
  const strip = page.getByLabel('status store screenshots', { exact: true })
  await strip.scrollIntoViewIfNeeded()
  await page.locator('#screenshots').getByRole('button', { name: 'Show Year' }).click()
  await expect
    .poll(() =>
      strip.evaluate((element) =>
        Math.round(element.scrollWidth - element.clientWidth - element.scrollLeft)
      )
    )
    .toBeLessThanOrEqual(2)
  await page.waitForTimeout(400)
  await expect(counter(page, 'status store screenshots')).toHaveText('05 / 07  Year')
})

test('the chevrons move the home status carousel and it stays put', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#products')
  const strip = page.getByLabel('status screenshots', { exact: true })
  const next = page
    .locator('figure.carousel', { has: strip })
    .getByRole('button', { name: 'Next screenshot' })
  await next.click()
  await next.click()
  await expect(counter(page, 'status screenshots')).toHaveText('03 / 07  Your status with an emoji')
  await page.waitForTimeout(800)
  const slideWidth = await strip.evaluate((element) => element.clientWidth + 16)
  await expect
    .poll(() => strip.evaluate((element) => Math.round(element.scrollLeft)))
    .toBe(slideWidth * 2)
})

test('screenshots follow the theme and the hidden theme is never downloaded', async ({ page }) => {
  const requested: string[] = []
  page.on('request', (request) => requested.push(new URL(request.url()).pathname))
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/status')
  await page.locator('#story').scrollIntoViewIfNeeded()
  await page.getByLabel('status screens', { exact: true }).scrollIntoViewIfNeeded()
  await expect.poll(() => requested.some((path) => path.includes('/screens/light/'))).toBe(true)
  expect(requested.some((path) => path.includes('/screens/dark/'))).toBe(false)

  await page.getByRole('button', { name: 'Switch colour theme' }).click()
  const firstScreen = page
    .getByLabel('status screens', { exact: true })
    .locator('img:visible')
    .first()
  await expect(firstScreen).toHaveAttribute('src', /\/screens\/dark\/01-home/)
})
