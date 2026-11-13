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

test('shows nine screens, each with a light and a dark image', () => {
  render(StatusStory)
  const strip = document.querySelector('[aria-label="status screens"]')
  expect(strip?.getAttribute('tabindex')).toBe('0')
  expect(strip?.querySelectorAll('.screen')).toHaveLength(9)
  expect(strip?.querySelectorAll('img.light')).toHaveLength(9)
  expect(strip?.querySelectorAll('img.dark')).toHaveLength(9)
})

test('the screens move like the other carousels, with arrows, dots and a counter', () => {
  render(StatusStory)
  const carousel = document.querySelector('#story figure.carousel')!
  expect(carousel.querySelectorAll('.step')).toHaveLength(2)
  expect(carousel.querySelectorAll('.dot')).toHaveLength(9)
  expect(carousel.querySelector('figcaption > .caption')?.textContent).toBe('01 / 09  home')
})

test('names the screens by file stem', () => {
  render(StatusStory)
  const names = [...document.querySelectorAll('.screen-name')].map((name) => name.textContent)
  expect(names[0]).toBe('home')
  expect(names[8]).toBe('activity')
})

test('keeps the screens caption theme neutral', async () => {
  render(StatusStory)
  await expect
    .element(
      page.getByText(
        'Nine screens. Web app in a Capacitor shell, so the phone apps and the site are the same build.'
      )
    )
    .toBeVisible()
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

test('shows no store links while the apps are not live', () => {
  render(StatusStory)
  const hrefs = [...document.querySelectorAll('a')].map((link) => link.getAttribute('href'))
  expect(hrefs.some((href) => href?.includes('apple.com') || href?.includes('play.google'))).toBe(
    false
  )
  expect(document.body.textContent).toContain('iPhone')
  expect(document.body.textContent).toContain('Google Play')
})
