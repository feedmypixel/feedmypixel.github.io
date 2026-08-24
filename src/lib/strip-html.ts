export function stripHtml(html: string) {
  return html
    .replaceAll('</p>', ' ')
    .replaceAll(/<[^>]+>/g, '')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .trim()
}
