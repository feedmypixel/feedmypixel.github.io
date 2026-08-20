export type Faq = { question: string; answer: string }

export type ServiceFact = { label: string; value: string }

export const serviceLede =
  'I take a product or a problem and build the software for it. Design, front end, API, ' +
  'infrastructure, tests and the accessibility work, as one person. No handoffs between four ' +
  'different suppliers.'

export const serviceFacts: ServiceFact[] = [
  { label: 'Engagement', value: 'Contract, through feedMyPixel Ltd. Outside IR35.' },
  { label: 'Length', value: 'A few days to a year or more.' },
  { label: 'Project size', value: "Small to huge. Let's chat about what you need." },
  { label: 'Location', value: 'Remote worldwide, based in the UK.' },
  { label: 'Availability', value: 'Open to conversations about upcoming work.' }
]

export const faqs: Faq[] = [
  {
    question: 'Are you available, and how soon can you start?',
    answer:
      'Always worth asking. Longer engagements of three, six or twelve months suit me well, and I am just as happy taking on small, well defined pieces of work. Have a chat with me about what you need and we can work out whether it suits and whether I have the capacity. I can move quickly when it is needed.'
  },
  {
    question: 'What do you build with?',
    answer:
      'Whatever is appropriate to the project and the work that needs doing. Recent work has been SvelteKit, TypeScript, Node and AWS, but across twenty years I have shipped in plenty of other stacks. The right choice depends on your problem, your team and what you already run.'
  },
  {
    question: 'Do you work remotely, and where?',
    answer:
      "I work remotely, worldwide, from the UK. I'll shift my hours to overlap properly with your team's timezone, and I'll travel for a kickoff or a workshop when it genuinely helps. Most of my last decade of contracts have been fully remote."
  },
  {
    question: 'What do you charge?',
    answer: 'We can discuss the specifics depending on what the project needs.'
  },
  {
    question: 'Do you take inside-IR35 work?',
    answer:
      'No. I work outside IR35 only, contracting through feedMyPixel Ltd. Tell me the determination up front and we will both know quickly whether it is a fit.'
  },
  {
    question: 'How do you work with an existing team?',
    answer:
      'I hit the ground running. I join as one of the team rather than sitting outside it: your standups, your board, your code review, your conventions.'
  },
  {
    question: 'What size of engagement suits you?',
    answer:
      'Anything from small to large. I have worked as the only developer on a project and as part of a multi discipline team, so the shape of the team matters more to me than the size of it.'
  },
  {
    question: 'What happens when the engagement ends?',
    answer:
      'You keep everything, and your team understands it. I document as I go and work in the open rather than leaving knowledge in my head, so there is no cliff edge when I stop. I am happy to stay reachable for questions afterwards, and to come back for follow-on work if it helps.'
  }
]
