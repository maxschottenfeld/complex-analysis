# De-AI Pass — Brief for the Claude Code Session

**Written:** 2026-07-31

> **Status as of 2026-08-01: this file is the original prep, kept for its reasoning.** Session 1 (the CSS audit) ran and shipped. Session 2 (the prose pass) has not started. One claim in the prose section below was corrected on 08-01 — see the correction block there. For current state, the plan, and the handoff prompt, read **`DE-AI-STATUS-2026-08-01.md`**.

**Why this exists:** the July 9 redesign was an AI de-AI-ing itself, which is circular — it can only remove tells it already knows to look for. This brief is the prep work for a second pass driven by human-authored rule sets, so the Claude Code session starts from findings instead of from scratch.

**Run this in Claude Code, in the `Website/` repo.** The skills install to `~/.claude/skills/` and operate on the codebase; the build/preview/iterate loop needs a real working directory.

---

## The four tools — all verified real, but only two are worth installing

| Tool | Verdict |
| --- | --- |
| **nutlope/hallmark** (Together AI, MIT) | **Install.** Has an `audit` verb: *"score existing code against the anti-patterns. Punch list, no edits."* Non-destructive second opinion — exactly the job. 57 slop-test gates. |
| **blader/humanizer** (MIT) | **Install. This is the sleeper pick and probably the highest-value of the four** — see the prose section below. |
| **Leonxlnx/taste-skill** (64.9k stars, MIT) | **Install, but only the `redesign-existing-projects` or `minimalist-ui` variant.** The default skill is a poor fit — reasons below. |
| **facebook/astryx** (Meta, MIT) | **Skip.** It's a React + StyleX component library (150+ components). This site is Eleventy + vanilla CSS + KaTeX with no React. Adopting it is a rewrite, not a polish pass. |

### Why the default taste-skill is a mismatch

Its ~1,200 lines target React/Tailwind/Motion/GSAP **product landing pages**. Whole sections are irrelevant here: hero CTA rules, testimonial blocks, pricing teasers, trust micro-strips, shadcn/ui customization, `useState`-vs-`useMotionValue`, dashboard density dials.

What *does* transfer: section 4.1 (typography), 4.2 (color calibration), and section 9 (AI Tells — visual/CSS, typography, layout, content). Read those four; skip the rest.

---

## Findings from the current CSS — things the July 9 pass left in

These are real hits, found by reading `src/css/style.css` (999 lines) against the transferable rules. **Do not fix these blind — they're the audit's starting hypotheses, and two of them may be defensible.**

### 1. The default hue is blue (`--h: 215`)

```css
--h: 215; /* default page hue */
--accent: hsl(var(--h) 70% 70%);
--bg: #0a0c12;
```

taste-skill bans the blue/purple palette as a *default reach* — its argument is that it's the palette every AI-built site lands on, so the brand goes invisible. Line 215 on a `#0a0c12` near-black is squarely that palette.

**Counter-argument worth weighing before changing anything:** on this site the hue is not decorative. Each lesson has its own `--h` from `lessons.json`, and the whole system is a deliberate echo of domain coloring — the subject matter of Lesson 0. That's a real design rationale, not a default. The question for the audit is narrower: **should the site-wide default (the homepage, the chrome, the non-lesson pages) be 215, or should the neutral chrome sit off the hue wheel entirely so the per-lesson hues read as signal rather than as more of the same?**

### 2. A two-stop hue-shifted gradient

```css
/* line 329 */
background: linear-gradient(90deg, hsl(var(--h) 85% 62%), hsl(calc(var(--h) + 50) 85% 62%));
```

A gradient from a hue to that-hue-plus-50 is one of the most recognizable AI-built-site signatures. The July 9 pass removed "gradient blobs" but left this one. **Strongest single candidate for removal.**

### 3. Hero vignette stack

```css
/* lines 167-168 */
radial-gradient(70% 90% at 50% 38%, transparent, rgba(10, 12, 18, 0.55)),
linear-gradient(180deg, rgba(10, 12, 18, 0.55), rgba(10, 12, 18, 0.3) 45%, var(--bg));
```

