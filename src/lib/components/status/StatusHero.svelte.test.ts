import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import StatusHero from './StatusHero.svelte'
import '#lib/styles/patterns.css'

let main: HTMLElement | undefined

afterEach(() => {
  main?.remove()
})

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

test('offers the web app and both app stores', async () => {
  render(StatusHero)
  expect(document.querySelectorAll('a.button')).toHaveLength(3)
  await expect.element(page.getByRole('link', { name: /^App Store/ })).toBeVisible()
  await expect.element(page.getByRole('link', { name: /^Google Play/ })).toBeVisible()
  expect(document.body.textContent).toContain('Web, iPhone and Android')
})

test('keeps the hero out of the scroll reveal its sibling sections get', () => {
  main = document.createElement('main')
  main.id = 'main'
  main.appendChild(document.createElement('section'))
  document.body.appendChild(main)
  render(StatusHero, { target: main })
  const [sibling, hero] = [...main.querySelectorAll(':scope > section')].map(
    (section) => getComputedStyle(section).animationName
  )
  expect(sibling).toBe('rise-in')
  expect(hero).toBe('none')
})
