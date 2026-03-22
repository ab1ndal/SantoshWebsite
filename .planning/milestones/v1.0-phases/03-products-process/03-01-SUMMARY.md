---
phase: 03-products-process
plan: 01
subsystem: ui
tags: [react, nextjs, tailwind, components, contact-form]

# Dependency graph
requires:
  - phase: 02-homepage
    provides: FooterCTA.tsx, Nav.tsx, Footer.tsx, Hero.tsx, AudienceCards.tsx, ProcessTeaser.tsx
provides:
  - ContactForm shared client component at src/components/ui/ContactForm.tsx
  - Placeholder PDF at public/santosh-tds-placeholder.pdf
  - All site-wide CTA hrefs updated to /sample-request and /contact
  - ProcessTeaser body copy updated to Indian Oil Technology (no REVA)
affects: [03-02-products, 03-03-process, 04-supporting-pages, 05-blog-launch]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Shared form components in src/components/ui/ — ContactForm owns its own state"
    - "FooterCTA as pure layout wrapper, delegates form logic to ContactForm"

key-files:
  created:
    - src/components/ui/ContactForm.tsx
    - public/santosh-tds-placeholder.pdf
  modified:
    - src/components/sections/FooterCTA.tsx
    - src/components/layout/Nav.tsx
    - src/components/layout/Footer.tsx
    - src/components/sections/ProcessTeaser.tsx
    - src/components/sections/Hero.tsx
    - src/components/sections/AudienceCards.tsx

key-decisions:
  - "ContactForm is a standalone 'use client' component — owns submitted/form state; FooterCTA is pure layout"
  - "Indian Oil Technology replaces REVA Process Technologies per D-02 (ProcessTeaser + Hero trust strip)"
  - "All 'Request a Sample' CTAs route to /sample-request per D-27; Contact routes to /contact per D-28"
  - "CertificationsStrip REVA reference deferred — not in plan scope, tracked in deferred-items.md"

patterns-established:
  - "Shared UI components in src/components/ui/ — reusable across pages (/contact, FooterCTA)"
  - "Form state encapsulated in leaf component, not parent section"

requirements-completed: [PROD-06, PROC-03]

# Metrics
duration: 3min
completed: 2026-03-21
---

# Phase 3 Plan 01: Foundation — ContactForm + CTA Updates Summary

**Shared ContactForm component extracted from FooterCTA, placeholder PDF created, and all site-wide Request Sample CTAs updated to /sample-request with Indian Oil Technology copy replacing REVA**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-21T20:07:22Z
- **Completed:** 2026-03-21T20:10:03Z
- **Tasks:** 2
- **Files modified:** 7 (6 modified + 1 created component + 1 PDF)

## Accomplishments
- Extracted ContactForm as standalone "use client" component with self-contained state — ready for import by /contact page (Wave 3)
- Placeholder PDF at public/santosh-tds-placeholder.pdf — TDS download gate can reference this immediately
- All "Request a Sample" CTAs (Nav desktop, Nav mobile, Hero, AudienceCards, Footer) now route to /sample-request per D-27
- ProcessTeaser body copy now reads "Indian Oil Technology powers our plant..." — REVA brand removed per D-02
- Footer Company column now includes "Contact Us" → /contact per D-28

## Task Commits

Each task was committed atomically:

1. **Task 1: Extract ContactForm + create placeholder PDF** - `194f8b5` (feat)
2. **Task 2: Site-wide CTA href updates + REVA→IOC copy fix** - `35ad64e` (feat)
3. **Auto-fix: Hero trust strip REVA → Indian Oil Technology** - `bc033a5` (fix)

**Plan metadata:** _(to follow)_

## Files Created/Modified
- `src/components/ui/ContactForm.tsx` — Shared contact form component; "use client" with submitted/form state, success state, 4 fields + submit button
- `public/santosh-tds-placeholder.pdf` — Minimal valid PDF placeholder for TDS download gate
- `src/components/sections/FooterCTA.tsx` — Stripped of form state/JSX; now imports and renders ContactForm
- `src/components/layout/Nav.tsx` — Both desktop and mobile "Request Sample" CTAs → /sample-request
- `src/components/layout/Footer.tsx` — "Request a Sample" → /sample-request; "Contact Us" added to Company column
- `src/components/sections/ProcessTeaser.tsx` — "Indian Oil Technology powers our plant..." replaces REVA copy
- `src/components/sections/Hero.tsx` — "Request a Sample" CTA → /sample-request; trust strip "REVA Process Technology" → "Indian Oil Technology"
- `src/components/sections/AudienceCards.tsx` — Lubricant Blenders "Request a Sample" → /sample-request

## Decisions Made
- ContactForm owns its own state — FooterCTA becomes a pure layout wrapper. This enables both FooterCTA and /contact page to import the same form with zero code duplication.
- Indian Oil Technology replaces REVA in all body copy per D-02. REVA remains only in CertificationsStrip (deferred — out of scope for this plan).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Hero trust strip still referenced REVA after Task 2 completion**
- **Found during:** Post-task grep verification (`grep -r "REVA" src/`)
- **Issue:** Hero.tsx contained `{ label: "REVA Process Technology", icon: "✓" }` in the trust strip — outside the CTA href update scope but within the Hero.tsx file assigned to Task 2
- **Fix:** Updated to `{ label: "Indian Oil Technology", icon: "✓" }` per D-02
- **Files modified:** src/components/sections/Hero.tsx
- **Verification:** Grep confirms no REVA in Hero.tsx; build passes
- **Committed in:** bc033a5

---

**Total deviations:** 1 auto-fixed (Rule 1 — bug/incorrect copy in Hero trust strip)
**Impact on plan:** Fix applied D-02 correctly to full Hero.tsx scope. No scope creep.

## Known Stubs
- `public/santosh-tds-placeholder.pdf` — Minimal blank PDF placeholder. Actual product TDS document needed before /products page TDS download gate ships. This is intentional; Phase 5 (Resend integration) will gate the real document.
- `ContactForm.tsx` handleSubmit logs to console only — Resend wiring is explicitly deferred to Phase 5.

## Issues Encountered
- CertificationsStrip.tsx contains `{ label: "REVA Technology", sub: "European Process Certified" }` — not in plan scope, tracked in `.planning/phases/03-products-process/deferred-items.md`

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Wave 2 can proceed: /products page can import ContactForm from `@/components/ui/ContactForm`; /process page has correct IOC copy in ProcessTeaser
- Wave 3 can proceed: /sample-request and /contact pages have correct routing targets ready
- CertificationsStrip REVA reference should be updated before site launch

## Self-Check: PASSED

- FOUND: src/components/ui/ContactForm.tsx
- FOUND: public/santosh-tds-placeholder.pdf
- FOUND: .planning/phases/03-products-process/03-01-SUMMARY.md
- FOUND commit: 194f8b5 (Task 1)
- FOUND commit: 35ad64e (Task 2)
- FOUND commit: bc033a5 (Auto-fix: Hero trust strip)

---
*Phase: 03-products-process*
*Completed: 2026-03-21*
