import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import Footer from './Footer.svelte'

test('renders the company line and the external links', async () => {
  render(Footer)
  await expect.element(page.getByText('feedMyPixel Ltd · Ben Chidgey')).toBeVisible()
  await expect.element(page.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
  await expect.element(page.getByRole('link', { name: 'Digital Marketplace' })).toBeInTheDocument()
})
