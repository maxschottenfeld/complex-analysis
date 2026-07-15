# Complex Analysis, Visually

A self-study project by Max Schottenfeld — complex analysis lessons paired with interactive visualizations, built alongside Claude.

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

### Scrolly + `?embed`

A "scrolly" section pins a visualization beside lesson prose that steps through it on scroll (`src/js/scrolly.js`; add `scrolly: true` to a lesson's frontmatter to load it). The visualization is embedded as `<iframe src="/assets/visualizations/<slug>.html?embed">` — every scrolly-driven viz supports this `?embed` query:

- Flex-fits to `100vh`, never scrolls internally (the host page's steps do the narrating).
- Own narration/chrome hidden — the surrounding lesson prose replaces it.
- Shows one panel/section at a time, driven entirely by the host page.

The host page talks to the embedded viz with `postMessage`, one state shape per visualization (`geoseries-state`, `logbranch-state`, `cif-state`, `chain-state`, …). Omitted fields keep their current value, so a step can update just the piece that changed. The viz stays user-interactive between messages — a reader can nudge a slider mid-scroll and the next step message picks up from there.

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
