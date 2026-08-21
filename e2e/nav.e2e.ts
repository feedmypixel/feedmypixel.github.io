import { expect, test } from '@playwright/test'

const activeLinks = (page: import('@playwright/test').Page) =>
  page.evaluate(() =>
    [...document.querySelectorAll('nav[aria-label="Sections"] a')]
      .filter((link) => link.classList.contains('active'))
      .map((link) => link.textContent?.trim())
  )

test('the section nav does not stay marked after leaving the one-pager', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight }))
  await expect.poll(() => activeLinks(page)).toEqual(['Contact'])

  await page.getByRole('link', { name: 'Components' }).click()
  await page.waitForURL('**/components')

  await expect.poll(() => activeLinks(page)).toEqual([])
})

test('the catalogue demo section does not light the nav', async ({ page }) => {
  await page.goto('/components')
  await page.locator('#services').scrollIntoViewIfNeeded()
  await expect.poll(() => activeLinks(page)).toEqual([])
})

test('section highlighting still works on the one-pager', async ({ page }) => {
  await page.goto('/')
  await page.locator('#products').scrollIntoViewIfNeeded()
  await expect.poll(() => activeLinks(page)).toEqual(['Products'])
})
