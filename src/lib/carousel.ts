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

export function nearestSlide(centre: number, midpoints: number[]) {
  if (midpoints.length === 0) {
    return 0
  }
  let best = 0
  let bestDistance = Infinity
  midpoints.forEach((midpoint, index) => {
    const distance = Math.abs(midpoint - centre)
    if (distance < bestDistance) {
      bestDistance = distance
      best = index
    }
  })
  return best
}
