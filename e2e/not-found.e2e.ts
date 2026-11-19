import { expect, test, type Page } from '@playwright/test'
import { expectNoSeriousA11yViolations } from './fixtures/axe.ts'

const unknownPaths = ['/nope', '/nope/deeper/still']

// vite preview server-renders unknown paths; GitHub Pages answers with the built 404.html.
async function serveBuilt404LikeGitHubPages(page: Page, path: string) {
  await page.route(
    (url) => url.pathname === path,
    (route) =>
      route.fulfill({
        status: 404,
        contentType: 'text/html; charset=utf-8',
        path: 'build/404.html'
      })
  )
}

function collectFailedAssetRequests(page: Page, path: string) {
  const failedUrls: string[] = []
  page.on('response', (response) => {
    if (response.status() >= 400 && new URL(response.url()).pathname !== path) {
      failedUrls.push(response.url())
    }
  })
  return failedUrls
}

async function expectNotFoundPageWithAWayHome(page: Page, path: string) {
  const failedUrls = collectFailedAssetRequests(page, path)

  const response = await page.goto(path, { waitUntil: 'networkidle' })

  expect(response?.status()).toBe(404)
  expect(failedUrls).toEqual([])
  await expect(page.locator('main')).toHaveCSS('flex-grow', '1')
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible()
  await expect(page.getByRole('banner')).toBeVisible()
  await expect(page.getByRole('contentinfo')).toBeVisible()
  await expect(page.getByRole('link', { name: 'status', exact: true })).toHaveAttribute(
    'href',
    '/status'
  )
  await expect(page.getByRole('link', { name: 'Pipes', exact: true })).toHaveAttribute(
    'href',
    '/pipes'
  )

  await page.getByRole('link', { name: 'Go to the home page' }).click()
  await expect(page).toHaveURL('/')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Software that makes you smile' })
  ).toBeVisible()
}

for (const path of unknownPaths) {
  test.describe(`unknown path ${path}`, () => {
    test.beforeEach(async ({ page }) => {
      await serveBuilt404LikeGitHubPages(page, path)
    })

    test('shows the not-found page with header, footer and a link home', async ({ page }) => {
      await expectNotFoundPageWithAWayHome(page, path)
    })

    test('stays on the not-found page once the scripts have started', async ({ page }) => {
      await page.goto(path, { waitUntil: 'networkidle' })
      const theme = await page.locator('html').getAttribute('data-theme')
      await page.getByRole('button', { name: 'Switch colour theme' }).click()
      await expect(page.locator('html')).not.toHaveAttribute('data-theme', theme ?? '')
      await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible()
      await expect(page).toHaveURL(path)
    })

    test('has no serious a11y violations', async ({ page }) => {
      await page.goto(path)
      await expectNoSeriousA11yViolations(page)
    })

    test.describe('without JavaScript', () => {
      test.use({ javaScriptEnabled: false })

      test('still shows the page and the link home works', async ({ page }) => {
        await expectNotFoundPageWithAWayHome(page, path)
      })
    })
  })
}

test('the not-found page asks search engines not to index it', async ({ page }) => {
  await serveBuilt404LikeGitHubPages(page, '/nope')
  await page.goto('/nope')
  await expect(page).toHaveTitle('Page not found | feedMyPixel')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
})

test('the not-found page stays out of the sitemap and llms.txt', async ({ request }) => {
  for (const file of ['/sitemap.xml', '/llms.txt']) {
    const response = await request.get(file)
    expect(response.ok()).toBe(true)
    expect(await response.text()).not.toContain('/404')
  }
})
