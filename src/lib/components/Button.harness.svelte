<script lang="ts">
  import Button from './Button.svelte'

  let {
    variant = 'solid',
    href,
    download,
    external = false,
    onclick,
    label
  }: {
    variant?: 'solid' | 'ghost'
    href?: string
    download?: string
    external?: boolean
    onclick?: (event: MouseEvent) => void
    label: string
  } = $props()
</script>

<Button {variant} {href} {download} {external} {onclick}>{label}</Button>
