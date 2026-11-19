import { expect, test, type Page } from '@playwright/test'
import { appHasStarted, rememberConsent } from './fixtures/visitor.ts'

const menuButton = (page: Page) => page.getByRole('button', { name: 'Open menu' })

async function openMenuOnAPhone(page: Page) {
  await page.setViewportSize({ width: 393, height: 852 })
  await rememberConsent(page, 'denied')
  await page.goto('/')
  await appHasStarted(page)
  await menuButton(page).click()
  const menu = page.getByRole('dialog', { name: 'Menu' })
  await expect(menu).toBeVisible()
  return menu
}

test('on a phone a menu link lands on its section and the menu closes', async ({ page }) => {
  const menu = await openMenuOnAPhone(page)
  await menu.getByRole('link', { name: 'Contact' }).click()
  await expect(menu).toBeHidden()
  await expect(page).toHaveURL(/#contact$/)
  await expect(page.locator('#contact')).toBeInViewport()
})

test('on a phone Escape closes the menu and focus returns to the menu button', async ({ page }) => {
  const menu = await openMenuOnAPhone(page)
  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await expect(menuButton(page)).toBeFocused()
})
