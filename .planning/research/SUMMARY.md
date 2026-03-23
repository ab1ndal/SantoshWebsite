# Project Research Summary

**Project:** Santosh Petrochemical Innovations — v1.1 Growth & Polish
**Domain:** B2B industrial marketing + lead generation (petrochemical, India)
**Researched:** 2026-03-22
**Confidence:** HIGH

## Executive Summary

Santosh Petrochemical Innovations is a commissioning-phase B2B industrial site (Next.js 16.2.1 / React 19 / Tailwind 4 / Sanity / Resend / PostHog) targeting two distinct audiences: lubricant blenders (English, procurement engineers) and used oil suppliers (Hindi-first, workshop owners in NCR/UP). v1.1 is a growth and polish milestone that layers five capability areas on top of a working v1.0 foundation: email drip sequences, SEO optimization, PostHog funnel dashboards, Hindi bilingual content on /collect, and content copy updates. The site does not need new infrastructure — the existing stack handles every v1.1 requirement with three small additions (next-intl, posthog-node, schema-dts) and one new architectural piece (Vercel Cron for email sequences).

The recommended build order is SEO first (pure additive, no dependencies), PostHog instrumentation second (funnels are meaningless without events), email sequences third (Vercel Cron + Google Sheets as queue — not Resend scheduledAt, which cannot drive trigger-based multi-step sequences), Hindi on /collect fourth (structural change to that page, do after PostHog is instrumented there), and content copy last (no blockers). The primary competitor (IFP Petro Products, Sahibabad) has no visible digital marketing presence — any systematic SEO and drip investment puts Santosh significantly ahead for "re-refined base oil India" searches.

The most consequential risk is the email sequence architecture: STACK.md suggested using Resend `scheduledAt` for sequences, but ARCHITECTURE.md and PITFALLS.md (both informed by direct code inspection and Resend docs) establish that `scheduledAt` queues individual emails at send-time but cannot drive multi-step triggered sequences. The correct pattern is Vercel Cron + a "Scheduled Emails" tab in the existing Google Sheet. A secondary risk is PostHog double-counting pageviews if `capture_pageview: false` is not set before adding manual capture — contaminated funnel data cannot be retroactively corrected. Both risks have clear prevention steps that must be addressed at the start of their respective phases.

## Key Findings

### Recommended Stack

The v1.0 stack is locked and not re-evaluated. Three new packages are needed for v1.1: `next-intl@^4.8.3` for Hindi bilingual toggle on /collect (using "without i18n routing" mode — no URL changes, locale in cookie), `posthog-node@^5.28.5` for server-side event capture from API routes (the existing posthog-js is browser-only), and `schema-dts@^1.1.2` for type-safe JSON-LD structured data. Everything else — sitemap, robots.txt, OG metadata, JSON-LD, email scheduling — is handled by the existing stack with no new packages.

**Core technologies for v1.1:**
- `next-intl@^4.8.3`: Hindi toggle on /collect — "without routing" mode, locale in cookie, no URL restructuring
- `posthog-node@^5.28.5`: Server-side PostHog capture in API route handlers where posthog-js cannot run
- `schema-dts@^1.1.2`: TypeScript types for JSON-LD — prevents malformed Schema.org from reaching production
- Vercel Cron (existing platform): Daily job to process scheduled follow-up emails via Google Sheets queue
- `app/sitemap.ts` (built-in): Already exists and correct; no third-party sitemap package needed
- `next.config.ts` + `generateMetadata()` (built-in): Handles all SEO metadata natively

**Confirmed do-not-use list:** `next-sitemap` (Pages Router legacy), `next-i18next` (Pages Router only), `@sanity/plugin-seo` (overkill for 10-page site), BullMQ/Redis (incompatible with Vercel serverless), `setTimeout` in route handlers (process terminates before delay fires).

### Expected Features

**Must have — table stakes (P1, fixes broken or missing baseline):**
- Confirmation email on sample request and pickup booking — both are missing and create broken UX immediately after form submission
- Google Search Console verification + sitemap submission — prerequisite for all SEO measurement; cannot rank without it
- Sanity blog SEO fields (metaTitle, metaDescription, ogImage) — blog posts currently lack per-document metadata overrides
- PostHog event audit — enquiry/contact form submission event is missing entirely; funnels are unreliable without it
- Hindi section on /collect — 3-4 sentences + WhatsApp CTA for Hindi-first supplier audience (workshop owners, NCR/UP)
- `metadataBase` set in layout.tsx — without it, OG image URLs are relative and social preview scrapers cannot load them

