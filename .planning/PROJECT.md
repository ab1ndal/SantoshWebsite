# Santosh Petrochemical Innovations — Website

## What This Is

A marketing and lead generation website for Santosh Petrochemical Innovations Pvt. Ltd., a Ghaziabad-based company that re-refines used lubricating oil into Group II+ Re-Refined Base Oil (RRBO) using vacuum distillation and hydrotreating technology (REVA Process Technologies, Pune). The site serves three audiences: lubricant blenders seeking premium RRBO, used oil suppliers for feedstock collection, and regulatory/compliance bodies tracking EPR.

## Core Value

Position Santosh as India's technically superior Group II+ RRBO producer — differentiated from Group I incumbents like IFP by hydrotreating technology — and convert procurement engineers into sample/quote requests and workshop owners into used oil pickup leads.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

**Brand & Foundation:**
- [ ] Next.js 14 (App Router) scaffold with Tailwind CSS and custom brand tokens
- [ ] Design system: Forest Green + Refined Amber palette, Bebas Neue / Barlow / JetBrains Mono fonts
- [ ] Reusable UI components: Button (4 variants), StatCard, Tag/Badge, SectionLabel
- [ ] Layout components: Nav (with Request Sample CTA), Footer, PageWrapper
- [ ] Sanity CMS integrated with schemas for blog posts, products, certifications

**Homepage:**
- [ ] Hero — bold headline + 1.3MT stat + dual CTA (Request Sample + Schedule Pickup)
- [ ] Stats bar — 1.3MT / 15% recycled / Group II+ / Ghaziabad / 65 TPD
- [ ] Audience entry — 3-column cards routing Blenders / Suppliers / Compliance teams
- [ ] Process teaser — animated 4-step horizontal flow (Collect → Distill → Hydrotreat → Dispatch)
- [ ] Why Group II+ — technical differentiator section vs Group I (IFP-style adsorption)
- [ ] Sustainability snapshot — CO₂ counter, EPR mandate stat, circular economy visual
- [ ] Certifications strip — placeholder logos (PCB, BIS IS 18722, ISO)
- [ ] Latest insights — 3 blog card strip from Sanity
- [ ] Footer CTA — "Ready to source Group II+ RRBO?" + enquiry form

**Products Page:**
- [ ] Group II+ positioning hero
- [ ] Spec table (VI ≥95, sulfur <300ppm Group II+, flash point, pour point, colour ASTM)
- [ ] Comparison table (Santosh Group II+ vs IFP-style Group I RRBO vs Virgin Group II)
- [ ] Available grades — SN 150, SN 500, Bright Stock equivalent
- [ ] Pack formats — Bulk tanker, 210L drum, IBC
- [ ] TDS download (email-gated via Resend)
- [ ] Sample request form

**Process Page:**
- [ ] Intro — "From used oil to Group II+ base oil in 6 steps"
- [ ] Animated scroll-triggered 6-step diagram (Collection → Pre-treatment → Vacuum Distillation → WFE → Hydrotreating → QC & Dispatch)
- [ ] Lab capabilities callout (REVA technology partnership)
- [ ] CTA to Products

**Supporting Pages:** ✓ Validated in Phase 4
- [x] About Us — Santosh Associates history, IOCL SSI background, promoter profiles
- [x] Quality & Certifications — PCB registration, BIS IS 18722, lab testing data
- [x] Sustainability — EPR mandate progression (5%→50% by FY2031), CO₂ savings, circular economy
- [x] Used Oil Collection — pickup scheduling, service area (NCR/UP), WhatsApp CTA

**Blog & Launch:**
- [ ] Sanity-powered Insights/Blog with 4 seed posts
- [ ] Resend integration — TDS download confirmation + enquiry notification
- [ ] PostHog analytics — funnel: TDS downloads, sample requests, pickup bookings
- [ ] WhatsApp Business floating button (critical for supplier audience)
- [ ] Schema.org structured data (Organization, Product, LocalBusiness)
- [ ] Vercel deployment with domain

### Out of Scope

- E-commerce / online ordering — B2B relationships require direct contact, not listed pricing
- User accounts / login — not needed for lead gen site
- Hindi language version — English-only for v1; Hindi for v2 (supplier audience)
- Live pricing display — B2B pricing is negotiated; showing it undermines sales process
- Mobile app — web-first always