A darkening radial-plus-linear vignette over a hero canvas. Common AI move. Might be earning its keep here (it's doing legibility work over the animated hero) — flag for the audit, don't assume.

### 4. Not a problem — leave alone

- **Fonts are fine.** Source Serif 4 / Newsreader / system mono. Not Inter, not Fraunces, not Instrument Serif — all three of taste-skill's named-and-banned defaults are already absent. The July 9 pass got this right.
- **The conic-gradient rainbow disc** (lines 124–127) is a domain-coloring reference, i.e. the thing the site is *about*. Thematic, not slop.

---

## The prose is the bigger problem, and nobody has looked at it

This is the finding I'd act on first, and it has nothing to do with CSS.

Humanizer is built on [Wikipedia's *Signs of AI writing*](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) — 33 patterns catalogued by WikiProject AI Cleanup from thousands of real cases. Two of them fire hard across every lesson on this site:

| Lesson | Em-dashes | Bold markers |
| --- | --- | --- |
| 00 Big picture | 22 | 18 |
| 01 Complex numbers & topology | 26 | 50 |
| 02 Holomorphic & Cauchy-Riemann | 21 | 26 |
| 03 Power series & elementary fns | 26 | 16 |
| 04 Cauchy's theorem & CIF | 39 | 26 |
| 05 Consequences of Cauchy's formula | 44 | 42 |
| 05a Real-analysis bridge | 42 | 52 |
| 06 Power series & continuation | 54 | 60 |
| 07 Residues & contour integration | 33 | 46 |
| 08 Conformal mapping | 41 | 96 |
| **Total** | **348** | **432** |

Humanizer pattern **#14 (em/en dashes)** is a *hard cut*, not a "reduce" — the argument is that em-dash density is the single most reliable text-level fingerprint of LLM prose. Pattern **#15 (boldface overuse)** is close behind. 348 em-dashes across ten essays is a lot, and Lesson 8's 96 bold markers is an outlier worth looking at on its own.

Also worth checking against the pattern list: **#17 Title Case Headings**, **#28 signposting** ("Let's dive in", "Here's what you need to know"), **#10 rule of three**, and **#31 manufactured punchlines**.

**Humanizer has voice calibration** — feed it 2–3 paragraphs of your own writing and it matches your rhythm and word choice instead of producing generic clean prose. It also has a no-fabrication rule: it won't invent facts, names, or citations not in the source. That matters for math exposition.

> **Correction, 2026-08-01.** This section originally said voice calibration "maps directly onto" item 4 of the Website Future To Do list ("rewrite things to make sure they make sense to the way I understand them"). That oversells it. Max's own draft says humanizer *"pairs with"* item 4, and his wording is the accurate one.
>
> They are two different jobs, and conflating them hides the larger one:
>
> - **Job A — the tool pass.** Humanizer strips mechanical tells (em-dash density, bold overuse, signposting) and matches Max's rhythm. Tool drives; Max reviews a diff. This is what the Session 2 prompt below runs.
> - **Job B — Max's read-through.** Item 4 proper. Max reads each lesson and rewrites so it says what *he* would say, aimed at a reader who isn't him. Max drives.
>
> Voice calibration makes prose **sound** like Max. Item 4 makes it **say what he means**. Humanizer structurally cannot do Job B — its no-fabrication rule confines it to rewriting what is already on the page, so it can never reorganize an explanation around his mental model or add the sentence he'd write because he knows where a reader gets stuck.
>
> **Sequence decided 2026-08-01: Job A first, then Job B**, so the read-through is spent on meaning rather than punctuation. Job B is the far bigger commitment — ten lessons now, fourteen by completion, all read personally — and it, not the tool run, is what competes with teaching Lessons 9-12. See `DE-AI-STATUS-2026-08-01.md`.

**Caution:** run humanizer on prose only. Do not let it near KaTeX blocks — this repo has a documented markdown-it escaping gotcha (`\,` and `\{` get eaten before KaTeX runs; there's a `checkMathEscapes` build guard for exactly this). Rewrite section by section and run the build after each.

---

## Suggested order for the Claude Code session

1. `npx skills add nutlope/hallmark` → run `hallmark audit src/css/style.css` and `hallmark audit src/_includes/`. **Punch list only, no edits.** Compare its findings to the four above — the interesting result is what it catches that this brief didn't.
2. Decide the CSS changes from that punch list. Expect this to be small; the site is already most of the way there.
3. `npx skills add blader/humanizer --global` → run it on **one** lesson first (Lesson 8 — highest bold count, most recently ported, least edited by hand). Calibrate it with your own writing sample. Review the diff carefully before touching the other nine.
4. Build + preview + verify KaTeX renders clean after every prose change.

## What to carry forward into Lessons 9–12

Whatever comes out of steps 2 and 3, write the resulting conventions into the site README so the remaining four lesson ports conform as they land instead of getting retrofitted. Specifically worth deciding up front: em-dash policy, bold policy, heading case, and whether the hue default changes.

---

## Handoff prompts

This file lives in the repo, so the prompts below just point at it. Run them as **two separate sessions** — CSS and prose are different jobs and mixing them makes the diff unreviewable.

### Session 1 — CSS audit (hallmark)

```
Read DE-AI-BRIEF.md in this repo first. It's the prep for this session and
explains what we're doing and why.

Then:
1. Install hallmark:  npx skills add nutlope/hallmark
2. Run `hallmark audit` against src/css/style.css and src/_includes/
3. Report the punch list. Make NO edits.

When you report back, do three things:
- List everything hallmark flagged.
- Explicitly separate out anything it caught that DE-AI-BRIEF.md did NOT
  already identify. That gap is the entire point of this exercise — an AI
  already audited this site once and I want to know what a human-authored
  rule set sees that it didn't. Don't bury those items in the list.
- For each of the brief's existing findings (the --h: 215 default hue, the
  line-329 hue-shifted gradient, the hero vignette stack), say whether
  hallmark independently agrees, disagrees, or is silent.

Then stop and wait. I decide what changes before anything is touched.

Context you need: this is an Eleventy static site — vanilla CSS, KaTeX via
CDN, no React, no Tailwind, no component framework. Discard any
recommendation that assumes otherwise rather than trying to adapt it.
```

### Session 2 — prose pass (humanizer)

```
Read DE-AI-BRIEF.md in this repo first, especially the prose section.

Install humanizer:  npx skills add blader/humanizer --global

Then run it on ONE file only: src/lessons/08-conformal-mapping.md
(It has the highest bold-marker count of the ten lessons and is the most
recently ported, so it's the best single test case.)

Before rewriting anything, ask me for a sample of my own writing and
calibrate to it. I don't want generic cleaned-up prose — I want it to
sound like me.

Hard constraints:
- Prose only. Do not touch anything inside $...$ or $$...$$ or any KaTeX
  block. This repo has a markdown-it escaping gotcha — single \, and \{ get
  eaten before KaTeX runs — and a checkMathEscapes build guard that will
  fail the build if you break it.
- Do not change mathematical content, notation, or the step order of any
  proof. Several proofs in these lessons are deliberately in my own step
  order, not the textbook's. Preserve them exactly.
- No fabrication. Don't add claims, names, dates, or citations that aren't
  already in the source.

After the rewrite: run the build, confirm checkMathEscapes passes, and show
me the full diff before committing. Work on a branch — do not commit to main.

If the Lesson 8 result is good, we'll do the other nine the same way. If it
isn't, we stop and adjust.
```

---

## Model routing

**Both sessions: Opus.** Not Fable — those credits go to Lesson 10 (zeta/RH) and the council-style site review.

**Session 1 (CSS audit) — Opus.** Two reasons. The recency test fires on the tooling: `npx skills add` and these four repos all postdate Fable's and Sonnet's January 2026 cutoff, and Opus (May 2026) is the only one of the three that can know them. More importantly, the actual work is a judgment call — deciding which of hallmark's findings apply to an Eleventy math-essay site versus a React product landing page. Sonnet's likely failure mode here is over-applying the rule set and "fixing" things that were deliberate.

**Session 2 (prose) — Opus.** Different reason. Humanizer's 33 patterns are explicit and well-scoped, which normally argues Sonnet. But the constraint set is unforgiving: rewrite the prose, match a voice, and don't alter mathematical content, notation, or proof step order — while working in files where a single eaten backslash breaks the build. The dangerous failure is silent: a proof step subtly reordered in a way that still reads fine. That's worth Opus.

*Caveat on the recency argument: once a SKILL.md is installed, its rules are in context and get read rather than recalled, so Test C matters less for execution than for the install flow and for knowing these tools exist at all. The capability and judgment arguments above are the load-bearing ones.*
