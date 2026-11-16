import { expect, test, type Page } from '@playwright/test'

const banner = (page: Page) => page.getByRole('dialog', { name: 'Cookie consent' })

const remember = (page: Page, choice: string) =>
  page.addInitScript((stored) => localStorage.setItem('fmp-consent', stored), choice)

test.describe('before the app loads', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/_app/**/*.js', (route) => route.abort())
  })

  for (const choice of ['granted', 'denied']) {
    test(`a visitor who ${choice} consent never sees the banner`, async ({ page }) => {
      await remember(page, choice)
      await page.goto('/')
      await expect(banner(page)).toBeHidden()
    })
  }

  test('a first-time visitor sees the banner', async ({ page }) => {
    await page.goto('/')
    await expect(banner(page)).toBeVisible()
  })
})

test('cookie settings brings the banner back after a choice', async ({ page }) => {
  await remember(page, 'granted')
  await page.goto('/')
  await expect(banner(page)).toBeHidden()
  await expect(page.locator('html')).not.toHaveAttribute('data-consent-decided')
  await page.getByRole('button', { name: 'Cookie settings' }).click()
  await expect(banner(page)).toBeVisible()
})
