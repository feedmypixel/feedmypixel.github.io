<script lang="ts">
  import Button from './Button.svelte'

  let {
    variant = 'solid',
    href,
    download = false,
    onclick,
    label
  }: {
    variant?: 'solid' | 'ghost'
    href?: string
    download?: boolean
    onclick?: (event: MouseEvent) => void
    label: string
  } = $props()
</script>

<Button {variant} {href} {download} {onclick}>{label}</Button>
