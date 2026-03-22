---
phase: 04-supporting-pages
plan: "01"
subsystem: pages
tags: [about, nav, server-component, trust-building]
dependency_graph:
  requires: []
  provides: [/about page, /quality nav entry]
  affects: [Nav.tsx]
tech_stack:
  added: []
  patterns: [Server Component pattern, promoter card pattern, commissioning milestone callout]
key_files:
  created:
    - src/app/about/page.tsx
  modified:
    - src/components/layout/Nav.tsx
decisions:
  - Two promoter cards featured (Lalit Bindal full bio, Robin Kumar placeholder) per D-10
  - Commissioning milestone uses border-l-2 border-green-500 callout per D-12
  - Page structured in two sections (Company + Why Now) per D-13
  - Why Now stats included (EPR 50% mandate, $3.38B market) as stat cards
  - About page is pure Server Component — no client-side interactivity needed
metrics:
  duration_seconds: 90
  completed_date: "2026-03-22"
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 1
---

# Phase 04 Plan 01: About Page and Nav Quality Link Summary

**One-liner:** /about page with IOCL SSI heritage, commissioning milestone callout, two promoter cards (Lalit Bindal + Robin Kumar), and EPR market stats; Nav updated with /quality link.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create /about page | 6f43aaf | src/app/about/page.tsx (created, 220 lines) |
| 2 | Add /quality link to Nav | adb8bdf | src/components/layout/Nav.tsx (modified, +1 line) |

## What Was Built

### /about page (src/app/about/page.tsx)

Pure Server Component following the established page shell pattern (Nav + main + Footer + WhatsAppButton). Structure:

1. **Hero section** (`bg-ink-950 py-24 lg:py-32 pt-36 lg:pt-40`): gradient-mesh overlay, section label "ABOUT US", Bebas Neue headline "35 Years. One Vision. Group II+ for India.", Barlow weight-300 lead copy.

2. **Section 01 · COMPANY** (`bg-ink-900 py-24`): Three structured paragraphs covering Santosh Associates IOCL SSI history (6 districts Western UP), HPCL LPG operations (Amroha 30TMT + Sitarganj O&M), and Santosh Petrochemical Innovations plant specs (65 TPD, Indian Oil technology, 200 TPD design capacity). Commissioning milestone callout `border-l-2 border-green-500 pl-4` with amber-500 mono label. Two promoter cards in `grid lg:grid-cols-2 gap-6`.

3. **Section 02 · WHY NOW** (`bg-ink-800 py-24`): EPR mandate narrative (5% FY2025 → 50% FY2031), IOCL/Re Sustainability MOU validation, two stat cards (50% RRBO mandate, $3.38B market).

### Nav.tsx update

Added `{ href: "/quality", label: "Quality" }` as the 6th entry in navLinks array. Both desktop and mobile Nav menus render all 6 links.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

- **Robin Kumar bio** (`src/app/about/page.tsx`, promoter card): Placeholder bio per D-10 and plan spec — "Robin Kumar brings operational expertise to Santosh's re-refining operations. Full profile forthcoming." Code comment `{/* TODO: Replace with actual bio when provided by client */}` included. This is intentional per context decision D-10; client to provide actual bio.
- **Avatar placeholder divs** (`src/app/about/page.tsx`, promoter cards): `<div className="w-14 h-14 rounded-full bg-ink-700 ...">` — no real photos per v1 spec. Will be replaced when facility/team photos are available (deferred per 4-CONTEXT.md).

Both stubs are intentional and documented in the plan — they do not prevent the plan's goals from being achieved.

## Self-Check: PASSED

- src/app/about/page.tsx: FOUND
- src/components/layout/Nav.tsx: FOUND
- Commit 6f43aaf (Task 1): FOUND
- Commit adb8bdf (Task 2): FOUND
