# Tasks: company tenure and clickable tags

From `design_handoff_tenure_v2` (Claude Design, 23 Aug 2026). The spec is that bundle's
`BEHAVIOR.md`, not this file. Where the two disagree, the bundle wins and this file is wrong.

Branch: `feat/cv-enrichment`. Two rows change, Wayfair and HMRC. The other 22 are untouched.

## Relevant files

- `src/lib/role-runs.ts` - runs, chapters and the handover arithmetic. New.
- `src/lib/role-dates.ts` - already exports `monthsBetween` and `parseRoleRange`. Unchanged.
- `src/lib/components/RoleCard.svelte` - becomes a run rather than a role.
- `src/lib/components/Experience.svelte` - owns chips, so it owns the focus contract.
- `src/lib/cv-filter.ts` - already has `skill` chips and `isTagHot`. Unchanged.
- `src/routes/components/+page.svelte` - second consumer of the card, migrate with it.

## 1.0 Runs and tenure arithmetic

- [x] 1.1 Build runs from consecutive same-employer entries, never from company name alone, so the
      two Freelance stints stay apart.
- [x] 1.2 Walk entries forwards to number chapters and let each see the one before it.
- [x] 1.3 Subtract the shared handover month from the later chapter.
- [x] 1.4 Test the invariant: for every run, chapter months sum to the run total. This is the check
      that catches the bug that shipped in the first attempt.
- [x] 1.5 Test the real CV: Wayfair 2 chapters 1 yr, HMRC 3 chapters 1 yr 8 mos, nothing else
      grouped, all 27 roles still present.
- [x] 1.6 Test the edge cases: `Design Haus` has no range so no duration and no contribution to a
      span, and a run of one is indistinguishable from today's row.

## 2.0 Spine rendering

- [x] 2.1 Card takes a run. Solo runs render as now.
- [x] 2.2 Grouped runs: company once as `h3`, chapters as an `ol`, each chapter an `h4` so the
      document outline survives.
- [x] 2.3 Date column carries span, tenure and meta. The role count the design put here was
      dropped on Ben's call: the chapters below already show how many there are.
- [x] 2.4 Meta appears once on the header where every chapter shares it, otherwise on each chapter.
      Nothing is silently dropped.
- [x] 2.5 Spine geometry from `--space-4` and a local `--mark: 8px` only, no hand-tuned offsets.
- [x] 2.6 One rule segment per chapter, last one `display: none` so the rule ends at the final
      marker.
- [x] 2.7 Markers use `--brand`, not `--indicator`. They are decoration and carry no state.
- [x] 2.8 Migrate the component catalogue entry in the same change.

## 3.0 Clickable tags

- [x] 3.1 Tags become buttons, 24px minimum target, `aria-label="Filter by {tag}"`.
- [x] 3.2 Clicking adds a `skill` chip. Clicking an active tag is a no-op, not a duplicate.
- [x] 3.3 Tag click moves focus to the new chip. Not the tag, whose row may leave the DOM.
- [x] 3.4 Chip removal hands focus to the next chip, else the previous, else the search input with
      the listbox suppressed for that one programmatic focus.
- [x] 3.5 Both focus paths asserted in tests: `document.activeElement` is never `<body>`.

## 4.0 Date column typography

- [x] 4.1 One size across the column, `--font-size-xs`. The raw `0.625rem` goes.
- [x] 4.2 Two colours: the date line `--ink-muted`, everything derived from it `--ink-subtle`.

## 5.0 Gates

- [ ] 5.1 Spec diff against the bundle render at 1440 and 375, both themes, until empty or waived.
- [ ] 5.2 Paired gallery, looked at rather than merely generated.
- [x] 5.3 check, lint, unit, e2e with axe on all three routes.
- [ ] 5.4 Keyboard pass: tab to a tag, activate it, confirm focus lands on the chip and the row list
      updates.

## Not in scope

- The five colour direction proposals in the bundle's `tokens.css`. The changelog says ship nothing
  and `warm` was already rejected.
- The three remaining raw pixel type sizes elsewhere in the section (combobox kind label, floating
  label, role tags). Worth an `--font-size-2xs` token later.
- Copy. The bundle's render carries shorter role summaries than the site now has. Ours are the
  enriched ones drawn from the CV and they stay; the bundle is the authority on layout, not content.
