# Feature Research

**Domain:** B2B industrial marketing + lead generation (petrochemical, India)
**Researched:** 2026-03-22
**Confidence:** HIGH (stack-specific) / MEDIUM (timing/sequencing norms)

---

## Scope

This document covers the five v1.1 feature areas against the existing v1.0 base: Resend drip
campaigns, SEO content optimization, PostHog funnel dashboards, Hindi bilingual on /collect,
and content polish. Features are evaluated for a commissioning-phase B2B industrial site
with two audiences: lubricant blenders (English, procurement engineers) and used oil suppliers
(Hindi-first, workshop owners in NCR/UP).

---

## Feature Landscape

### Table Stakes (Users Expect These)

These are the baseline expectations for a credible B2B industrial marketing site in India 2026.
Missing any of these signals an incomplete or unprofessional site.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Immediate confirmation email on every form submission | Any form that doesn't confirm creates doubt ("did it send?"). B2B buyers need paper trail. | LOW | Already live for TDS download and enquiry via Resend. Gap: sample request and pickup booking have no confirmation email. |
| Unique page title + meta description per route | Google penalizes duplicate titles; buyers and search engines both read them. | LOW | v1.0 has metadata exports on each route. Need to audit keyword relevance and character counts. |
| Google Search Console verification + sitemap submission | Required before any SEO ranking is possible. Cannot rank without it. | LOW | Not confirmed done in v1.0. Must be first SEO step. |
| Blog post SEO fields (meta title, meta description, OG image) | Without these, Sanity blog posts get generic or missing metadata in search results. | LOW | Sanity schema needs seo object added to post document type. Currently unclear if this field exists. |
| Core Web Vitals passing (especially LCP) | Google uses CWV as ranking signal. Industrial buyers browse on office WiFi — performance still matters. | LOW-MEDIUM | Next.js App Router + Vercel generally good baseline. Hero image needs `priority` attribute check. |
| Form submission event tracked in analytics | Can't optimize conversion without knowing where drop-off happens. | LOW | PostHog already captures tds_download, sample_request, pickup_booking. Gap: enquiry/contact form submission not tracked. |
| Contact enquiry confirmation email | Buyer sends enquiry, hears nothing — assumes Santosh is unresponsive. Kills B2B trust. | LOW | Resend integration exists. Confirmation email for contact form not explicitly confirmed in v1.0. Needs verification. |

### Differentiators (Competitive Advantage)

