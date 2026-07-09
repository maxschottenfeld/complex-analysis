const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
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
