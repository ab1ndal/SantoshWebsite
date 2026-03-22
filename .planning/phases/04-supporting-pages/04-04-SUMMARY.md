---
phase: 04-supporting-pages
plan: "04"
subsystem: collect-page
tags: [collect, pickup-form, google-sheets, whatsapp-cta, service-area]
dependency_graph:
  requires: []
  provides: [collect-page, collect-pickup-api, pickup-form-component]
  affects: [navigation, footer]
tech_stack:
  added: []
  patterns: [server-component-page, client-form-component, google-sheets-api-route, graceful-degradation]
key_files:
  created:
    - src/app/collect/page.tsx
    - src/components/sections/collect/PickupForm.tsx
    - src/app/api/collect-pickup/route.ts
  modified: []
decisions:
  - /collect page is a Server Component — no client interactivity needed for static sections; PickupForm is the only client island
  - Graceful degradation mirrors sample-request route — Sheets write failure returns 200 with warning field; user always sees success confirmation
  - WhatsApp CTA block uses bg-green-900/20 as visually distinct from floating button
  - Service area presented as text list with green dots (no map) per D-07 decision
  - Form success state shows prominent WhatsApp button (bg-green-500 rounded-lg) per D-09
metrics:
  duration: "2 minutes"
  completed_date: "2026-03-22"
  tasks_completed: 2
  tasks_total: 2
  files_created: 3
  files_modified: 0
---

# Phase 4 Plan 04: Used Oil Collection Page Summary

**One-liner:** /collect page with warm supplier-facing hero, 3-step process, 7-city service area list, PickupForm client component posting to new Google Sheets API route, and page-specific WhatsApp CTA block.

## What Was Built

### Task 1: /api/collect-pickup Route + PickupForm Component

**`src/app/api/collect-pickup/route.ts`** — New API route that mirrors `sample-request/route.ts` exactly:
- Same SPREADSHEET_ID (`1oc5WnrHE_MA139bN5X7PF6bEYZCbkNJz8LA5LlO09vI`)
- `SHEET_NAME = "Collect Pickup"` (writes to a new tab in existing spreadsheet)
- Destructures `{ business, phone, location, quantity, frequency }` from body
- Same GoogleAuth pattern with `GOOGLE_CLIENT_EMAIL` + `GOOGLE_PRIVATE_KEY` env vars
- Graceful degradation: Sheets failure returns `{ ok: true, warning: "Sheets write failed" }` with 200 status

**`src/components/sections/collect/PickupForm.tsx`** — `"use client"` component:
- 5 fields: Business Name (required), Phone (required), Location, Quantity, Frequency (select)
- Frequency options: One-time pickup / Regular (weekly) / Regular (monthly) / Not sure yet
- Validation: `business` and `phone` required with inline error messages
- POSTs to `/api/collect-pickup`
- Success state: green checkmark + "Pickup Scheduled" heading + "We'll be in touch within 24 hours" + WhatsApp CTA button (`wa.me/919810121438`)
- Submit button disabled while submitting (Rule 2 — missing critical UX)

### Task 2: /collect Page

**`src/app/collect/page.tsx`** — Server Component:
- **Metadata:** "Used Oil Collection | Santosh Petrochemical"
- **Hero (bg-ink-950, pt-36):** Bebas Neue headline "We pick up. You get paid. No hassle." + Barlow weight-300 subhead
- **How It Works (bg-ink-900):** 3 step cards in `lg:grid-cols-3` grid — Schedule / We Collect / You Get Paid
- **Service Area (bg-ink-800):** 7 cities with green dots — Delhi NCR, Ghaziabad, Meerut, Muzaffarnagar, Saharanpur, Moradabad, Rampur
- **Pickup Form (bg-ink-900):** 2-column layout — context copy + feature bullets left, `<PickupForm />` card right
- **WhatsApp CTA Block (bg-green-900/20):** "Prefer to chat?" heading, body, "Chat on WhatsApp →" button, above Footer
- Imports: Nav, Footer, WhatsAppButton, PickupForm

## Decisions Made

- `/collect` page is a Server Component — PickupForm is the only client island, all static sections render server-side
- Graceful degradation pattern carried forward from plan 04-05 decision: Sheets failure returns 200 to client with warning field; user always sees success state
- WhatsApp CTA block uses `bg-green-900/20` background to visually distinguish it from the floating `WhatsAppButton` component
- Service area is a text list with green dot indicators (no map), per D-07 — avoids third-party map dependencies
- Form success state features a prominent green button `bg-green-500` (not just a text link) for WhatsApp, per D-09

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical Functionality] Added `submitting` state to disable button during POST**
- **Found during:** Task 1 implementation
- **Issue:** Plan spec showed `disabled={submitting}` on submit button but `submitting` state was only mentioned in the state block — needed to ensure `setSubmitting(true/false)` was wired around the fetch call
- **Fix:** Added `setSubmitting(true)` before fetch, `setSubmitting(false)` after in PickupForm.tsx
- **Files modified:** `src/components/sections/collect/PickupForm.tsx`
- **Commit:** 48e1b81

## Known Stubs

None — all 7 cities are hardcoded as specified. Form POSTs to live API route. WhatsApp links use real number `919810121438`.

## Self-Check

- [x] `src/app/collect/page.tsx` exists
- [x] `src/components/sections/collect/PickupForm.tsx` exists
- [x] `src/app/api/collect-pickup/route.ts` exists
- [x] Commits 48e1b81 and 0400d2a exist in git log
- [x] Build passes (`next build` — `/collect` and `/api/collect-pickup` both appear in route table)

## Self-Check: PASSED
