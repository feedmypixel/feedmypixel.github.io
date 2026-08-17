import { clampIndex, indexFromScroll, scrollOffsetFor } from './carousel'

test('clampIndex keeps the index inside the slide range', () => {
  expect(clampIndex(-2, 4)).toBe(0)
  expect(clampIndex(9, 4)).toBe(3)
  expect(clampIndex(2, 4)).toBe(2)
})

test('clampIndex handles an empty carousel', () => {
  expect(clampIndex(1, 0)).toBe(0)
})

test('indexFromScroll rounds to the nearest snapped slide', () => {
  expect(indexFromScroll(0, 600, 4)).toBe(0)
  expect(indexFromScroll(310, 600, 4)).toBe(1)
  expect(indexFromScroll(1150, 600, 4)).toBe(2)
})

test('indexFromScroll never runs past the last slide', () => {
  expect(indexFromScroll(9999, 600, 4)).toBe(3)
})

test('indexFromScroll is safe before the strip has been measured', () => {
  expect(indexFromScroll(240, 0, 4)).toBe(0)
})

test('scrollOffsetFor positions the strip at the slide', () => {
  expect(scrollOffsetFor(2, 616)).toBe(1232)
})
