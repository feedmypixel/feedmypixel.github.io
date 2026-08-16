<script lang="ts">
  import { toasts } from '$lib/toasts.svelte'
  import Toast from './Toast.svelte'
</script>

<div class="toaster" role="region" aria-label="Notifications">
  {#each toasts.items as toast (toast.id)}
    <Toast kind={toast.kind} message={toast.message} onDismiss={() => toasts.dismiss(toast.id)} />
  {/each}
</div>

<style>
  .toaster {
    position: fixed;
    right: var(--space-5);
    bottom: var(--space-5);
    left: var(--space-5);
    z-index: var(--z-toast);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    pointer-events: none;
  }
</style>
