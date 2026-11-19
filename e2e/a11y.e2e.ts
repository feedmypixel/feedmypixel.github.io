import { test } from '@playwright/test'
import { expectNoSeriousA11yViolations } from './fixtures/axe.ts'
import { expectOutlineContrast } from './fixtures/contrast.ts'

const publicRoutes = ['/', '/components', '/pipes', '/pipes/privacy', '/status']

for (const route of publicRoutes) {
  test(`no serious a11y violations on ${route}`, async ({ page }) => {
    await page.goto(route)
    await expectNoSeriousA11yViolations(page)
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

    test('inactive carousel dots reach 3:1', async ({ page }) => {
      await expectOutlineContrast(page.locator('.dot:not([aria-current])').first(), '::before')
    })
  })
}
