import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

export async function expectNoSeriousA11yViolations(page: Page) {
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
