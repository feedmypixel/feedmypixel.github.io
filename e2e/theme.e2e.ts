import { expect, test, type Page } from '@playwright/test'
import { appHasStarted, rememberConsent } from './fixtures/visitor.ts'

const rememberTheme = (page: Page, theme: string) =>
  page.addInitScript((stored) => localStorage.setItem('fmp-theme', stored), theme)

const html = (page: Page) => page.locator('html')

test.describe('before the app loads', () => {
  let blockedAppScripts: number

  test.beforeEach(async ({ page }) => {
    blockedAppScripts = 0
    await page.route('**/_app/**/*.js', (route) => {
      blockedAppScripts += 1
      return route.abort()
    })
  })

  test.afterEach(() => {
    expect(blockedAppScripts).toBeGreaterThan(0)
  })

  test('a stored dark choice beats a light system', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await rememberTheme(page, 'dark')
    await page.goto('/')
    await expect(html(page)).toHaveAttribute('data-theme', 'dark')
  })

  test('a stored light choice beats a dark system', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await rememberTheme(page, 'light')
    await page.goto('/')
    await expect(html(page)).toHaveAttribute('data-theme', 'light')
  })

  for (const colorScheme of ['light', 'dark'] as const) {
    test(`with no stored choice a ${colorScheme} system gets the ${colorScheme} theme`, async ({
      page
    }) => {
      await page.emulateMedia({ colorScheme })
      await page.goto('/')
      await expect(html(page)).toHaveAttribute('data-theme', colorScheme)
    })
  }
})

for (const theme of ['light', 'dark']) {
  test(`native controls and scrollbars follow the ${theme} theme`, async ({ page }) => {
    await rememberTheme(page, theme)
    await page.goto('/')
    await expect(html(page)).toHaveAttribute('data-theme', theme)
    await expect(html(page)).toHaveCSS('color-scheme', theme)
  })
}

test('the theme chosen with the toggle survives a reload', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await rememberConsent(page, 'denied')
  await page.goto('/')
  await appHasStarted(page)
  await page.getByRole('button', { name: 'Switch colour theme' }).click()
  await expect(html(page)).toHaveAttribute('data-theme', 'dark')
  await page.reload()
  await expect(html(page)).toHaveAttribute('data-theme', 'dark')
})
