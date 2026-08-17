import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import Hero from './Hero.svelte'

test('leads with the positioning and the headline', async () => {
  render(Hero)
  await expect
    .element(page.getByRole('heading', { level: 1 }))
    .toHaveTextContent('Software that makes you smile')
  await expect.element(page.getByText('Ben Chidgey — contract full-stack engineer')).toBeVisible()
})

test('offers the CV as a real download', () => {
  render(Hero)
  const cv = document.querySelector<HTMLAnchorElement>('a[download]')
  expect(cv?.getAttribute('href')).toContain('Ben-Chidgey-CV.pdf')
})

test('offers the email address', async () => {
  render(Hero)
  await expect
    .element(page.getByRole('link', { name: 'hello@feedmypixel.com' }))
    .toBeInTheDocument()
})

test('names the clients worked for', async () => {
  render(Hero)
  await expect.element(page.getByText(/Guardian · BBC · DEFRA/)).toBeVisible()
})
