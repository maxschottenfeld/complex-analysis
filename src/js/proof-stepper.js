/* Proof stepper: click-to-reveal steps + cross-step term highlighting.
 *
 * Works on the HTML emitted by the `proofStepper` Eleventy shortcode
 * (see .eleventy.js / src/_data/proofs.json). Three jobs:
 *
 * 1. Click-to-reveal: steps ship visible in the markup (no-JS readers get
 *    the whole proof); this script arms the hidden state and "next step"
 *    reveals them one at a time. Reveals are additive — a revealed step
 *    never hides again — and "prev step" only walks focus back, it never
 *    un-reveals. (Same model as the Next-step buttons in the standalone
 *    FTA/Liouville chain visualization.) Reduced motion: steps still
 *    reveal on click, just without the fade/slide animation.
 * 2. A "n / m" progress readout between the prev/next buttons.
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
    const controls = proof.querySelector(".proof-controls");
    const btnPrev = proof.querySelector('.proof-btn[data-dir="-1"]');
    const btnNext = proof.querySelector('.proof-btn[data-dir="1"]');

    // --- click-to-reveal ---
    // Arm the hidden state only now that JS is definitely running.
    proof.classList.add("proof-interactive");
    if (!reduced) proof.classList.add("proof-animated");

    const progress = document.createElement("span");
    progress.className = "proof-progress";
    if (controls && btnNext) controls.insertBefore(progress, btnNext);

    let shown = 0;    // how many steps are revealed (never decreases)
    let cursor = -1;  // the step the reader is "on"

    function update() {
      progress.textContent = shown + " / " + steps.length;
      if (btnPrev) btnPrev.disabled = cursor <= 0;
      if (btnNext) btnNext.disabled = shown >= steps.length && cursor >= steps.length - 1;
    }

    function goTo(i, focus) {
      const step = steps[i];
      step.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
      if (focus) step.focus({ preventScroll: true });
    }

    function reveal() {
      const step = steps[shown];
      shown++;
      cursor = shown - 1;
      step.classList.add("is-shown");
      /* force layout so the fade/slide transition actually runs */
      void step.offsetWidth;
      step.classList.add("is-visible");
      goTo(cursor, true);
      update();
    }

    if (btnNext) btnNext.addEventListener("click", () => {
      if (cursor < shown - 1) { cursor++; goTo(cursor, true); }   // walked back earlier: move forward first
      else if (shown < steps.length) reveal();
      update();
    });

    if (btnPrev) btnPrev.addEventListener("click", () => {
      if (cursor > 0) { cursor--; goTo(cursor, true); }
      update();
    });

    update();

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
