# styles

App-wide CSS, split by concern into cascade layers behind one entry, `app.css` (the only stylesheet
the root layout imports). Mirrors the [stat-ui](https://github.com/feedmypixel) architecture.

| Layer       | File            | Holds                                                                      |
| ----------- | --------------- | -------------------------------------------------------------------------- |
| `tokens`    | `tokens.css`    | Custom properties — the **only** place raw hex lives (Stylelint-enforced). |
| `base`      | `base.css`      | Reset (Josh Comeau) + element defaults, token-driven. No component styles. |
| `objects`   | `objects.css`   | Layout primitives — `.stack` / `.cluster` / `.center` / `.container`.      |
| `utilities` | `utilities.css` | Single-purpose helpers — `.visually-hidden`.                               |
| `patterns`  | `patterns.css`  | Named multi-property patterns — added as page-level repetition earns them. |

## The boundary

Components are **self-contained**: scoped `<style>`, depending only on **tokens** — never a global
utility/object class for their own identity. Layout objects and utilities are a **page/route
call-site tool**. Cross-component duplication is DRY'd through **tokens, not shared classes**.

Later layers win, so order is drift-proof. A component's scoped `<style>` is unlayered and beats
every named layer by design.

## Tokens

Values come from the `design_handoff_onepager_v1` bundle. Naming follows stat-ui's conventions where
they map (`--font-size-*`, `--line-height-*`, `--font-weight-*`, `--transition-*`); the handoff's own
system stays where it's finer or off-brand for stat — the 12-step `--space-1`…`--space-24` scale,
pixel-square `--radius-*`, the fluid clamp() type scale, `--band` and `--gutter`. Dark theme is a pure
token swap under `[data-theme='dark']` — no per-component dark CSS.

Fonts are self-hosted via `@fontsource-variable/plus-jakarta-sans` (display + text) and
`@fontsource/dm-mono` (mono), imported in the root layout — no Google Fonts.
