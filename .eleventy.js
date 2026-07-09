const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const proofs = require("./src/_data/proofs.json");

module.exports = function (eleventyConfig) {
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
    const steps = proof.steps
      .map((s, i) =>
        `<li class="proof-step" tabindex="-1">` +
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
