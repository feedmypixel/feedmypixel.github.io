import { render } from 'vitest-browser-svelte'
import NewTabHint from './NewTabHint.svelte'

test('renders visually hidden new-tab text with a leading space', () => {
  render(NewTabHint)
  const hint = document.querySelector('.visually-hidden')
  expect(hint?.textContent).toBe(' (opens in a new tab)')
})
