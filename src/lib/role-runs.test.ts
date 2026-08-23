import { buildRuns } from './role-runs'
import { roles } from './data/experience'
import type { Role } from './data/experience'

const now = new Date('2026-08-23T00:00:00Z')

const role = (company: string, title: string, dates: string, extra: Partial<Role> = {}): Role => ({
  company,
  title,
  dates,
  type: 'Contract',
  location: 'Remote',
  sector: 'Test',
  summary: 'A role.',
  tags: [],
  ...extra
})

test('chapter durations sum to the run they sit under', () => {
  const runs = buildRuns(roles, now)
  for (const run of runs) {
    const summed = run.chapters.reduce((total, chapter) => total + chapter.months, 0)
    expect(summed, `${run.company} chapters must sum to its run`).toBe(run.tenureMonths)
  }
})

test('the shared handover month belongs to the earlier role', () => {
  const runs = buildRuns(
    [role('Acme', 'Second', 'Aug 2022 - Dec 2022'), role('Acme', 'First', 'Jan 2022 - Aug 2022')],
    now
  )
  expect(runs).toHaveLength(1)
  expect(runs[0].tenureMonths).toBe(12)
  expect(runs[0].tenureLabel).toBe('1 year')
  expect(runs[0].chapters.map((chapter) => chapter.durationLabel)).toEqual(['4 months', '8 months'])
})

test('groups Wayfair and HMRC out of the real history and nothing else', () => {
  const runs = buildRuns(roles, now)
  const grouped = runs.filter((run) => run.chapters.length > 1)
  expect(
    grouped.map(
      (run) => `${run.company} ${run.chapters.length} ${run.spanLabel} ${run.tenureLabel}`
    )
  ).toEqual([
    'Wayfair 2 Jan 2022 - Dec 2022 1 year',
    'HM Revenue & Customs 3 Sep 2015 - Apr 2017 1 year 8 months'
  ])
})

test('keeps the two Freelance stints apart', () => {
  const runs = buildRuns(roles, now)
  const freelance = runs.filter((run) => run.company === 'Freelance')
  expect(freelance).toHaveLength(2)
  expect(freelance.every((run) => run.chapters.length === 1)).toBe(true)
})

test('every role survives being grouped', () => {
  const runs = buildRuns(roles, now)
  expect(runs.flatMap((run) => run.chapters).map((chapter) => chapter.role)).toHaveLength(
    roles.length
  )
})

test('an entry with no range shows no duration and adds nothing to the run', () => {
  const runs = buildRuns([role('Design Haus', 'Frontend Developer', 'Mar 2010')], now)
  expect(runs[0].chapters[0].durationLabel).toBeNull()
  expect(runs[0].tenureMonths).toBe(0)
  expect(runs[0].tenureLabel).toBeNull()
  expect(runs[0].spanLabel).toBe('Mar 2010')
})

test('a run of one carries no tenure furniture', () => {
  const runs = buildRuns([role('Acme', 'Only', 'Jan 2020 - Jan 2021')], now)
  expect(runs[0].tenureLabel).toBeNull()
  expect(runs[0].spanLabel).toBe('Jan 2020 - Jan 2021')
})

test('meta appears on the run only when every chapter shares it', () => {
  const shared = buildRuns(
    [
      role('Acme', 'Second', 'Aug 2022 - Dec 2022', { location: 'London' }),
      role('Acme', 'First', 'Jan 2022 - Aug 2022', { location: 'London' })
    ],
    now
  )
  expect(shared[0].metaLabel).toBe('Contract · London')

  const mixed = buildRuns(
    [
      role('Acme', 'Second', 'Aug 2022 - Dec 2022', { location: 'London' }),
      role('Acme', 'First', 'Jan 2022 - Aug 2022', { location: 'Remote' })
    ],
    now
  )
  expect(mixed[0].metaLabel).toBeNull()
})

test('a run whose newest entry has no range still labels its span', () => {
  const runs = buildRuns(
    [role('Acme', 'Second', 'Mar 2010'), role('Acme', 'First', 'Jan 2009 - Mar 2010')],
    now
  )
  expect(runs).toHaveLength(1)
  expect(runs[0].spanLabel).toBe('Jan 2009 - Mar 2010')
  expect(runs[0].tenureMonths).toBe(15)
})
