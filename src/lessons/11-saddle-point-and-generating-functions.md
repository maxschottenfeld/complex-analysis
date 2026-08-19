---
layout: base.njk
hue: 165
title: "Lesson 11 — Saddle-Point Method & Generating Functions"
description: "Every previous lesson used a series to understand a function. This one runs the machinery backwards: encode a sequence as a function, read its singularities to get a growth rate, and then derive Stirling's formula twice, once on the real line and once through a saddle point in the complex plane."
---

# Lesson 11: Saddle-Point Method & Generating Functions

Every lesson so far has used a series to understand a function. This one goes the other way. It uses a function to understand a series, and it asks a single question in stages: given a sequence you cannot compute directly, how big is it when $n$ is large?

The answer arrives twice. The first derivation never leaves the real line. The second one goes into the complex plane, finds that the obvious maximum is not a maximum at all, and gets the identical formula out of a completely different picture.

## Encoding a sequence as a function

A **generating function** packs a sequence into the coefficients of a power series:

$$F(z) = \sum_{n\ge0} a_n z^n$$

The payoff is a two-way dictionary. Analytic facts about $F$ (where it blows up, how fast it grows) become arithmetic facts about $a_n$, in the same spirit as the Euler product turning a statement about $\zeta$ into a statement about primes.

Take the Fibonacci numbers: $F_0=0$, $F_1=1$, $F_n=F_{n-1}+F_{n-2}$, and $F(z)=\sum_{n\ge0}F_nz^n$. Multiply the recurrence by $z^n$ and sum over $n\ge2$, where the recurrence is valid.

The step that actually needs care is the re-indexing, because each shifted sum leaves behind a power of $z$. Written as an explicit substitution rather than a relabeling:

$$\sum_{n\ge2}F_{n-1}z^n \\;\xrightarrow{\\,m=n-1\\,}\\; \sum_{m\ge1}F_mz^{m+1} = z\sum_{m\ge1}F_mz^m = zF(z)$$

$$\sum_{n\ge2}F_{n-2}z^n \\;\xrightarrow{\\,k=n-2\\,}\\; \sum_{k\ge0}F_kz^{k+2} = z^2\sum_{k\ge0}F_kz^k = z^2F(z)$$

Note the ranges move too: the second substitution drops the lower limit to $k\ge0$, not $k\ge2$. Treating either sum as "$F(z)$ starting from a different index" silently loses the leftover factor of $z$ or $z^2$, and the whole derivation collapses.

The left-hand side is $\sum_{n\ge2}F_nz^n = F(z)-z$, since $F_0=0$ and $F_1=1$. So

$$F(z)-z = zF(z)+z^2F(z) \\;\Longrightarrow\\; F(z)(1-z-z^2)=z \\;\Longrightarrow\\; F(z)=\frac{z}{1-z-z^2}$$

Two independent checks confirm it. Assuming $F(z)=\sum a_nz^n$ and multiplying through by $(1-z-z^2)$, then matching coefficients against $z$ term by term, regenerates the Fibonacci recurrence itself. Numerically, $F_{30}/F_{29}=1.6180339887\ldots$, which is $\varphi$.

## Singularities set the growth rate

Here is where the dictionary earns its keep. Factor the denominator:

$$1-z-z^2 = -\left(z-\tfrac{\sqrt5-1}{2}\right)\left(z+\tfrac{1+\sqrt5}{2}\right)$$

The nearest singularity to the origin sits at $z=\frac{\sqrt5-1}{2}=1/\varphi\approx0.618$, so the radius of convergence is $R=1/\varphi$, and that forces $F_n\sim C\varphi^n$.

That last implication deserves more than an assertion, because "radius of convergence controls growth rate" is easy to say and easy to accept without knowing why. The mechanism is the coefficient-extraction formula, which is just Cauchy's integral formula for derivatives with $z_0=0$, divided by $n!$:

$$a_n = \frac{f^{(n)}(0)}{n!} = \frac{1}{2\pi i}\oint_\gamma \frac{f(z)}{z^{n+1}}\\,dz$$