## Context

**Company:**
- Santosh Petrochemical Innovations Pvt. Ltd., 7 New Arya Nagar, Meerut Road, Ghaziabad, UP 201001
- Part of Santosh Associates group (est. ~2003 as IOCL Servo SSI stockist for 6 districts of Western UP)
- HPCL LPG bottling operations (Amroha, 30TMT/yr) + HPCL O&M contract (Sitarganj LPG plant)
- Promoters: Lalit Bindal (35yr oil industry experience), Abhinav Bindal (structural engineer, LA), Pooja Bindal, Robin Kumar

**Technology:**
- Process: Dehydration → Vacuum Distillation (WFE) → Hydrotreating with metallic catalysts → QC
- Technology partner: REVA PROCESS TECHNOLOGIES P. LTD, PUNE (with European technology)
- Installed capacity: 65 TPD (designed for 200 TPD feed)
- Output: API Group II+ / LOBS — far superior to Group I (IFP's adsorption process)

**Competitor — IFP Petro Products (critical reference):**
- Founded 1977, Sahibabad Industrial Area, Ghaziabad (nearby)
- Capacity: 18,000 MTPA (expanded 2025); 45+ years, 200+ clients
- Process: Vacuum distillation + centrifuge + ADSORPTION = **Group I RRBO only**
- Their product spec: Sulfur 0.2–1.2% (Group I range) — Santosh targets <300ppm (Group II+)
- BIS IS 18722 committee member — but only Group I
- Clients: IOCL, BPCL, HPCL, Valvoline, Castrol, Lubrizol, Veedol, Indian Railways
- **Santosh advantage**: IFP cannot produce Group II+ — their process doesn't hydrotreat
- IFP brand is "SAMSARA" — cartoon mascot, broadly green aesthetic — Santosh should be more technical/premium

**Market:**
- India: 1.3 MMT used lubricating oil generated annually; <15% formally recycled
- EPR mandate (CPCB portal): 5% RRBO blending in FY2025 → 50% by FY2031
- IOCL + Re Sustainability MOU (March 2026): first national Group II+ RRBO circular economy
- India's waste oil recycling market: USD 3.38B (2025), growing ~7.9% CAGR
- BIS IS 18722 (Part 1): India is first country with separate RRBO standards (stricter than Group I virgin)

**Brand assets:**
- Logo SVG: Gear+flame icon (Forest Green #399e65 + Amber #f49f1e), Raleway Black wordmark — evolution only
- Fonts: Bebas Neue (display), Barlow Condensed (condensed), Barlow (body), JetBrains Mono (specs/data)
- Color system: Forest Green (#3a9e64 primary) + Refined Amber (#f59e0b accent) + Charcoal neutrals

## Constraints

- **Tech Stack**: Next.js 14 App Router + Tailwind CSS + Sanity — decided
- **Assets pending**: Facility photos, team photos, lab images, actual certifications — use placeholders
- **Specs pending**: Exact product specs (sulfur ppm, VI, flash point) not formally confirmed — use Group II+ industry standards as reference, flag for client confirmation
- **Logo**: SVG exists — update colors to Forest Green + Refined Amber only; keep icon structure

## Key Decisions

| Decision | Rationale | Outcome |
|---|---|---|
| Dark-mode-first design | Industrial B2B audience expects authority; brand greens/ambers pop on dark backgrounds | — Pending |
| Group II+ as sole differentiator | IFP dominates Group I; competing there is futile — Santosh must own the premium tier | — Pending |
| Sanity CMS for content | Non-dev editable; client updates specs/certs/posts post-handoff without dev | — Pending |
| Dual CTA strategy | Two audiences (blenders vs suppliers) need different entry points on every page | — Pending |
| REVA technology partnership | European-grade process credibility differentiates vs informal re-refiners | — Pending |

---
*Last updated: 2026-03-22 — Phase 4 complete: /about, /quality, /sustainability, /collect pages shipped; Nav wired with /quality link; animated EPR bars + circular economy SVG; pickup scheduling form + Google Sheets API route*
