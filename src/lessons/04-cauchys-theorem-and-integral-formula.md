---
layout: base.njk
title: "Lesson 4 — Cauchy's Theorem & the Cauchy Integral Formula"
---

# Lesson 4: Cauchy's Theorem & the Cauchy Integral Formula

This is the lesson everything before it has been building toward. The Cauchy Integral Formula — boundary values of a holomorphic function fully determine its values everywhere inside — is the centerpiece of complex analysis, and the reason the subject feels almost unfairly powerful once it arrives.

## Contour integrals

A **contour** is a map $\gamma:[a,b]\to\mathbb{C}$, and a contour integral is defined exactly the way vector calculus defines a line integral — substitute the parametrization, multiply by $\gamma'(t)$, integrate:
$$\int_\gamma f(z)\,dz := \int_a^b f(\gamma(t))\,\gamma'(t)\,dt$$

Two worked examples on the unit circle, $\gamma(t)=e^{it}$, $t\in[0,2\pi]$:

**$\oint_{|z|=1} z\,dz = 0$.** With $z=e^{it}$, $dz=ie^{it}dt$, the integral is $\int_0^{2\pi} e^{it}\cdot ie^{it}\,dt = i\int_0^{2\pi}e^{2it}\,dt = 0$, since $e^{2it}$ completes exactly one full cycle.

**$\oint_{|z|=1}\dfrac{dz}{z}=2\pi i$.** Same setup: $\int_0^{2\pi}\frac{ie^{it}}{e^{it}}dt = \int_0^{2\pi} i\,dt = 2\pi i$. This one is nonzero because the integrand has a singularity at $z=0$, and that singularity sits *inside* the contour — it doesn't need to touch the contour itself, only to be enclosed by it. That distinction — inside the region a contour bounds, versus on the contour — turns out to matter enormously.

## Deformation invariance and winding number

Two facts, both checkable directly: the radius of the circle in $\oint\frac{dz}{z}$ doesn't matter — any circle centered at the origin gives the same $2\pi i$ — and winding around the singularity twice exactly doubles the integral, to $4\pi i$.

Both are instances of a general principle: contour integrals of a holomorphic function are unchanged by deforming the contour, as long as the deformation never crosses a singularity. Winding number $n$ around a singularity multiplies the integral by $n$.

Why does path *length* not matter here, while *winding* does? The right intuition is the vector calculus analogue: a curl-free vector field has path-independent line integrals. Cauchy's theorem, next, is the direct formalization of that same idea for holomorphic functions.

## Cauchy's theorem, via Green's theorem

**Cauchy's theorem:** if $f$ is holomorphic on a simply connected domain, then $\oint_\gamma f\,dz=0$ for every closed contour $\gamma$ in that domain.

The proof splits $f\,dz=(u+iv)(dx+i\,dy)$ into real and imaginary parts and applies Green's theorem — $\oint_\gamma P\,dx+Q\,dy = \iint_D (Q_x-P_y)\,dA$ — to each. Matching up: the real part has $P=u,\ Q=-v$, and the imaginary part has $P=v,\ Q=u$. Green's theorem turns both boundary integrals into area integrals of
$$-v_x-u_y \qquad\text{and}\qquad u_x-v_y.$$
Substituting the Cauchy-Riemann equations ($u_x=v_y$, $u_y=-v_x$) makes *both* expressions vanish identically:
$$-v_x-u_y = -v_x-(-v_x)=0, \qquad u_x-v_y=v_y-v_y=0.$$
Both area integrals are zero, so the original contour integral is zero. This is worth writing out one algebraic move per line rather than chaining sign changes mentally — the CR substitution here is exactly the kind of multi-step, sign-sensitive algebra where it's easy to drop a minus sign silently.

**Cauchy-Goursat** strengthens this to the same conclusion without assuming $f'$ is continuous (the version above technically needs that extra hypothesis to invoke Green's theorem cleanly) — proved instead via a triangle-subdivision and ML-estimate argument. This is the version used going forward, since assuming continuity of $f'$ upfront risks circularity: continuity of $f'$ is itself a *consequence* of Cauchy's theorem, proven in Lesson 5.

> **Key takeaways:** $\int_\gamma f(z)\,dz := \int_a^b f(\gamma(t))\gamma'(t)\,dt$. $\oint_{|z|=1} z\,dz = 0$; $\oint_{|z|=1}\frac{dz}{z}=2\pi i$. Deformation invariance: contour integrals of holomorphic $f$ are unchanged by deforming the contour, as long as no singularity is crossed; winding number $n$ multiplies the result by $n$. **Cauchy's theorem:** $f$ holomorphic on a simply connected domain $\Rightarrow \oint_\gamma f\,dz=0$ for closed $\gamma$. **Cauchy-Goursat:** the same conclusion without assuming $f'$ continuous — the version used going forward.

