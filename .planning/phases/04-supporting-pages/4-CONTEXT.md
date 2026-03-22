# Phase 4: Supporting Pages - Context

**Gathered:** 2026-03-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Build 4 supporting pages: /about, /quality, /sustainability, /collect. These are trust-building and conversion pages for secondary audiences — compliance teams, used oil suppliers, and investors. Core commercial pages (/products, /process) are already shipped in Phase 3.

Does NOT include: Resend live email sending (Phase 5), PostHog analytics (Phase 5), blog content (Phase 5).

</domain>

<decisions>
## Implementation Decisions

### /sustainability — Visualizations

- **D-01:** EPR mandate progression (5% FY2025 → 50% FY2031) displayed as **animated progress bars** — one bar per year milestone, fills on scroll. Intermediate milestones: FY2025 (5%), FY2027 (15%), FY2029 (30%), FY2031 (50%).
- **D-02:** CO₂ savings framing is **research-based** — executor must look up published figures for CO₂ savings per tonne of RRBO vs virgin base oil and cite the source inline. Do NOT invent numbers.
- **D-03:** Circular economy diagram is an **animated SVG loop** — 4 nodes: Used Oil Collected → Re-Refined → Back Into Engines → Collected Again. Style consistent with ProcessTeaser icon treatment (SVG icons, green/amber palette).
- **D-04:** Page hero leads with **environmental opportunity framing** — "Turning India's Used Oil Problem Into an Opportunity" or similar. Not regulatory-first.

### /collect — Used Oil Collection Page

- **D-05:** Pickup scheduling form submits to **Google Sheets** (same API route as /sample-request, ships in Phase 3-05) + success state shows WhatsApp link (`wa.me/919810121438`) for instant follow-up.
- **D-06:** Form fields: Business name, Phone (required), Location/address, Quantity available (approximate liters or drums), Preferred frequency (one-time / regular). Keep short — workshop owners won't fill long forms.
- **D-07:** Service area displayed as **text list**: Delhi NCR, Ghaziabad, Meerut, Muzaffarnagar, Saharanpur, Moradabad, Rampur. No map component.
- **D-08:** Page tone — **warm/accessible hero** ("We pick up. You get paid. No hassle.") followed by structured process steps in standard brand voice. WhatsApp CTA is prominent and distinct from the header WhatsApp float button.
- **D-09:** The prominent WhatsApp CTA on /collect is page-specific — a large button or callout block, not just the floating button inherited from layout.

### /about — About Us Page

