import { slugify } from './slugify.js'

test('lower-cases words and joins them with hyphens', () => {
  expect(slugify('What data Pipes handles')).toBe('what-data-pipes-handles')
})

test('drops punctuation, apostrophes and emoji', () => {
  expect(slugify("Like to build something together? It's 🍛 time.")).toBe(
    'like-to-build-something-together-its-time'
  )
})

test('never starts or ends with a hyphen', () => {
  expect(slugify(' - Contact - ')).toBe('contact')
})
