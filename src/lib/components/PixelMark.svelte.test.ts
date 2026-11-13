import { render } from 'vitest-browser-svelte'
import PixelMark from './PixelMark.svelte'

const squares = () =>
  [...document.querySelectorAll<HTMLElement>('.mark span')].map((square) => {
    const box = square.getBoundingClientRect()
    return { width: box.width, opacity: getComputedStyle(square).opacity }
  })

test('draws two 11px squares, the second faded, hidden from assistive tech', () => {
  render(PixelMark)
  expect(document.querySelector('.mark')?.getAttribute('aria-hidden')).toBe('true')
  expect(squares()).toEqual([
    { width: 11, opacity: '1' },
    { width: 11, opacity: '0.45' }
  ])
})

test('the large mark uses 14px squares', () => {
  render(PixelMark, { props: { size: 'large' } })
  expect(squares().map((square) => square.width)).toEqual([14, 14])
})
