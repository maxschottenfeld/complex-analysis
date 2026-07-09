---
layout: base.njk
hue: 185
scrolly: true
title: "Lesson 2 — Holomorphic Functions & the Cauchy-Riemann Equations"
---

# Lesson 2: Holomorphic Functions & the Cauchy-Riemann Equations

Lesson 0 left a promissory note: writing $f(z)=z^2$ as $u(x,y)+iv(x,y)=x^2-y^2+2ixy$, the map turned out to preserve angles everywhere except at the origin. *Why* does it preserve angles at all? This lesson answers that.

## The limit definition, and why it's restrictive

Real differentiability only has to work along a line — $h\in\mathbb{R}$ approaching $0$ from two directions. The complex analogue looks identical on paper,
$$f'(z_0) = \lim_{h \to 0} \frac{f(z_0+h)-f(z_0)}{h}, \qquad h \in \mathbb{C},$$
but $h$ now ranges over an entire plane of approach directions, and the limit has to agree along *every* one of them. That's a dramatically stronger requirement than the real case, where continuity plus a two-sided limit is enough. Most functions fail this test; the ones that pass — where the complex derivative exists on an open set — are called **holomorphic**, and they turn out to be extraordinarily special.

> **Key takeaway:** $f'(z_0)$ requires the same limit along every direction $h\in\mathbb{C}$, not just two. Functions where this exists (on an open set) are holomorphic.

## Deriving the Cauchy-Riemann equations

Two special directions pin down what "same limit everywhere" forces. Writing $f=u+iv$:

- $h=t$ real: the limit gives $u_x+iv_x$.
- $h=it$, $t$ real: the limit gives $v_y-iu_y$.

Setting these equal and matching real and imaginary parts gives the **Cauchy-Riemann equations**:
$$u_x = v_y \qquad u_y = -v_x$$

