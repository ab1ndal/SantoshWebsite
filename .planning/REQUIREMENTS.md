# Requirements: Santosh Petrochemical Innovations Website

**Defined:** 2026-03-20
**Core Value:** Position Santosh as India's premium Group II+ RRBO producer and convert procurement engineers into leads

## v1 Requirements

### Phase 1 — Brand Foundation

- [ ] **FOUND-01**: Next.js 14 App Router project scaffolded with TypeScript
- [ ] **FOUND-02**: Tailwind CSS configured with full brand token set (Forest Green, Refined Amber, Charcoal neutrals)
- [ ] **FOUND-03**: Google Fonts loaded (Bebas Neue, Barlow, Barlow Condensed, JetBrains Mono)
- [ ] **FOUND-04**: Global CSS variables and base styles defined
- [ ] **FOUND-05**: Button component with 4 variants (primary, secondary, amber, ghost)
- [ ] **FOUND-06**: StatCard component (Bebas Neue value, amber color, Barlow label)
- [ ] **FOUND-07**: Tag/Badge component with 3 color variants (green, amber, neutral)
- [ ] **FOUND-08**: SectionLabel component (mono, amber, uppercase, numbered)
- [ ] **FOUND-09**: Nav component with logo, links, and "Request Sample" CTA button
- [ ] **FOUND-10**: Footer component with company info, links, contact, social
- [ ] **FOUND-11**: PageWrapper component for consistent padding and alternating section backgrounds
- [ ] **FOUND-12**: Sanity CMS project initialized with blog post, product, and certification schemas
- [ ] **FOUND-13**: Logo SVG embedded with updated brand colors (Forest Green + Refined Amber)

### Phase 2 — Homepage

- [ ] **HOME-01**: Hero section — condensed bold headline, 1.3MT stat highlight, dual CTA buttons, dark background with subtle pattern
- [ ] **HOME-02**: Stats bar — 4 stats: 1.3MT used oil generated / <15% formally recycled / Group II+ process / 65 TPD capacity
- [ ] **HOME-03**: Audience entry points — 3 cards: Lubricant Blenders (Request Sample CTA), Used Oil Suppliers (Schedule Pickup CTA), Compliance Teams (View Certs CTA)
- [ ] **HOME-04**: Process teaser — animated 4-step horizontal flow with icons and short labels
- [ ] **HOME-05**: Why Group II+ section — technical comparison showing Santosh hydrotreating vs Group I adsorption, with spec highlights
- [ ] **HOME-06**: Sustainability snapshot — EPR mandate stat (5%→50%), CO₂ savings callout, IOCL MOU reference
- [ ] **HOME-07**: Certifications strip — logo row (PCB, BIS IS 18722, ISO 9001 placeholder)
- [ ] **HOME-08**: Latest insights — 3 blog card strip pulling from Sanity (or static placeholders)
- [ ] **HOME-09**: Footer CTA section — "Ready to source Group II+ RRBO?" headline + contact/enquiry form
- [ ] **HOME-10**: WhatsApp Business floating button (bottom-right, persistent across all pages)

### Phase 3 — Products & Process Pages

- [x] **PROD-01**: Products page hero with Group II+ positioning headline
- [x] **PROD-02**: Product spec table (Viscosity Index ≥95, Sulfur <300ppm, Flash Point, Pour Point, Colour ASTM, KV@40°C, KV@100°C)
- [x] **PROD-03**: Comparison table — Santosh Group II+ RRBO vs Group I RRBO vs Virgin Group II
- [x] **PROD-04**: Available grades section — SN 150, SN 500, Bright Stock (with spec previews)
- [x] **PROD-05**: Pack formats — Bulk tanker, 210L drum, IBC with icons
- [x] **PROD-06**: TDS download — email capture form gated via Resend, sends confirmation email
- [ ] **PROD-07**: Sample request form on Products page
- [x] **PROC-01**: Process page intro — "From used oil to Group II+ in 6 steps"
- [x] **PROC-02**: Animated 6-step scroll-triggered diagram with step descriptions
- [x] **PROC-03**: Lab / technology callout (REVA process technology partnership)
- [x] **PROC-04**: CTA linking to Products page

