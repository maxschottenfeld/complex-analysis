---
layout: base.njk
hue: 292
title: "Lesson 8 — Conformal Mapping & Möbius Transformations"
description: "Start by computing what 1/z does to a line, discover it becomes a circle, and follow that one observation all the way to the Riemann Mapping Theorem — where every simply connected region turns out to be the unit disk in disguise."
---

# Lesson 8: Conformal Mapping & Möbius Transformations

Every lesson so far has asked what a complex function *computes*. This one asks what it *does* — where it sends points, what shapes it turns into what other shapes. The answer starts with a single unremarkable-looking function, $1/z$, and ends with a theorem saying that almost every region in the plane is secretly the unit disk.

## What $1/z$ actually does

Before any definitions, compute. Take $T(z)=1/z$.

**On the unit circle.** $T(1)=1$, $T(i)=-i$, $T(-1)=-1$, $T(-i)=i$, and generally $T(e^{i\theta})=e^{-i\theta}$, straight from Euler's identity. The unit circle maps to *itself*, with each point $e^{i\theta}$ landing at $e^{-i\theta}$ — its mirror image across the real axis.

It's worth being precise about what that does and doesn't mean. It is **not** true that $T(z)=-z$ in general — check $T(1)=1$, not $-1$. What gets negated is the *angle*, not the value. There is a clean reason the image looks like a reflection here specifically: for any $z\ne0$,

$$\frac1z=\frac{\bar z}{z\bar z}=\frac{\bar z}{|z|^2}$$

and on the unit circle $|z|=1$, so this collapses to $1/z=\bar z$ exactly. Away from $|z|=1$ that fails — it's a coincidence of sitting on the unit circle, not a general property of inversion.

**Does the backwards traversal break conformality?** No, and the reason matters. $T'(z)=-1/z^2$, so $T'(1)=-1$: a rotation by $\arg(-1)=\pi$ with scale factor $1$. A rotation preserves both the size *and* the sense of angles between curves, so $T$ is conformal at $z=1$, full stop. The apparent backwards sweep is a global fact about that one curve mapping onto itself, not a local orientation flip. A genuinely orientation-reversing map would be $z\mapsto\bar z$, which isn't even holomorphic — it fails the Cauchy–Riemann equations, so no complex derivative exists. Meanwhile $T(z)=1/z$ is holomorphic with $T'(z)\ne0$ everywhere on its domain, hence a rotation-plus-scaling at every point, never a reflection.

**On the line $\text{Re}(z)=1$.** Computing $T(1+yi)=\frac1{1+yi}$ for $y=-1,0,1,2$ gives $0.5+0.5i$, $1$, $0.5-0.5i$, $0.2-0.4i$ — all four sitting at distance exactly $0.5$ from the point $0.5$ on the real axis. **The line becomes a circle**, and one passing through the origin.

That single computation is the whole lesson in miniature. A **Möbius transformation** is a map

$$T(z)=\frac{az+b}{cz+d},\qquad a,b,c,d\in\mathbb{C},\quad ad-bc\ne0$$

(the determinant condition rules out the degenerate case where $T$ collapses to a constant). Inversion $1/z$ is the case $a=0$, $b=1$, $c=1$, $d=0$.

> **Key takeaway:** $1/z$ sends the unit circle to itself by conjugating angles, and sends the line $\text{Re}(z)=1$ to a circle through the origin. It is conformal everywhere on its domain — $T'(z)=-1/z^2$ is never zero.

## Why circles and lines always map to circles and lines

A little vocabulary first, since the argument leans on it. A **map** is just another word for function, used when the emphasis is geometric — where does each point go — rather than computational. A **linear map** is $z\mapsto\lambda z$: a uniform rotation-and-scaling by the constant $\lambda$, exactly Lesson 2's picture of complex multiplication. (Take $\lambda=2i$: scale by $2$, rotate by $90°$.) An **affine map** is $z\mapsto\lambda z+\mu$ — a linear map followed by a rigid translation. By contrast $z\mapsto z^2$ is *not* affine: it acts differently depending on where $z$ sits, whereas an affine map performs the identical rigid transformation everywhere. That distinction is precisely why affine maps preserve circles and lines for free, and why $z^2$ and $1/z$ don't get to claim it automatically.

**The decomposition.** For $c\ne0$, polynomial division gives

$$T(z)=\frac{az+b}{cz+d}=\frac ac+\frac{bc-ad}{c}\cdot\frac1{cz+d}$$

