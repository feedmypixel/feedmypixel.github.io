<script lang="ts">
  import { resolve } from '$app/paths'
  import { faqs, serviceFacts, serviceLede } from '$lib/data/services'

  const home = resolve('/')
</script>

<section id="services" class="services">
  <div class="container inner">
    <p class="eyebrow">Services</p>
    <h2>How this works. What working with me looks like</h2>

    <div class="grid">
      <div>
        <p class="lede">{serviceLede}</p>
        <dl class="facts">
          {#each serviceFacts as fact (fact.label)}
            <div class="fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          {/each}
        </dl>
      </div>

      <div>
        {#each faqs as faq, index (faq.question)}
          <details class="faq" open={index === 0}>
            <summary>
              <span class="mark" aria-hidden="true">
                <span class="bar-horizontal"></span>
                <span class="bar-vertical"></span>
              </span>
              <span class="question">{faq.question}</span>
            </summary>
            <p class="answer">{faq.answer}</p>
          </details>
        {/each}
        <p class="more">
          Something not answered here? <a href="{home}#contact">Ask me directly</a>
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  .services {
    background: var(--surface-sunken);
    border-bottom: 1px solid var(--border-default);
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
    max-width: 26ch;
    font-family: var(--font-display);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
    text-wrap: balance;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-10);
    align-items: start;
    margin-top: var(--space-8);
  }

  .lede {
    max-width: 56ch;
    font-size: var(--font-size-md);
    line-height: var(--line-height-relaxed);
    color: var(--ink);
    text-wrap: pretty;
  }

  .facts {
    display: grid;
    gap: var(--space-4);
    margin-top: var(--space-8);
  }

  .fact {
    display: grid;
    grid-template-columns: 11ch 1fr;
    gap: var(--space-4);
    padding-bottom: var(--space-4);
    border-bottom: 1px solid var(--border-subtle);
  }

  .fact:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  dt {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    color: var(--ink-subtle);
  }

  dd {
    margin: 0;
    font-size: var(--font-size-sm);
    color: var(--ink);
  }

  .faq {
    border-bottom: 1px solid var(--border-subtle);
    interpolate-size: allow-keywords;
  }

  .faq::details-content {
    block-size: 0;
    overflow: hidden;
    opacity: 0;
    transition:
      block-size var(--transition) var(--ease-standard),
      opacity var(--transition) var(--ease-standard),
      content-visibility var(--transition) allow-discrete;
  }

  .faq[open]::details-content {
    block-size: auto;
    opacity: 1;
  }

  summary {
    display: flex;
    align-items: flex-start;
    gap: var(--space-4);
    min-height: 24px;
    padding: var(--space-5) 0;
    font-family: var(--font-display);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
    list-style: none;
    cursor: pointer;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary:hover {
    color: var(--brand-text);
  }

  .mark {
    position: relative;
    flex: none;
    width: 11px;
    height: 11px;
    margin-top: 6px;
  }

  .bar-horizontal,
  .bar-vertical {
    position: absolute;
    background: var(--indicator);
  }

  .bar-horizontal {
    top: 4px;
    left: 0;
    width: 11px;
    height: 3px;
  }

  .bar-vertical {
    top: 0;
    left: 4px;
    width: 3px;
    height: 11px;
    transition:
      opacity var(--transition) var(--ease-standard),
      transform var(--transition) var(--ease-standard);
  }

  .faq[open] .bar-vertical {
    opacity: 0;
    transform: scaleY(0.2);
  }

  .question {
    flex: 1 1 auto;
  }

  .answer {
    max-width: 64ch;
    margin-bottom: var(--space-5);
    padding-left: calc(11px + var(--space-4));
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--ink-muted);
    text-wrap: pretty;
  }

  .more {
    margin-top: var(--space-6);
    font-size: var(--font-size-sm);
    color: var(--ink-muted);
  }

  @media (min-width: 47.5rem) {
    .grid {
      grid-template-columns: 0.85fr 1.15fr;
      gap: var(--space-16);
    }
  }
</style>
