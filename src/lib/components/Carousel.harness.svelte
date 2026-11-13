<script lang="ts">
  import Carousel from './Carousel.svelte'

  let { slideWidth }: { slideWidth?: string } = $props()

  const items = [
    { label: 'Status from your toolbar' },
    { label: 'Every repo in a side panel' },
    { label: 'Connect GitHub and GitLab' }
  ]
</script>

<div style:width="600px">
  <Carousel {items} label="Pipes screenshots" {slideWidth}>
    {#snippet slide(item)}
      <div class="card" style:height="200px" style:flex="1">{item.label}</div>
    {/snippet}
  </Carousel>
</div>
