# Complex Analysis, Visually

A self-study project by Max Schottenfeld: complex analysis lessons paired with interactive visualizations.

**Live site:** https://maxschottenfeld.github.io/complex-analysis/

## Structure

- `src/index.njk` — homepage
- `src/lessons/` — written lessons (Markdown + KaTeX)
- `src/assets/visualizations/` — self-contained interactive HTML visualizations
- `src/_data/visualizations.json` — drives the gallery: one entry per visualization (slug, title, lesson, description)
- `src/visualizations/index.njk` — gallery page; `src/viz-pages.njk` generates one page per visualization from the data file

## Writing math in lessons

KaTeX runs client-side, *after* markdown-it has already processed the page, and markdown-it strips a backslash before any ASCII punctuation. So single-escaped KaTeX sequences silently break:

- Set braces: write `\lbrace` / `\rbrace`, never `\{` / `\}`
- Thin space: write `\\,`, never `\,` (which renders as a literal comma)
- Matrix row breaks: write `\\\\`, never `\\`
- Percent: write `\\%`, never `\%` (which renders bare and starts a KaTeX comment)

Markdown also claims one character that has nothing to do with backslashes, and it fails the same way:

- Superscript star: write `\ast`, never a bare `*` (as in `z^*`)

That one is **emphasis**, not backslash-stripping. Markdown pairs the asterisks, so two starred quantities in the same paragraph consume each other and break *both* math spans at once. Found 2026-08-18 porting Lesson 11, the first lesson to use starred notation: 13 occurrences, a completely clean build, and 121 rendered spans against 123 in source.

The build fails with a file:line pointer if any of these sneak in (see `checkMathEscapes` in `.eleventy.js`). The asterisk and bare-percent scans run inside math spans only, since both characters are legal in prose.

**A clean build is necessary and not sufficient.** Every rule here is a static scan of the markdown; KaTeX itself runs in the browser. Only the render check below can tell you whether the math actually displayed, and the Lesson 11 case shipped a green build with two broken formulas.

## Writing conventions

House style for lesson prose. New lessons get written to these from the start rather than retrofitted later.

- **Em-dashes.** Budget roughly one per 250 words. Reach for a colon, a comma, or a sentence break first. An em-dash earns its place only when it is genuinely the clearest way to carry an aside.
- **Bold.** Structural only: a term's first-use definition, a worked-example case label (e.g. `**On the unit circle.**`), or a single "Key takeaway" line per section. Never for mid-sentence emphasis on an ordinary word.
- **Headings.** `##` and below are sentence case (`## The radius of convergence, formalized`), with named theorems capitalized as proper nouns (`## The Cauchy Integral Formula`). The page `<h1>` title uses Title Case, a separate convention; don't propagate it downward.

## Verifying a content pass before shipping

Added 2026-08-05, after a review caught what a plain build check missed. A bulk prose trim across nine lessons plus a new lesson port both showed `npm run build` clean and `checkMathEscapes` clean, and still shipped 6 prose regressions (em-dashes replaced by commas where the dash was carrying real sentence-boundary or bracketing work) plus 1 real math error: a wrong exponent inside the one sentence warning the reader to be careful with that exact exponent. Both were caught only by a deeper independent check before merging, not by the build.

**Before trusting any pass over lesson content, whether a bulk edit, a port, or a handoff from elsewhere:**

1. **Diff every math span, not just skim it.** Extract every `$...$` / `$$...$$` span before and after; confirm byte-identical and same-order. A prose pass should never touch math. If a span changed, that's the first thing to look at, not the last.
2. **Render the actual page, not just the build.** `npm run build` passing (including `checkMathEscapes`) only proves the *markup* is well-formed. KaTeX renders client-side, so it proves nothing about whether the math displays. Load each changed lesson page and confirm: 0 `katex-error` elements, 0 leftover unrendered `$`, and a rendered `.katex` count matching the source span count.
3. **Read prose changes for meaning, not just style.** An em-dash-to-comma swap can silently turn a bracketed aside into a comma splice, or bury an either/or inside a four-comma run. Skimming for "does this still sound like a sentence" isn't enough. Read what each changed sentence is actually claiming.
4. **Independently re-derive anything reported as a number** (em-dash counts, bold-span counts, verification claims) rather than trusting the report. The report itself can be wrong about what it checked.

This isn't required for every tiny edit. It's for any pass touching many lines or many files, and for anything ported from teaching notes into public-facing prose, where an error ships silently to a real reader.

## Design decisions

Three choices in `src/css/style.css` that aren't obvious from reading it:

