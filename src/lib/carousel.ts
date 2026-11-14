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

const SETTLE_TOLERANCE_PX = 2

export function settledIndex({
  scrollLeft,
  offsets,
  maxScroll,
  current
}: {
  scrollLeft: number
  offsets: number[]
  maxScroll: number
  current: number
}) {
  const reachable = offsets.map((offset) => Math.min(offset, maxScroll))
  const currentOffset = reachable.at(current)
  if (currentOffset !== undefined && Math.abs(currentOffset - scrollLeft) <= SETTLE_TOLERANCE_PX) {
    return current
  }
  const atEnd = scrollLeft >= maxScroll - SETTLE_TOLERANCE_PX
  return indexFromOffsets(scrollLeft, reachable, atEnd)
}

const twoDigits = (value: number) => String(value).padStart(2, '0')

export const slideNumber = (index: number) => twoDigits(index + 1)

export function counterCaption(index: number, count: number, label: string) {
  return `${slideNumber(index)} / ${twoDigits(count)}  ${label}`
}
