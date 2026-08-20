<script lang="ts">
  import { asset } from '$app/paths'
  import Button from './Button.svelte'
  import EmailPill from './EmailPill.svelte'

  const clients =
    'Guardian · BBC · DEFRA · Ministry of Justice · HMRC · HM Passport Office · Marks & Spencer · Wayfair · Pret A Manger · Deutsche Telekom'
</script>

<section class="hero">
  <div class="container inner">
    <p class="eyebrow">Ben Chidgey - contract full-stack engineer</p>
    <h1>Software that makes you smile</h1>
    <p class="lede">Twenty years building for the Guardian, the BBC and UK government.</p>

    <div class="actions">
      <Button
        variant="solid"
        href={asset('/BenChidgeyCV.pdf')}
        download="BenChidgeyCV.pdf"
        aria-label="Download CV"
      >
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
        <span class="cv-full">Download CV</span>
        <span class="cv-short">CV</span>
      </Button>
      <EmailPill />
    </div>

    <p class="clients">{clients}</p>
  </div>
</section>

<style>
  @media (prefers-reduced-motion: no-preference) {
    @keyframes hero-arrive {
      from {
        opacity: 0;
        transform: translateY(24px);
      }
    }

    .eyebrow,
    h1,
    .lede,
    .actions,
    .clients {
      animation: hero-arrive var(--transition-slow) var(--ease-emphasized) backwards;
    }

    h1 {
      animation-delay: 60ms;
    }

    .lede {
      animation-delay: 120ms;
    }

    .actions {
      animation-delay: 180ms;
    }

    .clients {
      animation-delay: 240ms;
    }
  }

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
    --button-padding-inline: var(--space-3);

    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-10);
  }

  .cv-short {
    display: inline;
  }

  .cv-full {
    display: none;
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

  @media (min-width: 30rem) {
    .cv-short {
      display: none;
    }

    .cv-full {
      display: inline;
    }
  }

  @media (min-width: 47.5rem) {
    .actions {
      --button-padding-inline: var(--space-6);

      gap: var(--space-4);
    }
  }
</style>
