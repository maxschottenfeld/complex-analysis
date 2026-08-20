/* Scroll-driven visualization sections, plus the sidebar-hide watch for any
 * wide-breakout content on the page (see the wideEmbeds block below).
 *
 * Markup contract (see lesson 02 for the pilot):
 *   <section class="scrolly scrolly-static" data-scrolly>
 *     <div class="scrolly-figure"><iframe src="..."></iframe></div>
 *     <div class="scrolly-steps">
 *       <div class="scrolly-step" data-state='{"type": ..., ...}'>...</div>
 *       ...
 *     </div>
 *   </section>
 *
 * Sections ship with .scrolly-static in the markup — the flat, no-pin
 * layout is the default for no-JS and reduced-motion readers. This script
 * removes it and takes over only when it can actually drive the section.
 *
 * The figure is pinned by CSS position:sticky (no scroll-jacking, no
 * layout measurement). Step detection is an IntersectionObserver against
 * a band around 40% of the viewport height: when a step enters the band
 * it becomes current and its data-state JSON is posted into the iframe.
 * The embedded visualization owns its own transition easing (and its own
 * prefers-reduced-motion check).
 *
 * Deliberately not GSAP/ScrollTrigger: ScrollTrigger caches absolute
 * trigger positions at refresh time, which makes it sensitive to
 * web-font reflow and scroll restoration. IntersectionObserver needs no
 * position math at all, and discrete enter/leave steps are exactly its
 * job. If a future section needs scroll-scrubbed tweening (not discrete
 * states), that's when GSAP earns its 60KB.
 */
(function () {
  "use strict";

  const sections = document.querySelectorAll("[data-scrolly]");
  // .viz-embed-wide-wrap breaks out to the same wide column as a pinned
  // scrolly figure and sits in the same screen region as the fixed sidebar
  // below — found 2026-08-20: every lesson that ships one (09, 11, plus
  // 01 and 08) has zero [data-scrolly] sections, so the early return above
  // used to bail out before the sidebar-hide observer was even built, and
  // the sidebar sat on top of the embed for the whole page. Watching both
  // kinds together is what actually matches the visual claim the class
  // name makes: something wide is on screen right now.
  const wideEmbeds = document.querySelectorAll(".viz-embed-wide-wrap");
  if (!sections.length && !wideEmbeds.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  // The "on this page" tracker card floats via position:fixed at wide
  // viewports and visually overlaps anything that breaks out past the
  // 760px prose column — the pinned scrolly figure and a standalone wide
  // viz embed both do. Hide it for as long as either kind is on screen,
  // independent of the per-step observer below.
  const activeSections = new Set();
  const visibilityIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) activeSections.add(entry.target);
      else activeSections.delete(entry.target);
    });
    document.body.classList.toggle("wide-content-active", activeSections.size > 0);
  }, { threshold: 0 });
  sections.forEach(section => visibilityIO.observe(section));
  wideEmbeds.forEach(wrap => visibilityIO.observe(wrap));

  sections.forEach(section => {
    const iframe = section.querySelector(".scrolly-figure iframe");
    const steps = Array.from(section.querySelectorAll(".scrolly-step"));
    if (!iframe || !steps.length) return;

    section.classList.remove("scrolly-static");

    let current = -1;
    let frameReady = false;

    function post(i) {
      const raw = steps[i] && steps[i].getAttribute("data-state");
      if (!raw || !frameReady) return;
      try {
        iframe.contentWindow.postMessage(JSON.parse(raw), "*");
      } catch (e) { /* malformed data-state: leave the viz interactive */ }
    }

    function activate(i) {
      if (i === current) return;
      current = i;
      steps.forEach((s, k) => s.classList.toggle("is-active", k === i));
      post(i);
    }

    // The iframe may finish loading after the first activation;
    // re-send the current step's state once it's ready.
    iframe.addEventListener("load", () => {
      frameReady = true;
      if (current >= 0) post(current);
    });
    // Covers the cached case where "load" fired before this script ran.
    // (Same-origin embed; about:blank means the real document isn't in yet.)
    const doc = iframe.contentDocument;
    if (doc && doc.readyState === "complete" && doc.location.href !== "about:blank") {
      frameReady = true;
    }

    // A step becomes current when it crosses into the band between 30%
    // and 55% of the viewport height. Between steps (the gaps are tall),
    // the last active step simply stays current.
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activate(steps.indexOf(entry.target));
      });
    }, { rootMargin: "-30% 0px -45% 0px", threshold: 0 });

    steps.forEach(step => io.observe(step));

    activate(0);
  });
})();
