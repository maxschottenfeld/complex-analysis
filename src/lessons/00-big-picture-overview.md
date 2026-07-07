---
layout: base.njk
title: "Lesson 0 — The Big Picture"
---

# Lesson 0: The Big Picture — What Is Complex Analysis About?

## Part 1: Domain coloring

### The core problem

A real function $f:\mathbb{R}\to\mathbb{R}$ is a curve — graphable in 2D. A complex function $f:\mathbb{C}\to\mathbb{C}$ maps a plane to a plane: the input $z$ has 2 real coordinates, and so does the output $f(z)$. A literal graph of $(z, f(z))$ would need **4 real dimensions** — not drawable. Complex analysis needs substitute visualization tools, and this lesson introduces two of them.

### The bridge to vector calculus

Every complex function can be written $f(x+iy) = u(x,y) + iv(x,y)$, splitting it into two real-valued functions of two real variables. This is exactly the kind of $\mathbb{R}^2 \to \mathbb{R}^2$ map that shows up in vector calculus — vector fields, parametrized maps. This connection keeps resurfacing throughout the subject, especially once the Cauchy-Riemann equations enter the picture.

### Tool 1: Domain coloring

Plot the input plane in 2D, but color each point $z$ by $\arg(f(z))$ — the angle (argument) of the output value $f(z)$.

For nonzero $z = x+iy$, write $z = re^{i\theta}$ in polar form, where $r = |z|$ is the distance from the origin and $\theta = \arg(z)$ is the angle from the positive real axis, measured counterclockwise.

<iframe class="viz-embed" src="/assets/visualizations/00-overview-domain-coloring-and-conformal-maps.html" title="Domain coloring and conformal maps visualization"></iframe>

### Worked example: $f(z) = z^2$

- In polar form, $z = re^{i\theta} \implies z^2 = r^2 e^{i2\theta}$, so $\arg(z^2) = 2\arg(z)$.
- Walking once around the origin ($\theta: 0 \to 2\pi$) makes $\arg(z^2)$ sweep $0 \to 4\pi$ — the color cycle repeats **twice**.
- Compare to $f(z) = z$ (the identity map): $\arg(f(z)) = \arg(z)$, a 1-to-1 correspondence — colors cycle exactly once.
- $z^2$ is therefore a **2-to-1 map** in general: $z$ and $-z$ always satisfy $z^2 = (-z)^2$ (e.g. $1^2 = (-1)^2 = 1$).
- The **only** point where this 2-to-1 behavior collapses to 1-to-1 is where $z = -z$, i.e. $z = 0$ — the unique fixed point of $z \mapsto -z$.

> **Key takeaways:** $f(x+iy) = u(x,y) + iv(x,y)$ is the universal decomposition of a complex function into two real functions. $f(z)=z^2$ is 2-to-1 everywhere except $z=0$, where the two preimages $z, -z$ collide — the algebraic root cause of the "pinching" visible in the domain-coloring picture at the origin, and (as later lessons show) a sign that $f'(0) = 0$.

## Part 2: Grid deformation and conformal maps

### Worked example: $u(x,y), v(x,y)$ for $z^2$

Expanding $(x+iy)^2 = x^2-y^2+2ixy$ gives $u(x,y)=x^2-y^2$ and $v(x,y)=2xy$. This holds at every point — spot-checking $z=1,\ i,\ 1+i,\ 2+3i,\ 3-2i,\ -1+i$ all confirm $u+iv = z^2$.

The correspondence $(x,y)\leftrightarrow z=x+iy$ identifies $x$ with the real part and $y$ with the coefficient of $i$ — the same identification of $\mathbb{C}$ with $\mathbb{R}^2$ used throughout complex analysis.

### Grid deformation

A vertical line $x=c$ maps under $z^2$ to the curve

$$u = c^2 - \frac{v^2}{4c^2}$$

— a parabola opening in the $-u$ direction, with vertex at $(c^2,0)$.

A horizontal line $y=c$ maps to

$$u = \frac{v^2}{4c^2} - c^2$$

— a parabola opening in the $+u$ direction, with vertex at $(-c^2,0)$.

### Conformality

A map $f$ is **conformal** at $z_0$ if it preserves the angle (magnitude and orientation) between any two curves crossing at $z_0$, once they're mapped to their images crossing at $f(z_0)$.

**A worked check:** at $z=1+i \to w=2i$, the images of the lines $x=1$ and $y=1$ are $u=1-\frac{v^2}{4}$ and $u=\frac{v^2}{4}-1$. At $v=2$, their slopes are $\frac{du}{dv}=-1$ and $+1$. The product of the slopes is $-1$, which means the curves are perpendicular — conformality confirmed at this point.

**Connection back to the pinch at $z=0$:** at $c=0$, both parabola formulas above involve division by zero — conformality breaks down exactly where $f'(0)=2(0)=0$. This is a preview of a theorem proved rigorously in Lesson 2: a holomorphic function $f$ is conformal at $z_0$ if and only if $f'(z_0)\neq 0$.

### Roadmap

Domain coloring and grid deformation are "what you see" — the geometric picture. Lesson 1 (complex arithmetic, polar form, topology) and Lesson 2 (Cauchy-Riemann equations, the conformality proof) supply the "why." From there, the syllabus builds toward Cauchy's theorem and the Cauchy integral formula — the centerpiece of the subject — followed by residues, conformal mapping, and the Riemann mapping theorem.

> **Key takeaways:** $u(x,y)=x^2-y^2,\ v(x,y)=2xy$ for $z^2$. Vertical lines map to left-opening parabolas; horizontal lines map to right-opening parabolas. A holomorphic $f$ is conformal at $z_0$ if and only if $f'(z_0)\neq 0$ — which is exactly why $z^2$'s conformality fails at the origin.

## Two pictures of a complex function

A complex function $f$ takes a complex number $z$ as input and produces a complex number $w=f(z)$ as output. Writing $z=x+iy$, the input is identified with the point $(x,y)$ in the input plane (the $z$-plane).

The output $w=f(z)$ can always be written as $w=u(x,y)+iv(x,y)$, where $u$ and $v$ are real-valued functions of the two real input variables $x,y$. This identifies the output with the point $(u,v)$ in the output plane (the $w$-plane).

So $f$ has two equivalent descriptions: as a single complex-valued map $z\mapsto f(z)$, or as a pair of real-valued maps $(x,y)\mapsto u(x,y)$ and $(x,y)\mapsto v(x,y)$ — an $\mathbb{R}^2\to\mathbb{R}^2$ map $(x,y)\mapsto(u,v)$, the same kind of object as the vector-valued maps from vector calculus.
