<script lang="ts">
  import { statusAppStoreUrl, statusGooglePlayUrl, statusUrl } from '#lib/config.js'
  import { webSlides } from '#lib/data/status.js'
  import Button from '../Button.svelte'
  import StatusStoreLinks from '../StatusStoreLinks.svelte'
  import ExternalLink from '../ExternalLink.svelte'
  import BuildStory from '../product/BuildStory.svelte'
  import StatusCarousel from './StatusCarousel.svelte'
  import HeadingLink from '../HeadingLink.svelte'
</script>

{#snippet storeLink(url: string | undefined, name: string)}
  {#if url}
    <ExternalLink href={url}>{name}</ExternalLink>
  {:else}
    {name}
  {/if}
{/snippet}

<BuildStory
  heading="How and why I built status, with Claude, on SvelteKit"
  sections={[
    { id: 'why', label: 'Why I built it' },
    { id: 'how', label: "How it's built" },
    { id: 'claude', label: 'Built with Claude' },
    { id: 'try', label: 'Try it' },
    { id: 'thanks', label: 'Thanks' }
  ]}
>
  {#snippet stack()}
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
  {/snippet}

  <HeadingLink level={3} size="xl" id="why" text="Why I built it" />
  <p>
    For me status is about breaking the ice. Reaching out to people can take real effort and
    sometimes it means saying something in a group chat. status is a simple way to say what you're
    up to and start a conversation. Your people see it pop up and can react or comment. If they want
    to chat more they can message you privately. If they want to take it elsewhere, to
    <ExternalLink href="https://www.whatsapp.com">WhatsApp</ExternalLink>,
    <ExternalLink href="https://www.instagram.com">Instagram</ExternalLink>,
    <ExternalLink href="https://zoom.us">Zoom</ExternalLink>,
    <ExternalLink href="https://www.snapchat.com">Snapchat</ExternalLink>,
    <ExternalLink href="https://www.tiktok.com">TikTok</ExternalLink>, FaceTime or anywhere else,
    they can.
  </p>
  <p>
    If you wish to have a private group you can, "Katsu anyone? 🍛". Or if you wish to tell everyone
    what your up to broadcast away "Holipops time 🏝️"
  </p>
  <p>
    Everything has a status already: WhatsApp, Slack, Facebook. But there it sits on the side,
    something few people use in an app built for something else. status brings it up front and
    centre.
  </p>

  <HeadingLink level={3} size="xl" id="how" text="How it's built" />
  <p>
    Simplicity and speed: one thing, done well. I chose
    <ExternalLink href="https://svelte.dev/docs/kit">SvelteKit</ExternalLink> and
    <ExternalLink href="https://fastify.dev">Fastify</ExternalLink> because they are easy to work with
    and modern.
    <ExternalLink href="https://www.typescriptlang.org">TypeScript</ExternalLink> makes my life easier.
    The iPhone and Android apps are
    <ExternalLink href="https://capacitorjs.com">Capacitor</ExternalLink> shells around the live site.
    Capacitor has worked very well with SvelteKit.
  </p>

  <div class="web">
    <StatusCarousel slides={webSlides} label="status on the web" />
  </div>

  <HeadingLink level={3} size="xl" id="claude" text="Built with Claude" />
  <p>
    I start with detailed requirements, written like architecture decision records (ADRs). From
    those <ExternalLink href="https://github.com/snarktank/ai-dev-tasks">ai-dev-tasks</ExternalLink> makes
    a product requirements document (PRD) and a task list. Then I write briefs for
    <ExternalLink href="https://claude.ai/design">Claude Design</ExternalLink> (CD to its friends). A
    handoff I'm happy with usually takes a few tweaks in CD.
    <ExternalLink href="https://claude.com/product/claude-code">Claude Code</ExternalLink> (CC) then builds
    it with
    <ExternalLink href="https://github.com/feedmypixel/principles"
      >my own skills for design to code and for principles</ExternalLink
    >, so there are rules for how things are built and a way for CC to know the build matches the
    design.
  </p>
  <p>Claude is great when:</p>
  <ul>
    <li>you give it the right context</li>
    <li>a harness for how to build and what to build</li>
    <li>keep the instructions, rules, tests, context and skills up to date and lean</li>
    <li>
      use <ExternalLink href="https://github.com/JuliusBrussee/caveman">caveman</ExternalLink> to keep
      Claude concise
    </li>
    <li><ExternalLink href="https://www.rtk-ai.app/">rtk</ExternalLink> to save tokens</li>
    <li>
      utilise hooks for things like cleaning up worktrees and pruning docker and stopping local
      servers, stopping claude going wild with comments and many other helpful tasks hooked into
      claudes lifecycle
    </li>
  </ul>
  <p>
    I steered all the way: writing the ADRs and PRDs and teaching it how to build through skills and
    context. Then I checked what was built by looking it over, making sure it's done correctly and
    iterating and teaching if it's not. The final polish came from using the flows as a user would.
    That's where the tweaks come from that make it work as a whole.
  </p>
  <p class="tip">
    My tip: pay attention. If you don't tell the robots how to behave and then check how they
    behaved, you'll get something you didn't ask for.
  </p>

  <HeadingLink level={3} size="xl" id="try" text="Try it" />
  <p>
    This has been an immense amount of fun: a modern web app plus iPhone and Android apps, built
    with SvelteKit, Fastify and <ExternalLink href="https://claude.com">Claude</ExternalLink>. Try
    it at <ExternalLink href={statusUrl}>status.me</ExternalLink>. The iPhone and Android apps are
    coming very soon.
  </p>
  <div class="actions">
    <Button variant="solid" external href={statusUrl}>Open status.me</Button>
    <StatusStoreLinks />
  </div>

  <HeadingLink level={3} size="xl" id="thanks" text="Thanks" />
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
      <ExternalLink href="https://github.com/snarktank/ai-dev-tasks">ai-dev-tasks</ExternalLink>
    </li>
  </ul>
</BuildStory>

<style>
  .web {
    margin-top: var(--space-6);
  }

  .tip {
    padding: var(--space-5) var(--space-6);
    font-weight: var(--font-weight-medium);
    color: var(--ink-strong);
    background: var(--surface-sunken);
    border-radius: var(--radius-lg);
  }
</style>
