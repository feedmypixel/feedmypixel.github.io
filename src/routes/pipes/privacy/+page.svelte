<script lang="ts">
  import Seo from '#lib/components/Seo.svelte'
  import ExternalLink from '#lib/components/ExternalLink.svelte'
  import Eyebrow from '#lib/components/Eyebrow.svelte'
  import HeadingLink from '#lib/components/HeadingLink.svelte'
</script>

<Seo
  title="Pipes privacy policy | feedMyPixel"
  description="How Pipes handles your data: fully client-side, no backend, nothing ever sent to us"
  path="/pipes/privacy"
/>

<article class="container policy">
  <Eyebrow text="Pipes" />
  <h1>Privacy policy</h1>
  <p class="updated">Last updated: 13 June 2026</p>

  <p class="lede">
    Pipes is a browser extension that watches GitHub Actions and GitLab CI/CD pipeline status across
    the repositories you choose. It is <strong>fully client-side and has no backend</strong>. There
    is no Pipes server and your data never reaches us.
  </p>

  <HeadingLink size="lg" text="What data Pipes handles" />
  <p>Pipes stores the following on your device, via <code>chrome.storage.local</code>:</p>
  <ul>
    <li>
      <strong>Access tokens</strong>: the read-only GitHub / GitLab personal access tokens you add,
      used to call those providers' APIs on your behalf
    </li>
    <li>
      <strong>Accounts and settings</strong>: the hosts you connect, the repositories you watch and
      your notification preferences
    </li>
    <li>
      <strong>Pipeline snapshots</strong>: the latest status Pipes fetched for your watched
      repositories, cached so the UI is instant and to detect when a status changes
    </li>
  </ul>

  <HeadingLink size="lg" text="How your data is stored" />
  <p>
    All of the above lives in <code>chrome.storage.local</code> on your own machine. It is
    <strong>never synced</strong>
    to other devices, <strong>never logged</strong> and
    <strong>never transmitted to us or any third party</strong>. There is no Pipes server to send it
    to.
  </p>

  <HeadingLink size="lg" text="Where your data is sent" />
  <p>
    Your token and API requests go <strong>only</strong> to the Git host you connected them to (GitHub
    or GitLab, including a self-hosted instance you add). Pipes makes no other network requests: no analytics,
    no telemetry, no third-party services.
  </p>

  <HeadingLink size="lg" text="Why the data is needed" />
  <ul>
    <li>The token authenticates the read-only API calls that fetch your pipeline status</li>
    <li>
      Accounts, watched repositories and settings configure what Pipes watches and how it notifies
      you
    </li>
    <li>
      Snapshots power the at-a-glance UI and let Pipes notify you the moment a default branch breaks
    </li>
  </ul>

  <HeadingLink size="lg" text="Permissions" />
  <p>
    Tokens are requested as <strong>read-only</strong> (GitHub fine-grained: Actions + Pull requests
    read; GitLab <code>read_api</code>). Pipes cannot push, merge or modify anything in your
    repositories.
  </p>

  <HeadingLink size="lg" text="Data retention and deletion" />
  <p>
    Your data stays on your device until you remove it. You can delete a token or account from the
    extension's options at any time and <strong
      >uninstalling Pipes clears all of its stored data</strong
    >.
  </p>

  <HeadingLink size="lg" text="Changes to this policy" />
  <p>
    If Pipes' data handling ever changes, this page will be updated with a new "last updated" date
  </p>

  <HeadingLink size="lg" text="Contact" />
  <p>
    Questions about privacy: <a href="mailto:pipes@feedmypixel.com">pipes@feedmypixel.com</a> or
    <ExternalLink href="https://github.com/feedmypixel/pipes/issues">open an issue</ExternalLink>
  </p>
</article>

<style>
  .policy {
    display: grid;
    grid-template-columns: minmax(0, 70ch);
    padding-block: var(--band);
  }

  h1 {
    margin-top: var(--space-4);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
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

  .policy :global(h2) {
    margin-top: var(--space-10);
  }

  p:not(.updated, .lede),
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
