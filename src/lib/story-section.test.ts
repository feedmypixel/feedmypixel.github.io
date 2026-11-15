import { passedSectionIndex } from './story-section.js'

test('before any heading reaches the line, the first section is current', () => {
  expect(passedSectionIndex([400, 900, 1400], 200)).toBe(0)
})

test('the last heading at or above the line is current', () => {
  expect(passedSectionIndex([-600, -100, 150, 900], 200)).toBe(2)
})

test('a heading exactly on the line counts as passed', () => {
  expect(passedSectionIndex([-300, 200, 700], 200)).toBe(1)
})

test('at the bottom of the page the last section is current, even below the line', () => {
  expect(passedSectionIndex([-900, -100, 500], 200, { atBottom: true })).toBe(2)
})

test('when every heading is above the line, the last section is current', () => {
  expect(passedSectionIndex([-900, -500, -100], 200)).toBe(2)
})