Apply the ML-estimate to that integral over $|z|=r$ and you get $|F_n|\le M(r)/r^n$ for any $r<R$. The bound holds for every admissible $r$, and $R$ is by definition the exact boundary past which the series fails, so the bound is tight rather than merely an upper limit. The growth rate really is $(1/R)^n = \varphi^n$.

> **Key takeaway:** the location of the nearest singularity of a generating function is the growth rate of its coefficients. One analytic fact, one arithmetic consequence.

The extraction formula also comes with a freedom that the rest of the lesson exploits:

$$F_n = \frac{1}{2\pi i}\oint_{|z|=r}\frac{F(z)}{z^{n+1}}\\,dz \qquad 0<r<\tfrac1\varphi$$

The radius $r$ is yours to choose. Nothing has pinned it down.

## Laplace's method, and Stirling's formula

Before touching contours, the same idea works on the real line, which isolates what is genuinely new: an integrand that concentrates almost all of its mass at one point, a Taylor expansion there, and a Gaussian.

From the Gamma function, $n!=\Gamma(n+1)=\int_0^\infty t^ne^{-t}\\,dt$. The first move is to write the integrand as a single exponential rather than a product, via $t^n=(e^{\ln t})^n=e^{n\ln t}$:

$$t^ne^{-t}=e^{n\ln t}\cdot e^{-t}=e^{g(t)},\qquad g(t)=n\ln t-t$$

Then $g'(t)=\frac nt-1=0$ gives $t^\ast=n$, and $g''(n)=-\frac1n$.

Why does the maximum matter so much? Because $e^{g}$ is exponentially sensitive to $g$. A modest dip in $g$ is a catastrophic collapse in $e^g$, so the integral over $(0,\infty)$ is dominated by a narrow window around the peak: wide in absolute terms, negligible next to the whole half-line.

Taylor-expanding at the peak, where the linear term vanishes because $g'(n)=0$:

$$g(t)\approx g(n)-\frac{1}{2n}(t-n)^2$$

which leaves a Gaussian. Using $\int_{-\infty}^{\infty}e^{-ax^2}\\,dx=\sqrt{\pi/a}$ with $a=\frac1{2n}$ gives $\sqrt{2\pi n}$, and assembling everything:

$$n! \sim \sqrt{2\pi n}\left(\frac ne\right)^n$$

Numerically the relative errors at $n=5,10,20,100$ are $1.65\times10^{-2}$, $8.30\times10^{-3}$, $4.16\times10^{-3}$, and $8.33\times10^{-4}$. Each matches $\frac1{12n}$ to three digits, which is the next term in the full Stirling series.

Two things were quietly assumed and are worth naming rather than skating past. Extending the range from $(0,\infty)$ to $(-\infty,\infty)$ and discarding the higher Taylor terms are both real bounding arguments, not bookkeeping. And $\sim$ means the *ratio* tends to $1$, not the difference: the absolute gap between $n!$ and its approximation grows without bound even while the relative error shrinks to nothing.

## The complex saddle point

Now run the same problem through the extraction formula instead. With $F(z)=e^z=\sum_n z^n/n!$, the coefficient of $z^n$ is $1/n!$:

$$\frac1{n!}=\frac1{2\pi i}\oint_{|z|=r}\frac{e^z}{z^{n+1}}\\,dz$$

Write the integrand as a single exponential again. Careful with the parenthesis: the exponent is $-(n+1)$, not $-n+1$.

$$\frac{e^z}{z^{n+1}} = e^{h(z)},\qquad h(z)=z-(n+1)\ln z$$

Then $h'(z)=1-\frac{n+1}{z}=0$ gives $z^\ast=n+1$, and $h''(z^\ast)=\frac1{n+1}$.

### Why the critical point cannot be a peak

On the real line the critical point was a maximum. In the complex plane it cannot be. The **maximum modulus principle** says a nonconstant holomorphic function cannot attain an interior local maximum of its modulus, which rules out a peak of $|e^{h(z)}|$ immediately. Applying the same principle to $1/e^{h(z)}$, which is legitimate because $e^h$ never vanishes, rules out an interior minimum too.