## The Cauchy Integral Formula

Fix $z_0$ inside a closed contour $\gamma$, with $f$ holomorphic on and inside $\gamma$, and set $g(z)=\dfrac{f(z)}{z-z_0}$. $g$ is holomorphic everywhere inside $\gamma$ except at $z_0$ itself, so surround $z_0$ with a small circle $C_\varepsilon$ and shrink $\gamma$ down to it: the region between $\gamma$ and $C_\varepsilon$ is singularity-free, so Cauchy-Goursat applies there, giving $\oint_\gamma g\,dz = \oint_{C_\varepsilon} g\,dz$.

<iframe class="viz-embed" src="/assets/visualizations/04-contour-deformation-and-cif.html" title="Contour deformation and Cauchy Integral Formula visualization"></iframe>

On $C_\varepsilon$, parametrize $z=z_0+\varepsilon e^{i\theta}$:
$$\oint_{C_\varepsilon} \frac{f(z)}{z-z_0}\,dz = \int_0^{2\pi} \frac{f(z_0+\varepsilon e^{i\theta})}{\varepsilon e^{i\theta}}\cdot i\varepsilon e^{i\theta}\,d\theta = i\int_0^{2\pi} f(z_0+\varepsilon e^{i\theta})\,d\theta$$
Two separate things happen here, worth keeping distinct: the $\varepsilon e^{i\theta}$ factor cancels *algebraically* — true for any $\varepsilon$, no limit needed yet. Only afterward does the limit $\varepsilon\to0$ come in, using continuity of $f$ to replace $f(z_0+\varepsilon e^{i\theta})$ with $f(z_0)$:
$$\lim_{\varepsilon\to0} i\int_0^{2\pi} f(z_0+\varepsilon e^{i\theta})\,d\theta = i\int_0^{2\pi} f(z_0)\,d\theta = 2\pi i\,f(z_0)$$
Putting it together, $\oint_\gamma g\,dz = 2\pi i f(z_0)$, which rearranges into the **Cauchy Integral Formula**:
$$f(z_0)=\frac{1}{2\pi i}\oint_\gamma\frac{f(z)}{z-z_0}\,dz$$

In words: values of $f$ on the *boundary* $\gamma$ completely determine the value of $f$ at any interior point $z_0$. This direction — boundary determines interior — is the profound one, with no real-variable analogue. (The formula is technically usable in the other direction too — computing an integral from a known function value, as in the practice problem below — but that's a computational shortcut, not the conceptually deep content.)

**Two worked instances.** With $f(z)=z$, $\gamma=\{|z|=1\}$, $z_0=0$: the integrand simplifies to $z/z=1$, and $\oint_\gamma 1\,dz=0$ by Cauchy's theorem — matching $f(0)=0$ directly. With $f(z)\equiv1$: the formula gives $\oint_{|z|=1}\frac{1}{z}\,dz = 2\pi i\cdot f(0) = 2\pi i$ — reconnecting directly to the very first integral computed in this lesson. That wasn't a coincidence; it's CIF applied to the constant function $1$.

**Practice:** $\oint_{|z|=2}\dfrac{e^z}{z-1}\,dz$. Here $f(z)=e^z$, $z_0=1$, which sits inside $|z|=2$; $f(z_0)=e$. The formula gives the *integral*, not just $f(z_0)$ — it's easy to stop one step early and report $e$ as the answer, but the correct value is $\oint = 2\pi i\,f(z_0) = 2\pi i\,e$.

> **Key takeaways:** **Cauchy Integral Formula:** $f(z_0)=\dfrac{1}{2\pi i}\oint_\gamma\dfrac{f(z)}{z-z_0}\,dz$ for $z_0$ inside $\gamma$, $f$ holomorphic on and inside $\gamma$ — boundary values determine interior values entirely. $\oint_{|z|=1}\frac{1}{z}dz=2\pi i$ is CIF applied to $f\equiv1$.

## What the complex derivative actually represents

Near $z_0$, $f(z_0+h)\approx f(z_0)+f'(z_0)h$ — a single fixed complex number, $f'(z_0)$, multiplying *every* direction $h$ near $z_0$, uniformly. And multiplication by a fixed complex number is exactly "scale and rotate" (Lesson 1): $f'(z_0)$ is a uniform rotate-and-scale instruction, applied identically no matter which direction $h$ points.

That uniformity is exactly why angles between curves are preserved — it's the *why* underneath Lesson 2's conformality theorem, not just the Jacobian computation that proved it. Every direction gets rotated and scaled by the same amount, so the angle between any two curves through $z_0$ survives the map intact.
