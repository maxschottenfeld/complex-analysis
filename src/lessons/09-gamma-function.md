---
layout: base.njk
hue: 25
title: "Lesson 9 — The Gamma Function"
description: "An explicit, computable extension of the factorial to almost all of the complex plane, built from one integration by parts, one Gaussian integral, and an algebraic chain that reaches every non-integer point in finitely many steps, ending in a reflection formula that ties Γ to sine itself."
---

# Lesson 9: The Gamma Function

Lesson 8 closed on a pure existence result: the Riemann Mapping Theorem guarantees a conformal map from any simply connected region to the disk, with no formula and no construction. Liouville's theorem rules out the one case where a formula could even exist ($\mathbb{C}\to\mathbb{D}$ is impossible, since a bounded entire map would have to be constant). This lesson is the opposite kind of result. The **Gamma function** extends the factorial to the complex plane explicitly, with a real formula and known pole locations at every step along the way.

## Extending the factorial

Define

$$\Gamma(s)=\int_0^\infty t^{s-1}e^{-t}\\,dt, \qquad \mathrm{Re}(s)>0$$

Convergence needs both ends of the integral. Near $t=0$, $t^{s-1}$ stays integrable exactly when $\mathrm{Re}(s)>0$; near $t=\infty$, $e^{-t}$ crushes any polynomial growth regardless of $s$. That single condition, $\mathrm{Re}(s)>0$, is the domain for the rest of this segment.

The first computation is also the smallest: $\Gamma(1)=\int_0^\infty e^{-t}\\,dt=1$. That's a little ambiguous on its own: is $1$ standing in for $0!$ or $1!$? The ambiguity resolves once the indexing convention that makes $\Gamma$ actually *equal* the factorial is in hand.

**The recursion.** Integrate $\Gamma(s+1)=\int_0^\infty t^se^{-t}\\,dt$ by parts, $u=t^s$, $dv=e^{-t}\\,dt$, so $du=st^{s-1}\\,dt$, $v=-e^{-t}$:

$$\Gamma(s+1) = \Big[-t^se^{-t}\Big]_0^\infty + s\int_0^\infty t^{s-1}e^{-t}\\,dt$$

The boundary term needs a moment of care at $t\to0^+$, since $|t^s|=t^{\mathrm{Re}(s)}$ and the sign of $\mathrm{Re}(s)$ decides everything: at $\mathrm{Re}(s)>0$ the term vanishes, which is exactly the domain already in force. Two edge cases are worth naming, both outside today's domain: at $\mathrm{Re}(s)=0$, $t^0\equiv1$ identically, not a shrinking $0^0$, so the boundary term sits at $-1$ rather than vanishing; at $\mathrm{Re}(s)<0$, $t^{\mathrm{Re}(s)}\to\infty$ and the boundary term blows up. With the boundary term gone,

$$\boxed{\Gamma(s+1)=s\\,\Gamma(s)}$$

Chaining forward from $\Gamma(1)=1$: $\Gamma(2)=1$, $\Gamma(3)=2$, $\Gamma(4)=6$, $\Gamma(5)=24$, and in general $\Gamma(n+1)=n!$ for every non-negative integer $n$. The factorial's recursive definition and $\Gamma$'s integral definition turn out to satisfy the identical recursion, shifted by one index.

> **Key takeaway:** $\Gamma(s)=\int_0^\infty t^{s-1}e^{-t}\\,dt$ on $\mathrm{Re}(s)>0$; integration by parts gives $\Gamma(s+1)=s\\,\Gamma(s)$; chaining from $\Gamma(1)=1$ gives $\Gamma(n+1)=n!$.

## $\Gamma(1/2)=\sqrt\pi$: the Gaussian trick

The recursion alone only ever shifts a known value by whole integers: it can't produce anything off that lattice. Getting $\Gamma(1/2)$ needs a genuinely different move. Substitute $t=u^2$, $dt=2u\\,du$:

$$\Gamma(1/2) = \int_0^\infty t^{-1/2}e^{-t}\\,dt = 2\int_0^\infty e^{-u^2}\\,du =: 2I$$

Computing $I$ directly has no elementary antiderivative, so the standard way around it is to square the integral and convert to polar coordinates, new machinery the recursion doesn't supply:

$$I^2 = \left(\int_0^\infty e^{-u^2}\\,du\right)\left(\int_0^\infty e^{-v^2}\\,dv\right) = \iint_{\text{1st quadrant}} e^{-(u^2+v^2)}\\,dA$$

Converting to polar coordinates is ordinary vector calculus ($u=r\cos\theta$, $v=r\sin\theta$, $dA=r\\,dr\\,d\theta$), with one detail that's easy to get wrong by pattern-matching against the more familiar full-plane version of this trick: the region here is the *first quadrant only*, so $\theta$ ranges over $[0,\pi/2]$, not $[0,2\pi]$.

