import { loadAnalytics, resetAnalyticsForTest } from './analytics'
import { analyticsId } from './config'

const gtagScripts = () =>
  [...document.querySelectorAll('script')].filter((script) =>
    script.src.includes('googletagmanager.com')
  )

beforeEach(() => {
  resetAnalyticsForTest()
  gtagScripts().forEach((script) => script.remove())
  delete window.dataLayer
})

test('nothing from Google is on the page until analytics is loaded', () => {
  expect(gtagScripts()).toHaveLength(0)
})

test('loading adds the tag for the configured property', () => {
  loadAnalytics()
  const scripts = gtagScripts()
  expect(scripts).toHaveLength(1)
  expect(scripts[0].src).toContain(analyticsId)
  expect(scripts[0].async).toBe(true)
})

test('loading twice does not add the tag twice', () => {
  loadAnalytics()
  loadAnalytics()
  expect(gtagScripts()).toHaveLength(1)
})

test('the data layer is primed for the property', () => {
  loadAnalytics()
  expect(window.dataLayer?.length).toBe(2)
  expect(JSON.stringify(window.dataLayer)).toContain(analyticsId)
})

test('the data layer receives Arguments objects, which is what makes the tag send', () => {
  loadAnalytics()
  const entries = window.dataLayer ?? []
  expect(entries).toHaveLength(2)
  for (const entry of entries) {
    expect(Array.isArray(entry)).toBe(false)
    expect(Object.prototype.toString.call(entry)).toBe('[object Arguments]')
  }
})
