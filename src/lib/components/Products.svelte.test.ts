import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import Products from './Products.svelte'

test('anchors the products section for the nav', () => {
  render(Products)
  expect(document.querySelector('section#products')).not.toBeNull()
})

test('shows status first and Pipes second', () => {
  render(Products)
  const names = [...document.querySelectorAll('h3')].map((heading) => heading.textContent)
  expect(names).toEqual(['status', 'Pipes'])
})

test('status links out to the app and in to its build story', async () => {
  render(Products)
  const open = page.getByRole('link', { name: /^Open status\.me/ })
  await expect.element(open).toHaveAttribute('href', 'https://status.me')
  await expect.element(open).toHaveAttribute('target', '_blank')
  const story = page.getByRole('link', { name: 'How I built it status' })
  await expect.element(story).toHaveAttribute('href', expect.stringMatching(/status$/))
  expect(story.element().getAttribute('target')).toBeNull()
})

test('Pipes links in to its build story', async () => {
  render(Products)
  const story = page.getByRole('link', { name: 'How I built it Pipes' })
  await expect.element(story).toHaveAttribute('href', expect.stringMatching(/\/pipes$/))
  expect(story.element().getAttribute('target')).toBeNull()
})

test('Pipes Solution has no comma before and', () => {
  render(Products)
  expect(document.body.textContent).toContain(
    'GitHub Actions and GitLab CI/CD and surfaces the status in your toolbar'
  )
})

test('status links to both app stores', async () => {
  render(Products)
  await expect
    .element(page.getByRole('link', { name: /^App Store/ }))
    .toHaveAttribute('href', 'https://apps.apple.com/app/status-me/id6829789500')
  await expect
    .element(page.getByRole('link', { name: /^Google Play/ }))
    .toHaveAttribute('href', 'https://play.google.com/store/apps/details?id=app.status.me')
})

test('Pipes offers both stores and the source, each in a new tab', async () => {
  render(Products)
  const chrome = page.getByRole('link', { name: /^Chrome Web Store/ })
  const firefox = page.getByRole('link', { name: /^Firefox Add-ons/ })
  const source = page.getByRole('link', { name: /^Source/ })
  await expect
    .element(chrome)
    .toHaveAttribute('href', expect.stringContaining('chromewebstore.google.com/detail/'))
  await expect
    .element(firefox)
    .toHaveAttribute('href', expect.stringContaining('addons.mozilla.org/firefox/addon/pipes'))
  await expect
    .element(source)
    .toHaveAttribute('href', expect.stringContaining('github.com/feedmypixel/pipes'))
  for (const link of [chrome, firefox, source]) {
    await expect.element(link).toHaveAttribute('rel', 'noopener noreferrer')
  }
})

test('each product tells its problem, solution and product story', () => {
  render(Products)
  const labels = [...document.querySelectorAll('.label')].map((label) => label.textContent)
  expect(labels).toEqual(['Problem', 'Solution', 'Product', 'Problem', 'Solution', 'Product'])
})

test('status has eleven composed slides and Pipes four', () => {
  render(Products)
  const strips = document.querySelectorAll('.strip')
  expect(strips[0].getAttribute('aria-label')).toBe('status screenshots')
  expect(strips[0].querySelectorAll('.slide .caption')).toHaveLength(11)
  expect(strips[1].getAttribute('aria-label')).toBe('Pipes screenshots')
  expect(strips[1].querySelectorAll('.slide .caption')).toHaveLength(4)
})

test('the second status slide shows the opposite theme so home is not shown twice alike', () => {
  render(Products)
  const [first, second] = document.querySelectorAll('.strip')[0].querySelectorAll(':scope > .slide')
  const lightOf = (slide: Element) => slide.querySelector('img.light')?.getAttribute('src')
  expect(lightOf(first)).toContain('/light/01-home')
  expect(lightOf(second)).toContain('/dark/01-home')
})

test('Pipes screenshots follow the theme with a light and a dark file each', () => {
  render(Products)
  const pipes = document.querySelectorAll('.strip')[1]
  expect(pipes.querySelectorAll('img.light')).toHaveLength(4)
  expect(pipes.querySelectorAll('img.dark')).toHaveLength(4)
  expect(pipes.querySelector('img.dark')?.getAttribute('src')).toContain('pipes/popup-dark.png')
})
