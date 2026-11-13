import { clampIndex, counterCaption, indexFromOffsets } from './carousel'

test('clampIndex keeps the index inside the slide range', () => {
  expect(clampIndex(-2, 4)).toBe(0)
  expect(clampIndex(9, 4)).toBe(3)
  expect(clampIndex(2, 4)).toBe(2)
})

test('clampIndex handles an empty carousel', () => {
  expect(clampIndex(1, 0)).toBe(0)
})

test('indexFromOffsets picks the slide whose start is nearest the scroll position', () => {
  const offsets = [0, 616, 1232, 1848]
  expect(indexFromOffsets(0, offsets, false)).toBe(0)
  expect(indexFromOffsets(300, offsets, false)).toBe(0)
  expect(indexFromOffsets(320, offsets, false)).toBe(1)
  expect(indexFromOffsets(1240, offsets, false)).toBe(2)
})

test('indexFromOffsets works for narrow frames with several in view', () => {
  const offsets = [0, 296, 592, 888, 1184, 1480, 1776]
  expect(indexFromOffsets(600, offsets, false)).toBe(2)
})

test('indexFromOffsets returns the last slide once the strip is scrolled to its end', () => {
  const offsets = [0, 296, 592, 888, 1184, 1480, 1776]
  expect(indexFromOffsets(1100, offsets, true)).toBe(6)
})

test('indexFromOffsets is safe with no slides', () => {
  expect(indexFromOffsets(100, [], false)).toBe(0)
  expect(indexFromOffsets(100, [], true)).toBe(0)
})

test('counterCaption numbers the slide out of the total', () => {
  expect(counterCaption(0, 7, 'Everyone')).toBe('01 / 07  Everyone')
  expect(counterCaption(3, 4, 'Loud the moment it breaks')).toBe(
    '04 / 04  Loud the moment it breaks'
  )
})
