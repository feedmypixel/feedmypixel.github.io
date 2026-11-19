import { expect, test, type Page } from '@playwright/test'
import { appHasStarted, rememberConsent } from './fixtures/visitor.ts'

const menuButton = (page: Page) => page.getByRole('button', { name: 'Open menu' })

async function openMenuOnAPhone(page: Page) {
  await page.setViewportSize({ width: 393, height: 852 })
  await rememberConsent(page, 'denied')
  await page.goto('/')
  await appHasStarted(page)
  await menuButton(page).click()
  const menuLinks = page.getByRole('dialog', { name: 'Menu' }).getByRole('link')
  await expect(menuLinks.first()).toBeVisible()
  return menuLinks
}

test('on a phone a menu link lands on its section and the menu closes', async ({ page }) => {
  const menuLinks = await openMenuOnAPhone(page)
  await menuLinks.filter({ hasText: 'Contact' }).click()
  await expect(menuLinks).toHaveCount(0)
  await expect(page).toHaveURL(/#contact$/)
  await expect(page.locator('#contact')).toBeInViewport()
})

test('on a phone Escape closes the menu and focus returns to the menu button', async ({ page }) => {
  const menuLinks = await openMenuOnAPhone(page)
  await page.keyboard.press('Escape')
  await expect(menuLinks).toHaveCount(0)
  await expect(menuButton(page)).toBeFocused()
})
