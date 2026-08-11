---
layout: base.njk
hue: 77
title: "Lesson 10 — The Riemann Zeta Function & the Riemann Hypothesis"
description: "A series that converges nowhere useful, extended to the whole plane and made to say something about prime numbers. Basel's problem falls out of a residue computation, the Euler product links the series to the primes, and the whole apparatus builds to a precise statement of what the Riemann Hypothesis actually claims."
---

# Lesson 10: The Riemann Zeta Function & the Riemann Hypothesis

Lesson 9 followed a specific pattern: define an object on a small domain, extend it rigorously, find a functional equation, locate the poles. Gamma was the rehearsal. Zeta is the real target, and the functional equation below even uses $\Gamma$ directly.

The whole lesson answers one question, asked in stages. The series $\zeta(s)=\sum_{n\ge1}n^{-s}$ converges only for $\mathrm{Re}(s)>1$ as written. What does it equal where it does converge? Why does it know anything about primes? Can it mean anything outside that half-plane? Is there a hidden symmetry between the two halves of the plane? And finally: where exactly do the interesting zeros sit, and why would anyone care?

## The Basel problem, and $\zeta$ properly defined

Rather than opening with the general definition, start with the single most famous instance and let contour integration do something a real-variable course cannot do this cleanly.

Lesson 7 established that a function with known, simple pole structure converts a sum over its poles into a contour integral. Gamma's poles were built one at a time. Is there a function whose poles sit at *every* integer at once, each with a residue already known?

There is, and the natural first guess needs one correction. Sine's zeros at every integer are exactly why a reciprocal would have poles there, but near an integer $n$, $\sin(\pi z)\approx\pi(-1)^n(z-n)$, so $1/\sin(\pi z)$ carries an **alternating** residue $(-1)^n/\pi$. Putting a cosine in the numerator cancels that sign:

$$\pi\cot(\pi z) \text{ has a simple pole at every integer, each with residue exactly } 1$$

Uniform, no alternation, which is what a non-alternating sum like $\sum1/n^2$ needs. Near $z=0$ its Laurent expansion is

$$\pi\cot(\pi z)=\frac1z-\frac{\pi^2}{3}z-\frac{\pi^4}{45}z^3-\cdots$$

**The residues.** Set $f(z)=\dfrac{\pi\cot(\pi z)}{z^2}$. At $z=0$, multiplying the expansion above by $z^{-2}$ shifts every exponent down by two, turning the simple pole into an order-3 pole. The residue is the coefficient of $z^{-1}$, which comes from the $-\frac{\pi^2}3z$ term, not from the new leading $z^{-3}$ term:

| Original term | Times $z^{-2}$ | Resulting power |
| --- | --- | --- |
| $1/z$ | $z^{-1}\cdot z^{-2}$ | $z^{-3}$ |
| $-\frac{\pi^2}{3}z$ | $z^{1}\cdot z^{-2}$ | $z^{-1}$ |
| $-\frac{\pi^4}{45}z^3$ | $z^{3}\cdot z^{-2}$ | $z^{1}$ |

So $\mathrm{Res}(f,0)=-\frac{\pi^2}3$. At any other integer $n$, the factor $1/z^2$ is holomorphic and nonzero, so the residue is just the cot residue scaled: $\mathrm{Res}(f,n)=\frac1{n^2}$.

**The contour.** Take the square $C_N$ with vertices $(N+\tfrac12)(\pm1\pm i)$. This shape is chosen, not arbitrary: $\pi\cot(\pi z)$ is bounded on every such square by the same constant regardless of $N$. Periodicity handles the horizontal direction, since every vertical strip looks identical and the square's vertical sides sit exactly halfway between integers: the safest possible real part, where $\cot$ vanishes. Decay toward $\mp i$ off the real axis handles the rest. No point on any $C_N$ is ever near a pole.

An ML-estimate then finishes it. The perimeter is $8N+4=O(N)$. Every point of $C_N$ lies at distance at least $N+\tfrac12$ from the origin, with the closest approach at the side midpoints, so $|1/z^2|\le1/(N+\tfrac12)^2=O(1/N^2)$. The product $O(N)\cdot O(1/N^2)\to0$, so

$$\oint_{C_N}f(z)\\,dz\longrightarrow0 \qquad\text{as } N\to\infty$$

**Assembly.** The sum of residues inside $C_N$ is