$$I^2 = \int_0^{\pi/2}\int_0^\infty e^{-r^2}\\,r\\,dr\\,d\theta = \frac\pi2\cdot\frac12=\frac\pi4 \\;\Longrightarrow\\; I=\frac{\sqrt\pi}2 \\;\Longrightarrow\\; \Gamma(1/2)=\sqrt\pi$$

That one new fact reaches the entire half-integer ladder for free, via the recursion: $\Gamma(3/2)=\frac12\Gamma(1/2)=\frac{\sqrt\pi}2$, $\Gamma(5/2)=\frac32\Gamma(3/2)=\frac{3\sqrt\pi}4$, and so on.

> **Key takeaway:** $\Gamma(1/2)=\sqrt\pi$, via $t=u^2$ then squaring and converting to polar coordinates, a genuinely new technique, not a corollary of the recursion.

## Meromorphic continuation, poles, and residues

$\Gamma$ so far is defined only on $\mathrm{Re}(s)>0$. Matching $\Gamma(n+1)=n!$ for non-negative $n$ doesn't need continuation at all: every one of those points already sits inside the convergent domain, so that was pure evaluation. Continuation becomes necessary the moment $\mathrm{Re}(s)\le0$ is in view.

**The extension mechanism.** Rearrange the recursion as $\Gamma(s)=\Gamma(s+1)/s$. The right-hand side is defined, via the original integral evaluated at $s+1$, whenever $\mathrm{Re}(s+1)>0$, i.e. $\mathrm{Re}(s)>-1$: strictly larger than the starting domain, with a simple pole appearing at $s=0$, where $\Gamma(1)/s\to\infty$.

**Why this is legitimate.** Direct algebra shows the new formula *agrees* with the original $\Gamma$ everywhere they overlap, $\mathrm{Re}(s)>0$; that's just the recursion rearranged, nothing more. What promotes this from "an extension that happens to match" to "*the* extension" is the identity theorem: it rules out any other holomorphic function on the larger domain that also agrees with $\Gamma$ on the open right half-plane without being identical to this one. Algebra supplies existence and agreement; the identity theorem supplies uniqueness.

**Iterating.** Substitute $\Gamma(s+1)=\Gamma(s+2)/(s+1)$ into the same relation: $\Gamma(s)=\Gamma(s+2)/[s(s+1)]$, valid on $\mathrm{Re}(s)>-2$, with poles at $s=0,-1$, both genuine, not removable, since the numerator $\Gamma(1),\Gamma(2)$ is nonzero at each. The pattern continues without limit, and it's fully constructive: for any $s_0\in\mathbb{C}$ that isn't a non-positive integer, choosing $n$ large enough that $\mathrm{Re}(s_0)>-(n+1)$ reduces $\Gamma(s_0)$ to the original convergent integral in finitely many algebraic steps.

$$\Gamma(s) = \frac{\Gamma(s+n+1)}{s(s+1)\cdots(s+n)} = \frac{\Gamma(s+n+1)}{\prod_{k=0}^n(s+k)}, \qquad \mathrm{Re}(s)>-(n+1)$$

This makes $\Gamma$ meromorphic on all of $\mathbb{C}$, with simple poles exactly at $s=0,-1,-2,\ldots$, nowhere else.

**Residues.** Lesson 7's simple-pole formula is $\mathrm{Res}(f,z_0)=\lim_{z\to z_0}(z-z_0)f(z)$. Substituting the extension formula in *before* taking the limit avoids the false read that $s\cdot\Gamma(s)\to0$ near the pole:

$$\mathrm{Res}(\Gamma,0)=\lim_{s\to0}s\cdot\frac{\Gamma(s+1)}{s}=\Gamma(1)=1$$

The general case follows the same cancellation: $(s+n)$ cancels the matching factor in the denominator, leaving

$$\mathrm{Res}(\Gamma,-n)=\frac{\Gamma(1)}{(-n)(-n+1)\cdots(-1)}=\frac{1}{(-1)^n\\,n!}=\frac{(-1)^n}{n!}$$

(check against $n=2$: $(-1)^2\cdot2!=2$, matching $(-2)(-1)=2$ directly.)

> **Key takeaway:** $\Gamma$ continues to a meromorphic function on all of $\mathbb{C}$, with simple poles exactly at the non-positive integers and $\mathrm{Res}(\Gamma,-n)=\dfrac{(-1)^n}{n!}$.

## The reflection formula

The recursion and the continuation both stay inside a single copy of $\Gamma$. The reflection formula ties two *different* values of $\Gamma$ together, $\Gamma(s)$ and $\Gamma(1-s)$, and the bridge that gets there runs through a second, closely related integral.

**The Beta function.** Define $B(p,q)=\int_0^1 t^{p-1}(1-t)^{q-1}\\,dt$. Setting $q=1-p$ gives $B(p,1-p)=\int_0^1 t^{p-1}(1-t)^{-p}\\,dt$. Worth double-checking the exponent, since $q-1=(1-p)-1=-p$, not $p$.