So every Möbius transformation is built from three pieces in sequence: an **affine** map $z\mapsto cz+d$, then **inversion** $w\mapsto1/w$, then another **affine** map (scale by $\frac{bc-ad}{c}$, translate by $\frac ac$). Since affine maps can't bend a line into a curve, the entire question collapses to a single case: **does inversion preserve circles and lines?**

**The general proof.** Every circle or line in the plane is

$$A(x^2+y^2)+Bx+Cy+D=0$$

with $A\ne0$ giving a circle and $A=0$ giving a line. Substitute $x=\frac{z+\bar z}2$, $y=\frac{z-\bar z}{2i}$, and $x^2+y^2=z\bar z$. Simplifying $\frac{C}{2i}=-\frac{iC}2$ (multiply through by $\frac{-i}{-i}$), the equation becomes

$$Az\bar z+Ez+\bar E\bar z+D=0,\qquad E:=\frac{B-iC}{2}$$

Now substitute $w=1/z$, so $z=1/w$ — and since conjugation and reciprocation commute, $\overline{1/w}=1/\bar w$, giving $\bar z=1/\bar w$ as well. Clearing denominators by multiplying through by $w\bar w$:

$$Dw\bar w+\bar Ew+E\bar w+A=0$$

**The same shape as the original, with $A$ and $D$ swapped** (and $E\to\bar E$). So inversion sends every circle-or-line to a circle-or-line, and combined with the decomposition above: **every Möbius transformation sends circles and lines to circles and lines.** $\blacksquare$

**Reading the swap geometrically.** The algebra is clean, but translating it back into "which shapes become which" is the step worth slowing down on. For the line $\text{Re}(z)=1$ we have $A=0$, $B=1$, $C=0$, $D=-1$. Here $A=0$ says *it's a line*, and $D\ne0$ says *it misses the origin*. After the swap, the new leading coefficient is the old $D=-1\ne0$ — a genuine circle — and the new constant term is the old $A=0$, meaning the new circle **passes through the origin**. Which is exactly what the direct computation found: center $0.5$, radius $0.5$, threaded through $0$.

So in general: **any line missing the origin becomes, under inversion, a circle through the origin.** Not a quirk of one example — precisely what the $A\leftrightarrow D$ swap asserts every time.

Two more cases make the pattern concrete. The line $\text{Re}(z)=2$ also misses the origin, so it too becomes a circle through the origin, just at a different offset. The line $y=x$ *passes through* the origin, so $A=0$ and $D=0$ both hold; after the swap both stay zero, and the image is still a line through the origin. Worth one extra step of care, though — parametrizing $y=x$ as $z=t(1+i)$ gives $\frac1z=\frac{1-i}{2t}$, which traces $y=-x$. The *type* is preserved exactly as predicted, but the specific line is the mirror image, not the original.

Drag the source curve below and watch its image redraw under $w=1/z$. The one interaction worth doing deliberately: drag a line until it crosses the origin, and watch its image snap from a circle back to a line at the instant $D$ hits zero. The coefficient equation sits below the panels, where $A$ and $D$ visibly trade places as the shape changes type.

<div class="viz-embed-wide-wrap"><iframe class="viz-embed" src="/assets/visualizations/08-circles-and-lines-inversion.html?embed" title="Circles and lines under inversion: the A↔D swap"></iframe></div>

> **Key takeaway:** write any circle-or-line as $Az\bar z+Ez+\bar E\bar z+D=0$; inversion swaps $A\leftrightarrow D$ and conjugates $E$. Since Möbius maps decompose into affine–inversion–affine, they all send circles and lines to circles and lines. Reading the swap: $A=0$ means line, $D=0$ means through the origin — so a line missing the origin becomes a circle through it.

## Möbius maps are conformal everywhere

Lesson 2 established that a holomorphic map is conformal wherever $f'(z_0)\ne0$. Differentiating by the quotient rule:

$$T'(z)=\frac{a(cz+d)-c(az+b)}{(cz+d)^2}=\frac{ad-bc}{(cz+d)^2}$$

The nondegeneracy condition now does double duty. We already needed $ad-bc\ne0$ to keep $T$ from collapsing to a constant — and that same condition guarantees the numerator of $T'$ is never zero. The denominator $(cz+d)^2$ vanishes only at $z=-d/c$, which is already excluded from $T$'s domain as its pole.

