---
phase: 03-products-process
plan: "05"
subsystem: api
tags: [google-sheets, fetch, next-api-route, lead-capture, form]

# Dependency graph
requires:
  - phase: 03-04
    provides: SampleRequestForm with validation (name, address, phone required)
provides:
  - POST /api/sample-request — appends form data to Google Sheet with timestamp
  - SampleRequestForm wired to call API before showing success state
affects: [phase-04-supporting-pages, phase-05-blog-launch]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Graceful degradation: Sheets write failure returns 200 so user always sees success state; error logged server-side"
    - "Native fetch in Next.js App Router API route (no extra dependencies)"

key-files:
  created:
    - src/app/api/sample-request/route.ts
  modified:
    - src/components/ui/SampleRequestForm.tsx

key-decisions:
  - "Graceful degradation: Sheets write failure never blocks the user-facing success state — server logs the error, user still sees confirmation"
  - "No npm packages needed — native fetch available in Node 18+ / Next.js App Router"
  - "SHEET_NAME constant defaults to Sheet1 — update if tab name differs"

patterns-established:
  - "API-key-based Google Sheets append via v4 REST API (no SDK dependency)"
  - "Async handleSubmit with fire-and-forget-style fetch (error caught, user flow unaffected)"

requirements-completed: [PROD-07]

# Metrics
duration: 15min
completed: 2026-03-21
---

# Phase 03 Plan 05: Google Sheets Lead Capture Summary

**Google Sheets API route (POST /api/sample-request) + SampleRequestForm wired via async fetch, with graceful degradation so failed Sheets writes never block the success state**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-21T05:00:00Z
- **Completed:** 2026-03-21T05:15:00Z
- **Tasks:** 2 auto tasks + 1 pre-completed human-action checkpoint
- **Files modified:** 2

## Accomplishments
- `POST /api/sample-request` route created using Web Request/Response API (Next.js App Router pattern)
- Appends Timestamp | Name | Address | Phone | Email | Grade | Quantity | Application row to Google Sheet
- SampleRequestForm `handleSubmit` made async and wired to call the API route before `setSubmitted(true)`
- Graceful degradation: Sheets write failure logged server-side but returns 200 to client — user always sees success state

## Task Commits

Each task was committed atomically:

1. **Task 2: Create Google Sheets API route** - `7e01424` (feat)
2. **Task 3: Wire form submission to API route** - `6401b14` (feat)

**Plan metadata:** (included in final docs commit)

## Files Created/Modified
- `src/app/api/sample-request/route.ts` — POST handler that reads GOOGLE_SHEETS_API_KEY from env, builds a row, and appends to the Google Sheet via Sheets API v4
- `src/components/ui/SampleRequestForm.tsx` — handleSubmit made async; POSTs form JSON to /api/sample-request; error caught but never blocks setSubmitted(true)

## Decisions Made
- Graceful degradation: Sheets write failure returns 200 to client with a warning field. Error logged server-side. User always sees the success confirmation.
- No additional npm packages installed — native fetch is sufficient in Node 18+ (Next.js App Router).
- SHEET_NAME constant set to "Sheet1" — update the constant if the actual sheet tab name differs.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

Google Cloud setup was completed by the user before Task 2 execution:
- Google Sheets API enabled in Cloud Console
- API key created and restricted to Sheets API
- Spreadsheet shared with editor access
- `.env.local` created with `GOOGLE_SHEETS_API_KEY=...`
- Header row added to spreadsheet row 1: Timestamp | Name | Address | Phone | Email | Grade | Quantity | Application

## Known Stubs

None — the API route is fully wired. End-to-end verification (checkpoint:human-verify) is pending user confirmation that a live form submit appends a row to the Google Sheet.

## Next Phase Readiness
- Phase 3 (Products & Process) is complete pending end-to-end human verification of the Sheets write
- Phase 4 — Supporting Pages (About, Quality & Certifications, Sustainability, Used Oil Collection) can begin once user confirms the Sheets integration works
- No blockers for Phase 4 — it has no dependency on the Sheets verification outcome

---
*Phase: 03-products-process*
*Completed: 2026-03-21*