$$-\frac{\pi^2}{3}+\sum_{\substack{n=-N\\\\n\ne0}}^{N}\frac1{n^2}=-\frac{\pi^2}{3}+2\sum_{n=1}^{N}\frac1{n^2}$$

using $(-m)^2=m^2$ to fold the negative half onto the positive one. Splitting the finite sum needs no justification, since finite sums regroup freely, and taking $N\to\infty$ termwise is safe here because $\sum1/n^2$ has positive terms and converges absolutely. By the Residue Theorem this quantity equals $\frac1{2\pi i}\oint_{C_N}f\\,dz$, which tends to $0$. Solving:

$$\boxed{\sum_{n=1}^\infty\frac1{n^2}=\frac{\pi^2}6}$$

The **Basel problem**, first cracked by Euler in 1735 with a trick that took another century to justify, falls out here as a two-page residue computation.

**Now the definition.** $\zeta(s)=\sum_{n\ge1}n^{-s}$, converging absolutely for $\mathrm{Re}(s)>1$. The convergence test is the real $p$-series test in disguise: $|n^{-s}|=n^{-\mathrm{Re}(s)}$ for every complex $s$, because the imaginary part only rotates phase and never changes magnitude. So the whole question collapses to $p=\mathrm{Re}(s)$. And $\zeta(2)=\pi^2/6$ is now a proven instance rather than a black box.

> **Key takeaway:** $\pi\cot(\pi z)$ has residue $1$ at every integer; dividing by $z^2$ and summing residues over expanding squares gives $\zeta(2)=\pi^2/6$. The series $\zeta(s)=\sum n^{-s}$ converges exactly when $\mathrm{Re}(s)>1$.

## The Euler product, and the link to primes

Nothing in the series $\sum n^{-s}$ mentions primes. The next identity is the entire reason $\zeta$ matters outside pure analysis: it is a dictionary entry translating between additive statements (sums over all integers) and multiplicative ones (products over primes).

For a single prime $p$ with $\mathrm{Re}(s)>1$, so that $|p^{-s}|<1$, the geometric series gives

$$\left(1-p^{-s}\right)^{-1}=1+p^{-s}+p^{-2s}+p^{-3s}+\cdots$$

Now take the product over all primes. Expanding a product of sums produces another sum (the ordinary distributive rule, extended to infinitely many factors), where each term is formed by choosing one item from each prime's series, all but finitely many of them the leading $1$. A single such choice multiplies out to

$$p_1^{-k_1s}p_2^{-k_2s}\cdots=\left(p_1^{k_1}p_2^{k_2}\cdots\right)^{-s}=n^{-s}$$

for some positive integer $n$. The **Fundamental Theorem of Arithmetic** is what makes this a bijection: every $n\ge1$ has exactly one prime factorization, so exponent-choices and positive integers correspond perfectly, and expanding the product produces every $n^{-s}$ exactly once. Therefore

$$\boxed{\zeta(s)=\prod_p\left(1-p^{-s}\right)^{-1}}, \qquad \mathrm{Re}(s)>1$$

It is worth seeing this converge rather than only believing it. The partial product over primes below $20{,}000$ gives $1.644926\ldots$ against the true $\zeta(2)=1.644934\ldots$: four significant figures from a finite cutoff.

The payoff, stated plainly: any question about how primes are distributed can in principle be translated into a question about $\zeta$'s analytic behavior: its poles, its zeros, its growth. The last section makes that precise for zero locations.

> **Key takeaway:** $\zeta(s)=\prod_p(1-p^{-s})^{-1}$, and unique factorization is the one fact making it true. This is what connects a series over all integers to the primes.

## Continuing past $\mathrm{Re}(s)=1$

Both the series and the Euler product die at $\mathrm{Re}(s)=1$; at $s=1$ the series is the harmonic series, genuinely divergent. Lesson 9 hit an analogous wall with $\Gamma$ and got past it by recursion, relating $\Gamma(s)$ to $\Gamma(s+1)$, a value one step to the right that it already trusted. The move here is different in kind but similar in spirit: relate $\zeta$ to a cousin series that already converges further left.

**The Dirichlet eta function.**

$$\eta(s)=\sum_{n\ge1}\frac{(-1)^{n-1}}{n^s}=1-2^{-s}+3^{-s}-4^{-s}+\cdots$$

converges, conditionally, for $\mathrm{Re}(s)>0$, a strictly larger domain than $\zeta$'s, because the alternating signs buy cancellation the plain series has no access to.