**Should have — differentiators (P2, measurable improvement):**
- Drip day-3 follow-up for TDS download and sample request — B2B sales cycles are 30-90 days; a single email loses warm leads
- PostHog funnel dashboards — once event coverage confirmed, build TDS funnel and pickup funnel in PostHog UI
- Keyword-targeted on-page copy — surgical H1/H2/body updates per route after GSC shows impression data
- Article schema (JSON-LD) on /insights/[slug] — extends existing Organization+Product schema to blog posts
- Internal linking audit — blog posts should link contextually to /products and /process

**Defer to v2+:**
- Full Hindi language site — doubles content maintenance debt before there is traffic data to justify it
- Email newsletter / broadcast list — requires DPDP Act compliance and content calendar
- Behavioral trigger emails (open-based) — requires persistent state store; time-based sequences are simpler and sufficient
- A/B testing — needs 100+ conversions per variant; commissioning-phase traffic will not reach this for months
- WhatsApp click tracking — low priority until funnel basics are solid

### Architecture Approach

The v1.0 architecture is a Next.js 16 App Router app on Vercel with four external services: Sanity (content), Resend (email), PostHog (analytics), and Google Sheets (leads database). v1.1 adds one new internal route (`/api/cron/send-followups`), one new component (`LanguageToggle.tsx`), one new config file (`vercel.json`), and modifies four existing form components, all page metadata exports, and the Sanity post schema. No new external services are introduced.

**Major components and v1.1 changes:**

1. **Route handlers** (`src/app/api/*/route.ts`) — existing form handlers write to Sheets and fire Resend; v1.1 adds a "Scheduled Emails" row write for follow-ups and PostHog capture via posthog-node
2. **Vercel Cron handler** (`src/app/api/cron/send-followups/route.ts`) — NEW; daily job reads pending follow-up rows from Google Sheets, sends via Resend, marks sent; protected by `CRON_SECRET` bearer token
3. **Form client components** (`PickupForm`, `TDSGate`, sample request, contact forms) — add `window.posthog.capture()` calls; keep existing snippet init (Option A), do not mix with posthog-js imports
4. **`/collect` page + `LanguageToggle.tsx`** — client-side `useState` + `localStorage` toggle between English and Hindi; no i18n routing; Noto Sans Devanagari font scoped to `app/collect/layout.tsx` only
5. **Sanity `post.ts` schema** — add `seoTitle`, `seoDescription`, `canonicalUrl` as optional fields; treat schema + GROQ query + TypeScript type as a 3-file atomic change
6. **Page `metadata` exports** — add `openGraph` and `twitter` fields to all 10 pages; add `generateMetadata()` to `/insights/[slug]/page.tsx`

**Key architectural constraint from Next.js 16:** `middleware.ts` is renamed to `proxy.ts` (nodejs runtime only); `params`, `searchParams`, `cookies`, `headers` are fully async. The `generateMetadata` function must `await params` before using slug. Cannot export both static `metadata` and `generateMetadata` from the same file segment.

### Critical Pitfalls

1. **Resend scheduledAt cannot drive trigger-based sequences** — `scheduledAt` queues a single email at call time; it does not make Resend call future logic. Vercel serverless functions terminate after response. Use Vercel Cron + Google Sheets queue: write `follow_up_at` timestamp on form submit, poll daily, send via Resend when due. See ARCHITECTURE.md for the exact data flow and `vercel.json` cron config.

2. **PostHog double-counting pageviews in App Router** — the existing snippet auto-captures pageviews AND fires on every client-side navigation. Adding a `PostHogPageView` component without first setting `capture_pageview: false` in `posthog.init()` will double every pageview event. Contaminated funnel data cannot be retroactively deleted from PostHog. Fix this before building any dashboards.

3. **Sanity schema / GROQ query / TypeScript type must change together** — adding SEO fields to `schemas/post.ts` without updating `queries.ts` and `types.ts` produces a silent failure: Studio shows fields correctly, but `generateMetadata` receives `undefined` and renders generic defaults. Treat all three files as one atomic change.

4. **`metadataBase` missing causes broken OG images and canonical URLs** — without it, Next.js generates relative URLs for `openGraph.images`. Social scrapers (LinkedIn, WhatsApp) receive `/og-image.png` and fail. Fix in `layout.tsx` before any OG metadata work: `metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://santoshinnovations.in')`.

