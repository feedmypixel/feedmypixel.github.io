# Tasks: CV session follow-ups

From the `feat/cv-enrichment` CV rewrite (24 Aug 2026). Nothing here blocks that branch merging -
these are gaps found along the way, not defects in what shipped.

## 1.0 Testing gaps

- [ ] 1.1 Set up visual regression testing. `pnpm test:visual` runs against
      `playwright.visual.config.ts` but finds zero spec files - the tooling exists, nothing uses it
      yet.
- [ ] 1.2 Write the actual visual regression specs once 1.1 is set up. At minimum the homepage
      (light + dark) and the Experience section, which changed markup this session (`<p>` per
      summary paragraph, `{@html}`).
- [ ] 1.3 `src/lib/seo/structured-data.ts` (the JSON-LD builder) is at 0% test coverage. It was
      edited this session to route `role.summary` through `stripHtml` - verified manually in the
      browser repeatedly, never locked in by a test.

## 2.0 Python scripts to TypeScript

- [ ] 2.1 Scheduled as a cloud routine, fires Thu 27 Aug 2026, 1pm Europe/London:
      https://claude.ai/code/routines/trig_01JimXRysdWDC45dqi76uPVX - ports
      `scripts/cv-to-odt.py` and `scripts/sync-experience.py` to TypeScript, with tests, wired into
      `package.json`. Check its result and PR when it fires; routines can fail or need a follow-up
      nudge like any other agent run.

## 3.0 Open judgement call

- [ ] 3.1 "Freelance, Developer and Designer" (Oct 2005 to Jul 2006 - J2ME game graphics, 3D
      modelling, Flash) got JavaScript/CSS/HTML added along with every other hands-on role, on the
      strength of "the 3D work for the Concorde2 website." Weakest of the 24 roles this applied to.
      Confirm or revert.

## Not in scope here

`tasks-tenure-v2.md` gates 5.1, 5.2 and 5.4 (spec diff, paired gallery, keyboard pass) are tracked
there already, unrelated to the CV work.
