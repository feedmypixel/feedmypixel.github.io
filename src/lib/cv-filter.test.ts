import {
  addChip,
  countLabel,
  deriveFacets,
  filterByControls,
  filterRoles,
  isTagHot,
  matchesChips,
  nextActiveIndex,
  roleCountLabel,
  searchBlob,
  suggestFacets,
  type Chip
} from './cv-filter'
import { roles } from './data/experience'
import type { Role } from './data/experience'

const role = (overrides: Partial<Role> = {}): Role => ({
  company: 'Guardian News & Media',
  title: 'Client-Side Engineer',
  dates: 'Apr 2014 – Apr 2015',
  type: 'Contract',
  location: 'London',
  sector: 'Media',
  summary: 'Membership team.',
  tags: ['JavaScript', 'Responsive'],
  ...overrides
})

test('the dataset holds every role, each fully described', () => {
  expect(roles).toHaveLength(27)
  roles.forEach((entry) => {
    expect(entry.company).toBeTruthy()
    expect(entry.title).toBeTruthy()
    expect(entry.dates).toBeTruthy()
    expect(entry.summary).toBeTruthy()
    expect(entry.tags.length).toBeGreaterThan(0)
    expect(['Contract', 'Freelance', 'Permanent']).toContain(entry.type)
  })
})

test('facets are derived from tags, companies and sectors', () => {
  const facets = deriveFacets([
    role({ company: 'BBC', sector: 'Media', tags: ['Node'] }),
    role({ company: 'DEFRA', sector: 'Government', tags: ['Node', 'AWS'] })
  ])

  expect(facets.find((facet) => facet.kind === 'skill' && facet.label === 'Node')?.count).toBe(2)
  expect(facets.find((facet) => facet.kind === 'client' && facet.label === 'BBC')?.count).toBe(1)
  expect(
    facets.find((facet) => facet.kind === 'sector' && facet.label === 'Government')?.count
  ).toBe(1)
})

test('facets are ordered by count, then alphabetically', () => {
  const facets = deriveFacets([
    role({ company: 'A', sector: 'Media', tags: ['Zebra', 'Alpha'] }),
    role({ company: 'B', sector: 'Media', tags: ['Alpha'] })
  ])
  const skills = facets.filter((facet) => facet.kind === 'skill').map((facet) => facet.label)
  expect(skills).toEqual(['Alpha', 'Zebra'])
  expect(facets[0]).toMatchObject({ label: 'Alpha', count: 2 })
})

test('chips combine with AND across kinds', () => {
  const entry = role({ company: 'DEFRA', sector: 'Government', tags: ['Node'] })
  expect(matchesChips(entry, [{ label: 'Node', kind: 'skill' }])).toBe(true)
  expect(
    matchesChips(entry, [
      { label: 'Node', kind: 'skill' },
      { label: 'Government', kind: 'sector' }
    ])
  ).toBe(true)
  expect(
    matchesChips(entry, [
      { label: 'Node', kind: 'skill' },
      { label: 'Media', kind: 'sector' }
    ])
  ).toBe(false)
})

test('chip matching ignores case', () => {
  expect(matchesChips(role({ tags: ['SvelteKit'] }), [{ label: 'sveltekit', kind: 'skill' }])).toBe(
    true
  )
})

test('no chips matches everything', () => {
  expect(matchesChips(role(), [])).toBe(true)
})

test('the search blob covers every searchable field', () => {
  const blob = searchBlob(role())
  expect(blob).toContain('guardian')
  expect(blob).toContain('client-side engineer')
  expect(blob).toContain('membership')
  expect(blob).toContain('media')
  expect(blob).toContain('contract')
  expect(blob).toContain('london')
  expect(blob).toContain('javascript')
})

test('the type filter narrows to one kind of engagement', () => {
  const entries = [role({ type: 'Contract' }), role({ type: 'Freelance' })]
  expect(filterByControls(entries, 'Freelance', [])).toHaveLength(1)
  expect(filterByControls(entries, 'All', [])).toHaveLength(2)
})

test('free text narrows the results and trims stray spacing', () => {
  const entries = [role({ company: 'BBC' }), role({ company: 'DEFRA' })]
  expect(filterRoles(entries, 'All', [], '  bbc  ')).toHaveLength(1)
})

