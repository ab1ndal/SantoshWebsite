# Roadmap: Santosh Petrochemical Innovations Website

**Milestone:** v1.0 — Launch-ready marketing site
**Core Value:** Position Santosh as India's premium Group II+ RRBO producer and generate qualified leads

---

## Phase 1 — Brand Foundation & Scaffold

**Goal:** A running Next.js project with the complete design system, layout shell, and Sanity CMS wired up. Every page built after this phase inherits consistent tokens, typography, and components.

**Plans:**
1. Next.js 14 scaffold — TypeScript, Tailwind, ESLint, App Router folder structure per BRIEF.md
2. Design system — brand tokens in tailwind.config.js, globals.css CSS variables, Google Fonts
3. UI components — Button (4 variants), StatCard, Tag, SectionLabel, WhatsApp float button
4. Layout components — Nav (with CTA), Footer, PageWrapper with alternating section backgrounds
5. Sanity CMS setup — project init, blog/product/certification schemas, client configuration

**UAT:**
- `npm run dev` starts without errors
- Nav renders with all links and Request Sample CTA button
- Button variants render in all 4 styles with correct brand colors
- Sanity Studio accessible at /studio

**Requirements:** FOUND-01 to FOUND-13

---

## Phase 2 — Homepage

**Goal:** A complete, polished homepage that serves all three audiences, communicates the Group II+ positioning clearly, and drives sample requests and pickup bookings.

**Plans:**
1. Hero + Stats bar — bold headline, 1.3MT/15% stats, dual CTA, animated background
2. Audience entry points + Process teaser — 3-column cards + 4-step animated flow
3. Why Group II+ section — technical differentiator vs Group I (hydrotreating vs adsorption)
4. Sustainability snapshot + Certifications strip — EPR stats, CO₂ callout, cert logos
5. Latest Insights strip + Footer CTA — blog cards, enquiry form

**UAT:**
- Homepage loads at `/` with all 9 sections visible
- "Request a Sample" CTA scrolls to / navigates to sample form
- "Schedule Pickup" CTA links to /collect
- Stats display with correct amber number styling and Bebas Neue font
- Mobile responsive at 375px, 768px, 1280px

**Requirements:** HOME-01 to HOME-10

---

## Phase 3 — Products & Process Pages

**Goal:** The two core commercial pages that convert blender interest into concrete data (TDS download, sample request) and build process credibility.

**Plans:**
1. Products page — hero, spec table, comparison table, grade cards
2. Pack formats + TDS download gate + sample request form (Resend integration)
3. Process page — intro, animated 6-step scroll diagram, lab callout, CTA

**UAT:**
- Products page at `/products` renders spec table with all columns
- Comparison table shows Santosh Group II+ vs Group I vs Virgin Group II
- TDS download gate captures email and triggers Resend confirmation
- Process diagram animates on scroll (Framer Motion)
- Process page CTA links to /products

**Requirements:** PROD-01 to PROD-07, PROC-01 to PROC-04

---

## Phase 4 — Supporting Pages

**Goal:** Trust-building and conversion pages for secondary audiences (compliance, suppliers, curiosity-driven visitors).

**Plans:**
1. About Us page — company history, Santosh Associates background, promoter section
2. Quality & Certifications page — cert cards, lab testing methodology
3. Sustainability page — EPR mandate viz (5%→50%), CO₂ savings, circular economy diagram
4. Used Oil Collection page — pickup process, service area, scheduling form, WhatsApp CTA

**UAT:**
- All 4 pages render at correct URLs (/about, /quality, /sustainability, /collect)
- Collection page has prominent WhatsApp button distinct from header CTA
- Sustainability page shows EPR progression (5% FY2025 → 50% FY2031) visually
- About page includes Lalit Bindal's 35yr experience and IOCL SSI context

**Requirements:** ABOUT-01 to ABOUT-02, QUAL-01 to QUAL-02, SUST-01 to SUST-02, COLL-01 to COLL-02

---

## Phase 5 — Blog, Integrations & Launch

**Goal:** SEO content engine live, analytics instrumented, all integrations working, deployed to production.

**Plans:**
1. Blog/Insights pages — listing page + [slug] post pages from Sanity
2. Seed blog posts — 4 articles authored in Sanity (Group II+, EPR, RRBO vs Virgin, NCR disposal)
3. PostHog analytics + Schema.org structured data + sitemap/robots.txt
4. Vercel deployment — production domain, environment variables, preview deployments

**UAT:**
- `/insights` lists all 4 seed posts pulled from Sanity
- Each post renders at `/insights/[slug]` with correct typography
- PostHog events fire for TDS download, sample request, pickup form submission
- Schema.org Organization + LocalBusiness JSON-LD present on homepage
- Site live at production domain, Lighthouse score ≥ 85 performance

**Requirements:** BLOG-01 to BLOG-06, INT-01 to INT-05

---

## Phase Summary

| Phase | Name | Plans | Requirements | Priority |
|-------|------|-------|--------------|----------|
| 1 | Brand Foundation | 5 | FOUND-01–13 | Critical |
| 2 | Homepage | 5 | HOME-01–10 | Critical |
| 3 | Products & Process | 3 | PROD-01–07, PROC-01–04 | Core |
| 4 | Supporting Pages | 4 | ABOUT, QUAL, SUST, COLL | High |
| 5 | Blog & Launch | 4 | BLOG-01–06, INT-01–05 | High |

**Total plans:** 21
**Estimated phases:** 5

---
*Roadmap created: 2026-03-20*
*Build order follows BRIEF.md Phase 1-4 schedule (Weeks 1–8+)*
