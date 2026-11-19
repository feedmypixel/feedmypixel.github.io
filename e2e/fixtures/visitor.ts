import { expect, type Page } from '@playwright/test'

export const rememberConsent = (page: Page, choice: 'granted' | 'denied') =>
  page.addInitScript((stored) => localStorage.setItem('fmp-consent', stored), choice)

// Needs a stored consent choice: the app removes that visitor's pre-paint mark as it starts.
export const appHasStarted = (page: Page) =>
  expect(page.locator('html')).not.toHaveAttribute('data-consent-decided')
