---
layout: base.njk
hue: 240
title: "Lesson 6 — Power Series Representations & Analytic Continuation"
description: "Every holomorphic function equals its own Taylor series near any point. That single fact forces zeros to be isolated, gives a function at most one analytic continuation, and turns a singularity into something with an exact, measurable location."
---

# Lesson 6: Power Series Representations & Analytic Continuation

Lesson 5a built the real-analysis machinery — bounds, rigorous limits, the ML-estimate — specifically so this lesson could use it for real. Here it gets spent on the biggest structural fact in the subject: every holomorphic function is, locally, its own power series. Not approximated by one, the way a real Taylor series merely tracks a smooth function — *equal* to one, exactly, on an entire disk. Everything else in this lesson — isolated zeros, the identity theorem, analytic continuation, the classification of singularities — falls out of taking that equality seriously.

## The radius of convergence, formalized

Lesson 3 used the ratio test informally to find how far a series converges. Here it gets a real derivation: comparing consecutive terms of $\sum c_n(z-z_0)^n$ against a geometric series tail (exactly Lesson 5a's comparison-test machinery) gives

$$R = \frac{1}{L}, \qquad L = \lim_{n\to\infty}\left|\frac{c_{n+1}}{c_n}\right|$$

with $R=\infty$ if $L=0$ and $R=0$ if $L=\infty$. Checked against $e^z=\sum z^n/n!$: $L=0$, so $R=\infty$ — matches Lesson 3 exactly. Two new examples confirm the pattern: $\sum nz^n$ has $L=1$, so $R=1$; $\sum z^n/n^2$ has $\frac{n^2}{(n+1)^2}\to1$, so $R=1$ as well, even though the two series look quite different termwise.

## Taylor's theorem

Start from the Cauchy Integral Formula and rewrite the kernel $\frac{1}{w-z}$ to expose a geometric series. Setting $r=\frac{z-z_0}{w-z_0}$ (with $z$ interior to a circle $\gamma$ and $w$ on it, so $|r|<1$),

$$\frac{1}{w-z} = \frac{1}{(w-z_0)-(z-z_0)} = \frac{1}{w-z_0}\cdot\frac{1}{1-r} = \frac{1}{w-z_0}\sum_{n=0}^\infty r^n$$

Substituting back into CIF and swapping the sum and integral (legitimate here because the series converges uniformly on $\gamma$ — an imported fact, same tier as Lesson 5's differentiation-under-the-integral-sign) turns $f(z)=\frac{1}{2\pi i}\oint_\gamma\frac{f(w)}{w-z}\\,dw$ into a power series in $(z-z_0)$, whose $n$-th coefficient is exactly the Cauchy differentiation formula's integral from Lesson 5. That gives **Taylor's theorem**:

$$f(z) = \sum_{n=0}^\infty \frac{f^{(n)}(z_0)}{n!}(z-z_0)^n$$

for every $z$ inside any circle centered at $z_0$ on which $f$ is holomorphic. This is a genuinely different statement from the real case — **holomorphic and analytic turn out to be the same property**, with no real-variable analogue at all. A real function can be infinitely differentiable and still fail to equal its own Taylor series (the standard example is $e^{-1/x^2}$); nothing like that can happen for a holomorphic function.

> **Key takeaway:** **Taylor's theorem:** $f(z)=\displaystyle\sum_{n=0}^\infty \frac{f^{(n)}(z_0)}{n!}(z-z_0)^n$ on any disk where $f$ is holomorphic. Holomorphic $\iff$ analytic — an equivalence with no real-variable counterpart.

**A genuine mystery, resolved.** $f(z)=\frac{1}{1+z^2}$ is smooth on all of $\mathbb{R}$ — so why does its familiar real Taylor series $1-x^2+x^4-\cdots$ mysteriously stop converging at $|x|=1$? Nothing about the real graph explains it. The resolution only appears once $f$ is viewed as a complex function: it fails to be holomorphic exactly at $z=\pm i$, both at distance $1$ from the origin — invisible to anything living on the real axis, but fully determinative of where the series can converge. The same distance-to-singularity logic, checked directly (no series expansion needed): the radius of convergence of $\frac{1}{z-3}$ centered at $0$ is $|3-0|=3$; centered at $1+i$, it's $|3-(1+i)|=|2-i|=\sqrt5$.

## Zeros are isolated

Suppose $f$ is holomorphic near $z_0$ and $f(z_0)=0$. Since $f$ equals its Taylor series near $z_0$, and every term but the constant one vanishes at $z=z_0$, $f(z_0)=0$ forces $c_0=0$. Two exhaustive cases follow: either every coefficient is zero — $f\equiv0$ on the whole disk, a dead end — or there's a smallest nonzero coefficient at some index $m$ (the *order* of the zero). Factoring it out:

$$f(z) = (z-z_0)^m\underbrace{\Big[c_m+c_{m+1}(z-z_0)+c_{m+2}(z-z_0)^2+\cdots\Big]}_{=:\\,g(z)} = (z-z_0)^m\\,g(z)$$

with $g$ itself holomorphic near $z_0$ and $g(z_0)=c_m\ne0$. (Worked instance to keep in view: $f(z)=z^2+z^3=z^2(1+z)$, so $z_0=0$, $m=2$, $g(z)=1+z$, $g(0)=1$.)

**Claim:** $g$ is nonzero on some whole disk around $z_0$ — which, combined with $(z-z_0)^m$ vanishing only at $z_0$ itself, means $f$'s zero at $z_0$ is *isolated*: nothing else nearby is a zero.

**Proof.** $g$ is holomorphic at $z_0$, hence continuous there: for every $\varepsilon>0$ there's a $\delta>0$ such that $|z-z_0|<\delta\implies|g(z)-g(z_0)|<\varepsilon$. Choose $\varepsilon=\frac{|g(z_0)|}{2}$ — legal, since $g(z_0)\ne0$ makes this a genuine positive number. (Why half the distance and not the full distance $|g(z_0)|$: for the toy instance, $\varepsilon=|g(0)|=1$ gives a matching $\delta=1$, but $g$'s actual zero at $z=-1$ sits exactly on that disk's boundary — $|g(z)|\to0$ as $z\to-1$ from inside, so there's no genuine floor. Halving the distance instead guarantees one.)

Now the reverse triangle inequality, in the form that bounds $|g(z)|$ *below*:

$$|g(z_0)|-|g(z)| \\;\le\\; |g(z)-g(z_0)| \quad\Longrightarrow\quad |g(z)| \\;\ge\\; |g(z_0)|-|g(z)-g(z_0)|$$

Since $|g(z)-g(z_0)|<\varepsilon=\frac{|g(z_0)|}{2}$,

$$|g(z)| \\;\ge\\; |g(z_0)|-|g(z)-g(z_0)| \\;>\\; |g(z_0)|-\frac{|g(z_0)|}{2} \\;=\\; \frac{|g(z_0)|}{2} \\;>\\;0$$

so $g$ has a hard positive floor of $\frac{|g(z_0)|}{2}$ on the whole disk $|z-z_0|<\delta$ — never zero there. $\blacksquare$

**Isolated Zeros Theorem:** if $f$ is holomorphic near $z_0$, $f(z_0)=0$, and $f\not\equiv0$ near $z_0$, there is a $\delta>0$ with $f(z)\ne0$ for all $z$ satisfying $0<|z-z_0|<\delta$.

Play with the toy instance directly — drag $z$, watch $g(z)$ track through the output plane, and see the $\delta$-disk certify a hard floor under $|g|$:

<iframe class="viz-embed" src="/assets/visualizations/06-isolated-zeros-floor-argument.html?embed" title="Isolated zeros floor argument visualization"></iframe>

> **Key takeaway:** **Order of a zero:** if $f(z_0)=0$ and $f\not\equiv0$ nearby, the smallest $m$ with $c_m\ne0$ gives $f(z)=(z-z_0)^m g(z)$ with $g(z_0)\ne0$. **Isolated zeros:** zeros of a not-identically-zero holomorphic function never accumulate — each one has a punctured neighborhood entirely free of other zeros.

## The identity theorem

If two holomorphic functions agree on a set with an accumulation point — a point every neighborhood of which contains another point of the set — do they agree everywhere? Set $F=f-h$ and ask the same question of $F$'s zeros instead.

Since zeros of $F$ accumulate at some point $p$, there's a sequence $z_n\to p$ (each $z_n\ne p$) with $F(z_n)=0$; $F$ is continuous, so $F(p)=\lim F(z_n)=0$ too. Apply the isolated-zeros dichotomy to $F$ at $p$: either $F\equiv0$ on a whole disk around $p$, or $p$ is an isolated zero. Suppose the second, for contradiction — the Isolated Zeros Theorem then guarantees a punctured disk around $p$ with no other zeros in it. But $p$ being an accumulation point means *every* neighborhood of $p$, including that exact punctured disk, contains another zero. Contradiction — so $F\equiv0$ on a whole disk around $p$, not merely at the point.

**Spreading the zero set to the whole domain.** Since the domain is connected, any two points $p,q$ in it can be joined by a continuous path; cover the path with a chain of overlapping disks small enough that $F$ is holomorphic on each. $F\equiv0$ on the first disk, centered at $p$. Pick the next disk's center $z_1$ inside the first disk — since the whole first disk is zero, $z_1$ is completely surrounded by zeros of $F$, making it an accumulation point of zeros for free. So $z_1$ can't be an isolated zero: the same dichotomy forces $F\equiv0$ on the *entire* second disk. Repeat along the chain to $q$. Since $q$ was arbitrary, $F\equiv0$ on the whole domain — $f\equiv h$.

> **Key takeaway:** **Identity theorem:** if $f,h$ are holomorphic on a connected domain and agree on a set with an accumulation point, $f\equiv h$ on that whole domain (not beyond it — nothing in the argument ever leaves it).

**Uniqueness of analytic continuation.** If a holomorphic extension of $f$ to a larger connected domain exists, it is the *only* one. Suppose $h_1,h_2$ both extend $f$ to a larger connected domain $\Omega'\supseteq\Omega$. Let $H=h_1-h_2$; both agree with $f$ on $\Omega$, so $H\equiv0$ there — and $\Omega$, being open, trivially has an accumulation point (every point of an open set is surrounded entirely by other points of it). The identity theorem then forces $H\equiv0$ on all of $\Omega'$: $h_1\equiv h_2$.

**A non-example, closing the loop.** $\sin(1/z)$ has zeros at $z=\frac{1}{k\pi}$ for every integer $k$, accumulating at $z=0$ itself. That single fact rules out any holomorphic extension of $\sin(1/z)$ to $z=0$ — the identity theorem would force it to be identically zero everywhere, contradicting the function's actual behavior away from $0$.

## Why $R$ equals the distance to the nearest singularity, derived

Lesson 3 stated the radius-of-convergence rule as a fact to be believed. It's worth deriving, using the same shrinking-circle idea from Lesson 4's proof of CIF — recall that CIF needs $f$ holomorphic on and inside $\gamma$ *precisely* because the deformation argument sweeps through that whole interior region.

Toy instance: $f(z)=\frac{1}{z-3}$, expanded around $z_0=0$, with its only singularity at $3$.

**One series, many circles.** For any point $z$ with $|z|<3$, there's an admissible circle certifying convergence there — for $z=2.9$, the circle of radius $2.95$ works (holomorphic on and inside it, since the only singularity is at $3$); for $z=-2.99$, radius $2.999$ works. Crucially, neither coefficient formula — $c_n=f^{(n)}(z_0)/n!$, nor the Cauchy differentiation integral $\frac{1}{2\pi i}\oint_\gamma\frac{f(w)}{(w-z_0)^{n+1}}\\,dw$ — references the circle at all. It's one fixed series regardless of which admissible circle certifies convergence at a given point. Since every $z$ with $|z|<3$ admits *some* admissible circle, the series converges on the entire disk $|z|<3$: $R\ge3$.

**Closing it from the other side.** Suppose instead $R>3$ — then the series, and hence $f$ itself, would have to stay bounded on some disk that reaches past the singularity at $z=3$. But $f$ visibly blows up approaching it: $|f(2.7)|\approx3.3$, $|f(2.97)|\approx33$, $|f(2.997)|\approx333$ — no finite bound exists. Contradiction, so $R\le3$ as well. Together: $R=3$, exactly.

<iframe class="viz-embed" src="/assets/visualizations/06-vary-the-circle-radius-of-convergence.html?embed" title="Vary-the-circle argument for the radius of convergence visualization"></iframe>

**The honest puzzle.** Could $R$ ever *exceed* the distance to the nearest singularity? Not for $\frac{1}{z-3}$ — but consider $g(z)=\frac{\sin z}{z}$ expanded around $z_0=1$: the formula has a singularity at $0$, distance $1$ from the center, yet the series matches $g(-5)$ — distance $6$ — to dozens of digits. The vary-the-circle argument above only ever proves $R\ge$ distance to the nearest genuine singularity; whether it's an equality depends on what kind of singularity is actually there. $z=0$ isn't a real obstruction for $\frac{\sin z}{z}$ at all — which is exactly what the next section explains.

> **Key takeaway:** $R\ge$ distance to the nearest singularity, always (the vary-the-circle argument). $R=$ that distance exactly when the blocking singularity is genuine (a pole or an essential singularity) — a *removable* singularity, as the name suggests, doesn't block $R$ at all.

## Laurent series and the three kinds of singularity

Three functions, each computed directly at $z_0=0$:

- $\dfrac{\sin z}{z} = 1-\dfrac{z^2}{6}+\dfrac{z^4}{120}-\cdots$ — no negative powers at all. The formula divides by zero at $z=0$, but the function doesn't have to: define $f(0):=1$ and it's holomorphic everywhere, $R=\infty$.
- $\dfrac{1}{z^2}$ — already a single term, $z^{-2}$. As $z\to0$, $|f|\to\infty$, and no value at $z=0$ patches that.
- $e^{1/z} = 1+\dfrac{1}{z}+\dfrac{1}{2!\\,z^2}+\dfrac{1}{3!\\,z^3}+\cdots$ — infinitely many negative powers. Approach $0$ along the positive reals and it blows up; along the negative reals it vanishes; along the imaginary axis ($z=ix\to0$) it stays on the unit circle the whole way in. Three directions, three completely different limits.

This is a **Laurent series** — $f(z)=\sum_{n=-\infty}^{\infty}c_n(z-z_0)^n$ on a punctured disk (or more generally an annulus), same coefficient formula as Taylor's, now legal for negative $n$ too. The *principal part* (the negative-power terms) is exactly what classifies the singularity:

<iframe class="viz-embed" src="/assets/visualizations/06-singularity-zoo-domain-coloring.html?embed" title="Domain-coloring singularity zoo visualization"></iframe>

- **Removable** — no negative powers. $f$ extends holomorphically once the missing value is filled in. ($\sin z/z$.)
- **Pole of order $m$** — finitely many negative-power terms, deepest one $(z-z_0)^{-m}$; $|f|\to\infty$ uniformly as $z\to z_0$. ($1/z^2$: order $2$.) This connects directly back to zeros: a zero of order $m$ is $f=(z-z_0)^m g(z)$ with $g(z_0)\ne0$; a pole of order $m$ is $f=\frac{h(z)}{(z-z_0)^m}$ with $h(z_0)\ne0$ — a pole is a zero sitting in the denominator. That's exactly why $\frac{1}{z-3}$'s pole at $3$ (order $1$) is a *genuine* obstruction, forcing $R=3$ exactly rather than merely $R\ge3$.
- **Essential** — infinitely many negative-power terms; wild, direction-dependent behavior near $z_0$. ($e^{1/z}$.) This is what Casorati–Weierstrass is naming: near an essential singularity, a function's values cluster arbitrarily close to *every* complex number.

**Closing two earlier loops.** $\sin(1/z)=\dfrac1z-\dfrac{1}{6z^3}+\dfrac{1}{120z^5}-\cdots$ is essential — which is exactly why its zeros, at $z=\frac{1}{k\pi}$, were free to accumulate at $0$ back in the identity-theorem section: an essential singularity is precisely the kind of local chaos that makes that possible. And $\frac{1}{z-3}$'s pole is exactly the "genuine singularity" the radius-of-convergence section needed — a removable singularity never blows up, so it never blocks $R$ at all.

**A general shortcut**, for a function shaped as (something)/(power of $z-z_0$): compare orders of vanishing. $\dfrac{\cos z-1}{z^2}$ looks like a pole of order $2$ from the denominator alone — but the numerator $\cos z-1$ *also* vanishes to order $2$ at $z=0$, exactly canceling: the singularity is removable, with $f(0)=-\frac12$. Contrast $\dfrac{e^z-1}{z^2}$: the numerator vanishes only to order $1$ ($e^z-1=z+\frac{z^2}{2}+\cdots$), leaving one uncanceled factor of $z^{-1}$ — a pole of order $1$. In general: **pole order = denominator's order of vanishing $-$ numerator's order of vanishing**, when that's positive; removable otherwise.

> **Key takeaway:** **Laurent series:** $f(z)=\sum_{n=-\infty}^\infty c_n(z-z_0)^n$ on an annulus. **Classification** by the principal part: removable (none), pole of order $m$ (finitely many, deepest $-m$), essential (infinitely many). For $f=\text{numerator}/(z-z_0)^k$: pole order $=k-$(numerator's own order of vanishing), when positive; removable otherwise.

---

Lesson 5's chain of results all flowed from one integral formula. This lesson's flows from one equality — holomorphic functions *are* their Taylor series — and that single fact turns out to pin down where a function's zeros can live, how many extensions it can have, and exactly what a singularity is measuring. Next: residues, where the single coefficient $c_{-1}$ of a Laurent series turns out to be worth computing contour integrals for.
