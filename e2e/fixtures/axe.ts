import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const ENTRANCE_ANIMATION_MAX_MS = 1000

async function waitForEntranceAnimationsToSettle(page: Page) {
  await page.waitForFunction((maxMs) => {
    return document.getAnimations().every((animation) => {
      const duration = Number(animation.effect?.getComputedTiming().duration ?? 0)
      return duration > maxMs || animation.playState === 'finished'
    })
  }, ENTRANCE_ANIMATION_MAX_MS)
}

export async function expectNoSeriousA11yViolations(page: Page) {
  await page.evaluate(() => document.fonts.ready)
  await waitForEntranceAnimationsToSettle(page)

  const { violations } = await new AxeBuilder({ page }).analyze()

  const blocking = violations.filter((v) => v.impact === 'critical' || v.impact === 'serious')
  const lower = violations.filter((v) => v.impact !== 'critical' && v.impact !== 'serious')

  if (lower.length) {
    test.info().annotations.push({
      type: 'a11y (moderate/minor, not blocking)',
      description: lower.map((v) => `${v.impact} · ${v.id}: ${v.help}`).join('\n')
    })
  }

  const report = blocking.map((v) => `${v.impact} · ${v.id}: ${v.help}`).join('\n')
  expect(blocking, report).toEqual([])
}