**Relating the two.** The even-indexed terms are $n=2m$, so $\sum_{\text{even}}n^{-s}=2^{-s}\zeta(s)$. Subtracting twice that from the full series flips the sign of every even term and leaves the odd ones alone, which is exactly $\eta$. Algebraically the same subtraction reads $\zeta(s)-2\cdot2^{-s}\zeta(s)=\zeta(s)\left(1-2^{1-s}\right)$. The two descriptions of the same operation give

$$\boxed{\zeta(s)=\frac{\eta(s)}{1-2^{1-s}}}$$

**Why this is the continuation, and not merely a formula that matches.** The right-hand side is defined wherever $\eta$ converges, $\mathrm{Re}(s)>0$, except where the denominator vanishes. It agrees with $\zeta$ on $\mathrm{Re}(s)>1$, an open set, so by the identity theorem it *is* the unique analytic continuation: no other holomorphic function on the larger domain can agree with $\zeta$ on the smaller one without being this one. Existence comes from algebra; uniqueness comes from the theorem.

One honest gap, worth naming rather than skating past: $1-2^{1-s}$ also vanishes at other points on the line $\mathrm{Re}(s)=1$, the complex solutions of $2^{1-s}=1$. Zeta is known to be perfectly regular there, which forces $\eta$ to vanish at exactly those points too — a fact this lesson states rather than proves.

**The pole.** Near $s=1$, write $2^{1-s}=e^{(1-s)\ln2}\approx1+(1-s)\ln2$, so $1-2^{1-s}\approx(s-1)\ln2$. Meanwhile $\eta(1)=\ln2$, being the alternating harmonic series, which is $\ln(1+x)$'s Taylor series from Lesson 3 evaluated at $x=1$. So near $s=1$,

$$\zeta(s)\approx\frac{\ln2}{(s-1)\ln2}=\frac1{s-1}$$

a simple pole with residue exactly $1$. It is $\zeta$'s only pole anywhere in the plane.

> **Key takeaway:** $\zeta(s)=\eta(s)/(1-2^{1-s})$ continues $\zeta$ to $\mathrm{Re}(s)>0$, uniquely by the identity theorem, with a single simple pole at $s=1$ of residue $1$.

## The functional equation and the trivial zeros

The eta trick reaches $\mathrm{Re}(s)>0$. Covering the entire plane takes a genuinely different move, one worth contrasting with Lesson 9 explicitly. Gamma's continuation was a *recursive crawl*: each step reached one unit further left, indefinitely. What follows is a single *mirror reflection*, relating $\zeta(s)$ directly to $\zeta(1-s)$ across the line $\mathrm{Re}(s)=\frac12$. The same family of "define it via itself," structurally a different shape.

$$\boxed{\zeta(s)=2^s\pi^{s-1}\sin\\!\left(\frac{\pi s}2\right)\Gamma(1-s)\\,\zeta(1-s)}$$

This is given, not derived. Riemann's proof runs through the theta function and Poisson summation, machinery genuinely outside this project — the same treatment the Riemann Mapping Theorem got in Lesson 8. What is satisfying about it even unproved is that every ingredient has already been built here: $\Gamma$ with its full continuation and pole structure from Lesson 9, $\sin$, and $\zeta$ itself.

It is natural to ask why the equation isn't simply $\zeta(s)=\zeta(1-s)$, since those are the two points being related. The answer is easier to see by analogy than by mechanics: Lesson 9's own reflection formula, $\Gamma(s)\Gamma(1-s)=\pi/\sin(\pi s)$, has exactly the same shape: a relation between mirrored points carrying a real, nontrivial correction factor, not an equality. Reflection symmetries in this subject generally cost something.

**This completes the continuation.** For any $s$ with $\mathrm{Re}(s)<0$, the right-hand side only ever evaluates $\zeta$ at $1-s$, where $\mathrm{Re}(1-s)>1$, solidly inside the original convergent domain. So the functional equation is a complete recipe, and $\zeta$ is now a meromorphic function on all of $\mathbb{C}$, with its one pole at $s=1$.

**The trivial zeros.** Look at the right-hand side and ask which factor can vanish for a reason visible by inspection. It is the $\sin(\pi s/2)$ factor, which is zero exactly when $\frac{\pi s}2=k\pi$, that is, at every **even** integer $s=2k$. Gamma is never zero anywhere, so it cannot supply zeros; using $\zeta(1-s)$'s zeros would be circular.