(A common slip worth flagging explicitly: the imaginary-axis direction divides by $i$ along the way, and $1/i=-i$ — it's easy to drop that sign and land on $+iu_y$ instead of $-iu_y$.)

CR is *necessary* for complex differentiability, though not quite sufficient on its own — sufficiency also needs the partial derivatives to be continuous.

> **Key takeaway:** $u_x=v_y$, $u_y=-v_x$ — necessary for complex differentiability.

## Worked examples

**$f(z)=z^2$:** $u=x^2-y^2$, $v=2xy$ (from Lesson 0).
$$u_x=2x=v_y \quad\checkmark \qquad u_y=-2y=-v_x \quad\checkmark$$
CR holds everywhere, so $z^2$ is holomorphic on all of $\mathbb{C}$.

**$f(z)=\bar z$:** $u=x$, $v=-y$.
$$u_x=1, \qquad v_y=-1$$
CR fails everywhere — $\bar z$ is nowhere holomorphic. About as stark a failure as is possible.

**$f(z)=|z|^2$:** $u=x^2+y^2$, $v=0$.
$$u_x=2x=v_y=0 \implies x=0, \qquad u_y=2y=-v_x=0 \implies y=0$$
CR holds *only* at $z=0$ — a single isolated point, not an open set. This is worth pausing on: differentiable at an isolated point is not the same thing as holomorphic, which requires an open set of differentiability.

> **Key takeaway:** $z^2$ is holomorphic on $\mathbb{C}$. $\bar z$ is nowhere holomorphic. $|z|^2$ is complex-differentiable only at the single point $z=0$ — not holomorphic there.

## Conformality: closing the Lesson 0 loop

Viewing $f=u+iv$ as a real map $\mathbb{R}^2\to\mathbb{R}^2$, its Jacobian is
$$J = \begin{pmatrix} u_x & u_y \\ v_x & v_y \end{pmatrix}.$$
Substituting the Cauchy-Riemann relations $u_x=v_y=a$, $v_x=-u_y=b$ collapses this to
$$J = \begin{pmatrix} a & -b \\ b & a \end{pmatrix},$$
which is exactly the form of a **rotation matrix** $\begin{pmatrix}\cos\theta & -\sin\theta \\ \sin\theta & \cos\theta\end{pmatrix}$ scaled by a constant factor: $J$ is a rotation by $\arg(a+ib)$ composed with a scaling by $\sqrt{a^2+b^2}=|f'(z_0)|$ (note $\det J = a^2+b^2$, the scaling factor squared).

The four claims that matrix computation just made — same rotation for every tangent vector, collapse where $f'=0$, reflection when CR fails, and no bad points at all for $e^z$ — are exactly the four things to watch below. As you scroll, the demo moves to each situation; it stays fully draggable the whole way.

<section class="scrolly scrolly-static" data-scrolly>
  <div class="scrolly-figure">
    <iframe class="viz-embed" src="/assets/visualizations/02-conformality-jacobian.html?embed" title="Conformality and the Jacobian visualization"></iframe>
  </div>
  <div class="scrolly-steps">
    <div class="scrolly-step" data-state='{"type":"conformality-state","fn":"sq","z0":[1,0.6],"v1":[0.9,0],"v2":[0.3,0.85]}'>
      <span class="step-tag">1 · conformal at a generic point</span>
      <p>$f(z)=z^2$ at $z_0 = 1+0.6i$. In the right panel, both tangent vectors are multiplied by the same complex number $f'(z_0)$ — one shared rotation, one shared scaling. The angle between them comes through untouched. "Conformal" is nothing deeper than <em>the same rotation hits everyone</em>.</p>
    </div>
    <div class="scrolly-step" data-state='{"type":"conformality-state","fn":"sq","z0":[0,0],"v1":[0.9,0],"v2":[0.3,0.85]}'>
      <span class="step-tag">2 · the critical point</span>
      <p>Now $z_0$ slides to the origin — the one point where $f'(z)=2z$ vanishes. The Jacobian goes singular: no rotation angle survives, both image vectors are crushed, and the angle between them is destroyed. Conformality fails <em>exactly</em> where $f'=0$ — this is the pinch from Lesson 0.</p>
    </div>
    <div class="scrolly-step" data-state='{"type":"conformality-state","fn":"conj","z0":[1,0.6],"v1":[0.9,0],"v2":[0.3,0.85]}'>
      <span class="step-tag">3 · what CR failing looks like</span>
      <p>Switch to $f(z)=\bar z$, which fails Cauchy-Riemann everywhere. Its Jacobian is a <em>reflection</em>: the angle keeps its size but flips its sign. A rigid map, and still not conformal — orientation is part of the deal, and no reflection can be written as rotation-plus-scaling.</p>
    </div>
    <div class="scrolly-step" data-state='{"type":"conformality-state","fn":"exp","z0":[0,1.5708],"v1":[0.9,0],"v2":[0.3,0.85]}'>
      <span class="step-tag">4 · no bad points anywhere</span>
      <p>Finally $e^z$: holomorphic with $f'(z)=e^z$, which is never zero — so there is no critical point to find. Here $z_0 = i\pi/2$, where $f'(z_0)=i$: a pure $90°$ rotation with scale exactly $1$. Drag $z_0$ anywhere and the verdict stays green.</p>
    </div>
  </div>
</section>

A rotation-plus-scaling map preserves angles between curves by construction — so wherever $f'(z_0)\ne0$, $f$ is conformal at $z_0$. Exactly where $f'(z_0)=0$, the Jacobian collapses (no well-defined rotation angle), and conformality can break down — precisely what happened at $z=0$ for $f(z)=z^2$ in Lesson 0.

It's worth checking that CR really does force agreement along *every* direction, not just the two used to derive it. Writing $h=te^{i\theta}$ and substituting CR into the linear approximation, the $\theta$ dependence cancels completely: the limit comes out to $u_x-iu_y$ regardless of direction.

> **Key takeaway:** $f$ holomorphic with $f'(z_0)\neq 0$ $\implies$ the Jacobian is a rotation-scaling $\implies$ $f$ is conformal at $z_0$. Conformality fails exactly where $f'=0$.

## Harmonic functions (a natural closer)

**Laplace's equation:** $u_{xx}+u_{yy}=0$. Functions satisfying it are called **harmonic**, and they govern heat flow, electrostatics, and fluid flow.

It falls straight out of CR: differentiate $u_x=v_y$ with respect to $x$ and $u_y=-v_x$ with respect to $y$, then add —
$$u_{xx}+u_{yy} = v_{yx} - v_{xy} = 0$$
(assuming mixed partials commute). The same argument applies to $v$. So the real and imaginary parts of *any* holomorphic function are automatically harmonic — they're called **harmonic conjugates** of each other.

This is the seed of a genuinely useful bridge: complex analysis becomes a tool for solving Laplace's equation, one that pays off directly when conformal mapping enters later in the syllabus.
