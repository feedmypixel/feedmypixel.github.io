import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import StatusStory from './StatusStory.svelte'

const sectionIds = ['why', 'how', 'claude', 'try', 'thanks']

test('has the story anchor and heading', async () => {
  render(StatusStory)
  expect(document.querySelector('section#story')).not.toBeNull()
  await expect
    .element(page.getByRole('heading', { level: 2 }))
    .toHaveTextContent('How and why I built status, with Claude, on SvelteKit')
})

test('has one heading per section, with the expected ids', () => {
  render(StatusStory)
  const ids = [...document.querySelectorAll('article h3')].map((heading) => heading.id)
  expect(ids).toEqual(sectionIds)
})

test('contents links match the section ids', () => {
  render(StatusStory)
  const hrefs = [...document.querySelectorAll('nav[aria-label="In this story"] a')].map((link) =>
    link.getAttribute('href')
  )
  expect(hrefs).toEqual(sectionIds.map((id) => `#${id}`))
  hrefs.forEach((href) => expect(document.querySelector(href as string)).not.toBeNull())
})

test('shows the web app on desktop and tablet as composed slides that follow the theme', () => {
  render(StatusStory)
  const carousel = document.querySelector('#story figure.carousel')!
  const strip = carousel.querySelector('[aria-label="status on the web"]')!
  expect(strip.querySelectorAll('.slide .caption')).toHaveLength(4)
  expect(strip.querySelectorAll('img.light')).toHaveLength(6)
  expect(strip.querySelectorAll('img.dark')).toHaveLength(6)
  expect(carousel.querySelector('figcaption > .caption')?.textContent).toBe(
    '01 / 04  Replies, with room to read'
  )
})

test('the web carousel sits in How it is built', () => {
  render(StatusStory)
  const how = document.querySelector('#how')!
  const claude = document.querySelector('#claude')!
  const carousel = document.querySelector('#story figure.carousel')!
  expect(how.compareDocumentPosition(carousel) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(carousel.compareDocumentPosition(claude) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})

test('uses the corrected sentence about checking the build', () => {
  render(StatusStory)
  const text = document.body.textContent?.replace(/\s+/g, ' ')
  expect(text).toContain(
    "Then I checked what was built by looking it over, making sure it's done correctly and iterating and teaching if it's not."
  )
})

test('opens every external link in a new tab', () => {
  render(StatusStory)
  const external = document.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')
  expect(external.length).toBeGreaterThan(10)
  external.forEach((link) => {
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
  })
})

test('links the apps to their stores', () => {
  render(StatusStory)
  const hrefs = [...document.querySelectorAll('a')].map((link) => link.getAttribute('href'))
  expect(hrefs).toContain('https://apps.apple.com/app/status-me/id6829789500')
  expect(hrefs).toContain('https://play.google.com/store/apps/details?id=app.status.me')
  expect(document.body.textContent).not.toContain('coming very soon')
})
