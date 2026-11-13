<script lang="ts">
  let {
    light,
    dark,
    alt,
    width,
    height
  }: { light: string; dark: string; alt: string; width: number; height: number } = $props()
</script>

<img class="light" src={light} {alt} {width} {height} loading="lazy" decoding="async" />
<img class="dark" src={dark} {alt} {width} {height} loading="lazy" decoding="async" />

<style>
  .dark {
    display: none;
  }

  :global(html[data-theme='dark']) .light {
    display: none;
  }

  :global(html[data-theme='dark']) .dark {
    display: block;
  }
</style>
