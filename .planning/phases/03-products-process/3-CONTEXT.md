# Phase 3: Products & Process Pages - Context

**Gathered:** 2026-03-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Build `/products` and `/process` pages — the two core commercial pages. Products converts blender interest into data (TDS download, sample request). Process builds credibility with investors, engineers, and procurement teams. Also adds `/sample-request` and `/contact` as dedicated CTA destination pages.

Does NOT include: Resend/WhatsApp live sending (Phase 5), `/collect` pickup page (Phase 4), certifications/quality pages (Phase 4).

</domain>

<decisions>
## Implementation Decisions

### Audience shift (critical context)
- **D-01:** Target audience includes **investors** alongside blenders and suppliers. Process page must build confidence in the plant's technical credibility, not just explain the product.

### Technology partner correction
- **D-02:** Technology partner is **Indian Oil Technology** — NOT REVA Process Technologies. Update all references site-wide (ProcessTeaser.tsx copy, PROJECT.md, any static text). IOCL association carries strong trust signal in Indian market.

### Process page — /process
- **D-03:** Layout is **sticky left panel** — step title + concise technical parameters (temps, pressures, equipment names) locked on the left while user scrolls through step detail on the right.
- **D-04:** Right column per step contains an **infographic placeholder** (sized SVG frame). Real infographics to be swapped in later by client. Do NOT use text-heavy right columns.
- **D-05:** Step detail goes **deeper than ProcessTeaser** — add specific parameters per step: temperatures, pressures, filtration specs, equipment names (e.g. Wiped Film Evaporator, 280–300°C vacuum temp, H₂ catalyst).
- **D-06:** Reuse step data/icons from `ProcessTeaser.tsx` as a base — expand content, don't rebuild from scratch.
- **D-07:** Animation: Framer Motion scroll progress (already installed, unused). Steps reveal as user scrolls — not auto-cycling.
- **D-08:** After the 6 steps: Indian Oil Technology credibility section — name + "trusted Indian market technology" positioning + placeholder for their logo. Bold/prominent, not a footnote card.
- **D-09:** Process page ends with CTA → `/products` (PROC-04).

### Products page — /products
- **D-10:** Page structure: Hero → Spec Table → Comparison Table → Grade Cards (SN 150 / SN 500 / Bright Stock) → Pack Formats → TDS Download gate → Sample Request CTA.
- **D-11:** Spec table (PROD-02): Proper HTML `<table>` with all 7 columns — VI ≥95, Sulfur <300ppm, Flash Point, Pour Point, Colour ASTM, KV@40°C, KV@100°C. JetBrains Mono for values. Wrapped in `overflow-x-auto` div.
- **D-12:** Comparison table (PROD-03): 3-column — Santosh Group II+ RRBO vs Group I RRBO vs Virgin Group II. Santosh column highlighted: green border, amber header accent, visually elevated. Others muted. This is a commercial page, not neutral review.
- **D-13:** Mobile tables: horizontal scroll with "swipe →" hint text. No card collapse.
- **D-14:** Comparison table goes deeper than the homepage WhyGroupII bars — add Virgin Group II column, price/availability context, and BS-VI compatibility column.

### TDS Download gate (PROD-06)
- **D-15:** Inline form that expands in place when user clicks "Download TDS" button.
- **D-16:** Fields: Full Name (required), Phone Number (required), Email (optional).
- **D-17:** On submit: browser PDF download fires immediately. Post-submit notifications (email via Resend + WhatsApp link) stubbed with `console.log` — wired live in Phase 5 (INT-01).
- **D-18:** Placeholder PDF ships now (`/public/santosh-tds-placeholder.pdf`). Real TDS PDF swapped in by client later.

### Sample request page — /sample-request (new, Phase 3)
- **D-19:** Dedicated page at `/sample-request`, not a modal or Products page section.
- **D-20:** All "Request a Sample" CTAs site-wide redirect to `/sample-request`.
- **D-21:** Fields: Full Name (required), Address (required), Phone (required), Email (optional), Grade/Product wanted, Quantity, Intended Application.
- **D-22:** Success state: "Sample request received — our team will contact you within 2 business days." + WhatsApp fallback link (`wa.me/919810121438`).
- **D-23:** Notifications stubbed Phase 3 → wired live Phase 5.

### Contact page — /contact (new, Phase 3)
- **D-24:** Dedicated `/contact` page — extract and reuse FooterCTA form component directly.
- **D-25:** All "Get in Touch" / "Contact Us" CTAs site-wide redirect to `/contact`.
- **D-26:** FooterCTA on homepage remains as-is (does not get removed).

