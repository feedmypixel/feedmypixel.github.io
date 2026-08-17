import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import Contact from './Contact.svelte'
import { toasts } from '$lib/toasts.svelte'

beforeEach(() => {
  toasts.items = []
})

afterEach(() => {
  vi.restoreAllMocks()
})

const fillForm = async (values: { name?: string; email?: string; message?: string } = {}) => {
  await page.getByLabelText('Your name').fill(values.name ?? 'Ben')
  await page
    .getByLabelText('Email address', { exact: true })
    .fill(values.email ?? 'ben@example.com')
  await page.getByLabelText('What are you building?').fill(values.message ?? 'A trading platform')
}

const submit = () => page.getByRole('button', { name: /Send message|Sending/ }).click()

test('anchors the contact section for the nav', () => {
  render(Contact)
  expect(document.querySelector('section#contact')).not.toBeNull()
})

test('posts natively so it works without JavaScript', () => {
  render(Contact)
  const form = document.querySelector('form')
  expect(form?.getAttribute('method')).toBe('post')
  expect(form?.getAttribute('action')).toContain('api.web3forms.com')
})

test('carries a honeypot that people cannot reach', () => {
  render(Contact)
  const honeypot = document.querySelector<HTMLInputElement>('input[name="botcheck"]')
  expect(honeypot?.getAttribute('tabindex')).toBe('-1')
  expect(document.querySelector('.honeypot')?.getAttribute('aria-hidden')).toBe('true')
})

test('an empty submit names every problem and says how many', async () => {
  render(Contact)
  await submit()

  await expect
    .element(page.getByRole('alert'))
    .toHaveTextContent('There are 3 problems with this form')
  await expect.element(page.getByText('Enter your name')).toBeVisible()
  await expect.element(page.getByText('Enter your email address')).toBeVisible()
  await expect.element(page.getByText('Tell me what you are building')).toBeVisible()
})

test('the error summary takes focus so it is announced', async () => {
  render(Contact)
  await submit()
  await vi.waitFor(() => {
    expect(document.activeElement?.getAttribute('role')).toBe('alert')
  })
})

test('an invalid email says what a good one looks like', async () => {
  render(Contact)
  await fillForm({ email: 'ben-at-example' })
  await submit()
  await expect
    .element(page.getByText('Enter an email address in the right format, like name@example.com'))
    .toBeVisible()
})

test('fields point at their own error text', async () => {
  render(Contact)
  await submit()
  await vi.waitFor(() => {
    const input = document.querySelector('#contact-name')
    expect(input?.getAttribute('aria-invalid')).toBe('true')
    expect(input?.getAttribute('aria-describedby')).toContain('contact-name-error')
  })
})

test('a valid submit sends the message and confirms it', async () => {
  const fetchMock = vi
    .spyOn(globalThis, 'fetch')
    .mockResolvedValue(new Response('{}', { status: 200 }))
  render(Contact)
  await fillForm()
  await submit()

  await vi.waitFor(() => {
    expect(toasts.items.at(-1)).toMatchObject({
      kind: 'positive',
      message: 'Message sent, I will come back to you shortly'
    })
  })
  expect(fetchMock).toHaveBeenCalledOnce()
  expect(document.querySelector<HTMLInputElement>('#contact-name')?.value).toBe('')
})

test('a failed send tells the reader what to do instead', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 500 }))
  render(Contact)
  await fillForm()
  await submit()

  await vi.waitFor(() => {
    expect(toasts.items.at(-1)).toMatchObject({
      kind: 'critical',
      message: 'Could not send the message, please email me directly'
    })
  })
})

test('a network failure is surfaced, never swallowed', async () => {
  vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'))
  render(Contact)
  await fillForm()
  await submit()

  await vi.waitFor(() => {
    expect(toasts.items.at(-1)?.kind).toBe('critical')
  })
})

test('offers the other ways to get in touch', async () => {
  render(Contact)
  await expect.element(page.getByRole('link', { name: 'Download CV (PDF)' })).toBeInTheDocument()
  await expect.element(page.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
  await expect.element(page.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument()
  expect(document.querySelector<HTMLAnchorElement>('a[href*="linkedin.com"]')?.href).toContain(
    'in/benchidgey'
  )
})
