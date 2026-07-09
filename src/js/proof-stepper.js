/* Proof stepper: scroll-reveal + cross-step term highlighting.
 *
 * Works on the HTML emitted by the `proofStepper` Eleventy shortcode
 * (see .eleventy.js / src/_data/proofs.json). Three jobs:
 *
 * 1. Reveal each .proof-step as it scrolls into view (IntersectionObserver).
 *    The steps are visible by default; the hidden state is only armed here,
 *    so no-JS readers get the whole proof. Reduced motion: no reveal at all.
 * 2. prev/next buttons as a manual, keyboard-friendly way to walk the steps.
 * 3. Term continuity: classes pf-<tag> are reserved for tagged terms (KaTeX
 *    \htmlClass output in the math, plain spans in the notes, legend chips).
 *    Hovering or focusing any occurrence lights every occurrence of that
 *    term across all steps — the same quantity, the same color, wherever
 *    it appears in the argument.
 */
(function () {
  "use strict";

  const proofEls = document.querySelectorAll(".proof");
  if (!proofEls.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  proofEls.forEach(proof => {
    const steps = Array.from(proof.querySelectorAll(".proof-step"));

    // --- scroll reveal ---
    if (!reduced && "IntersectionObserver" in window) {
      proof.classList.add("proof-animated");
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -15% 0px", threshold: 0.15 });
      steps.forEach(s => io.observe(s));
    }

    // --- manual prev/next fallback ---
    let cursor = -1;
    proof.querySelectorAll(".proof-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const dir = parseInt(btn.getAttribute("data-dir"), 10);
        cursor = Math.min(steps.length - 1, Math.max(0, cursor + dir));
        const step = steps[cursor];
        step.classList.add("is-visible");
        step.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
        step.focus({ preventScroll: true });
      });
    });

    // --- cross-step term highlighting ---
    function tagOf(el) {
      if (!el || !el.closest) return null;
      const hit = el.closest('[class^="pf-"], [class*=" pf-"]');
      if (!hit || !proof.contains(hit)) return null;
      for (const c of hit.classList) {
        if (c.indexOf("pf-") === 0 && c !== "pf-hot") return c;
      }
      return null;
    }

    function setHot(tag, on) {
      proof.querySelectorAll("." + tag).forEach(el => el.classList.toggle("pf-hot", on));
    }

    let hotTag = null;
    proof.addEventListener("mouseover", e => {
      const tag = tagOf(e.target);
      if (tag === hotTag) return;
      if (hotTag) setHot(hotTag, false);
      hotTag = tag;
      if (hotTag) setHot(hotTag, true);
    });
    proof.addEventListener("mouseleave", () => {
      if (hotTag) { setHot(hotTag, false); hotTag = null; }
    });
    proof.addEventListener("focusin", e => {
      const tag = tagOf(e.target);
      if (tag) setHot(tag, true);
    });
    proof.addEventListener("focusout", e => {
      const tag = tagOf(e.target);
      if (tag) setHot(tag, false);
    });
  });
})();
