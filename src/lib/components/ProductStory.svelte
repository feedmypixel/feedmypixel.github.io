<script lang="ts">
  let { problem, solution, product }: { problem: string; solution: string; product: string } =
    $props()

  const parts = $derived([
    { kind: 'problem', label: 'Problem', text: problem },
    { kind: 'solution', label: 'Solution', text: solution },
    { kind: 'product', label: 'Product', text: product }
  ])
</script>

<div class="story">
  {#each parts as part (part.kind)}
    <div>
      <p class="label" data-kind={part.kind}>{part.label}</p>
      <p class="text">{part.text}</p>
    </div>
  {/each}
</div>

<style>
  .story {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
    gap: var(--space-8);
    padding-top: var(--space-4);
  }

  .text {
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--ink);
  }

  .label {
    margin-bottom: var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-wide);
  }

  .label[data-kind='problem'] {
    color: var(--mood-critical);
  }

  .label[data-kind='solution'] {
    color: var(--brand-text);
  }

  .label[data-kind='product'] {
    color: var(--mood-positive);
  }
</style>
