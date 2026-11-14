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

test('spells out PRs and MRs in why I built it', () => {
  render(PipesStory)
  expect(document.body.textContent?.replace(/\s+/g, ' ')).toContain(
    'my pull requests (PRs) and merge requests (MRs) are in'
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

test('Built with Claude is one paragraph pointing at the status workflow', async () => {
  render(PipesStory)
  const workflow = page.getByRole('link', { name: 'that workflow' })
  await expect.element(workflow).toHaveAttribute('href', '/status#claude')
  expect(document.querySelectorAll('#story article ul')).toHaveLength(1)
  expect(document.querySelector('.tip')).toBeNull()
})

test('Try it offers both store badges at 52px', () => {
  render(PipesStory)
  const badges = document.querySelectorAll('#story .actions .badge img')
  expect(badges).toHaveLength(2)
  badges.forEach((badge) => expect(badge.getBoundingClientRect().height).toBe(52))
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