So $T'(z)\ne0$ **everywhere $T$ is defined**. Möbius maps are conformal across their entire domain, with no exceptional points to hunt for — unlike a generic holomorphic function such as $z^2$, whose conformality fails at the isolated point where its derivative vanishes.

> **Key takeaway:** $T'(z)=\dfrac{ad-bc}{(cz+d)^2}$. The single condition $ad-bc\ne0$ makes $T$ both non-constant and conformal everywhere at once.

## Group structure, and three points determining a map

### Möbius transformations form a group

**Closure**, concretely: with $T_1(z)=\frac1z$ and $T_2(z)=\frac{z+1}{z-1}$,

$$(T_2\circ T_1)(z)=T_2\\!\left(\tfrac1z\right)=\frac{1+z}{1-z}$$

— Möbius again. In general, composing two linear-over-linear fractions and clearing denominators always produces another one. (This is $2\times2$ matrix multiplication in disguise, which is a genuinely useful way to think about it, though nothing below depends on it.)

**Identity:** $T(z)=z$, the case $a=1,b=0,c=0,d=1$.

**Inverse:** solve $w=\frac{az+b}{cz+d}$ for $z$. From $w(cz+d)=az+b$ we get $z(wc-a)=b-wd$, so

$$z=\frac{-dw+b}{wc-a}$$

Also Möbius — and its determinant is $(-d)(-a)-bc=ad-bc$, the same nonzero quantity as the original, so nondegeneracy transfers for free.

**Associativity** is free, since function composition always associates. All four axioms hold: **the Möbius transformations form a group under composition.**

### Three distinct points determine the map

**Why three and not four.** Scaling all four coefficients, $(a,b,c,d)\to(\lambda a,\lambda b,\lambda c,\lambda d)$ for any $\lambda\ne0$, leaves $T$ completely unchanged — the $\lambda$ cancels between numerator and denominator. So the four letters encode only *three* independent parameters, which is exactly how many point-conditions we should expect to be able to impose.

**The tool.** For distinct $z_1,z_2,z_3$, define

$$T(z)=\frac{(z-z_1)(z_2-z_3)}{(z-z_3)(z_2-z_1)}$$

Then $T(z_1)=0$, since $(z-z_1)$ kills the numerator, and $T(z_3)=\infty$, since $(z-z_3)$ kills the denominator. The third value is the one worth checking carefully rather than guessing: at $z=z_2$ the numerator and denominator turn out to contain the *same* product $(z_2-z_1)(z_2-z_3)$, so $T(z_2)=1$ — not $0$.

**Existence.** To send arbitrary $z_1,z_2,z_3$ to arbitrary $w_1,w_2,w_3$: build $T$ sending the $z_i\to0,1,\infty$ and build $S$ sending the $w_i\to0,1,\infty$ the same way. Then $S^{-1}\circ T$ does the job, using the group structure just established. Concretely, with $z_1,z_2,z_3=0,1,2$ and $w_1,w_2,w_3=1,0,-1$:

$$T(z)=\frac{-z}{z-2},\qquad S(w)=\frac{1-w}{1+w},\qquad (S^{-1}\circ T)(z)=1-z$$

($S$ happens to be self-inverse here.) Verified at all three points, including $z_3=2\mapsto1-2=-1=w_3$.

**Uniqueness, by counting fixed points.** Suppose $T_1$ and $T_2$ both send $z_1,z_2,z_3$ to $w_1,w_2,w_3$. Then $T_2^{-1}\circ T_1$ *fixes* all three $z_i$. That restatement is the crux of the argument and worth stating separately from what preceded it: "$T_1$ and $T_2$ agree at $z_i$" and "$T_2^{-1}\circ T_1$ fixes $z_i$" are two different sentences, and only the second one lets us count.

Now count. Setting $T(z)=z$ for a general Möbius map and clearing denominators gives

$$cz^2+(d-a)z-b=0$$

a quadratic with at most $2$ roots — unless $c=0$, in which case it's linear with at most $1$ root, unless *every* coefficient vanishes, which forces $T=\text{id}$. So a non-identity Möbius map has **at most two fixed points**. Three distinct fixed points therefore force $T_2^{-1}\circ T_1=\text{id}$, i.e. $T_1=T_2$.

**Theorem.** Given distinct $z_1,z_2,z_3$ and distinct $w_1,w_2,w_3$, there is a *unique* Möbius map with $T(z_i)=w_i$.

