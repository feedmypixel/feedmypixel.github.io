import { render } from 'vitest-browser-svelte'
import { slides as pipesSlides } from '#lib/data/pipes.js'
import { slides as statusSlides } from '#lib/data/status.js'
import ScreenshotCarousel from './ScreenshotCarousel.svelte'

test('labels the strip and numbers a composed slide per entry', () => {
  render(ScreenshotCarousel, { props: { slides: pipesSlides, label: 'Pipes screenshots' } })
  expect(document.querySelector('.strip')?.getAttribute('aria-label')).toBe('Pipes screenshots')
  const numbers = [...document.querySelectorAll('.strip .number')].map(
    (number) => number.textContent
  )
  expect(numbers).toEqual(['01', '02', '03', '04'])
})

test('gives each slide its own layout and shots', () => {
  render(ScreenshotCarousel, { props: { slides: statusSlides, label: 'status screenshots' } })
  const [first] = document.querySelectorAll('.strip .shots')
  expect(first.classList.contains('phones')).toBe(true)
  expect(first.querySelectorAll('.shot')).toHaveLength(statusSlides[0].shots.length)
  expect(document.querySelectorAll('.strip .shots.devices')).toHaveLength(1)
})
