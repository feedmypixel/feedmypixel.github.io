<script lang="ts">
  import Button from './Button.svelte'

  let {
    title,
    message,
    actionLabel,
    onAction
  }: { title: string; message: string; actionLabel: string; onAction: () => void } = $props()
</script>

<div class="empty">
  <p class="title">{title}</p>
  <p class="message">{message}</p>
  <Button variant="ghost" onclick={onAction}>{actionLabel}</Button>
</div>

<style>
  .empty {
    padding: var(--space-16) 0;
    border-top: 1px solid var(--border-subtle);
    text-align: center;
  }

  .title {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--ink-strong);
  }

  .message {
    margin: var(--space-3) 0 var(--space-6);
    font-size: var(--font-size-base);
    color: var(--ink-muted);
  }
</style>