5. **Hindi copy without Noto Sans Devanagari renders as tofu boxes on Windows** — the existing font stack (Bebas Neue, Barlow, JetBrains Mono) has no Devanagari glyphs. macOS has system Devanagari; Windows without Hindi locale does not. Load `Noto_Sans_Devanagari` scoped to `app/collect/layout.tsx` only — adding it to root layout adds 200-400KB to every page's LCP.

## Implications for Roadmap

Based on the dependency chain established across all four research files, six phases are suggested. The order is not arbitrary — each phase either unblocks the next or avoids a pitfall that would corrupt downstream work.

### Phase 1: SEO Foundation

**Rationale:** Pure additive changes with no dependencies on any other v1.1 work. Must come first because GSC impression data (available 2-4 weeks after submission) informs keyword targeting in later phases. Also fixes `metadataBase` before any OG metadata work can be verified.
**Delivers:** `metadataBase` fix, OG metadata on all 10 pages, `generateMetadata()` on blog post route, Sanity post schema SEO fields, Google Search Console verification + sitemap submission, Article schema JSON-LD on blog posts.
**Addresses features from FEATURES.md:** Google Search Console (P1), Sanity blog SEO fields (P1), Article schema (P2).
**Avoids pitfalls:** Pitfall 4 (`metadataBase` missing), Pitfall 3 (schema/query/type 3-file atomicity rule applied here first).
**Research flag:** Standard patterns — Next.js `generateMetadata`, Sanity schema additions, and JSON-LD are well-documented. No phase research needed.

### Phase 2: Analytics Instrumentation

**Rationale:** Funnel dashboards are meaningless without correct event coverage. The PostHog double-pageview bug must be fixed before any funnel data is recorded. This phase must complete before Phase 3 (dashboards) and before Phase 4 (email sequences — which touchpoints to follow up on must be informed by event data).
**Delivers:** `capture_pageview: false` fix in layout, `pickup_form_submitted` + `tds_gate_submitted` + `tds_downloaded` + `contact_form_submitted` + `sample_request_submitted` events firing correctly, posthog-node added for server-side capture in API routes, UTM source properties on pageview events.
**Addresses features from FEATURES.md:** PostHog event audit (P1), form submission tracking gap.
**Avoids pitfalls:** Pitfall 2 (double pageview counting — must fix before any data accumulates), Pitfall 3 (PostHog double-init anti-pattern — keep snippet, use `window.posthog.capture()`, do not import posthog-js in components).
**Research flag:** Standard patterns — PostHog `capture()` integration and the `capture_pageview: false` fix are well-documented. No phase research needed.

### Phase 3: PostHog Funnel Dashboards

**Rationale:** Depends on Phase 2 event coverage being live and clean. Dashboard configuration is PostHog UI work (no code), but the conversion window setting (60 days minimum for B2B) is critical and must be documented before sharing any data with the client.
**Delivers:** Blender funnel (page_view → tds_gate_submitted → sample_request_submitted) and Supplier funnel (page_view(/collect) → pickup_form_submitted) in PostHog UI, with 60-day conversion windows.
**Addresses features from FEATURES.md:** PostHog funnel dashboards (P2).
**Avoids pitfalls:** Pitfall 8 (B2B conversion windows — 14-day default produces near-zero conversion and wrong CRO conclusions), UX pitfall of sharing 0% conversion dashboards with client before validating against Sheets ground truth.
**Research flag:** Standard patterns. No phase research needed.

### Phase 4: Email Drip Sequences

**Rationale:** Depends on Phase 1 (confirmation emails for sample request and pickup must exist before scheduling follow-ups — cannot drip if day-0 confirmation is unreliable). Pattern decision (Vercel Cron + Sheets queue) must be locked before writing any code. Email sequences target only TDS download and sample request touchpoints — pickup follow-up is phone/WhatsApp-based since the collect form collects phone, not email.
**Delivers:** Google Sheets "Scheduled Emails" tab, `vercel.json` with daily 07:30 IST cron, `/api/cron/send-followups/route.ts` handler (CRON_SECRET protected), day-3 follow-up for TDS download ("Did you review the specs? Questions?"), day-3 + day-7 follow-ups for sample request, immediate confirmation emails for sample request and pickup booking (if not already live from Phase 1).
**Addresses features from FEATURES.md:** Drip day-0 confirmation for sample req + pickup (P1), Drip day-3 follow-up for TDS + sample req (P2), Drip day-7 for sample req (P3).
**Avoids pitfalls:** Pitfall 1 (Resend scheduledAt trap — use Cron + Sheets queue instead), `FROM_EMAIL` env var verified in Vercel production dashboard, Resend domain verification confirmed, deduplication check on phone number in Sheets before scheduling.
**Research flag:** The Cron + Sheets pattern is confirmed in ARCHITECTURE.md. No additional research needed. Verify `FROM_EMAIL` production env and Resend domain status as first implementation step.

