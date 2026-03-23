# Roadmap: Santosh Petrochemical Innovations Website

## Milestones

- ✅ **v1.0 Launch** — Phases 1-5 (shipped 2026-03-22)
- 🚧 **v1.1 Growth & Polish** — Phases 6-10 (in progress)

## Phases

<details>
<summary>✅ v1.0 Launch (Phases 1-5) — SHIPPED 2026-03-22</summary>

- [x] Phase 1: Brand Foundation (5/5 plans) — completed 2026-03-20
- [x] Phase 2: Homepage (5/5 plans) — completed 2026-03-21
- [x] Phase 3: Products & Process (5/5 plans) — completed 2026-03-21
- [x] Phase 4: Supporting Pages (4/4 plans) — completed 2026-03-22
- [x] Phase 5: Blog & Launch (4/4 plans) — completed 2026-03-22

Full details: `.planning/milestones/v1.0-ROADMAP.md`

</details>

### 🚧 v1.1 Growth & Polish (In Progress)

**Milestone Goal:** Improve search visibility, convert more leads with nurturing emails, clean up analytics data pipelines, add Hindi content for the supplier audience, and finalize copy across the site.

- [ ] **Phase 6: SEO Foundation** — Fix OG metadata, verify Google Search Console, and start the GSC data accumulation clock
- [ ] **Phase 7: Analytics Instrumentation** — Fix PostHog double-pageview bug, instrument all form submissions and CTA clicks, build funnel dashboards, and run CRO improvements
- [ ] **Phase 8: Email Sequences** — Add immediate confirmation emails for all touchpoints and wire up Vercel Cron drip sequences via Google Sheets queue
- [ ] **Phase 9: Hindi + Content Polish** — Add Hindi bilingual section on /collect and finalize copy across /about, /products, and sitewide internal linking
- [ ] **Phase 10: Keyword Targeting** — Apply GSC-data-driven keyword targeting to 6 key routes (requires 2-4 weeks of GSC data from Phase 6)

## Phase Details

### Phase 6: SEO Foundation
**Goal**: All 10 routes have correct OG metadata that renders on social platforms, blog posts have per-document SEO overrides in Sanity, Google Search Console is verified and sitemap submitted, and Core Web Vitals are measured and resolved
**Depends on**: Phase 5 (v1.0 complete)
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-06
**Success Criteria** (what must be TRUE):
  1. Pasting any page URL into LinkedIn or WhatsApp shows the correct title, description, and OG image — no broken image boxes
  2. Google Search Console dashboard shows the sitemap as submitted and pages being crawled
  3. A blog post with custom SEO fields set in Sanity Studio renders those values in the browser `<title>` and social previews — not the fallback post title
  4. Lighthouse audit on at least the homepage and /products shows LCP under 2.5s and CLS under 0.1
**Plans**: TBD

### Phase 7: Analytics Instrumentation
**Goal**: PostHog captures clean, non-duplicated data for all four conversion funnels, funnel dashboards are built with correct B2B conversion windows, and at least one CRO improvement is deployed per underperforming funnel step
**Depends on**: Phase 6
**Requirements**: ANL-01, ANL-02, ANL-03, ANL-04, ANL-05
**Success Criteria** (what must be TRUE):
  1. Refreshing a page in PostHog Live Events shows exactly one `$pageview` event — not two
  2. Submitting the sample request form, TDS gate, contact form, and pickup booking form each produce a distinct named event in PostHog Live Events within 30 seconds
  3. Clicking "Request Sample" or "Schedule Pickup" CTAs anywhere on the site fires a named PostHog event visible in Live Events
  4. PostHog dashboards show two complete funnels (blender and supplier) with 60-day conversion windows, displaying real step-by-step drop-off data
  5. At least one design or copy change targeting an identified drop-off step is live on the site
**Plans**: TBD

