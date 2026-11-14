import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import PipesHero from './PipesHero.svelte'

test('names the product in the headline and the breadcrumb', async () => {
  render(PipesHero)
  await expect.element(page.getByRole('heading', { level: 1 })).toHaveTextContent('Pipes')
  const current = document.querySelector('nav[aria-label="Breadcrumb"] [aria-current="page"]')
  expect(current?.textContent).toBe('Pipes')
})

test('offers both store badges and the source, each in a new tab', async () => {
  render(PipesHero)
  const chrome = page.getByRole('link', { name: /^Available in the Chrome Web Store/ })
  const firefox = page.getByRole('link', { name: /^Get the add-on for Firefox/ })
  const source = page.getByRole('link', { name: /^Source/ })
  await expect
    .element(chrome)
    .toHaveAttribute('href', expect.stringContaining('chromewebstore.google.com/detail/'))
  await expect
    .element(firefox)
    .toHaveAttribute('href', expect.stringContaining('addons.mozilla.org/firefox/addon/pipes'))
  await expect.element(source).toHaveAttribute('href', 'https://github.com/feedmypixel/pipes')
  for (const link of [chrome, firefox, source]) {
    await expect.element(link).toHaveAttribute('target', '_blank')
  }
})

test('hero badges are the 56px size', () => {
  render(PipesHero)
  const badges = document.querySelectorAll('.actions .badge img')
  expect(badges).toHaveLength(2)
  badges.forEach((badge) => expect(badge.getBoundingClientRect().height).toBe(56))
})

test('the fact line links to the privacy policy on this site', async () => {
  render(PipesHero)
  const policy = page.getByRole('link', { name: 'Privacy policy' })
  await expect.element(policy).toHaveAttribute('href', '/pipes/privacy')
  expect(policy.element().getAttribute('target')).toBeNull()
  expect(document.querySelector('.facts')?.textContent?.replace(/\s+/g, ' ')).toContain(
    'Live in the Chrome Web Store and Firefox Add-ons, June 2026'
  )
})

test('keeps the hero out of the scroll reveal', () => {
  render(PipesHero)
  expect(document.querySelector('section')?.classList.contains('hero')).toBe(true)
})
