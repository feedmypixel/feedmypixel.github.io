import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import ProductStory from './ProductStory.svelte'

const props = { problem: 'It hurts.', solution: 'This helps.', product: 'A web app.' }

test('tells the problem, solution and product in order', async () => {
  render(ProductStory, { props })
  const labels = [...document.querySelectorAll('.label')].map((label) => label.textContent)
  expect(labels).toEqual(['Problem', 'Solution', 'Product'])
  await expect.element(page.getByText('This helps.')).toBeVisible()
})

test('the three labels sit on the same line as each other', () => {
  render(ProductStory, { props })
  const tops = [...document.querySelectorAll<HTMLElement>('.label')].map(
    (label) =>
      Math.round(label.getBoundingClientRect().top) -
      Math.round((label.parentElement as HTMLElement).getBoundingClientRect().top)
  )
  expect(new Set(tops).size).toBe(1)
})
