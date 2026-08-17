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
  dataLayer.push(['js', new Date()])
  dataLayer.push(['config', analyticsId])
}

export function resetAnalyticsForTest() {
  loaded = false
}
