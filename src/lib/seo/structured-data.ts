import { emailAddress, gitHubUrl, linkedInUrl, siteUrl } from '$lib/config'
import { roles } from '$lib/data/experience'

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

export function homeStructuredData() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [organisation, person, website]
  })
}