- **Chrome and signal use different color rules.** Links, buttons, and focus rings are a fixed blue on every page. The per-lesson hues from `lessons.json` drive the lesson-card stripes and lesson-page accents only. An earlier version tried to vary link color per lesson, which cost more in "wait, is that a link?" than it bought in theme.
- **The per-lesson accent is OKLCH, not HSL.** Under `hsl(var(--h) 70% 70%)` the same lightness value produced very different perceived brightness around the hue wheel: across the 14 lesson hues, contrast on `#0a0c12` ran from 5.56:1 (hue 240) to 14.29:1 (hue 77), a 2.57x spread from identical CSS. OKLCH's lightness axis is perceptually uniform, so pinning L and C and letting only hue vary flattens that to 8.63:1 through 9.57:1, a spread of 1.11x. The OKLCH block sits behind an `@supports` guard because a custom property holding an unparseable value stays valid until substitution, so the usual two-declaration fallback doesn't work here.
- **Lesson prose is capped at 68 characters per line.** Measured at 82 in a browser before the fix, wide enough that the eye loses its place on the return sweep. Display equations keep the wider column so they don't wrap.

## Adding a visualization

1. Drop the self-contained HTML file into `src/assets/visualizations/`
2. Add an entry for it in `src/_data/visualizations.json`

The gallery card and its dedicated page are generated automatically.

## Interactive patterns

### `?embed` — required for every visualization

Every visualization in `src/assets/visualizations/` must support a compact `?embed` mode, whether or not it's used inside a scrolly section: detect `?embed` in the URL, add a class to `<body>`, and flex-fit the layout to `100vh` with `overflow: hidden` so it **never scrolls internally**, regardless of viewport size. This is a hard convention, not a nice-to-have. `06-isolated-zeros-floor-argument.html` shipped without it once and sat unembedded for a day before the gap was caught, by which point its content was already 3x taller than the standard embed box. Verify actual rendered height against the viewport before calling a build done; don't assume the CSS works.

Two ways a visualization gets embedded:

- **Plain embed.** `<iframe class="viz-embed" src="/assets/visualizations/<slug>.html?embed">` directly in lesson prose. The visualization's own controls stay interactive; nothing external drives it. Use `.viz-embed-wide-wrap` (a wrapper div breaking the iframe out to the same `min(1080px, 100vw - 2.5rem)` width scrolly sections use) instead of the default 760px box when a visualization's controls need more horizontal room to sit beside its diagram rather than wrap below it. See `01-roots-of-unity.html`'s embed, which needs this.
- **Scrolly-driven embed.** A "scrolly" section pins the visualization beside lesson prose that steps through it on scroll (`src/js/scrolly.js`; add `scrolly: true` to a lesson's frontmatter to load it). On top of the base `?embed` requirements above, a scrolly-driven viz also hides its own narration and chrome, since the surrounding lesson prose replaces it, and shows one panel at a time, driven entirely by the host page via `postMessage`. There is one state shape per visualization (`geoseries-state`, `logbranch-state`, `cif-state`, `chain-state`, and so on). Omitted fields keep their current value, so a step can update just the piece that changed. The viz stays user-interactive between messages: a reader can nudge a slider mid-scroll and the next step message picks up from there.

`scrolly.js` also toggles a `body.wide-content-active` class for as long as any scrolly section or `.viz-embed-wide-wrap` is on screen. The "on this page" tracker card (`.lesson-side`, fixed-position at wide viewports) fades out during that window, since its screen region overlaps wide figures by a constant ~132px at any viewport above 1380px.

### Proof stepper

`{% proofStepper "liouville" %}` (shortcode in `.eleventy.js`) renders a proof from `src/_data/proofs.json` as a click-to-reveal walkthrough. Add `proofstepper: true` to the lesson's frontmatter to load `src/js/proof-stepper.js`. Each proof entry has:

- `terms`: tagged quantities (`tag`, `label`, `hueOffset`) that keep one consistent color across every step they appear in, via `\htmlClass{pf-<tag>}{...}` in the math and `<span class="pf-<tag>">` in prose notes.
- `steps`: one entry per step (`title`, `math`, `note`). Steps ship visible in the markup for no-JS readers; the script arms hidden state and reveals them one at a time as "next step" is clicked. Reveals are additive, never re-hidden by "prev step", which only moves focus. A "reveal all" button shows every remaining step at once, for re-readers who don't need the click-through pacing.
- An optional `aha` flag on a step marks the payoff move of the argument. It renders visually distinct (amber rule and wash, uppercase flag), matching the `.step.aha` convention in the standalone chain visualization (`05-liouville-fta-chain.html`).

## Local development

```bash
npm install
npm run serve   # http://localhost:8080
```

## Deploying

Push to `main`. A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the site and publishes it to GitHub Pages, rewriting internal URLs for the `/complex-analysis/` path prefix.
