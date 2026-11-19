import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import Contact from './Contact.svelte'
import { contactEndpoint, emailAddress, web3formsKey } from '#lib/config.js'
import { toasts } from '#lib/toasts.svelte.js'

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

const confirmation = () => page.getByRole('status').filter({ hasText: 'Message sent' })

const fieldError = (field: 'name' | 'email' | 'message') =>
  document.querySelector(`#contact-${field}-error`)?.textContent ?? undefined

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
    .element(page.getByRole('alert').getByText('There are 3 problems with this form'))
    .toBeVisible()
  expect(fieldError('name')).toBe('Enter your name')
  expect(fieldError('email')).toBe('Enter your email address')
  expect(fieldError('message')).toBe('Tell me what you are building')
})

test('the error summary links each problem to its field', async () => {
  render(Contact)
  await submit()

  await page.getByRole('link', { name: 'Enter your email address' }).click()
  expect(document.activeElement?.id).toBe('contact-email')

  await page.getByRole('link', { name: 'Tell me what you are building' }).click()
  expect(document.activeElement?.id).toBe('contact-message')

  await page.getByRole('link', { name: 'Enter your name' }).click()
  expect(document.activeElement?.id).toBe('contact-name')
})

test('a corrected field loses its error without another submit', async () => {
  render(Contact)
  await submit()
  await page.getByLabelText('Your name').fill('Ben')

  await expect
    .element(page.getByRole('alert').getByText('There are 2 problems with this form'))
    .toBeVisible()
  await expect.element(page.getByRole('link', { name: 'Enter your name' })).not.toBeInTheDocument()
  expect(fieldError('name')).toBeUndefined()
  expect(document.querySelector('#contact-name')?.getAttribute('aria-invalid')).toBeNull()
  expect(fieldError('email')).toBe('Enter your email address')
})

test('typing never swaps one error for another', async () => {
  render(Contact)
  await submit()
  await page.getByLabelText('Email address', { exact: true }).fill('ben-at-example')

  expect(fieldError('email')).toBe('Enter your email address')
})

test('emptying a corrected field does not bring its error back', async () => {
  render(Contact)
  await submit()
  await page.getByLabelText('Your name').fill('Ben')
  await page.getByLabelText('Your name').fill('')

  await expect
    .element(page.getByRole('alert').getByText('There are 2 problems with this form'))
    .toBeVisible()
  expect(fieldError('name')).toBeUndefined()
})

test('the error summary goes once every problem is corrected', async () => {
  render(Contact)
  await submit()
  await fillForm()

  await expect.element(page.getByRole('alert')).not.toBeInTheDocument()
})

test('nothing is flagged while the form is first being filled in', async () => {
  render(Contact)
  await page.getByLabelText('Email address', { exact: true }).fill('ben-at-example')
  await page.getByLabelText('Your name').fill('Ben')

  expect(fieldError('email')).toBeUndefined()
  await expect.element(page.getByRole('alert')).not.toBeInTheDocument()
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
    .element(
      page.getByRole('link', {
        name: 'Enter an email address in the right format, like name@example.com'
      })
    )
    .toBeVisible()
  expect(fieldError('email')).toBe(
    'Enter an email address in the right format, like name@example.com'
  )
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

  await expect
    .element(confirmation())
    .toHaveTextContent('Message sent I will come back to you shortly')
  expect(fetchMock).toHaveBeenCalledOnce()
  expect(document.querySelector<HTMLInputElement>('#contact-name')?.value).toBe('')
})

test('the confirmation takes focus so it is announced', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}', { status: 200 }))
  render(Contact)
  await fillForm()
  await submit()

  await vi.waitFor(() => {
    expect(document.activeElement?.getAttribute('role')).toBe('status')
  })
})

test('an empty submit after a sent message swaps the confirmation for the problems', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}', { status: 200 }))
  render(Contact)
  await fillForm()
  await submit()
  await expect.element(confirmation()).toBeVisible()
  await submit()

  await expect.element(confirmation()).not.toBeInTheDocument()
  await vi.waitFor(() => {
    expect(document.activeElement?.getAttribute('role')).toBe('alert')
  })
})

test('the result stays in the form, never in a toast', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}', { status: 200 }))
  render(Contact)
  await fillForm()
  await submit()

  await expect.element(confirmation()).toBeVisible()
  expect(document.querySelector('form [role="status"]')).not.toBeNull()
  expect(toasts.items).toEqual([])
})

