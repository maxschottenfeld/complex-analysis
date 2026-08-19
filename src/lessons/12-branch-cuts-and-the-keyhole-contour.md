---
layout: base.njk
hue: 122
title: "Lesson 12 — Branch Cuts & the Keyhole Contour"
description: "Lesson 7's semicircular contour rested on three quiet assumptions. This lesson breaks the second one — single-valuedness — and builds the branch cut and the keyhole contour from the ground up — the contour that supplies the one integral Lesson 9's reflection formula imports from outside."
---

# Lesson 12: Branch Cuts & the Keyhole Contour

Lesson 7 evaluated $\int_{-\infty}^\infty\frac{dx}{1+x^2}$ with a semicircular contour, and it worked. It worked because of three assumptions that were never stated out loud:

1. The integrand decayed fast enough that a plain ML-estimate killed the arc.
2. The integrand was single-valued.
3. No singularity sat *on* the contour.

Each of those can fail independently, and each failure has its own repair. Slow decay is handled by Jordan's lemma; a pole sitting on the path is handled by an indented contour. This lesson takes the middle one, **multivaluedness**, because that is the case standing between Lesson 9 and its reflection formula.

The diagnostic worth internalizing first: the question is never "where are the poles." Poles exist in every residue problem. The actual checks are whether a non-integer power or a logarithm has made the integrand multivalued, whether the decay is fast enough when you bound $|f|$ directly on a large arc rather than inferring it from pole locations, and whether any pole's location is a real number and therefore sits on the path you wanted to use.

## What a branch cut actually is

Take the smallest instance that shows the problem: $\sqrt z$ on the unit circle, $z=e^{i\theta}$, so $\sqrt z=e^{i\theta/2}$.

| $\theta$ | $0$ | $\pi/2$ | $\pi$ | $3\pi/2$ | $2\pi$ |
| --- | --- | --- | --- | --- | --- |
| $z$ | $1$ | $i$ | $-1$ | $-i$ | $1$ |
| $\sqrt z$ | $1$ | $\frac{\sqrt2}2(1+i)$ | $i$ | $\frac{\sqrt2}2(-1+i)$ | $-1$ |

Start at $z=1$, walk one full loop, arrive back at $z=1$ — and $\sqrt z$ has gone from $1$ to $-1$. The input returned; the output did not.

The conflict is a three-way one, and something has to give. You cannot simultaneously have a function that is (i) single-valued, (ii) continuous, and (iii) defined on a loop enclosing the origin. **The piece that gives is (iii).** Erect a barrier, the **branch cut**, running from $0$ out to $\infty$, which no path is permitted to cross. Then no path can ever complete a loop around the origin, and the contradiction never arises. Note what did *not* change: the function is the same function. Only the domain of allowed paths shrank.

Three things a branch cut is not, each easy to assume and each wrong:

**The cut is not a set of singularities.** $\sqrt z$ is perfectly well-behaved at every point on the cut ray, and everywhere else off it. The only genuine singularity is the **branch point** at $z=0$. The cut is a chosen no-crossing barrier, not a locus of trouble.

**The cut is a choice, not a property of the function.** The principal convention cuts along the negative reals, $-\pi<\theta<\pi$. This lesson cuts along the positive reals instead, $0<\theta<2\pi$. At $z=e^{-3i\pi/4}$ the principal convention gives $\sqrt z=e^{-3i\pi/8}$ while this one gives $e^{5i\pi/8}$: reached by adding a full turn, $-\frac{3\pi}4+2\pi=\frac{5\pi}4$, not by reflecting. Those two values differ by exactly $-1$. At $z=e^{3i\pi/4}$, whose angle already sits inside both ranges, the conventions agree exactly.

**The jump across the cut is the mechanism, not a defect.** Crossing from one side of the cut to the other multiplies the value by a specific factor. The next section extracts precisely that factor as the answer to a real integral.

> **Key takeaway:** a branch cut restricts the domain so that no path can loop the branch point, which is what makes a single-valued continuous choice possible. The cut is chosen, the branch point is not.

## The keyhole contour

**Target:** $\displaystyle\int_0^\infty\frac{x^{a-1}}{1+x}\\,dx=\frac{\pi}{\sin(\pi a)}$ for $0<a<1$. Everything below is checked concurrently at $a=\frac12$, where the answer should come out to $\pi$.

The contour has four pieces: an outer circle of radius $R$, an inner circle of radius $\varepsilon$, and two straight segments hugging the positive real axis, one from above and one from below. The cut is placed along the positive reals — deliberately directly on top of where the integral lives.

