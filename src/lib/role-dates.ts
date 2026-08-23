const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export type Point = { year: number; month: number }

export function parsePoint(text: string): Point | null {
  const withMonth = text.match(/^([A-Z][a-z]{2}) (\d{4})$/)
  if (withMonth) {
    const month = MONTHS.indexOf(withMonth[1])
    return month === -1 ? null : { year: Number(withMonth[2]), month }
  }

  const yearOnly = text.match(/^(\d{4})$/)
  return yearOnly ? { year: Number(yearOnly[1]), month: 0 } : null
}

export function describeMonths(months: number): string {
  const years = Math.floor(months / 12)
  const rest = months % 12
  const yearPart = years === 1 ? '1 year' : `${years} years`
  const monthPart = rest === 1 ? '1 month' : `${rest} months`

  if (years === 0) {
    return monthPart
  }
  return rest === 0 ? yearPart : `${yearPart} ${monthPart}`
}

/* Dates are display strings, and two of the roles predate the Mon YYYY format.
   Anything unparseable returns null so the card simply omits the duration. */
export function roleDuration(dates: string, now: Date): string | null {
  const [rawStart, rawEnd] = dates.split(' - ').map((part) => part.trim())
  if (!rawStart || !rawEnd) {
    return null
  }

  const start = parsePoint(rawStart)
  if (!start) {
    return null
  }

  const end =
    rawEnd === 'present' ? { year: now.getFullYear(), month: now.getMonth() } : parsePoint(rawEnd)
  if (!end) {
    return null
  }

  const months = (end.year - start.year) * 12 + (end.month - start.month) + 1
  return months < 1 ? null : describeMonths(months)
}

export function monthsBetween(start: Point, end: Point): number {
  return (end.year - start.year) * 12 + (end.month - start.month) + 1
}

export function parseRoleRange(dates: string, now: Date): { start: Point; end: Point } | null {
  const [rawStart, rawEnd] = dates.split(' - ').map((part) => part.trim())
  if (!rawStart || !rawEnd) {
    return null
  }
  const start = parsePoint(rawStart)
  const end =
    rawEnd === 'present' ? { year: now.getFullYear(), month: now.getMonth() } : parsePoint(rawEnd)
  return start && end ? { start, end } : null
}
