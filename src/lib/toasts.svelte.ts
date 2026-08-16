export type ToastKind = 'info' | 'positive' | 'critical'
export type Toast = { id: string; kind: ToastKind; message: string }

export const DISMISS_MS = 8000

class ToastStore {
  items = $state<Toast[]>([])

  push(kind: ToastKind, message: string) {
    const id = crypto.randomUUID()
    this.items.push({ id, kind, message })
    setTimeout(() => this.dismiss(id), DISMISS_MS)
  }

  dismiss(id: string) {
    this.items = this.items.filter((toast) => toast.id !== id)
  }
}

export const toasts = new ToastStore()
