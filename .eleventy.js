const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const fs = require("fs");
const path = require("path");
const proofs = require("./src/_data/proofs.json");
const lessons = require("./src/_data/lessons.json");
const markdownItAnchor = require("markdown-it-anchor");

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
  { re: /(?<!\\)\\%/, fix: "double it, e.g. \\\\%" },
  { re: /(?<!\\)\\\\(?=\s|$)/, fix: "row breaks need four: \\\\\\\\" },
];

// A SECOND, different failure with the same symptom, found 2026-08-18 porting
// Lesson 11. The patterns above are all backslash-stripping. This one is
// markdown *emphasis*: a bare `*` inside a math span (e.g. `z^*` for a critical
// point) is claimed by markdown-it before KaTeX ever runs, and because emphasis
// needs a pair, two asterisks in the same paragraph take each other out and
// break BOTH math spans. Lesson 11 shipped 121 rendered spans against 123 in
// source and the build was completely clean, because none of the rules above
// look for it. Write \ast instead.
//
// This cannot be checked line-by-line like the others: `*` is legal and common
// in prose, so the scan has to run inside math spans only.
const MATH_SPAN_RE = /\$\$[\s\S]*?\$\$|(?<!\$)\$(?!\$)[\s\S]*?(?<!\$)\$(?!\$)/g;
const BARE_ASTERISK_RE = /(?<!\\)\*/;

// A THIRD failure, same family, found 2026-08-20 fixing Lesson 11:80. KaTeX
// itself (not markdown-it) treats an unescaped % as a LaTeX comment marker,
// truncating everything after it in the span. A single backslash (\%) gets
// stripped bare by markdown-it same as \, \; \: \! above -- caught by the
// pattern in MATH_ESCAPE_PATTERNS -- but a % typed with NO backslash at all
// (easy to do; percentages are common prose) is just as fatal and only shows
// up inside a math span, so it needs the same span-scoped scan as the
// asterisk check above.
const BARE_PERCENT_RE = /(?<!\\)%/;

function checkMathEscapes() {
  const dirs = [path.join(__dirname, "src"), path.join(__dirname, "src", "lessons")];
  const problems = [];
  for (const dir of dirs) {
    for (const file of fs.readdirSync(dir).filter(f => f.endsWith(".md"))) {
      const rel = path.relative(__dirname, path.join(dir, file));
      const src = fs.readFileSync(path.join(dir, file), "utf8");

      src.split("\n").forEach((line, i) => {
        for (const { re, fix } of MATH_ESCAPE_PATTERNS) {
          const m = line.match(re);
          if (m) problems.push(`  ${rel}:${i + 1} — "${m[0]}" (${fix})`);
        }
      });

      for (const m of src.matchAll(MATH_SPAN_RE)) {
        if (!BARE_ASTERISK_RE.test(m[0])) continue;
        const line = src.slice(0, m.index).split("\n").length;
        const snippet = m[0].replace(/\s+/g, " ").slice(0, 60);
        problems.push(
          `  ${rel}:${line} — bare "*" inside math: "${snippet}" ` +
          `(markdown eats it as emphasis; write \\ast)`
        );
      }

      for (const m of src.matchAll(MATH_SPAN_RE)) {
        if (!BARE_PERCENT_RE.test(m[0])) continue;
        const line = src.slice(0, m.index).split("\n").length;
        const snippet = m[0].replace(/\s+/g, " ").slice(0, 60);
        problems.push(
          `  ${rel}:${line} — bare "%" inside math: "${snippet}" ` +
          `(KaTeX reads it as a comment to end of line; write \\\\%)`
        );
      }
    }
  }
  if (problems.length) {
    throw new Error(
      "Math that markdown-it will damage before KaTeX runs:\n" +
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
      `<button type="button" class="proof-btn proof-btn-revealall" data-action="reveal-all">reveal all</button>` +
      `</div>` +
      `<ol class="proof-steps">${steps}</ol>` +
      `</section>`;
  });
  // Looks up the previous/next lesson in reading order for the footer
  // pager. `slug` is a lesson page's `page.fileSlug`, which matches
  // lessons.json's `slug` field 1:1 since lesson filenames are unprefixed.
  eleventyConfig.addFilter("lessonNeighbors", function (slug) {
    const i = lessons.findIndex(l => l.slug === slug);
    if (i === -1) return null;
    return { prev: lessons[i - 1] || null, next: lessons[i + 1] || null };
  });

  // Heading ids on h2s, so the "on this page" tracker (js/page-tracker.js)
  // and direct links have something to point at. Headings can contain raw
  // $...$ KaTeX — the slugify keeps command names but strips TeX punctuation,
  // so "CR check for $e^z$" → "cr-check-for-e-z", not a slug full of
  // backslashes.
  eleventyConfig.amendLibrary("md", md => md.use(markdownItAnchor, {
    level: [2],
    slugify: s => s
      .replace(/\\([a-zA-Z]+)/g, "$1")
      .replace(/[${}^_\\]/g, " ")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
  }));

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
