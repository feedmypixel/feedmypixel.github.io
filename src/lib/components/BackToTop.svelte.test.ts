import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import BackToTop from './BackToTop.svelte'
/* The button is pinned to the viewport with spacing tokens. Without them it scrolls away with the page. */
import '#lib/styles/tokens.css'

const backToTop = () => page.getByRole('button', { name: 'Back to top' })

let tallPage: HTMLElement

beforeEach(() => {
  tallPage = document.createElement('div')
  tallPage.style.height = '3000px'
  document.body.appendChild(tallPage)
})

afterEach(() => {
  tallPage.remove()
  window.scrollTo(0, 0)
})

test('hides again once the page is back near the top', async () => {
  render(BackToTop)
  window.scrollTo(0, 700)
  await expect.element(backToTop()).toBeInTheDocument()
  window.scrollTo(0, 300)
  await expect.element(backToTop()).not.toBeInTheDocument()
})

test('appears once the page is scrolled and returns to the top when clicked', async () => {
  render(BackToTop)
  window.scrollTo(0, 700)
  await backToTop().click()
  await vi.waitFor(() => expect(window.scrollY).toBe(0))
  await expect.element(backToTop()).not.toBeInTheDocument()
})