So $z^\ast$ is an interior critical point that is neither a max nor a min. In one dimension the name for a critical point with no extremum would be an inflection point, but that is a statement about a curve's concavity and it is not what is happening here. On a surface, the object is a **saddle point**: flat to first order in every direction, rising along one axis and falling along the perpendicular one. A mountain pass.

### The path becomes a choice

Since $|e^{h(z)}|=e^{\operatorname{Re}h(z)}$, going "downhill" means decreasing $\operatorname{Re}(h)$ as fast as possible. And which path to take is genuinely up to you, by Cauchy's theorem: the integrand $e^z/z^{n+1}$ has its only singularity at the origin, so any contour looping the origin once without touching it gives the identical integral. Deforming the path costs nothing.

That freedom is the whole method, and the distinction it rests on is sharp. The *value* of the integral is path-independent. The *quality of the Gaussian approximation* is not. Walk downhill through the saddle and you get a sharply decaying peak that Laplace's method handles. Walk uphill through the same point and the integrand grows, the approximation is worthless, and the true value is unchanged the entire time.

To find the descent direction, expand near the saddle with $z-z^\ast=re^{i\theta}$:

$$\operatorname{Re}\big(h(z)-h(z^\ast)\big)=\frac{r^2}{2(n+1)}\cos(2\theta)$$

At $\theta=0$ and $\theta=\pi$, along the real axis, $\cos(2\theta)=1$: steepest ascent. At $\theta=\pi/2$ and $3\pi/2$, along the imaginary axis, $\cos(2\theta)=-1$: steepest descent.

And now the free lunch. The natural contour $|z|=n+1$ crosses the positive real axis exactly at $z^\ast$, and a circle meets a radius at a right angle. The plain, unmodified circle already runs in the steepest-descent direction. No cleverness required.

### Closing the loop

Parametrize the path through the saddle as $z=(n+1)+is$ for real $s$. Then $(z-z^\ast)^2=(is)^2=-s^2$, and that minus sign, supplied by $i^2=-1$, is precisely what makes the exponent a decaying Gaussian. Had the path run along the real axis instead, the same algebra returns $+s^2$ and the integral blows up.

$$\frac1{n!}=\frac1{2\pi i}\int_{-\infty}^{\infty} e^{h(z^\ast)}e^{-s^2/2(n+1)}\\,(i\\,ds)$$

with the two factors of $i$ canceling.

One trap worth flagging: $e^{h(z^\ast)}$ cannot be dropped. It is tempting to think it equals $1$, but that confuses $h'(z^\ast)=0$, which is the equation defining $z^\ast$ and is about the derivative, with $h(z^\ast)$ itself, which is $(n+1)\big(1-\ln(n+1)\big)$. That is a large negative number, and it does essentially all of the work of making $1/n!$ small.

Straightening the circular arc to its tangent line and then extending $s$ to the whole real line is the same tail-truncation argument used in the real case, now applied a second time. Evaluating the Gaussian with $a=\frac1{2(n+1)}$ gives $\sqrt{2\pi(n+1)}$, and assembling:

$$n! \approx \sqrt{2\pi}\\,(n+1)^{n+1/2}\\,e^{-(n+1)}$$

## Two routes, one formula

These two results look different, and they are not. Substituting $m=n+1$ into the real-variable Stirling formula gives $(n+1)!\sim\sqrt{2\pi(n+1)}\big(\frac{n+1}{e}\big)^{n+1}$, and dividing by $(n+1)$ to convert $(n+1)!$ back into $n!$:

$$n! \sim \frac{\sqrt{2\pi}\\,(n+1)^{1/2}\\,(n+1)^{n+1}\\,e^{-(n+1)}}{n+1} = \sqrt{2\pi}\\,(n+1)^{n+1/2}\\,e^{-(n+1)}$$

using $\sqrt{n+1}/(n+1)=(n+1)^{-1/2}$. That is the saddle-point result exactly, not approximately.

> **Key takeaway:** Laplace's method on the real line and steepest descent in the complex plane are the same idea wearing different clothes. The real version finds a peak; the complex version finds a saddle and then chooses a path through it that turns the saddle back into a peak. Two pictures with nothing obvious in common, agreeing term for term, is about as much confirmation as a derivation can offer.
