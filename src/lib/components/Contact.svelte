<script lang="ts">
  import { onMount, tick } from 'svelte'
  import {
    contactEndpoint,
    emailAddress,
    gitHubUrl,
    linkedInUrl,
    web3formsKey
  } from '#lib/config.js'
  import { validateContact, errorSummary, type ContactErrors } from '#lib/contact-validation.js'
  import Banner from './Banner.svelte'
  import Button from './Button.svelte'
  import Field from './Field.svelte'
  import SectionHeader from './SectionHeader.svelte'
  import EmailPill from './EmailPill.svelte'
  import NewTabHint from './NewTabHint.svelte'

  let name = $state('')
  let email = $state('')
  let message = $state('')
  let errors = $state<ContactErrors>({})
  let sending = $state(false)
  let sendResult = $state<'sent' | 'failed'>()
  let isJavaScriptRunning = $state(false)

  let bannerElement: HTMLElement | undefined = $state()

  const hasErrors = $derived(Object.keys(errors).length > 0)

  onMount(() => {
    isJavaScriptRunning = true
  })

  async function focusBanner() {
    await tick()
    bannerElement?.focus()
  }

  function focusLinkedField(event: MouseEvent & { currentTarget: HTMLAnchorElement }) {
    event.preventDefault()
    document.querySelector<HTMLElement>(event.currentTarget.hash)?.focus()
  }

  function clearCorrectedErrors() {
    const stillInvalid = validateContact({ name, email, message })
    errors = Object.fromEntries(Object.entries(errors).filter(([field]) => field in stillInvalid))
  }

  async function onSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    const fields = Object.fromEntries(new FormData(event.currentTarget))
    errors = validateContact({ name, email, message })
    sendResult = undefined

    if (hasErrors) {
      await focusBanner()
      return
    }

    sending = true

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      })

      if (!response.ok) {
        throw new Error(`Web3Forms responded ${response.status}`)
      }

      name = ''
      email = ''
      message = ''
      sendResult = 'sent'
    } catch {
      sendResult = 'failed'
    } finally {
      sending = false
    }

    await focusBanner()
  }
</script>

<section id="contact" class="contact">
  <div class="container inner">
    <SectionHeader
      eyebrow="Contact"
      heading="Like to build something together?"
      lede="Available worldwide and remote, happy to accommodate different timezones"
    />

    <div class="grid">
      <form
        method="post"
        action={contactEndpoint}
        novalidate={isJavaScriptRunning}
        onsubmit={onSubmit}
        oninput={clearCorrectedErrors}
      >
        <input type="hidden" name="access_key" value={web3formsKey} />
        <input type="hidden" name="subject" value="New message from feedmypixel.com" />

        {#if sendResult === 'sent'}
          <Banner variant="positive" title="Message sent" bind:element={bannerElement}>
            <p>I will come back to you shortly</p>
          </Banner>
        {:else if sendResult === 'failed'}
          <Banner
            variant="critical"
            title="Could not send the message"
            bind:element={bannerElement}
          >
            <p>
              Your message is still in the form. Try again or email
              <a href="mailto:{emailAddress}">{emailAddress}</a>.
            </p>
          </Banner>
        {:else if hasErrors}
          <Banner variant="critical" title={errorSummary(errors)} bind:element={bannerElement}>
            <ul class="error-links">
              {#each Object.entries(errors) as [field, error] (field)}
                <li><a href="#contact-{field}" onclick={focusLinkedField}>{error}</a></li>
              {/each}
            </ul>
          </Banner>
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
            <a href="mailto:{emailAddress}">{emailAddress}</a> directly.
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
            <li>
              <a href={gitHubUrl} target="_blank" rel="noopener noreferrer">
                GitHub<NewTabHint />
              </a>
            </li>
            <li>
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                LinkedIn<NewTabHint />
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<style>
  .contact {
    border-bottom: 1px solid var(--border-subtle);
  }

  .inner {
    padding-block: var(--band);
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

  .error-links {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: 0;
    list-style: none;
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
