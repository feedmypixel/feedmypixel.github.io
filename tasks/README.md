# Tasks

Planning artefacts for this site. Everything here is written with AI tooling in the loop, so the
documents are shaped to be read by a model as much as by a person: explicit, self-contained, and
free of assumed context.

## How work gets planned here

1. **PRD first.** A feature or site-sized change starts as a product requirements document written
   with Claude Code - problem, goals, user stories, functional requirements, non-goals, open
   questions. Non-goals and open questions carry as much weight as the requirements; they are what
   stop scope drifting later.
2. **Tasks generated from the PRD.** The PRD is decomposed into a checkbox task list at a
   granularity a junior developer could pick up, with the relevant files listed against each parent
   task.
3. **Worked one parent task at a time**, ticking as it goes, so progress survives a lost session.

Design goes through a parallel track: briefs in [`design/`](../design) are written for
[claude.ai/design](https://claude.ai/design), and its output bundles are translated into components
with the `design-to-code` skill rather than imported wholesale.

## What is in here

- [`audit-onepager-v1.md`](./audit-onepager-v1.md) - the step-one audit for the current one-page
  site: what the design handoff specified, where the build deviated and why, and how the work was
  split into sessions.

The original PRD and its task list described a multi-page brochure with a dev blog. That plan was
superseded by the design-to-code process and the site shipped as a one-pager, so both documents were
removed rather than left to rot. They remain in git history if the reasoning is ever needed.
