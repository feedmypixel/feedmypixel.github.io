import { asset } from '$app/paths'
import type { Layout, Shot } from '#lib/components/ComposedSlide.svelte'

const SCREEN_WIDTH = 660
const SCREEN_HEIGHT = 1435
const WEB_SIZES = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 820, height: 1180 },
  phone: { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }
}

type Screen =
  | '01-home'
  | '02-composer'
  | '03-replies'
  | '04-reactions'
  | '05-discover'
  | '07-messages'
  | '08-profile'
  | '09-activity'

function screenShot(screen: Screen, { inverted = false } = {}): Shot {
  const light = asset(`status/screens/light/${screen}.webp`)
  const dark = asset(`status/screens/dark/${screen}.webp`)
  return {
    light: inverted ? dark : light,
    dark: inverted ? light : dark,
    alt: `status ${screen.slice(3)} screen`,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  }
}

type PhoneMoment =
  | '01-report'
  | '01b-report-reasons'
  | '03-hidden'
  | '03b-shown'
  | '04-message-request'
  | '05-follow-requests'
  | '06-private-page'

function controlShot(moment: PhoneMoment, shows: string): Shot {
  return {
    light: asset(`status/screens/light/control-${moment}.webp`),
    dark: asset(`status/screens/dark/control-${moment}.webp`),
    alt: `status on a phone: ${shows}`,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  }
}

type Device = keyof typeof WEB_SIZES
type WebView = '01-home' | '02-replies' | '03-profile' | '04-messages'

function webShot(device: Device, view: WebView, shows: string, size = WEB_SIZES[device]): Shot {
  return {
    light: asset(`status/web/${device}/light/${view}.webp`),
    dark: asset(`status/web/${device}/dark/${view}.webp`),
    alt: `status on a ${device}: ${shows}`,
    ...size
  }
}

type Slide = { label: string; sub: string; shots: Shot[]; layout: Layout }

export const slides: Slide[] = [
  {
    label: 'How is everyone?',
    sub: 'Post an emoji and a few words. Your people see it pop up',
    shots: [screenShot('01-home'), screenShot('03-replies')],
    layout: 'phones'
  },
  {
    label: 'Bring your people',
    sub: 'Follow friends and family. Everyone gets a status',
    shots: [screenShot('01-home', { inverted: true })],
    layout: 'phones'
  },
  {
    label: 'Your status with an emoji',
    sub: 'One emoji, one line',
    shots: [screenShot('02-composer')],
    layout: 'phones'
  },
  {
    label: 'React and reply, spark that conversation',
    sub: 'React with an emoji or reply to a status',
    shots: [screenShot('03-replies'), screenShot('04-reactions')],
    layout: 'phones'
  },
  {
    label: 'Your week, your year',
    sub: 'Your profile shows your week and your year in emoji',
    shots: [screenShot('08-profile')],
    layout: 'phones'
  },
  {
    label: 'Natter more, privately',
    sub: 'Take it to a private message when there is more to say',
    shots: [screenShot('07-messages')],
    layout: 'phones'
  },
  {
    label: 'No ads. No tracking.',
    sub: 'Sign in by email link or passkey',
    shots: [screenShot('05-discover'), screenShot('09-activity')],
    layout: 'phones'
  },
  {
    label: 'Everything everywhere',
    sub: 'Made for all screens',
    shots: [
      webShot('desktop', '01-home', 'the home feed'),
      webShot('tablet', '02-replies', 'a status open to its replies'),
      webShot('phone', '03-profile', 'a profile with its week and year')
    ],
    layout: 'devices'
  },
  {
    label: 'You decide who gets in',
    sub: 'Make your profile private and approve who follows you',
    shots: [
      controlShot('06-private-page', 'a private profile with a follow button'),
      controlShot('05-follow-requests', 'follow requests to accept or decline')
    ],
    layout: 'phones'
  },
  {
    label: 'Messages on your terms',
    sub: "Messages from people you don't know arrive as requests you accept or decline",
    shots: [controlShot('04-message-request', 'message requests to accept or decline')],
    layout: 'phones'
  },
  {
    label: 'Mute, block and report',
    sub: 'Mute or block anyone; report any status, reply, message or profile',
    shots: [
      controlShot('01-report', 'a status menu with report'),
      controlShot('01b-report-reasons', 'the reasons to report someone')
    ],
    layout: 'phones'
  },
  {
    label: 'Mature content stays hidden',
    sub: 'Mature or adult content stays blurred until you choose to see it',
    shots: [
      controlShot('03-hidden', 'a blurred status with a closed eye'),
      controlShot('03b-shown', 'the same status shown after tapping the eye')
    ],
    layout: 'phones'
  }
]

export const webSlides: Slide[] = [
  {
    label: 'Replies, with room to read',
    sub: 'Open a status and the whole conversation sits beside the feed',
    shots: [webShot('desktop', '02-replies', 'a status open to its replies')],
    layout: 'wide'
  },
  {
    label: 'Your year, on a big screen',
    sub: 'This week by day and this year by month',
    shots: [webShot('desktop', '03-profile', 'a profile with its week and year')],
    layout: 'wide'
  },
  {
    label: 'Natter beside your inbox',
    sub: 'Conversations open right next to your messages',
    shots: [
      webShot('desktop', '04-messages', 'a conversation beside the inbox', {
        width: 1440,
        height: 844
      })
    ],
    layout: 'wide'
  },
  {
    label: 'Made for all shapes and sizes',
    sub: 'Phone, tablet or desktop, the apps or a snapped window: status fits whatever size you give it',
    shots: [
      webShot('desktop', '01-home', 'the home feed'),
      webShot('tablet', '04-messages', 'a conversation'),
      webShot('phone', '02-replies', 'a status open to its replies')
    ],
    layout: 'devices'
  }
]

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
