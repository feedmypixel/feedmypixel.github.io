<script lang="ts">
  import { asset } from '$app/paths'
  import {
    contactEndpoint,
    digitalMarketplaceUrl,
    gitHubUrl,
    linkedInUrl,
    web3formsKey
  } from '$lib/config'
  import { validateContact, errorSummary, type ContactErrors } from '$lib/contact-validation'
  import { toasts } from '$lib/toasts.svelte'
  import Button from './Button.svelte'
  import Field from './Field.svelte'
  import EmailPill from './EmailPill.svelte'

  let name = $state('')
  let email = $state('')
  let message = $state('')
  let errors = $state<ContactErrors>({})
  let sending = $state(false)

  let summaryEl: HTMLElement | undefined = $state()
  let shouldFocusSummary = false

  const hasErrors = $derived(Object.keys(errors).length > 0)

  $effect(() => {
    if (hasErrors && shouldFocusSummary && summaryEl) {
      summaryEl.focus()
      shouldFocusSummary = false
    }
  })

  async function onSubmit(event: SubmitEvent) {
    event.preventDefault()
    const found = validateContact({ name, email, message })

    if (Object.keys(found).length > 0) {
      shouldFocusSummary = true
      errors = found
      return
    }

    errors = {}
    sending = true

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: 'New message from feedmypixel.com',
          name,
          email,
          message
        })
      })

      if (!response.ok) {
        throw new Error(`Web3Forms responded ${response.status}`)
      }

      name = ''
      email = ''
      message = ''
      toasts.push('positive', 'Message sent, I will come back to you shortly')
    } catch {
      toasts.push('critical', 'Could not send the message, please email me directly')
    } finally {
      sending = false
    }
  }
</script>

<section id="contact" class="contact">
  <div class="container inner">
    <p class="eyebrow">Contact</p>
    <h2>Like to build something together?</h2>
    <p class="lede">Available worldwide and remote, happy to accommodate different timezones.</p>

    <div class="grid">
      <form method="post" action={contactEndpoint} novalidate onsubmit={onSubmit}>
        <input type="hidden" name="access_key" value={web3formsKey} />
        <input type="hidden" name="subject" value="New message from feedmypixel.com" />

        {#if hasErrors}
          <div bind:this={summaryEl} class="error-summary" role="alert" tabindex="-1">
            <p>{errorSummary(errors)}</p>
          </div>
        {/if}

        <Field
          id="contact-name"
          name="name"
          label="Your name"
          autocomplete="name"
          error={errors.name}
          bind:value={name}
        />

        <Field
          id="contact-email"
          name="email"
          type="email"
          label="Email address"
          hint="I'll only use this to reply to you"
          autocomplete="email"
          error={errors.email}
          bind:value={email}
        />

        <Field
          id="contact-message"
          name="message"
          label="What are you building?"
          rows={5}
          error={errors.message}
          bind:value={message}
        />

        <div class="honeypot" aria-hidden="true">
          <label for="contact-botcheck">Leave this field empty</label>
          <input id="contact-botcheck" name="botcheck" type="checkbox" tabindex="-1" />
        </div>

        <div>
          <Button type="submit" variant="solid" disabled={sending}>
            {sending ? 'Sending…' : 'Send message'}
          </Button>
        </div>

        <noscript>
          <p class="noscript">
            This form posts normally without JavaScript. You can also email
            <a href="mailto:hello@feedmypixel.com">hello@feedmypixel.com</a> directly.
          </p>
        </noscript>
      </form>

      <aside>
        <div>
          <p class="aside-label">Or reach me directly</p>
          <EmailPill />
        </div>
        <div>
          <p class="aside-label">Also here</p>
          <ul>
            <li><a href={asset('/Ben-Chidgey-CV.pdf')} download>Download CV (PDF)</a></li>
            <li><a href={digitalMarketplaceUrl}>Digital Marketplace</a></li>
            <li><a href={gitHubUrl}>GitHub</a></li>
            <li><a href={linkedInUrl}>LinkedIn</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<style>
  .contact {
    background: var(--surface-sunken);
    border-bottom: 1px solid var(--border-subtle);
  }

  .inner {
    padding-block: var(--band);
  }

  .eyebrow {
    margin-bottom: var(--space-4);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    letter-spacing: var(--tracking-wide);
    color: var(--brand-text);
  }

  h2 {
    max-width: 24ch;
    font-family: var(--font-display);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
    text-wrap: balance;
  }

  .lede {
    max-width: 54ch;
    margin-top: var(--space-5);
    font-size: var(--font-size-md);
    line-height: var(--line-height-relaxed);
    color: var(--ink-muted);
    text-wrap: pretty;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    align-items: start;
    margin-top: var(--space-12);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .error-summary {
    padding: var(--space-4) var(--space-5);
    background: var(--mood-critical-tint);
    border: 1px solid var(--mood-critical);
    border-radius: var(--radius-md);
  }

  .error-summary p {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--ink-strong);
  }

  .honeypot {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .noscript {
    font-size: var(--font-size-sm);
    color: var(--ink-muted);
  }

  aside {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .aside-label {
    margin-bottom: var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    letter-spacing: var(--tracking-wide);
    color: var(--ink-subtle);
  }

  aside ul {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: 0;
    list-style: none;
  }

  aside a {
    font-size: var(--font-size-sm);
  }

  @media (min-width: 47.5rem) {
    .grid {
      grid-template-columns: 1.3fr 1fr;
    }
  }
</style>
