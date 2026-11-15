import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import PipesScreenshots from './PipesScreenshots.svelte'

test('has the screenshots anchor and heading', async () => {
  render(PipesScreenshots)
  expect(document.querySelector('section#screenshots')).not.toBeNull()
  await expect
    .element(page.getByRole('heading', { level: 2 }))
    .toHaveTextContent('A popup for a glance, a side panel to keep open')
})

test('shows the home page Pipes carousel, counting four slides', () => {
  render(PipesScreenshots)
  const carousel = document.querySelector('figure.carousel')!
  expect(carousel.querySelector('[aria-label="Pipes screenshots"]')).not.toBeNull()
  expect(carousel.querySelectorAll('.strip > .slide')).toHaveLength(4)
  expect(carousel.querySelector('figcaption > .caption')?.textContent).toBe(
    '01 / 04  Status from your toolbar'
  )
})

test('tells the problem, solution and product', () => {
  render(PipesScreenshots)
  const labels = [...document.querySelectorAll('.label')].map((label) => label.textContent)
  expect(labels).toEqual(['Problem', 'Solution', 'Product'])
  expect(document.body.textContent).toContain('Fully client-side: no server, no tracking')
})
