import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import Experience from './Experience.svelte'
import { roles } from '$lib/data/experience'

const rowCount = () => document.querySelectorAll('.rows > li').length

/* Consecutive roles at one employer render as a single run, so counting rows
   undercounts the history. Chapters are the roles inside a grouped run. */
const roleCount = () => {
  const rows = [...document.querySelectorAll('.rows > li')]
  const solo = rows.filter((row) => row.querySelector('.chapter') === null).length
  return solo + document.querySelectorAll('.chapter').length
}
const chipLabels = () =>
  [...document.querySelectorAll('.chips .chip span:first-child')].map((chip) =>
    chip.textContent?.trim()
  )
const searchBox = () => page.getByRole('combobox')

test('lists the whole CV before anything is filtered', async () => {
  render(Experience)
  expect(roleCount()).toBe(roles.length)
  await expect.element(page.getByText(`${roles.length} roles`)).toBeVisible()
})

test('anchors the experience section for the nav', () => {
  render(Experience)
  expect(document.querySelector('section#experience')).not.toBeNull()
})

test('offers the CV as a real download, saved under its own name', () => {
  render(Experience)
  const cv = document.querySelector<HTMLAnchorElement>('a[download]')
  expect(cv?.getAttribute('href')).toContain('BenChidgeyCV.pdf')
  expect(cv?.getAttribute('download')).toBe('BenChidgeyCV.pdf')
})

test('free text narrows the timeline and the count', async () => {
  render(Experience)
  await searchBox().fill('guardian')
  await vi.waitFor(() => {
    expect(rowCount()).toBe(1)
  })
  await expect.element(page.getByText(`1 of ${roles.length}`)).toBeVisible()
})

test('the segmented control narrows by engagement', async () => {
  render(Experience)
  await page.getByRole('button', { name: 'Permanent' }).click()
  await vi.waitFor(() => {
    expect(rowCount()).toBe(roles.filter((role) => role.type === 'Permanent').length)
  })
})

test('a quick filter adds a chip and filters', async () => {
  render(Experience)
  await page.getByRole('button', { name: 'SvelteKit', exact: true }).click()
  await vi.waitFor(() => {
    expect(chipLabels()).toContain('SvelteKit')
  })
  expect(rowCount()).toBe(roles.filter((role) => role.tags.includes('SvelteKit')).length)
})

test('the same quick filter twice does not stack up', async () => {
  render(Experience)
  const quick = page.getByRole('button', { name: 'AWS', exact: true })
  await quick.click()
  await quick.click()
  await vi.waitFor(() => {
    expect(chipLabels().filter((label) => label === 'AWS')).toHaveLength(1)
  })
})

test('removing a chip restores the results', async () => {
  render(Experience)
  await page.getByRole('button', { name: 'SvelteKit', exact: true }).click()
  await vi.waitFor(() => expect(chipLabels()).toContain('SvelteKit'))
  await page.getByRole('button', { name: /Remove filter/ }).click()
  await vi.waitFor(() => {
    expect(roleCount()).toBe(roles.length)
  })
})

test('typing opens suggestions, and picking one becomes a chip', async () => {
  render(Experience)
  await searchBox().fill('gov')
  await expect.element(page.getByRole('listbox')).toBeInTheDocument()
  const option = page.getByRole('option').first()
  await option.click()
  await vi.waitFor(() => {
    expect(chipLabels().length).toBe(1)
  })
})

test('suggestions carry their kind and a live role count', async () => {
  render(Experience)
  await searchBox().fill('sveltekit')
  await expect.element(page.getByRole('listbox')).toBeInTheDocument()
  const option = document.querySelector('.option')
  expect(option?.querySelector('.kind')?.textContent?.trim()).toBe('skill')
  expect(option?.querySelector('.hits')?.textContent?.trim()).toBe('1 role')
})

test('a term with no facet still filters and says so', async () => {
  render(Experience)
  await searchBox().fill('membership')
  await expect
    .element(
      page.getByText('No matching skill, client or sector. Free text still filters the timeline.')
    )
    .toBeVisible()
  expect(rowCount()).toBe(1)
})

test('nothing matching offers a way back', async () => {
  render(Experience)
  await searchBox().fill('zzzz')
  await expect.element(page.getByText('Nothing matches those filters')).toBeVisible()
  await page.getByRole('button', { name: 'Clear all filters' }).last().click()
  await vi.waitFor(() => {
    expect(roleCount()).toBe(roles.length)
  })
})

test('the clear control resets every filter at once', async () => {
  render(Experience)
  await page.getByRole('button', { name: 'Contract' }).click()
  await page.getByRole('button', { name: 'Node', exact: true }).click()
  await searchBox().fill('gov')
  await page.getByRole('button', { name: 'Clear all filters' }).first().click()
  await vi.waitFor(() => {
    expect(roleCount()).toBe(roles.length)
    expect(chipLabels()).toHaveLength(0)
  })
})

test('matching tags light up on the results', async () => {
  render(Experience)
  await page.getByRole('button', { name: 'SvelteKit', exact: true }).click()
  await vi.waitFor(() => {
    expect(document.querySelector('.tag[data-hot="true"]')?.textContent?.trim()).toBe('SvelteKit')
  })
})

const pressKey = (key: string) => {
  const input = document.querySelector('#cv-search') as HTMLInputElement
  input.focus()
  input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
}

