# Requirements — v1.1 Growth & Polish

## Milestone v1.1 Requirements

### SEO & Performance

- [ ] **SEO-01**: Site has `metadataBase` set in root layout so OG image URLs resolve correctly on LinkedIn/WhatsApp/Twitter link previews
- [ ] **SEO-02**: All 10 routes have `openGraph` and `twitter` metadata tags (title, description, image, url)
- [ ] **SEO-03**: Google Search Console is verified and sitemap.xml is submitted for indexing
- [ ] **SEO-04**: Sanity post schema has `seoTitle`, `seoDescription`, and `ogImage` fields; blog routes use `generateMetadata` with fallback to post title/excerpt
- [ ] **SEO-05**: Each of the 6 key routes (/, /products, /process, /collect, /about, /quality) has a target keyword identified and applied to the H1, meta description, and first paragraph
- [ ] **SEO-06**: Core Web Vitals audit completed — LCP, CLS, and FID measured via Lighthouse; identified issues resolved (image optimization, font loading, bundle size)

### Analytics & CRO

- [ ] **ANL-01**: PostHog pageview double-counting fixed by setting `capture_pageview: false` in the existing snippet init
- [ ] **ANL-02**: All 4 form submissions fire a `posthog.capture()` event on success (sample_request, tds_download, enquiry, pickup_booking)
- [ ] **ANL-03**: CTA clicks fire `posthog.capture()` events for the two primary CTAs (Request Sample, Schedule Pickup) sitewide
- [ ] **ANL-04**: PostHog funnel dashboard built: Page visit → CTA click → Form submit → Confirmation for both blender and supplier funnels
- [ ] **ANL-05**: CRO improvements implemented based on funnel data — at minimum one targeted change per underperforming funnel step identified in dashboard

### Email & Lead Nurturing

- [ ] **EML-01**: Sample request form sends a Resend confirmation email to the submitter immediately on success
- [ ] **EML-02**: Used oil pickup form sends a Resend confirmation email/SMS-style message to the submitter immediately on success (if email field present) or logs for team follow-up
- [ ] **EML-03**: TDS download triggers a day-3 follow-up email via Vercel Cron + Google Sheets queue: "Did you have questions about the spec sheet?"
- [ ] **EML-04**: Vercel Cron job (`/api/cron/send-followups`) reads a "Scheduled Emails" tab in Google Sheets and sends pending follow-ups via Resend, marking rows sent

### Hindi on /collect

- [ ] **HND-01**: `/collect` page displays Hindi copy in a dedicated bilingual section (below or alongside English) — no URL change, no toggle, no routing restructure
- [ ] **HND-02**: Noto Sans Devanagari font loaded and scoped to `/collect` layout only (not added to global font stack) to avoid adding 300KB+ to all routes

### Content Polish

- [ ] **CNT-01**: Promoter bios on `/about` finalized for all four profiles (Lalit Bindal, Abhinav Bindal, Pooja Bindal, Robin Kumar) with accurate roles and background
- [ ] **CNT-02**: Company story narrative on `/about` refined — Santosh Associates history (est. ~2003), IOCL SSI stockist context, and transition to petrochemical innovations
- [ ] **CNT-03**: Product spec values on `/products` updated to confirmed Group II+ industry standards with explicit "subject to final lab confirmation" flags where unverified
- [ ] **CNT-04**: Internal linking added across key routes: /products ↔ /process ↔ /quality ↔ /sample-request, with contextual anchor text for SEO and user flow

---

## Future Requirements

*(Deferred — not in v1.1 scope)*

- Sample request and enquiry drip follow-ups (day 3, day 7) — implement after TDS drip pattern is validated
- Hindi language toggle (full /collect toggle) — bilingual section ships first; toggle if demand confirmed
- Full site Hindi routes (/hi/*) — v2 milestone, supplier audience
- PostHog CRO second pass — after 4+ weeks of clean funnel data
- E-commerce / online ordering — permanently out of scope (B2B negotiated pricing)
- User accounts / login — not needed for lead gen site

---

## Out of Scope (v1.1)

| Item | Reason |
|------|--------|
| Sample request + enquiry drip sequences | TDS drip ships first as proof of concept; extend in v1.2 |
| Full site Hindi | One page first; assess demand before full translation effort |
| Real facility/team photos | Assets not yet available — placeholders remain |
| Live pricing display | B2B negotiated pricing — permanently out of scope |
| User accounts | Not needed for lead gen site |

---

## Traceability

| REQ-ID | Phase | Plan |
|--------|-------|------|
| SEO-01 | Phase 6 | — |
| SEO-02 | Phase 6 | — |
| SEO-03 | Phase 6 | — |
| SEO-04 | Phase 6 | — |
| SEO-05 | Phase 10 | — |
| SEO-06 | Phase 6 | — |
| ANL-01 | Phase 7 | — |
| ANL-02 | Phase 7 | — |
| ANL-03 | Phase 7 | — |
| ANL-04 | Phase 7 | — |
| ANL-05 | Phase 7 | — |
| EML-01 | Phase 8 | — |
| EML-02 | Phase 8 | — |
| EML-03 | Phase 8 | — |
| EML-04 | Phase 8 | — |
| HND-01 | Phase 9 | — |
| HND-02 | Phase 9 | — |
| CNT-01 | Phase 9 | — |
| CNT-02 | Phase 9 | — |
| CNT-03 | Phase 9 | — |
| CNT-04 | Phase 9 | — |
