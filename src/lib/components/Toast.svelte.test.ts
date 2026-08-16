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

test('calls onDismiss when the close button is clicked', async () => {
  const onDismiss = vi.fn()
  render(Toast, { props: { kind: 'critical', message: 'Could not copy', onDismiss } })
  await page.getByRole('button', { name: 'Dismiss notification' }).click()
  expect(onDismiss).toHaveBeenCalledOnce()
})
