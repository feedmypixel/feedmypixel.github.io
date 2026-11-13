export function clampIndex(index: number, count: number) {
  if (count <= 0) {
    return 0
  }
  return Math.max(0, Math.min(count - 1, index))
}

export function indexFromOffsets(scrollLeft: number, offsets: number[], atEnd: boolean) {
  if (offsets.length === 0) {
    return 0
  }
  if (atEnd) {
    return offsets.length - 1
  }
  let best = 0
  let bestDistance = Infinity
  offsets.forEach((offset, index) => {
    const distance = Math.abs(offset - scrollLeft)
    if (distance < bestDistance) {
      bestDistance = distance
      best = index
    }
  })
  return best
}

const twoDigits = (value: number) => String(value).padStart(2, '0')

export function counterCaption(index: number, count: number, label: string) {
  return `${twoDigits(index + 1)} / ${twoDigits(count)}  ${label}`
}
