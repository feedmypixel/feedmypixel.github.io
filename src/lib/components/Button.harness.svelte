<script lang="ts">
  import Button from './Button.svelte'

  let {
    variant = 'solid',
    size = 'default',
    href,
    download,
    external = false,
    onclick,
    label
  }: {
    variant?: 'solid' | 'ghost'
    size?: 'default' | 'large'
    href?: string
    download?: string
    external?: boolean
    onclick?: (event: MouseEvent) => void
    label: string
  } = $props()
</script>

<Button {variant} {size} {href} {download} {external} {onclick}>{label}</Button>
