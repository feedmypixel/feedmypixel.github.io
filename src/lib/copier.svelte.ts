import { copyText } from './clipboard.js'

const COPIED_FOR_MS = 2000

export class Copier {
  copied = $state(false)
  #timeout: ReturnType<typeof setTimeout> | undefined

  async copy(text: string) {
    if (!(await copyText(text))) {
      return false
    }
    this.copied = true
    clearTimeout(this.#timeout)
    this.#timeout = setTimeout(() => (this.copied = false), COPIED_FOR_MS)
    return true
  }
}