### Phase 5: Hindi Bilingual Content

**Rationale:** Structural change to the /collect page. Must come after Phase 2 (PostHog instrumentation on PickupForm) so the Hindi toggle doesn't disrupt existing event tracking. Font loading and localStorage persistence are prerequisites, not afterthoughts — implement them from the start.
**Delivers:** `app/collect/layout.tsx` with Noto Sans Devanagari scoped import, `LanguageToggle.tsx` component with localStorage persistence, bilingual /collect page (headline, subheadline, hero paragraph, "How It Works" steps, service area section, form field labels, WhatsApp CTA), `lang="hi"` attribute on Hindi text containers.
**Addresses features from FEATURES.md:** Hindi section on /collect (P1).
**Avoids pitfalls:** Pitfall 5 (Devanagari tofu on Windows — Noto Sans scoped to collect layout), Pitfall 6 (language toggle state lost on navigation — localStorage from day one), language toggle placed above the fold in hero section (not below English content).
**Research flag:** next-intl "without routing" mode is confirmed in STACK.md. However, ARCHITECTURE.md concludes that for this scope (one page, static strings, no routing change), next-intl is not necessary — a simple `useState` + `localStorage` + content object is sufficient and avoids the library overhead. Use the simpler approach; skip next-intl unless content volume grows.

### Phase 6: Content Copy and Internal Linking

**Rationale:** Final pass with no blockers. Wait for GSC to show first impression data (2-4 weeks after Phase 1 sitemap submission) before writing keyword-targeted copy — do not target keywords in a vacuum. Establish the copy register (approved present-tense claims vs. commissioning-phase framing) before editing a single word.
**Delivers:** Copy register document (approved vs. banned phrases for commissioning-phase site), keyword map (one primary keyword per route, based on GSC impression data), surgical H1/H2/body copy updates per route, internal link audit of all 4 seed blog posts (contextual links to /products and /process), team bio and company story updates on /about.
**Addresses features from FEATURES.md:** Keyword-targeted on-page copy (P2), internal linking (P2), content polish (P3).
**Avoids pitfalls:** Pitfall 7 (commissioning-phase copy contradiction — "we currently produce" vs. "commissioning in progress" inconsistency damages B2B credibility).
**Research flag:** GSC keyword data is needed before executing this phase. If Phase 6 starts less than 2 weeks after Phase 1 sitemap submission, keyword targeting must be based on manual research rather than GSC data. Flag this timing dependency in the roadmap task spec.

### Phase Ordering Rationale

- SEO before analytics: GSC must be verified and sitemap submitted to start accumulating data; analytics can instrument in parallel but funnels are useless without accurate pageview data
- Analytics before dashboards: Events must be clean before dashboards are built — PostHog data cannot be retroactively corrected
- Analytics before email sequences: Understanding which touchpoints generate the most engagement (from PostHog) informs which follow-up templates matter most
- Drip sequences after confirmation emails: Day-3 follow-ups that arrive without a day-0 confirmation destroy B2B trust; fix immediate confirmations first
- Hindi after PostHog instrumentation on /collect: The PickupForm receives a `lang` prop in Phase 5; Phase 2 must instrument it first so the prop addition doesn't disrupt event tracking
- Copy last: No code dependencies; waits for GSC data; safest to batch as final milestone

### Research Flags

Phases needing deeper research during planning:
- **No phases flagged.** All five feature areas have well-documented patterns confirmed by official sources and direct code inspection. The architecture is clear.

Phases with standard patterns (no additional research needed):
- **Phase 1 (SEO Foundation):** Next.js `generateMetadata`, Sanity schema additions — official docs authoritative
- **Phase 2 (Analytics):** PostHog `capture()`, `capture_pageview: false` fix — official docs + code inspection
- **Phase 3 (Dashboards):** PostHog UI configuration — no code involved
- **Phase 4 (Email Sequences):** Vercel Cron + Sheets queue pattern — confirmed in ARCHITECTURE.md
- **Phase 5 (Hindi):** useState + localStorage toggle — simpler than next-intl for this scope
- **Phase 6 (Copy):** Editorial work — awaits GSC data

