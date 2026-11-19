import { analyticsId } from './config'

const tagUrl = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`
const disableFlag = `ga-disable-${analyticsId}` as const
const cookieNames = ['_ga', `_ga_${analyticsId.replace('G-', '')}`]

export function enableAnalytics() {
  window[disableFlag] = false

  if (document.querySelector(`script[src="${tagUrl}"]`)) {
    return
  }

  const script = document.createElement('script')
  script.async = true
  script.src = tagUrl
  document.head.appendChild(script)

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

export function disableAnalytics() {
  window[disableFlag] = true

  // Google sets these with a domain attribute, which a host-only expiry would not match.
  for (const name of cookieNames) {
    const expired = `${name}=; max-age=0; path=/`
    document.cookie = expired
    document.cookie = `${expired}; domain=${location.hostname}`
  }
}
