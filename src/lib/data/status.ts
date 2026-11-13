import { asset } from '$app/paths'
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
  }
]

const storeFrames = [
  { file: '01-everyone', label: 'Everyone' },
  { file: '02-people', label: 'People' },
  { file: '03-emoji', label: 'Emoji' },
  { file: '04-react', label: 'React' },
  { file: '05-year', label: 'Year' },
  { file: '06-natter', label: 'Natter' },
  { file: '07-no-ads', label: 'No ads' }
] as const

export const frames = storeFrames.map((frame, index) => {
  const number = String(index + 1).padStart(2, '0')
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
