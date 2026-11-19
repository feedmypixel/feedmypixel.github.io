import { expect, test } from '@playwright/test'
import { appHasStarted, rememberConsent } from './fixtures/visitor.ts'

test('the skip link is the first stop and carries the keyboard past the header', async ({
  page
}) => {
  await rememberConsent(page, 'denied')
  await page.goto('/')
  await appHasStarted(page)

  await page.keyboard.press('Tab')
  const skipLink = page.getByRole('link', { name: 'Skip to content' })
  await expect(skipLink).toBeFocused()
  await expect(skipLink).toBeInViewport()

  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main$/)
  await page.keyboard.press('Tab')
  await expect(page.locator('#main :focus')).toHaveCount(1)
})
