import { stripHtml } from './strip-html'

test('paragraphs become spaces so words do not run together', () => {
  expect(stripHtml('<p>One.</p><p>Two.</p>')).toBe('One. Two.')
})

test('tags are dropped and their text kept', () => {
  expect(stripHtml('Built in <strong>Svelte</strong> for <a href="/x">the BBC</a>')).toBe(
    'Built in Svelte for the BBC'
  )
})

test('the three escaped characters are restored', () => {
  expect(stripHtml('R&amp;D where a &lt; b &gt; c')).toBe('R&D where a < b > c')
})
