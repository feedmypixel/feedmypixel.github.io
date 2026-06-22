import { test } from '@playwright/test'
import { expectNoSeriousA11yViolations } from './fixtures/axe.ts'

const publicRoutes = ['/']

for (const route of publicRoutes) {
  test(`no serious a11y violations on ${route}`, async ({ page }) => {
    await page.goto(route)
    await expectNoSeriousA11yViolations(page)
  })
}
