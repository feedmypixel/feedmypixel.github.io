<script lang="ts">
  import Seo from '$lib/components/Seo.svelte'
</script>

<Seo
  title="Pipes privacy policy — feedMyPixel"
  description="How Pipes handles your data: fully client-side, no backend, nothing ever sent to us."
  path="/pipes/privacy"
/>

<article class="container policy">
  <p class="eyebrow">Pipes</p>
  <h1>Privacy policy</h1>
  <p class="updated">Last updated: 13 June 2026</p>

  <p class="lede">
    Pipes is a browser extension that watches GitHub Actions and GitLab CI/CD pipeline status across
    the repositories you choose. It is <strong>fully client-side and has no backend</strong>. There
    is no Pipes server, and your data never reaches us.
  </p>

  <h2>What data Pipes handles</h2>
  <p>Pipes stores the following on your device, via <code>chrome.storage.local</code>:</p>
  <ul>
    <li>
      <strong>Access tokens</strong>: the read-only GitHub / GitLab personal access tokens you add,
      used to call those providers' APIs on your behalf.
    </li>
    <li>
      <strong>Accounts and settings</strong>: the hosts you connect, the repositories you watch, and
      your notification preferences.
    </li>
    <li>
      <strong>Pipeline snapshots</strong>: the latest status Pipes fetched for your watched
      repositories, cached so the UI is instant and to detect when a status changes.
    </li>
  </ul>

  <h2>How your data is stored</h2>
  <p>
    All of the above lives in <code>chrome.storage.local</code> on your own machine. It is
    <strong>never synced</strong>
    to other devices, <strong>never logged</strong>, and
    <strong>never transmitted to us or any third party</strong>. There is no Pipes server to send it
    to.
  </p>

  <h2>Where your data is sent</h2>
  <p>
    Your token and API requests go <strong>only</strong> to the Git host you connected them to (GitHub
    or GitLab, including a self-hosted instance you add). Pipes makes no other network requests: no analytics,
    no telemetry, no third-party services.
  </p>

  <h2>Why the data is needed</h2>
  <ul>
    <li>The token authenticates the read-only API calls that fetch your pipeline status.</li>
    <li>
      Accounts, watched repositories, and settings configure what Pipes watches and how it notifies
      you.
    </li>
    <li>
      Snapshots power the at-a-glance UI and let Pipes notify you the moment a default branch
      breaks.
    </li>
  </ul>

  <h2>Permissions</h2>
  <p>
    Tokens are requested as <strong>read-only</strong> (GitHub fine-grained: Actions + Pull requests
    read; GitLab <code>read_api</code>). Pipes cannot push, merge, or modify anything in your
    repositories.
  </p>

  <h2>Data retention and deletion</h2>
  <p>
    Your data stays on your device until you remove it. You can delete a token or account from the
    extension's options at any time, and <strong
      >uninstalling Pipes clears all of its stored data</strong
    >.
  </p>

  <h2>Changes to this policy</h2>
  <p>
    If Pipes' data handling ever changes, this page will be updated with a new "last updated" date.
  </p>

  <h2>Contact</h2>
  <p>
    Questions about privacy: <a href="mailto:pipes@feedmypixel.com">pipes@feedmypixel.com</a>, or
    <a href="https://github.com/feedmypixel/pipes/issues" target="_blank" rel="noopener noreferrer">
      open an issue<span class="visually-hidden"> (opens in a new tab)</span>
    </a>.
  </p>
</article>

<style>
  .policy {
    max-width: 70ch;
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

  h1 {
    font-family: var(--font-display);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
    text-wrap: balance;
  }

  .updated {
    margin-top: var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    color: var(--ink-subtle);
  }

  .lede {
    margin-top: var(--space-8);
    font-size: var(--font-size-md);
    line-height: var(--line-height-relaxed);
    color: var(--ink);
    text-wrap: pretty;
  }

  h2 {
    margin-top: var(--space-10);
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--ink-strong);
  }

  p:not(.eyebrow, .updated, .lede),
  li {
    margin-top: var(--space-4);
    line-height: var(--line-height-relaxed);
    color: var(--ink-muted);
    text-wrap: pretty;
  }

  ul {
    padding-left: var(--space-5);
  }

  strong {
    color: var(--ink);
    font-weight: var(--font-weight-semibold);
  }

  code {
    padding: 2px var(--space-2);
    background: var(--surface-sunken);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: var(--font-size-sm);
    color: var(--ink);
  }
</style>
