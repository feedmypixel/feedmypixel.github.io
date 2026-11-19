import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import BannerHarness from './Banner.harness.svelte'

test('shows its title and what to do next', async () => {
  render(BannerHarness, {
    props: { variant: 'positive', title: 'Message sent', body: 'I will come back to you shortly' }
  })
  await expect.element(page.getByText('Message sent')).toBeVisible()
  await expect.element(page.getByText('I will come back to you shortly')).toBeVisible()
})

test('a title alone leaves no empty body behind', () => {
  render(BannerHarness, { props: { variant: 'positive', title: 'Message sent' } })
  expect(document.querySelector('.body')).toBeNull()
})

test('a critical banner interrupts, a positive one waits its turn', async () => {
  render(BannerHarness, { props: { variant: 'critical', title: 'Could not send the message' } })
  await expect.element(page.getByRole('alert')).toHaveTextContent('Could not send the message')

  render(BannerHarness, { props: { variant: 'positive', title: 'Message sent' } })
  await expect.element(page.getByRole('status')).toHaveTextContent('Message sent')
})

test('carries its variant', () => {
  render(BannerHarness, { props: { variant: 'critical', title: 'Could not send the message' } })
  expect(document.querySelector('.banner')?.classList.contains('critical')).toBe(true)
})

test('can take focus so its owner can have it announced', async () => {
  render(BannerHarness, { props: { variant: 'positive', title: 'Message sent' } })
  await page.getByRole('button', { name: 'Focus the banner' }).click()
  expect(document.activeElement).toBe(document.querySelector('.banner'))
})
