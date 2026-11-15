<script lang="ts">
  let { text }: { text: string } = $props()
</script>

<p class="eyebrow">{text}</p>

<style>
  .eyebrow {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    letter-spacing: var(--tracking-wide);
    color: var(--brand-text);
  }
</style>
