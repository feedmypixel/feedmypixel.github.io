export function clampIndex(index: number, count: number) {
  if (count <= 0) {
    return 0
  }
  return Math.max(0, Math.min(count - 1, index))
}

export function indexFromScroll(scrollLeft: number, slideWidth: number, count: number) {
  if (slideWidth <= 0) {
    return 0
  }
  return clampIndex(Math.round(scrollLeft / slideWidth), count)
}

export function scrollOffsetFor(index: number, slideWidth: number) {
  return index * slideWidth
}
