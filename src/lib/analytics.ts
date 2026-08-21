import { analyticsId } from './config'

let loaded = false

export function loadAnalytics(doc: Document = document) {
  if (loaded) {
    return
  }
  loaded = true

  const script = doc.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`
  doc.head.appendChild(script)

  /* Google's own snippet, injected verbatim. gtag needs a real Arguments object:
     pushing plain arrays or a hand-rolled array-like loads the script and
     silently drops the config, so the tag looks installed and never sends. */
  const bootstrap = doc.createElement('script')
  bootstrap.text =
    'window.dataLayer=window.dataLayer||[];' +
    'function gtag(){dataLayer.push(arguments);}' +
    "gtag('js',new Date());" +
    `gtag('config','${analyticsId}');`
  doc.head.appendChild(bootstrap)
}

export function resetAnalyticsForTest() {
  loaded = false
}
