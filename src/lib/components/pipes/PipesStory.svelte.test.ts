import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import PipesStory from './PipesStory.svelte'

const sectionIds = ['why', 'how', 'claude', 'try', 'thanks']

test('has the story anchor and heading', async () => {
  render(PipesStory)
  expect(document.querySelector('section#story')).not.toBeNull()
  await expect
    .element(page.getByRole('heading', { level: 2 }))
    .toHaveTextContent('How and why I built Pipes, with Claude.')
})

test('contents links match one heading per section', () => {
  render(PipesStory)
  const ids = [...document.querySelectorAll('article h3')].map((heading) => heading.id)
  const hrefs = [...document.querySelectorAll('nav[aria-label="In this story"] a')].map((link) =>
    link.getAttribute('href')
  )
  expect(ids).toEqual(sectionIds)
  expect(hrefs).toEqual(sectionIds.map((id) => `#${id}`))
})

test('uses the edited copy in why I built it and how it is built', () => {
  render(PipesStory)
  const text = document.body.textContent?.replace(/\s+/g, ' ')
  expect(text).toContain('my pull requests (PRs) and merge requests (MRs) are in')
  expect(text).toContain(
    "Add this to a team and it becomes a very simple way to see what's going on with your work."
  )
  expect(text).toContain(
    "The browser is where I am a lot when I'm making applications, so something on the side that I can easily read out of the corner of my eye felt ideal."
  )
  expect(text).toContain(
    'I had always wanted to build a browser extension as I use them a lot, so this ticked all the boxes.'
  )
})

test('lists the stack', () => {
  render(PipesStory)
  const terms = [...document.querySelectorAll('dt')].map((term) => term.textContent)
  expect(terms).toEqual(['Extension', 'Build', 'Stores', 'Source', 'Built with'])
})

test('shows the five framed store shots in the shared carousel, unthemed', () => {
  render(PipesStory)
  const carousel = document.querySelector('#story figure.carousel')!
  const images = carousel.querySelectorAll('[aria-label="Pipes store screenshots"] img')
  expect(images).toHaveLength(5)
  expect(carousel.querySelectorAll('img.dark')).toHaveLength(0)
  images.forEach((image) => expect(image.getAttribute('loading')).toBe('lazy'))
  expect(carousel.querySelector('figcaption > .caption')?.textContent).toBe('01 / 05  Side panel')
})

test('the framed carousel sits in How it is built, after the stack paragraph', () => {
  render(PipesStory)
  const how = document.querySelector('#how')!
  const claude = document.querySelector('#claude')!
  const carousel = document.querySelector('#story figure.carousel')!
  expect(how.compareDocumentPosition(carousel) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(carousel.compareDocumentPosition(claude) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})

test('Built with Claude is one paragraph, with no tip box or list', () => {
  render(PipesStory)
  const text = document.body.textContent?.replace(/\s+/g, ' ')
  expect(text).toContain('with my own skills (opens in a new tab).')
  expect(text).not.toContain('Pipes came first')
  expect(document.querySelectorAll('#story article ul')).toHaveLength(1)
  expect(document.querySelector('.tip')).toBeNull()
})

test('Try it offers both stores, Chrome first as the solid action', () => {
  render(PipesStory)
  const actions = [...document.querySelectorAll('#story .actions > a.button')]
  expect(actions.map((action) => action.textContent?.replace(/\s+/g, ' ').trim())).toEqual([
    'Chrome Web Store (opens in a new tab)',
    'Firefox Add-ons (opens in a new tab)'
  ])
  expect(actions[0].classList.contains('solid')).toBe(true)
})

test('opens every external link in a new tab', () => {
  render(PipesStory)
  const external = document.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')
  expect(external.length).toBeGreaterThan(15)
  external.forEach((link) => {
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
  })
})
