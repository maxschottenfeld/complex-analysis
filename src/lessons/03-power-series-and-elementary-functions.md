---
layout: base.njk
hue: 215
title: "Lesson 3 — Power Series & Elementary Functions"
description: "Power series take over: the exponential defined by its series, Euler's formula derived instead of assumed, and the logarithm turning multivalued — the first branch cut."
---

# Lesson 3: Power Series & Elementary Functions

$e^{i\pi}=-1$ is a familiar fact, usually justified via the polar-multiplication picture from Lesson 1 — rotate by $\pi$, land on $-1$. This lesson gets there a different way: from the power series definition of $e^z$ itself, which turns out to be the more fundamental route.

## Convergence

The complex exponential is defined the same way as its real counterpart, as a power series:
$$e^z = \sum_{n=0}^\infty \frac{z^n}{n!}$$
Applying the ratio test, the ratio of consecutive terms $\to 0$ as $n\to\infty$ for *any* $z$, so the radius of convergence is $R=\infty$ — $e^z$ is **entire** (holomorphic on all of $\mathbb{C}$). Contrast with $\sum n!\\,z^n$, whose ratio $\to\infty$: radius of convergence $R=0$, converging only at $z=0$.

## Euler's formula, derived rather than assumed

Substitute $z=iy$ into the series and write out the first several terms of $e^{iy}$. Separating them by whether $i$'s power is even or odd — using $i^2=-1$, $i^3=-i$, $i^4=1,\dots$ — the even-indexed terms reassemble into $\cos y$'s Taylor series, and the odd-indexed terms (each carrying one factor of $i$) reassemble into $i\sin y$'s. That is,
$$e^{iy} = \cos y + i\sin y.$$
Euler's formula isn't a separate assumed identity — it's a *consequence* of the power series definition of $e^z$, which is exactly what resolves the gap the polar-multiplication picture leaves open.

## Cauchy-Riemann check for $e^z$

Writing $e^z=e^{x+iy}=e^x\cos y + ie^x\sin y$, so $u=e^x\cos y$, $v=e^x\sin y$:
$$u_x = e^x\cos y = v_y, \qquad u_y=-e^x\sin y=-v_x$$
Cauchy-Riemann holds everywhere, confirming directly that $e^z$ is entire (consistent with the $R=\infty$ result above, now via Lesson 2's machinery).

> **Key takeaways:** $e^z = \sum_{n=0}^\infty \frac{z^n}{n!}$, radius of convergence $R=\infty$ (entire). Euler's formula, derived from the series: $e^{iy}=\cos y + i \sin y$; $e^{i\pi}=-1$.

## Complex trig functions

Once $e^z$ is defined, $\cos z$ and $\sin z$ follow by inverting Euler's formula:
$$\cos z = \frac{e^{iz}+e^{-iz}}{2}, \qquad \sin z = \frac{e^{iz}-e^{-iz}}{2i}$$
These are genuinely different from their real counterparts in one striking way: they're **unbounded**. Take $z=i$:
$$\cos(i) = \frac{e^{i\cdot i}+e^{-i\cdot i}}{2} = \frac{e^{-1}+e^{1}}{2} \approx 1.543$$
$\cos(i)>1$ — impossible for real cosine, perfectly fine for the complex version, since the usual $[-1,1]$ bound was a fact about restricting to the real line, not a fact about the function itself.

> **Key takeaway:** $\cos z = \frac{e^{iz}+e^{-iz}}{2}$, $\sin z = \frac{e^{iz}-e^{-iz}}{2i}$ — unbounded on $\mathbb{C}$, e.g. $\cos(i)=\frac{e^{-1}+e}{2}>1$.

## The complex logarithm and branch cuts

Defining $\log z$ means solving $e^w=z$ for $w$. Writing $z=re^{i\theta}$ and using the same "match in polar form" reasoning as the roots-of-unity derivation in Lesson 1: $e^w=z$ needs $w=\ln r + i\theta$, but since $\theta$ is only defined mod $2\pi$, so is $w$ — there are infinitely many valid values of $w$, differing by $2\pi ik$:
$$\log z = \ln|z| + i(\theta+2\pi k), \qquad k\in\mathbb{Z}$$
$\log z$ is genuinely **multivalued**. Picking the principal argument gives the **principal branch**,
$$\operatorname{Log} z = \ln|z| + i\\,\operatorname{Arg}(z), \qquad \operatorname{Arg}(z)\in(-\pi,\pi].$$

This forces a discontinuity. As $z$ crosses the negative real axis, $\operatorname{Arg}(z)$ jumps from just under $\pi$ to just above $-\pi$ — a jump of nearly $2\pi$ in an otherwise continuous function. The ray where this happens (the negative real axis, for the principal branch) is called a **branch cut**: removing it from the domain is exactly what makes $\operatorname{Log}$ single-valued and continuous everywhere else.

<iframe class="viz-embed" src="/assets/visualizations/03-complex-log-branch-cut.html" title="Complex logarithm and branch cut visualization"></iframe>

The visualization above is worth spending real time with: watch what happens walking a small loop around the origin — every full loop shifts $\operatorname{Arg}(z)$ by a full $2\pi$, which is the multivaluedness of $\log z$ made visible, and the branch cut is precisely the ray where that walk gets interrupted to force a single, consistent choice.

> **Key takeaways:** $\log z$: if $e^w=z$, $w=\ln|z|+i(\theta+2\pi k)$, $k\in\mathbb{Z}$ — multivalued. Principal branch: $\operatorname{Log}z=\ln|z|+i\operatorname{Arg}(z)$, $\operatorname{Arg}(z)\in(-\pi,\pi]$. Branch cut: the ray (negative real axis, for the principal branch) where $\operatorname{Arg}(z)$ — and hence $\operatorname{Log}z$ — is discontinuous.
