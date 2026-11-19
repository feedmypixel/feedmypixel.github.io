import { expect, test, type Page } from '@playwright/test'

const endpoint = 'https://api.web3forms.com/submit'
const LONGER_THAN_A_TOAST_LASTS = 10_000

const form = (page: Page) => page.locator('#contact form')

const fillAndSend = async (page: Page) => {
  await expect(form(page)).toHaveAttribute('novalidate')
  await page.getByLabel('Your name').fill('Ada')
  await page.getByLabel('Email address', { exact: true }).fill('ada@example.com')
  await page.getByLabel('What are you building?').fill('An analytical engine')
  await page.getByRole('button', { name: 'Send message' }).click()
}

test('a sent message is confirmed and the form is cleared', async ({ page }) => {
  let sent: Record<string, string> = {}
  await page.route(endpoint, (route) => {
    sent = route.request().postDataJSON()
    return route.fulfill({ json: { success: true } })
  })
  await page.clock.install()
  await page.goto('/')
  await fillAndSend(page)

  const confirmation = form(page).getByRole('status')
  await expect(confirmation).toContainText('Message sent')
  await expect(confirmation).toContainText('I will come back to you shortly')
  await expect(confirmation).toBeFocused()
  await page.clock.fastForward(LONGER_THAN_A_TOAST_LASTS)
  await expect(confirmation).toBeVisible()
  await expect(page.getByLabel('Your name')).toHaveValue('')
  expect(sent).toMatchObject({
    subject: 'New message from feedmypixel.com',
    name: 'Ada',
    email: 'ada@example.com',
    message: 'An analytical engine'
  })
  expect(sent).toHaveProperty('access_key')
})

test('a failed send says so and keeps what was typed', async ({ page }) => {
  await page.route(endpoint, (route) => route.fulfill({ status: 500, json: { success: false } }))
  await page.clock.install()
  await page.goto('/')
  await fillAndSend(page)

  const failure = form(page).getByRole('alert')
  await expect(failure).toContainText('Could not send the message')
  await expect(failure.getByRole('link', { name: /@feedmypixel\.com$/ })).toHaveAttribute(
    'href',
    /^mailto:[a-z]+@feedmypixel\.com$/
  )
  await expect(failure).toBeFocused()
  await page.clock.fastForward(LONGER_THAN_A_TOAST_LASTS)
  await expect(failure).toBeVisible()
  await expect(page.getByLabel('Your name')).toHaveValue('Ada')
  await expect(page.getByLabel('Email address', { exact: true })).toHaveValue('ada@example.com')
  await expect(page.getByLabel('What are you building?')).toHaveValue('An analytical engine')
})

test('each problem links to its field and goes once it is corrected', async ({ page }) => {
  await page.goto('/')
  await expect(form(page)).toHaveAttribute('novalidate')
  await page.getByRole('button', { name: 'Send message' }).click()

  const summary = form(page).getByRole('alert')
  await expect(summary).toContainText('There are 3 problems with this form')
  await expect(summary).toBeFocused()

  await summary.getByRole('link', { name: 'Enter your email address' }).click()
  await expect(page.getByLabel('Email address', { exact: true })).toBeFocused()

  await page.keyboard.type('ada@example.com')
  await expect(summary).toContainText('There are 2 problems with this form')
  await expect(summary.getByRole('link', { name: 'Enter your email address' })).toHaveCount(0)
  await expect(page.getByLabel('Email address', { exact: true })).not.toHaveAttribute(
    'aria-invalid'
  )
})

test('the browser validates the form when the app JavaScript never loads', async ({ page }) => {
  await page.route('**/_app/**/*.js', (route) => route.abort())
  await page.goto('/')

  await expect(form(page)).not.toHaveAttribute('novalidate')
  await expect(page.getByLabel('Your name')).toHaveAttribute('required')
  await expect(page.getByLabel('Email address', { exact: true })).toHaveAttribute('type', 'email')
  await expect(page.getByLabel('Email address', { exact: true })).toHaveAttribute('required')
  await expect(page.getByLabel('What are you building?')).toHaveAttribute('required')
})
