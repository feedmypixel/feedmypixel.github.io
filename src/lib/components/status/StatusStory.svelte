<script lang="ts">
  import { statusAppStoreUrl, statusGooglePlayUrl, statusUrl } from '#lib/config.js'
  import { screenName, screenShot, screens } from '#lib/data/status.js'
  import Button from '../Button.svelte'
  import StatusStoreLinks from '../StatusStoreLinks.svelte'
  import ThemedImage from '../ThemedImage.svelte'
  import ExternalLink from '../ExternalLink.svelte'

  const sections = [
    { id: 'why', label: 'Why I built it' },
    { id: 'how', label: "How it's built" },
    { id: 'claude', label: 'Built with Claude' },
    { id: 'try', label: 'Try it' },
    { id: 'thanks', label: 'Thanks' }
  ]
</script>

{#snippet storeLink(url: string | undefined, name: string)}
  {#if url}
    <ExternalLink href={url}>{name}</ExternalLink>
  {:else}
    {name}
  {/if}
{/snippet}

<section id="story" class="story">
  <div class="container inner">
    <p class="eyebrow">The build story</p>
    <h2>How and why I built status, with Claude, on SvelteKit</h2>

    <div class="grid">
      <aside>
        <nav aria-label="In this story">
          <p class="nav-label">In this story</p>
          {#each sections as section (section.id)}
            <a href="#{section.id}">{section.label}</a>
          {/each}
        </nav>

        <dl class="stack">
          <div>
            <dt>Web</dt>
            <dd>
              <ExternalLink href="https://svelte.dev/docs/kit">SvelteKit</ExternalLink>,
              <ExternalLink href="https://svelte.dev">Svelte 5</ExternalLink>,
              <ExternalLink href="https://www.typescriptlang.org">TypeScript</ExternalLink>
            </dd>
          </div>
          <div>
            <dt>Api</dt>
            <dd>
              <ExternalLink href="https://fastify.dev">Fastify</ExternalLink>,
              <ExternalLink href="https://www.postgresql.org">PostgreSQL</ExternalLink>
            </dd>
          </div>
          <div>
            <dt>Apps</dt>
            <dd>
              <ExternalLink href="https://capacitorjs.com">Capacitor</ExternalLink>,
              {@render storeLink(statusAppStoreUrl, 'iPhone')} and
              {@render storeLink(statusGooglePlayUrl, 'Android')}
            </dd>
          </div>
          <div>
            <dt>Built with</dt>
            <dd>
              <ExternalLink href="https://claude.ai/design">Claude Design</ExternalLink>,
              <ExternalLink href="https://claude.com/product/claude-code">Claude Code</ExternalLink>
            </dd>
          </div>
        </dl>
      </aside>

      <article>
        <h3 id="why">Why I built it</h3>
        <p>
          For me status is about breaking the ice. Reaching out to people can take real effort and
          sometimes it means saying something in a group chat. status is a simple way to say what
          you're up to and start a conversation. Your people see it pop up and can react or comment.
          If they want to chat more they can message you privately. If they want to take it
          elsewhere, to WhatsApp, Zoom or FaceTime, they can.
        </p>
        <p>
          Everything has a status already: WhatsApp, Slack, Facebook. But there it sits on the side,
          something few people use in an app built for something else. status brings it up front and
          centre.
        </p>

        <h3 id="how">How it's built</h3>
        <p>
          Simplicity and speed: one thing, done well. I chose
          <ExternalLink href="https://svelte.dev/docs/kit">SvelteKit</ExternalLink> and
          <ExternalLink href="https://fastify.dev">Fastify</ExternalLink> because they are easy to work
          with and modern.
          <ExternalLink href="https://www.typescriptlang.org">TypeScript</ExternalLink> makes my life
          easier. The iPhone and Android apps are
          <ExternalLink href="https://capacitorjs.com">Capacitor</ExternalLink> shells around the live
          site. Capacitor has worked very well with SvelteKit.
        </p>

        <figure class="screens">
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <div class="strip" role="group" tabindex="0" aria-label="status screens">
            {#each screens as screen (screen)}
              {@const shot = screenShot(screen)}
              <div class="screen">
                <div class="card" style:aspect-ratio="{shot.width} / {shot.height}">
                  <ThemedImage
                    light={shot.light}
                    dark={shot.dark}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                  />
                </div>
                <span class="screen-name">{screenName(screen)}</span>
              </div>
            {/each}
          </div>
          <figcaption>
            Nine screens. Web app in a Capacitor shell, so the phone apps and the site are the same
            build.
          </figcaption>
        </figure>

        <h3 id="claude">Built with Claude</h3>
        <p>
          I start with detailed requirements, written like architecture decision records (ADRs).
          From those <ExternalLink href="https://github.com/snarktank/ai-dev-tasks"
            >ai-dev-tasks</ExternalLink
          > makes a product requirements document (PRD) and a task list. Then I write briefs for
          <ExternalLink href="https://claude.ai/design">Claude Design</ExternalLink> (CD to its friends).
          A handoff I'm happy with usually takes a few tweaks in CD.
          <ExternalLink href="https://claude.com/product/claude-code">Claude Code</ExternalLink> (CC)
          then builds it with
          <ExternalLink href="https://github.com/feedmypixel/principles"
            >my own skills for design to code and for principles</ExternalLink
          >, so there are rules for how things are built and a way for CC to know the build matches
          the design.
        </p>
        <p>Claude is great when:</p>
        <ul>
          <li>you give it the right context</li>
          <li>a harness for how to build and what to build</li>
          <li>Keep the instructions, rules, tests, context and skills up to date and lean</li>
          <li>
            use <ExternalLink href="https://github.com/JuliusBrussee/caveman">caveman</ExternalLink> to
            keep Claude concise
          </li>
          <li><ExternalLink href="https://www.rtk-ai.app/">rtk</ExternalLink> to save tokens</li>
          <li>my own hooks stop reams of stale comments</li>
        </ul>
        <p>
          I steered all the way: writing the ADRs and PRDs and teaching it how to build through
          skills and context. Then I checked what was built by looking it over, making sure it's
          done correctly and iterating and teaching if it's not. The final polish came from using
          the flows as a user would. That's where the tweaks come from that make it work as a whole.
        </p>
        <p class="tip">
          My tip: pay attention. If you don't tell the robots how to behave and then check how they
          behaved, you'll get something you didn't ask for.
        </p>

        <h3 id="try">Try it</h3>
        <p>
          This has been an immense amount of fun: a modern web app plus iPhone and Android apps,
          built with SvelteKit, Fastify and <ExternalLink href="https://claude.com"
            >Claude</ExternalLink
          >. Try it at <ExternalLink href={statusUrl}>status.me</ExternalLink> or in the
          {@render storeLink(statusAppStoreUrl, 'App Store')} and
          {@render storeLink(statusGooglePlayUrl, 'Google Play')}.
        </p>
        <div class="actions">
          <Button variant="solid" external href={statusUrl}>Open status.me</Button>
          <StatusStoreLinks />
        </div>

        <h3 id="thanks">Thanks</h3>
        <ul class="thanks">
          <li><ExternalLink href="https://svelte.dev/docs/kit">SvelteKit</ExternalLink></li>
          <li><ExternalLink href="https://fastify.dev">Fastify</ExternalLink></li>
          <li><ExternalLink href="https://capacitorjs.com">Capacitor</ExternalLink></li>
          <li>
            <ExternalLink href="https://claude.com">Claude</ExternalLink> by
            <ExternalLink href="https://www.anthropic.com">Anthropic</ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://github.com/snarktank">Ryan Carson</ExternalLink> for
            <ExternalLink href="https://github.com/snarktank/ai-dev-tasks"
              >ai-dev-tasks</ExternalLink
            >
          </li>
        </ul>
      </article>
    </div>
  </div>
</section>

<style>
  .story {
    border-bottom: 1px solid var(--border-subtle);
  }

  .inner {
    padding-block: var(--band);
  }

  .eyebrow {
    margin-bottom: var(--space-4);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    letter-spacing: var(--tracking-wide);
    color: var(--brand-text);
  }

  h2 {
    max-width: 24ch;
    font-family: var(--font-display);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
    text-wrap: balance;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-10);
    align-items: start;
    margin-top: var(--space-12);
  }

  aside {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .nav-label,
  dt {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    letter-spacing: var(--tracking-wide);
    color: var(--ink-subtle);
  }

  nav a {
    padding-block: var(--space-1);
    font-size: var(--font-size-sm);
    color: var(--ink-muted);
    text-decoration: none;
  }

  nav a:hover {
    color: var(--ink-strong);
  }

  .stack {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-4);
    padding-top: var(--space-6);
    border-top: 1px solid var(--border-subtle);
  }

  .stack div {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  dd {
    font-size: var(--font-size-sm);
    color: var(--ink);
  }

  article {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    max-width: 66ch;
    font-size: var(--font-size-md);
    line-height: var(--line-height-relaxed);
    color: var(--ink);
    text-wrap: pretty;
  }

  h3 {
    margin-top: var(--space-8);
    scroll-margin-top: calc(var(--header-height) + var(--space-6));
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--ink-strong);
  }

  h3:first-child {
    margin-top: 0;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding-left: 1.25em;
  }

  .thanks {
    padding-left: 0;
    font-size: var(--font-size-base);
    list-style: none;
  }

  .screens {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-top: var(--space-6);
  }

  .strip {
    display: flex;
    gap: var(--space-3);
    padding: var(--space-4);
    overflow-x: auto;
    scroll-snap-type: x proximity;
    background: var(--surface-inset);
    border-radius: var(--radius-lg);
  }

  .screen {
    display: flex;
    flex: 0 0 clamp(132px, 14vw, 168px);
    flex-direction: column;
    gap: var(--space-2);
    scroll-snap-align: start;
  }

  .card {
    overflow: hidden;
    background: var(--surface-raised);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-md);
  }

  .card :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .screen-name,
  figcaption {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    color: var(--ink-muted);
  }

  .tip {
    padding: var(--space-5) var(--space-6);
    font-weight: var(--font-weight-medium);
    color: var(--ink-strong);
    background: var(--surface-sunken);
    border-radius: var(--radius-lg);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-top: var(--space-2);
  }

  @media (min-width: 60rem) {
    .grid {
      grid-template-columns: 220px minmax(0, 1fr);
      gap: var(--space-16);
    }

    aside {
      position: sticky;
      top: calc(var(--header-height) + var(--space-8));
    }
  }
</style>
