# Complex Analysis, Visually

A self-study project by Max Schottenfeld — complex analysis lessons paired with interactive visualizations.

**Live site:** https://maxschottenfeld.github.io/complex-analysis/

## Structure

- `src/index.njk` — homepage
- `src/lessons/` — written lessons (Markdown + KaTeX)
- `src/assets/visualizations/` — self-contained interactive HTML visualizations
- `src/_data/visualizations.json` — drives the gallery: one entry per visualization (slug, title, lesson, description)
- `src/visualizations/index.njk` — gallery page; `src/viz-pages.njk` — generates one page per visualization from the data file

## Writing math in lessons

KaTeX runs client-side, *after* markdown-it has already processed the page — and markdown-it strips a backslash before any ASCII punctuation. So single-escaped KaTeX sequences silently break:

- Set braces: write `\lbrace` / `\rbrace`, never `\{` / `\}`
- Thin space: write `\\,`, never `\,` (which renders as a literal comma)
- Matrix row breaks: write `\\\\`, never `\\`

The build fails with a file:line pointer if one of these sneaks in (see `checkMathEscapes` in `.eleventy.js`).

## Adding a visualization

1. Drop the self-contained HTML file into `src/assets/visualizations/`
2. Add an entry for it in `src/_data/visualizations.json`

The gallery card and its dedicated page are generated automatically.

## Interactive patterns

### `?embed` — required for every visualization

Every visualization in `src/assets/visualizations/` must support a compact `?embed` mode, whether or not it's used inside a scrolly section: detect `?embed` in the URL, add a class to `<body>`, and flex-fit the layout to `100vh` with `overflow: hidden` so it **never scrolls internally**, regardless of viewport size. This is a hard convention, not a nice-to-have — `06-isolated-zeros-floor-argument.html` shipped without it once and sat unembedded for a day before the gap was caught, and by then its content was already 3x taller than the standard embed box. Verify actual rendered height against the viewport before calling a build done; don't assume the CSS works.

Two ways a visualization gets embedded:

- **Plain embed** — `<iframe class="viz-embed" src="/assets/visualizations/<slug>.html?embed">` directly in lesson prose. The visualization's own controls stay interactive; nothing external drives it. Use `.viz-embed-wide-wrap` (a wrapper div breaking the iframe out to the same `min(1080px, 100vw - 2.5rem)` width scrolly sections use) instead of the default 760px-wide box when a visualization's controls need more horizontal room to sit beside its diagram rather than wrap below it (see `01-roots-of-unity.html`'s embed, which needs this).
- **Scrolly-driven embed** — a "scrolly" section pins the visualization beside lesson prose that steps through it on scroll (`src/js/scrolly.js`; add `scrolly: true` to a lesson's frontmatter to load it). On top of the base `?embed` requirements above, a scrolly-driven viz also hides its own narration/chrome (the surrounding lesson prose replaces it) and shows one panel/section at a time, driven entirely by the host page via `postMessage` — one state shape per visualization (`geoseries-state`, `logbranch-state`, `cif-state`, `chain-state`, …). Omitted fields keep their current value, so a step can update just the piece that changed. The viz stays user-interactive between messages — a reader can nudge a slider mid-scroll and the next step message picks up from there. `scrolly.js` also toggles a `body.scrolly-active` class for as long as any scrolly section is on screen — the "on this page" tracker card (`.lesson-side`, fixed-position at wide viewports) fades out during that window since its screen region can overlap the pinned scrolly figure.

### Proof stepper

`{% proofStepper "liouville" %}` (shortcode in `.eleventy.js`) renders a proof from `src/_data/proofs.json` as a click-to-reveal walkthrough — add `proofstepper: true` to the lesson's frontmatter to load `src/js/proof-stepper.js`. Each proof entry has:

- `terms`: tagged quantities (`tag`, `label`, `hueOffset`) that keep one consistent color across every step they appear in, via `\htmlClass{pf-<tag>}{...}` in the math and `<span class="pf-<tag>">` in prose notes.
- `steps`: one entry per step (`title`, `math`, `note`). Steps ship visible in the markup for no-JS readers; the script arms hidden state and reveals them one at a time as "next step" is clicked (reveals are additive — never re-hidden by "prev step", which only moves focus). A "reveal all" button shows every remaining step at once, for re-readers who don't need the click-through pacing.
- An optional `aha` flag on a step marks the payoff move of the argument — it renders visually distinct (amber rule + wash, uppercase flag), matching the `.step.aha` convention in the standalone chain visualization (`05-liouville-fta-chain.html`).

## Local development

```bash
npm install
npm run serve   # http://localhost:8080
```

## Deploying

Push to `main`. A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the site and publishes it to GitHub Pages, rewriting internal URLs for the `/complex-analysis/` path prefix.
