import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import ErrorPage from './ErrorPage.svelte'

test('a 404 says the page was not found and offers the way home and the products', async () => {
  render(ErrorPage, { status: 404 })

  await expect
    .element(page.getByRole('heading', { level: 1, name: 'Page not found' }))
    .toBeVisible()
  await expect
    .element(page.getByRole('link', { name: 'Go to the home page' }))
    .toHaveAttribute('href', '/')
  await expect
    .element(page.getByRole('link', { name: 'status', exact: true }))
    .toHaveAttribute('href', '/status')
  await expect
    .element(page.getByRole('link', { name: 'Pipes', exact: true }))
    .toHaveAttribute('href', '/pipes')
})

test('a 404 sets the page title and asks not to be indexed', () => {
  render(ErrorPage, { status: 404 })

  expect(document.title).toBe('Page not found | feedMyPixel')
  expect(document.head.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
    'noindex'
  )
})

test('any other error says something went wrong and still offers the way home', async () => {
  render(ErrorPage, { status: 500 })

  await expect
    .element(page.getByRole('heading', { level: 1, name: 'Something went wrong' }))
    .toBeVisible()
  await expect
    .element(page.getByRole('link', { name: 'Go to the home page' }))
    .toHaveAttribute('href', '/')
  expect(document.title).toBe('Something went wrong | feedMyPixel')
})
