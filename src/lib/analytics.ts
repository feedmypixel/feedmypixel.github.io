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

  const dataLayer = (window.dataLayer = window.dataLayer ?? [])

  /* gtag must push the Arguments object itself. Pushing an equivalent array
     loads the tag and then silently sends nothing, so the rest-params form of
     this function would look correct and collect no data. */
  const gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments)
  } as (...args: unknown[]) => void

  gtag('js', new Date())
  gtag('config', analyticsId)
}

export function resetAnalyticsForTest() {
  loaded = false
}
