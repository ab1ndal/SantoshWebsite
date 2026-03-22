---
phase: 05-blog-launch
plan: 03
subsystem: api
tags: [resend, posthog, schema.org, json-ld, sitemap, robots, analytics, email, seo]

# Dependency graph
requires:
  - phase: 05-01
    provides: Sanity client + sanityClient export for sitemap dynamic slug fetching
  - phase: 03-05
    provides: Google Sheets API route pattern (additive Resend integration)

provides:
  - Resend email notifications on all 4 form submission routes
  - TDS download confirmation email to user (D-13)
  - Enquiry notification emails to team for sample-request, contact, collect-pickup (D-14)
  - PostHog analytics init script in root layout (loads on all pages)
  - posthog.capture('tds_download') in TDSGate submit handler
  - posthog.capture('sample_request') in SampleRequestForm submit handler
  - posthog.capture('pickup_booking') in PickupForm submit handler
  - Organization + LocalBusiness JSON-LD in root layout
  - Product JSON-LD on /products page
  - /sitemap.xml with all static routes + dynamic Sanity post slugs
  - /robots.txt disallowing /studio

affects: [05-04, vercel-deployment, seo-verification]

# Tech tracking
tech-stack:
  added: [resend (SDK import — was already installed in 05-01)]
  patterns:
    - Resend integration is additive — Sheets write first, Resend after, try/catch for graceful degradation
    - PostHog via next/script (id required for inline scripts, strategy=afterInteractive)
    - JSON-LD via native <script> tag (NOT next/script) per Next.js docs
    - posthog.capture with typeof window guard to prevent SSR errors
    - sitemap.ts with async default export returning MetadataRoute.Sitemap

key-files:
  created:
    - src/app/sitemap.ts
    - src/app/robots.ts
  modified:
    - src/app/api/sample-request/route.ts
    - src/app/api/contact/route.ts
    - src/app/api/tds-download/route.ts
    - src/app/api/collect-pickup/route.ts
    - src/app/layout.tsx
    - src/app/products/page.tsx
    - src/components/sections/products/TDSGate.tsx
    - src/components/ui/SampleRequestForm.tsx
    - src/components/sections/collect/PickupForm.tsx

key-decisions:
  - "Resend is additive to Sheets writes — all 4 routes still write to Sheets first, Resend fires after (D-15)"
  - "JSON-LD uses native <script> tag not next/script — Next.js docs explicitly recommend this for structured data"
  - "PostHog init script placed inside <body> after {children} with conditional on NEXT_PUBLIC_POSTHOG_KEY env var"
  - "sitemap.ts fetches Sanity posts with try/catch — returns empty array on failure so sitemap still serves"
  - "posthog.capture placed after fetch completes (successful submission) not before — only track actual submissions"

patterns-established:
  - "Graceful degradation: external API failures (Resend) never break form submission success response"
  - "typeof window !== 'undefined' guard for all client-side window.posthog access (SSR safety)"
  - "sitemap.ts async default export with Sanity fetch wrapped in try/catch"

requirements-completed: [INT-01, INT-02, INT-03, INT-04]

# Metrics
duration: 3min
completed: 2026-03-22
---

# Phase 05 Plan 03: Integrations (Resend + PostHog + SEO) Summary

**Resend email notifications on all 4 form routes, PostHog analytics with 3 capture events, Schema.org JSON-LD in layout and products page, and sitemap.ts + robots.ts for SEO**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-22T20:22:09Z
- **Completed:** 2026-03-22T20:25:10Z
- **Tasks:** 3
- **Files modified:** 9 (4 API routes, 2 layout files, 3 form components) + 2 created (sitemap.ts, robots.ts)

## Accomplishments
- All 4 API routes now fire Resend notification emails to team after Sheets write (graceful degradation)
- TDS download route sends user confirmation email with PDF link + WhatsApp CTA (D-13)
- PostHog loads on all pages via next/script; 3 form events tracked (tds_download, sample_request, pickup_booking)
- Schema.org Organization+LocalBusiness JSON-LD in root layout, Product JSON-LD on /products
- Dynamic sitemap includes all 10 static routes + Sanity blog post slugs
- robots.txt protects /studio from crawlers

## Task Commits

Each task was committed atomically:

1. **Task 1: Add Resend email integration to all 4 API routes** - `384f90c` (feat)
2. **Task 2: Add PostHog analytics init, Schema.org JSON-LD, sitemap, and robots.txt** - `0e528f8` (feat)
3. **Task 3: Add posthog.capture() event calls to 3 form submit handlers** - `56cbc3f` (feat)

## Files Created/Modified
- `src/app/api/sample-request/route.ts` - Added Resend import + enquiry notification after Sheets write
- `src/app/api/contact/route.ts` - Added Resend import + enquiry notification after Sheets write
- `src/app/api/tds-download/route.ts` - Added Resend TDS confirmation to user + team notification
- `src/app/api/collect-pickup/route.ts` - Added Resend import + enquiry notification after Sheets write
- `src/app/layout.tsx` - Added PostHog Script (afterInteractive) + Organization JSON-LD (native script)
- `src/app/products/page.tsx` - Added Product JSON-LD (native script)
- `src/app/sitemap.ts` - Created: MetadataRoute.Sitemap with static routes + dynamic Sanity slugs
- `src/app/robots.ts` - Created: MetadataRoute.Robots disallowing /studio
- `src/components/sections/products/TDSGate.tsx` - posthog.capture('tds_download') after successful submit
- `src/components/ui/SampleRequestForm.tsx` - posthog.capture('sample_request') after successful submit
- `src/components/sections/collect/PickupForm.tsx` - posthog.capture('pickup_booking') after successful submit

## Decisions Made
- JSON-LD uses native `<script>` tag (not next/script) per Next.js recommendation — structured data is not executable code
- Resend integration is purely additive — Sheets writes preserved, Resend fires after, failures do not affect user response
- PostHog conditioned on `NEXT_PUBLIC_POSTHOG_KEY` env var — no errors if not set in dev
- sitemap.ts wraps Sanity fetch in try/catch — empty array returned on failure so sitemap still serves static routes

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

The following environment variables must be set in Vercel for production:

- `RESEND_API_KEY` — Resend API key (from resend.com dashboard)
- `FROM_EMAIL` — Verified sender address (e.g., `hello@santosh-domain.com`) — set when domain confirmed
- `NOTIFY_EMAIL_PRIMARY` — Primary notification recipient (Lalit's email)
- `NOTIFY_EMAIL_CC` — Secondary notification recipient (team inbox)
- `NEXT_PUBLIC_POSTHOG_KEY` — PostHog project API key
- `NEXT_PUBLIC_POSTHOG_HOST` — PostHog host (defaults to `https://us.i.posthog.com`)
- `NEXT_PUBLIC_BASE_URL` — Production domain (e.g., `https://santosh-domain.com`)

## Next Phase Readiness
- All non-blog integrations complete (Resend, PostHog, SEO)
- Plan 04 (blog post seed content) can proceed independently
- TypeScript passes with no errors (`npx tsc --noEmit` clean)

---
*Phase: 05-blog-launch*
*Completed: 2026-03-22*
