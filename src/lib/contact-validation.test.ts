import { errorSummary, validateContact } from './contact-validation'

const values = (overrides = {}) => ({
  name: 'Ben',
  email: 'ben@example.com',
  message: 'A new trading platform',
  ...overrides
})

test('a complete form has no problems', () => {
  expect(validateContact(values())).toEqual({})
})

test('every empty field is named', () => {
  expect(validateContact({ name: '', email: '', message: '' })).toEqual({
    name: 'Enter your name',
    email: 'Enter your email address',
    message: 'Tell me what you are building'
  })
})

test('whitespace does not count as an answer', () => {
  expect(validateContact(values({ name: '   ' })).name).toBe('Enter your name')
  expect(validateContact(values({ message: '  ' })).message).toBe('Tell me what you are building')
})

test('a malformed email says what good looks like', () => {
  expect(validateContact(values({ email: 'ben-at-example' })).email).toBe(
    'Enter an email address in the right format, like name@example.com'
  )
})

test('an email is accepted once it has a name, host and domain', () => {
  expect(validateContact(values({ email: ' ben@example.co.uk ' })).email).toBeUndefined()
})

test('the summary counts the problems', () => {
  expect(errorSummary({ name: 'Enter your name' })).toBe('There is 1 problem with this form')
  expect(errorSummary({ name: 'a', email: 'b' })).toBe('There are 2 problems with this form')
})
