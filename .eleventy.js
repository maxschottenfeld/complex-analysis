const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const fs = require("fs");
const path = require("path");
const proofs = require("./src/_data/proofs.json");

// markdown-it strips a backslash before any ASCII punctuation *before*
// client-side KaTeX ever sees the page, so \{ \} \, \; \: \! reach the
// browser as bare punctuation and \\ (a matrix row break) reaches it as a
// lone backslash. The damage is easy to miss in review — braces render as
// invisible grouping, thin spaces become literal commas. Convention for
// site markdown: \lbrace and \rbrace for set braces, and double every
// other escape (\\, for a thin space, \\\\ for a row break). This scan
// fails the build with file:line when a single-escaped form sneaks back in.
const MATH_ESCAPE_PATTERNS = [
  { re: /(?<!\\)\\[{}]/, fix: "use \\lbrace / \\rbrace" },
  { re: /(?<!\\)\\[,;:!]/, fix: "double it, e.g. \\\\," },
  { re: /(?<!\\)\\\\(?=\s|$)/, fix: "row breaks need four: \\\\\\\\" },
];

function checkMathEscapes() {
  const dirs = [path.join(__dirname, "src"), path.join(__dirname, "src", "lessons")];
  const problems = [];
  for (const dir of dirs) {
    for (const file of fs.readdirSync(dir).filter(f => f.endsWith(".md"))) {
      const rel = path.relative(__dirname, path.join(dir, file));
      const lines = fs.readFileSync(path.join(dir, file), "utf8").split("\n");
      lines.forEach((line, i) => {
        for (const { re, fix } of MATH_ESCAPE_PATTERNS) {
          const m = line.match(re);
          if (m) problems.push(`  ${rel}:${i + 1} — "${m[0]}" (${fix})`);
        }
      });
    }
  }
  if (problems.length) {
    throw new Error(
      "Single-escaped math sequences found — markdown-it will strip the backslash before KaTeX runs:\n" +
      problems.join("\n")
    );
  }
}

module.exports = function (eleventyConfig) {
  // Catch the markdown-eats-math-escapes porting gotcha before it ships.
  eleventyConfig.on("eleventy.before", checkMathEscapes);

  // Renders a proof from src/_data/proofs.json as a step-by-step walkthrough.
  // Usage in a lesson: {% proofStepper "liouville" %} (plus `proofstepper:
  // true` in frontmatter to load the reveal/highlight script). Steps carry
  // tagged terms — \htmlClass{pf-<tag>}{...} in the math, <span
  // class="pf-<tag>"> in the notes — and each tag keeps one hue across every
  // step, derived from the page hue by stepping around the color wheel.
  // Emitted without blank lines so markdown-it treats it as one raw block.
  eleventyConfig.addShortcode("proofStepper", function (id) {
    const proof = proofs[id];
    if (!proof) throw new Error(`proofStepper: unknown proof "${id}"`);
    const scope = `proof--${id}`;
    const styles = proof.terms
      .map(t => `.${scope} .pf-${t.tag}{--th:calc(var(--h) + ${t.hueOffset});}`)
      .join("");
    const chips = proof.terms
      .map(t => `<button type="button" class="proof-chip pf-${t.tag}">${t.label}</button>`)
      .join("");
    // A step may carry `aha: "<label>"` — the payoff move of the argument.
    // It renders visually distinct (amber rule + wash, uppercase flag), the
    // same convention as .step.aha in the standalone chain visualization.
    const steps = proof.steps
      .map((s, i) =>
        `<li class="proof-step${s.aha ? " proof-step-aha" : ""}" tabindex="-1">` +
        (s.aha ? `<span class="proof-step-aha-tag">${s.aha}</span>` : "") +
        `<span class="proof-step-tag">${i + 1} · ${s.title}</span>` +
        `<div class="proof-step-math">$$${s.math}$$</div>` +
        `<p class="proof-step-note">${s.note}</p>` +
        `</li>`)
      .join("");
    return `<section class="proof ${scope}" data-proof="${id}">` +
      `<style>${styles}</style>` +
      `<p class="proof-kicker">Proof, step by step</p>` +
      `<p class="proof-statement"><strong>${proof.title}.</strong> ${proof.statement}</p>` +
      `<div class="proof-legend"><span class="proof-legend-label">Watch these terms —</span>${chips}</div>` +
      `<div class="proof-controls">` +
      `<button type="button" class="proof-btn" data-dir="-1">&larr; prev step</button>` +
      `<button type="button" class="proof-btn" data-dir="1">next step &rarr;</button>` +
      `</div>` +
      `<ol class="proof-steps">${steps}</ol>` +
      `</section>`;
  });
  // Copy static assets straight through to the build output.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Rewrites absolute URLs (/css/..., /visualizations/...) to include the
  // path prefix when one is set — needed because GitHub Pages serves project
  // sites from /<repo-name>/ rather than the domain root. Locally (no
  // --pathprefix flag) this is a no-op.
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  return {
    // Restrict template processing to markdown + Nunjucks layouts. Without this,
    // Eleventy treats every .html file under the input dir (including the
    // self-contained visualization files) as a Liquid template to render,
    // which mangles their output path and could corrupt embedded JS/CSS.
    templateFormats: ["md", "njk"],
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
};