**The contrast with Lesson 7 is the key move.** The crosscut construction in the Residue Theorem's proof has the *same geometry*: an outer curve, an inner curve, and two connecting segments traversed in opposite directions. There, the two segments cancelled. They cancelled for two reasons, not one: they were the same path reversed, *and* the integrand took the same value on both of them. Here the first reason still holds and the second does not, because of the branch jump. The cancellation in Lesson 7 was earned by single-valuedness, and this integrand does not have it.

**The jump, computed.** Write $z^{a-1}=|z|^{a-1}e^{i(a-1)\theta}$. On the top segment, $\theta\to0^+$, giving $z^{a-1}=x^{a-1}$. On the bottom segment, $\theta\to2\pi^-$, giving $z^{a-1}=x^{a-1}e^{2\pi i(a-1)}=x^{a-1}e^{2\pi ia}$. At $a=\frac12$ and $x=4$ that reads $\frac12$ on top and $-\frac12$ on the bottom, a ratio of $-1=e^{i\pi}$.

Reversing the bottom segment into a forward integral and combining the two:

$$\left(1-e^{2\pi ia}\right)\int_0^\infty\frac{x^{a-1}}{1+x}\\,dx$$

At $a=\frac12$ the prefactor is $1-(-1)=2$. The two sides **add**. They do not cancel.

**Both circles vanish, for different reasons.** The two halves of the condition $0<a<1$ turn out to be doing one job each:

- Outer circle, $R\to\infty$: the bound goes like $R^{a-1}\to0$, which needs $a<1$. A power vanishes as its base grows only if the exponent is negative.
- Inner circle, $\varepsilon\to0$: the bound goes like $\varepsilon^{a}\to0$, which needs $a>0$. A power vanishes as its base shrinks only if the exponent is positive; a negative exponent on a shrinking number blows up instead.

**The residue**, at the single enclosed pole $z=-1$. There is a trap here worth naming: within the range $\theta\in(0,2\pi)$, the point $-1$ must be written $e^{i\pi}$. Writing it $e^{-i\pi}$ corresponds to $\theta=-\pi$, which is outside the chosen range and therefore a different branch.

$$\mathrm{Res}=(-1)^{a-1}=\left(e^{i\pi}\right)^{a-1}=e^{i\pi(a-1)}=e^{i\pi a}e^{-i\pi}=-e^{i\pi a}$$

At $a=\frac12$ this gives $-e^{i\pi/2}=-i$.

**Assembly.**

$$\left(1-e^{2\pi ia}\right)I=2\pi i\left(-e^{i\pi a}\right) \\;\Longrightarrow\\; I=\frac{-2\pi ie^{i\pi a}}{1-e^{2\pi ia}}=\frac{-2\pi i}{e^{-i\pi a}-e^{i\pi a}}=\frac{-2\pi i}{-2i\sin(\pi a)}=\frac{\pi}{\sin(\pi a)}$$

Checking against the running instance: at $a=\frac12$, the right side of the residue equation is $2\pi i(-i)=2\pi$, and dividing by the prefactor $2$ gives $I=\pi$; independently, $\pi/\sin(\pi/2)=\pi$. Both routes agree, so

$$\int_0^\infty\frac{x^{-1/2}}{1+x}\\,dx=\pi$$

For general $a\in(0,1)$ this is a family of real integrals that real-variable calculus alone does not reach. The $a=\frac12$ instance shown here is an exception rather than the evidence: $x=u^2$ turns it into $2\int_0^\infty\frac{du}{1+u^2}$, which is elementary. The keyhole earns its keep on the rest of the family, which is what the reflection formula needs.

> **Key takeaway:** the keyhole contour puts the cut where the integral lives, and the branch jump (the very thing that broke single-valuedness) becomes the factor $\left(1-e^{2\pi ia}\right)$ that makes the two segments add instead of cancel.

## The reflection formula

The answer just computed, $\frac{\pi}{\sin\pi a}$, is already the right-hand side of the Gamma function's reflection formula, $\Gamma(s)\Gamma(1-s)=\frac{\pi}{\sin(\pi s)}$. That is not a coincidence, and it is the reason this contour was worth building.

The bridge from this integral to a product of two Gammas runs through the Beta function, and [Lesson 9](/lessons/09-gamma-function/) walks it in full: the substitution $t=\frac{x}{1+x}$ turns $B(p,1-p)$ into exactly the keyhole integral above, the Beta–Gamma relation converts that into $\Gamma(p)\Gamma(1-p)$, and the identity theorem carries the result off the strip $0<p<1$ to all of $\mathbb{C}\setminus\mathbb{Z}$.

The one ingredient Lesson 9 could not produce for itself is the keyhole integral. That is this lesson.

> **Key takeaway:** the keyhole integral *is* the right-hand side of the reflection formula. Lesson 9 builds the Beta bridge between the two; the keyhole contour is what makes the far end of that bridge computable.
