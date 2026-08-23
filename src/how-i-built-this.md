---
layout: base.njk
title: "How I Built This"
description: "The actual workflow behind the site: Socratic sessions with Claude, spaced review, a running profile of how I learn, and the real prompts that commissioned each visualization."
---

# How I built this

I taught myself complex analysis the summer before starting college, using Claude as a tutor. This doesn't just mean asking for practice questions or explanations of topics, but rather a tutor running on a written system that gets refined as I go. It plans each lesson in advance, teaches by asking questions, and stores everything in markdown files with folder structure as the architecture. This page is a showcase of the actual workflow.

## The notebook

Every lesson was worked out by hand before any of it was written up. This is the notebook.

<figure class="notebook-figure">
  <video class="notebook-video" controls preload="metadata" playsinline muted
         poster="/assets/video/notebook-poster.jpg">
    <source src="/assets/video/notebook-flipthrough.mp4" type="video/mp4">
  </video>
</figure>

## The rule every lesson follows

Most topics started with something concrete and verifiable: a computation done by hand. That usually led to a visualization of the idea. Only then came the rigorous version: definitions, theorems, proof. This kept me from getting lost in ε-δ. I understood what a concept meant before I ever saw its formal statement.

## Sessions, not lectures

Lessons were delivered live in chat, with the tutor under strict instructions to never lecture and then quiz me. The loop: state a definition, I immediately try to predict or compute something with it, get confirmed or corrected, then move forward. For proofs, the instruction is to set up the argument, reach the key inferential step, and stop. I supply that step, and if I'm wrong, I get steered toward the right answer instead of just being handed it.

Every session also opens with two warm-up questions. The first is a bridge question from the previous lesson that directly relates to the current one, and the second is a spaced-review question from an older lesson. A retention tracker logs when each lesson was last reviewed. The second question tends to review actual mechanics, like how $M/R$ works in Cauchy's estimates.

## A file on how I get things wrong

The system keeps a teaching profile, a running list of patterns in how I actually learn. Some real entries, logged after sessions:

- **Sign-sensitive multi-step algebra:** I do correct algebra but drop signs and factors when combining steps mentally at pace. Fix: every substitution gets its own labeled line, and products get written as one unsimplified fraction before anything cancels: visible cancellation, not mental combination.
- **Genuinely new abstract definitions need a counterexample, not just an example.** When $\varepsilon$–$N$ convergence showed up, one worked computation wasn't enough. What made it click was testing $(-1)^n$ against the definition and watching it fail, which is what shows you why "for every $\varepsilon$" is the load-bearing phrase.
- **Gaps get named and fixed, not skipped.** Partway through Lesson 5 it became clear I had no real-analysis background, so bounding-and-estimate proofs were taking much longer to stick than computational ones. Instead of pushing on, we paused the syllabus and built a real-analysis primer from scratch (suprema, rigorous limits, the ML-estimate) before continuing.

This tutoring model is refined specifically for me, and it compounds. Every lesson gets planned against the current profile.

## Commissioning the visualizations

Visualizations on this site started as a written prompt, each one drafted right after finishing the lesson it belongs to. The format was always the same: I state exactly what I just learned, then specify what I want to see and why. From my actual roots-of-unity prompt:

> Include a button/control that animates each root point moving (e.g. spiraling or rotating) to converge at $z=1$, illustrating $z^n=1$ for each root. While it animates, display each point's current angle $\theta$ and the value $n\theta$ updating in real time, so I can watch $n\theta$ approach a multiple of $2\pi$ as the point reaches $z=1$, this ties the visual convergence directly back to the "match angles mod $2\pi$" derivation (the step I found hardest today).

Visualizations were usually commissioned around whichever part of a topic I found hardest, or around math I found fascinating enough that I wanted to watch it move.

## Why it was efficient

- **State lives in files, not in my head.** Progress was tracked in a project.md file, with session logs marking exactly where I left off. Every session resumed in seconds, with zero re-explaining.
- **The feedback loop is structural.** At the end of every session, what worked and what didn't got recorded. That changes the profile, and the profile changes the next lesson's plan.
- **Everything produced along the way became this site.** Lessons were written up after being taught.

## The site itself

Eleventy static site, KaTeX for the math, dark theme matched to the visualizations' palette, deployed on GitHub Pages. The animated background on the homepage is live domain coloring.
