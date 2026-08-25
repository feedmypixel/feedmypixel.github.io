export type RoleType = 'Contract' | 'Freelance' | 'Permanent'

export type Role = {
  company: string
  title: string
  dates: string
  type: RoleType
  location: string
  sector: string
  summary: string
  tags: string[]
}

export const roles: Role[] = [
  {
    company: 'WhiskyInvestDirect',
    title: 'Full-Stack Engineer',
    dates: 'Apr 2026 - present',
    location: 'Remote / London',
    type: 'Contract',
    sector: 'Fintech',
    summary:
      '<p>Leading a greenfield rebuild of the core trading platform and API. Rebuild of the iOS and Android apps. Modernising of the architecture and embedding User Experience, Developer Experience, testing, accessibility and delivery best practice across engineering and product.</p>',
    tags: [
      'TypeScript',
      'JavaScript',
      'CSS',
      'HTML',
      'SvelteKit',
      'Fastify',
      'Capacitor',
      'iOS',
      'Android',
      'AWS',
      'Vitest',
      'Playwright',
      'Accessibility',
      'Observability',
      'CI/CD'
    ]
  },
  {
    company: 'DEFRA',
    title: 'Full-Stack Platform Engineer',
    dates: 'Mar 2023 - Feb 2026',
    location: 'Remote',
    type: 'Contract',
    sector: 'Government',
    summary:
      "<p>Designed and built the Core Delivery Platform Portal suite of services from a blank page. The Portal is the developer UI at DEFRA for microservice templates, testing tools, prototype kits and package libraries alongside the supporting platforms infrastructure, observability and monitoring, all on demand.</p><p>The Portal provides an admin UI for the Platform team and gives tenant teams a UI to create, manage, release and run their services, tooling, infra and team users. Sitting at the core of DEFRA's software offering and upholding parity and standards across the estate.</p><p>It went from a concept to the way software gets built at DEFRA. GDS reported first releases falling from three to six months down to hours and recovery from failure from a week to under an hour.</p>",
    tags: [
      'JavaScript',
      'CSS',
      'HTML',
      'Node',
      'Hapi',
      'MongoDB',
      'GOV.UK Frontend',
      'Nunjucks',
      'AWS',
      'Docker',
      'Vitest',
      'WDIO',
      'GitHub Actions',
      'Accessibility',
      'Design system',
      'Templates',
      'Postgres',
      'GOV.UK'
    ]
  },
  {
    company: 'Wayfair',
    title: 'Software Engineer',
    dates: 'Aug 2022 - Dec 2022',
    location: 'Remote',
    type: 'Contract',
    sector: 'Retail',
    summary:
      '<p>Built the Freight Portal frontend microservice for Global Transportation Services, where users find and interact with every Wayfair facility service.</p>',
    tags: [
      'TypeScript',
      'JavaScript',
      'CSS',
      'HTML',
      'React',
      'Kubernetes',
      'Jest',
      'Cypress',
      'Micro frontend',
      'Accessibility',
      'DataDog'
    ]
  },
  {
    company: 'Wayfair',
    title: 'Senior Frontend Engineer / Tech Lead',
    dates: 'Jan 2022 - Aug 2022',
    location: 'Remote',
    type: 'Contract',
    sector: 'Retail',
    summary:
      '<p>Tech lead on the Global Customs Platform team, creating the Customs Portal frontend microservice.</p>',
    tags: [
      'TypeScript',
      'JavaScript',
      'CSS',
      'HTML',
      'React',
      'Kubernetes',
      'Jest',
      'Cypress',
      'Accessibility',
      'DataDog',
      'BuildKite'
    ]
  },
  {
    company: 'Pret A Manger',
    title: 'Platform Engineer',
    dates: 'Jan 2021 - Dec 2021',
    location: 'Remote',
    type: 'Contract',
    sector: 'Retail',
    summary:
      '<p>Built a custom developer Backstage platform, Disco. A Backstage plugin serving SRE and Accelerate metrics from a TypeScript function and Express API over Postgres. Rolled out Sentry observability with Terraform, created Next.js and Express template repositories and ran chaos experiments and incident exercises with platform teams.</p>',
    tags: [
      'TypeScript',
      'JavaScript',
      'CSS',
      'HTML',
      'Node',
      'React',
      'Next.js',
      'GCP',
      'Lambda',
      'Terraform',
      'Backstage',
      'Postgres',
      'Sentry',
      'Jest',
      'Cypress'
    ]
  },
  {
    company: 'LifeBox Health',
    title: 'Senior Full-Stack Developer',
    dates: 'Jul 2020 - Dec 2020',
    location: 'Brighton / Remote',
    type: 'Contract',
    sector: 'Health',
    summary:
      '<p>Took on a React codebase grown over several years and stalled midway through the move from class to function components. Brought in functional patterns, testing and quality. Improved both the user experience and the developer experience while working alongside the junior developers on the team.</p>',
    tags: [
      'JavaScript',
      'CSS',
      'HTML',
      'React',
      'GraphQL',
      'Node',
      'AWS',
      'Lambda',
      'Jest',
      'CodeceptJS',
      'Accessibility',
      'Mentoring'
    ]
  },
  {
    company: 'Rewind',
    title: 'Senior Frontend Developer',
    dates: 'Feb 2020 - Mar 2020',
    location: 'St Albans',
    type: 'Contract',
    sector: 'Mobile',
    summary:
      '<p>Brought in as the specialist to get a late project over the line: the Leaflet mapping inside the Dubai Expo 2020 app.</p>',
    tags: ['JavaScript', 'CSS', 'HTML', 'Node', 'Leaflet', 'Accessibility', 'UX']
  },
  {
    company: 'Ministry of Justice',
    title: 'Senior Full-Stack Developer',
    dates: 'Aug 2019 - Dec 2019',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary:
      '<p>Frontend for booking secure moves on the Prisoner Escort and Custody Service, a paper to digital transformation delivered with designers and user researchers. Built document upload as a whole vertical: the multi-file upload component, its controller and API model, size limits and client side error handling, the translations and both unit and end to end coverage. Handed it over on leaving and it stayed in the service for years afterwards.</p>',
    tags: [
      'JavaScript',
      'CSS',
      'HTML',
      'Node',
      'Express',
      'GOV.UK',
      'Nunjucks',
      'Pattern library',
      'Progressive enhancement',
      'Kubernetes',
      'Jest',
      'Testcafe',
      'Accessibility'
    ]
  },
  {
    company: 'Marks & Spencer',
    title: 'Senior Full-Stack Developer',
    dates: 'Apr 2019 - Aug 2019',
    location: 'London',
    type: 'Contract',
    sector: 'Retail',
    summary:
      '<p>Framework team, building the shared tooling and component library used by teams across the dot-com business and worked with the bespoke in-house JavaScript framework, whilst React was brought in to various departments across the business.</p>',
    tags: [
      'JavaScript',
      'CSS',
      'HTML',
      'Node',
      'Express',
      'React',
      'Architecture',
      'Pattern library',
      'Concourse',
      'Jest',
      'Progressive enhancement',
      'Accessibility',
      'Mentoring'
    ]
  },
  {
    company: 'HM Passport Office',
    title: 'Senior Full-Stack Developer',
    dates: 'Oct 2018 - Dec 2018',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary:
      '<p>Inherited a legacy appointment booking system and its public journeys, established how it actually behaved, then proposed a roadmap with the design team and carried it through senior stakeholders. The team rebuilt it in-house as Node microservices.</p>',
    tags: [
      'JavaScript',
      'CSS',
      'HTML',
      'Node',
      'Express',
      'Microservices',
      'GOV.UK Pay',
      'Home Office Forms',
      'Redis',
      'Jest',
      'Progressive enhancement',
      'Accessibility'
    ]
  },
  {
    company: 'Department for International Trade',
    title: 'Senior Full-Stack Developer',
    dates: 'May 2017 - Mar 2018',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary:
      '<p>Software and infrastructure for the Data Hub team, enabling civil servants to manage the business relationships behind UK trade and investment.</p>',
    tags: [
      'JavaScript',
      'CSS',
      'HTML',
      'Node',
      'Express',
      'React',
      'Vue',
      'Nunjucks',
      'Docker',
      'Redis',
      'SSO',
      'CircleCI',
      'Nightwatch',
      'Pattern library',
      'Accessibility',
      'Architecture'
    ]
  },
  {
    company: 'HM Revenue & Customs',
    title: 'Senior Frontend Developer',
    dates: 'Sep 2016 - Apr 2017',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary:
      '<p>Created the HMRC design language in a small team, with the documentation, process and principles behind it, so designers and developers could build frontend services for the Tax Platform with parity across HMRC. Worked closely with GDS and partnered on the first releases of the GOV.UK Frontend.</p>',
    tags: [
      'JavaScript',
      'CSS',
      'HTML',
      'Design system',
      'Pattern library',
      'Frontend operations',
      'Node',
      'Scala',
      'Sass',
      'AWS',
      'Responsive',
      'Accessibility',
      'Documentation',
      'Mentoring',
      'GOV.UK Frontend'
    ]
  },
  {
    company: 'HM Revenue & Customs',
    title: 'Senior Frontend Developer',
    dates: 'Feb 2016 - Sep 2016',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary:
      '<p>Tackled frontend architecture across the Tax Platform with Platform Operations. Refactored shared assets, exposed components through a component library and mentored frontend developers and designers on how to approach common problems.</p>',
    tags: [
      'JavaScript',
      'CSS',
      'HTML',
      'Frontend architecture',
      'Component library',
      'React',
      'Node',
      'Scala',
      'Sass',
      'Responsive',
      'Accessibility',
      'Mentoring'
    ]
  },
  {
    company: 'HM Revenue & Customs',
    title: 'Frontend Developer',
    dates: 'Sep 2015 - Feb 2016',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary:
      '<p>Built user interfaces for HMRC digital services. Implemented Government Gateway two factor authentication and registration, generic client and server form validation for Identity Verification and the API documentation site.</p>',
    tags: [
      'JavaScript',
      'CSS',
      'HTML',
      'Scala',
      'Node',
      'Sass',
      'Responsive',
      'Security',
      'Forms',
      'Accessibility'
    ]
  },
  {
    company: 'Department for Work & Pensions',
    title: 'Frontend Developer',
    dates: 'Apr 2015 - May 2015',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary:
      '<p>Universal Credit. Analysed a mature codebase and presented frontend improvements, tackled technical debt and built rapid prototyping tools and workflows for the UX and design team.</p>',
    tags: [
      'JavaScript',
      'CSS',
      'HTML',
      'Node',
      'Sass',
      'FlightJS',
      'Jasmine',
      'Grunt',
      'Responsive',
      'Prototyping',
      'Accessibility',
      'Technical debt'
    ]
  },
  {
    company: 'Guardian News & Media',
    title: 'Client-Side Engineer',
    dates: 'Apr 2014 - Apr 2015',
    location: 'London',
    type: 'Contract',
    sector: 'Media',
    summary:
      '<p>Membership team, building the beta responsive site and its tools. Lean agile with Scala and micro JavaScript libraries, pair programming, code review and continuous integration.</p>',
    tags: [
      'JavaScript',
      'CSS',
      'HTML',
      'Node',
      'Scala',
      'Sass',
      'BEM',
      'Responsive',
      'Jasmine',
      'Grunt',
      'CI',
      'Pair programming',
      'Code review',
      'Mentoring'
    ]
  },
  {
    company: 'feedMyPixel',
    title: 'Research & Development',
    dates: 'Feb 2014 - Mar 2014',
    location: 'St Albans',
    type: 'Freelance',
    sector: 'Products',
    summary:
      '<p>Research and development between contracts, getting to know AngularJS as well as other side projects.</p>',
    tags: ['JavaScript', 'CSS', 'HTML', 'Angular']
  },
  {
    company: 'Deutsche Telekom UK',
    title: 'Mobile Frontend Developer',
    dates: 'Oct 2012 - Dec 2013',
    location: 'Hatfield',
    type: 'Contract',
    sector: 'Telecoms',
    summary:
      '<p>Responsive work across several products: a client dashboard, a globally distributed header injected into many Telekom pages, an SMS to web prototype that became the company Node skeleton and a rebuilt advertising asset platform.</p>',
    tags: [
      'JavaScript',
      'CSS3',
      'HTML5',
      'Responsive',
      'Node',
      'Express',
      'Jessie',
      'Mobile',
      'Patterns'
    ]
  },
  {
    company: 'BBC',
    title: 'Software Engineer',
    dates: 'Aug 2011 - Aug 2012',
    location: 'London',
    type: 'Contract',
    sector: 'Media',
    summary:
      '<p>Future Media Core Services on iBroadcast2, a next generation media and metadata publishing platform behind iPlayer, scheduling and BBC websites. Fortnight sprints with PHP, jQuery and Cucumber.</p>',
    tags: [
      'JavaScript',
      'CSS',
      'HTML',
      'PHP',
      'Zend',
      'jQuery',
      'LessCSS',
      'TDD',
      'BDD',
      'REST',
      'Pair programming'
    ]
  },
  {
    company: 'eDigitalResearch',
    title: 'Application Support Developer',
    dates: 'Apr 2010 - Jul 2011',
    location: 'Southampton',
    type: 'Permanent',
    sector: 'Research',
    summary:
      '<p>Supported the applications, websites and in-house tools behind customer insight analytics for clients including Sky, BT, Expedia, Virgin and the BBC.</p>',
    tags: [
      'JavaScript',
      'CSS',
      'HTML',
      'PHP',
      'Zend',
      'jQuery',
      'MooTools',
      'PostgreSQL',
      'Support'
    ]
  },
  {
    company: 'Freelance',
    title: 'Web Developer & Designer',
    dates: 'Oct 2007 - Apr 2010',
    location: 'Southampton',
    type: 'Freelance',
    sector: 'Arts',
    summary:
      '<p>Development across a large dynamic website driven by a hand-built content management system, culminating in the Lazy Gramophone platform.</p>',
    tags: ['JavaScript', 'CSS', 'HTML', 'PHP', 'MySQL', 'SEO', 'UX', 'CMS']
  },
  {
    company: 'Lazy Gramophone',
    title: 'Web Developer & Designer',
    dates: '2004 - 2010',
    location: 'Remote',
    type: 'Freelance',
    sector: 'Arts',
    summary:
      '<p>A community publishing platform and bespoke CMS for the arts collective and publisher, built from the ground up in PHP and MySQL, with editing tools for artists to manage their own work, an invite and management facility and comment moderation.</p>',
    tags: ['JavaScript', 'CSS', 'HTML', 'PHP', 'MySQL', 'Photoshop', 'UX', 'SEO', 'CMS']
  },
  {
    company: 'Design Haus',
    title: 'Frontend Developer',
    dates: 'Mar 2010',
    location: 'Southampton',
    type: 'Freelance',
    sector: 'Agency',
    summary: '<p>An internal intranet for Diageo, built in jQuery and Mustache.</p>',
    tags: ['JavaScript', 'CSS', 'HTML', 'jQuery', 'Mustache', 'Photoshop', 'UX']
  },
  {
    company: 'Trusted Digital',
    title: 'Product Design Manager',
    dates: 'Jan 2007 - Oct 2007',
    location: 'Brighton',
    type: 'Permanent',
    sector: 'Mobile',
    summary:
      '<p>Interactive SMS marketing services for mobile handsets and the mobile web, built in Mobile Profile HTML. Making the case for purpose-built mobile experiences years before mobile first became normal practice.</p>',
    tags: ['XHTML-MP', 'CSS', 'Photoshop', 'SEO']
  },
  {
    company: 'Hotxt',
    title: 'Quality Assurance Manager',
    dates: 'Aug 2006 - Dec 2006',
    location: 'London',
    type: 'Permanent',
    sector: 'Mobile',
    summary:
      '<p>Introduced a QA testing structure for a J2ME text over IP start-up across many handsets and networks, forming the beginnings of an in-house QA department.</p>',
    tags: ['QA', 'Mobile', 'J2ME']
  },
  {
    company: 'Freelance',
    title: 'Developer & Designer',
    dates: 'Oct 2005 - Jul 2006',
    location: 'Brighton',
    type: 'Freelance',
    sector: 'Games',
    summary:
      '<p>Web and mobile media, J2ME game graphics and 3D modelling, including the 3D work for the Concorde2 website and the Battleships mobile game.</p>',
    tags: [
      'JavaScript',
      'CSS',
      'HTML',
      'Flash',
      'Photoshop',
      '3ds Max',
      'Premiere',
      'J2ME',
      'Design',
      '3D'
    ]
  },
  {
    company: 'Babel Media',
    title: 'QA Technician',
    dates: 'Aug 2002 - Sep 2005',
    location: 'Brighton',
    type: 'Permanent',
    sector: 'Games',
    summary:
      '<p>Console TRC certification for PS2 and GameCube, then started the mobile J2ME QA department and grew it from three people to over 150, adapting testing procedures to new workloads and operator requirements.</p>',
    tags: [
      'Game QA',
      'Mobile QA',
      'Sony TRC',
      'Microsoft certification',
      'Test-track Pro',
      'Process',
      'Certification'
    ]
  }
]
