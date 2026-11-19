import { asset } from '$app/paths'
import { slideNumber } from '#lib/carousel.js'

type View = 'popup' | 'sidepanel' | 'options' | 'failure-notification'

const SHOT_SCALE = 1 / 1.25

const shot = (view: View, label: string, width: number, height: number) => ({
  light: asset(`pipes/${view}-light.png`),
  dark: asset(`pipes/${view}-dark.png`),
  alt: `Pipes: ${label.toLowerCase()}`,
  width,
  height,
  frame: view === 'failure-notification' ? ('notification' as const) : ('window' as const),
  scale: SHOT_SCALE
})

const slide = (view: View, label: string, sub: string, width: number, height: number) => {
  const windowShot = shot(view, label, width, height)
  return {
    label,
    sub,
    // FOLLOWUP: drop `shot` once the catalogue reads `shots`; its page is frozen until https://github.com/feedmypixel/feedmypixel.github.io/pull/71 lands
    shot: windowShot,
    shots: [windowShot],
    layout: 'wide' as const
  }
}

export const slides = [
  slide('popup', 'Status from your toolbar', 'One click through to the run that failed', 880, 1000),
  slide(
    'sidepanel',
    'Every repo in a side panel',
    'GitHub Actions and GitLab CI/CD, grouped how you choose',
    1080,
    880
  ),
  slide('options', 'Connect GitHub and GitLab', 'Your tokens never leave your browser', 1360, 1200),
  slide(
    'failure-notification',
    'Loud the moment it breaks',
    'A notification the moment a default branch fails',
    728,
    170
  )
]

export const story = {
  problem:
    'You find out the default branch is broken from a teammate on Slack, not from your own tools. Pipeline dashboards live in tabs you forget to open.',
  solution:
    'Pipes watches the repos you choose across GitHub Actions and GitLab CI/CD and surfaces the status in your toolbar. Loud when the default branch fails, quiet when it is green.',
  product:
    'A browser extension built on Manifest V3 with Svelte 5 and TypeScript, shipping on Chrome and Firefox. Fully client-side: no server, no tracking, your tokens never leave your browser.'
}

export const pitch =
  'CI/CD pipeline monitoring that lives in your browser and goes loud the moment a default branch breaks'

const FRAMED_WIDTH = 1040
const FRAMED_HEIGHT = 650

const framedFiles = [
  { file: '1-sidepanel-dark', label: 'Side panel' },
  { file: '2-author-light', label: 'Author attribution' },
  { file: '3-popup-dark', label: 'Popup' },
  { file: '4-notification', label: 'Failure notification' },
  { file: '5-options-dark', label: 'Options' }
] as const

export const framed = framedFiles.map(({ file, label }, index) => ({
  label,
  src: asset(`pipes/framed/${file}.webp`),
  alt: `Pipes store screenshot ${slideNumber(index)}: ${label}`,
  width: FRAMED_WIDTH,
  height: FRAMED_HEIGHT
}))
