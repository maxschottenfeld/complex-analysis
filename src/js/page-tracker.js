/* "On this page" tracker for lesson pages.
 *
 * Builds (or extends) the .lesson-side card column with a section list
 * generated from the page's h2 headings, whose ids come from
 * markdown-it-anchor at build time. As the reader scrolls, dots fill in
 * for every section already reached — the same .side-node / .done visual
 * language the Lesson 5a toolkit card established, generalized to every
 * lesson. If a page already ships a hand-built .lesson-side (5a), the
 * tracker card slots in above its existing cards instead of adding a
 * second sidebar.
 *
 * Lesson pages only (detected via the lesson pager), and only when there
 * are at least two h2 sections to track. Pure enhancement: no JS, no
 * tracker, nothing else changes.
 */
(function () {
  const main = document.querySelector("main");
  if (!main || !document.querySelector(".lesson-pager")) return;
  const heads = Array.from(main.querySelectorAll("h2[id]"));
  if (heads.length < 2) return;

  // Headings may hold raw $...$ math — this script runs before KaTeX's
  // DOMContentLoaded auto-render, so textContent is still TeX source.
  // Swap the handful of commands that actually appear in headings, then
  // drop the leftover TeX punctuation so labels read cleanly.
  const TEX = { varepsilon: "ε", epsilon: "ε", delta: "δ", pi: "π", infty: "∞", sum: "Σ" };
  const label = t => t
    .replace(/\\([a-zA-Z]+)/g, (m, c) => (TEX[c] !== undefined ? TEX[c] : c))
    .replace(/[${}]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const card = document.createElement("div");
  card.className = "side-card tracker-card";
  const h3 = document.createElement("h3");
  h3.textContent = "On this page";
  card.appendChild(h3);

  const links = heads.map(h => {
    const a = document.createElement("a");
    a.className = "side-node";
    a.href = "#" + h.id;
    const dot = document.createElement("span");
    dot.className = "dot";
    const lbl = document.createElement("span");
    lbl.className = "lbl";
    lbl.textContent = label(h.textContent);
    a.appendChild(dot);
    a.appendChild(lbl);
    card.appendChild(a);
    return a;
  });

  let side = main.querySelector(".lesson-side");
  if (!side) {
    side = document.createElement("aside");
    side.className = "lesson-side";
    const h1 = main.querySelector("h1");
    if (h1) h1.after(side); else main.prepend(side);
  }
  side.prepend(card);

  // Fill dots for every section at or above the 40%-viewport line (the
  // same band scrolly.js uses for step detection); mark the current one.
  let ticking = false;
  function update() {
    ticking = false;
    const line = window.innerHeight * 0.4;
    let cur = -1;
    heads.forEach((h, i) => { if (h.getBoundingClientRect().top <= line) cur = i; });
    links.forEach((a, i) => {
      a.classList.toggle("done", i <= cur);
      a.classList.toggle("now", i === cur);
    });
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
