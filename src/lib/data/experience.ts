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
    dates: 'Apr 2026 – present',
    location: 'Remote / London',
    type: 'Contract',
    sector: 'Fintech',
    summary:
      'Leading a greenfield rebuild of the core trading platform on SvelteKit — modernising architecture and embedding quality across engineering, delivery and product.',
    tags: ['SvelteKit', 'TypeScript', 'Fastify', 'AWS', 'Accessibility', 'CI/CD']
  },
  {
    company: 'DEFRA',
    title: 'Full-Stack Platform Engineer',
    dates: 'Mar 2023 – Feb 2026',
    location: 'Remote',
    type: 'Contract',
    sector: 'Government',
    summary: 'Building the Core Delivery Platform (Portal) with the DEFRA platform team.',
    tags: ['Node', 'Hapi', 'GOV.UK', 'JavaScript', 'AWS', 'GitHub Actions']
  },
  {
    company: 'Wayfair',
    title: 'Software Engineer',
    dates: 'Aug 2022 – Dec 2022',
    location: 'Remote',
    type: 'Contract',
    sector: 'Retail',
    summary: 'Freight Portal frontend micro-service for the Global Transportation Services team.',
    tags: ['React', 'TypeScript', 'Cypress', 'Kubernetes', 'Accessibility']
  },
  {
    company: 'Wayfair',
    title: 'Senior Frontend Engineer / Tech Lead',
    dates: 'Jan 2022 – Aug 2022',
    location: 'Remote',
    type: 'Contract',
    sector: 'Retail',
    summary:
      'Tech lead on the Global Customs Platform, building the Customs Portal frontend micro-service.',
    tags: ['React', 'TypeScript', 'Jest', 'Kubernetes', 'Accessibility']
  },
  {
    company: 'Pret A Manger',
    title: 'Platform Engineer',
    dates: 'Jan 2021 – Dec 2021',
    location: 'Remote',
    type: 'Contract',
    sector: 'Retail',
    summary:
      'Platform team: SRE/Accelerate metrics, observability, service templates and chaos/incident exercises.',
    tags: ['Node', 'Next.js', 'TypeScript', 'GCP', 'Terraform', 'GitHub Actions']
  },
  {
    company: 'LifeBox Health',
    title: 'Senior Full-Stack Developer',
    dates: 'Jul 2020 – Dec 2020',
    location: 'Brighton / Remote',
    type: 'Contract',
    sector: 'Health',
    summary: 'Scaling the application for new business.',
    tags: ['React', 'GraphQL', 'Node', 'AWS', 'Accessibility']
  },
  {
    company: 'Rewind',
    title: 'Senior Frontend Developer',
    dates: 'Feb 2020 – Mar 2020',
    location: 'St Albans',
    type: 'Contract',
    sector: 'Mobile',
    summary: 'Leaflet map work for the Dubai 2020 mobile app.',
    tags: ['Node', 'JavaScript', 'Leaflet', 'Accessibility', 'UX']
  },
  {
    company: 'Ministry of Justice',
    title: 'Senior Full-Stack Developer',
    dates: 'Aug 2019 – Dec 2019',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary: 'Prisoner Escort & Custody Service (PECS).',
    tags: ['Node', 'GOV.UK', 'Progressive enhancement', 'Accessibility', 'Kubernetes']
  },
  {
    company: 'Marks & Spencer',
    title: 'Senior Full-Stack Developer',
    dates: 'Apr 2019 – Aug 2019',
    location: 'London',
    type: 'Contract',
    sector: 'Retail',
    summary: 'Framework team building tooling for the dot-com online business.',
    tags: ['Node', 'React', 'Architecture', 'Accessibility', 'Pattern library']
  },
  {
    company: 'HM Passport Office',
    title: 'Senior Full-Stack Developer',
    dates: 'Oct 2018 – Dec 2018',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary: 'Re-building a legacy appointment-booking system and its public journeys in-house.',
    tags: ['Node', 'Microservices', 'GOV.UK Pay', 'Redis', 'Accessibility']
  },
  {
    company: 'Department for International Trade',
    title: 'Senior Full-Stack Developer',
    dates: 'May 2017 – Mar 2018',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary:
      'Data Hub: software and infrastructure for civil servants managing UK trade & investment relationships.',
    tags: ['Node', 'React', 'Vue', 'Docker', 'CI/CD', 'Architecture']
  },
  {
    company: 'HM Revenue & Customs',
    title: 'Senior Frontend Developer',
    dates: 'Sep 2016 – Apr 2017',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary:
      'Service Design Tools: creating the HMRC design language, documentation and tooling with GDS.',
    tags: [
      'Frontend architecture',
      'AWS',
      'Pattern library',
      'Node',
      'Accessibility',
      'Documentation'
    ]
  },
  {
    company: 'HM Revenue & Customs',
    title: 'Senior Frontend Developer',
    dates: 'Feb 2016 – Sep 2016',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary:
      'Platform Operations: front-end architecture and a shared component library across the Tax Platform.',
    tags: ['React', 'Scala', 'Node', 'Responsive', 'Accessibility', 'Mentoring']
  },
  {
    company: 'HM Revenue & Customs',
    title: 'Frontend Developer',
    dates: 'Sep 2015 – Feb 2016',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary:
      'Government Gateway 2FA, Identity Verification form validation, and the HMRC API/docs UI.',
    tags: ['JavaScript', 'Scala', 'Node', 'Responsive', 'Accessibility']
  },
  {
    company: 'Department for Work & Pensions',
    title: 'Frontend Developer',
    dates: 'Apr 2015 – May 2015',
    location: 'London',
    type: 'Contract',
    sector: 'Government',
    summary: 'Universal Credit: front-end analysis, tech-debt refactor and UX prototyping tools.',
    tags: ['JavaScript', 'Responsive', 'Accessibility', 'Node', 'Prototyping']
  },
  {
    company: 'Guardian News & Media',
    title: 'Client-Side Engineer',
    dates: 'Apr 2014 – Apr 2015',
    location: 'London',
    type: 'Contract',
    sector: 'Media',
    summary: 'Membership team: the beta responsive website and associated tools.',
    tags: ['JavaScript', 'Responsive', 'Scala', 'Node', 'CI', 'Pair programming']
  },
  {
    company: 'feedMyPixel',
    title: 'Research & Development',
    dates: 'Feb 2014 – Mar 2014',
    location: 'St Albans',
    type: 'Freelance',
    sector: 'Products',
    summary: 'R&D time between contracts, getting to know AngularJS.',
    tags: ['Angular', 'JavaScript']
  },
  {
    company: 'Deutsche Telekom UK',
    title: 'Mobile Frontend Developer',
    dates: 'Oct 2012 – Dec 2013',
    location: 'Hatfield',
    type: 'Contract',
    sector: 'Telecoms',
    summary:
      'Multiple responsive projects: client dashboards, a globally-distributed header, and SMS-to-web tooling.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Responsive', 'Node', 'Mobile']
  },
  {
    company: 'BBC',
    title: 'Software Engineer',
    dates: 'Aug 2011 – Aug 2012',
    location: 'London',
    type: 'Contract',
    sector: 'Media',
    summary:
      'Future Media, Core Services — iBroadcast2, a next-gen media & metadata publishing platform for iPlayer.',
    tags: ['PHP', 'Zend', 'JavaScript', 'jQuery', 'TDD', 'REST']
  },
  {
    company: 'eDigitalResearch',
    title: 'Application Support Developer',
    dates: 'Apr 2010 – Jul 2011',
    location: 'Southampton',
    type: 'Permanent',
    sector: 'Research',
    summary:
      'Supporting applications and tools for high-profile clients in customer-insight analytics.',
    tags: ['PHP', 'Zend', 'JavaScript', 'jQuery', 'PostgreSQL']
  },
  {
    company: 'Freelance',
    title: 'Web Developer & Designer',
    dates: 'Oct 2007 – Apr 2010',
    location: 'Southampton',
    type: 'Freelance',
    sector: 'Arts',
    summary:
      'Built a large dynamic website and bespoke CMS, culminating in the Lazy Gramophone platform.',
    tags: ['PHP', 'JavaScript', 'MySQL', 'SEO', 'UX']
  },
  {
    company: 'Lazy Gramophone',
    title: 'Web Developer & Designer',
    dates: '2004 – 2010',
    location: 'Remote',
    type: 'Freelance',
    sector: 'Arts',
    summary: 'Community website and bespoke CMS for the arts collective and publisher.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'UX', 'SEO']
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
    dates: 'Jan 2007 – Oct 2007',
    location: 'Brighton',
    type: 'Permanent',
    sector: 'Mobile',
    summary: 'Interactive SMS marketing services for mobile handsets and the mobile web.',
    tags: ['XHTML-MP', 'CSS', 'SEO']
  },
  {
    company: 'Hotxt',
    title: 'Quality Assurance Manager',
    dates: 'Aug 2006 – Dec 2006',
    location: 'London',
    type: 'Permanent',
    sector: 'Mobile',
    summary:
      'Built a QA structure for a J2ME “text over IP” start-up across many handsets and networks.',
    tags: ['QA', 'Mobile']
  },
  {
    company: 'Freelance',
    title: 'Developer & Designer',
    dates: 'Oct 2005 – Jul 2006',
    location: 'Brighton',
    type: 'Freelance',
    sector: 'Games',
    summary: 'Web and mobile media, J2ME game graphics and 3D modelling.',
    tags: ['Flash', 'Photoshop', '3D', 'Design']
  },
  {
    company: 'Babel Media',
    title: 'QA Technician',
    dates: 'Aug 2002 – Sep 2005',
    location: 'Brighton',
    type: 'Permanent',
    sector: 'Games',
    summary:
      'Console TRC certification (PS2, GameCube) and growing a mobile J2ME QA department to 150+.',
    tags: ['Game QA', 'Mobile QA', 'Certification']
  }
]
