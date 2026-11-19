import { expect, test, type Page } from '@playwright/test'

const banner = (page: Page) => page.getByRole('dialog', { name: 'Cookie consent' })

const rememberConsent = (page: Page) =>
  page.addInitScript(() => localStorage.setItem('fmp-consent', 'denied'))

function luminance(colour: string) {
  const [red, green, blue] = (colour.match(/[\d.]+/g) ?? []).slice(0, 3).map((channel) => {
    const value = Number(channel) / 255
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function contrast(one: string, other: string) {
  const [lighter, darker] = [luminance(one), luminance(other)].sort((a, b) => b - a)
  return (lighter + 0.05) / (darker + 0.05)
}

test('answering the cookie banner on a first visit moves focus to the main content', async ({
  page
}) => {
  await page.goto('/')
  await expect(banner(page)).toBeFocused()
  await page.getByRole('button', { name: 'Decline' }).click()
  await expect(banner(page)).toBeHidden()
  await expect(page.locator('main')).toBeFocused()
})

test('answering a reopened cookie banner returns focus to cookie settings', async ({ page }) => {
  await rememberConsent(page)
  await page.goto('/')
  const cookieSettings = page.getByRole('button', { name: 'Cookie settings' })
  await cookieSettings.click()
  await expect(banner(page)).toBeFocused()
  await page.getByRole('button', { name: 'Accept analytics' }).click()
  await expect(banner(page)).toBeHidden()
  await expect(cookieSettings).toBeFocused()
})

test('after a mobile menu link the next Tab lands inside that section', async ({ page }) => {
  await rememberConsent(page)
  await page.setViewportSize({ width: 390, height: 800 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  const menuLink = page
    .getByRole('dialog', { name: 'Menu' })
    .getByRole('link', { name: 'Services' })
  await menuLink.click()
  await expect(menuLink).toBeHidden()
  await page.keyboard.press('Tab')
  await expect(page.locator('#services :focus')).toHaveCount(1)
})

test('the toast close button focus ring stands out in both themes', async ({ page }) => {
  await rememberConsent(page)
  await page.goto('/')
  const themeToggle = page.getByRole('button', { name: 'Switch colour theme' })

  for (const theme of ['dark', 'light']) {
    await themeToggle.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
    const toast = page.locator('.toast').last()
    const close = toast.getByRole('button', { name: 'Dismiss notification' })
    await close.focus()
    await expect(close).toHaveCSS('outline-style', 'solid')

    const ring = await close.evaluate((element) => getComputedStyle(element).outlineColor)
    const fill = await toast.evaluate((element) => getComputedStyle(element).backgroundColor)
    expect(contrast(ring, fill), `${theme} theme: ${ring} on ${fill}`).toBeGreaterThanOrEqual(3)
  }
})

test.describe('in forced colours', () => {
  test.use({ forcedColors: 'active' })

  test('the contact fields and the CV search show a focus outline', async ({ page }) => {
    await rememberConsent(page)
    await page.goto('/')

    for (const field of [page.getByLabel('Your name'), page.getByLabel('What are you building?')]) {
      await field.focus()
      await expect(field).toHaveCSS('outline-style', 'solid')
    }

    const search = page.getByRole('combobox', { name: 'Search' })
    await search.focus()
    await expect(page.locator('.field', { has: search })).toHaveCSS('outline-style', 'solid')
  })
})
