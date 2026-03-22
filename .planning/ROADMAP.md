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

**Goal:** Four new routes (/products, /process, /sample-request, /contact) plus site-wide CTA updates. The two core commercial pages convert blender interest into concrete data (TDS download, sample request) and build process credibility with investors and engineers.

**Plans:** 5/5 plans complete

Plans:
- [x] 03-01-PLAN.md — Foundations: ContactForm extraction, placeholder PDF, site-wide CTA updates, REVA→IOC copy fix
- [x] 03-02-PLAN.md — /products page (hero, spec table, comparison table, grade cards, pack formats, TDS gate) + /process page (sticky scroll panel, 6 steps, IOC callout, CTA)
- [x] 03-03-PLAN.md — /sample-request page + /contact page
- [x] 03-04-PLAN.md — Gap closure: hero trust strip logo sizes + sample request form validation
- [x] 03-05-PLAN.md — Gap closure: Google Sheets API route + form submission wiring

**UAT:**
- Products page at `/products` renders spec table with all 7 columns
- Comparison table shows Santosh Group II+ vs Group I vs Virgin Group II, Santosh column highlighted
- TDS download gate expands inline, triggers browser PDF download on submit
- Process diagram animates on scroll (Framer Motion useScroll)
- Process page IOC callout is prominent, not a footnote
- Process page CTA links to /products
- /sample-request form has Name, Address, Phone (required) + Email, Grade, Quantity, Application
- /contact page renders ContactForm component
- Nav "Request Sample" CTA routes to /sample-request
- ProcessTeaser shows "Indian Oil Technology" not "REVA Process Technologies"

**Requirements:** PROD-01 to PROD-07, PROC-01 to PROC-04

---

## Phase 4 — Supporting Pages

**Goal:** Trust-building and conversion pages for secondary audiences (compliance, suppliers, curiosity-driven visitors).

**Plans:** 4/4 plans complete

Plans:
- [x] 04-01-PLAN.md — /about page (company history, promoter cards, market opportunity) + Nav /quality link
- [x] 04-02-PLAN.md — /quality page (cert cards with PURSUING badges, lab testing methodology)
- [x] 04-03-PLAN.md — /sustainability page (EPR progress bars, circular economy SVG, CO2 savings, IOCL MOU)
- [x] 04-04-PLAN.md — /collect page (pickup process steps, service area, scheduling form, WhatsApp CTA)

**UAT:**
- All 4 pages render at correct URLs (/about, /quality, /sustainability, /collect)
- Collection page has prominent WhatsApp button distinct from header CTA
- Sustainability page shows EPR progression (5% FY2025 → 50% FY2031) visually
- About page includes Lalit Bindal's 35yr experience and IOCL SSI context

**Requirements:** ABOUT-01 to ABOUT-02, QUAL-01 to QUAL-02, SUST-01 to SUST-02, COLL-01 to COLL-02

---

## Phase 5 — Blog, Integrations & Launch

**Goal:** SEO content engine live, analytics instrumented, all integrations working, deployed to production.

**Plans:** 3/4 plans executed

Plans:
- [x] 05-01-PLAN.md — Sanity CMS foundation (install packages, client/types/queries/schema, Studio route, env vars)
- [x] 05-02-PLAN.md — Blog pages (PostCard, PortableTextRenderer, /insights, /insights/[slug], LatestInsights wiring, Nav+Footer links)
- [x] 05-03-PLAN.md — Integrations (Resend email on 4 API routes, PostHog analytics, Schema.org JSON-LD, sitemap, robots.txt)
- [ ] 05-04-PLAN.md — Seed content (4 blog articles for Studio paste-in) + build verification + deployment docs

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
| 1 | Brand Foundation | 5 | FOUND-01-13 | Critical |
| 2 | Homepage | 5 | HOME-01-10 | Critical |
| 3 | Products & Process | 5/5 | Complete   | 2026-03-22 |
| 4 | Supporting Pages | 4/4 | Complete   | 2026-03-22 |
| 5 | Blog & Launch | 3/4 | In Progress|  |

**Total plans:** 23
**Estimated phases:** 5

---
*Roadmap created: 2026-03-20*
*Phase 3 plans finalized: 2026-03-21*
*Phase 3 gap closure plans added: 2026-03-21*
*Phase 4 plans finalized: 2026-03-22*
*Phase 5 plans finalized: 2026-03-22*
*Build order follows BRIEF.md Phase 1-4 schedule (Weeks 1-8+)*
