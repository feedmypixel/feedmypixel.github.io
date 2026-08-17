import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import MobileNav from './MobileNav.svelte'

const linksIn = (root: string) => document.querySelectorAll<HTMLElement>(`${root} a`)

test('renders nothing when closed', () => {
  render(MobileNav, { props: { open: false, onclose: () => {} } })
  expect(document.querySelector('[role="dialog"]')).toBeNull()
})

test('renders the section links when open and closes on a link click', async () => {
  const onclose = vi.fn()
  render(MobileNav, { props: { open: true, onclose } })
  await expect.element(page.getByRole('dialog', { name: 'Menu' })).toBeInTheDocument()
  await page.getByRole('link', { name: 'Experience' }).click()
  expect(onclose).toHaveBeenCalled()
})

test('closes when the scrim is clicked', async () => {
  const onclose = vi.fn()
  render(MobileNav, { props: { open: true, onclose } })
  await page.getByRole('button', { name: 'Close menu' }).click()
  expect(onclose).toHaveBeenCalled()
})

test('closes on Escape', () => {
  const onclose = vi.fn()
  render(MobileNav, { props: { open: true, onclose } })
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
  expect(onclose).toHaveBeenCalled()
})

test('traps focus - Tab from the last link wraps to the first', () => {
  render(MobileNav, { props: { open: true, onclose: () => {} } })
  const links = linksIn('#mobile-nav')
  links[links.length - 1].focus()
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }))
  expect(document.activeElement).toBe(links[0])
})

test('traps focus - Shift+Tab from the first link wraps to the last', () => {
  render(MobileNav, { props: { open: true, onclose: () => {} } })
  const links = linksIn('#mobile-nav')
  links[0].focus()
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }))
  expect(document.activeElement).toBe(links[links.length - 1])
})

test('ignores keys other than Escape and Tab', () => {
  const onclose = vi.fn()
  render(MobileNav, { props: { open: true, onclose } })
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
  expect(onclose).not.toHaveBeenCalled()
})
