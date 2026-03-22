---
phase: 5
slug: blog-launch
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-22
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (via `next/jest` or vitest config) |
| **Config file** | `vitest.config.ts` or `jest.config.ts` (Wave 0 installs if missing) |
| **Quick run command** | `npx tsc --noEmit --skipLibCheck` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~30-60 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit --skipLibCheck`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------|-------------------|--------|
| 5-01-01 | 01 | 1 | BLOG-01, BLOG-02 | build | `npx tsc --noEmit --skipLibCheck` | pending |
| 5-01-02 | 01 | 1 | BLOG-01, BLOG-02 | build | `npx tsc --noEmit --skipLibCheck` | pending |
| 5-01-03 | 01 | 1 | BLOG-01 | build+manual | `npm run dev -- --port 3099` | pending |
| 5-02-01 | 02 | 2 | BLOG-01, BLOG-02 | build | `grep -q "PostCard" src/components/sections/PostCard.tsx && grep -q "PortableTextRenderer" src/components/blog/PortableTextRenderer.tsx` | pending |
| 5-02-02 | 02 | 2 | BLOG-01, BLOG-02 | build | `npx tsc --noEmit --skipLibCheck` | pending |
| 5-03-01 | 03 | 2 | INT-01 | build | `grep -l "resend" src/app/api/*/route.ts` | pending |
| 5-03-02 | 03 | 2 | INT-02, INT-03, INT-04 | build | `grep -q "posthog-init" src/app/layout.tsx && test -f src/app/sitemap.ts && test -f src/app/robots.ts` | pending |
| 5-03-03 | 03 | 2 | INT-02 | build | `grep -q "posthog.capture.*tds_download" src/components/sections/products/TDSGate.tsx && grep -q "posthog.capture.*sample_request" src/components/ui/SampleRequestForm.tsx && grep -q "posthog.capture.*pickup_booking" src/components/sections/collect/PickupForm.tsx` | pending |
| 5-04-01 | 04 | 3 | BLOG-03, BLOG-04, BLOG-05, BLOG-06 | content | `test -f .planning/phases/05-blog-launch/SEED-CONTENT.md && wc -w .planning/phases/05-blog-launch/SEED-CONTENT.md \| awk '{if($1>=2400) print "OK"; else print "FAIL"}'` | pending |
| 5-04-02 | 04 | 3 | INT-05 | build | `npm run build 2>&1 \| tail -5` | pending |
| 5-04-03 | 04 | 3 | INT-05 | manual | Final human verification checkpoint | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

- [x] All Phase 5 packages installed by Plan 01 Task 1
- [x] `next-sanity` in `package.json`
- [x] `@sanity/image-url` in `package.json`
- [x] `@portabletext/react` in `package.json`
- [x] `posthog-js` in `package.json`
- [x] `resend` in `package.json`
- [x] `.env.example` updated with all Phase 5 env vars

*Wave 0 is handled by Plan 01 Task 1 which installs all dependencies.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Sanity Studio accessible at /studio | BLOG-01 | External service (Sanity.io auth) | Navigate to /studio, verify login prompt |
| Blog posts load from Sanity | BLOG-01 | Live CMS data | Run `npm run dev`, navigate to /insights |
| PostHog events fire | INT-02 | External analytics service | Check PostHog dashboard after form submissions |
| Vercel deployment live | INT-05 | External hosting | Access production domain |
| Preview deployments work | INT-05 (D-20) | Vercel dashboard config | Push to non-main branch, verify preview URL |
| JSON-LD structured data present | INT-03 | Runtime HTML inspection | View source on homepage, check for application/ld+json script |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify commands
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covered by Plan 01 Task 1
- [x] No watch-mode flags
- [x] Feedback latency < 60s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending execution
