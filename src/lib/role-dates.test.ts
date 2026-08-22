import { roleDuration } from './role-dates'
import { roles } from './data/experience'

const now = new Date('2026-08-21T00:00:00Z')

test('counts both end months, the way a CV reads', () => {
  expect(roleDuration('Jan 2020 - Jan 2020', now)).toBe('1 mo')
  expect(roleDuration('Jan 2020 - Feb 2020', now)).toBe('2 mos')
  expect(roleDuration('Jan 2020 - Dec 2020', now)).toBe('1 yr')
})

test('drops the month part when it lands exactly on a year', () => {
  expect(roleDuration('Mar 2018 - Feb 2020', now)).toBe('2 yrs')
  expect(roleDuration('Mar 2018 - Mar 2020', now)).toBe('2 yrs 1 mo')
  expect(roleDuration('Mar 2018 - Jun 2020', now)).toBe('2 yrs 4 mos')
})

test('measures an open role against today', () => {
  expect(roleDuration('Aug 2026 - present', now)).toBe('1 mo')
  expect(roleDuration('Aug 2025 - present', now)).toBe('1 yr 1 mo')
})

test('handles the year-only range that predates the Mon YYYY format', () => {
  expect(roleDuration('2004 - 2010', now)).toBe('6 yrs 1 mo')
})

test('returns nothing rather than guessing when there is no range', () => {
  expect(roleDuration('Mar 2010', now)).toBeNull()
  expect(roleDuration('', now)).toBeNull()
  expect(roleDuration('sometime - later', now)).toBeNull()
})

test('every role either yields a duration or is knowingly skipped', () => {
  const skipped = roles.filter((role) => roleDuration(role.dates, now) === null)
  expect(skipped.map((role) => role.dates)).toEqual(['Mar 2010'])
})
