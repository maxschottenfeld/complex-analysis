---
layout: base.njk
title: "How I Built This"
---

# How I built this

I taught myself complex analysis the summer before starting college, using Claude as a tutor. Not "explain this to me" Claude — a tutor running on a written system that I refined as I went: it plans each lesson in advance, teaches by asking questions, keeps a running file on how I learn and where I slip, and quizzes me on old material on a schedule. This page is the actual workflow, including the prompts, because "I used AI to learn math" tells you nothing and the specifics are the whole point.

## The rule every lesson follows

**Compute → visualize → prove.** Every topic starts with a concrete computation done by hand — actual numbers, before any theory. Then an interactive visualization of that same computation. Only then the rigorous version: definitions, theorem, proof. By the time a proof shows up, I already know what it's claiming, because I've computed an instance of it and watched it move. That ordering is the spine of every lesson on this site, and it's why the visualizations live *inside* the lessons rather than the other way around.

## Sessions, not lectures

Lessons happen live in chat, and the tutor is under standing instructions to never lecture-then-quiz. The loop is: state a definition, immediately ask me to predict or compute something with it, confirm or correct, advance. For proofs, the instruction is to set up the argument, reach the key inferential step, and **stop** — I supply that step ("what inequality bounds this?"), and I get corrected if I'm wrong.

Every session also opens with two warm-up questions before any new material: a bridge question from the previous lesson, and a spaced-review question from a much older one, chosen from a retention tracker that logs when each lesson was last reviewed. One hard-won detail: after a multi-day gap, the warm-up has to be a direct mechanics question, not "walk me through the idea." I once narrated the Cauchy Integral Formula derivation perfectly and turned out to be shaky on the actual $M/R$ mechanics of Cauchy's estimate one session later. Narration can pass while the mechanics have decayed.

## A file on how I get things wrong

The system keeps a "teaching profile" — a running list of patterns in how I actually learn, updated after every session from a what-worked/what-didn't debrief. Real entries:

- **Sign-sensitive multi-step algebra:** I do correct algebra but drop signs and factors when combining steps mentally at pace. Fix: every substitution gets its own labeled line, and products get written as one unsimplified fraction before anything cancels — visible cancellation, not mental combination.
- **Genuinely new abstract definitions need a counterexample, not just an example.** When $\varepsilon$–$N$ convergence showed up, one worked computation wasn't enough — what made it click was testing $(-1)^n$ against the definition and watching it fail, which is what shows you why "for every $\varepsilon$" is the load-bearing phrase.
- **Gaps get named and fixed, not skipped.** Partway through Lesson 5 it became clear I had no real-analysis background, so bounding-and-estimate proofs were taking much longer to stick than computational ones. Instead of pushing on, we paused the syllabus and built a real-analysis primer from scratch — suprema, rigorous limits, the ML-estimate — before continuing.

None of this is generic tutoring advice. It's a specific model of one student, and it compounds: every lesson is planned against the current profile.

## Commissioning the visualizations

Each visualization on this site started as a written prompt, drafted right after finishing the lesson it belongs to. The format is always the same: state exactly what I just learned (so the visualization matches my derivation, not a textbook's), then specify what I want to see move and why. From my actual roots-of-unity prompt:

> Include a button/control that animates each root point moving (e.g. spiraling or rotating) to converge at $z=1$, illustrating $z^n=1$ for each root. While it animates, display each point's current angle $\theta$ and the value $n\theta$ updating in real time, so I can watch $n\theta$ approach a multiple of $2\pi$ as the point reaches $z=1$ — this ties the visual convergence directly back to the "match angles mod $2\pi$" derivation (the step I found hardest today).

"The step I found hardest today" is the whole method in one parenthetical: the visualization gets commissioned against the specific thing that was murky, while it's still murky. And the same prompt sets the boundary that keeps visualizations in their place:

> Keep it clean and uncluttered — I'm working from a "compute → visualize → prove" framework, so this visualization is the "visualize" step after I've already done the algebra by hand. It should reinforce what I derived, not introduce new unexplained material.

Later visualizations went further — the Cauchy Integral Formula walkthrough was commissioned as an explicitly *proof-based* visualization, with every animation step required to carry a caption saying why that step is valid (Cauchy-Goursat applies here because..., this converges by continuity...). That one exists because I flagged one specific step of the derivation as still murky at the end of a session, and the commission targeted exactly that step.

## Why it was efficient

- **State lives in files, not in my head.** Syllabus progress, a session log ending with a "next session start here" line, the teaching profile, the retention tracker. Every session resumes in seconds with zero re-explaining.
- **The feedback loop is structural.** End of session: what worked, what didn't. The answer changes the profile, and the profile changes the next lesson's plan. Mistakes become instructions.
- **Everything produced along the way became this site.** Lessons were written up after being taught, then adapted for a reader who isn't me. The visualizations were already self-contained HTML by design, because the prompts required it from day one.

## The site itself

Eleventy static site, KaTeX for the math, dark theme matched to the visualizations' palette, deployed on GitHub Pages. The animated background on the homepage is live domain coloring — the first tool Lesson 0 teaches.

If you want to try something like this: make the AI ask *you* the questions, make it keep a file on how you get things wrong, and write your own prompts for the things you want to see move.
