<script lang="ts">
  import Eyebrow from './Eyebrow.svelte'

  let { status }: { status: number } = $props()

  const notFound = {
    eyebrow: '404',
    title: 'Page not found',
    message: 'Yup thats not here!'
  }
  const unexpected = {
    eyebrow: 'Error',
    title: 'Something went wrong',
    message: 'Please try again in a moment'
  }

  const copy = $derived(status === 404 ? notFound : unexpected)
</script>

<svelte:head>
  <title>{copy.title} | feedMyPixel</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="container error-page">
  <Eyebrow text={copy.eyebrow} />
  <h1>{copy.title}</h1>
  <p class="message">{copy.message}</p>
</section>

<style>
  .error-page {
    padding-block: var(--band);
  }

  h1 {
    margin-top: var(--space-4);
    font-family: var(--font-display);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
    text-wrap: balance;
  }

  .message {
    margin-top: var(--space-4);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-snug);
    color: var(--ink-muted);
    text-wrap: pretty;
  }
</style>
