import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import StatusScreenshots from './StatusScreenshots.svelte'

test('has the screenshots anchor and heading', async () => {
  render(StatusScreenshots)
  expect(document.querySelector('section#screenshots')).not.toBeNull()
  await expect
    .element(page.getByRole('heading', { level: 2 }))
    .toHaveTextContent('Post. React. Reply. Natter.')
})

test('shows the same composed carousel as the home page', () => {
  render(StatusScreenshots)
  const strip = document.querySelector('[aria-label="status screenshots"]')!
  expect(strip.querySelectorAll('.slide .caption')).toHaveLength(11)
  expect(strip.querySelector('.slide .caption')?.textContent).toBe('How is everyone?')
})

test('tells the problem, solution and the longer product description', () => {
  render(StatusScreenshots)
  const text = document.body.textContent
  expect(text).toContain('Keeping in touch takes more than it should.')
  expect(text).toContain('Push notifications and fingerprint or face app lock')
})
