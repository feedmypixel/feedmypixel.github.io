import { roleDuration } from './role-dates'
import { roles } from './data/experience'

const now = new Date('2026-08-21T00:00:00Z')

test('counts both end months, the way a CV reads', () => {
  expect(roleDuration('Jan 2020 - Jan 2020', now)).toBe('1 month')
  expect(roleDuration('Jan 2020 - Feb 2020', now)).toBe('2 months')
  expect(roleDuration('Jan 2020 - Dec 2020', now)).toBe('1 year')
})

test('drops the month part when it lands exactly on a year', () => {
  expect(roleDuration('Mar 2018 - Feb 2020', now)).toBe('2 years')
  expect(roleDuration('Mar 2018 - Mar 2020', now)).toBe('2 years 1 month')
  expect(roleDuration('Mar 2018 - Jun 2020', now)).toBe('2 years 4 months')
})

test('measures an open role against today', () => {
  expect(roleDuration('Aug 2026 - present', now)).toBe('1 month')
  expect(roleDuration('Aug 2025 - present', now)).toBe('1 year 1 month')
})

test('handles the year-only range that predates the Mon YYYY format', () => {
  expect(roleDuration('2004 - 2010', now)).toBe('6 years 1 month')
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

test('an unrecognised month name yields nothing rather than a wrong answer', () => {
  expect(roleDuration('Xyz 2020 - Feb 2021', now)).toBeNull()
  expect(roleDuration('Jan 2020 - Xyz 2021', now)).toBeNull()
})
