import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import Footer from './Footer.svelte'

test('renders the company line and the external links', async () => {
  render(Footer)
  await expect.element(page.getByText('feedMyPixel Ltd · Ben Chidgey')).toBeVisible()
  await expect.element(page.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
  await expect.element(page.getByRole('link', { name: 'Digital Marketplace' })).toBeInTheDocument()
  await expect.element(page.getByRole('link', { name: 'Components' })).toBeInTheDocument()
})

test('section links are root-relative so they work from any page', () => {
  render(Footer)
  const products = document.querySelector('nav[aria-label="Footer"] a[href="/#products"]')
  expect(products).not.toBeNull()
})
