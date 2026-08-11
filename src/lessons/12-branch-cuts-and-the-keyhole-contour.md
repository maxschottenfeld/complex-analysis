---
layout: base.njk
hue: 122
title: "Lesson 12 — Branch Cuts & the Keyhole Contour"
description: "Lesson 7's semicircular contour rested on three quiet assumptions. This lesson breaks the second one — single-valuedness — and builds the branch cut and the keyhole contour from the ground up, ending by finally proving the reflection formula that Lesson 9 had to leave open."
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

a real integral that real-variable calculus alone does not reach.

> **Key takeaway:** the keyhole contour puts the cut where the integral lives, and the branch jump (the very thing that broke single-valuedness) becomes the factor $\left(1-e^{2\pi ia}\right)$ that makes the two segments add instead of cancel.

## The reflection formula

Lesson 9 built the Gamma function's meromorphic continuation and located every pole, then stopped short of one result: the reflection formula $\Gamma(s)\Gamma(1-s)=\pi/\sin(\pi s)$, whose standard proof needs exactly the machinery above. Notice that $\frac{\pi}{\sin\pi a}$, the answer just computed, is already the right-hand side of it. What remains is a bridge from that integral to a product of two Gammas.

**The Beta function supplies the bridge.** Define

$$B(p,q)=\int_0^1t^{p-1}(1-t)^{q-1}\\,dt$$

Substituting $t=\frac{x}{1+x}$, so that $1-t=\frac1{1+x}$ and $dt=\frac{dx}{(1+x)^2}$, and collecting the powers of $x$ and of $(1+x)$ separately before combining them:

$$B(p,1-p)=\int_0^\infty\frac{x^{p-1}}{1+x}\\,dx=\frac{\pi}{\sin(\pi p)}$$

which is the keyhole integral with $a=p$.

**Relating Beta to Gamma.** Write $\Gamma(p)\Gamma(q)$ as a double integral over the first quadrant and change variables to $s=u+v$ and $t=\frac{u}{u+v}$, whose Jacobian is $s$. The $s$-dependence and $t$-dependence separate cleanly, leaving

$$\Gamma(p)\Gamma(q)=\Gamma(p+q)\cdot B(p,q) \\;\Longrightarrow\\; B(p,q)=\frac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)}$$

**Assembly.** Set $q=1-p$, so $\Gamma(p+q)=\Gamma(1)=1$, and the two expressions for $B(p,1-p)$ meet:

$$\Gamma(p)\Gamma(1-p)=\frac{\pi}{\sin(\pi p)}, \qquad 0<p<1$$

**Extending past the strip.** The identity theorem carries this to all $s\in\mathbb{C}\setminus\mathbb{Z}$, and it is worth being precise about what the theorem is and is not doing. It is not needed for the equality on the strip: nothing in the derivation above ever used the fact that $p$ is real, so the strip-equality stands on its own. The theorem's only job is the extension *past* the strip: both sides are holomorphic off the integers and agree on a set with an accumulation point, so they agree everywhere they are both defined.

$$\boxed{\Gamma(s)\Gamma(1-s)=\frac{\pi}{\sin(\pi s)}}$$

**Sanity check.** At $s=\tfrac12$ the formula gives $\Gamma(1/2)^2=\pi/\sin(\pi/2)=\pi$, so $\Gamma(1/2)=\sqrt\pi$, matching the value Lesson 9 obtained by an entirely independent route, squaring a Gaussian integral and converting to polar coordinates. Two unrelated derivations landing on the same number is the cheapest real check available, and it passes.

> **Key takeaway:** the keyhole integral *is* the reflection formula's right-hand side; the Beta function bridges it to $\Gamma(p)\Gamma(1-p)$, and the identity theorem extends the result off the strip. This completes the one result Lesson 9 had to leave open.
