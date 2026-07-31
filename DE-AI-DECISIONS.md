# De-AI Pass — Audit Review & Decisions

**Written:** 2026-07-31, after the hallmark audit came back.
**Companion to:** `DE-AI-BRIEF.md` (the prep) — this file is the triage.

---

## Verification: the audit is accurate

Every checkable claim was re-derived independently against `src/css/style.css`. All confirmed:

| Claim | Verified |
| --- | --- |
| `.hero h1 { font-style: italic }` | ✅ line 191 |
| `.hero-inner` centred, padding `6rem … 4.5rem` | ✅ lines 175–176 (top-heavy confirmed) |
| Second hue-shifted gradient | ✅ line 494, `180deg`, same `+50` |
| `.prose p { max-width: 68ch }` never reaches lesson pages | ✅ `.prose` appears only in `src/index.njk`; lessons inherit `main { max-width: 760px }` |
| 38 inline `hsl()` calls | ✅ exactly 38 |
| No `:active` anywhere | ✅ 0 occurrences |
| No `overflow-wrap` anywhere | ✅ 0 occurrences |
| 5 uses of `100vw` | ✅ 5 |
| Scrolly-step contrast 2.90:1 | ✅ recomputed to 2.90:1 |

**Contrast spread — recomputed from `lessons.json`:**

| Lesson | Hue | Accent on `--bg` |
| --- | --- | --- |
| 06 Power series & continuation | 240 | **5.56:1** |
| 04 Cauchy's theorem | 265 | 6.33:1 |
| 00 Big picture | 355 | 7.17:1 |
| 08 Conformal mapping | 292 | 7.51:1 |
| 05 Consequences | 320 | 7.60:1 |
| *(default chrome)* | 215 | 8.15:1 |
| 02 Holomorphic & CR | 185 | 12.67:1 |
| 05a Real-analysis bridge | 145 | 13.03:1 |
| 07 Residues | 100 | 13.36:1 |
| 01 Complex numbers | 55 | **14.24:1** |

Real spread **2.56×** (audit said 2.7×). Two small inaccuracies in the audit's table: it lists a hue `60` at 15.2:1, which isn't in `lessons.json`, and says `#0a0c12` is hardcoded twice when it's three times. Neither changes any conclusion.

**One correction the audit made to `DE-AI-BRIEF.md`, and it's right:** the blue/purple-palette ban is *taste-skill's* rule, not hallmark's. The brief presented it with more authority than it had. Hallmark's colour gates (zero-chroma neutrals, accent footprint) both **pass**. There is no independent support for changing `--h: 215`.

---

## Triage — what to actually do

The audit's own verdict is the most useful sentence in it: *"reads as AI-generated in the hero; disciplined nearly everywhere else."* This is roughly a one-hour job on one component plus two systemic fixes. It does **not** threaten the Lesson 9–12 schedule. Don't let a 16-item list turn it into a redesign.

### Tier 1 — do these (real defects, not taste)

**1. Convert `--accent` to OKLCH.** The single best finding in the audit, and notably it isn't an "AI tell" at all — it's a genuine bug that only exists *because* of the per-lesson hue system. Lesson 6's accent sits at 5.56:1 while Lesson 1's is 14.24:1 from identical CSS. Lesson 6 is within striking distance of the 4.5:1 floor. OKLCH flattens this because its lightness axis is perceptually uniform. Small, systemic, measurable before/after.

**2. Fix `.scrolly-step { opacity: 0.35 }`.** Computes to 2.90:1 — below the 4.5:1 AA body floor on the default path. It's already restored under `prefers-reduced-motion` and `.scrolly-static`, so the fix is raising the default. Affects Lessons 2–5.

**3. Remove *both* gradients (lines 329 and 494), not one.** At `--h: 215` the endpoints are `rgb(76,144,240) → rgb(144,76,240)` — literally blue-to-violet, hallmark's named gate 2, no genre exemption. Line 494 is on the lesson cards, the more prominent component. Removing one and keeping the other is worse than doing nothing.

**4. Lesson measure — verify, then fix.** `.prose p { max-width: 68ch }` is correct but never applies to lesson pages, which run ~85ch. This affects the ten pages that matter most. **Measure it in a real browser first** — the 85ch figure is an estimate from font metrics, not a measurement.

### Tier 2 — cheap, do if there's time

- `overflow-wrap: break-word` on display headings ("Cauchy–Riemann" overflows at 320px)
- `:active` states (currently zero in the file)
- Colour-token consolidation — 38 inline `hsl()` calls, eight ad-hoc lightness/saturation pairs, `#0a0c12` written as a literal three times plus seven `rgba(10,12,18,…)`. **Zero rendered-pixel change.** The file's own header comment claims "No colors picked off a palette," which is true of the hue and false of everything else. Worth doing mostly to make the system honest before someone reads the CSS.

### Tier 3 — judgment calls, decide by looking

**Centred hero (gate 6, auto-fail) — I'd take this one seriously.** A fully centred vertical axis with eyebrow, h1, tagline, CTAs and caption all stacked is the most generic hero shape there is, and it's the first thing anyone sees. Moving the eyebrow or the CTA pair off-axis is a small change with outsized effect on first impression. **Highest-leverage aesthetic change in the whole list.**

**Italic `h1` — I'd push back on hallmark here, mildly.** The audit offered the math-variable defence and then hedged; I think the defence is weaker than it sounds, because display italic on a masthead isn't the same thing as italic notation in an equation. But "italic display type is an AI tell" is a rule with a short shelf life, and this is one reversible line. **Try it both ways and look at it.** Don't change it because a gate said so.

**`--h: 215` — no longer supported.** Hallmark is silent and its colour gates pass. The chrome-vs-signal question from the brief is still a real design question, but nothing in this audit obliges an answer. Deprioritised.

### Don't bother

Spacing/easing tokens, nav fingerprint (gate 42 — the audit already downgraded it correctly), side-stripe widths, `100vw` scrollbar arithmetic, `overflow-x: clip`. Real, minor, and pure churn against a 24-day deadline.

---

## What's still untouched

**The prose.** 348 em-dashes and 432 bold markers across ten lessons — see `DE-AI-BRIEF.md`. The hallmark audit was CSS-only by design. This remains the larger finding: the site's writing is a stronger AI signal than its stylesheet, and it's the thing a reader actually experiences.

Session 2 (humanizer on Lesson 8) is unchanged and still the higher-value half of this work.

---

## Handoff prompt — implementation session

```
Read DE-AI-DECISIONS.md and DE-AI-BRIEF.md in this repo.

Implement Tier 1 only. Work on a branch. Do not touch Tier 2 or Tier 3.

1. Convert --accent and --accent-dim to OKLCH so perceived lightness is
   constant across the per-lesson hues. Before you commit, print the
   computed contrast ratio of the accent against --bg for all ten hues in
   lessons.json, before and after, so I can see the spread flatten.

2. Raise .scrolly-step's default opacity until it clears 4.5:1 against
   --surface. Show me the computed ratio.

3. Remove the hue-shifted gradients at style.css:329 and style.css:494.
   Both. Replace with a flat accent derived from the same token.

4. Measure the real rendered line length of a lesson page in a browser
   (not an estimate from font metrics). If it's above 75ch, bring it into
   range. If it's already in range, say so and change nothing.

After each change: run the build, confirm checkMathEscapes passes, and
preview. Show me the full diff before committing. Nothing goes to main
without me looking at it.
```

*Model: **Opus.** Items 1 and 4 need measurement and judgment, not pattern-matching.*
