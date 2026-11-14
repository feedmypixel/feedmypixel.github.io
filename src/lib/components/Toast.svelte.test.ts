import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import Toast from './Toast.svelte'

test('renders the message and the mood on the fill', async () => {
  render(Toast, {
    props: { kind: 'positive', message: 'Email address copied', onDismiss: () => {} }
  })
  await expect.element(page.getByText('Email address copied')).toBeVisible()
  expect(document.querySelector('.toast')?.getAttribute('data-kind')).toBe('positive')
})

test('carries the info mood', () => {
  render(Toast, { props: { kind: 'info', message: 'Light theme on', onDismiss: () => {} } })
  expect(document.querySelector('.toast')?.getAttribute('data-kind')).toBe('info')
})

test('the cross sits in the top right corner, on the padding edge', () => {
  render(Toast, { props: { kind: 'info', message: 'Light theme on', onDismiss: () => {} } })
  const toast = document.querySelector('.toast')!
  const { paddingTop, paddingRight } = getComputedStyle(toast)
  const box = toast.getBoundingClientRect()
  const cross = document.querySelector('.dismiss svg')!.getBoundingClientRect()
  expect(Math.round(cross.top - box.top)).toBe(Number.parseFloat(paddingTop))
  expect(Math.round(box.right - cross.right)).toBe(Number.parseFloat(paddingRight))
})

test('calls onDismiss when the close button is clicked', async () => {
  const onDismiss = vi.fn()
  render(Toast, { props: { kind: 'critical', message: 'Could not copy', onDismiss } })
  await page.getByRole('button', { name: 'Dismiss notification' }).click()
  expect(onDismiss).toHaveBeenCalledOnce()
})
