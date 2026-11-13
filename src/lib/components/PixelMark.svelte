<script lang="ts">
  let { size = 'default' }: { size?: 'default' | 'large' } = $props()
</script>

<span class="mark" class:large={size === 'large'} aria-hidden="true"
  ><span></span><span></span></span
>

<style>
  .mark {
    --pixel: 11px;

    display: flex;
    flex: none;
    gap: 3px;
  }

  .large {
    --pixel: 14px;

    gap: 4px;
  }

  .mark span {
    width: var(--pixel);
    height: var(--pixel);
    background: var(--brand);
  }

  .mark span:last-child {
    opacity: 0.45;
  }
</style>
