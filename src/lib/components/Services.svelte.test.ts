import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import Services from './Services.svelte'
import { faqs, serviceFacts } from '$lib/data/services'

test('renders every service fact as a term and description', async () => {
  render(Services)
  for (const fact of serviceFacts) {
    await expect.element(page.getByText(fact.label, { exact: true })).toBeVisible()
    await expect.element(page.getByText(fact.value, { exact: true })).toBeVisible()
  }
})

test('every answer is in the DOM even while its question is collapsed', () => {
  render(Services)
  const items = document.querySelectorAll('details')
  expect(items.length).toBe(faqs.length)

  const collapsed = [...items].filter((item) => !item.open)
  expect(collapsed.length).toBe(faqs.length - 1)

  for (const faq of faqs) {
    expect(document.body.textContent).toContain(faq.answer)
  }
})

test('opens the first question so the section never reads as an empty list', () => {
  render(Services)
  const items = [...document.querySelectorAll('details')]
  expect(items[0].open).toBe(true)
  expect(items.slice(1).every((item) => !item.open)).toBe(true)
})

test('questions are summary elements, so they work without JavaScript', () => {
  render(Services)
  const summaries = document.querySelectorAll('details > summary')
  expect(summaries.length).toBe(faqs.length)
  expect([...summaries].map((s) => s.textContent?.trim())).toEqual(faqs.map((f) => f.question))
})

test('points unanswered questions at the contact section', async () => {
  render(Services)
  const link = page.getByRole('link', { name: 'Ask me directly' })
  await expect.element(link).toBeInTheDocument()
  expect(document.querySelector('a[href="/#contact"]')).not.toBeNull()
})
