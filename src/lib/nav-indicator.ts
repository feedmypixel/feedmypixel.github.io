type SectionEntry = {
  isIntersecting: boolean
  intersectionRatio: number
  target: { id: string }
}

type Rect = { left: number; width: number }

export function mostVisibleId(entries: SectionEntry[]): string | null {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
  return visible.length ? visible[0].target.id : null
}

const routeSections = new Map([
  ['/status', 'products'],
  ['/pipes', 'products'],
  ['/pipes/privacy', 'products']
])

export function sectionForRoute(routeId: string | null) {
  return (routeId && routeSections.get(routeId)) ?? null
}

export function indicatorGeometry(linkRect: Rect, navRect: Rect) {
  return {
    left: Math.round(linkRect.left - navRect.left),
    width: Math.round(linkRect.width)
  }
}
