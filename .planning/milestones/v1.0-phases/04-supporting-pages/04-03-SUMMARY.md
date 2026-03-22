---
phase: 04-supporting-pages
plan: 03
subsystem: sustainability-page
tags: [sustainability, animation, framer-motion, intersection-observer, svg, epr]
dependency_graph:
  requires: []
  provides: [sustainability-page, epr-progress-bars, circular-economy-svg]
  affects: [nav, footer]
tech_stack:
  added: []
  patterns: [server-component-plus-client-islands, intersection-observer-css-transition, framer-motion-svg-dash-animation]
key_files:
  created:
    - src/app/sustainability/page.tsx
    - src/components/sections/sustainability/EPRProgressBars.tsx
    - src/components/sections/sustainability/CircularEconomySVG.tsx
  modified: []
decisions:
  - "EPRProgressBars uses IntersectionObserver + CSS transition (NOT Framer Motion) — exact pattern from SustainabilitySnapshot.tsx per plan spec"
  - "CircularEconomySVG uses Framer Motion motion.path with strokeDashoffset animation for continuous loop; node reveal uses CSS opacity/translateY on scroll"
  - "CO2 stat uses 66% energy savings figure from TEV Report/DPR — already established in SustainabilitySnapshot.tsx, cited with source"
  - "/sustainability page is Server Component with no use client directive; client islands imported as components"
metrics:
  duration_seconds: 167
  completed_date: "2026-03-22T05:52:20Z"
  tasks_completed: 2
  tasks_total: 2
  files_created: 3
  files_modified: 0
---

# Phase 4 Plan 03: Sustainability Page Summary

**One-liner:** Sustainability page with IntersectionObserver-animated EPR mandate progress bars (FY2025 5% to FY2031 50%), Framer Motion circular economy SVG loop, research-cited 66% energy savings stat, and IOCL MOU callout.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Create EPRProgressBars and CircularEconomySVG client components | 7f096f4 | `EPRProgressBars.tsx`, `CircularEconomySVG.tsx` |
| 2 | Create /sustainability page composing client islands with CO2 stat and IOCL callout | 61597f4 | `src/app/sustainability/page.tsx` |

## What Was Built

### EPRProgressBars.tsx
Client component using the exact IntersectionObserver + CSS transition pattern from `SustainabilitySnapshot.tsx`. 4 milestone bars (FY2025 5%, FY2027 15%, FY2029 30%, FY2031 50%) fill on scroll with staggered delays. Final bar (FY2031) uses `bg-gradient-to-r from-green-600 to-green-400`; intermediate bars use `bg-green-700`. 2-column layout: narrative text (EPR mandate context) left, animated bars right. Background radial glow accent.

### CircularEconomySVG.tsx
Client component with Framer Motion `motion.path` animating `strokeDashoffset` in an infinite loop (duration 3s) for the connecting path. 4 nodes in diamond layout: "Used Oil Collected" (top), "Re-Refined at Santosh" (right), "Back Into Engines" (bottom), "Collected Again" (left). Amber dashed return arc (`stroke="#f59e0b" strokeDasharray="4 3"`). Node boxes reveal on scroll via IntersectionObserver + CSS opacity/translateY transition with 100ms stagger. SVG `viewBox="0 0 400 400"`.

### /sustainability page.tsx
Server Component (no `"use client"`) composing both client islands. 4 sections:
1. **Hero** — `bg-ink-950 pt-36 lg:pt-40` with green gradient overlay, environmental opportunity headline per D-04
2. **EPRProgressBars** — self-contained with own section wrapper
3. **CircularEconomySVG** — self-contained with own section wrapper
4. **Environmental Impact** — `bg-ink-800/50`, 66% energy savings stat in amber Bebas Neue + source citation, zero waste stat, IOCL MOU callout with green border

## Verification

Build result: `✓ Generating static pages (14/14)` — `/sustainability` renders as static content. TypeScript compilation clean.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all sections render real content. The CO2/energy stat uses the 66% figure from the project DPR (established in SustainabilitySnapshot.tsx), cited with source. No fabricated numerical data.

## Self-Check: PASSED
