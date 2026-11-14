import type { Role } from './data/experience'
import { describeMonths, monthsBetween, parseRoleRange } from './role-dates'

export type Chapter = {
  role: Role
  durationLabel: string | null
  months: number
}

export type Run = {
  company: string
  chapters: Chapter[]
  spanLabel: string
  tenureLabel: string | null
  tenureMonths: number
  metaLabel: string | null
}

const metaOf = (role: Role) => `${role.type} · ${role.location}`

/* A run is consecutive entries at one employer. Keying on company name alone
   would merge the two Freelance stints that sit years and other jobs apart. */
function consecutiveRuns(roles: Role[]): Role[][] {
  const runs: Role[][] = []
  for (const role of roles) {
    const open = runs[runs.length - 1]
    if (open && open[0].company === role.company) {
      open.push(role)
      continue
    }
    runs.push([role])
  }
  return runs
}

/* Entries arrive newest first. Walking forwards lets each chapter see the one
   before it, so a shared handover month can be charged to the earlier role. */
function chaptersFor(roles: Role[], now: Date): Chapter[] {
  const chronological = [...roles].reverse()
  const chapters: Chapter[] = []

  chronological.forEach((role, index) => {
    const range = parseRoleRange(role.dates, now)
    if (!range) {
      chapters.push({ role, durationLabel: null, months: 0 })
      return
    }

    const previous = chronological[index - 1]
    const previousRange = previous ? parseRoleRange(previous.dates, now) : null
    const sharesHandover =
      previousRange !== null &&
      previousRange.end.year === range.start.year &&
      previousRange.end.month === range.start.month

    const months = monthsBetween(range.start, range.end) - (sharesHandover ? 1 : 0)
    chapters.push({
      role,
      months: Math.max(months, 0),
      durationLabel: months < 1 ? null : describeMonths(months)
    })
  })

  return chapters.reverse()
}

function spanLabelFor(roles: Role[]): string {
  const oldest = roles[roles.length - 1].dates
  const newest = roles[0].dates
  if (roles.length === 1) {
    return newest
  }
  const from = oldest.split(' - ')[0].trim()
  const parts = newest.split(' - ')
  const to = (parts[1] ?? parts[0]).trim()
  return `${from} - ${to}`
}

export function buildRuns(roles: Role[], now: Date): Run[] {
  return consecutiveRuns(roles).map((entries) => {
    const chapters = chaptersFor(entries, now)
    const tenureMonths = chapters.reduce((total, chapter) => total + chapter.months, 0)
    const metas = new Set(entries.map(metaOf))

    return {
      company: entries[0].company,
      chapters,
      spanLabel: spanLabelFor(entries),
      tenureLabel: entries.length > 1 && tenureMonths > 0 ? describeMonths(tenureMonths) : null,
      tenureMonths,
      metaLabel: metas.size === 1 ? metaOf(entries[0]) : null
    }
  })
}
