export type ContactValues = { name: string; email: string; message: string }
export type ContactErrors = Partial<Record<keyof ContactValues, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Enter your name'
  }

  if (!values.email.trim()) {
    errors.email = 'Enter your email address'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter an email address in the right format, like name@example.com'
  }

  if (!values.message.trim()) {
    errors.message = 'Tell me what you are building'
  }

  return errors
}

export function errorSummary(errors: ContactErrors) {
  const count = Object.keys(errors).length
  return count === 1
    ? 'There is 1 problem with this form'
    : `There are ${count} problems with this form`
}
