import { createRawSnippet } from 'svelte'
import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import SectionHeader from './SectionHeader.svelte'

test('shows the eyebrow and a linkable section heading', async () => {
  render(SectionHeader, { eyebrow: 'Contact', heading: 'Like to build something together?' })
  await expect.element(page.getByText('Contact', { exact: true })).toBeVisible()
  await expect
    .element(page.getByRole('heading', { level: 2, name: 'Like to build something together?' }))
    .toHaveAttribute('id', 'like-to-build-something-together')
  await expect
    .element(page.getByRole('link', { name: 'Copy link to Like to build something together?' }))
    .toBeInTheDocument()
})

test('places actions beside the heading', async () => {
  const actions = createRawSnippet(() => ({ render: () => '<button>Download CV</button>' }))
  render(SectionHeader, { eyebrow: 'Experience', heading: 'Search my CV', actions })
  await expect.element(page.getByRole('button', { name: 'Download CV' })).toBeVisible()
})
