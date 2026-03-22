---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: unknown
stopped_at: Completed 05-03-PLAN.md
last_updated: "2026-03-22T20:26:52.032Z"
progress:
  total_phases: 3
  completed_phases: 2
  total_plans: 13
  completed_plans: 12
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-20)

**Core value:** Position Santosh as India's premium Group II+ RRBO producer and generate qualified leads
**Current focus:** Phase 05 — blog-launch

## Current Status

**Phase:** 05 of 5 (blog-launch)
**Last action:** 05-01 complete — Sanity CMS foundation installed: @sanity/client, next-sanity, + 4 more Phase 5 packages; sanity client singleton, Post interface, GROQ queries, post schema, sanity.config.ts, and embedded Studio route at /studio created (2026-03-22)

## Phase Progress

| Phase | Name | Status | Plans |
|-------|------|--------|-------|
| 1 | Brand Foundation | ✓ Complete | 5 |
| 2 | Homepage | ✓ Complete | 5 |
| 3 | Products & Process | ✓ Complete | 5/5 |
| 4 | Supporting Pages | ✓ Complete | 4/4 |
| 5 | Blog & Launch | ◑ In Progress | 1/4 |

## Key Context

- **Important note**: Santosh is in SETUP phase — they are not yet producing Group II+ oils. Website should present this aspirationally/forward-looking: "producing Group II+" when the plant is commissioned. Frame as "planned Group II+ production" or use present tense strategically where commissioning is imminent.
- Logo SVG is at: `asset/Santosh Petrochemical logo.svg` — colors (#399e65 green, #f49f1e amber) already close to brand spec
- Competitor IFP research at: `.planning/research/COMPETITOR.md`
- Market research at: `.planning/research/MARKET.md`
- Config: YOLO mode, Coarse granularity, Parallel execution

## Key Decisions (Phase 3)

- ContactForm is a standalone client component that owns its own state — FooterCTA is a pure layout wrapper. Enables /contact page to reuse the same form with zero duplication.
- Indian Oil Technology replaces REVA Process Technologies in all body copy per D-02 (ProcessTeaser + Hero trust strip). CertificationsStrip deferred.
- All "Request a Sample" CTAs route to /sample-request; "Contact" CTAs route to /contact (D-27, D-28).
- ProcessSteps uses IntersectionObserver (threshold 0.5) for active step sync — simpler than scroll math with min-h-screen sections.
- TDS gate collects Phone (required) + Name (required), Email (optional) — phone-first for India B2B follow-up.
- Sticky panel is desktop-only (hidden lg:flex) — mobile gets linear vertical step flow.
- IOCLCallout "Indian Oil Technology" headline uses amber-500 to visually distinguish it as the key trust signal.
- Grade URL pre-population (useSearchParams) skipped for SampleRequestForm — grade is optional, Suspense wrapper adds complexity for a nice-to-have (executor discretion per plan).
- /sample-request phone-first (required), email optional — matches India B2B follow-up pattern established in TDSGate.
- /contact page is deliberately thin — all form logic in ContactForm, page provides layout context only.

## Next Step

Phase 5 in progress (1/4 plans done). Proceed to 05-02-PLAN.md — /insights listing + [slug] post pages.

## Key Decisions (Plan 04-01)

- /about page is a Server Component — no client interactivity needed for static trust-building content
- Two promoter cards: Lalit Bindal (full bio from project context) + Robin Kumar (placeholder per D-10; client to provide)
- Commissioning milestone callout uses border-l-2 border-green-500 per D-12 spec
- Why Now stats included: 50% EPR mandate + $3.38B market size as amber stat cards
- Nav /quality link appended after About — 6 total navLinks entries

## Key Decisions (Plan 04-02)

- /quality is a Server Component — no client interactivity needed for static compliance/certification content
- PURSUING badge uses amber palette (bg-amber-500/10 text-amber-400 border border-amber-500/30) — signals aspirational status without red/warning semantics
- Methodology descriptions cite ASTM D2270/D4294/D92 but include no confirmed batch numerical results per D-16
- CertificationsStrip.tsx left unchanged per D-17 — /quality is independent authoritative page

## Key Decisions (Plan 04-03)

- EPRProgressBars uses IntersectionObserver + CSS transition (not Framer Motion) — exact pattern from SustainabilitySnapshot.tsx per spec
- CircularEconomySVG uses Framer Motion motion.path with strokeDashoffset infinite loop; node reveal uses CSS opacity/translateY on scroll
- /sustainability is Server Component — EPRProgressBars and CircularEconomySVG imported as client island components
- 66% energy savings stat cited from TEV Report/DPR — established figure already used in SustainabilitySnapshot.tsx, not fabricated

## Session Continuity

Last session: 2026-03-22T20:26:52.030Z
Stopped at: Completed 05-03-PLAN.md
Resume file: None

## Key Decisions (Plan 03-04)

- Both trust strip logos standardized to 40x40; portrait Santosh SVG uses object-contain so it scales correctly
- Consistent validation pattern across all 3 forms: useState errors object, trim() empty check, noValidate, mt-1 text-xs text-red-400 Barlow inline messages
- ContactForm email validated with .includes('@') — lightweight check, server-side validation deferred to Phase 5 Resend integration

## Key Decisions (Plan 03-05)

- Graceful degradation: Sheets write failure returns 200 to client with a warning field; error logged server-side; user always sees success confirmation
- No npm packages needed for Sheets integration — native fetch in Node 18+ / Next.js App Router is sufficient (no googleapis SDK)
- SHEET_NAME constant defaults to "Sheet1" — update if sheet tab has a different name

## Key Decisions (Plan 04-04)

- /collect is a Server Component — PickupForm is the only client island; all static sections render server-side
- Graceful degradation on /api/collect-pickup: Sheets write failure returns 200 with warning field; user always sees success confirmation
- WhatsApp CTA block uses bg-green-900/20 background to visually distinguish it from the floating WhatsAppButton
- Service area is text list with green dot indicators (no map) per D-07 decision
- Form success state shows prominent bg-green-500 WhatsApp button (not just text link) per D-09

## Key Decisions (Plan 05-01)

- force-dynamic in studio layout.tsx (Server Component) rather than page.tsx (Client Component) — client components cannot export route segment config
- viewport exported from next-sanity/studio in layout server component per Sanity pitfall guidance
- .gitignore updated with !.env.example negation — example file is documentation, not secrets
- allPostSlugsQuery added beyond plan spec — needed by Plans 02/03 for sitemap and generateStaticParams

## Key Decisions (Plan 05-02)

- PortableTextRenderer uses `as any` cast for Post.body (unknown[]) to satisfy @portabletext/react TypedObject constraint — avoids changing shared type interface
- LatestInsights returns null when posts.length === 0 per D-07 — no static fallback, section hides until Sanity seed content is published
- Footer already had /insights link pre-existing in Company section — no changes needed
- Nav Insights link appended as 7th entry after Quality per plan spec

## Key Decisions (Plan 05-03)

- Resend is additive to Sheets writes — all 4 routes write to Sheets first, Resend fires after with try/catch for graceful degradation (D-15)
- JSON-LD uses native script tag not next/script per Next.js recommendation — structured data is not executable code (D-17)
- PostHog init conditioned on NEXT_PUBLIC_POSTHOG_KEY env var to avoid errors in dev (D-16)
- sitemap.ts wraps Sanity fetch in try/catch — serves static routes even if Sanity fetch fails (D-18)
- posthog.capture placed after fetch completes — only fires on successful form submissions, not before

---
*Updated: 2026-03-22 after plan 05-03 completion*
