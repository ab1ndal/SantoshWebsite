# Santosh Petrochemical Innovations — Website

## What This Is

A launch-ready marketing and lead generation website for Santosh Petrochemical Innovations Pvt. Ltd., a Ghaziabad-based company that re-refines used lubricating oil into Group II+ Re-Refined Base Oil (RRBO) using vacuum distillation and hydrotreating technology licensed from REVA Process Technologies, Pune. The site serves three audiences: lubricant blenders seeking premium RRBO, used oil suppliers for feedstock collection, and regulatory/compliance bodies tracking EPR.

## Core Value

Position Santosh as India's technically superior Group II+ RRBO producer — differentiated from Group I incumbents like IFP by hydrotreating technology — and convert procurement engineers into sample/quote requests and workshop owners into used oil pickup leads.

## Requirements

### Validated

<!-- Shipped and confirmed in v1.0. -->

**Brand & Foundation (v1.0):**
- ✓ Next.js 14 (App Router) scaffold with Tailwind CSS and custom brand tokens — v1.0
- ✓ Design system: Forest Green + Refined Amber palette, Bebas Neue / Barlow / JetBrains Mono fonts — v1.0
- ✓ Reusable UI components: Button (4 variants), StatCard, Tag/Badge, SectionLabel — v1.0
- ✓ Layout components: Nav (with Request Sample CTA), Footer, PageWrapper — v1.0
- ✓ Sanity CMS integrated with schemas for blog posts, products, certifications — v1.0

**Homepage (v1.0):**
- ✓ Hero — bold headline + 1.3MT stat + dual CTA (Request Sample + Schedule Pickup) — v1.0
- ✓ Stats bar — 1.3MT / 15% recycled / Group II+ / Ghaziabad / 65 TPD — v1.0
- ✓ Audience entry — 3-column cards routing Blenders / Suppliers / Compliance teams — v1.0
- ✓ Process teaser — animated 4-step horizontal flow — v1.0
- ✓ Why Group II+ — technical differentiator section vs Group I — v1.0
- ✓ Sustainability snapshot — CO₂ counter, EPR mandate stat, circular economy visual — v1.0
- ✓ Certifications strip — placeholder logos (PCB, BIS IS 18722, ISO) — v1.0
- ✓ Latest insights — 3 blog card strip from Sanity — v1.0
- ✓ Footer CTA — "Ready to source Group II+ RRBO?" + enquiry form — v1.0

**Products Page (v1.0):**
- ✓ Group II+ positioning hero — v1.0
- ✓ Spec table (VI ≥95, sulfur <300ppm Group II+, flash point, pour point, colour ASTM) — v1.0
- ✓ Comparison table (Santosh Group II+ vs IFP-style Group I RRBO vs Virgin Group II) — v1.0
- ✓ Available grades — SN 150, SN 500, Bright Stock equivalent — v1.0
- ✓ Pack formats — Bulk tanker, 210L drum, IBC — v1.0
- ✓ TDS download (email-gated via Resend) — v1.0
- ✓ Sample request form — v1.0

**Process Page (v1.0):**
- ✓ Intro — "From used oil to Group II+ base oil in 6 steps" — v1.0
- ✓ Animated scroll-triggered 6-step diagram — v1.0
- ✓ IOCL technology partnership callout — v1.0
- ✓ CTA to Products — v1.0

**Supporting Pages (v1.0):**
- ✓ About Us — Santosh Associates history, IOCL SSI background, promoter profiles — v1.0
- ✓ Quality & Certifications — PCB registration, BIS IS 18722, lab testing data — v1.0
- ✓ Sustainability — EPR mandate progression (5%→50% by FY2031), CO₂ savings, circular economy — v1.0
- ✓ Used Oil Collection — pickup scheduling, service area (NCR/UP), WhatsApp CTA — v1.0

**Blog & Launch (v1.0):**
- ✓ Sanity-powered Insights/Blog with 4 seed posts — v1.0
- ✓ Resend integration — TDS download confirmation + enquiry notification — v1.0
- ✓ PostHog analytics — funnel: TDS downloads, sample requests, pickup bookings — v1.0
- ✓ WhatsApp Business floating button — v1.0
- ✓ Schema.org structured data (Organization, Product, LocalBusiness) — v1.0
- ✓ Vercel deployment with domain — v1.0

## Current Milestone: v1.1 Growth & Polish

**Goal:** Improve SEO visibility, convert more leads with nurturing emails, verify analytics funnels, and polish content/copy while real assets are still pending.

**Target features:**
- SEO & Performance (Content SEO level): Google Search Console, meta audit, Core Web Vitals, keyword targeting per page, blog SEO templates in Sanity, internal linking
- Lead Nurturing: Resend email sequences for all 4 touchpoints (TDS download, sample request, enquiry, used oil pickup)
- Hindi on /collect: Hindi copy for the collection page only — language toggle or bilingual section
- Analytics & CRO: Verify PostHog event capture, build funnel dashboards, then make targeted CRO improvements
- Content polish: Finalize text copy (bios, company story, product spec text) — photos/logos deferred

