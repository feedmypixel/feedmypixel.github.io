<script lang="ts">
  import { resolve } from '$app/paths'
  import { pipesChromeUrl, pipesFirefoxUrl, pipesSourceUrl } from '#lib/config.js'
  import { framed } from '#lib/data/pipes.js'
  import Carousel from '../Carousel.svelte'
  import ExternalLink from '../ExternalLink.svelte'
  import BuildStory from '../product/BuildStory.svelte'
  import StoreBadge from '../StoreBadge.svelte'
</script>

<BuildStory heading="How and why I built Pipes, with Claude.">
  {#snippet stack()}
    <div>
      <dt>Extension</dt>
      <dd>
        <ExternalLink href="https://svelte.dev">Svelte 5</ExternalLink>,
        <ExternalLink href="https://www.typescriptlang.org">TypeScript</ExternalLink>,
        <ExternalLink
          href="https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3"
          >Manifest V3</ExternalLink
        >
      </dd>
    </div>
    <div>
      <dt>Build</dt>
      <dd>
        <ExternalLink href="https://vite.dev">Vite</ExternalLink>,
        <ExternalLink href="https://crxjs.dev">crxjs</ExternalLink>
      </dd>
    </div>
    <div>
      <dt>Stores</dt>
      <dd>
        <ExternalLink href={pipesChromeUrl}>Chrome Web Store</ExternalLink>,
        <ExternalLink href={pipesFirefoxUrl}>Firefox Add-ons</ExternalLink>
      </dd>
    </div>
    <div>
      <dt>Source</dt>
      <dd><ExternalLink href={pipesSourceUrl}>GitHub</ExternalLink>, public for reference</dd>
    </div>
    <div>
      <dt>Built with</dt>
      <dd>
        <ExternalLink href="https://claude.ai/design">Claude Design</ExternalLink>,
        <ExternalLink href="https://claude.com/product/claude-code">Claude Code</ExternalLink>
      </dd>
    </div>
  {/snippet}

  <h3 id="why">Why I built it</h3>
  <p>
    At my current contract we use <ExternalLink href="https://about.gitlab.com">GitLab</ExternalLink
    >
    and for my own work I use <ExternalLink href="https://github.com">GitHub</ExternalLink>. I have
    repositories on both and I wanted a simple way to see what state my pull requests (PRs) and
    merge requests (MRs) are in. I also wanted to see my teammates' work and get alerted when main
    fails.
  </p>

  <h3 id="how">How it's built</h3>
  <p>
    This didn't need a server. The browser is where I am when I'm making applications, so something
    on the side that I can easily see felt ideal. No server also means no user tokens to store
    safely on one: your tokens stay in your browser. I had always wanted to build a browser
    extension too. I use them a lot so this felt perfect.
  </p>
  <p>
    Then the stack: <ExternalLink href="https://svelte.dev">Svelte 5</ExternalLink>,
    <ExternalLink href="https://www.typescriptlang.org">TypeScript</ExternalLink>,
    <ExternalLink href="https://vite.dev">Vite</ExternalLink> and the
    <ExternalLink href="https://crxjs.dev">crxjs</ExternalLink> plugin on
    <ExternalLink href="https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3"
      >Manifest V3</ExternalLink
    >, with Chrome and Firefox from one codebase.
  </p>

  <div class="framed">
    <Carousel items={framed} label="Pipes store screenshots">
      {#snippet slide(shot)}
        <div class="card" style:aspect-ratio="{shot.width} / {shot.height}">
          <img
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            loading="lazy"
            decoding="async"
          />
        </div>
      {/snippet}
    </Carousel>
  </div>

  <h3 id="claude">Built with Claude</h3>
  <p>
    Requirements first, a task list with <ExternalLink
      href="https://github.com/snarktank/ai-dev-tasks">ai-dev-tasks</ExternalLink
    >, a design pass in <ExternalLink href="https://claude.ai/design">Claude Design</ExternalLink>,
    then the build in <ExternalLink href="https://claude.com/product/claude-code"
      >Claude Code</ExternalLink
    > with <ExternalLink href="https://github.com/feedmypixel/principles"
      >my own skills</ExternalLink
    >. Pipes came first, so this is where <a href="{resolve('/status')}#claude">that workflow</a> started.
  </p>

  <h3 id="try">Try it</h3>
  <p>
    I use it daily. It's incredibly useful, especially when working with multiple repositories and
    multiple developers.
  </p>
  <div class="actions">
    <StoreBadge store="chrome" href={pipesChromeUrl} />
    <StoreBadge store="firefox" href={pipesFirefoxUrl} />
  </div>

  <h3 id="thanks">Thanks</h3>
  <ul class="thanks">
    <li><ExternalLink href="https://svelte.dev">Svelte</ExternalLink></li>
    <li><ExternalLink href="https://crxjs.dev">crxjs</ExternalLink></li>
    <li>
      <ExternalLink href="https://claude.com">Claude</ExternalLink> by
      <ExternalLink href="https://www.anthropic.com">Anthropic</ExternalLink>
    </li>
    <li>
      <ExternalLink href="https://github.com/snarktank">Ryan Carson</ExternalLink> for
      <ExternalLink href="https://github.com/snarktank/ai-dev-tasks">ai-dev-tasks</ExternalLink>
    </li>
  </ul>
</BuildStory>

<style>
  .framed {
    margin-top: var(--space-6);
  }

  .card {
    flex: 1;
    overflow: hidden;
    background: var(--surface-inset);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-lg);
  }

  .card img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
