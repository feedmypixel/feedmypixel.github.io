import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import CarouselHarness from './Carousel.harness.svelte'

const renderCarousel = (slideWidth?: string) => render(CarouselHarness, { props: { slideWidth } })

const clickStep = (direction: 'prev' | 'next') =>
  document.querySelector<HTMLButtonElement>(`.${direction}`)?.click()

const currentDot = () =>
  [...document.querySelectorAll('.dot')].findIndex(
    (dot) => dot.getAttribute('aria-current') === 'true'
  )

const caption = () => document.querySelector('.caption')?.textContent

test('renders every slide through the snippet', () => {
  renderCarousel()
  expect(document.querySelectorAll('.strip .card')).toHaveLength(3)
})

test('the scroll strip is labelled and keyboard reachable', () => {
  renderCarousel()
  const strip = document.querySelector('.strip')
  expect(strip?.getAttribute('aria-label')).toBe('Pipes screenshots')
  expect(strip?.getAttribute('tabindex')).toBe('0')
})

test('captions the first slide with its number out of the total', () => {
  renderCarousel()
  expect(caption()).toBe('01 / 03  Status from your toolbar')
  expect(currentDot()).toBe(0)
})

test('a dot moves the carousel to that slide', async () => {
  renderCarousel()
  document.querySelectorAll<HTMLButtonElement>('.dot')[2].click()
  await vi.waitFor(() => expect(caption()).toBe('03 / 03  Connect GitHub and GitLab'))
  expect(currentDot()).toBe(2)
})

test('next advances and previous goes back', async () => {
  renderCarousel()
  clickStep('next')
  await vi.waitFor(() => expect(currentDot()).toBe(1))
  clickStep('prev')
  await vi.waitFor(() => expect(currentDot()).toBe(0))
})

test('previous stops at the first slide', () => {
  renderCarousel()
  clickStep('prev')
  expect(currentDot()).toBe(0)
})

test('next stops at the last slide', async () => {
  renderCarousel()
  for (let click = 0; click < 4; click++) {
    clickStep('next')
  }
  await vi.waitFor(() => expect(currentDot()).toBe(2))
})

test('next scrolls the strip to the start of the following slide', async () => {
  renderCarousel()
  const strip = document.querySelector<HTMLElement>('.strip')!
  const slides = [...strip.children] as HTMLElement[]
  clickStep('next')
  await vi.waitFor(() =>
    expect(Math.round(strip.scrollLeft)).toBe(slides[1].offsetLeft - slides[0].offsetLeft)
  )
  await new Promise((resolve) => setTimeout(resolve, 300))
  expect(currentDot()).toBe(1)
})

test('swiping the strip moves the caption with it', async () => {
  renderCarousel()
  const strip = document.querySelector<HTMLElement>('.strip')!
  const slides = [...strip.children] as HTMLElement[]
  strip.scrollTo({ left: slides[1].offsetLeft - slides[0].offsetLeft, behavior: 'instant' })
  strip.dispatchEvent(new Event('scroll'))
  await vi.waitFor(() => expect(currentDot()).toBe(1))
  await expect.element(page.getByText('02 / 03  Every repo in a side panel')).toBeVisible()
})

test('narrow slides show several at once and the last dot lights at the end of the strip', async () => {
  renderCarousel('200px')
  const strip = document.querySelector<HTMLElement>('.strip')!
  expect(strip.scrollWidth).toBeLessThanOrEqual(strip.clientWidth + 1)
  strip.dispatchEvent(new Event('scroll'))
  await vi.waitFor(() => expect(currentDot()).toBe(2))
})