**Converting to a contour integral.** Substitute $t=\dfrac{x}{1+x}$, so $1-t=\dfrac1{1+x}$ and, by the quotient rule, $\dfrac{dt}{dx}=\dfrac1{(1+x)^2}$. Assembling the pieces:

$$t^{p-1}(1-t)^{-p}\\,dt = \left(\frac{x}{1+x}\right)^{p-1}(1+x)^p\cdot\frac{dx}{(1+x)^2} = \frac{x^{p-1}}{1+x}\\,dx$$

It's easy to lose a sign combining the powers of $(1+x)$ here. Three factors contribute: $-(p-1)$ from $t^{p-1}$, then $+p$ from $(1-t)^{-p}$, then $-2$ from $dt$. They total $-(p-1)+p-2=-1$, leaving $(1+x)^{-1}$ in the denominator. Carried through correctly:

$$B(p,1-p)=\int_0^\infty\frac{x^{p-1}}{1+x}\\,dx = \frac{\pi}{\sin(\pi p)}, \qquad 0<p<1$$

That last equality is Lesson 12's keyhole-contour result, $\int_0^\infty\frac{x^{a-1}}{1+x}\\,dx=\frac\pi{\sin(\pi a)}$, applied at $a=p$: $B(p,1-p)$ is that integral in disguise.

**The Beta–Gamma relation.** Start from the product of two Gamma integrals, in independent variables $u,v$:

$$\Gamma(p)\Gamma(q)=\int_0^\infty\\!\\!\int_0^\infty u^{p-1}v^{q-1}e^{-(u+v)}\\,du\\,dv$$

Change variables to $s=u+v$, $t=\dfrac{u}{u+v}$, so $u=st$, $v=s(1-t)$. This is machinery from outside complex analysis: the Jacobian of a two-variable substitution is the direct analogue of $|dx/dt|$ in one variable.

$$\left|\frac{\partial(u,v)}{\partial(s,t)}\right|=\left|\det\begin{pmatrix}t & s \\\\ 1-t & -s\end{pmatrix}\right|=|-st-s(1-t)|=s$$

Substituting and separating the $s$- and $t$-dependence,

$$\Gamma(p)\Gamma(q)=\int_0^\infty s^{p+q-1}e^{-s}\\,ds\cdot\int_0^1 t^{p-1}(1-t)^{q-1}\\,dt=\Gamma(p+q)\cdot B(p,q)$$

$$\boxed{B(p,q)=\frac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)}}$$

This is the same species of trick as the Gaussian computation above (one integral squared against itself there, two different integrals combined here), reused a second time in this lesson.

**Assembling the reflection formula.** Set $q=1-p$ and use $\Gamma(1)=1$:

$$B(p,1-p)=\frac{\Gamma(p)\Gamma(1-p)}{\Gamma(1)}=\Gamma(p)\Gamma(1-p)=\frac\pi{\sin(\pi p)}, \qquad 0<p<1$$

**Extending past the strip.** Every step used to reach this (the $\Gamma$ integral, the Jacobian substitution, the keyhole contour's vanishing bounds) only ever needed $\mathrm{Re}(p)>0$ and $\mathrm{Re}(p)<1$, never that $p$ was real. So the identical computation already establishes $\Gamma(p)\Gamma(1-p)=\pi/\sin(\pi p)$ on the full complex strip $0<\mathrm{Re}(p)<1$, with no extra theorem required. The identity theorem's actual job is exporting the result past that strip, to points where no direct integral proof exists at all. Both sides are holomorphic on $\mathbb{C}\setminus\mathbb{Z}$, and they agree on the open strip — a strictly easier case than the isolated-zeros version of the theorem from Lesson 6, since every point of an open set is automatically a limit point of itself. Agreement is forced on the whole connected domain.

$$\boxed{\Gamma(s)\Gamma(1-s)=\frac\pi{\sin(\pi s)},\qquad s\in\mathbb{C}\setminus\mathbb{Z}}$$

The pole structure checks out on both sides: $\pi/\sin(\pi s)$ has simple poles at every integer, and on the left, $\Gamma(s)$ supplies the poles at $s=0,-1,-2,\ldots$ while $\Gamma(1-s)$ supplies $s=1,2,3,\ldots$, together covering $\mathbb{Z}$ exactly, with nothing left over on either side.

**A sanity check.** At $s=\frac12$: $\Gamma(1/2)^2=\pi/\sin(\pi/2)=\pi$, so $\Gamma(1/2)=\sqrt\pi$, the same value reached earlier by the Gaussian-squaring trick. This time it falls out of a completely different argument: a real integral there, a keyhole contour and an identity-theorem extension here.

> **Key takeaway:** $B(p,q)=\dfrac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)}$; **Euler's reflection formula,** $\Gamma(s)\Gamma(1-s)=\dfrac\pi{\sin\pi s}$ on $\mathbb{C}\setminus\mathbb{Z}$; the identity theorem's role is exporting agreement from an open strip to the entire domain, not establishing the strip itself.
