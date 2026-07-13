---
layout: base.njk
hue: 320
proofstepper: true
scrolly: true
title: "Lesson 5 — Consequences of Cauchy's Formula"
description: "One formula cascades into infinite differentiability, Cauchy's estimates, Liouville's theorem, and a proof of the Fundamental Theorem of Algebra with no algebra in it."
---

# Lesson 5: Consequences of Cauchy's Formula

Lesson 4 ended with the Cauchy Integral Formula: boundary values determine interior values, completely. This lesson is where that single fact cascades into a sequence of results that would each be hard-won in real analysis and here fall out almost for free — culminating in a proof of the Fundamental Theorem of Algebra that has nothing to do with algebra at all.

## Cauchy's differentiation formulas

CIF holds for *every* point $z_0$ inside a contour $\gamma$, so it can be differentiated with respect to $z_0$ under the integral sign, one derivative at a time. This might look suspicious — real calculus teaches derivatives and integrals as things that *cancel* via the Fundamental Theorem of Calculus. But FTC concerns differentiating with respect to a *moving bound of integration*; here the contour $\gamma$ is fixed, and $z_0$ is a parameter sitting inside the integrand, never touching the path. Differentiating under a fixed integral sign is a different, separate result (Leibniz's rule) — a swap of two limiting processes, legitimate here because $f$ is holomorphic.

Differentiating $f(z_0)=\frac{1}{2\pi i}\oint_\gamma \frac{f(z)}{z-z_0}\\,dz$ once:
$$\frac{d}{dz_0}(z-z_0)^{-1} = (z-z_0)^{-2}$$
via $u=z-z_0$, $du/dz_0=-1$, and the two negative signs canceling. Differentiating again gives a $(z-z_0)^{-3}$ term, and the pattern that emerges by extrapolation is easy to get slightly wrong in two specific ways: the constant out front is not the *newest* factor alone but the **running product** $1\times2\times3=\dots=n!$, compounding multiplicatively across derivatives; and the denominator power is $(z-z_0)^{n+1}$, not $(z-z_0)^n$ — checking directly against the worked cases (powers $2,3,4$ for $n=1,2,3$) confirms the $+1$. The general formula:
$$f^{(n)}(z_0) = \frac{n!}{2\pi i}\oint_\gamma \frac{f(z)}{(z-z_0)^{n+1}}\\,dz$$

The headline consequence: **holomorphic (complex-differentiable once) automatically implies infinitely differentiable** — no extra hypotheses needed. This has no real-variable analogue at all: a real function's derivative can exist without its second derivative existing.

> **Key takeaway:** **Cauchy's differentiation formula:** $f^{(n)}(z_0)=\dfrac{n!}{2\pi i}\displaystyle\oint_\gamma \dfrac{f(z)}{(z-z_0)^{n+1}}\\,dz$; holomorphic $\Rightarrow$ infinitely differentiable, automatically.

## Cauchy's estimates

This step needs one more tool first: the **ML-estimate**,
$$\left|\int_\gamma h(z)\\,dz\right| \le M\cdot L,$$
where $M$ bounds $|h|$ on $\gamma$ and $L$ is $\gamma$'s length. It's the integral version of the vector triangle inequality — the magnitude of a sum (or integral) is at most the sum (or integral) of magnitudes. A quick sanity check: $\left|\oint_{|z|=1}z^2\\,dz\right|\le 2\pi$ (with $M=1$, $L=2\pi$), consistent with the true value, $0$, from Lesson 4.

Now apply it to the differentiation formula on a circle $C_R$ of radius $R$ centered at $z_0$, with $|f|\le M$ on $C_R$. On $C_R$, $|z-z_0|=R$ **exactly** (not just a bound), so the integrand satisfies $\left|\frac{f(z)}{(z-z_0)^{n+1}}\right|\le \frac{M}{R^{n+1}}$ — exact in the denominator, a bound in the numerator. Multiplying by the circle's circumference $2\pi R$ and then by $\frac{n!}{2\pi}$:
$$\frac{M}{R^{n+1}}\cdot2\pi R = \frac{2\pi M}{R^n}, \qquad \frac{n!}{2\pi}\cdot\frac{2\pi M}{R^n} = \frac{n!\\,M}{R^n}$$
(Writing the multiplication out as a single fraction before simplifying is worth doing explicitly — it's easy to lose track of a $2\pi/2\pi$ cancellation otherwise.) This gives **Cauchy's estimate**:
$$|f^{(n)}(z_0)| \le \frac{n!\\,M}{R^n}$$
For a bounded entire function with, say, $M=10$: at $R=100$, the bound on $|f'(z_0)|$ is $1/10$; at $R=10{,}000$, it's $1/1000$. The bound keeps shrinking as $R$ grows — exactly the setup Liouville's theorem needs next.

Note the hypothesis carefully: Cauchy's estimate requires $f$ holomorphic on the *entire closed disk* bounded by $C_R$, not merely on the circle itself — inherited directly from CIF, which needs the same thing.

> **Key takeaway:** **ML-estimate:** $\left|\displaystyle\int_\gamma h(z)\\,dz\right| \le M\cdot L$. **Cauchy's estimate:** $|f^{(n)}(z_0)| \le \dfrac{n!\\,M}{R^n}$, where $M$ bounds $|f|$ on the circle $C_R$ of radius $R$ centered at $z_0$.

## Liouville's theorem

Cauchy's estimate does all the work here — the proof is five short moves, and the whole trick is watching *which quantities stay fixed and which are free*. Each quantity keeps its color from step to step below (hover or tap one to trace it through the argument).

{% proofStepper "liouville" %}

**Why does this specifically need $R\to\infty$, and not just any circle?** Test it on $f(z)=z^2$ (entire, unbounded). At $z_0=0$: $M(R)=R^2$, so the bound $R^2/R=R\to0$ as $R\to0$ too — but this is a coincidence, since $f(0)=0$ exactly. At a generic point $z_0=1$: $M(R)=(1+R)^2$ (the farthest point on the circle from the origin), so the bound $(1+R)^2/R\to\infty$ as $R\to0$ — no shrinkage at all. The real distinction: for a *bounded* entire function, $M$ is one fixed number that works for a circle of any size, so growing $R$ is the only lever available, and it works. For an *unbounded* function, $M$ grows right along with $R$, so that lever doesn't exist — small circles never help either way.

The result is genuinely strange when checked against familiar functions: $\sin z$ and $\cos z$ are bounded and non-constant on $\mathbb{R}$, but neither is bounded on all of $\mathbb{C}$ — for instance $|\sin(iy)|=\sinh(y)\to\infty$. Liouville's theorem is exactly why that has to be true: a bounded, non-constant *entire* function simply cannot exist.

> **Key takeaway:** **Liouville's theorem:** a bounded entire function is constant.

## The Fundamental Theorem of Algebra

A proof by contradiction — and the thing to watch is which moves are mere *setup* and which single move is the *payoff*. Steps 1–5 below just take the assumed-rootless polynomial, build $f=1/p$ out of it, and check that function's passport: entire, and bounded. None of them is clever. The flagged final step is the only one that closes a loop — Liouville detonates the contradiction, and the degree $n\ge1$ from step 1 comes back to bite.

{% proofStepper "fta" %}

That's the **Fundamental Theorem of Algebra** — every nonconstant polynomial over $\mathbb{C}$ has at least one root — proved with no algebra at all, only Liouville's theorem.

(Worked example, arbitrary — the technique is the point: $p(z)=z^3+1$ has roots $z=e^{i\pi/3}$, $e^{i\pi}=-1$, $e^{i5\pi/3}$, by the same roots-of-unity work from Lesson 1.)

> **Key takeaway:** **Fundamental Theorem of Algebra:** every nonconstant polynomial over $\mathbb{C}$ has at least one root. Proof: assume not; $1/p$ is entire and bounded; Liouville forces it constant, contradicting the polynomial's degree.

## The whole chain, replayed

Everything above was one continuous argument — CIF $\to$ differentiation formulas $\to$ Cauchy's estimates $\to$ Liouville $\to$ FTA, each link using only the one before it. The recap below replays that chain end to end against live pictures: as you scroll, the pinned figure moves through the four layers, and every one stays interactive the whole way (drag $z_0$, drag the sliders — the animations rerun if you scroll back).

<section class="scrolly scrolly-static" data-scrolly>
  <div class="scrolly-figure">
    <iframe class="viz-embed" src="/assets/visualizations/05-liouville-fta-chain.html?embed" title="From CIF to the Fundamental Theorem of Algebra, scroll-driven"></iframe>
  </div>
  <div class="scrolly-steps">
    <div class="scrolly-step" data-state='{"type":"chain-state","sec":1,"n":0}'>
      <span class="step-tag">1 · start from CIF</span>
      <p>The purple shading is the integrand's magnitude $|f(z)/(z-z_0)^{n+1}|$ for $f(z)=e^z$ — and at $n=0$ that is the CIF integrand itself. The formula only ever <em>reads</em> $f$ on the circle $\gamma$, yet it pins down $f$ at $z_0$. Drag $z_0$; the numerically computed integral tracks the exact value $e^{z_0}$ wherever it goes.</p>
    </div>
    <div class="scrolly-step" data-state='{"type":"chain-state","sec":1,"n":3}'>
      <span class="step-tag">2 · differentiate under the integral</span>
      <p>Step $n$ up to $3$: each derivative pulls one more factor down and adds one power to the denominator — and the integrand's weight clamps ever tighter around $z_0$. Higher derivatives are more <em>local</em> information, and the integrand concentrates to match. Nothing about higher derivatives was ever assumed, so $f^{(n)}(z_0)$ exists for every $n$: <strong>holomorphic $\Rightarrow$ infinitely differentiable.</strong></p>
    </div>
    <div class="scrolly-step" data-state='{"type":"chain-state","sec":2,"R":1.5}'>
      <span class="step-tag">3 · bound it — the estimate's raw parts</span>
      <p>Take the contour to be a circle $C_R$: on it, $|z-z_0| = R$ <em>exactly</em>, which is what makes circles the right contour for estimates. The ticks sample $|f|$ around the circle; the red dot marks the largest sample — that value is $M$. The readouts assemble Cauchy's estimate from its three raw parts: $M$, the length $2\pi R$, and the finished bound $M/R$.</p>
    </div>
    <div class="scrolly-step" data-state='{"type":"chain-state","sec":2,"R":3.05}'>
      <span class="step-tag">4 · what R does — and doesn't do</span>
      <p>Slide $R$ outward and the bound does <em>not</em> shrink here: for $f=e^z$, the max $M(R)=e^R$ grows far faster than $R$. That's the tell. Cauchy's estimate only becomes a weapon when $M$ stays pinned while $R$ grows — which is exactly what <em>bounded</em> is about to buy.</p>
    </div>
    <div class="scrolly-step" data-state='{"type":"chain-state","sec":3,"act":"reset"}'>
      <span class="step-tag">5 · Liouville's two hypotheses</span>
      <p>Now let $f$ be <strong>entire</strong> and <strong>bounded</strong>: $|f| \le M = 10$, one fixed $M$, everywhere. Entire means no singularity ever stops the circle — $C_R$ is legal at every radius. Bounded means that same $M$ works on all of them at once. Both hypotheses are about to do real work: entirety frees $R$, boundedness pins $M$.</p>
    </div>
    <div class="scrolly-step" data-state='{"type":"chain-state","sec":3,"act":"squeeze"}'>
      <span class="step-tag">6 · the squeeze</span>
      <p>Let $R \to \infty$ (running now — the circle creeps toward the edge while the true $R$ runs off to infinity). The gauge is the live bound $M/R$ draining to zero, and $|f'(z_0)|$ is trapped beneath it the whole way down. A fixed nonnegative number smaller than every $M/R$ has no choice: $|f'(z_0)| = 0$.</p>
    </div>
    <div class="scrolly-step" data-state='{"type":"chain-state","sec":3,"act":"sweep"}'>
      <span class="step-tag">7 · z₀ was arbitrary</span>
      <p>Nothing in that squeeze used <em>where</em> $z_0$ sits — so the identical argument runs at every point of the plane (stamping now). $f' \equiv 0$ on all of $\mathbb{C}$, so $f$ is constant: <strong>Liouville's theorem</strong>, the same five moves as the stepper earlier on this page, now drawn instead of written.</p>
    </div>
    <div class="scrolly-step" data-state='{"type":"chain-state","sec":4,"r":1.8}'>
      <span class="step-tag">8 · aim it at a polynomial</span>
      <p>Domain coloring of $p(z)=z^3+1$: hue is $\arg p$, dark is $|p|$ near $0$ — the three dark points are the roots FTA promises. Assume, for contradiction, $p$ has <em>no</em> root: then $f = 1/p$ is entire. The dashed ring is $|z|=r$, and the readout tracks $\max |1/p|$ on it.</p>
    </div>
    <div class="scrolly-step" data-state='{"type":"chain-state","sec":4,"act":"radial"}'>
      <span class="step-tag">9 · the contradiction closes the chain</span>
      <p>Push $r$ outward (running): the leading term dominates, $|p| \to \infty$, so $\max|1/p| \to 0$ — combined with continuity on the inner disk, $f=1/p$ is bounded on all of $\mathbb{C}$. Entire and bounded forces $f$ constant by step 7 — so $p$ is constant, contradicting $n \ge 1$. Every nonconstant polynomial has a root, and the whole chain — CIF $\to$ derivatives $\to$ estimates $\to$ Liouville $\to$ FTA — ran on one formula.</p>
    </div>
  </div>
</section>

(The [standalone version](/visualizations/05-liouville-fta-chain/) keeps the full four-section walkthrough with its proof steps and explore cards, if you want the long-form version back.)

## The maximum modulus principle

Plugging $z=z_0+re^{i\theta}$ into CIF gives the **mean-value property** in one line:
$$f(z_0)=\frac{1}{2\pi}\int_0^{2\pi}f(z_0+re^{i\theta})\\,d\theta$$
— the value at the center of a circle is the *average* of the values on the circle. For that average to also be a strict local maximum, every neighboring value on the circle would already have to equal it — an average can't exceed all the things it's averaging unless they're all equal to it. That reasoning propagates: constant on one circle forces constant everywhere nearby (a preview of the identity theorem), and the conclusion is the **maximum modulus principle**: for nonconstant holomorphic $f$, $|f|$ has no interior local maximum — only on the boundary of a region.

(Practice check: if $|f|\le5$ on the boundary circle $|z|=1$, then $|f|\le5$ everywhere inside too — an immediate consequence.)

## Morera's theorem

The converse of Cauchy's theorem: if $f$ is continuous and $\oint_\gamma f\\,dz=0$ for *every* closed contour $\gamma$ in a domain, then $f$ is holomorphic there. The proof builds the antiderivative directly, $F(z)=\int_{z_0}^z f\\,dw$ (well-defined precisely because the vanishing contour integrals make it path-independent), giving $F'=f$; then Cauchy's differentiation formula from earlier in this lesson — holomorphic implies infinitely differentiable — gives $F''=f'$ exists too. Morera's theorem is best thought of as a proof *technique*: to show a function is holomorphic, it's sometimes easier to show its contour integrals vanish than to check Cauchy-Riemann directly.

> **Key takeaways:** **Maximum modulus principle:** $|f|$ for nonconstant holomorphic $f$ attains its max only on the boundary of a region, never the interior — the mean-value property is the root cause. **Morera's theorem:** continuous $f$ with $\oint_\gamma f\\,dz=0$ for every closed contour $\gamma$ in a domain $\Rightarrow$ $f$ holomorphic there.
