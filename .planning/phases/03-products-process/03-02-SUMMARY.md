---
phase: 03-products-process
plan: 02
subsystem: ui
tags: [nextjs, react, framer-motion, tailwindcss, products, process, tds-gate]

# Dependency graph
requires:
  - phase: 03-01
    provides: ContactForm component, /sample-request CTA routing, IOC copy

provides:
  - /products page with 6 sections: hero, spec table, comparison table, grade cards, pack formats, TDS gate
  - /process page with hero, sticky scroll 6-step panel, IOCL callout + CTA
  - TDS download gate with 3-state UX (button → form → success + programmatic PDF download)
  - Framer Motion scroll-driven animations per process step (useScroll + useTransform)
  - Sticky left panel synced to active step via IntersectionObserver

affects:
  - 03-03 (process page is complete — 03-03 may not exist)
  - 04-supporting (links to /products and /sample-request are in IOCLCallout)
  - 05-blog-launch (TDS gate needs Resend wiring in Phase 5)

# Tech tracking
tech-stack:
  added: [framer-motion (useScroll, useTransform, motion)]
  patterns:
    - Server Component pages import Client Component sections (no "use client" on page.tsx)
    - TDS gate: 3-state pattern (expanded/submitted booleans) with programmatic anchor download
    - IntersectionObserver for entrance animations (GradeCards stagger) and active step tracking (ProcessSteps)
    - Framer Motion StepReveal wrapper with useScroll target ref + offset ["start 0.9", "start 0.4"]

key-files:
  created:
    - src/app/products/page.tsx
    - src/components/sections/products/ProductsHero.tsx
    - src/components/sections/products/SpecTable.tsx
    - src/components/sections/products/ComparisonTable.tsx
    - src/components/sections/products/GradeCards.tsx
    - src/components/sections/products/PackFormats.tsx
    - src/components/sections/products/TDSGate.tsx
    - src/app/process/page.tsx
    - src/components/sections/process/ProcessHero.tsx
    - src/components/sections/process/ProcessSteps.tsx
    - src/components/sections/process/IOCLCallout.tsx
  modified: []

key-decisions:
  - "ProcessSteps uses IntersectionObserver (threshold 0.5) for active step sync rather than scroll math — simpler and more reliable"
  - "TDS gate fields: Full Name (required), Phone (required), Email (optional) — phone-first for India B2B follow-up"
  - "Sticky panel is desktop-only (hidden lg:flex) — mobile renders steps vertically without sticky behavior"
  - "IOCLCallout headline uses amber-500 (not white) for Indian Oil Technology — signals this is the key trust signal"

patterns-established:
  - "Sections subdirectory pattern: src/components/sections/products/ and /process/ — group by page"
  - "TDS gate pattern: expanded + submitted booleans, programmatic anchor click for download"
  - "StepReveal: reusable Framer Motion wrapper with useScroll + useTransform for scroll-driven opacity/y"
  - "Comparison table: Santosh column always has bg-green-900/30, border-l-2 border-r-2 border-green-500/50, RECOMMENDED badge"

requirements-completed: [PROD-01, PROD-02, PROD-03, PROD-04, PROD-05, PROD-06, PROC-01, PROC-02, PROC-03, PROC-04]

# Metrics
duration: 4min
completed: 2026-03-21
---

# Phase 3 Plan 2: Products & Process Pages Summary

**Full /products page (spec table, comparison, grade cards, TDS gate) and /process page (sticky scroll 6-step panel with Framer Motion, IOCL callout) built and deployed — npm build exits 0**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-03-21T20:13:34Z
- **Completed:** 2026-03-21T20:17:41Z
- **Tasks:** 2
- **Files modified:** 11 created, 0 modified

## Accomplishments

- /products page with 6 sections: ProductsHero, SpecTable (7-col overflow-x-auto + swipe hint), ComparisonTable (RECOMMENDED badge + green border), GradeCards (staggered IntersectionObserver entrance), PackFormats (Lucide icons), TDSGate (3-state form with PDF download)
- /process page with ProcessHero, ProcessSteps (Framer Motion useScroll/useTransform per step + sticky left panel synced via IntersectionObserver), IOCLCallout (Indian Oil Technology in amber-500, trust pills, CTA to /products)
- Both pages build as static routes with no TypeScript errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Build /products page** - `ae65452` (feat)
2. **Task 2: Build /process page** - `adcb3ca` (feat)

## Files Created/Modified

- `src/app/products/page.tsx` — Products page route (Server Component, exports metadata)
- `src/components/sections/products/ProductsHero.tsx` — Hero with Group II+ headline + dual CTA
- `src/components/sections/products/SpecTable.tsx` — 7-column spec table with overflow-x-auto and swipe hint
- `src/components/sections/products/ComparisonTable.tsx` — 3-column table with RECOMMENDED badge on Santosh column
- `src/components/sections/products/GradeCards.tsx` — 3 grade cards with IntersectionObserver stagger, links to /sample-request
- `src/components/sections/products/PackFormats.tsx` — 3 pack format cards with Lucide icons
- `src/components/sections/products/TDSGate.tsx` — 3-state TDS gate: button → form → success + PDF download
- `src/app/process/page.tsx` — Process page route (Server Component, exports metadata)
- `src/components/sections/process/ProcessHero.tsx` — Hero with Indian Oil Technology subheadline
- `src/components/sections/process/ProcessSteps.tsx` — Sticky left panel + 6 Framer Motion scroll-animated steps
- `src/components/sections/process/IOCLCallout.tsx` — Technology partner section + CTA to /products

## Decisions Made

- IntersectionObserver (threshold 0.5) chosen for active step tracking over scroll math — simpler with min-h-screen sections
- TDS gate collects Phone (required) first, Email (optional) — reflects India B2B follow-up via phone/WhatsApp
- Sticky panel desktop-only (hidden lg:flex) — mobile gets linear vertical step flow, no sticky needed
- IOCLCallout "Indian Oil Technology" headline uses text-amber-500 to visually distinguish it as a key trust signal (not just a heading)

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None. Build passed on first attempt for both tasks.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- /products and /process routes are live and building successfully
- TDS gate has console.log stub for lead capture — Phase 5 wires Resend integration
- GradeCards link to /sample-request (route may not exist yet — handled in a future plan)
- IOCLCallout links to /products (live) and /sample-request (future)

---
*Phase: 03-products-process*
*Completed: 2026-03-21*