These go beyond baseline and represent measurable lift for a site that's still early in its
traffic and lead lifecycle.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| 2-3 step drip sequence after each form touchpoint | Converts "interested but not ready" leads — B2B sales cycles are 30-90 days. A single email loses them. Drip campaigns show 80% higher open rates and 119% higher CTR vs one-off sends. | MEDIUM | Resend supports scheduled sends up to 30 days ahead (API only, not SMTP). No third-party tool required. Implementation: schedule day-3 and day-7 emails at submission time. Needs a send-log mechanism to avoid re-sending if form re-submits. |
| Hindi copy section on /collect page | Workshop owners in Ghaziabad/Meerut are Hindi-first. A single Hindi paragraph lowers the trust barrier and increases pickup form completions from that segment. English-only feels "corporate" to small workshop operators. | LOW | Not a full translation — a dedicated section (3-4 sentences + CTA) in Hindi beneath the existing English content. No language toggle needed; bilingual single-page section is simpler and avoids routing complexity. |
| Keyword-targeted copy per page (not just metadata) | On-page keyword density + semantic relevance matters more than metadata alone for rankings. Chemical/industrial terms ("Group II+ base oil", "re-refined base oil India", "used oil recycling Ghaziabad") are low competition and high buyer intent. | MEDIUM | Requires a keyword map: one primary keyword per route, 2-3 secondary. Then update H1, H2, and first 100 words of body copy per page. Not a rewrite — surgical insertion. |
| PostHog funnel dashboards with named conversion stages | Moving from "events exist" to "we can see the funnel" makes CRO decisions data-driven instead of guesswork. Standard B2B funnel: Page visited → CTA clicked → Form started → Form submitted → Thank you shown. | LOW-MEDIUM | PostHog's funnel tool requires defining ordered steps with the right event names. The existing event names (tds_download, sample_request, pickup_booking) need to be audited — they fire on submission, but intermediate steps (page visit, CTA click, form start) are not currently captured. Need 2-3 additional capture() calls per conversion flow. |
| Internal linking strategy between blog and product/process pages | Blog posts that link to /products (with anchor text like "Group II+ base oil specs") pass PageRank and guide buyers deeper into the funnel. Without it, blog traffic leaks without converting. | LOW | A systematic audit: every blog post should have at least one contextual link to /products or /process. This is an editorial rule in Sanity, not code. |
| Structured data (Article schema) on blog posts | Enables rich snippets in Google Search (author, date, breadcrumbs). Establishes content authority signal for GEO (Generative Engine Optimization — AI citation). | LOW-MEDIUM | v1.0 already ships Organization + Product + LocalBusiness schema. Article schema on /insights/[slug] is the natural extension. Add via generateMetadata or inline JSON-LD in the blog post template. |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Full Hindi language site toggle | "Reach all Indian audiences." | Creates content maintenance debt — every page now needs two versions in Sanity, client must maintain both, copy diverges over time. For a commissioning-phase site, this doubles the work before there's traction to justify it. | Hindi section on /collect only (the one page with a Hindi-first audience). Review full bilingual site for v2 after traffic data shows demand. |
| Automated email newsletter / mailing list | "Stay top of mind." | This is outbound marketing — requires list building, permission management, unsubscribe flows (DPDP Act compliance in India), and content calendar. Way beyond scope of a lead-nurturing drip. | Drip sequences triggered by form actions only. No broadcast newsletter until v2. |
| Behavioral trigger emails (email opened → send next email) | "Send email 2 only if email 1 was opened." | Requires Resend webhooks + a persistent database to store open state per lead. Google Sheets is not a reliable state store. Adds significant infrastructure without much lift — B2B buyers often open on mobile without images, which defeats open-tracking anyway. | Time-based sequences only (day 0, day 3, day 7). Simple, reliable, and no state management needed. |
| A/B testing landing page copy | "Optimize conversion." | Needs enough traffic to reach statistical significance — rule of thumb is 100+ conversions per variant. A commissioning-phase site with new traffic won't hit this for months. | Review PostHog session recordings + funnel drop-offs to identify the one obvious change to make. Do that first. Test when traffic justifies it. |
| Real-time lead scoring dashboard | "Know which leads are hot." | Requires CRM-level data enrichment (company size, industry) that the current Google Sheets capture doesn't provide. Premature investment. | Focus on form-level conversion rates in PostHog. Manual qualification by Lalit Bindal's team until volume demands automation. |
| Chatbot / live chat | "Engage visitors immediately." | B2B industrial buyers don't use chatbots for procurement decisions. Creates a false expectation of 24/7 support on a small-team operation. WhatsApp is already the right async channel for this audience. | Keep WhatsApp floating button. Consider adding a WhatsApp click event to PostHog so it's tracked as a conversion touchpoint. |

---

## Feature Dependencies

```
[Google Search Console verified]
    └──required before──> [Keyword rankings visible]
                              └──required before──> [SEO ROI measurable]

[Sanity SEO fields on blog posts]
    └──required before──> [Blog posts rank with correct metadata]

[PostHog event audit complete]
    └──required before──> [Funnel dashboards accurate]
                              └──required before──> [CRO decisions data-driven]

[Resend confirmation email on sample request + pickup]
    └──required before──> [Drip sequence step 2+]
        (can't drip if day-0 confirmation isn't reliable)

[Hindi copy on /collect]
    └──standalone — no hard dependencies, no conflicts]

[Internal linking in blog]
    └──enhances──> [Keyword targeting per page]
    └──enhances──> [SEO article schema on blog]

[Article schema on /insights/[slug]]
    └──enhances──> [Keyword targeting — blog]
```

### Dependency Notes

- **PostHog audit before dashboards:** The existing capture() calls fire on form submission only. Building a funnel dashboard before adding intermediate steps (page visit, CTA click) will produce an artificially low funnel that is misleading, not informative. Audit and fill gaps first.
- **Confirmation emails before drip:** If day-0 confirmation is broken or inconsistent, scheduling day-3 follow-ups creates a situation where the lead receives a "following up" email having never received an introduction. Fix immediate confirmations first, then layer drips.
- **GSC before keyword targeting:** You need GSC data (what queries are driving impressions) to validate which keywords to target per page. Don't write keyword targets in a vacuum — check GSC first.
- **Resend scheduled sends use ISO 8601 timestamps:** At form submission time, calculate `new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()` and pass as `scheduledAt`. No cron job, no third-party tool. Vercel serverless handles this within the existing POST handler.

---

## MVP Definition for v1.1

