import { slides } from './pipes'

test('screenshot alt text keeps brand names capitalised', () => {
  expect(slides.map((slide) => slide.shots[0].alt)).toEqual([
    'Pipes: status from your toolbar',
    'Pipes: every repo in a side panel',
    'Pipes: connect GitHub and GitLab',
    'Pipes: loud the moment it breaks'
  ])
})