- **D-10:** **2 promoters featured:** Lalit Bindal (35yr oil industry experience, IOCL SSI background) and Robin Kumar. Each gets a card with name, role, and short bio. Pooja Bindal and Abhinav Bindal listed by name only (or omitted from v1).
- **D-11:** Company history is a **simple text section** — well-structured paragraphs, no visual timeline. History will be expanded in a future update when full story is ready.
- **D-12:** Santosh Petrochemical Innovations is framed with **milestone framing** for setup phase — "Plant commissioning underway, production expected within ~2 years." Transparent for investors, not aspirational fiction.
- **D-13:** Page has **two distinct sections**: (1) Company & credibility story (Santosh Associates, IOCL SSI, HPCL, 35yr track record), (2) Market opportunity / why now (EPR mandate, India's RRBO gap, timing of plant commissioning).

### /quality — Quality & Certifications Page

- **D-14:** **3 cert cards** (PCB registration, BIS IS 18722, ISO 9001), all shown with **"Pursuing" / "In Progress" badge** — no certs confirmed yet, aspirational framing consistent with setup phase.
- **D-15:** Cert card design: **icon + name + issuing body + short description**. No logo placeholder area. Real logos can be swapped in later by updating the component.
- **D-16:** Lab testing data section shows **methodology only** — describe testing approach (how VI, sulfur, flash point are measured) without committing to specific numbers. Numbers added when client provides confirmed batch specs.
- **D-17:** /quality is an **independent authoritative page**. Homepage CertificationsStrip (`CertificationsStrip.tsx`) stays as-is (decorative). No update to the strip in Phase 4.

### Claude's Discretion
- Exact animated progress bar implementation (CSS transition vs Framer Motion)
- SVG loop animation technique (CSS keyframes or Framer Motion)
- Section ordering within each page beyond the decisions above
- Promoter card layout (horizontal vs. vertical)
- Whether /about includes a "Why now?" stat callout (EPR mandate % or market size)

</decisions>

<specifics>
## Specific Ideas

- /collect hero: "We pick up. You get paid. No hassle." — plain language for workshop/garage audience
- /about: ~2 year timeline to full production — frame as milestone, not a weakness
- CO₂ savings: must be cited from a real published source — do not fabricate. Research "CO₂ savings re-refined base oil vs virgin" or "lifecycle analysis RRBO emissions"
- EPR progression bars: CPCB portal mandates are the canonical source — 5%/15%/30%/50% across FY2025–FY2031

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` §Phase 4 — ABOUT-01, ABOUT-02, QUAL-01, QUAL-02, SUST-01, SUST-02, COLL-01, COLL-02

### Brand & design system
- `src/app/globals.css` — all design tokens (colors, fonts, CSS variables). Do not hardcode hex values not in this file.

### Existing components to reuse
- `src/components/ui/ContactForm.tsx` — form pattern (field layout, input styles, validation, success state). Collection page form mirrors this.
- `src/components/sections/SustainabilitySnapshot.tsx` — existing sustainability section on homepage. /sustainability page expands on this, must be visually consistent.
- `src/components/sections/ProcessTeaser.tsx` — SVG icon style and animation pattern. Circular economy SVG loop should match this aesthetic.
- `src/components/sections/CertificationsStrip.tsx` — reference for cert display aesthetic. /quality expands independently; do NOT modify this component in Phase 4.
- `src/app/sample-request/page.tsx` — form + Google Sheets submission pattern. Collection page form uses same pattern.

### API route
- Phase 3-05 ships the Google Sheets API route — collection page form reuses it directly. Confirm route path once 03-05 is complete before building /collect.

### Competitor & market context
- `.planning/research/MARKET.md` — EPR mandate progression figures, market size, IOCL MOU context for /sustainability and /about
- `.planning/PROJECT.md` §Company — Santosh Associates history, HPCL LPG operations, promoter details, plant specs

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ContactForm.tsx`: already extracted and validated — collection page form is a new variant (different fields, same pattern)
- `SampleRequestForm.tsx`: Google Sheets submission logic lives here — collection form mirrors this
- `SustainabilitySnapshot.tsx`: existing CO₂ + EPR stats on homepage — /sustainability page is the deep-dive version of these same stats
- `ProcessTeaser.tsx`: icon/animation pattern for circular economy SVG loop reference
- Framer Motion (`framer-motion@12`): already installed and used on /process — use for animated progress bars and SVG loop on /sustainability

### Established Patterns
- Forms: `"use client"` + `useState` + validation + Google Sheets POST + success state with WhatsApp fallback
- Section labels: `.section-label` class (JetBrains Mono, amber, uppercase, numbered)
- Section backgrounds: alternate `bg-ink-900` / `bg-ink-800` / `bg-ink-800/50`
- Animation: IntersectionObserver + CSS transition (scroll-reveal) — use for progress bars
- Animation: Framer Motion — already introduced on /process, extend to /sustainability

### Integration Points
- Nav: Add /about, /quality, /sustainability, /collect links
- Footer: Add all 4 new pages to footer links
- AudienceCards.tsx: "Schedule Pickup" CTA (already points to /collect per D-29 from Phase 3)
- AudienceCards.tsx: "View Certifications" CTA (already points to /quality per D-31 from Phase 3)

</code_context>

<deferred>
## Deferred Ideas

- Full company history / visual timeline — user confirmed more history exists; defer to future update after full story is gathered
- Robin Kumar bio details — user to provide; placeholder bio in v1
- Actual cert logos (PCB, BIS IS 18722, ISO 9001) — client to provide when certs are obtained
- Confirmed product spec numbers (VI, sulfur, flash point batch results) — client to provide for lab testing section
- Hindi language version of /collect — v2 (primary supplier audience)
- Map visualization of service area — v2 (no map component in v1)
- Resend email confirmation for pickup form — Phase 5 (INT-01)
- PostHog event tracking on pickup form submission — Phase 5 (INT-02)

</deferred>

---

*Phase: 04-supporting-pages*
*Context gathered: 2026-03-21*
