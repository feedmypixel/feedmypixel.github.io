import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import SearchCombobox from './SearchCombobox.svelte'

const props = {
  query: '',
  suggestions: [],
  open: true,
  activeIndex: -1,
  countLabel: '27 roles',
  anyFilter: false,
  label: 'Search',
  onKeyDown: () => {},
  onOpen: () => {},
  onClose: () => {},
  onSelect: () => {},
  onHover: () => {},
  onClearAll: () => {}
}

test('does not claim to be expanded when there is no listbox to show', async () => {
  render(SearchCombobox, { props })
  await expect.element(page.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
  expect(document.querySelector('[role="listbox"]')).toBeNull()
})

test('says it is expanded while the listbox is showing', async () => {
  render(SearchCombobox, {
    props: { ...props, suggestions: [{ kind: 'skill', label: 'SvelteKit', count: 1 }] }
  })
  await expect.element(page.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true')
  await expect.element(page.getByRole('listbox')).toBeInTheDocument()
})
