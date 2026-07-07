---
layout: base.njk
title: "Lesson 1 — Complex Numbers, the Plane, and Basic Topology"
---

# Lesson 1: Complex Numbers, the Plane, and Basic Topology

## Arithmetic and geometry of complex numbers

Identify $z=x+iy$ with the point $(x,y)\in\mathbb{R}^2$. Addition is exactly vector addition: $z_1+z_2=(2+i)+(-1+3i)=1+4i$, tip-to-tail, the same parallelogram law from vector calculus.

Multiplication is the operation that isn't just $\mathbb{R}^2$ — it's defined by declaring $i^2=-1$ and expanding like any other binomial: $(1+i)(1+i)=2i$, and $(2+i)(-1+3i)=-5+5i$.

**The geometric rule.** Rather than stating "moduli multiply, angles add," it's worth deriving it from a single example. Compute $|1+i|=\sqrt2$ and $|2i|=2$, and notice $2=\sqrt2\cdot\sqrt2$. Then check angles: $\arg(1+i)=45°$, $\arg(2i)=90°$, and $45°+45°=90°$. The pattern generalizes:
$$|z_1z_2|=|z_1||z_2|, \qquad \arg(z_1z_2)=\arg(z_1)+\arg(z_2)$$
This is the same fact that made $z^2$ double the angle in [Lesson 0](/lessons/00-big-picture-overview/).

**Modulus, conjugate, and $z\bar z=|z|^2$.** Take $z=3+4i$ — a clean Pythagorean triple. $|z|=5$, $\bar z=3-4i$, and
$$z\bar z=(3+4i)(3-4i)=9+16=25=|z|^2$$
via difference-of-squares. The reason this always works: conjugation flips the sign of $iy$, so the cross terms in the product cancel, leaving exactly $x^2+y^2$.

**Division** follows directly: $\dfrac1z=\dfrac{\bar z}{|z|^2}$, so $\dfrac{1}{1+i}=\dfrac{1-i}{2}=\dfrac12-\dfrac12 i$.

> **Key takeaways:** $z=x+iy\leftrightarrow(x,y)$; addition = vector addition (tip-to-tail). $|z_1z_2|=|z_1||z_2|$; $\arg(z_1z_2)=\arg(z_1)+\arg(z_2)$. $z\bar z=|z|^2 \implies \dfrac1z=\dfrac{\bar z}{|z|^2}$.

## Polar form and the argument

Lesson 0 used $z=re^{i\theta}$ to explain why $z^2$ doubles the angle — here it's made precise. Write $z=re^{i\theta}=r(\cos\theta+i\sin\theta)$, where $r=|z|$ and $\theta=\arg(z)$.

Converting $1+i=\sqrt2\,e^{i\pi/4}$ is the clean warm-up case ($45°$). A less obliging example: $-1+i\sqrt3$ has $r=2$, $\theta=2\pi/3$, found via the second-quadrant reference angle.