v1.0 already shipped. v1.1 is a growth and polish milestone — "MVP" here means the minimum
set to make the existing lead funnel meaningfully better before the plant opens.

### Launch With (v1.1 core)

- [ ] **Drip day-0 confirmation emails** for sample request and pickup booking — these are missing and create a broken UX immediately after form submission
- [ ] **Drip day-3 follow-up** for TDS download and sample request (highest-intent touchpoints) — buyers who downloaded the TDS or requested a sample are the hottest leads; follow up before they forget
- [ ] **PostHog event audit** — verify existing 3 events fire correctly, add enquiry/contact submission event, add page-level pageview properties (UTM source at minimum)
- [ ] **Google Search Console setup + sitemap submission** — prerequisite for all SEO work
- [ ] **Sanity blog SEO fields** (meta title, meta description, OG image) — every new blog post should be able to set these without dev involvement
- [ ] **Hindi section on /collect** — 3-4 sentences + WhatsApp CTA in Hindi, positioned after the English hero content

### Add After Validation (v1.1 extended)

- [ ] **PostHog funnel dashboards** — once event coverage is confirmed, build the 3 funnels (TDS funnel, sample request funnel, pickup funnel)
- [ ] **Keyword map + on-page copy updates** — after GSC shows first impression data (allow 2-4 weeks post-GSC setup), update H1/H2 and opening body copy per route
- [ ] **Drip day-7 email** for sample request (third touch, urgency/case study angle)
- [ ] **Article schema on /insights/[slug]** — extend existing structured data to blog post pages
- [ ] **Internal linking audit** — editorial pass over all 4 seed blog posts to add contextual links to /products and /process

### Future Consideration (v2+)

- [ ] **Full Hindi language site** — defer until traffic data shows Hindi-first visitor segment is significant
- [ ] **WhatsApp click tracking in PostHog** — nice signal but low priority until funnel basics are solid
- [ ] **Email newsletter / broadcast list** — requires DPDP Act compliance setup and content calendar; not warranted until plant is operational and there are real announcements to make

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Drip day-0 confirmation (sample req + pickup) | HIGH — fixes broken UX | LOW — existing Resend setup, new template | P1 |
| Google Search Console + sitemap | HIGH — unlocks all SEO measurement | LOW — config + DNS verification | P1 |
| Sanity blog SEO fields | HIGH — every post needs this | LOW — schema addition + field in Studio | P1 |
| Hindi section on /collect | HIGH for supplier segment | LOW — copy + JSX, no routing changes | P1 |
| PostHog event audit | HIGH — funnels are unreliable without it | LOW — 2-3 new capture() calls | P1 |
| Drip day-3 follow-up (TDS + sample req) | HIGH — catches warm leads before they cool | MEDIUM — scheduled send logic + email templates | P2 |
| PostHog funnel dashboards | MEDIUM — visibility, not conversion | LOW — dashboard config in PostHog UI (no code) | P2 |
| Keyword map + on-page copy | HIGH long-term | MEDIUM — research + copywriting | P2 |
| Internal linking audit | MEDIUM SEO lift | LOW — editorial only | P2 |
| Article schema on blog posts | MEDIUM — rich snippets | LOW — JSON-LD addition to blog template | P2 |
| Drip day-7 email | MEDIUM — diminishing returns | LOW — another template | P3 |
| Content polish (bios, company story) | LOW until photos exist | LOW — copy editing | P3 |

**Priority key:**
- P1: Must have — unblocks or fixes broken state
- P2: Should have — measurable improvement, manageable effort
- P3: Nice to have — polish, diminishing return at this traffic stage

---

## Competitor Feature Analysis

IFP Petro Products (primary competitor, Sahibabad) has no visible digital marketing presence
beyond a basic listing. This is a low bar — any systematic SEO + drip investment puts Santosh
significantly ahead for organic "re-refined base oil India" searches.

| Feature | IFP Petro Products | Standard B2B Chemical Site (India) | Santosh v1.0 | Santosh v1.1 Target |
|---------|-------------------|-------------------------------------|--------------|----------------------|
| Drip/follow-up emails | None visible | Rare — most don't do this | Partial (TDS + enquiry only) | All 4 touchpoints, 2-3 step |
| Blog with SEO metadata | None | Sometimes | 4 posts, metadata incomplete | Full SEO fields in Sanity |
| GSC + sitemap | Unknown | Sometimes | Not confirmed | Done |
| Hindi content | None | Rare | None | /collect section |
| PostHog / analytics | None | Google Analytics at best | PostHog (basic events) | Funnel dashboards |
| Structured data | None | Rare | Organization + Product (v1.0) | + Article schema |

