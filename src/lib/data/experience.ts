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
      'Leading a greenfield rebuild of the core trading platform on SvelteKit, and building the iOS and Android apps from that same codebase with Capacitor. Modernising architecture and embedding quality across engineering, delivery and product.',
    tags: [
      'SvelteKit',
      'TypeScript',
      'Fastify',
      'Capacitor',
      'iOS',
      'Android',
      'AWS',
      'Accessibility',
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
    summary: 'Building the Core Delivery Platform (Portal) with the DEFRA platform team.',
    tags: ['Node', 'Hapi', 'GOV.UK', 'JavaScript', 'AWS', 'GitHub Actions']
  },
  {
    company: 'Wayfair',
    title: 'Software Engineer',
    dates: 'Aug 2022 - Dec 2022',
    location: 'Remote',
    type: 'Contract',
    sector: 'Retail',
    summary:
      'Built the Freight Portal frontend micro-service for the Global Transportation Services team, the place users find information and interact with every Wayfair facility service.',
    tags: [
      'React',
      'TypeScript',
      'Cypress',
      'Kubernetes',
      'Accessibility',
      'Micro frontend',
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
      'Tech lead on the Global Customs Platform team, creating the Customs Portal frontend micro-service.',
    tags: ['React', 'TypeScript', 'Jest', 'Kubernetes', 'Accessibility', 'DataDog', 'BuildKite']
  },
  {
    company: 'Pret A Manger',
    title: 'Platform Engineer',
    dates: 'Jan 2021 - Dec 2021',
    location: 'Remote',
    type: 'Contract',
    sector: 'Retail',
    summary:
      'Built a Backstage plugin serving SRE and Accelerate metrics from a TypeScript function and Express API over Postgres. Rolled out Sentry observability with Terraform, created Next.js and Express template repositories and ran chaos experiments and incident exercises.',
    tags: ['Node', 'Next.js', 'TypeScript', 'GCP', 'Terraform', 'Backstage', 'Sentry', 'Postgres']
  },
  {
    company: 'LifeBox Health',
    title: 'Senior Full-Stack Developer',
    dates: 'Jul 2020 - Dec 2020',
    location: 'Brighton / Remote',
    type: 'Contract',
    sector: 'Health',
    summary: 'Scaling the application for new business.',
    tags: ['React', 'GraphQL', 'Node', 'AWS', 'Accessibility']
  },
  {
    company: 'Rewind',
    title: 'Senior Frontend Developer',
    dates: 'Feb 2020 - Mar 2020',
    location: 'St Albans',
    type: 'Contract',
    sector: 'Mobile',
    summary: 'Leaflet map work for the Dubai 2020 mobile app.',
    tags: ['Node', 'JavaScript', 'Leaflet', 'Accessibility', 'UX']
  },
  {
    company: 'Ministry of Justice',
    title: 'Senior Full-Stack Developer',
    dates: 'Aug 2019 - Dec 2019',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary: 'Prisoner Escort & Custody Service (PECS).',
    tags: ['Node', 'GOV.UK', 'Progressive enhancement', 'Accessibility', 'Kubernetes']
  },
  {
    company: 'Marks & Spencer',
    title: 'Senior Full-Stack Developer',
    dates: 'Apr 2019 - Aug 2019',
    location: 'London',
    type: 'Contract',
    sector: 'Retail',
    summary: 'Framework team building tooling for the dot-com online business.',
    tags: ['Node', 'React', 'Architecture', 'Accessibility', 'Pattern library']
  },
  {
    company: 'HM Passport Office',
    title: 'Senior Full-Stack Developer',
    dates: 'Oct 2018 - Dec 2018',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary:
      'Inherited a legacy appointment booking system and its public journeys, worked out how it behaved and proposed a new roadmap with the design team while managing senior stakeholders. The team rebuilt it in-house as Node microservices.',
    tags: [
      'Node',
      'Microservices',
      'GOV.UK Pay',
      'Redis',
      'Accessibility',
      'Progressive enhancement',
      'Express'
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
      'Software and infrastructure for the Data Hub team, enabling civil servants to manage the business relationships behind UK trade and investment.',
    tags: ['Node', 'React', 'Vue', 'Docker', 'Redis', 'Accessibility', 'Pattern library', 'SSO']
  },
  {
    company: 'HM Revenue & Customs',
    title: 'Senior Frontend Developer',
    dates: 'Sep 2016 - Apr 2017',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary:
      'Created the HMRC design language in a small team, with the documentation, process and principles behind it, so designers and developers could build frontend services for the Tax Platform with parity across HMRC. Worked closely with GDS.',
    tags: [
      'Design system',
      'Pattern library',
      'Node',
      'Scala',
      'Sass',
      'Accessibility',
      'Documentation',
      'Mentoring'
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
      'Tackled frontend architecture across the Tax Platform with Platform Operations. Refactored shared assets, exposed components through a component library and mentored frontend developers and designers on how to approach common problems.',
    tags: [
      'Frontend architecture',
      'Component library',
      'React',
      'Scala',
      'Sass',
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
      'Built user interfaces for HMRC digital services. Implemented two factor authentication and registration with the Government Gateway team, generic client and server form validation for Identity Verification and the API documentation site.',
    tags: ['JavaScript', 'Scala', 'Node', 'Sass', 'Accessibility', 'Security', 'Forms']
  },
  {
    company: 'Department for Work & Pensions',
    title: 'Frontend Developer',
    dates: 'Apr 2015 - May 2015',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary:
      'Analysed a mature Universal Credit codebase and presented frontend improvements, tackling technical debt and building rapid prototyping tools and workflows for the UX and design team.',
    tags: ['JavaScript', 'Sass', 'FlightJS', 'Accessibility', 'Prototyping', 'Technical debt']
  },
  {
    company: 'Guardian News & Media',
    title: 'Client-Side Engineer',
    dates: 'Apr 2014 - Apr 2015',
    location: 'London',
    type: 'Contract',
    sector: 'Media',
    summary:
      'Client side engineer on the Membership team building the beta responsive site and its tools. Lean agile with Scala and micro JavaScript libraries, pair programming, code review and continuous integration.',
    tags: [
      'JavaScript',
      'Scala',
      'Sass',
      'BEM',
      'Responsive',
      'Pair programming',
      'Mentoring',
      'CI'
    ]
  },
  {
    company: 'feedMyPixel',
    title: 'Research & Development',
    dates: 'Feb 2014 - Mar 2014',
    location: 'St Albans',
    type: 'Freelance',
    sector: 'Products',
    summary: 'R&D time between contracts, getting to know AngularJS.',
    tags: ['Angular', 'JavaScript']
  },
  {
    company: 'Deutsche Telekom UK',
    title: 'Mobile Frontend Developer',
    dates: 'Oct 2012 - Dec 2013',
    location: 'Hatfield',
    type: 'Contract',
    sector: 'Telecoms',
    summary:
      'Responsive work across several products: a client dashboard, a globally distributed header injected into many Telekom pages, an SMS to web prototype that became the company Node skeleton and a rebuilt advertising asset platform.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Responsive', 'Node', 'Mobile', 'Express', 'Patterns']
  },
  {
    company: 'BBC',
    title: 'Software Engineer',
    dates: 'Aug 2011 - Aug 2012',
    location: 'London',
    type: 'Contract',
    sector: 'Media',
    summary:
      'Future Media Core Services on iBroadcast2, a next generation media and metadata publishing platform behind iPlayer, scheduling and BBC websites. Fortnight sprints with PHP, jQuery and Cucumber.',
    tags: ['PHP', 'Zend', 'JavaScript', 'jQuery', 'TDD', 'BDD', 'REST']
  },
  {
    company: 'eDigitalResearch',
    title: 'Application Support Developer',
    dates: 'Apr 2010 - Jul 2011',
    location: 'Southampton',
    type: 'Permanent',
    sector: 'Research',
    summary:
      'Supported the applications, websites and in-house tools behind customer insight analytics for clients including Sky, BT, Expedia, Virgin and the BBC.',
    tags: ['PHP', 'Zend', 'JavaScript', 'jQuery', 'PostgreSQL', 'Support']
  },
  {
    company: 'Freelance',
    title: 'Web Developer & Designer',
    dates: 'Oct 2007 - Apr 2010',
    location: 'Southampton',
    type: 'Freelance',
    sector: 'Arts',
    summary:
      'Extended my development work across a large dynamic website driven by a hand-built content management system, culminating in the Lazy Gramophone platform.',
    tags: ['PHP', 'JavaScript', 'MySQL', 'SEO', 'UX', 'CMS']
  },
  {
    company: 'Lazy Gramophone',
    title: 'Web Developer & Designer',
    dates: '2004 - 2010',
    location: 'Remote',
    type: 'Freelance',
    sector: 'Arts',
    summary:
      'Community website and bespoke CMS for the arts collective and publisher, with editing tools for artists to upload their work, an invite and management facility and comment moderation. Built from the ground up in PHP and MySQL.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'UX', 'SEO', 'CMS']
  },
  {
    company: 'Design Haus',
    title: 'Frontend Developer',
    dates: 'Mar 2010',
    location: 'Southampton',
    type: 'Freelance',
    sector: 'Agency',
    summary: 'Short overflow stint on an internal system for Diageo.',
    tags: ['jQuery', 'CSS', 'UX']
  },
  {
    company: 'Trusted Digital',
    title: 'Product Design Manager',
    dates: 'Jan 2007 - Oct 2007',
    location: 'Brighton',
    type: 'Permanent',
    sector: 'Mobile',
    summary: 'Interactive SMS marketing services for mobile handsets and the mobile web.',
    tags: ['XHTML-MP', 'CSS', 'SEO']
  },
  {
    company: 'Hotxt',
    title: 'Quality Assurance Manager',
    dates: 'Aug 2006 - Dec 2006',
    location: 'London',
    type: 'Permanent',
    sector: 'Mobile',
    summary:
      'Introduced a QA testing structure for a J2ME text over IP start-up across many handsets and networks, forming the beginnings of an in-house QA department.',
    tags: ['QA', 'Mobile', 'J2ME']
  },
  {
    company: 'Freelance',
    title: 'Developer & Designer',
    dates: 'Oct 2005 - Jul 2006',
    location: 'Brighton',
    type: 'Freelance',
    sector: 'Games',
    summary: 'Web and mobile media, J2ME game graphics and 3D modelling.',
    tags: ['Flash', 'Photoshop', '3D', 'Design']
  },
  {
    company: 'Babel Media',
    title: 'QA Technician',
    dates: 'Aug 2002 - Sep 2005',
    location: 'Brighton',
    type: 'Permanent',
    sector: 'Games',
    summary:
      'Console TRC certification for PS2 and GameCube, then started the mobile J2ME QA department and grew it from three people to over 150, adapting testing procedures to new workloads and operator requirements.',
    tags: ['Game QA', 'Mobile QA', 'Certification', 'Process']
  }
]
