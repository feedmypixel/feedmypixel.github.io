import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import Products from './Products.svelte'

test('anchors the products section for the nav', () => {
  render(Products)
  expect(document.querySelector('section#products')).not.toBeNull()
})

test('introduces Pipes', async () => {
  render(Products)
  await expect.element(page.getByRole('heading', { name: 'Pipes' })).toBeInTheDocument()
  await expect.element(page.getByText(/CI\/CD pipeline monitoring/)).toBeVisible()
})

test('offers both stores and the source', async () => {
  render(Products)
  await expect.element(page.getByRole('link', { name: 'Chrome Web Store' })).toBeInTheDocument()
  await expect.element(page.getByRole('link', { name: 'Firefox Add-ons' })).toBeInTheDocument()
  await expect.element(page.getByRole('link', { name: 'Source' })).toBeInTheDocument()

  const hrefs = [...document.querySelectorAll<HTMLAnchorElement>('a.button')].map(
    (link) => link.href
  )
  expect(hrefs[0]).toContain('chromewebstore.google.com/detail/')
  expect(hrefs[1]).toContain('addons.mozilla.org/firefox/addon/pipes')
  expect(hrefs[2]).toContain('github.com/feedmypixel/pipes')
})

test('tells the problem, solution and product story', async () => {
  render(Products)
  await expect.element(page.getByText('Problem')).toBeVisible()
  await expect.element(page.getByText('Solution')).toBeVisible()
  await expect.element(page.getByText('Product', { exact: true })).toBeVisible()
})

test('shows the Pipes screenshots', () => {
  render(Products)
  expect(document.querySelectorAll('.strip img')).toHaveLength(4)
})

test('the three story labels sit on the same line as each other', () => {
  render(Products)
  const tops = [...document.querySelectorAll<HTMLElement>('.story .label')].map(
    (label) =>
      Math.round(label.getBoundingClientRect().top) -
      Math.round((label.parentElement as HTMLElement).getBoundingClientRect().top)
  )
  expect(tops).toHaveLength(3)
  expect(new Set(tops).size).toBe(1)
})
