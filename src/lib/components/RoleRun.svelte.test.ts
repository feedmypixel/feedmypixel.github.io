import { render } from 'vitest-browser-svelte'
import RoleRun from './RoleRun.svelte'
import { buildRuns } from '$lib/role-runs'
import type { Role } from '$lib/data/experience'

const now = new Date('2026-08-23T00:00:00Z')

const role = (title: string, dates: string, extra: Partial<Role> = {}): Role => ({
  company: 'Acme',
  title,
  dates,
  type: 'Contract',
  location: 'Remote',
  sector: 'Test',
  summary: `${title} summary.`,
  tags: ['React'],
  ...extra
})

const runFor = (entries: Role[]) => buildRuns(entries, now)[0]

test('a single role renders without any spine furniture', () => {
  render(RoleRun, {
    props: { run: runFor([role('Only', 'Jan 2020 - Jan 2021')]), chips: [], query: '' }
  })
  expect(document.querySelector('h3')?.textContent).toBe('Acme')
  expect(document.querySelector('.title')?.textContent).toBe('Only')
  expect(document.querySelectorAll('.chapter')).toHaveLength(0)
  expect(document.querySelectorAll('.marker')).toHaveLength(0)
  expect(document.querySelector('.derived')?.textContent).toContain('1 year')
})

test('a role with no parseable range shows no duration', () => {
  render(RoleRun, { props: { run: runFor([role('Short', 'Mar 2010')]), chips: [], query: '' } })
  const derived = [...document.querySelectorAll('.derived')].map((line) => line.textContent)
  expect(derived.some((line) => /month|year/.test(line ?? ''))).toBe(false)
  expect(document.querySelector('.dates')?.textContent).toBe('Mar 2010')
})

test('a run names the company once and gives each role a chapter', () => {
  render(RoleRun, {
    props: {
      run: runFor([role('Second', 'Aug 2022 - Dec 2022'), role('First', 'Jan 2022 - Aug 2022')]),
      chips: [],
      query: ''
    }
  })
  expect(document.querySelectorAll('h3')).toHaveLength(1)
  const chapters = document.querySelectorAll('.chapter')
  expect(chapters).toHaveLength(2)
  expect([...document.querySelectorAll('h4')].map((h) => h.textContent)).toEqual([
    'Second',
    'First'
  ])
  expect(document.querySelectorAll('.marker')).toHaveLength(2)
})

test('the spine stops at the final marker', () => {
  render(RoleRun, {
    props: {
      run: runFor([role('Second', 'Aug 2022 - Dec 2022'), role('First', 'Jan 2022 - Aug 2022')]),
      chips: [],
      query: ''
    }
  })
  const chapters = [...document.querySelectorAll('.chapter')]
  expect(chapters.map((chapter) => chapter.getAttribute('data-last'))).toEqual(['false', 'true'])
})

test('each chapter carries its dates and its own duration', () => {
  render(RoleRun, {
    props: {
      run: runFor([role('Second', 'Aug 2022 - Dec 2022'), role('First', 'Jan 2022 - Aug 2022')]),
      chips: [],
      query: ''
    }
  })
  const lines = [...document.querySelectorAll('.chapter-dates')].map((line) =>
    line.textContent?.replace(/\s+/g, ' ').trim()
  )
  expect(lines).toEqual(['Aug 2022 - Dec 2022 · 4 months', 'Jan 2022 - Aug 2022 · 8 months'])
})

test('shared engagement meta sits on the run, not on every chapter', () => {
  render(RoleRun, {
    props: {
      run: runFor([role('Second', 'Aug 2022 - Dec 2022'), role('First', 'Jan 2022 - Aug 2022')]),
      chips: [],
      query: ''
    }
  })
  expect(document.body.textContent).toContain('Contract · Remote')
  expect(document.querySelectorAll('.chapter-meta')).toHaveLength(0)
})

test('differing meta moves onto the chapters so nothing is dropped', () => {
  render(RoleRun, {
    props: {
      run: runFor([
        role('Second', 'Aug 2022 - Dec 2022', { location: 'London' }),
        role('First', 'Jan 2022 - Aug 2022', { location: 'Remote' })
      ]),
      chips: [],
      query: ''
    }
  })
  const metas = [...document.querySelectorAll('.chapter-meta')].map((meta) => meta.textContent)
  expect(metas).toEqual(['Contract · London', 'Contract · Remote'])
})

test('tags are buttons that report the filter they apply', () => {
  const picked: string[] = []
  render(RoleRun, {
    props: {
      run: runFor([role('Only', 'Jan 2020 - Jan 2021')]),
      chips: [],
      query: '',
      onSelectTag: (tag: string) => picked.push(tag)
    }
  })
  const tag = document.querySelector<HTMLButtonElement>('.tag')!
  expect(tag.tagName).toBe('BUTTON')
  expect(tag.getAttribute('aria-label')).toBe('Filter by React')
  tag.click()
  expect(picked).toEqual(['React'])
})

test('a tag matching an active chip is marked hot', () => {
  render(RoleRun, {
    props: {
      run: runFor([role('Only', 'Jan 2020 - Jan 2021')]),
      chips: [{ label: 'React', kind: 'skill' }],
      query: ''
    }
  })
  expect(document.querySelector('.tag')?.getAttribute('data-hot')).toBe('true')
})

test('tags still render when no handler is passed', () => {
  render(RoleRun, {
    props: { run: runFor([role('Only', 'Jan 2020 - Jan 2021')]), chips: [], query: '' }
  })
  const tag = document.querySelector<HTMLButtonElement>('.tag')!
  expect(() => tag.click()).not.toThrow()
})
