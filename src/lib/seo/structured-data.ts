import { emailAddress, gitHubUrl, linkedInUrl, siteUrl } from '$lib/config'
import { roles } from '$lib/data/experience'
import { faqs, serviceFacts, serviceLede } from '$lib/data/services'

const organisation = {
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'feedMyPixel Ltd',
  url: siteUrl,
  logo: `${siteUrl}/apple-touch-icon.png`,
  email: emailAddress,
  foundingDate: '2012',
  identifier: '08198085'
}

const person = {
  '@type': 'Person',
  '@id': `${siteUrl}/#ben-chidgey`,
  name: 'Ben Chidgey',
  jobTitle: 'Contract full-stack engineer',
  email: emailAddress,
  url: siteUrl,
  sameAs: [gitHubUrl, linkedInUrl],
  worksFor: { '@id': `${siteUrl}/#organization` },
  knowsAbout: [...new Set(roles.flatMap((role) => role.tags))].sort(),
  hasOccupation: roles.map((role) => ({
    '@type': 'OrganizationRole',
    roleName: role.title,
    description: role.summary,
    namedPosition: role.title,
    memberOf: { '@type': 'Organization', name: role.company }
  }))
}

const website = {
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'feedMyPixel',
  publisher: { '@id': `${siteUrl}/#organization` },
  about: { '@id': `${siteUrl}/#ben-chidgey` }
}

const faqPage = {
  '@type': 'FAQPage',
  '@id': `${siteUrl}/#faq`,
  isPartOf: { '@id': `${siteUrl}/#website` },
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer }
  }))
}

const professionalService = {
  '@type': 'ProfessionalService',
  '@id': `${siteUrl}/#service`,
  name: 'Contract full-stack engineering',
  description: serviceLede,
  provider: { '@id': `${siteUrl}/#organization` },
  employee: { '@id': `${siteUrl}/#ben-chidgey` },
  areaServed: { '@type': 'Place', name: 'Worldwide, remote' },
  availableLanguage: 'en-GB',
  additionalProperty: serviceFacts.map((fact) => ({
    '@type': 'PropertyValue',
    name: fact.label,
    value: fact.value
  }))
}

export function homeStructuredData() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [organisation, person, website, professionalService, faqPage]
  })
}
