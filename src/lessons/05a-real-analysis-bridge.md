---
layout: base.njk
hue: 145
title: "Lesson 5a — The Real-Analysis Bridge"
---

# Lesson 5a: The Real-Analysis Bridge

Somewhere in the middle of Lesson 5, the proofs quietly changed character. Up through Lesson 4, most arguments were *computational*: expand this, parametrize that, watch the terms cancel. Lesson 5's arguments were *estimates*: bound the integrand, let the radius grow, squeeze the derivative to zero. Following an estimate argument and constructing one yourself turn out to be two different skills — and I could feel the difference.

The structure of this project — session logs, spaced review, a running record of which kinds of arguments land quickly and which take longer (see [How I built this](/how-i-built-this/)) — made that pattern visible instead of letting it slide by: bounding-style proofs were taking me measurably longer to internalize than computational ones. Not because any step was mysterious, but because the machinery underneath them had entered my hands piecemeal, exactly when each theorem happened to need it. And next on the syllabus was Taylor and Laurent series, where estimates stop being an occasional trick and become the whole game. So rather than push forward, the better move was to pause and lay the foundation properly: no new complex analysis, just the real analysis everything after this point stands on, ending exactly at Lesson 6's doorstep.

**Where I was starting from, for calibration:** multivariable and vector calculus (through Stokes' theorem) plus proof experience from discrete math — enough to carry me through five lessons. But if you're following a similar path, this is the material I'd want in hand *before* the series-heavy half of the subject begins.

## Bounds, suprema, and infima

A number $b$ is an **upper bound** of a set $A$ if $a\le b$ for every $a\in A$. The definitional trap is the word "the" — a bounded set never has just one upper bound, it has an entire ray of them. For $A=\left\lbrace 1-\frac1n\right\rbrace = \lbrace 0, \tfrac12, \tfrac23, \dots\rbrace$, every number in $[1,\infty)$ is an upper bound; the **supremum** $\sup A$ is the *least* of them: $\sup A=1$. Note $1\notin A$ — the sup needn't belong to the set — while $\inf A=0$ (greatest lower bound) is attained at $n=1$.

The working characterization: $s=\sup A$ iff $s$ is an upper bound **and** for every $\varepsilon>0$ some $a\in A$ has $a>s-\varepsilon$ — nothing smaller than $s$ still works.

(Practice: $B=\left\lbrace (-1)^n\left(1+\frac1n\right)\right\rbrace$ splits into two interleaved strands with limits $\pm1$, but sup and inf care about extremes, not limits: $\sup B=\tfrac32$, $\inf B=-2$, both attained.)

Underneath it all sits the **completeness axiom**: every nonempty subset of $\mathbb{R}$ bounded above has a supremum *in* $\mathbb{R}$. This separates $\mathbb{R}$ from $\mathbb{Q}$ — the rationals below $\sqrt2$ have no rational least upper bound — and it is, quietly, the reason limits exist at all.

> **Key takeaway:** $\sup A$ = least upper bound, $\inf A$ = greatest lower bound; neither needs to belong to $A$. **Completeness:** every nonempty set of reals bounded above has a supremum in $\mathbb{R}$.

## What a limit actually is: $\varepsilon$–$N$

Every "$R\to\infty$" and "$\varepsilon\to0$" move in earlier lessons was leaning on a definition I'd never written down:

$$a_n\to L \quad\text{means}\quad \forall\varepsilon>0\ \exists N\ \forall n>N:\ |a_n-L|<\varepsilon.$$

$\varepsilon$ is a challenge ("get within this tolerance"); $N$ is the response — one fixed cutoff, depending on $\varepsilon$, past which every term complies. The index $n$ walks; the post $N$ stands still.

**Worked:** $\frac1n\to0$: given $\varepsilon$, $N=\frac1\varepsilon$ works. This is exactly the shape of the Liouville argument — $|f'(z_0)|\le M/R$ with $R$ growing is $\frac1n\to0$ wearing a costume. Similarly $\frac{n}{n+1}\to1$: simplify the error to a single fraction first, $\left|\frac{n}{n+1}-1\right|=\frac{1}{n+1}$, giving $N=\frac1\varepsilon-1$.

**Why the definition is shaped this way.** Test "gets closer and closer" against $a_n=(-1)^n$: challenge with $\varepsilon=\tfrac12$ and no cutoff $N$ ever works for the candidate limit $1$ — past any $N$ there are still terms at distance $2$. Same for $-1$, or any candidate. The definition correctly refuses to let an oscillating sequence converge, and the load-bearing phrase is "**for every** $\varepsilon$."

**A harder one, with a technique worth keeping:** $\sqrt{n+1}-\sqrt n\to0$. Multiply by the conjugate to get $\frac{1}{\sqrt{n+1}+\sqrt n}$, then *loosen*: $\sqrt{n+1}+\sqrt n>2\sqrt n$, so the term is under $\frac{1}{2\sqrt n}$, giving $N=\frac{1}{4\varepsilon^2}$. Loosening a bound to something solvable is the single most reused move in this lesson — a bound doesn't need to be tight to do its job.

The continuous version swaps $\delta$ into $N$'s role: $f$ is **continuous at $c$** iff $\forall\varepsilon>0\ \exists\delta>0:|x-c|<\delta\Rightarrow|f(x)-f(c)|<\varepsilon$. (For $f(x)=3x$ at $c=2$: $\delta=\varepsilon/3$.)

And the fact tying this section to the last: **a bounded monotone sequence converges** — increasing and bounded above means it converges to the supremum of its terms. Completeness manufactures the limit; this is the engine that makes series converge below.

> **Key takeaway:** $a_n\to L$ iff $\forall\varepsilon>0\ \exists N\ \forall n>N: |a_n-L|<\varepsilon$ — "for every $\varepsilon$" rules out oscillation. Bounded monotone sequences converge: completeness is what makes limits exist.

## The triangle inequality, three ways

The two-term version dates to Lesson 1: $|z+w|\le|z|+|w|$.

**Chained.** No new idea, just grouping: $|z_1+z_2+z_3|\le|z_1+z_2|+|z_3|\le|z_1|+|z_2|+|z_3|$, applying the two-term case twice; induction gives $\left|\sum z_k\right|\le\sum|z_k|$. (Check, values arbitrary: $z_1=1+i,z_2=-2,z_3=3i$: $\sqrt{17}\approx4.12\le\sqrt2+2+3\approx6.41$ — room to spare, as usual.)

**Reversed.** How *small* can $|z-w|$ be? Feed $z=(z-w)+w$ into the triangle inequality: $|z|-|w|\le|z-w|$; swap roles for $|w|-|z|\le|z-w|$; then $-A\le X\le A\iff|X|\le A$ welds the two into
$$\big||z|-|w|\big|\le|z-w|.$$
($z=3+4i$, $w=1$: $4\le\sqrt{20}\approx4.47$.)

> **Key takeaway:** $\left|\sum z_k\right|\le\sum|z_k|$; $\big||z|-|w|\big|\le|z-w|$ — the reverse form is the tool for bounding things *below*.

## The ML-estimate, derived

Lesson 5 used the ML-estimate as a black box: $\left|\int_\gamma h(z)\\,dz\right|\le M\cdot L$. Time to open the box — the proof is the triangle inequality plus one recognition. Through the parametrization $\gamma:[a,b]\to\mathbb{C}$:
$$\left|\int_\gamma h(z)\\,dz\right| = \left|\int_a^b h(\gamma(t))\\,\gamma'(t)\\,dt\right| \le \int_a^b \big|h(\gamma(t))\big|\\,\big|\gamma'(t)\big|\\,dt$$
(the triangle inequality for integrals — an integral is a limit of sums). Now bound $|h(\gamma(t))|\le M$ and pull it out; what's left, $\int_a^b|\gamma'(t)|\\,dt$, is speed integrated over time — the **arc length** $L$, exactly as in vector calculus. Hence $\left|\int_\gamma h\\,dz\right|\le M\cdot L$. $\blacksquare$

**Worked:** $\oint_{|z|=1}z^2\\,dz$: $M=1$, $L=2\pi$, bound $2\pi$ (true value: $0$ — a bound's job is to hold, not to be close).

**Practice, with a subtlety:** $\oint_{|z|=2}z^{-2}\\,dz$: on $|z|=2$, $M=\frac14$, $L=4\pi$, bound $\pi$. But $z^{-2}$ blows up at $z=0$, *inside* the contour — does that poison the estimate? No: ML only looks at values **on the curve itself**. What singularities inside do to the integral's *actual value* is the business of residues, Lesson 7's topic.

> **Key takeaway:** $\left|\int_\gamma h\\,dz\right|\le M\cdot L$ — triangle inequality for integrals, bound by $M$, recognize arc length. It only needs the bound on the curve, nowhere else.

## Geometric series, comparison, and Lesson 6's doorstep

Multiply $S_n=1+r+\dots+r^n$ by $r$ and subtract to get $S_n=\frac{1-r^{n+1}}{1-r}$. For $|r|<1$, the term $r^{n+1}\to0$ — an $\varepsilon$–$N$ fact now, not hand-waving — and watching *only* that term vanish leaves
$$\sum_{k=0}^\infty r^k = \frac{1}{1-r}, \qquad |r|<1.$$
(Check: $r=\tfrac12$ gives $2$.)

**Comparison.** If $0\le c_k\le d_k$ and $\sum d_k$ converges, then $\sum c_k$ converges: its partial sums are increasing and bounded above by $\sum d_k$ — and bounded monotone sequences converge. Completeness again, doing the actual work. The picture: $d_k$ is an *envelope*; the $c_k$ can wobble underneath it, and the envelope's convergence drags theirs along.

**Now aim it at a power series.** If $|a_k|\le2$ and $|z|\le\tfrac12$, then $|a_kz^k|\le2(\tfrac12)^k$ — a convergent geometric envelope (sum $4$) — so $\sum a_kz^k$ converges absolutely. (Practice: $|a_k|\le3$, $|z|\le\tfrac13$: envelope sums to $3\cdot\tfrac32=\tfrac92$. Converges.)

That argument — *bound the coefficients, compare against a geometric envelope* — is, almost verbatim, how Lesson 6 proves every holomorphic function is locally a power series. There the coefficient bound won't be handed to us; it will come from Cauchy's estimates, which is exactly why this lesson and Lesson 5 had to come first.

> **Key takeaway:** $\sum_{k=0}^\infty r^k=\frac{1}{1-r}$ for $|r|<1$. **Comparison:** $0\le c_k\le d_k$ with $\sum d_k$ convergent $\Rightarrow\sum c_k$ convergent. Geometric envelopes + Cauchy's estimates = Taylor series, next lesson.
