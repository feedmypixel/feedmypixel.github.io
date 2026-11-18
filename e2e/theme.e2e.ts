import { expect, test } from '@playwright/test'

for (const theme of ['light', 'dark']) {
  test(`native controls and scrollbars follow the ${theme} theme`, async ({ page }) => {
    await page.addInitScript((stored) => localStorage.setItem('fmp-theme', stored), theme)
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
    await expect(page.locator('html')).toHaveCSS('color-scheme', theme)
  })
}
