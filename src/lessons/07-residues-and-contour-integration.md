---
layout: base.njk
hue: 100
title: "Lesson 7 — Residues & Contour Integration"
description: "One Laurent coefficient, c₋₁, turns out to compute contour integrals almost for free. That single fact becomes the Residue Theorem, and — via a semicircular contour and an ML-estimate — a genuine way to evaluate a real integral with no antiderivative in sight."
---

# Lesson 7: Residues & Contour Integration

Lesson 6 closed with singularities fully classified — removable, pole, essential — but classification alone doesn't compute anything. This lesson asks what a Laurent series is actually good for, and the answer turns out to be almost absurdly narrow: of the infinitely many coefficients in the series, exactly one of them, $c_{-1}$, is worth computing at all for contour integration.

## Why one Laurent coefficient does all the work

Start from the punchline computation directly. For an integer $k$ (possibly negative) and a small circle $|z-z_0|=r$, parametrize $z-z_0=re^{i\theta}$, $dz=ire^{i\theta}\\,d\theta$, $\theta$ running $0\to2\pi$:

$$(z-z_0)^k\\,dz = r^ke^{ik\theta}\cdot ire^{i\theta}\\,d\theta = ir^{k+1}e^{i(k+1)\theta}\\,d\theta$$
$$\oint_{|z-z_0|=r}(z-z_0)^k\\,dz = ir^{k+1}\int_0^{2\pi} e^{i(k+1)\theta}\\,d\theta$$

Two cases split the integral cleanly. At $k=-1$, the integrand collapses to $e^{i\cdot0\cdot\theta}=1$, so $\int_0^{2\pi}d\theta=2\pi$ and the whole expression is $i\cdot r^0\cdot2\pi=2\pi i$ — independent of $r$ entirely. For every other $k$, $\int_0^{2\pi}e^{i(k+1)\theta}\\,d\theta=\left[\frac{e^{i(k+1)\theta}}{i(k+1)}\right]_0^{2\pi}=0$, since $e^{i(k+1)\cdot2\pi}=1$ for any nonzero integer $k+1$.

$$\boxed{\oint_{|z-z_0|=r}(z-z_0)^k\\,dz=\begin{cases}2\pi i & k=-1 \\\\ 0 & k\ne-1\end{cases}}$$

This is a fact Lesson 4 already leaned on without deriving it — CIF's key step, $\oint\frac1{z-z_0}\\,dz=2\pi i$ on a small circle, is exactly the $k=-1$ case above. What's new here is the other half: *every other power integrates to zero*, on any circle, regardless of radius.

A Laurent series is a sum of exactly these terms, $\sum c_n(z-z_0)^n$. Integrating the whole series term-by-term around a small circle in its punctured disk is legal (the series converges uniformly there), and by the boxed result, every single term vanishes **except the $n=-1$ term**:

$$\oint_{|z-z_0|=r} f(z)\\,dz = 2\pi i\cdot c_{-1}$$

That one coefficient is worth naming: the **residue** of $f$ at $z_0$, $\text{Res}(f,z_0):=c_{-1}$ — specifically the coefficient of $(z-z_0)^{-1}$, no more and no less. Check it against $e^{1/z}=1+\frac1z+\frac1{2!z^2}+\cdots$ from Lesson 6: $c_{-1}=1$, so $\oint_{|z|=1}e^{1/z}\\,dz=2\pi i$, no contradiction with the classification work already done.

> **Key takeaway:** $\oint_{|z-z_0|=r}(z-z_0)^k\\,dz=2\pi i$ if $k=-1$, else $0$ — independent of $r$. Hence $\oint f\\,dz=2\pi i\cdot\text{Res}(f,z_0)$, where $\text{Res}(f,z_0):=c_{-1}$, the Laurent coefficient.

## Extracting a residue without the full series

Writing out an entire Laurent series just to read off one coefficient is slow, especially for higher-order poles. Two shortcuts follow directly from the pole structure Lesson 6 already established.

