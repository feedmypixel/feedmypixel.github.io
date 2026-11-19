import { expect, type Locator } from '@playwright/test'

const minimumNonTextContrast = 3

export async function expectOutlineContrast(target: Locator) {
  const ratio = await target.evaluate((element) => {
    const context = document.createElement('canvas').getContext('2d')!
    const paint = (colour: string) => {
      context.fillStyle = colour
      context.fillRect(0, 0, 1, 1)
      return context.getImageData(0, 0, 1, 1).data
    }
    const luminance = ([red, green, blue]: Uint8ClampedArray) => {
      const [linearRed, linearGreen, linearBlue] = [red, green, blue].map((channel) => {
        const share = channel / 255
        return share <= 0.04045 ? share / 12.92 : ((share + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * linearRed + 0.7152 * linearGreen + 0.0722 * linearBlue
    }

    let backdropLayer = element
    while (paint(getComputedStyle(backdropLayer).backgroundColor)[3] < 255) {
      context.clearRect(0, 0, 1, 1)
      backdropLayer = backdropLayer.parentElement!
    }
    const backdrop = luminance(context.getImageData(0, 0, 1, 1).data)

    const outline = luminance(paint(getComputedStyle(element).borderTopColor))

    return (Math.max(backdrop, outline) + 0.05) / (Math.min(backdrop, outline) + 0.05)
  })

  expect(ratio, `contrast of ${target}`).toBeGreaterThanOrEqual(minimumNonTextContrast)
}
