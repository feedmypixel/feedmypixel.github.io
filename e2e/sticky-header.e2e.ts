import { expect, test, type Locator, type Page } from '@playwright/test'

const headerHeight = (page: Page) =>
  page.getByRole('banner').evaluate((header) => header.clientHeight)

const topOf = (locator: Locator) =>
  locator.evaluate((element) => Math.round(element.getBoundingClientRect().top))

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('fmp-consent', 'denied'))
  await page.emulateMedia({ reducedMotion: 'reduce' })
})

test('a control sitting under the header is scrolled clear of it when focused', async ({
  page
}) => {
  await page.goto('/')
  const link = page.getByRole('link', { name: 'Ask me directly' })
  await link.evaluate((element) =>
    window.scrollTo(0, window.scrollY + element.getBoundingClientRect().top)
  )
  await link.focus()
  await expect(link).toBeInViewport()
  expect(await topOf(link)).toBeGreaterThanOrEqual(await headerHeight(page))
})

test('a section link lands the section clear of the header', async ({ page }) => {
  await page.goto('/#contact')
  const section = page.locator('#contact')
  await expect(section).toBeInViewport()
  expect(await topOf(section)).toBeGreaterThanOrEqual(await headerHeight(page))
})

test('a deep link to a heading lands the heading in view', async ({ page }) => {
  await page.goto('/status')
  const id = await page.locator('main :is(h2, h3)[id]').first().getAttribute('id')
  await page.goto(`/status#${id}`)
  const heading = page.locator(`[id="${id}"]`)
  await expect(heading).toBeInViewport()
  expect(await topOf(heading)).toBeGreaterThanOrEqual(await headerHeight(page))
})
