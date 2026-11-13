import { mostVisibleId, indicatorGeometry, sectionForRoute } from './nav-indicator'

test('a product page marks Products in the section nav', () => {
  expect(sectionForRoute('/status')).toBe('products')
})

test('pages outside a section mark nothing', () => {
  expect(sectionForRoute('/components')).toBeNull()
  expect(sectionForRoute(null)).toBeNull()
})

const entry = (id: string, isIntersecting: boolean, intersectionRatio: number) => ({
  isIntersecting,
  intersectionRatio,
  target: { id }
})

test('mostVisibleId returns null when nothing intersects', () => {
  expect(mostVisibleId([entry('products', false, 0), entry('contact', false, 0)])).toBeNull()
})

test('mostVisibleId returns null for an empty list', () => {
  expect(mostVisibleId([])).toBeNull()
})

test('mostVisibleId picks the most-visible intersecting section', () => {
  const entries = [
    entry('products', true, 0.2),
    entry('experience', true, 0.8),
    entry('contact', false, 0.9)
  ]
  expect(mostVisibleId(entries)).toBe('experience')
})

test('indicatorGeometry is measured relative to the nav origin', () => {
  expect(indicatorGeometry({ left: 148, width: 92 }, { left: 40, width: 600 })).toEqual({
    left: 108,
    width: 92
  })
})
