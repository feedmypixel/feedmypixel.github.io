<script lang="ts">
  import { asset } from '$app/paths'
  import Button from './Button.svelte'
  import EmailPill from './EmailPill.svelte'

  const clients =
    'Guardian · BBC · DEFRA · Ministry of Justice · HMRC · HM Passport Office · Marks & Spencer · Wayfair · Pret A Manger · Deutsche Telekom'
</script>

<section class="hero">
  <div class="container inner">
    <p class="eyebrow">Ben Chidgey — contract full-stack engineer</p>
    <h1>Software that makes you smile</h1>
    <p class="lede">Twenty years building for the Guardian, the BBC and UK government.</p>

    <div class="actions">
      <Button variant="solid" href={asset('/BenChidgeyCV.pdf')} download="BenChidgeyCV.pdf">
        <svg
          width="15"
          height="15"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M8 2v8m0 0 3-3m-3 3L5 7M3 13h10" />
        </svg>
        Download CV
      </Button>
      <EmailPill />
    </div>

    <p class="clients">{clients}</p>
  </div>
</section>

<style>
  .hero {
    border-bottom: 1px solid var(--border-subtle);
  }

  .inner {
    padding-block: var(--band);
  }

  .eyebrow {
    margin-bottom: var(--space-6);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    letter-spacing: var(--tracking-wide);
    color: var(--ink-subtle);
  }

  h1 {
    max-width: 24ch;
    font-family: var(--font-display);
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
    text-wrap: balance;
  }

  .lede {
    max-width: 52ch;
    margin-top: var(--space-8);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-snug);
    color: var(--ink-muted);
    text-wrap: pretty;
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
    margin-top: var(--space-10);
  }

  .clients {
    max-width: 64ch;
    margin-top: var(--space-16);
    padding-top: var(--space-6);
    border-top: 1px solid var(--border-subtle);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    line-height: var(--line-height-relaxed);
    color: var(--ink-subtle);
  }

  @media (min-width: 47.5rem) {
    .actions {
      flex-direction: row;
      align-items: center;
    }
  }
</style>
