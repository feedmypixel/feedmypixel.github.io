import type { Role, RoleType } from './data/experience'
import { stripHtml } from './strip-html'

export type FacetKind = 'skill' | 'client' | 'sector'
export type Facet = { label: string; kind: FacetKind; count: number }
export type Chip = { label: string; kind: FacetKind }
export type TypeFilter = RoleType | 'All'

export const TYPE_FILTERS: TypeFilter[] = ['All', 'Contract', 'Freelance', 'Permanent']

export const QUICK_FILTERS: Chip[] = [
  { label: 'SvelteKit', kind: 'skill' },
  { label: 'Node', kind: 'skill' },
  { label: 'TypeScript', kind: 'skill' },
  { label: 'Accessibility', kind: 'skill' },
  { label: 'AWS', kind: 'skill' },
  { label: 'Government', kind: 'sector' }
]

const valuesFor = (role: Role, kind: FacetKind) =>
  kind === 'skill' ? role.tags : kind === 'client' ? [role.company] : [role.sector]

const matches = (role: Role, chip: Chip) =>
  valuesFor(role, chip.kind).some((value) => value.toLowerCase() === chip.label.toLowerCase())

export function deriveFacets(roles: Role[]): Facet[] {
  const byKey = new Map<string, Facet>()
  const add = (label: string, kind: FacetKind) => {
    const key = `${kind}|${label}`
    const existing = byKey.get(key)
    if (existing) {
      existing.count += 1
      return
    }
    byKey.set(key, { label, kind, count: 1 })
  }

  roles.forEach((role) => {
    role.tags.forEach((tag) => add(tag, 'skill'))
    add(role.company, 'client')
    add(role.sector, 'sector')
  })

  return [...byKey.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}

export function matchesChips(role: Role, chips: Chip[]) {
  return chips.every((chip) => matches(role, chip))
}

export function searchBlob(role: Role) {
  return [
    role.company,
    role.title,
    stripHtml(role.summary),
    role.sector,
    role.type,
    role.location,
    role.tags.join(' ')
  ]
    .join(' ')
    .toLowerCase()
}

export function filterByControls(roles: Role[], type: TypeFilter, chips: Chip[]) {
  return roles.filter((role) => (type === 'All' || role.type === type) && matchesChips(role, chips))
}

export function filterRoles(roles: Role[], type: TypeFilter, chips: Chip[], query: string) {
  const term = query.trim().toLowerCase()
  const byControls = filterByControls(roles, type, chips)
  return term ? byControls.filter((role) => searchBlob(role).includes(term)) : byControls
}

export function suggestFacets(
  facets: Facet[],
  rolesInScope: Role[],
  chips: Chip[],
  query: string,
  limit = 7
): Facet[] {
  const term = query.trim().toLowerCase()
  const chosen = new Set(chips.map((chip) => `${chip.kind}|${chip.label}`))

  return facets
    .filter((facet) => !chosen.has(`${facet.kind}|${facet.label}`))
    .filter((facet) => !term || facet.label.toLowerCase().includes(term))
    .map((facet) => ({
      ...facet,
      count: rolesInScope.filter((role) => matches(role, facet)).length
    }))
    .filter((facet) => facet.count > 0)
    .slice(0, limit)
}

export function addChip(chips: Chip[], chip: Chip) {
  const alreadyThere = chips.some(
    (existing) => existing.kind === chip.kind && existing.label === chip.label
  )
  return alreadyThere ? chips : [...chips, chip]
}

export function countLabel(shown: number, total: number) {
  return shown === total ? `${total} roles` : `${shown} of ${total}`
}

export function roleCountLabel(count: number) {
  return count === 1 ? '1 role' : `${count} roles`
}

export function isTagHot(tag: string, chips: Chip[], query: string) {
  const term = query.trim().toLowerCase()
  const skills = new Set(
    chips.filter((chip) => chip.kind === 'skill').map((chip) => chip.label.toLowerCase())
  )
  return skills.has(tag.toLowerCase()) || (term.length > 1 && tag.toLowerCase().includes(term))
}

export function nextActiveIndex(active: number, count: number, step: 1 | -1) {
  if (count === 0) {
    return -1
  }
  return (active + step + count) % count
}