### CTA architecture (site-wide)
- **D-27:** "Request a Sample" → `/sample-request`
- **D-28:** "Get in Touch" / "Contact Us" → `/contact`
- **D-29:** "Schedule Pickup" → `/collect` (Phase 4 — do not build now)
- **D-30:** "Download TDS" → inline gate on `/products`
- **D-31:** "View Certifications" → `/quality` (Phase 4 — do not build now)

### Claude's Discretion
- Exact infographic placeholder dimensions and visual treatment per step
- ProcessTeaser auto-cycle behavior on homepage is unchanged
- Grade card layout (cards vs. table rows for SN 150 / SN 500 / Bright Stock)
- Pack format icon style (Lucide icons are installed)
- Section numbering on new pages (continue from homepage's 09 or restart per page)

</decisions>

<specifics>
## Specific Ideas

- "The website should attract investors, make people have confidence in our process and compel them to reach out." — process page is as much an investor credibility piece as a product explainer.
- Process page: "go much deeper into details" with "relevant infographics" but "not overabundance of text" — infographics carry the weight, text is precise and minimal.
- Technology is Indian Oil Technology — this is a trust signal for the Indian market, lean into it.
- TDS gate: phone is the primary lead capture (WhatsApp is the real follow-up channel for Indian B2B). Email is secondary.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` §Phase 3 — PROD-01 to PROD-07, PROC-01 to PROC-04 (full spec per requirement)

### Brand & design system
- `src/app/globals.css` — all design tokens (colors, fonts, CSS variables). Do not hardcode hex values not in this file.

### Existing components to reuse
- `src/components/sections/ProcessTeaser.tsx` — step data, SVG icons, IntersectionObserver animation pattern. Process page reuses and expands this.
- `src/components/sections/FooterCTA.tsx` — form pattern (field layout, input styles, success state). Contact page reuses this component directly.
- `src/components/sections/WhyGroupII.tsx` — comparison pattern reference. Products comparison table expands on this.
- `src/app/page.tsx` — page composition pattern (Nav + main + Footer + WhatsAppButton).

### Competitor & market context
- `.planning/research/COMPETITOR.md` — IFP spec data for comparison table (Group I sulfur range, VI range, process type)
- `.planning/research/MARKET.md` — market context for Products page hero copy

### Project context
- `.planning/PROJECT.md` §Technology — Indian Oil Technology details, plant specs (65 TPD, 200 TPD design), product output
- `.planning/PROJECT.md` §Constraints — Specs pending client confirmation; use Group II+ industry standards as reference, flag for confirmation

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ProcessTeaser.tsx` step array: directly reusable as the data source for `/process` page — extend with `technicalParams` field per step
- `FooterCTA.tsx`: extract form JSX into a shared `<ContactForm />` component — used on both `/contact` page and footer
- `WhyGroupII.tsx` animated bars: reference for comparison visual style, but Products page uses HTML table instead
- Lucide React (`lucide-react` installed): use for pack format icons (Truck, Package, Box or similar)
- Framer Motion (`framer-motion@12` installed, unused): use for Process page scroll-triggered sticky panel

### Established Patterns
- Animation: `IntersectionObserver` + CSS transition with staggered `transitionDelay` — keep this for Products page sections
- Animation: Framer Motion — introduce on Process page only (scroll progress for sticky panel)
- Forms: `"use client"` + `useState({ ...fields })` + `setSubmitted(true)` on submit — replicate for TDS gate and sample request
- Section labels: `.section-label` class (JetBrains Mono, amber, uppercase, tracked)
- Section backgrounds alternate: `bg-ink-900` / `bg-ink-800` / `bg-ink-800/50`
- Focus states: `:focus-visible` with green outline already in globals.css

### Integration Points
- Nav links: Add `/products` and `/process` to Nav component
- Footer links: Add `/products`, `/process`, `/contact`, `/sample-request` to Footer
- Homepage CTAs: Update "Request a Sample" href → `/sample-request`, "Get in Touch" → `/contact` in Hero, AudienceCards, FooterCTA where applicable

</code_context>

<deferred>
## Deferred Ideas

- Resend email integration — Phase 5 (INT-01). TDS and sample form notifications stubbed now.
- WhatsApp Business API automation (auto-send TDS PDF to phone) — v2. Phase 3 uses pre-filled `wa.me` link only.
- PostHog event tracking on TDS download and sample request — Phase 5 (INT-02)
- Real TDS PDF — client to provide. Placeholder PDF ships with Phase 3.
- Hindi language version of process/products pages — v2 (supplier audience)
- `/collect` pickup page — Phase 4 (COLL-01 to COLL-02)

</deferred>

---

*Phase: 03-products-process*
*Context gathered: 2026-03-21*
