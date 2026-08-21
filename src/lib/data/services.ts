export type Faq = { question: string; answer: string }

export type ServiceFact = { label: string; value: string }

export const serviceLede =
  'I take a product or a problem and build the software for it. Design, front end, API, ' +
  'infrastructure, tests and the accessibility work, as one person. No handoffs between four ' +
  'different suppliers.'

export const serviceFacts: ServiceFact[] = [
  { label: 'Engagement', value: 'Contract.' },
  { label: 'Length', value: 'Any.' },
  { label: 'Project size', value: "Small to huge. Let's chat about what you need." },
  { label: 'Location', value: 'Remote worldwide, based in the UK.' },
  { label: 'Availability', value: 'Open to conversation.' }
]

export const faqs: Faq[] = [
  {
    question: 'Are you available, and how soon can you start?',
    answer:
      'Always worth a conversation. Long engagements or small well defined jobs, both suit me. Tell me what you need and I will tell you honestly whether it fits.'
  },
  {
    question: 'What do you build with?',
    answer:
      'Whatever suits the project. Recent work is SvelteKit, TypeScript, Node and AWS, but twenty years covers plenty of other stacks. The right choice depends on your problem and what you already run.'
  },
  {
    question: 'Do you work remotely, and where?',
    answer:
      "I work remotely, worldwide, from the UK. I'll shift my hours to overlap with your team, and travel for a kickoff when it helps."
  },
  {
    question: 'Do you use AI?',
    answer:
      'Every day, and deliberately. Claude is part of how I work rather than something bolted on. Planning, code, review, tests. Twenty years of knowing what good looks like is what makes that worth having: it decides what to keep, catches what the model gets wrong and holds the same bar I would hold without it. The speed is the tool. The judgement is what you are paying for, and it is still mine.'
  },
  {
    question: 'How do you work with an existing team?',
    answer:
      'I hit the ground running, and I join as one of the team rather than sitting outside it. Your standups, your board, your code review, your conventions.'
  },
  {
    question: 'What size of engagement suits you?',
    answer:
      'Small to huge. I have been the only developer on a project and one of a multi discipline team, so the shape matters more than the size.'
  },
  {
    question: 'What happens when the engagement ends?',
    answer:
      'You keep everything, and your team understands it. I document as I go rather than leaving knowledge in my head, so there is no cliff edge when I stop.'
  }
]
