import { disableAnalytics, enableAnalytics } from './analytics'
import { analyticsId } from './config'

const disableFlag = `ga-disable-${analyticsId}` as const
const sessionCookie = `_ga_${analyticsId.replace('G-', '')}`

const gtagScripts = () =>
  [...document.querySelectorAll('script')].filter((script) =>
    script.src.includes('googletagmanager.com')
  )

const cookieNames = () => document.cookie.split('; ').map((cookie) => cookie.split('=')[0])

const expireCookie = (name: string) => {
  document.cookie = `${name}=; max-age=0; path=/`
  document.cookie = `${name}=; max-age=0; path=/; domain=${location.hostname}`
}

beforeEach(() => {
  gtagScripts().forEach((script) => script.remove())
  delete window.dataLayer
  delete window[disableFlag]
  ;['_ga', sessionCookie, 'fmp-unrelated'].forEach(expireCookie)
})

test('enabling adds the tag for the configured property', () => {
  enableAnalytics()
  const scripts = gtagScripts()
  expect(scripts).toHaveLength(1)
  expect(scripts[0].src).toContain(analyticsId)
  expect(scripts[0].async).toBe(true)
})

test('enabling twice does not add the tag twice', () => {
  enableAnalytics()
  enableAnalytics()
  expect(gtagScripts()).toHaveLength(1)
})

test('the data layer is primed for the property', () => {
  enableAnalytics()
  expect(window.dataLayer?.length).toBe(2)
  expect(JSON.stringify(window.dataLayer)).toContain(analyticsId)
})

test('the data layer receives Arguments objects, which is what makes the tag send', () => {
  enableAnalytics()
  const entries = window.dataLayer ?? []
  expect(entries).toHaveLength(2)
  for (const entry of entries) {
    expect(Array.isArray(entry)).toBe(false)
    expect(Object.prototype.toString.call(entry)).toBe('[object Arguments]')
  }
})

test('disabling tells the loaded tag to stop sending', () => {
  enableAnalytics()
  disableAnalytics()
  expect(window[disableFlag]).toBe(true)
})

test('disabling removes the Google cookies and leaves others alone', () => {
  document.cookie = '_ga=GA1.1.1.1; path=/'
  document.cookie = `${sessionCookie}=GS1.1.1; path=/; domain=${location.hostname}`
  document.cookie = 'fmp-unrelated=1; path=/'
  expect(cookieNames()).toEqual(expect.arrayContaining(['_ga', sessionCookie]))

  disableAnalytics()

  expect(cookieNames()).not.toContain('_ga')
  expect(cookieNames()).not.toContain(sessionCookie)
  expect(cookieNames()).toContain('fmp-unrelated')
})

test('enabling again after disabling lets the same tag send again', () => {
  enableAnalytics()
  disableAnalytics()
  enableAnalytics()
  expect(window[disableFlag]).toBe(false)
  expect(gtagScripts()).toHaveLength(1)
  expect(window.dataLayer).toHaveLength(2)
})
