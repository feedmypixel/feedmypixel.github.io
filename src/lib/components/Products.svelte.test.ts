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

test('links the source and says where the extension is headed', async () => {
  render(Products)
  const source = page.getByRole('link', { name: 'Source' })
  await expect.element(source).toBeInTheDocument()
  expect(document.querySelector<HTMLAnchorElement>('a.button')?.href).toContain(
    'github.com/feedmypixel/pipes'
  )
  await expect
    .element(page.getByText('Coming to the Chrome Web Store and Firefox Add-ons'))
    .toBeVisible()
})

test('does not offer store links while the extension is unpublished', () => {
  render(Products)
  const hrefs = [...document.querySelectorAll('a')].map((link) => link.getAttribute('href') ?? '')
  expect(
    hrefs.some((href) => href.includes('chromewebstore') || href.includes('addons.mozilla'))
  ).toBe(false)
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