---

## Implementation Notes (Existing Stack Dependencies)

### Resend drip sequences

- Resend's `scheduledAt` parameter (ISO 8601) is available via the API and all SDKs. Emails can
  be scheduled up to 30 days in advance. This covers a 3-step drip (day 0, day 3, day 7) entirely
  within a single form POST handler — no cron job, no queue, no third-party tool.
- Limitation: Resend has no built-in deduplication. If a lead submits the same form twice, they
  will receive two sets of drip emails. Mitigation: store submission state in the existing Google
  Sheet and check for duplicate phone numbers before scheduling.
- The existing Resend lazy-init pattern (instantiated inside the POST handler to avoid build errors)
  applies to scheduled sends — same pattern, same constraints.

### PostHog funnel dashboards

- Current events: `tds_download`, `sample_request`, `pickup_booking` — all fire on successful
  form submission only. No intermediate steps captured.
- Funnel dashboards require ordered steps. Minimum useful funnel: `$pageview` (filtered to route)
  → CTA click event → form submission event. The middle step (CTA click) is not currently captured
  for any conversion flow.
- PostHog autocapture may catch CTA clicks automatically — verify in PostHog UI before adding
  manual capture() calls. If autocapture is enabled and the button has identifiable text or a
  data-ph-capture attribute, it may already be there.
- The `enquiry_submitted` event (contact form) appears to be missing entirely. This is the third
  most common conversion and is invisible in analytics.

### Sanity CMS SEO fields

- Adding an `seo` object to the Sanity `post` schema is a non-destructive schema change — existing
  documents remain valid, they just have no value for the new fields until edited.
- Recommended fields: `seoTitle` (string, max 60 chars), `seoDescription` (string, max 160 chars),
  `ogImage` (image). The Sanity SEO Pane plugin provides real-time preview of how the metadata
  appears in Google — worth adding to Studio for client self-service.
- The Next.js `generateMetadata` function on the blog post route should fall back gracefully:
  `seoTitle ?? post.title`, `seoDescription ?? post.excerpt`.

### Hindi section on /collect

- Implementation: a new JSX section beneath the existing English hero content, above the form.
  Static string — no i18n library, no translation API, no routing changes.
- Copy should be short and functional: who we collect from, what they get, how to contact. The
  WhatsApp CTA is the right action for Hindi-first users (they are more likely to message than
  fill a form).
- Font: Noto Sans Devanagari is the standard web-safe choice. Add via Google Fonts or as a local
  font in the Next.js font config. Barlow (the current body font) does not support Devanagari.
  This is a required font addition — Hindi text will render in browser fallback sans-serif without it.

---

## Sources

- [Resend Scheduled Email docs](https://resend.com/docs/dashboard/emails/schedule-email) — confirmed 30-day scheduling window, natural language and ISO 8601 support
- [PostHog Funnels docs](https://posthog.com/docs/product-analytics/funnels) — funnel step configuration
- [PostHog B2B metrics template](https://posthog.com/templates/b2b-dashboard) — B2B dashboard patterns
- [Sanity SEO guide](https://www.sanity.io/headless-cms/seo-with-sanity) — SEO schema fields and metadata approach
- [Next.js SEO guide (Strapi)](https://strapi.io/blog/nextjs-seo) — generateMetadata, Article schema, structured data
- [B2B drip campaign timing — Instantly.ai](https://instantly.ai/blog/email-drip-campaign-best-practices/) — day spacing norms (2-4 days B2B)
- [Chemical industry B2B SEO](https://www.marketingseo.in/post/how-to-generate-b2b-leads-for-specialty-chemical-manufacturers-in-india) — keyword strategy for industrial chemical B2B India
- [B2B drip campaign benchmarks — ClearTail](https://cleartailmarketing.com/b2b-drip-campaigns/) — 80% higher open rates, 119% CTR vs one-off sends
- [Inngest + Resend drip guide](https://www.inngest.com/docs/guides/resend-webhook-events) — event-driven drip alternative (evaluated, not recommended — adds complexity)
- [India B2B vernacular content trend](https://tensai.net.in/b2b-marketing-trends-in-india/) — Hindi vernacular content growing in B2B India

---

*Feature research for: Santosh Petrochemical Innovations — v1.1 Growth & Polish*
*Researched: 2026-03-22*