**Multivaluedness of $\arg$.** Take $z=i$. Both $\pi/2$ and $\pi/2+2\pi=5\pi/2$ (or equivalently $-3\pi/2$) are valid arguments — they point in the same direction, differing by a full revolution. (Note that $-\pi/2$ is *not* valid here: that's the direction of $-i$, not $i$.) The **principal argument** $\operatorname{Arg}(z)\in(-\pi,\pi]$ picks out one representative. This multivaluedness is the seed of branch cuts, which show up in Lesson 3.

**Euler's formula**, $e^{i\theta}=\cos\theta+i\sin\theta$, is stated here without proof — Lesson 3 derives it properly from the power series definition of $e^z$. It gives $e^{i\pi}=-1$ directly, since $\cos\pi=-1$ and $\sin\pi=0$.

**De Moivre / the payoff.** $z^n=r^ne^{in\theta}$. In polar form, $(1+i)^8$ is immediate: $r^8=2^4=16$, $8\theta=2\pi$, so $(1+i)^8=16e^{i2\pi}=16$ — far less painful than a binomial expansion.

> **Key takeaways:** $z=re^{i\theta}$, $r=|z|$, $\theta=\arg(z)$ (mod $2\pi$); $\operatorname{Arg}\in(-\pi,\pi]$. Euler: $e^{i\theta}=\cos\theta+i\sin\theta$; $e^{i\pi}=-1$. De Moivre: $z^n=r^ne^{in\theta}$.

## Roots of unity

How many solutions does $z^3=1$ have over $\mathbb{C}$? The Fundamental Theorem of Algebra (proved properly in Lesson 5) guarantees exactly 3, counted with multiplicity, for a degree-3 polynomial — a fact worth invoking here even before it's proven.

Finding them is a "solve in polar form, match mod $2\pi$" argument that's genuinely worth doing as an explicit six-step process the first time through, since the compressed version tends to hide the two places it's easy to get confused:

1. Write $z=re^{i\theta}$ and $1=1\cdot e^{i0}$ in polar form.
2. Cube: $z^3=r^3e^{i3\theta}$.
3. Match moduli: $r^3=1\implies r=1$.
4. Match angles **mod $2\pi$**: $e^{i3\theta}=e^{i0}\implies 3\theta=2\pi k,\ k\in\mathbb{Z}$. This is the crux — $e^{i\alpha}=e^{i\beta}$ iff $\alpha-\beta$ is a multiple of $2\pi$, so the equation only pins down $3\theta$ up to an added $2\pi k$, not $3\theta=0$ outright.
5. Solve: $\theta=\dfrac{2\pi k}{3}$.
6. Enumerate $k=0,1,2,3,\dots$: $k=3$ gives $\theta=2\pi\equiv0$, repeating $k=0$ — so there are exactly 3 distinct roots.

(The other easy confusion: it's $\theta=\arg(z)$ — the thing solved for — that gets plugged back into $z=e^{i\theta}$, not $3\theta=\arg(z^3)$, since those are angles of different numbers.)

The roots: $1$, $e^{i2\pi/3}=-\tfrac12+\tfrac{\sqrt3}{2}i$, $e^{i4\pi/3}=-\tfrac12-\tfrac{\sqrt3}{2}i$ — three points spaced $120°$ apart on the unit circle, forming an equilateral triangle.

<iframe class="viz-embed" src="/assets/visualizations/01-roots-of-unity.html" title="Roots of unity visualization"></iframe>

All three roots are powers of the primitive root $\omega=e^{i2\pi/3}$: $\omega^0,\omega^1,\omega^2$. And since a degree-3 polynomial has at most 3 roots, there are no more to find.

The same six steps generalize directly. For $z^3=8i$, write $8i=8e^{i\pi/2}$ and run the identical argument: $r=2$ (the real cube root of 8) and $\theta=\frac{\pi}{6}+\frac{2\pi k}{3}$, giving roots at $30°,150°,270°$ — the same equilateral triangle, scaled to radius 2 and rotated by $30°$.

> **Key takeaways:** $n$th roots of unity: $e^{2\pi ik/n}$, $k=0,\dots,n-1$ — a regular $n$-gon on the unit circle. All roots are powers of the primitive root $\omega=e^{2\pi i/n}$. General case $z^n=w$ ($w=\rho e^{i\phi}$): same polygon, radius $\rho^{1/n}$, rotated by $\phi/n$.

## Basic topology of the plane

Everything so far has been points and curves. The moment calculus enters the picture (Lesson 2 onward), it needs vocabulary for *where* — what kind of set a domain is. This connects directly to vector calculus: domains of vector fields, open regions, the "nice domains" theorems like Green's theorem require.

**Open disk.** $D(z_0,r)=\{z:|z-z_0|<r\}$. Testing $D(0,1)$ against $z=0.9$, $z=i$, $z=1$: $0.9$ is interior, while $i$ and $1$ sit exactly on the boundary circle ($|z|=1$, not $<1$) — which is exactly why the disk is called "open": the boundary is excluded.

**Open set.** Every point has *some* $\varepsilon$-disk around it fully contained in the set. Three test cases:

- $D(0,1)$: **open.** For $z$ with $|z|=r<1$, take $\varepsilon=1-r$ — there's room to the boundary.
- $\bar D(0,1)=\{|z|\le1\}$: **not open.** The boundary point $z=1$ *is* a member of the set (equality is allowed), but no $\varepsilon$-disk around it stays inside — half of any such disk pokes into $|z|>1$.
- $\mathbb{C}\setminus\{0\}$: **open.** For any $z\ne0$, take $\varepsilon=|z|/2$ to avoid the origin.

**Closed sets** are defined as sets whose complement is open. $\bar D(0,1)$ is closed: its complement $\{|z|>1\}$ is open, by the same argument as the open-disk case, just outside the circle.

**Open and closed aren't opposites.** The half-open annulus $A=\{0<|z|\le1\}$ (includes the outer boundary, excludes the origin) is neither:
- Not open: $z=1\in A$, but every $\varepsilon$-disk around it pokes outside into $|z|>1$.
- Not closed: the complement $\{0\}\cup\{|z|>1\}$ contains $0$, but every $\varepsilon$-disk around $0$ contains points of $A$ (any $z$ with $0<|z|<\varepsilon$), so the complement fails to be open there.

**Connectedness and regions.** Informally, a set is connected if it's one piece — you can travel between any two points without leaving the set. (Contrast $D(0,1)$ with two disjoint disks.) A **region** (or **domain**) is defined as *open and connected*. The punctured disk $D(0,1)\setminus\{0\}$ is still connected (route around the missing point) and still open, so it qualifies as a region — relevant later when residues show up on punctured regions.

**Proving $D(z_0,r)$ is open.** For $z_1\in D(z_0,r)$, let $\varepsilon=r-|z_1-z_0|>0$ — the leftover room between $z_1$ and the boundary. For any $w\in D(z_1,\varepsilon)$, the goal is $|w-z_0|<r$. Write
$$|w-z_0|=|(w-z_1)+(z_1-z_0)|\le|w-z_1|+|z_1-z_0|$$
by the **triangle inequality**, and then
$$|w-z_0|<\varepsilon+(r-\varepsilon)=r.$$
So every point of $D(z_0,r)$ has room to spare — the disk is open.

<iframe class="viz-embed" src="/assets/visualizations/01-open-sets-explorer.html" title="Open sets explorer visualization"></iframe>

> **Key takeaways:** Open set: every point has some $\varepsilon$-disk contained in the set. Closed set: complement is open. Open and closed are **not** opposites — $A=\{0<|z|\le1\}$ is neither. Region/domain = open + connected. Triangle inequality: $|a+b|\le|a|+|b|$. $D(z_0,r)$ is open: given $z_1\in D(z_0,r)$, take $\varepsilon=r-|z_1-z_0|$; the triangle inequality gives $|w-z_0|\le|w-z_1|+|z_1-z_0|<\varepsilon+(r-\varepsilon)=r$.
