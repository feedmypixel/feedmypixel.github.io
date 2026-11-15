export function passedSectionIndex(headingTops: number[], line: number, { atBottom = false } = {}) {
  if (atBottom) {
    return headingTops.length - 1
  }
  const passed = headingTops.findLastIndex((top) => top <= line)
  return Math.max(passed, 0)
}
