import { expect, test, type Locator } from '@playwright/test'

const routes = ['/', '/status', '/pipes']

const captionRow = (figure: Locator) =>
  figure.evaluate((element) => {
    const rect = (selector: string) => element.querySelector(selector)!.getBoundingClientRect()
    const caption = rect(':scope > figcaption')
    const dots = rect(':scope > figcaption > .dots')
    const counter = rect(':scope > figcaption > .caption')
    const strip = rect(':scope .strip')
    return {
      dotsTop: Math.round(dots.top - caption.top),
      dotsLeft: Math.round(dots.left - caption.left),
      counterLeftOfStrip: Math.round(counter.left - strip.left),
      dotsRightOfStrip: Math.round(strip.right - dots.right)
    }
  })

for (const route of routes) {
  test(`on a phone the dots stay put on every slide on ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 852 })
    await page.goto(route)
    const figures = await page.locator('figure.carousel').all()
    expect(figures.length).toBeGreaterThan(0)
    for (const figure of figures) {
      await figure.scrollIntoViewIfNeeded()
      const { dotsTop, dotsLeft } = await captionRow(figure)
      const dots = await figure.locator('.dot').all()
      expect(dots.length).toBeGreaterThan(1)
      for (const dot of dots) {
        await dot.click()
        const after = await captionRow(figure)
        expect({ dotsTop: after.dotsTop, dotsLeft: after.dotsLeft }).toEqual({ dotsTop, dotsLeft })
      }
    }
  })

  test(`the counter and dots line up with the slides on ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(route)
    const figures = await page.locator('figure.carousel').all()
    expect(figures.length).toBeGreaterThan(0)
    for (const figure of figures) {
      await figure.scrollIntoViewIfNeeded()
      const { counterLeftOfStrip, dotsRightOfStrip } = await captionRow(figure)
      expect(counterLeftOfStrip).toBe(0)
      expect(dotsRightOfStrip).toBe(0)
    }
  })
}

test('the next button jumps without animating for a visitor who prefers reduced motion', async ({
  page
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/pipes')
  const figure = page.locator('figure.carousel').first()
  await expect(figure.locator('.next')).toBeVisible()
  const scrolledStraightAfterClick = await figure.evaluate((element) => {
    element.querySelector<HTMLButtonElement>('.next')!.click()
    return element.querySelector('.strip')!.scrollLeft
  })
  expect(scrolledStraightAfterClick).toBeGreaterThan(0)
})
