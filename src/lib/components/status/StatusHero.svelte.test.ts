import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import StatusHero from './StatusHero.svelte'

test('names the product in the headline and the breadcrumb', async () => {
  render(StatusHero)
  await expect.element(page.getByRole('heading', { level: 1 })).toHaveTextContent('status')
  const current = document.querySelector('nav[aria-label="Breadcrumb"] [aria-current="page"]')
  expect(current?.textContent).toBe('status')
})

test('breadcrumb links back to the home page and its products', () => {
  render(StatusHero)
  const hrefs = [...document.querySelectorAll('nav[aria-label="Breadcrumb"] a')].map((link) =>
    link.getAttribute('href')
  )
  expect(hrefs).toEqual(['/', '/#products'])
})

test('opens status.me in a new tab', () => {
  render(StatusHero)
  const link = document.querySelector<HTMLAnchorElement>('a.button.solid')
  expect(link?.getAttribute('href')).toBe('https://status.me')
  expect(link?.getAttribute('target')).toBe('_blank')
})

test('shows no store links while the apps are not live', () => {
  render(StatusHero)
  expect(document.querySelectorAll('a.button')).toHaveLength(1)
})

test('keeps the hero out of the scroll reveal', () => {
  render(StatusHero)
  expect(document.querySelector('section')?.classList.contains('hero')).toBe(true)
})
