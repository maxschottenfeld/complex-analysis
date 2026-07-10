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

## Local development

```bash
npm install
npm run serve   # http://localhost:8080
```

## Deploying

Push to `main`. A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the site and publishes it to GitHub Pages, rewriting internal URLs for the `/complex-analysis/` path prefix.