> **Key takeaway:** Möbius maps form a group under composition. The canonical map $T(z)=\frac{(z-z_1)(z_2-z_3)}{(z-z_3)(z_2-z_1)}$ sends $z_1,z_2,z_3\to0,1,\infty$; composing two of these sends any three points to any other three. Uniqueness follows because a non-identity Möbius map has at most two fixed points.

## The Riemann Mapping Theorem

A region is **simply connected** if it is connected and has no holes — every loop inside it can be shrunk continuously to a point without leaving the region.

**Theorem.** For any nonempty, simply connected, *proper* subset $\Omega\subsetneq\mathbb{C}$, there is a biholomorphic map $f:\Omega\to\mathbb{D}$ onto the open unit disk. Fixing a basepoint $z_0\in\Omega$ and requiring $f(z_0)=0$ and $f'(z_0)>0$ makes $f$ unique.

This is a genuinely startling statement. $\Omega$ can be jagged, elongated, slit, or otherwise nothing like a disk, and a conformal map still identifies it with $\mathbb{D}$ — because a conformal map only sees angles and local structure, never global shape. Every tool built up over the previous seven lessons (Cauchy's formula, power series, the identity theorem) transfers between $\Omega$ and $\mathbb{D}$ along $f$. In that precise sense the two regions are **conformally indistinguishable**: no holomorphic invariant can tell them apart.

The visualization below shows this directly. Both presets are genuine closed-form conformal maps of the disk — the deformed region really is $\mathbb{D}$, not an approximation of one — and the probe's two arms stay exactly perpendicular in both panels throughout the morph, since the map's derivative is a rotation-and-scaling.

<iframe class="viz-embed" src="/assets/visualizations/08-riemann-mapping-morph.html?embed" title="Conformal indistinguishability: morphing regions onto the unit disk"></iframe>

**Why $\mathbb{C}$ itself is excluded.** A tempting first guess is that an unbounded domain simply can't map onto a bounded target. The half-plane example below refutes that immediately — $\mathbb{H}$ is unbounded, and it works fine. The real obstruction is narrower and more interesting.

Suppose $f:\mathbb{C}\to\mathbb{D}$ were a biholomorphism. Its domain being *all* of $\mathbb{C}$ makes $f$ **entire** by definition, and its range being confined to $\mathbb{D}$ makes it **bounded** — regardless of how large the domain is. Entire plus bounded forces $f$ constant, by Liouville's theorem (proved back in Lesson 5), and a constant map cannot be a bijection. Contradiction.

A map defined only on a proper subset such as $\mathbb{H}$ is never entire in the first place, so Liouville's hypothesis never triggers. The dividing line is **"$\Omega=\mathbb{C}$ or not,"** not "bounded or not" — which is why $\Omega\subsetneq\mathbb{C}$ is a real hypothesis of the theorem rather than a technicality. Switching the visualization to its $\Omega=\mathbb{C}$ preset shows the failure directly: the grid escapes the disk no matter how hard the attempted map compresses it.

**For nice domains, the map can be Möbius.** Everything in this lesson converges here. The map

$$f(z)=\frac{z-i}{z+i}$$

sends the upper half-plane $\mathbb{H}$ onto $\mathbb{D}$, and it is nothing more exotic than a Möbius transformation. Check it: $f(i)=0$, so the interior point $i$ lands at the disk's center; and $f(0)=-1$, so the boundary point $0$ — the real axis being $\partial\mathbb{H}$ — lands on $\partial\mathbb{D}$. Those are consistent rather than contradictory, since neither point lies inside its respective open set.

**One honest caveat.** The general proof of the Riemann Mapping Theorem is **non-constructive**. It establishes existence and uniqueness through normal families and Montel's theorem, and hands back no formula whatsoever. The maps in this lesson — the Möbius map above, and the two families in the visualization — are known closed-form conformal maps chosen precisely so that what's shown is a real Riemann map rather than a plausible-looking interpolation. For a general region $\Omega$, the theorem promises the map exists without telling you how to write it down.

> **Key takeaway:** every nonempty, simply connected $\Omega\subsetneq\mathbb{C}$ is biholomorphic to $\mathbb{D}$, uniquely once normalized by $f(z_0)=0$, $f'(z_0)>0$. $\mathbb{C}$ is excluded because a biholomorphism $\mathbb{C}\to\mathbb{D}$ would be entire *and* bounded, hence constant by Liouville — the obstruction is being all of $\mathbb{C}$, not being unbounded. For $\mathbb{H}$ the map is Möbius: $\frac{z-i}{z+i}$. The general theorem is non-constructive.
