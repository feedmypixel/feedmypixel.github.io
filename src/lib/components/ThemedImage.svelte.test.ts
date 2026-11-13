import { render } from 'vitest-browser-svelte'
import ThemedImage from './ThemedImage.svelte'

const props = {
  light: '/a-light.webp',
  dark: '/a-dark.webp',
  alt: 'A screen',
  width: 660,
  height: 1435
}

const visibleSources = () =>
  [...document.querySelectorAll<HTMLImageElement>('img')]
    .filter((image) => getComputedStyle(image).display !== 'none')
    .map((image) => image.getAttribute('src'))

afterEach(() => {
  delete document.documentElement.dataset.theme
})

test('shows the light image in the light theme', () => {
  document.documentElement.dataset.theme = 'light'
  render(ThemedImage, { props })
  expect(visibleSources()).toEqual(['/a-light.webp'])
})

test('shows the dark image in the dark theme', () => {
  document.documentElement.dataset.theme = 'dark'
  render(ThemedImage, { props })
  expect(visibleSources()).toEqual(['/a-dark.webp'])
})

test('both images are lazy and sized so the hidden one is never fetched and nothing shifts', () => {
  render(ThemedImage, { props })
  document.querySelectorAll('img').forEach((image) => {
    expect(image.getAttribute('loading')).toBe('lazy')
    expect(image.getAttribute('width')).toBe('660')
    expect(image.getAttribute('height')).toBe('1435')
    expect(image.getAttribute('alt')).toBe('A screen')
  })
})
