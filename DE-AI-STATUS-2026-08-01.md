# De-AI Pass — Status Review

**Written:** 2026-08-01
**Companion to:** `DE-AI-BRIEF.md` (the prep) and `DE-AI-DECISIONS.md` (the triage). This file is the "where are we actually" check.

> **Update, 2026-08-02.** Phase 1 (below) is actually done — Max ran a Claude Code/Opus session directly in this repo on 2026-08-01, ~2:09–2:52 PM PST, right after this file was written, and it never made it back into the assistant's tracking (robot log/activity log) because that session ran outside Cowork. Confirmed against git: `487f405` (README conventions + hero italic decided) and `9e920f1` (this file + the BRIEF correction) are both on `main`. The Lesson 8 Job A test also ran (`557deed`, branch `de-ai-lesson8-humanizer-test`) — independently re-verified 2026-08-02: build passes, `checkMathEscapes` clean, zero math/notation/proof-order changes, em-dashes 41→11, bold spans 48→38 (structural bold kept, mid-sentence emphasis cut). Sitting unmerged, pending Max's own read of the voice before it ships or extends to the other nine lessons. **"What still needs doing" #2 and #3 below are stale** — see this banner instead. Section 1 (Job A/Job B) and Phase 2/3 are still accurate.
>
> **Update, 2026-08-02 (later same day).** Merged. `de-ai-lesson8-humanizer-test` is on `main` as of commit `557deed` — clean fast-forward, one file (`src/lessons/08-conformal-mapping.md`), no other changes, exactly as expected. Build re-run after the merge: passes, `checkMathEscapes` clean, page renders. **Phase 1 is fully closed, no remaining steps.** The branch itself is stale now and can be deleted whenever convenient. Not pushed to `origin/deploy` — that's a separate decision Max hasn't made yet. Next up per the plan below is Phase 2 (Lessons 9/12/10/11, written to convention as they land) and, eventually, Phase 3 (Job A on the other nine lessons, then Job B).

---

## The short version

The de-AI job was always two jobs: how the site **looks** and how it **reads**.

**The looks half is done.** Four commits, all merged to main and pushed to GitHub. Everything the audit called a real defect got fixed, plus the one big aesthetic change.

