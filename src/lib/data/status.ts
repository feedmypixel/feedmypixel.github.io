import { asset } from '$app/paths'
import { slideNumber } from '#lib/carousel.js'
import { articleShot } from '#lib/data/article-shot.js'
import type { Shot } from '#lib/components/ComposedSlide.svelte'

const SCREEN_WIDTH = 660
const SCREEN_HEIGHT = 1435
const FRAME_WIDTH = 560
const FRAME_HEIGHT = 1218

export const screens = [
  '01-home',
  '02-composer',
  '03-replies',
  '04-reactions',
  '05-discover',
  '06-search',
  '07-messages',
  '08-profile',
  '09-activity'
] as const

type Screen = (typeof screens)[number]

export const screenName = (screen: Screen) => screen.slice(3)

export function screenShot(screen: Screen, { inverted = false } = {}): Shot {
  const light = asset(`status/screens/light/${screen}.webp`)
  const dark = asset(`status/screens/dark/${screen}.webp`)
  return {
    light: inverted ? dark : light,
    dark: inverted ? light : dark,
    alt: `status ${screenName(screen)} screen`,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  }
}

type PhoneMoment =
  | '01b-report-reasons'
  | '02-block-mute'
  | '04-message-request'
  | '05-follow-requests'
  | '06-private-page'

type DesktopMoment = Exclude<PhoneMoment, '01b-report-reasons'> | '03-hidden'

function controlShot(moment: PhoneMoment, shows: string): Shot {
  return {
    light: asset(`status/screens/light/control-${moment}.webp`),
    dark: asset(`status/screens/dark/control-${moment}.webp`),
    alt: `status on a phone: ${shows}`,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  }
}

const desktopShot = (moment: DesktopMoment, label: string) => ({
  label,
  light: asset(`status/desktop/light/control-${moment}.webp`),
  dark: asset(`status/desktop/dark/control-${moment}.webp`),
  alt: `status on a desktop browser: ${label}`,
  ...articleShot
})

export const controlOnDesktop = [
  desktopShot('06-private-page', 'Private page'),
  desktopShot('05-follow-requests', 'Follow requests'),
  desktopShot('04-message-request', 'Message requests'),
  desktopShot('02-block-mute', 'Mute, block and report'),
  desktopShot('03-hidden', 'Mature content hidden')
]

export const controls = [
  {
    icon: '🔒',
    term: 'Your page',
    text: 'Public or private so people ask to follow and you approve them.'
  },
  {
    icon: '👋',
    term: 'Follows',
    text: 'Unfollow anyone or remove someone from your followers.'
  },
  {
    icon: '✉️',
    term: 'Messages from',
    text: "Anyone, mutuals only or nobody. Messages from people you don't know arrive as requests you accept or decline."
  },
  {
    icon: '🙈',
    term: 'Mute, block and report',
    text: 'Mute or block anyone; report any status, reply, message or page.'
  },
  {
    icon: '👁️',
    term: 'Hide mature or adult content',
    text: 'On by default, so sweary or adult posts arrive blurred until you tap the eye.'
  },
  {
    icon: '🟢',
    term: 'Show online status',
    text: "Turn it off and nobody sees when you're on and you see no one's."
  },
  {
    icon: '🔑',
    term: 'Passkeys',
    text: 'No password to steal: sign in with your face, fingerprint or screen lock.'
  },
  { icon: '🗑️', term: 'Delete your account', text: 'Any time.' }
]

export const slides = [
  {
    label: 'How is everyone?',
    sub: 'Post an emoji and a few words. Your people see it pop up.',
    shots: [screenShot('01-home'), screenShot('03-replies')]
  },
  {
    label: 'Bring your people',
    sub: 'Follow friends and family. Everyone gets a square.',
    shots: [screenShot('01-home', { inverted: true })]
  },
  {
    label: 'Your status with an emoji',
    sub: 'One emoji, one line. A full post is not required.',
    shots: [screenShot('02-composer')]
  },
  {
    label: 'React and reply, spark that conversation',
    sub: 'React with an emoji or reply under the status.',
    shots: [screenShot('03-replies'), screenShot('04-reactions')]
  },
  {
    label: 'Your week, your year',
    sub: 'Every status becomes a square on your profile.',
    shots: [screenShot('08-profile')]
  },
  {
    label: 'Natter more, privately',
    sub: 'Take it to a private message when there is more to say.',
    shots: [screenShot('07-messages')]
  },
  {
    label: 'No ads. No tracking.',
    sub: 'Sign in by email link or passkey. For 13 and over.',
    shots: [screenShot('05-discover'), screenShot('09-activity')]
  },
  {
    label: 'You decide who gets in',
    sub: 'Make your page private so people ask to follow and you approve them.',
    shots: [
      controlShot('06-private-page', 'a private page with a follow button'),
      controlShot('05-follow-requests', 'follow requests to accept or decline')
    ]
  },
  {
    label: 'Messages on your terms',
    sub: "Messages from people you don't know arrive as requests you accept or decline.",
    shots: [controlShot('04-message-request', 'message requests to accept or decline')]
  },
  {
    label: 'Mute, block and report',
    sub: 'Mute or block anyone; report any status, reply, message or page.',
    shots: [
      controlShot('02-block-mute', 'a page menu with mute, block and report'),
      controlShot('01b-report-reasons', 'the reasons to report someone')
    ]
  }
]

const storeFrames = [
  { file: '01-everyone', label: 'Everyone' },
  { file: '02-people', label: 'People' },
  { file: '03-emoji', label: 'Emoji' },
  { file: '04-react', label: 'React' },
  { file: '05-year', label: 'Year' },
  { file: '06-natter', label: 'Natter' },
  { file: '07-no-ads', label: 'No ads' },
  { file: '08-control', label: 'Control' }
] as const

export const frames = storeFrames.map((frame, index) => {
  const number = slideNumber(index)
  return {
    ...frame,
    number,
    src: asset(`status/frames/${frame.file}.webp`),
    alt: `status store screenshot ${number}: ${frame.label}`,
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT
  }
})

export const story = {
  problem:
    'Keeping in touch takes more than it should. A full post feels like a performance and a message out of the blue needs a reason.',
  solution:
    'status keeps it small. Post an emoji and a few words and your people can react, reply or message you for a natter. A small update is all it takes to start a conversation.',
  product:
    'A SvelteKit and Svelte 5 web app with a Fastify and PostgreSQL api. The iPhone and Android apps are Capacitor shells around the live site. Sign in by email link or passkey, no passwords. Push notifications and fingerprint or face app lock. No ads and no tracking.',
  productSummary:
    'A SvelteKit and Svelte 5 web app with a Fastify and PostgreSQL api. iPhone and Android apps are Capacitor shells around the live site. Sign in by email link or passkey. No ads and no tracking.'
}