test('sends every field in the form, once', async () => {
  const fetchMock = vi
    .spyOn(globalThis, 'fetch')
    .mockResolvedValue(new Response('{}', { status: 200 }))
  render(Contact)
  await fillForm()
  await submit()

  await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledOnce())
  const [endpoint, request] = fetchMock.mock.calls[0]
  expect(endpoint).toBe(contactEndpoint)
  expect(JSON.parse(request?.body as string)).toEqual({
    access_key: web3formsKey,
    subject: 'New message from feedmypixel.com',
    name: 'Ben',
    email: 'ben@example.com',
    message: 'A trading platform'
  })
})

test('a ticked honeypot is sent so Web3Forms can reject the bot', async () => {
  const fetchMock = vi
    .spyOn(globalThis, 'fetch')
    .mockResolvedValue(new Response('{}', { status: 200 }))
  render(Contact)
  await fillForm()
  document.querySelector<HTMLInputElement>('input[name="botcheck"]')!.checked = true
  await submit()

  await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledOnce())
  expect(JSON.parse(fetchMock.mock.calls[0][1]?.body as string)).toMatchObject({ botcheck: 'on' })
})

test('takes over validation from the browser once JavaScript runs', async () => {
  render(Contact)
  await vi.waitFor(() => {
    expect(document.querySelector('form')?.noValidate).toBe(true)
  })
})

test('the button is disabled and says so while the message is sending', async () => {
  const { promise, resolve } = Promise.withResolvers<Response>()
  vi.spyOn(globalThis, 'fetch').mockReturnValue(promise)
  render(Contact)
  await fillForm()
  await submit()

  await expect.element(page.getByRole('button', { name: 'Sending…' })).toBeDisabled()

  resolve(new Response('{}', { status: 200 }))
  await expect.element(page.getByRole('button', { name: 'Send message' })).toBeEnabled()
})

test('a failed send tells the reader what to do instead', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 500 }))
  render(Contact)
  await fillForm()
  await submit()

  const failure = page.getByRole('alert')
  await expect
    .element(failure)
    .toHaveTextContent(
      `Could not send the message Your message is still in the form. Try again or email ${emailAddress}.`
    )
  await expect
    .element(failure.getByRole('link', { name: emailAddress }))
    .toHaveAttribute('href', `mailto:${emailAddress}`)
  expect(toasts.items).toEqual([])
})

test('the failure message takes focus so it is announced', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 500 }))
  render(Contact)
  await fillForm()
  await submit()

  await vi.waitFor(() => {
    expect(document.activeElement?.getAttribute('role')).toBe('alert')
  })
})

test('a retry that works replaces the failure with the confirmation', async () => {
  vi.spyOn(globalThis, 'fetch')
    .mockResolvedValueOnce(new Response('', { status: 500 }))
    .mockResolvedValueOnce(new Response('{}', { status: 200 }))
  render(Contact)
  await fillForm()
  await submit()
  await expect.element(page.getByRole('alert')).toBeVisible()
  await submit()

  await expect.element(confirmation()).toBeVisible()
  await expect.element(page.getByRole('alert')).not.toBeInTheDocument()
})

test('a failed send keeps what was typed', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 500 }))
  render(Contact)
  await fillForm()
  await submit()

  await expect.element(page.getByRole('alert')).toBeVisible()
  await expect.element(page.getByLabelText('Your name')).toHaveValue('Ben')
  await expect
    .element(page.getByLabelText('Email address', { exact: true }))
    .toHaveValue('ben@example.com')
  await expect
    .element(page.getByLabelText('What are you building?'))
    .toHaveValue('A trading platform')
})

test('a network failure is surfaced, never swallowed', async () => {
  vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'))
  render(Contact)
  await fillForm()
  await submit()

  await expect
    .element(page.getByRole('alert').getByText('Could not send the message'))
    .toBeVisible()
})

test('offers the other ways to get in touch', async () => {
  render(Contact)
  await expect
    .element(page.getByRole('link', { name: 'GitHub (opens in a new tab)' }))
    .toBeInTheDocument()
  await expect
    .element(page.getByRole('link', { name: 'LinkedIn (opens in a new tab)' }))
    .toBeInTheDocument()
  await expect
    .element(page.getByRole('link', { name: /Digital Marketplace/ }))
    .not.toBeInTheDocument()
  expect(document.querySelector<HTMLAnchorElement>('a[href*="linkedin.com"]')?.href).toContain(
    'in/benchidgey'
  )
})