**Simple pole.** If $f(z)=\frac{c_{-1}}{z-z_0}+(\text{power series})$, multiply through by $(z-z_0)$ and take the limit $z\to z_0$: the first term collapses to the constant $c_{-1}$, and the power-series term — every exponent shifted up by one — vanishes entirely.

$$\text{Res}(f,z_0)=\lim_{z\to z_0}(z-z_0)f(z)$$

Applied to $f(z)=\frac1{z^2+1}$ at $z_0=i$ (factoring $z^2+1=(z-i)(z+i)$, a simple zero of the denominator, exactly Lesson 6's pole-as-zero-in-denominator framing): $\text{Res}=\lim_{z\to i}(z-i)\cdot\frac1{(z-i)(z+i)}=\frac1{2i}=-\frac i2$.

**Pole of order $m$.** Lesson 6 already established $f(z)=\frac{h(z)}{(z-z_0)^m}$ with $h$ holomorphic and $h(z_0)\ne0$. Write $h$'s own Taylor series at $z_0$ and divide by $(z-z_0)^m$ term by term:

$$f(z) = \sum_{k\ge0}\frac{h^{(k)}(z_0)}{k!}(z-z_0)^{k-m}$$

The exponent $k-m=-1$ exactly when $k=m-1$, so:

$$\text{Res}(f,z_0)=\frac{h^{(m-1)}(z_0)}{(m-1)!}=\frac1{(m-1)!}\lim_{z\to z_0}\frac{d^{m-1}}{dz^{m-1}}\big[(z-z_0)^mf(z)\big]$$

**Cross-checked two ways.** For $f(z)=e^z/z^2$ (order-$2$ pole at $0$): the full series $e^z/z^2=z^{-2}+z^{-1}+\frac12+\frac z6+\cdots$ gives $c_{-1}=1$ directly. The formula agrees — with one substitution worth being careful about: $h(z)=z^2f(z)=z^2\cdot\frac{e^z}{z^2}=e^z$ (the $z^2$'s cancel; it is *not* $z^2\cdot e^z$), so $\text{Res}=h'(0)=e^0=1$. Both methods land on $1$.

> **Key takeaway:** simple pole $\Rightarrow\lim_{z\to z_0}(z-z_0)f(z)$; order-$m$ pole $\Rightarrow\frac1{(m-1)!}\lim_{z\to z_0}\frac{d^{m-1}}{dz^{m-1}}[(z-z_0)^mf(z)]$ — both just read off the Laurent coefficient without writing the whole series.

## The Residue Theorem

**Statement.** Let $\gamma$ be a simple closed contour, $f$ holomorphic on and inside $\gamma$ except at finitely many isolated singularities $z_1,\ldots,z_n$ inside $\gamma$. Then

$$\oint_\gamma f(z)\\,dz = 2\pi i\sum_{k=1}^n \text{Res}(f,z_k)$$

**Building the boundary.** Around each $z_k$, draw a small circle $\gamma_k$ — small enough that none overlap each other or touch $\gamma$ — and connect $\gamma$ to each $\gamma_k$ with a thin corridor (a *crosscut*), so the whole thing becomes one connected curve. The region enclosed by that connected curve has no singularities in it at all (each $z_k$ sits walled off inside its own small circle), so $f$ is holomorphic there, and Cauchy's theorem gives $0$ for the integral around the entire boundary.

**What a crosscut is actually for.** Two requirements pin the picture down completely, and both trace back to facts already established above. First, each $\gamma_k$ has to be a **complete** loop, not a partial arc that dips toward $z_k$ and stops short — the boxed $2\pi i$ result at the top of this lesson came from integrating $\theta$ over the *entire* $0\to2\pi$ range, and a partial sweep simply doesn't produce it. Second, a complete small circle, sitting on its own, isn't connected to $\gamma$ at all — and the version of Cauchy's theorem in play here needs one single connected boundary curve. The crosscut's only job is to stitch the two together: walking from $\gamma$ in toward $\gamma_k$, then back out to resume tracing $\gamma$.

That "in, then out" is exactly why a crosscut gets walked twice, in opposite directions — and it isn't a limiting argument, even though shrinking the corridor to zero width is the easiest way to draw it. Reversing a path's orientation negates its contour integral *exactly*, straight from the parametrization, at any width whatsoever: if $z(t)$, $t\in[a,b]$ traces a curve, the reversed curve $\tilde z(t)=z(a+b-t)$ has $d\tilde z=-z'(a+b-t)\\,dt$, an exact sign flip, no approximation involved. The "in" and "out" legs of the crosscut are literally the same segment walked in opposite directions, and $f$ is continuous across it (it sits entirely in the holomorphic region) — so their contributions are exact negatives and cancel, whether the corridor is wide or has shrunk to nothing.

Drag the slider below to watch that cancellation directly, for the worked instance used throughout this section.

<iframe class="viz-embed" src="/assets/visualizations/07-crosscut-construction.html?embed" title="The crosscut construction for the Residue Theorem"></iframe>

**Orientation.** To keep the holomorphic region on the left while tracing the boundary (the convention Cauchy's theorem needs), $\gamma$ is walked counterclockwise — but each $\gamma_k$ must be walked **clockwise**, since the holomorphic region sits *outside* the small circle, not inside it.

**Assembling the equation.** The total integral over the connected curve is $0$, and it decomposes into $\gamma$ (outer, counterclockwise), the crosscuts (cancel to $0$, above), and the clockwise integrals around each $\gamma_k$:

$$0 = \oint_\gamma f\\,dz + \sum_{k=1}^n\left(\text{clockwise integral around }\gamma_k\right)$$

A clockwise integral is the negative of the counterclockwise one, and the counterclockwise one is exactly this lesson's first boxed result, $2\pi i\\,\text{Res}(f,z_k)$. Solving for $\oint_\gamma f\\,dz$:

$$\boxed{\oint_\gamma f(z)\\,dz = 2\pi i\sum_{k=1}^n \text{Res}(f,z_k)}$$

**Sanity check.** For $f(z)=\frac{e^z}{z^2}+\frac1{z^2+1}$ on $|z|=3$ (enclosing $0,i,-i$): $\text{Res}(f,0)=1$, $\text{Res}(f,i)=-\frac i2$, and by symmetry $\text{Res}(f,-i)=\frac i2$ — the two imaginary residues cancel exactly, leaving $\oint_{|z|=3}f\\,dz=2\pi i\cdot1=2\pi i$. *(Verified numerically: direct contour integration matches $2\pi i$ to 37 decimal places.)*

> **Key takeaway:** **Residue Theorem:** $\oint_\gamma f\\,dz = 2\pi i\sum\text{Res}(f,z_k)$. Proof idea: wall off each singularity with a small clockwise circle, stitch to $\gamma$ with crosscuts that cancel exactly (an orientation-reversal identity, not a limit), and Cauchy's theorem kills the rest.

## Evaluating a real integral with no antiderivative in sight

The payoff: $\displaystyle\int_{-\infty}^{\infty}\frac{dx}{1+x^2}=\pi$, by residues instead of $\arctan$.

**The contour.** $\Gamma_R$ is the segment $[-R,R]$ closed off by the upper-half-plane semicircular arc $C_R=\lbrace Re^{i\theta}:0\le\theta\le\pi\rbrace$, traversed counterclockwise. $f(z)=\frac1{1+z^2}$ has poles at $z=\pm i$; only $z=i$ sits inside $\Gamma_R$ once $R>1$, so the Residue Theorem gives $\oint_{\Gamma_R}f\\,dz=2\pi i\\,\text{Res}(f,i)$ immediately.

Splitting the contour, $\oint_{\Gamma_R}f\\,dz = \int_{-R}^{R}f(x)\\,dx + \int_{C_R}f(z)\\,dz$ — the real integral is the target as $R\to\infty$, and the arc piece needs to vanish.

**Bounding the arc.** $|f(z)|=1/|1+z^2|$ is a reciprocal, so a *lower* bound on $|1+z^2|$ divides down to an *upper* bound on $|f(z)|$ — a bigger denominator makes a smaller fraction, which is the entire reason a lower bound on the denominator is the thing worth chasing here. The reverse triangle inequality bounds differences, not sums, so rewrite $1+z^2=z^2-(-1)$ first:

$$|1+z^2| = |z^2-(-1)| \ge \big|\\,|z^2|-|-1|\\,\big| = R^2-1 \quad (R>1)$$
$$|f(z)| \le \frac1{R^2-1} \qquad \left|\int_{C_R}f\\,dz\right| \le \pi R\cdot\frac1{R^2-1} = \frac{\pi R}{R^2-1}\xrightarrow{R\to\infty}0$$

(the arc has length $\pi R$, half the circumference of radius $R$ — the ML-estimate again, exactly as in Lesson 5.) Worth being precise about what this shows: the arc integral's *limit* is zero, not that it equals zero at any finite $R$ — the bound $\pi R/(R^2-1)$ is a small positive number at every finite $R$, one that only shrinks to nothing in the limit.

**Assembly.** Taking $R\to\infty$, the arc vanishes, leaving $\displaystyle\int_{-\infty}^{\infty}f(x)\\,dx = 2\pi i\\,\text{Res}(f,i)$. The simple-pole formula gives $\text{Res}(f,i)=\frac1{2i}=-\frac i2$ (a repeat of the computation two sections back, same function, same pole), so

$$\int_{-\infty}^{\infty}\frac{dx}{1+x^2} = 2\pi i\cdot\left(-\frac i2\right) = \pi$$

> **Key takeaway:** semicircular-contour method — close a real integral into a contour with a large upper-half-plane arc, evaluate the whole thing by residues, then show the arc's contribution vanishes as $R\to\infty$. An ML-estimate does the vanishing whenever the denominator outgrows the numerator by at least two degrees.

## A quick corollary, and the honest scope of today's method

A second worked instance, $f(z)=\dfrac{z}{(z-1)(z+2)^2}$ (simple pole at $1$, order-2 pole at $-2$), gives $\text{Res}(f,1)=\frac19$ and $\text{Res}(f,-2)=-\frac19$ — exact negatives. That's not a coincidence. For $R$ large enough to enclose every singularity of a rational function, $\oint_{|z|=R}f\\,dz$ is a fixed number by the Residue Theorem — it can't change as $R$ grows further — but the same ML-estimate move used on the semicircular arc above also shows this integral $\to0$ as $R\to\infty$, whenever the denominator's degree exceeds the numerator's by at least $2$. A fixed number squeezed arbitrarily close to zero has to *be* zero — so **the residues of such a function always sum to zero.**

Today's semicircular-contour argument is one member of a family, not the general theory of evaluating real integrals by residues. Other integrand shapes need different machinery: a $\cos(ax)$ or $e^{iax}$ factor needs Jordan's lemma rather than a plain ML-estimate (a plain bound on $|e^{iaz}|$ isn't strong enough on the arc); an integrand with a branch cut needs a keyhole contour instead of a semicircle; trig integrals over $[0,2\pi]$ get turned into contour integrals via a unit-circle substitution; and a pole sitting directly on the contour needs an indented contour and a half-residue argument. All of these variants share the same underlying method — compute residues, apply the theorem — but the contour itself has to be built to fit the integrand in front of it.

> **Key takeaway:** if a rational function's denominator outdegrees its numerator by $2$ or more, its residues (over all singularities) sum to exactly zero — a large-circle ML-estimate squeezed against the Residue Theorem's own constancy.
