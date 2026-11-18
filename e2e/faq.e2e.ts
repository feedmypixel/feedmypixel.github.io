import { expect, test } from '@playwright/test'

const answerTransition = (page: import('@playwright/test').Page) =>
  page
    .locator('details.faq')
    .first()
    .evaluate((faq) => getComputedStyle(faq, '::details-content').transitionDuration)

test('the FAQ answers animate open by default', async ({ page }) => {
  await page.goto('/')
  expect(await answerTransition(page)).not.toMatch(/^0s/)
})

test('the FAQ answers open without animation under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  expect(await answerTransition(page)).toBe('0s')
})
