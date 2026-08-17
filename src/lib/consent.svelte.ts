export type ConsentChoice = 'unknown' | 'granted' | 'denied'

export const CONSENT_KEY = 'fmp-consent'

function storedChoice(): ConsentChoice {
  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    return stored === 'granted' || stored === 'denied' ? stored : 'unknown'
  } catch {
    return 'unknown'
  }
}

function optedOutAtBrowserLevel() {
  const globalPrivacyControl = (navigator as Navigator & { globalPrivacyControl?: boolean })
    .globalPrivacyControl
  return globalPrivacyControl === true || navigator.doNotTrack === '1'
}

function remember(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice)
  } catch {
    void 0
  }
}

class Consent {
  choice = $state<ConsentChoice>('unknown')

  init() {
    this.choice = optedOutAtBrowserLevel() ? 'denied' : storedChoice()
  }

  grant() {
    this.choice = 'granted'
    remember('granted')
  }

  deny() {
    this.choice = 'denied'
    remember('denied')
  }

  ask() {
    this.choice = 'unknown'
    try {
      localStorage.removeItem(CONSENT_KEY)
    } catch {
      void 0
    }
  }
}

export const consent = new Consent()