Not all of those candidates survive. At the positive even integers $s=2,4,6,\ldots$, the argument $1-s$ lands on $-1,-3,-5,\ldots$, where $\Gamma(1-s)$ has a pole: a $0\times\infty$ collision that resolves to something nonzero rather than a genuine zero. At $s=0$ there is a separate collision, this time with $\zeta$'s own pole, consistent with the known value $\zeta(0)=-\frac12$. At the negative even integers, nothing else in the formula misbehaves:

$$\zeta(-2)=\zeta(-4)=\zeta(-6)=\cdots=0$$

These are the **trivial zeros**, trivial only in the sense that the functional equation hands them over for free. Nothing about primes is hiding in them.

> **Key takeaway:** the functional equation completes $\zeta$'s continuation to $\mathbb{C}\setminus\lbrace1\rbrace$ and produces the trivial zeros at $s=-2,-4,-6,\ldots$ directly from its $\sin$ factor.

## The critical strip and the Riemann Hypothesis

Two results already proved now box in the only region where anything is unknown.

The Euler product forces $\zeta(s)\ne0$ for $\mathrm{Re}(s)>1$: a product of nonzero factors is nonzero. The functional equation reflects that fact leftward, forcing $\zeta(s)\ne0$ for $\mathrm{Re}(s)<0$ except at the trivial zeros already located. What remains is a single vertical band:

$$\text{the \textbf{critical strip}}: \quad 0\le\mathrm{Re}(s)\le1$$

Every **nontrivial zero** lives here, and it is a theorem — not a conjecture — that infinitely many exist.

**Where in the strip?** The functional equation pairs $s$ with $1-s$, and solving $s=1-s$ gives the single point $s=\frac12$. Getting from that point to a whole line takes one more fact: $\zeta$ is built entirely from real ingredients, so its zeros come in conjugate pairs: if $\rho$ is a zero, so is $\bar\rho$. Composing the two symmetries, reflection through the point $\frac12$ and reflection across the real axis, produces a mirror reflection across the vertical line $\mathrm{Re}(s)=\frac12$. That line is the **critical line**, the unique fixed axis of the symmetry the functional equation encodes.

$$\textbf{Riemann Hypothesis: every nontrivial zero of } \zeta \text{ satisfies } \mathrm{Re}(s)=\tfrac12$$

The first nontrivial zero sits at $s\approx0.5+14.1347251\ldots i$, exactly on the line. This has now been checked computationally for many trillions of zeros with no exception found, which is consistent with the hypothesis without being anything like a proof of it.

Proof, as opposed to computational check, has also moved. In August 2026 the proven lower bound on the proportion of nontrivial zeros known to lie exactly on the critical line rose from 41.6% to 67.2%. That is a real theorem about infinitely many zeros at once, not a finite search, though it is still a proportion short of the 100% the full hypothesis would require.

**Why anyone outside pure analysis cares.** Let $\pi(x)$ count the primes up to $x$; the notation clash with $3.14159\ldots$ is unfortunate and standard. The **Prime Number Theorem** states that $\pi(x)$ is asymptotic to the logarithmic integral $\mathrm{Li}(x)$, and it was proved historically by showing $\zeta$ has no zeros exactly on the line $\mathrm{Re}(s)=1$, already a direct link between zero locations and prime distribution. Push further in: each nontrivial zero contributes a correction term to how well $\mathrm{Li}(x)$ approximates $\pi(x)$, and the closer a zero's real part lies to $\frac12$, the smaller its correction. If the hypothesis holds, every correction is as small as the theory permits and the primes are as regular as they could possibly be, with

$$\left|\pi(x)-\mathrm{Li}(x)\right|=O\\!\left(\sqrt x\log x\right)$$

the best bound of this shape conceivable. If it fails, some zero sits off center and the primes carry a structural irregularity at a scale nothing else would predict.

**What the hypothesis is, precisely.** It is not "we don't know whether $\zeta$ has more zeros." The count and the general location are already theorems. The Riemann Hypothesis is a claim about *precision*: are the nontrivial zeros exactly centered on the axis of symmetry, or merely somewhere inside the strip. That, and nothing more, is the whole statement.

> **Key takeaway:** the critical strip is what the Euler product and the functional equation leave unaccounted for; the critical line is the fixed axis of the functional equation combined with conjugate symmetry; and the hypothesis claims every nontrivial zero sits exactly on it.
