import { expect, test } from '@playwright/test'
import { expectNoSeriousA11yViolations } from './fixtures/axe.ts'
import { expectOutlineContrast } from './fixtures/contrast.ts'
import { appHasStarted, rememberConsent } from './fixtures/visitor.ts'

const publicRoutes = ['/', '/components', '/pipes', '/pipes/privacy', '/status']

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`in the ${colorScheme} theme`, () => {
    test.use({ colorScheme })

    test.afterEach(async ({ page }) => {
      await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme)
    })

    for (const route of publicRoutes) {
      test(`no serious a11y violations on ${route}`, async ({ page }) => {
        await page.goto(route)
        await expectNoSeriousA11yViolations(page)
      })
    }

    test('no serious a11y violations with contact form errors showing', async ({ page }) => {
      await rememberConsent(page, 'denied')
      await page.goto('/')
      await appHasStarted(page)
      await page.getByRole('button', { name: 'Send message' }).click()
      await expect(page.getByRole('alert')).toBeFocused()
      await expectNoSeriousA11yViolations(page)
    })
  })
}

for (const theme of ['light', 'dark']) {
  test.describe(`on a phone in the ${theme} theme`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 393, height: 852 })
      await page.addInitScript((stored) => localStorage.setItem('fmp-theme', stored), theme)
      await page.goto('/')
    })

    test('no serious a11y violations at the top of /', async ({ page }) => {
      await expectNoSeriousA11yViolations(page)
    })

    test('input borders reach 3:1', async ({ page }) => {
      await expectOutlineContrast(page.locator('#contact-name'))
      await expectOutlineContrast(page.locator('.field:has(> #cv-search)'))
    })
  })
}
