export type Faq = { question: string; answer: string }

export type ServiceFact = { label: string; value: string }

export const serviceLede =
  'I take a product or a problem and build the software for it. Design, front end, API, ' +
  'infrastructure, tests and the accessibility work, as one person. No handoffs between four ' +
  'different suppliers.'

export const serviceFacts: ServiceFact[] = [
  { label: 'Engagement', value: 'Contract, through feedMyPixel Ltd. Outside IR35.' },
  { label: 'Length', value: 'Two weeks to several months.' },
  { label: 'Location', value: 'Remote worldwide, based in the UK.' },
  { label: 'Availability', value: 'Open to new work now, starting in two to four weeks.' }
]

export const faqs: Faq[] = [
  {
    question: 'Are you available, and how soon can you start?',
    answer:
      "I'm open to new contract work now. I can usually start within two to four weeks, and sometimes sooner for a short, focused piece. If your timeline is tighter than that, ask anyway and I'll tell you honestly whether it fits."
  },
  {
    question: 'What do you build with?',
    answer:
      "Right now it's mostly SvelteKit, TypeScript, Node and Fastify on AWS. Across twenty years I've also shipped Java, Scala, PHP, Python and a lot of front end that predates all of it. I care more about picking the boring, testable option than about using the newest thing."
  },
  {
    question: 'Do you work remotely, and where?',
    answer:
      "I work remotely, worldwide, from the UK. I'll shift my hours to overlap properly with your team's timezone, and I'll travel for a kickoff or a workshop when it genuinely helps. Most of my last decade of contracts have been fully remote."
  },
  {
    question: 'Do you take inside-IR35 work?',
    answer:
      "Outside IR35 only. I contract through feedMyPixel Ltd on an outside determination, which is how the work genuinely operates. Tell me the determination up front and we'll both know quickly whether it's a fit."
  },
  {
    question: 'How do you work with an existing team?',
    answer:
      "I join as one of the team rather than sitting outside it. Your standups, your board, your code review, your conventions. I'd rather leave a pattern the team understands and can maintain than be the only person who knows how something works."
  },
  {
    question: 'Do you do accessibility work?',
    answer:
      "Yes, and not as a separate phase at the end. I build with semantic HTML and progressive enhancement so things work before JavaScript loads, then test with a keyboard and a screen reader as I go. Much of my public-sector work had to meet WCAG 2.1 AA as a contractual requirement, so I'm used to it being audited properly."
  },
  {
    question: 'What size of engagement suits you?',
    answer:
      "Anything from a two-week piece of focused work up to a multi-month build. I'm one person covering the whole stack, so I'm a strong fit for greenfield builds, rescues, and teams who need a senior pair of hands. If you need a whole squad, I'm the wrong shape and I'll say so."
  }
]
