---
phase: 03-products-process
plan: "05"
subsystem: api
tags: [google-sheets, google-auth-library, service-account, next-api-route, lead-capture, form]

# Dependency graph
requires:
  - phase: 03-04
    provides: SampleRequestForm with validation (name, address, phone required)
provides:
  - POST /api/sample-request — appends form data to Google Sheet via service account auth
  - SampleRequestForm wired to call API before showing success state
affects: [phase-04-supporting-pages, phase-05-blog-launch]

# Tech tracking
tech-stack:
  added: [google-auth-library]
  patterns:
    - "Service account JWT auth for Google APIs: GoogleAuth from google-auth-library, getAccessToken(), Bearer header on Sheets fetch"
    - "Graceful degradation: Sheets write failure returns 200 so user always sees success state; error logged server-side"

key-files:
  created:
    - src/app/api/sample-request/route.ts
  modified:
    - src/components/ui/SampleRequestForm.tsx

key-decisions:
  - "Switched from API key to service account auth (GoogleAuth) — API keys do not support write operations on Google Sheets"
  - "Graceful degradation: Sheets write failure never blocks the user-facing success state — server logs the error, user still sees confirmation"
  - "No googleapis SDK — native fetch + google-auth-library token only keeps bundle lean"
  - "Sheet tab named 'Sample Request' (not default Sheet1) — SHEET_NAME constant updated"

patterns-established:
  - "Service account auth pattern: GoogleAuth with spreadsheets scope, getAccessToken(), Bearer header on native fetch"
  - "Graceful API degradation: non-critical external write failure should not block user success state"

requirements-completed: [PROD-07]

# Metrics
duration: ~45min
completed: 2026-03-21
---

# Phase 03 Plan 05: Google Sheets Lead Capture Summary

**POST /api/sample-request appends sample request leads to Google Sheets via service account auth (google-auth-library), with graceful degradation so failed writes never block the user success state**

## Performance

- **Duration:** ~45 min
- **Started:** 2026-03-21
- **Completed:** 2026-03-21
- **Tasks:** 2 auto tasks + 2 checkpoints (1 human-action pre-completed, 1 human-verify passed)
- **Files modified:** 2 (plus package.json for google-auth-library)

## Accomplishments

- `POST /api/sample-request` route created using Web Request/Response API (Next.js App Router pattern)
- Authenticates via Google service account (GoogleAuth + getAccessToken()) — required for write access to Sheets
- Appends Timestamp | Name | Address | Phone | Email | Grade | Quantity | Application row to "Sample Request" tab
- SampleRequestForm `handleSubmit` made async and wired to call the API route before `setSubmitted(true)`
- Graceful degradation: Sheets write failure logged server-side but returns 200 to client — user always sees success state
- Human verified: rows appear in Google Sheets on form submission

## Task Commits

Each task was committed atomically:

1. **Task 2: Create Google Sheets API route** - `7e01424` (feat)
2. **Task 3: Wire form submission to API route** - `6401b14` (feat)
3. **Deviation: Switch to service account auth** - `ac55bfa` (feat)
4. **Deviation: Update sheet name constant** - `26b93e7` (fix)

**Plan metadata:** `6fa17d5` (docs: complete plan)

## Files Created/Modified

- `src/app/api/sample-request/route.ts` — POST handler using GoogleAuth service account to obtain a Bearer token, then calls Google Sheets v4 append endpoint. Spreadsheet ID: `1oc5WnrHE_MA139bN5X7PF6bEYZCbkNJz8LA5LlO09vI`. Sheet tab: "Sample Request".
- `src/components/ui/SampleRequestForm.tsx` — handleSubmit made async; awaits fetch POST to `/api/sample-request` with form JSON; error caught but never blocks `setSubmitted(true)`

## Decisions Made

- **Service account over API key:** API keys are read-only for Sheets — they cannot authorize write operations. Switched to `google-auth-library` GoogleAuth with `spreadsheets` scope. Requires `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY` env vars.
- **Graceful degradation:** Sheets write failure returns `{ ok: true, warning: "Sheets write failed" }` with status 200. Error logged server-side. User always sees success confirmation.
- **No googleapis SDK:** Native fetch + google-auth-library for auth token only — keeps bundle lean and avoids the full googleapis package.
- **Sheet tab name:** Actual tab is "Sample Request" (not "Sheet1"). `SHEET_NAME` constant updated accordingly.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Switched authentication from API key to service account**
- **Found during:** Task 2 (Create Google Sheets API route)
- **Issue:** Plan specified an API key approach (`GOOGLE_SHEETS_API_KEY`), but Google Sheets API v4 does not allow write operations via API key — write access requires OAuth2 or service account credentials
- **Fix:** Installed `google-auth-library`, implemented `GoogleAuth` with `spreadsheets` scope, obtained a Bearer token per request via `getAccessToken()`, passed it as `Authorization: Bearer` header on the Sheets fetch
- **Files modified:** `src/app/api/sample-request/route.ts`, `package.json`, `package-lock.json`
- **Verification:** Build passed; user confirmed rows appear in Google Sheets after form submission
- **Committed in:** `ac55bfa`

**2. [Rule 1 - Bug] Updated SHEET_NAME from "Sheet1" to "Sample Request"**
- **Found during:** Task 2 (verifying against the actual spreadsheet)
- **Issue:** Plan defaulted `SHEET_NAME` to "Sheet1" but the actual tab is named "Sample Request" — the append endpoint returns a 400 if the range tab name doesn't match
- **Fix:** Updated `SHEET_NAME` constant in `route.ts` to `"Sample Request"`
- **Files modified:** `src/app/api/sample-request/route.ts`
- **Verification:** Rows successfully appended to correct sheet tab (human verified)
- **Committed in:** `26b93e7`

---

**Total deviations:** 2 auto-fixed (2 bugs — both required for the feature to function at all)
**Impact on plan:** Both fixes were necessary for correctness. Auth approach changed but architectural intent (write to Google Sheets) is identical. No scope creep.

## Issues Encountered

- Google Sheets API write permission model: API keys authorize requests only for publicly readable resources; writing requires OAuth2 user credentials or a service account. Resolved by switching to `google-auth-library` service account pattern — the standard approach for server-side Sheets writes.

## User Setup Required

The following env vars must be present in `.env.local` (not committed to git):

```
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

The service account must have Editor access shared on the spreadsheet (`1oc5WnrHE_MA139bN5X7PF6bEYZCbkNJz8LA5LlO09vI`).

## Known Stubs

None — the API route is fully wired and end-to-end verified by user (rows appear in Google Sheets on form submission).

## Next Phase Readiness

- UAT gap 3 closed: all sample request form submissions are recorded in Google Sheets
- PROD-07 requirement complete
- Phase 3 (Products & Process) is fully complete — all 5 plans done and human-verified
- Ready to proceed to Phase 4 — Supporting Pages (About, Quality & Certifications, Sustainability, Used Oil Collection)

---
*Phase: 03-products-process*
*Completed: 2026-03-21*
