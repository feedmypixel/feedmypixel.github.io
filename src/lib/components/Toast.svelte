<script lang="ts">
  import { DISMISS_MS, type ToastKind } from '$lib/toasts.svelte'

  let { kind, message, onDismiss }: { kind: ToastKind; message: string; onDismiss: () => void } =
    $props()
</script>

<div class="toast" data-kind={kind} role="status">
  <span class="message">{message}</span>
  <button class="dismiss" type="button" aria-label="Dismiss notification" onclick={onDismiss}>
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  </button>
  <span class="progress" aria-hidden="true">
    <span class="progress-fill" style:animation-duration="{DISMISS_MS}ms"></span>
  </span>
</div>

<style>
  .toast {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: var(--space-4);
    width: 100%;
    max-width: 420px;
    padding: var(--space-4) var(--space-4) var(--space-5);
    overflow: hidden;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    pointer-events: auto;
    animation: rise var(--transition-slow) var(--ease-emphasized);
  }

  .toast[data-kind='info'] {
    background: var(--solid-info);
  }

  .toast[data-kind='positive'] {
    background: var(--solid-positive);
  }

  .toast[data-kind='critical'] {
    background: var(--solid-critical);
  }

  .message {
    flex: 1 1 auto;
    color: var(--toast-ink);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-snug);
  }

  .dismiss {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: var(--radius-sm);
    color: var(--toast-ink);
    opacity: 0.85;
    cursor: pointer;
  }

  .dismiss:hover {
    opacity: 1;
  }

  .progress {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 3px;
    background: var(--toast-progress-track);
  }

  .progress-fill {
    display: block;
    height: 100%;
    background: var(--toast-progress-fill);
    animation-name: deplete;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(10px);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes deplete {
    from {
      width: 100%;
    }

    to {
      width: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .progress {
      display: none;
    }
  }
</style>