### Phase 4 — Supporting Pages

- [ ] **ABOUT-01**: About Us page — company history, Santosh Associates background, IOCL SSI context
- [ ] **ABOUT-02**: Promoter/team section (Lalit Bindal profile — 35yr experience)
- [ ] **QUAL-01**: Quality & Certifications page with cert display cards
- [ ] **QUAL-02**: Lab testing data display (VI, sulfur, flash point methodology)
- [ ] **SUST-01**: Sustainability page — EPR mandate progression (5%→50% by FY2031), environmental impact
- [ ] **SUST-02**: CO₂ savings calculator / counter and circular economy diagram
- [ ] **COLL-01**: Used Oil Collection page — how it works, service area (NCR/UP/western districts)
- [ ] **COLL-02**: Pickup scheduling form + WhatsApp CTA (warmer, simpler language for supplier audience)

### Phase 5 — Blog, Integrations & Launch

- [ ] **BLOG-01**: Insights listing page with Sanity-powered blog posts
- [ ] **BLOG-02**: Individual blog post page with [slug] routing
- [ ] **BLOG-03**: Seed post — "What is Group II+ Base Oil and Why India's Lubricant Industry is Shifting to It"
- [ ] **BLOG-04**: Seed post — "EPR Compliance Guide 2026: What Lubricant Manufacturers Need to Know"
- [ ] **BLOG-05**: Seed post — "Re-Refined Base Oil vs Virgin Base Oil: A Technical Comparison"
- [ ] **BLOG-06**: Seed post — "How to Properly Dispose of Used Engine Oil in the NCR Region"
- [ ] **INT-01**: Resend email integration — TDS download confirmation + enquiry notification emails
- [ ] **INT-02**: PostHog analytics — event tracking for TDS downloads, sample requests, pickup bookings
- [ ] **INT-03**: Schema.org structured data — Organization, Product, LocalBusiness types
- [ ] **INT-04**: Sitemap and robots.txt generated
- [ ] **INT-05**: Vercel deployment with production domain configured

## v2 Requirements

### Localization
- Hindi language version for used oil supplier audience (workshop owners, garages)

### Enhanced CRM
- CRM integration for lead management (Zoho/HubSpot)
- Lead scoring based on engagement (TDS downloads + sample request = high intent)

### Advanced Analytics
- Heat mapping for key landing pages
- A/B testing on Hero CTAs

### Portal
- Client portal for EPR certificate downloads (authenticated)

## Out of Scope

| Feature | Reason |
|---------|---------|
| E-commerce / online ordering | B2B pricing is negotiated; listed prices undermine sales process |
| User accounts / login | Lead gen site, not a portal — v2 if needed |
| Live pricing display | B2B relationships require direct conversation |
| Mobile app | Web-first; industry buyers are desktop-heavy |
| Multi-language v1 | English-only for v1 launch speed; Hindi in v2 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 to FOUND-13 | Phase 1 | Pending |
| HOME-01 to HOME-10 | Phase 2 | Pending |
| PROD-01 to PROD-07 | Phase 3 | Pending |
| PROC-01 to PROC-04 | Phase 3 | Pending |
| ABOUT-01 to ABOUT-02 | Phase 4 | Pending |
| QUAL-01 to QUAL-02 | Phase 4 | Pending |
| SUST-01 to SUST-02 | Phase 4 | Pending |
| COLL-01 to COLL-02 | Phase 4 | Pending |
| BLOG-01 to BLOG-06 | Phase 5 | Pending |
| INT-01 to INT-05 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 46 total
- Mapped to phases: 46
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-20*
*Last updated: 2026-03-20 after initial definition*
