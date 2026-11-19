import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import Header from './Header.svelte'

/* Header only tracks sections on the one-pager, so the route has to look like it. */
vi.mock('$app/state', () => ({ page: { route: { id: '/' }, url: new URL('http://localhost/') } }))

let sectionsHost: HTMLElement | undefined

afterEach(() => {
  sectionsHost?.remove()
})

test('renders the brand, section nav and theme toggle', async () => {
  render(Header)
  await expect
    .element(page.getByRole('link', { name: 'feedMyPixel, back to top' }))
    .toBeInTheDocument()
  const sectionLinks = document.querySelectorAll('nav[aria-label="Sections"] a')
  expect([...sectionLinks].map((link) => link.textContent?.trim())).toEqual([
    'Products',
    'Experience',
    'Services',
    'Contact'
  ])
  await expect
    .element(page.getByRole('button', { name: 'Switch colour theme' }))
    .toBeInTheDocument()
})

test('the hamburger opens the mobile drawer', async () => {
  render(Header)
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect.element(page.getByRole('dialog', { name: 'Menu' })).toBeInTheDocument()
})

test('returns focus to the hamburger after the drawer closes', async () => {
  render(Header)
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect.element(page.getByRole('dialog', { name: 'Menu' })).toBeInTheDocument()
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
  await expect.element(page.getByRole('dialog', { name: 'Menu' })).not.toBeInTheDocument()
  expect(document.activeElement?.getAttribute('aria-label')).toBe('Open menu')
})

test('marks the link for the section in view as current', async () => {
  sectionsHost = document.createElement('div')
  sectionsHost.innerHTML =
    '<section id="products" style="height:80vh"></section>' +
    '<section id="experience" style="height:80vh"></section>' +
    '<section id="contact" style="height:80vh"></section>'
  document.body.appendChild(sectionsHost)
  render(Header)
  await vi.waitFor(() => {
    const current = document.querySelectorAll('nav[aria-label="Sections"] a[aria-current="true"]')
    expect([...current].map((link) => link.textContent?.trim())).toEqual(['Products'])
  })
})