**The reads half is starting, not stalled.** Conventions are written, the italic call is made, and the Lesson 8 tool-pass test has run, checked out mechanically, been approved by Max, and is merged to `main`. Job A is proven on one lesson; the other nine and Job B (Max's own read-through) are what's left, per Phase 3 below.

That's the whole status in one line: the stylesheet got audited twice and fixed; the writing has conventions, a go/no-go test done, and is waiting on Max's read of one diff.

---

## What changed, in plain terms

Four commits landed between July 31 and today.

### 1. The color system had a real bug, not just a style problem

The site was supposed to give every lesson its own color. It looked like it did. It didn't — links, buttons, and focus outlines were the same blue on all ten lessons, because of how the color was defined. Only the card stripes were actually varying.

That got split into two honest categories:

- **Chrome** (links, buttons, focus rings) — deliberately fixed blue on every page. A link that changes color per lesson costs more in "wait, is that a link?" than it buys in theme.
- **Signal** (the lesson card stripes) — genuinely per-lesson, ten distinct colors.

### 2. Colors now read at the same brightness across lessons

Previously the accent on Lesson 6 was nearly three times dimmer than on Lesson 1, from identical CSS. Switched the color math to a system where brightness is perceptually even.

| | Before | After |
| --- | --- | --- |
| Dimmest lesson | 5.56:1 | 8.62:1 |
| Brightest lesson | 14.23:1 | 9.55:1 |
| Spread | **2.56×** | **1.11×** |

All ten lessons clear the accessibility floor with room to spare. This was the single best finding of the whole audit, and notably it wasn't an "AI tell" at all — it was a bug.

### 3. Three readability fixes

- **Dimmed scroll-story text** was at 2.90:1, below the readable minimum. Now 5.37:1.
- **Lesson line length** measured 82 characters per line in a real browser. Too wide — eyes lose their place on the return sweep. Now 68. Equations keep the wider column so they don't wrap.
- **Long headings** now break instead of overflowing on phones. Defensive; nothing currently overflows, but Lessons 9-12 don't have titles yet.

### 4. The two gradients are gone

Both of them. At the default blue, they ran literally blue-to-violet, which is the single most recognizable "an AI built this" signature in web design. The brief only caught one; the audit found a second on the lesson cards, which was the more visible of the two.

### 5. The hero got rebuilt

Everything was stacked on one centered line: eyebrow, headline, tagline, buttons, caption. That's the most generic page-top shape that exists, and it was the only centered thing on the site since every section below it is flush left.

Now it's a left column that lines up exactly with the section headings below it, with the caption pushed to the opposite corner. The corner move is the part that matters — flush-left-everything is just the *second* default a model reaches for once you tell it not to center. The diagonal is an actual composition. It also uncovers the animated canvas instead of covering it with a wall of text.

### 6. Invisible cleanup

Press-down feedback added to all 11 clickable elements (there was none anywhere). 38 scattered one-off color values collapsed into named tokens, verified pixel-identical. Zero visible change, but the stylesheet's own header comment claimed a discipline it wasn't keeping. Now it is.

---

## What still needs doing

### 1. The writing. This is the whole remaining job — and it's two jobs, not one.

**Job A — the tool pass.** Strip the mechanical tells: em-dash density, bold overuse, signposting phrases. Humanizer does this, with voice calibration from a sample of your writing so the result has your rhythm rather than generic clean prose.

**Job B — your read-through.** This is item 4 of the Website Future To Do draft: *"read through the lessons with AI, rewrite things to make sure they make sense to the way I understand them, I want to make it accessible."* You drive. The output is a lesson that says what you'd say, aimed at a reader who isn't you.

These are often conflated. `DE-AI-BRIEF.md` says humanizer *"maps directly onto"* item 4, which oversells it — the draft's own wording, *"pairs with,"* is the accurate one. Voice calibration makes prose **sound** like you. Item 4 makes it **say what you mean**. Humanizer structurally cannot do Job B: its no-fabrication rule means it can only rewrite what's on the page, never reorganize an explanation around your mental model or add the sentence you'd write because you know where a reader gets stuck.

**Decided 2026-08-01: Job A first, then Job B.** The tool pass clears the mechanical noise so your read-through is spent on meaning rather than punctuation. Job B is also the far bigger commitment — ten lessons now, fourteen by the end, all read personally — and it's the one that actually competes with teaching Lessons 9-12, not the tool run.

**Current prose state, unchanged since measured:**

Unchanged since it was measured:

| Lesson | Em-dashes | Bold spans |
| --- | --- | --- |
| 00 Big picture | 22 | 9 |
| 01 Complex numbers & topology | 26 | 25 |
| 02 Holomorphic & Cauchy-Riemann | 21 | 13 |
| 03 Power series & elementary fns | 26 | 8 |
| 04 Cauchy's theorem & CIF | 39 | 13 |
| 05 Consequences | 44 | 21 |
| 05a Real-analysis bridge | 42 | 26 |
| 06 Power series & continuation | 54 | 30 |
| 07 Residues | 33 | 23 |
| 08 Conformal mapping | 41 | **48** |
| **Total** | **348** | **216** |

Em-dash density is the most reliable text-level fingerprint of machine writing, and bold-marker overuse is close behind. Lesson 8 is an outlier on bold and is the natural test case.

The prepared session (humanizer, Lesson 8 only, with a sample of your own writing for voice calibration) is written in `DE-AI-BRIEF.md` and has since been run, approved, and merged — see the 2026-08-02 banner at the top. The table above is the pre-Job-A baseline for all ten lessons; Lesson 8's numbers on `main` are now 11 em-dashes and 38 bold spans, not 41/48.

### 2. ~~The conventions were never written into the README~~ — done 2026-08-02 update

Written into `README.md`'s "Writing conventions" section (commit `487f405`, 2026-08-01): em-dashes budgeted ~1/250 words (measured density was ~1/45), bold restricted to structural use only, headings codified as already-consistent sentence case. Lesson 9 is next and unwritten — it lands conforming.

### 3. ~~Italic headline~~ — decided 2026-08-02 update

Decided 2026-08-01 (commit `487f405`): shown both ways, went with roman. `font-style: italic` removed from `.hero h1` in `src/css/style.css`.

### 4. Two small things flagged and never resolved

- The "On this page" sidebar card renders wider than the text column at screens under 1380px.
- The per-lesson text accents (badges, step tags, arrows) still carry the old uneven brightness — 5.24:1 to 15.08:1. None fail the standard, so this is tidiness, not a defect.

### 5. Housekeeping

- The default blue (`--h: 215`) question is formally dead. The audit's color gates passed and the ban turned out to be a different tool's rule, presented in the brief with more authority than it had. Deprioritized, correctly.
- One stale branch, `site-gerald-embed`, sits 1 commit ahead of main. Worth checking whether that commit matters or the branch should go.
- The local `_site` build folder is three weeks stale. Harmless (GitHub Actions builds on deploy) but confusing to look at.

---

## How anyone working on this should report back

Standing instruction for any Claude Code session, subagent, or assistant working on this project.

**Report in plain language. Decode the jargon before it reaches Max.**

Specifically:

- **Say what changed and why it matters**, not what the rule was called. "The dim text was too faint to read comfortably; it's now readable" beats "gate 40 violation, WCAG AA 4.5:1 non-compliance remediated."
- **Never use a gate number, pattern number, or tool-internal name as the explanation.** Cite it in parentheses if useful for traceability, but the sentence has to stand on its own without it.
- **Translate measurements.** Contrast ratios, character counts, and hue values mean nothing on their own. Say what a reader would actually notice.
- **Lead with the answer.** What's the state, what changed, what's left. Detail after, and only as much as the decision needs.
- **Flag uncertainty out loud.** If something wasn't verified, say so plainly rather than burying it. Don't present an estimate as a measurement.
- **Surface disagreements with the source material.** If a brief, an audit, or a previous session got something wrong, say so directly and say what the correction is. Two of the three findings in the original brief needed correcting, and catching that was worth more than the findings themselves.
- **When a recommendation is a judgment call rather than a defect, label it as one.** Max decides those; don't smuggle taste in as though it were a bug.

This is not a request for less rigor. Do the rigorous thing, then explain it like a person.

---

## The plan

**The calendar:** 23 days until Aug 24 (lessons finish). Site audit + LinkedIn launch window is Aug 25 – Sep 9. Departure for UCSB Sep 10.

Reminder from `CLAUDE.md`: **Aug 24 finishes the lessons, not the project.** This is done when the site is one you're proud of and posted.

The collision to plan around: Lessons 9, 12, 10 and 11 still need to be taught and written, and a prose pass across every lesson is real work. Those compete for the same three weeks. The sequencing below protects the teaching.

### Phase 1 — this week (before Lesson 9 gets written) — **done 2026-08-01, confirmed 2026-08-02**

**1. Set the prose conventions, write them into the README.** ✅ Done — `README.md`, commit `487f405`.

**2. Run the Lesson 8 tool test (Job A).** ✅ Run — branch `de-ai-lesson8-humanizer-test`, commit `557deed`. Mechanically verified 2026-08-02 (build passes, `checkMathEscapes` clean, no math/notation/proof-order changes, em-dashes 41→11, bold spans 48→38 with structural bold kept). **Approved by Max, 2026-08-02** — reviewed rendered side-by-side (both branches built through the real Eleventy/KaTeX pipeline, not just the raw markdown diff). Verdict: **go.** **Merged to `main` 2026-08-02** — clean fast-forward, re-verified after the merge (build passes, `checkMathEscapes` clean, page renders).

**3. Decide the italic headline.** ✅ Decided — roman, commit `487f405`.

**Phase 1 exit condition: fully closed 2026-08-02.** Conventions in the README ✅, headline settled ✅, Lesson 8 diff run, verified, approved, and merged to `main` ✅. Nothing left in Phase 1. Not pushed to `origin/deploy` — that's Max's call, separate from the merge.

### Phase 2 — Aug 1 to Aug 24, alongside teaching

Teaching Lessons 9, 12, 10, 11 is the priority. The only website work in this phase is passive:

**4. Write new lessons to the conventions as they land.** No retrofit, no separate pass. This is why Phase 1 comes first.

If Phase 1's Lesson 8 test came back good, running Job A on a freshly written lesson right after it's ported is cheap and keeps the backlog from growing. If it came back bad, do nothing here and handle prose entirely in Phase 3.

### Phase 3 — Aug 25 to Sep 9 (the audit + launch window)

**5. Job A across the remaining lessons.** Everything not already done. Same guardrails each time.

**6. Job B — your read-through.** The real one. Each lesson read by you, rewritten so it says what you'd say and lands for a reader who isn't you. Lessons arrive already stripped of mechanical tells, so this pass is spent entirely on meaning and accessibility.

**7. Cleanup while you're in there.** The sidebar card that outgrows the text column under 1380px, and the stale `site-gerald-embed` branch.

**8. The three post-completion items from the Website Future To Do draft**, which have been waiting on exactly this moment:
   - **Council-style review** — agents playing different readers off your LinkedIn post. The curious non-expert: can they follow it? The person who knows the material: is it any good?
   - **Notebook notes** — your handwritten working, showing the process rather than only the polished result.
   - **Attribution** — Claude not listed as an obvious contributor, and equally not a claim that you built it all by hand. It's largely AI-assembled; that just doesn't need to be the first thing a visitor sees.

**9. Post it.**

### Not doing

Spacing tokens, easing tokens, nav structure, side-stripe widths, viewport-width arithmetic, and the default-blue question. All real, all minor, all churn against a hard date. The default blue in particular is formally dead: the audit's color gates passed and the ban turned out to belong to a tool that was never run.

### Risks worth naming

- **Job B is the schedule risk, not Job A.** Fourteen lessons read personally is days of work, and it lands in the same window as the council review and the launch. If Phase 3 gets compressed, Job B is what gets squeezed, and it's the item you actually care about. Consider starting it on the earliest-written lessons (00 through 05) during Phase 2 if teaching leaves any room.
- **The Aug 24 date is for lessons only.** Nothing in this plan finishes on Aug 24. If the site needs to be posted before you leave Sep 10, Phase 3 has about two weeks to hold five items.
- **Lesson 9 is mid-flight.** Segment 2 (the reflection formula) was left unfinished on 2026-07-28. That has to close before the revised order (9 → 12 → 10 → 11) moves.

---

## Handoff prompt for Claude Code

Paste this into a Claude Code session in the `Website/` repo. It covers Phase 1 only.

```
Read these three files in this repo first, in order:
  DE-AI-STATUS-2026-08-01.md   (current state and the plan)
  DE-AI-BRIEF.md               (the original prep, incl. a correction block)
  DE-AI-DECISIONS.md           (the audit triage)

Context: this is an Eleventy static site. Vanilla CSS, KaTeX via CDN, no
React, no Tailwind, no component framework. Discard any tool recommendation
that assumes otherwise instead of adapting it.

The CSS half of the de-AI work is done and on main. The prose half has never
been started. That's this session.

HOW TO TALK TO ME — this matters as much as the work:
Report in plain language. No gate numbers, no pattern numbers, no tool
jargon as the explanation. Tell me what changed and why it matters to a
reader. Put ratios and counts in terms of what someone would actually
notice. Lead with the answer. If something wasn't verified, say so plainly
instead of presenting an estimate as a measurement. If you disagree with
anything in those three files, say so directly — they've each been wrong
before.

TASK 1 — Set the prose conventions.
Before writing anything, ask me to decide three things, and give me your
recommendation plus the tradeoff for each:
  - em-dash policy (there are 348 across the ten lessons)
  - bold policy (216 bold spans; Lesson 8 alone has 48)
  - heading case
Then write the decisions into README.md as a short "Writing conventions"
section, so Lessons 9-12 conform as they're written instead of needing a
retrofit later. Keep it brief and rule-shaped, not an essay.

TASK 2 — The Lesson 8 tool test.
  npx skills add blader/humanizer --global
Note: when hallmark was installed this way on 2026-07-31 it landed in
.agents/skills/ in the repo, NOT ~/.claude/skills/. Expect the same and
check .gitignore covers it (.agents/ and skills-lock.json are already
ignored).

Run it on ONE file only: src/lessons/08-conformal-mapping.md
Highest bold count of the ten and the most recently ported, so it's the
cleanest test case.

Before rewriting anything, ask me for 2-3 paragraphs of my own writing and
calibrate to it. I don't want generic cleaned-up prose. I want it to sound
like me.

HARD CONSTRAINTS:
- Prose only. Nothing inside $...$ or $$...$$ or any KaTeX block. This repo
  has a markdown-it escaping gotcha where single \, and \{ get eaten before
  KaTeX runs, and a checkMathEscapes build guard that will fail the build
  if you break it.
- Do not change mathematical content, notation, or the step order of any
  proof. Several proofs are deliberately in my own step order, not the
  textbook's. Preserve them exactly.
- No fabrication. Don't add claims, names, dates, or citations that aren't
  already in the source.
- This is the tool pass only. It is NOT the separate job where I read
  through and rewrite lessons in my own words — don't attempt that, and
  don't restructure explanations.

Work on a branch. Do not commit to main. After the rewrite: run the build,
confirm checkMathEscapes passes, preview it, and show me the full diff
before committing.

TASK 3 — The italic headline.
src/css/style.css line 311 sets font-style: italic on the hero h1. It's
been flagged as a possible AI tell and deliberately left alone. Show me it
rendered both ways so I can decide by looking. Don't change it on your own.

Then stop. Nothing merges to main without me looking at it.

Model: Opus.
```
