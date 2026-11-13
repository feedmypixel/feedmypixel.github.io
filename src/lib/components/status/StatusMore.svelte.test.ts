import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import StatusMore from './StatusMore.svelte'

test('has the more anchor and heading', async () => {
  render(StatusMore)
  expect(document.querySelector('section#more')).not.toBeNull()
  await expect
    .element(page.getByRole('heading', { level: 2 }))
    .toHaveTextContent('status is the second product. Pipes came first.')
})

test('links back to the home page sections', () => {
  render(StatusMore)
  const links = [...document.querySelectorAll('a.button')].map((link) => [
    link.textContent?.trim(),
    link.getAttribute('href')
  ])
  expect(links).toEqual([
    ['Home', '/'],
    ['Pipes', '/#products'],
    ['Experience', '/#experience'],
    ['Contact', '/#contact']
  ])
})

test('leads with the solid Home button', () => {
  render(StatusMore)
  expect(document.querySelector('a.button.solid')?.textContent?.trim()).toBe('Home')
})
