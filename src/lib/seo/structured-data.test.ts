import { homeStructuredData } from './structured-data'
import { roles } from '#lib/data/experience.js'
import { faqs } from '#lib/data/services.js'

type GraphNode = Record<string, unknown>

const graph = () => JSON.parse(homeStructuredData())['@graph'] as GraphNode[]

const nodeOfType = (type: string) => graph().find((node) => node['@type'] === type) as GraphNode

function idReferences(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap(idReferences)
  }
  if (typeof value !== 'object' || value === null) {
    return []
  }
  const entries = Object.entries(value)
  if (entries.length === 1 && entries[0][0] === '@id') {
    return [entries[0][1]]
  }
  return entries.flatMap(([, nested]) => idReferences(nested))
}

test('the graph parses and names the five entities', () => {
  expect(graph().map((node) => node['@type'])).toEqual([
    'Organization',
    'Person',
    'WebSite',
    'ProfessionalService',
    'FAQPage'
  ])
})

test('every role becomes an occupation with a plain-text description', () => {
  const occupations = nodeOfType('Person').hasOccupation as { description: string }[]
  expect(occupations).toHaveLength(roles.length)
  expect(roles.some((role) => role.summary.includes('<'))).toBe(true)
  occupations.forEach((occupation) => expect(occupation.description).not.toMatch(/<[a-z/]/))
})

test('an answer with a link carries the link text', () => {
  const linked = faqs.filter((faq) => faq.link)
  expect(linked.length).toBeGreaterThan(0)
  const questions = nodeOfType('FAQPage').mainEntity as {
    name: string
    acceptedAnswer: { text: string }
  }[]
  linked.forEach((faq) => {
    const question = questions.find((entry) => entry.name === faq.question)
    expect(question?.acceptedAnswer.text).toBe(`${faq.answer} ${faq.link?.text}`)
  })
})

test('every @id reference resolves to a node in the graph', () => {
  const ids = graph().map((node) => node['@id'])
  const references = idReferences(graph())
  expect(references.length).toBeGreaterThan(0)
  references.forEach((reference) => expect(ids).toContain(reference))
})
