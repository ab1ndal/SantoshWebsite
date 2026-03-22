---
phase: 05-blog-launch
plan: 04
subsystem: content
tags: [sanity, blog, seed-content, resend, vercel, deployment]

# Dependency graph
requires:
  - phase: 05-02
    provides: /insights listing + [slug] post pages built, Sanity queries wired
  - phase: 05-03
    provides: Resend email integration, PostHog, Schema.org, sitemap

provides:
  - 4 complete seed blog articles (600-900 words each) ready for Sanity Studio paste-in
  - .env.example with Phase 5 deployment checklist (Sanity, Resend, PostHog, Vercel, domain)
  - Passing npm run build (all Phase 5 changes integrated cleanly)

affects: [deployment, blog-launch, sanity-studio]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Resend client instantiated inside POST handler (lazy init) to avoid build failures when RESEND_API_KEY not set

key-files:
  created:
    - .planning/phases/05-blog-launch/SEED-CONTENT.md
  modified:
    - .env.example
    - src/app/api/contact/route.ts
    - src/app/api/tds-download/route.ts
    - src/app/api/collect-pickup/route.ts
    - src/app/api/sample-request/route.ts

key-decisions:
  - "Resend instantiation moved inside POST handler (not module level) — prevents build failure when RESEND_API_KEY env var not set in CI/build environments"
  - "Seed articles authored at ~840 words avg — educational tone, sourced from PROJECT.md and MARKET.md, no fabricated claims"

patterns-established:
  - "Third-party SDK clients requiring env vars must be instantiated at request time (inside handler), not at module evaluation time"

requirements-completed: [BLOG-03, BLOG-04, BLOG-05, BLOG-06, INT-05]

# Metrics
duration: 5min
completed: 2026-03-22
---

# Phase 5 Plan 04: Seed Content, Build Verification & Deployment Docs Summary

**4 seed blog articles (3,354 words) authored with full Sanity metadata, build-blocking Resend lazy-init bug fixed across all 4 API routes, and complete Vercel deployment checklist added to .env.example**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-22T20:27:37Z
- **Completed:** 2026-03-22T20:32:00Z
- **Tasks:** 2 of 3 (Task 3 is checkpoint:human-verify — awaiting user sign-off)
- **Files modified:** 6

## Accomplishments

- Authored 4 complete seed blog articles covering Group II+, EPR compliance, RRBO vs virgin comparison, and NCR used oil disposal — all 600-900 words, educational tone, drawing on verified technical data from MARKET.md and PROJECT.md
- Fixed build-blocking bug: Resend SDK was instantiated at module level in all 4 API routes; moved instantiation inside POST handler (lazy init pattern) — build now passes cleanly
- Added Phase 5 DEPLOYMENT CHECKLIST to .env.example covering all 7 steps: Sanity setup, Resend domain verification, PostHog, Vercel env vars, preview deployments (D-20), seed content paste-in, and custom domain steps

## Task Commits

Each task was committed atomically:

1. **Task 1: Author 4 seed blog articles** - `d054b94` (feat)
2. **Task 2: Verify build + deployment checklist** - `a94fa75` (fix)

## Files Created/Modified

- `.planning/phases/05-blog-launch/SEED-CONTENT.md` — 4 complete articles with Studio paste-in metadata (title, slug, tag, readTime, excerpt, body)
- `.env.example` — All Phase 5 env vars + DEPLOYMENT CHECKLIST block (7-step guide)
- `src/app/api/contact/route.ts` — Resend moved to lazy init inside POST handler
- `src/app/api/tds-download/route.ts` — Resend moved to lazy init inside POST handler
- `src/app/api/collect-pickup/route.ts` — Resend moved to lazy init inside POST handler
- `src/app/api/sample-request/route.ts` — Resend moved to lazy init inside POST handler

## Decisions Made

- **Resend lazy init**: Resend SDK requires an API key at construction time. When `RESEND_API_KEY` is not set (e.g., in CI build environments), `new Resend(undefined)` throws immediately. Moving instantiation inside the POST handler means the error only occurs at request time, not during Next.js module evaluation (which happens during `npm run build`).
- **Seed article tone**: Educational over promotional — articles cite real market data (1.3 MMT used oil, 7.9% CAGR, EPR targets) from MARKET.md, avoiding unsubstantiated claims.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Resend client module-level instantiation caused build failure**
- **Found during:** Task 2 (Build verification)
- **Issue:** `new Resend(process.env.RESEND_API_KEY)` at module level throws `Missing API key` during `npm run build` page data collection when env var is absent
- **Fix:** Moved `const resend = new Resend(...)` inside each `POST()` handler in all 4 affected API routes
- **Files modified:** `src/app/api/contact/route.ts`, `src/app/api/tds-download/route.ts`, `src/app/api/collect-pickup/route.ts`, `src/app/api/sample-request/route.ts`
- **Verification:** `npm run build` passes with `✓ Compiled successfully` and `✓ Generating static pages (19/19)`
- **Committed in:** `a94fa75` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** The Resend lazy-init fix was essential for build to pass — a direct blocker for Task 2 acceptance criteria. No scope creep.

## Issues Encountered

- None beyond the auto-fixed Resend build issue.

## User Setup Required

External services require manual configuration before going live:

1. **Sanity CMS**: `npx sanity@latest init` or create project at sanity.io — copy Project ID and create read-only API token
2. **Resend**: Create account at resend.com, verify sending domain (SPF/DKIM DNS records), create API key
3. **PostHog**: Create project at posthog.com, copy Project API key
4. **Vercel**: Add all Phase 5 env vars to Project Settings > Environment Variables (Production + Preview)
5. **Preview deployments (D-20)**: Enable at Vercel > Project > Settings > Git > Preview Deployments for all branches
6. **Seed content**: Visit /studio after Sanity is configured, create 4 posts from SEED-CONTENT.md

Full setup instructions with exact steps are in `.env.example` under `DEPLOYMENT CHECKLIST (Phase 5)`.

## Next Phase Readiness

- All Phase 5 code is complete and building cleanly
- Seed content is ready for paste-in the moment Sanity project is created
- The only remaining step is Task 3 (human verification checkpoint): user reviews the complete Phase 5 output and gives approval
- After approval, Phase 5 (Blog & Launch) is complete — the site is ready for deployment with all required services configured

## Self-Check: PASSED

- FOUND: `.planning/phases/05-blog-launch/SEED-CONTENT.md`
- FOUND: `.env.example`
- FOUND: `.planning/phases/05-blog-launch/05-04-SUMMARY.md`
- FOUND commit: `d054b94` (feat: seed articles)
- FOUND commit: `a94fa75` (fix: Resend lazy init + deployment checklist)

---
*Phase: 05-blog-launch*
*Completed: 2026-03-22*