### Phase 8: Email Sequences
**Goal**: Every form submission sends an immediate confirmation email, and TDS download leads receive an automated day-3 follow-up via Vercel Cron and Google Sheets queue
**Depends on**: Phase 6 (Resend integration already wired from v1.0; confirmation emails must exist before drip sequences)
**Requirements**: EML-01, EML-02, EML-03, EML-04
**Success Criteria** (what must be TRUE):
  1. Submitting the sample request form causes a confirmation email to arrive in the submitter's inbox within 2 minutes
  2. Submitting the used oil pickup form causes a confirmation email to arrive (if email provided) or a row to appear in the Google Sheet flagged for team follow-up
  3. Downloading the TDS (completing TDS gate) results in a follow-up email arriving in the submitter's inbox approximately 3 days later
  4. The Vercel Cron job runs daily, processes pending follow-up rows in the Google Sheet, marks them sent, and does not re-send already-sent rows
**Plans**: TBD

### Phase 9: Hindi + Content Polish
**Goal**: Workshop owners visiting /collect see Hindi copy without tofu rendering on any OS, and /about and /products have finalized copy with internal links connecting key routes
**Depends on**: Phase 7 (PostHog must be instrumented on /collect before structural changes to the page)
**Requirements**: HND-01, HND-02, CNT-01, CNT-02, CNT-03, CNT-04
**Success Criteria** (what must be TRUE):
  1. Visiting /collect on a Windows machine (without Hindi locale) shows Hindi text rendered correctly in Noto Sans Devanagari — no tofu boxes
  2. The Hindi section appears on /collect without requiring a URL change, toggle click, or page reload — it exists as a bilingual section alongside English content
  3. The /about page shows complete bios for all four promoters (Lalit, Abhinav, Pooja, Robin Kumar) and an accurate company story with IOCL SSI context
  4. The /products page shows product spec values flagged explicitly as "subject to final lab confirmation" where unverified
  5. Navigating between /products, /process, /quality, and /sample-request surfaces contextual links to related pages — users can follow the logical reading path without returning to the nav
**Plans**: TBD

### Phase 10: Keyword Targeting
**Goal**: Each of the 6 key routes has a GSC-data-informed target keyword applied to its H1, meta description, and first paragraph body copy
**Depends on**: Phase 6 (requires 2-4 weeks of GSC impression data; do not execute until at least 3 weeks after Phase 6 ships)
**Requirements**: SEO-05
**Success Criteria** (what must be TRUE):
  1. Google Search Console shows impression data for all 6 routes (/, /products, /process, /collect, /about, /quality)
  2. Each of the 6 routes has a documented target keyword chosen from GSC impression data, applied to the H1 tag, meta description, and opening paragraph
  3. The keyword changes do not break the commissioning-phase framing — no copy claims active production where the site previously used forward-looking language
**Plans**: TBD

## Progress

| Phase | Name | Milestone | Plans | Status | Completed |
|-------|------|-----------|-------|--------|-----------|
| 1 | Brand Foundation | v1.0 | 5/5 | ✅ Complete | 2026-03-20 |
| 2 | Homepage | v1.0 | 5/5 | ✅ Complete | 2026-03-21 |
| 3 | Products & Process | v1.0 | 5/5 | ✅ Complete | 2026-03-21 |
| 4 | Supporting Pages | v1.0 | 4/4 | ✅ Complete | 2026-03-22 |
| 5 | Blog & Launch | v1.0 | 4/4 | ✅ Complete | 2026-03-22 |
| 6 | SEO Foundation | v1.1 | 0/TBD | Not started | - |
| 7 | Analytics Instrumentation | v1.1 | 0/TBD | Not started | - |
| 8 | Email Sequences | v1.1 | 0/TBD | Not started | - |
| 9 | Hindi + Content Polish | v1.1 | 0/TBD | Not started | - |
| 10 | Keyword Targeting | v1.1 | 0/TBD | Not started | - |

---
*v1.0 archived: 2026-03-22*
*v1.1 roadmap created: 2026-03-22*
