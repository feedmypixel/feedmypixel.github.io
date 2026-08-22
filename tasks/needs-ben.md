# Needs Ben

Open items that only Ben can answer, gathered 21 Aug 2026. Everything here is blocked on his words,
his decision or his files, not on engineering.

This repo is public. Nothing sensitive belongs in this file: no personal contact details and no
commercial terms. Point at them instead.

## 1. The CV document

The PDF at `static/BenChidgeyCV.pdf` is exported from a doc file. Edit the doc, export, drop the new
PDF over the old one and it deploys with the next push.

- [ ] **Duplicate phrase.** The closing Activities line uses "keeping up to date" twice. Suggested:
      "I keep up to date with new technologies and spend time on research and development."
- [ ] **Cut the GCSEs.** Eight subjects with grades from 1988 to 1994. Two career changes ago.
- [ ] **Cut the City and Guilds certificates.** 1999, and one of them names Visual Basic.
- [ ] **Cut "My degree covered" and the module list.** Keep the degree, the class and the years.
- [ ] **Personal contact details.** Page one carries a mobile number and a home town. That PDF is
      linked from the hero and `robots.txt` welcomes every crawler, so both are machine harvestable
      and permanent. Consider email only on the published copy and keep a fuller version for direct
      applications. The site footer deliberately dropped the town already.
- [ ] **Length.** Eleven pages, and the weight is in the wrong end: a 2002 QA role runs to three
      paragraphs while three years at DEFRA gets two sentences. Compress everything before about
      2012 hard.

## 2. Role summaries the PDF could not fill

17 of 27 site roles were enriched from the PDF on `feat/cv-enrichment`. These ten say no more in the
PDF than on the site, so filling them means inventing. A sentence each on what was built and what
changed is enough.

- [ ] **DEFRA** - the priority. Three years, the most recent government work, currently one sentence.
- [ ] Ministry of Justice
- [ ] Marks and Spencer
- [ ] LifeBox Health
- [ ] Rewind
- [ ] Design Haus
- [ ] Trusted Digital
- [ ] Freelance, Oct 2005 to Jul 2006
- [ ] feedMyPixel R&D
- [ ] **Performance work.** Searching the CV for "performance" matches zero roles across twenty years
      of frontend engineering. If that work happened it is missing from the site and the PDF alike.

## 3. Recommendations

Two are visible on the public LinkedIn profile but truncated, with no titles or companies attached.

- [ ] Paste both in full: Anargyros Akrivos and Phil Segal.
- [ ] Add each person's role and company at the time.
- [ ] Message them to say the words are going on the site. Not strictly required for something they
      published, but it is courteous and it settles naming their employer.
- [ ] Check whether any more recent ones exist behind the login.

Placement will be between Experience and Services: proof of what Ben is like to work with, directly
before the terms of working with him. Schema will mark them as reviews, though search engines
discount self-published reviews for rich results, so expect no stars.

## 4. Decisions parked

- [ ] **Case study.** The largest gap. The site proves Ben ships and lists where he has been, but
      never shows him solving a problem. HM Passport Office is the obvious candidate. Needs a Claude
      Design brief and a designed section.
- [ ] **stat.** In progress. Once it exists publicly, decide whether it joins Products, because the
      positioning claims two products and the site shows one.
- [ ] **LinkedIn About.** Currently the same dense "Passionate multi-discipline" paragraph as the CV
      opener, in a register the site has moved away from. Worth rewriting alongside the CV.
- [ ] **Page voice.** An audit found three registers mixed across the page: first person in places,
      subjectless in others and commands to the reader in the Experience heading. Ben declined a
      rewrite on 21 Aug. Recorded here so it is a decision rather than an oversight.
