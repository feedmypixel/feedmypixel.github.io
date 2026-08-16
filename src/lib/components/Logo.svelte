<script lang="ts">
  let { size = 26 }: { size?: number } = $props()
</script>

<svg class="logo" width={size} height={size} viewBox="0 0 30 30" aria-hidden="true">
  <rect class="square" width="30" height="30" rx="2" />
  <rect class="pixel" x="5" y="5" width="5" height="5" />
  <rect class="pixel" x="12" y="5" width="5" height="5" />
</svg>

<style>
  .logo {
    display: block;
    flex: none;
  }

  .square {
    fill: var(--brand);
  }

  .pixel {
    fill: var(--ink-onbrand);
  }
</style>
