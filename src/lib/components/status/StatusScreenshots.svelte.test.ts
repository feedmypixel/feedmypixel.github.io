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

test('shows the seven store frames, lazy and sized', () => {
  render(StatusScreenshots)
  const images = document.querySelectorAll('.strip img')
  expect(images).toHaveLength(7)
  images.forEach((image) => {
    expect(image.getAttribute('loading')).toBe('lazy')
    expect(image.getAttribute('width')).not.toBeNull()
    expect(image.getAttribute('height')).not.toBeNull()
  })
})

test('numbers each frame and labels the strip', () => {
  render(StatusScreenshots)
  const captions = [...document.querySelectorAll('.strip figcaption')].map((caption) =>
    caption.textContent?.replace(/\s+/g, ' ').trim()
  )
  expect(captions[0]).toBe('01 Everyone')
  expect(captions[6]).toBe('07 No ads')
  expect(document.querySelector('[aria-label="status store screenshots"]')).not.toBeNull()
})

test('tells the problem, solution and the longer product description', () => {
  render(StatusScreenshots)
  const text = document.body.textContent
  expect(text).toContain('Keeping in touch takes more than it should.')
  expect(text).toContain('Push notifications and fingerprint or face app lock')
})