const activeOptionLabel = () =>
  document.querySelector('.option[aria-selected="true"] .label')?.textContent?.trim()

const activeIndex = () =>
  [...document.querySelectorAll('.option')].findIndex(
    (option) => option.getAttribute('aria-selected') === 'true'
  )

test('arrow down opens the suggestions and steps through them', async () => {
  render(Experience)
  pressKey('ArrowDown')
  await vi.waitFor(() => {
    expect(document.querySelector('.listbox')).not.toBeNull()
  })
  const first = activeIndex()
  pressKey('ArrowDown')
  await vi.waitFor(() => {
    expect(activeIndex()).toBe((first + 1) % document.querySelectorAll('.option').length)
  })
})

test('arrow up wraps around the top of the list', async () => {
  render(Experience)
  pressKey('ArrowDown')
  await vi.waitFor(() => {
    expect(document.querySelector('.listbox')).not.toBeNull()
  })
  const count = document.querySelectorAll('.option').length
  const start = activeIndex()
  pressKey('ArrowUp')
  await vi.waitFor(() => {
    expect(activeIndex()).toBe((start - 1 + count) % count)
  })
})

test('enter adds the highlighted suggestion as a chip', async () => {
  render(Experience)
  await searchBox().fill('sveltekit')
  pressKey('ArrowDown')
  await vi.waitFor(() => expect(activeOptionLabel()).toBe('SvelteKit'))
  pressKey('Enter')
  await vi.waitFor(() => {
    expect(chipLabels()).toContain('SvelteKit')
  })
})

test('escape closes the suggestions without choosing anything', async () => {
  render(Experience)
  await searchBox().fill('gov')
  await expect.element(page.getByRole('listbox')).toBeInTheDocument()
  pressKey('Escape')
  await vi.waitFor(() => {
    expect(document.querySelector('.listbox')).toBeNull()
  })
  expect(chipLabels()).toHaveLength(0)
})

test('backspace on an empty field removes the last chip', async () => {
  render(Experience)
  await page.getByRole('button', { name: 'Node', exact: true }).click()
  await vi.waitFor(() => expect(chipLabels()).toContain('Node'))
  pressKey('Backspace')
  await vi.waitFor(() => {
    expect(chipLabels()).toHaveLength(0)
  })
})

test('backspace with text in the field leaves the chips alone', async () => {
  render(Experience)
  await page.getByRole('button', { name: 'Node', exact: true }).click()
  await vi.waitFor(() => expect(chipLabels()).toContain('Node'))
  await searchBox().fill('gov')
  pressKey('Backspace')
  expect(chipLabels()).toContain('Node')
})

test('the results region announces changes', () => {
  render(Experience)
  expect(document.querySelector('.results')?.getAttribute('aria-live')).toBe('polite')
})

test('the search field is a labelled combobox', async () => {
  render(Experience)
  const input = document.querySelector('#cv-search')
  expect(input?.getAttribute('role')).toBe('combobox')
  expect(input?.getAttribute('aria-controls')).toBe('cv-suggestions')
  await expect.element(page.getByLabelText('Search')).toBeInTheDocument()
})

const tagButton = (label: string) =>
  [...document.querySelectorAll<HTMLButtonElement>('.tag')].find(
    (tag) => tag.textContent?.trim() === label
  )

test('a skill tag filters by itself and hands focus to the new chip', async () => {
  render(Experience)
  tagButton('Fastify')!.click()

  await vi.waitFor(() => {
    expect(chipLabels()).toEqual(['Fastify'])
  })
  expect(document.activeElement).not.toBe(document.body)
  expect(document.activeElement?.textContent).toContain('Fastify')
})

test('tags carry an accessible name, not just the bare word', () => {
  render(Experience)
  expect(tagButton('Fastify')?.getAttribute('aria-label')).toBe('Filter by Fastify')
})

test('clicking an already active tag does not duplicate the chip', async () => {
  render(Experience)
  tagButton('Fastify')!.click()
  await vi.waitFor(() => expect(chipLabels()).toEqual(['Fastify']))
  tagButton('Fastify')?.click()
  await vi.waitFor(() => expect(chipLabels()).toEqual(['Fastify']))
})

test('removing a chip hands focus to another chip rather than dropping it', async () => {
  render(Experience)
  tagButton('Fastify')!.click()
  await vi.waitFor(() => expect(chipLabels()).toEqual(['Fastify']))
  tagButton('Accessibility')!.click()
  await vi.waitFor(() => expect(chipLabels()).toHaveLength(2))

  const first = document.querySelector<HTMLButtonElement>('.chips .chip')!
  first.click()

  await vi.waitFor(() => expect(chipLabels()).toHaveLength(1))
  expect(document.activeElement).not.toBe(document.body)
  expect(document.activeElement?.className).toContain('chip')
})

test('removing the last chip falls back to the search input with the listbox shut', async () => {
  render(Experience)
  tagButton('Fastify')!.click()
  await vi.waitFor(() => expect(chipLabels()).toEqual(['Fastify']))

  document.querySelector<HTMLButtonElement>('.chips .chip')!.click()

  await vi.waitFor(() => expect(chipLabels()).toHaveLength(0))
  expect(document.activeElement).not.toBe(document.body)
  expect(document.activeElement?.id).toBe('cv-search')
  expect(document.querySelector('.listbox')).toBeNull()
})