test('an empty query leaves the control results untouched', () => {
  const entries = [role({ company: 'BBC' }), role({ company: 'DEFRA' })]
  expect(filterRoles(entries, 'All', [], '   ')).toHaveLength(2)
})

test('type, chips and free text all narrow together', () => {
  const entries = [
    role({ company: 'DEFRA', type: 'Contract', sector: 'Government', tags: ['Node'] }),
    role({ company: 'Hotxt', type: 'Permanent', sector: 'Mobile', tags: ['Node'] })
  ]
  const chips: Chip[] = [{ label: 'Node', kind: 'skill' }]
  expect(filterRoles(entries, 'Contract', chips, 'government')).toHaveLength(1)
  expect(filterRoles(entries, 'Permanent', chips, 'government')).toHaveLength(0)
})

test('suggestions drop what is already chosen', () => {
  const entries = [role({ tags: ['Node', 'AWS'] })]
  const facets = deriveFacets(entries)
  const suggestions = suggestFacets(facets, entries, [{ label: 'Node', kind: 'skill' }], '')
  expect(suggestions.map((facet) => facet.label)).not.toContain('Node')
})

test('suggestions match the typed term', () => {
  const entries = [role({ tags: ['Node', 'Accessibility'] })]
  const suggestions = suggestFacets(deriveFacets(entries), entries, [], 'acce')
  expect(suggestions.map((facet) => facet.label)).toEqual(['Accessibility'])
})

test('suggestion counts reflect the filters already applied', () => {
  const entries = [
    role({ company: 'DEFRA', type: 'Contract', tags: ['Node'] }),
    role({ company: 'Hotxt', type: 'Permanent', tags: ['Node'] })
  ]
  const inScope = filterByControls(entries, 'Contract', [])
  const suggestions = suggestFacets(deriveFacets(entries), inScope, [], 'node')
  expect(suggestions[0]).toMatchObject({ label: 'Node', count: 1 })
})

test('suggestions that would return nothing are dropped', () => {
  const entries = [role({ company: 'DEFRA', type: 'Contract', tags: ['Node'] })]
  const inScope = filterByControls(entries, 'Freelance', [])
  expect(suggestFacets(deriveFacets(entries), inScope, [], '')).toEqual([])
})

test('suggestions are capped', () => {
  expect(suggestFacets(deriveFacets(roles), roles, [], '').length).toBeLessThanOrEqual(7)
})

test('adding a chip twice changes nothing', () => {
  const chips = addChip([], { label: 'Node', kind: 'skill' })
  expect(addChip(chips, { label: 'Node', kind: 'skill' })).toBe(chips)
  expect(addChip(chips, { label: 'Node', kind: 'client' })).toHaveLength(2)
})

test('the count label says how much of the CV is showing', () => {
  expect(countLabel(27, 27)).toBe('27 roles')
  expect(countLabel(3, 27)).toBe('3 of 27')
})

test('a single role reads as one role', () => {
  expect(roleCountLabel(1)).toBe('1 role')
  expect(roleCountLabel(4)).toBe('4 roles')
})

test('tags light up when they match a chip or the typed term', () => {
  const chips: Chip[] = [{ label: 'Node', kind: 'skill' }]
  expect(isTagHot('Node', chips, '')).toBe(true)
  expect(isTagHot('AWS', chips, '')).toBe(false)
  expect(isTagHot('Accessibility', [], 'acce')).toBe(true)
})

test('a single typed character does not light every tag', () => {
  expect(isTagHot('Accessibility', [], 'a')).toBe(false)
})

test('client and sector chips do not light skill tags', () => {
  expect(isTagHot('DEFRA', [{ label: 'DEFRA', kind: 'client' }], '')).toBe(false)
})

test('arrow keys wrap around the suggestions', () => {
  expect(nextActiveIndex(-1, 3, 1)).toBe(0)
  expect(nextActiveIndex(2, 3, 1)).toBe(0)
  expect(nextActiveIndex(0, 3, -1)).toBe(2)
})

test('arrow keys do nothing without suggestions', () => {
  expect(nextActiveIndex(-1, 0, 1)).toBe(-1)
})
