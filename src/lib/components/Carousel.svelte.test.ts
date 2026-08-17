import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import Carousel from './Carousel.svelte'

const slides = [
  { src: '/pipes/framed-popup.png', alt: 'Popup', label: 'Status from your toolbar' },
  { src: '/pipes/framed-sidepanel.png', alt: 'Side panel', label: 'Every repo in a side panel' },
  { src: '/pipes/framed-options.png', alt: 'Options', label: 'Connect GitHub and GitLab' }
]

const renderCarousel = () => render(Carousel, { props: { slides, label: 'Pipes screenshots' } })

test('renders every slide with dimensions so the layout does not shift', () => {
  renderCarousel()
  const images = document.querySelectorAll<HTMLImageElement>('.strip img')
  expect(images).toHaveLength(3)
  expect(images[0].getAttribute('width')).toBe('1280')
  expect(images[0].getAttribute('height')).toBe('800')
  expect(images[0].getAttribute('loading')).toBe('lazy')
})

test('the scroll strip is labelled and keyboard reachable', () => {
  renderCarousel()
  const strip = document.querySelector('.strip')
  expect(strip?.getAttribute('aria-label')).toBe('Pipes screenshots')
  expect(strip?.getAttribute('tabindex')).toBe('0')
})

test('captions the first slide and marks its dot current', async () => {
  renderCarousel()
  await expect.element(page.getByText('Status from your toolbar')).toBeVisible()
  const dots = document.querySelectorAll('.dot')
  expect(dots[0].getAttribute('aria-current')).toBe('true')
})

test('a dot moves the carousel to that slide', async () => {
  renderCarousel()
  await page.getByRole('button', { name: 'Show Connect GitHub and GitLab' }).click()
  await expect.element(page.getByText('Connect GitHub and GitLab')).toBeVisible()
  expect(document.querySelectorAll('.dot')[2].getAttribute('aria-current')).toBe('true')
})

test('next advances and previous goes back', async () => {
  renderCarousel()
  await page.getByRole('button', { name: 'Next screenshot' }).click()
  await expect.element(page.getByText('Every repo in a side panel')).toBeVisible()
  await page.getByRole('button', { name: 'Previous screenshot' }).click()
  await expect.element(page.getByText('Status from your toolbar')).toBeVisible()
})

test('previous stops at the first slide', async () => {
  renderCarousel()
  await page.getByRole('button', { name: 'Previous screenshot' }).click()
  expect(document.querySelectorAll('.dot')[0].getAttribute('aria-current')).toBe('true')
})