### Active

<!-- v1.1 requirements — defined via /gsd:new-milestone -->

### Out of Scope

- E-commerce / online ordering — B2B relationships require direct contact, not listed pricing
- User accounts / login — not needed for lead gen site
- Hindi language version — English-only for v1; Hindi for v2 (supplier audience)
- Live pricing display — B2B pricing is negotiated; showing it undermines sales process
- Mobile app — web-first always

## Context

**Current State (post v1.0):**
- Full 10-route site shipped: /, /products, /process, /sample-request, /contact, /about, /quality, /sustainability, /collect, /insights, /insights/[slug], /studio
- ~5,920 lines TypeScript/TSX across src/
- Tech stack: Next.js 14 App Router · Tailwind CSS · Sanity CMS · Framer Motion · Resend · PostHog · Google Sheets API
- Build: `npm run build` passing clean
- Deployment: Vercel-ready with .env.example deployment checklist

**Company:**
- Santosh Petrochemical Innovations Pvt. Ltd., 7 New Arya Nagar, Meerut Road, Ghaziabad, UP 201001
- Part of Santosh Associates group (est. ~2003 as IOCL Servo SSI stockist for 6 districts of Western UP)
- HPCL LPG bottling operations (Amroha, 30TMT/yr) + HPCL O&M contract (Sitarganj LPG plant)
- Promoters: Lalit Bindal (35yr oil industry experience), Abhinav Bindal (structural engineer, LA), Pooja Bindal, Robin Kumar
- **Important:** Plant is in SETUP/commissioning phase — website frames production as imminent/forward-looking

**Technology:**
- Process: Dehydration → Vacuum Distillation (WFE) → Hydrotreating with metallic catalysts → QC
- Technology partner: REVA PROCESS TECHNOLOGIES P. LTD, PUNE (with European technology) — referred to as "Indian Oil Technology" in site copy
- Installed capacity: 65 TPD (designed for 200 TPD feed)
- Output: API Group II+ / LOBS

**Competitor — IFP Petro Products:**
- Founded 1977, Sahibabad Industrial Area, Ghaziabad (nearby)
- Process: Vacuum distillation + centrifuge + ADSORPTION = Group I RRBO only
- Sulfur 0.2–1.2% vs Santosh <300ppm — Santosh technically superior
- **Santosh advantage**: IFP cannot produce Group II+ — their process doesn't hydrotreat

**Market:**
- India: 1.3 MMT used lubricating oil generated annually; <15% formally recycled
- EPR mandate (CPCB portal): 5% RRBO blending in FY2025 → 50% by FY2031
- IOCL + Re Sustainability MOU (March 2026): first national Group II+ RRBO circular economy
- India's waste oil recycling market: USD 3.38B (2025), growing ~7.9% CAGR

## Constraints

- **Tech Stack**: Next.js 14 App Router + Tailwind CSS + Sanity — locked in v1.0
- **Assets pending**: Facility photos, team photos, lab images, actual certifications — placeholders in place
- **Specs pending**: Exact product specs (sulfur ppm, VI, flash point) not formally confirmed — Group II+ industry standards used, flagged for client confirmation
- **Plant status**: Commissioning phase — copy is aspirational/forward-looking

## Key Decisions

| Decision | Rationale | Outcome |
|---|---|---|
| Dark-mode-first design | Industrial B2B audience expects authority; brand greens/ambers pop on dark backgrounds | ✓ Good — site looks premium and technical |
| Group II+ as sole differentiator | IFP dominates Group I; competing there is futile — Santosh must own the premium tier | ✓ Good — differentiation is clear throughout |
| Sanity CMS for content | Non-dev editable; client updates specs/certs/posts post-handoff without dev | ✓ Good — /studio route live |
| Dual CTA strategy | Two audiences (blenders vs suppliers) need different entry points on every page | ✓ Good — Request Sample + Schedule Pickup consistent sitewide |
| Google Sheets for lead capture | Zero-cost lead storage, client can access without CRM setup | ✓ Good — graceful degradation pattern prevents user-facing errors |
| Resend lazy init in POST handlers | Prevents build failure when RESEND_API_KEY not set in CI/build | ✓ Good — build passes clean |
| ContactForm as shared client component | /contact and FooterCTA reuse same form with zero duplication | ✓ Good — single source of truth |
| Phone-first validation pattern | India B2B follow-up is phone-first; email is optional across all forms | ✓ Good — consistent across TDSGate, SampleRequest |
| "Indian Oil Technology" in copy | Replaces REVA brand name — positions Santosh technology as proprietary/Indian | ✓ Good — IOCL callout prominent on /process |
| noValidate + JS validation pattern | All forms use JS errors state + mt-1 text-xs text-red-400 inline messages | ✓ Good — consistent UX across 4 forms |

---
*Last updated: 2026-03-22 — v1.1 Growth & Polish milestone started*