One timing dependency to flag in the roadmap: Phase 6 keyword targeting requires GSC impression data (2-4 weeks post-Phase 1). The roadmap should schedule Phase 6 no sooner than 3 weeks after Phase 1 completes, or explicitly accept that keyword targeting will be research-based rather than data-driven.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified against npm registry and official docs; existing stack confirmed via direct package.json inspection |
| Features | HIGH (stack-specific) / MEDIUM (timing/sequencing) | Feature necessity is clear; B2B drip timing norms (day 3, day 7) are based on industry benchmarks, not Santosh-specific data |
| Architecture | HIGH | Code directly inspected: all 4 API route handlers, layout.tsx, collect/page.tsx, sitemap.ts, post.ts schema; Next.js 16 local docs read |
| Pitfalls | HIGH | Code-informed pitfalls cross-referenced against official docs and known GitHub issues; recovery costs assessed |

**Overall confidence:** HIGH

### Gaps to Address

- **Resend `scheduledAt` vs. Cron queue conflict:** STACK.md and ARCHITECTURE.md/PITFALLS.md contradict each other on email sequence implementation. ARCHITECTURE.md (code-informed, Resend docs read) is authoritative: `scheduledAt` cannot drive multi-step triggered sequences. Use Vercel Cron + Sheets queue. This conflict should be surfaced explicitly in the Phase 4 task spec so the implementer does not default to the simpler-looking `scheduledAt` approach.

- **PostHog autocapture state unknown:** ARCHITECTURE.md notes that PostHog autocapture may already be capturing CTA clicks via button text or `data-ph-capture` attributes. Verify in the PostHog UI before adding manual `capture()` calls for CTA interactions — avoid duplicate event capture.

- **`enquiry_submitted` event existence unconfirmed:** The contact form submission event is absent from the verified event list. The route handler code was inspected but no `posthog.capture()` call was found. This is the third most common conversion path and is currently invisible in analytics. Must be added in Phase 2.

- **Hindi copy not written yet:** Research confirmed the need and font choice (Noto Sans Devanagari) but the actual Hindi translation for the /collect page does not exist. This requires a native Hindi speaker for copy quality. The roadmap should flag this as a content dependency for Phase 5 — copy must be ready before implementation begins.

- **GSC verification method not confirmed:** The research flags GSC as not confirmed done in v1.0. Phase 1 must include verifying whether GSC is already set up (DNS or HTML meta tag) before treating setup as a new task.

## Sources

### Primary (HIGH confidence)
- `node_modules/next/dist/docs/` (local) — Next.js 16 breaking changes, generateMetadata API, i18n routing scope
- Direct code inspection: `src/app/api/*/route.ts`, `src/app/layout.tsx`, `src/app/collect/page.tsx`, `src/app/sitemap.ts`, `src/lib/sanity/schemas/post.ts`, `package.json`
- [next-intl "without i18n routing" docs](https://next-intl.dev/docs/getting-started/app-router/without-i18n-routing) — setup pattern
- [next-intl 4.0 release notes](https://next-intl.dev/blog/next-intl-4-0) — breaking changes, ESM-only, NextIntlClientProvider requirement
- [Resend schedule email docs](https://resend.com/docs/dashboard/emails/schedule-email) — scheduledAt parameter and 30-day limit
- [PostHog Node.js docs](https://posthog.com/docs/libraries/node) — flushAt: 1 pattern for serverless
- [PostHog Next.js integration](https://posthog.com/docs/libraries/next-js) — capture_pageview: false requirement
- [PostHog Funnels docs](https://posthog.com/docs/product-analytics/funnels) — conversion window configuration
- [Next.js sitemap.xml file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) — built-in App Router sitemap
- npm registry — next-intl@4.8.3, posthog-node@5.28.5, schema-dts@1.1.2 versions confirmed

### Secondary (MEDIUM confidence)
- [B2B drip campaign benchmarks — ClearTail](https://cleartailmarketing.com/b2b-drip-campaigns/) — 80% higher open rates, 119% CTR vs one-off sends
- [B2B drip timing — Instantly.ai](https://instantly.ai/blog/email-drip-campaign-best-practices/) — day 2-4 spacing norms for B2B
- [India B2B vernacular content](https://tensai.net.in/b2b-marketing-trends-in-india/) — Hindi vernacular content growing in B2B India
- [Sanity SEO schema guide](https://www.sanity.io/learn/course/seo-optimization/seo-schema-types-and-metadata) — reusable SEO object pattern

### Tertiary (LOW confidence / needs validation)
- Feature-to-audience mapping for Hindi /collect — inferred from business context; validate with Lalit Bindal that Hindi-first suppliers are the actual primary use case for the page before Phase 5

---
*Research completed: 2026-03-22*
*Ready for roadmap: yes*
