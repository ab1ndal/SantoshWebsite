# Phase 3: Products & Process Pages - Research

**Researched:** 2026-03-21
**Domain:** Next.js 16 App Router, Framer Motion v12 scroll API, client-side forms, browser PDF download
**Confidence:** HIGH — all findings verified from installed node_modules source and existing codebase

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Audience**
- D-01: Target audience includes investors alongside blenders and suppliers. Process page must build confidence in the plant's technical credibility.

**Technology partner correction**
- D-02: Technology partner is Indian Oil Technology — NOT REVA Process Technologies. Update all references site-wide.

**Process page (/process)**
- D-03: Layout is sticky left panel — step title + technical parameters locked on the left while user scrolls through step detail on the right.
- D-04: Right column per step contains an infographic placeholder (sized SVG frame). Real infographics swapped in later by client. Do NOT use text-heavy right columns.
- D-05: Step detail goes deeper than ProcessTeaser — add specific parameters per step.
- D-06: Reuse step data/icons from ProcessTeaser.tsx as a base — expand content, don't rebuild.
- D-07: Animation: Framer Motion scroll progress (already installed, unused). Steps reveal as user scrolls — not auto-cycling.
- D-08: After the 6 steps: Indian Oil Technology credibility section — bold/prominent, not a footnote card.
- D-09: Process page ends with CTA to /products.

**Products page (/products)**
- D-10: Page structure: Hero → Spec Table → Comparison Table → Grade Cards → Pack Formats → TDS Download gate → Sample Request CTA.
- D-11: Spec table: proper HTML `<table>` with all 7 columns. JetBrains Mono for values. Wrapped in `overflow-x-auto`.
- D-12: Comparison table: 3-column — Santosh Group II+ RRBO vs Group I RRBO vs Virgin Group II. Santosh column highlighted.
- D-13: Mobile tables: horizontal scroll with "swipe →" hint text. No card collapse.
- D-14: Comparison table adds Virgin Group II column, price/availability context, BS-VI compatibility column.

**TDS Download gate (PROD-06)**
- D-15: Inline form that expands in place when user clicks "Download TDS" button.
- D-16: Fields: Full Name (required), Phone Number (required), Email (optional).
- D-17: On submit: browser PDF download fires immediately. Notifications stubbed with console.log (Phase 5).
- D-18: Placeholder PDF ships now at /public/santosh-tds-placeholder.pdf.

**Sample request page (/sample-request)**
- D-19: Dedicated page at /sample-request, not a modal.
- D-20: All "Request a Sample" CTAs site-wide redirect to /sample-request.
- D-21: Fields: Full Name, Address, Phone (required), Email (optional), Grade/Product wanted, Quantity, Intended Application.
- D-22: Success state with WhatsApp fallback link (wa.me/919810121438).
- D-23: Notifications stubbed Phase 3, wired live Phase 5.

**Contact page (/contact)**
- D-24: Dedicated /contact page — extract and reuse FooterCTA form component directly.
- D-25: All "Get in Touch" / "Contact Us" CTAs site-wide redirect to /contact.
- D-26: FooterCTA on homepage remains as-is.

**CTA architecture (site-wide)**
- D-27: "Request a Sample" → /sample-request
- D-28: "Get in Touch" / "Contact Us" → /contact
- D-29: "Schedule Pickup" → /collect (Phase 4 — do not build now)
- D-30: "Download TDS" → inline gate on /products
- D-31: "View Certifications" → /quality (Phase 4 — do not build now)

### Claude's Discretion
- Exact infographic placeholder dimensions and visual treatment per step
- ProcessTeaser auto-cycle behavior on homepage is unchanged
- Grade card layout (cards vs. table rows for SN 150 / SN 500 / Bright Stock)
- Pack format icon style (Lucide icons are installed)
- Section numbering on new pages (continue from homepage's 09 or restart per page)

### Deferred Ideas (OUT OF SCOPE)
- Resend email integration — Phase 5 (INT-01)
- WhatsApp Business API automation — v2
- PostHog event tracking — Phase 5 (INT-02)
- Real TDS PDF — client to provide
- Hindi language version — v2
- /collect pickup page — Phase 4
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PROD-01 | Products page hero with Group II+ positioning headline | Standard page file convention confirmed; hero pattern from existing sections |
| PROD-02 | Product spec table (VI ≥95, Sulfur <300ppm, Flash Point, Pour Point, Colour ASTM, KV@40°C, KV@100°C) | HTML `<table>` with overflow-x-auto; JetBrains Mono font token confirmed in globals.css |
| PROD-03 | Comparison table — Santosh Group II+ RRBO vs Group I RRBO vs Virgin Group II | Same table pattern; CSS class for highlighted column |
| PROD-04 | Available grades section — SN 150, SN 500, Bright Stock with spec previews | Card or row layout per Claude's discretion; Lucide icons available |
| PROD-05 | Pack formats — Bulk tanker, 210L drum, IBC with icons | Lucide icons (Truck, Package, Box); existing section pattern |
| PROD-06 | TDS download — inline expand-in-place form, browser PDF download on submit | Client-side form pattern confirmed; anchor programmatic click pattern for PDF download |
| PROD-07 | Sample request form on Products page (CTA redirects to /sample-request per D-19/D-20) | Dedicated page — see D-19. Nav CTA already points to /products#sample; update to /sample-request |
| PROC-01 | Process page intro — "From used oil to Group II+ in 6 steps" | Standard page file; reuse ProcessTeaser step data + expand |
| PROC-02 | Animated 6-step scroll-triggered diagram with step descriptions | Framer Motion v12 useScroll/useTransform confirmed; sticky-section CSS helper already in globals.css |
| PROC-03 | Lab / technology callout — Indian Oil Technology (NOT REVA) | D-02 correction confirmed; ProcessTeaser.tsx copy must be updated as part of this phase |
| PROC-04 | CTA linking to Products page | Standard Next.js Link component |
</phase_requirements>

---

## Summary

This phase builds four new routes (`/products`, `/process`, `/sample-request`, `/contact`) and updates Nav/Footer CTAs site-wide. The codebase is on Next.js 16.2.1 with React 19.2 and Framer Motion 12.38.0 — all installed and confirmed from package.json. No new packages are required for this phase.

The biggest technical decision is form strategy. Because TDS download requires triggering a browser file download immediately on submit (a client-side-only operation), and because the existing codebase uses the `"use client" + useState + setSubmitted(true)` pattern throughout, all three forms in this phase (TDS gate, sample request, contact) should use the established client-side pattern. Server Actions would add complexity with zero benefit when notifications are stubbed anyway (Phase 5).

The sticky scroll panel for `/process` uses Framer Motion's `useScroll` and `useTransform` hooks, which are confirmed present in framer-motion@12.38.0. The `sticky-section` CSS helper is already defined in `globals.css` — use it. The import path is `framer-motion` (the package re-exports from `motion/react` internally; the `framer-motion` package name still works).

**Primary recommendation:** Use client-side forms for all three forms. Use `useScroll` + `useTransform` from `framer-motion` for the process page scroll animation. Create a placeholder PDF at `/public/santosh-tds-placeholder.pdf` before the TDS gate task runs.

---

## Next.js 16 — Key Findings

### Confirmed: Page file convention is unchanged

Create routes by adding `page.tsx` inside a folder under `src/app/`:

```
src/app/products/page.tsx       → /products
src/app/process/page.tsx        → /process
src/app/sample-request/page.tsx → /sample-request
src/app/contact/page.tsx        → /contact
```

Pages are Server Components by default. Client-side interactivity requires `"use client"` at the top of the component file — exactly as the existing homepage components do.

### Breaking change: `params` and `searchParams` are now Promises

As of Next.js 15 (finalized in 16), `params` and `searchParams` are Promises, not synchronous objects.

```tsx
// Next.js 16 — correct
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
}
```

**Impact for Phase 3:** None of the four new pages use dynamic segments (`[slug]`) or read `searchParams`. All four are static routes. This breaking change does not affect this phase.

### Breaking change: Async Request APIs only

`cookies()`, `headers()`, `draftMode()` are async-only in Next.js 16. **Impact for Phase 3:** These are not used in any new page. No action needed.

### Turbopack is now the default bundler

`next dev` and `next build` use Turbopack by default in Next.js 16. No configuration change needed — the project's `package.json` already uses bare `next dev` and `next build`. This is transparent for the phase.

### Metadata API — confirmed pattern

The existing `layout.tsx` exports a `Metadata` object. New pages can export their own `metadata` const for page-level SEO:

```tsx
// src/app/products/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Group II+ Base Oil Products | Santosh Petrochemical",
  description: "...",
}

export default function ProductsPage() { ... }
```

Source: verified from `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md` and existing `layout.tsx`.

### `"use client"` directive — unchanged

Adding `"use client"` at the top of a component file makes it a Client Component. This is how all interactive components in the existing codebase work (Nav, FooterCTA, ProcessTeaser, etc.). No changes to this pattern.

---

## Framer Motion v12 — Scroll Progress API

### Confirmed: useScroll and useTransform are exported from `framer-motion`

Verified directly from `node_modules/framer-motion/dist/framer-motion.dev.js`:
- `exports.useScroll = useScroll` — line 16300
- `exports.useTransform = useTransform` — line 16303
- `exports.motion = motion` — line 16186

The README note says "import from `motion/react` instead of `framer-motion`" — however the `framer-motion` package itself still exports everything via its main entry. Both import paths work. Use `framer-motion` to match the package name in `package.json`.

### useScroll API (verified from source)

```tsx
import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress of a specific container element
  const { scrollYProgress } = useScroll({
    target: containerRef,      // track this element's scroll position
    offset: ["start end", "end start"]  // when element enters/leaves viewport
  })

  // Map scroll 0→1 to opacity 0→1
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [40, 0])

  return (
    <div ref={containerRef}>
      <motion.div style={{ opacity, y }}>
        Step content
      </motion.div>
    </div>
  )
}
```

### Sticky left panel pattern with scroll-driven right column

The `sticky-section` CSS class is already defined in `globals.css`:
```css
.sticky-section {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}
```

Use it for the left panel. The right column scroll drives `scrollYProgress`. Each step's content animates in via `useTransform` mapping scroll ranges to opacity/translateY.

```tsx
"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

export default function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left panel — sticky */}
      <div className="sticky-section">
        {/* Active step title + params — driven by scroll state */}
      </div>

      {/* Right column — scrollable, infographic frames per step */}
      <div ref={containerRef} className="overflow-y-auto">
        {steps.map((step, i) => {
          const start = i / steps.length
          const end = (i + 1) / steps.length
          // opacity derived from scroll position within this step's range
          return <StepPanel key={step.num} step={step} start={start} end={end} scrollYProgress={scrollYProgress} />
        })}
      </div>
    </div>
  )
}
```

**Alternative simpler pattern (recommended):** Use `useScroll({ target: stepRef })` per step with IntersectionObserver to track which step is active — simpler state management than fractional scroll ranges. This hybrid approach: IO sets `activeStep` state (drives left panel), Framer Motion drives per-step entrance animations on right column.

### No API breaking changes from v10/v11 to v12

The `useScroll`, `useTransform`, `motion` component APIs are unchanged between major versions. The v12 package is the renamed "Motion for React" — same animation primitives, just rebranded. The `scrollYProgress` MotionValue (0→1) works exactly as documented. `useViewportScroll` and `useElementScroll` are marked deprecated — do not use them.

---

## Form Strategy — Client vs Server Actions

### Recommendation: Use client-side pattern for all three forms

**Rationale:**

1. **TDS download requires client-side execution.** Triggering a browser `<a download>` click is a DOM operation — it cannot happen in a Server Action. The download must be initiated in the browser. Therefore the TDS gate form handler *must* run client-side.

2. **Consistency with existing codebase.** FooterCTA uses `"use client" + useState + setSubmitted(true)`. Replicating this pattern means zero cognitive switching cost during implementation.

3. **Notifications are stubbed.** Server Actions provide value when they send emails, write to DB, or revalidate cache. Since all three forms in Phase 3 stub their notifications with `console.log`, there is nothing server-side to do. Server Actions would be premature architecture.

4. **Phase 5 migration is clean.** When Resend is wired in Phase 5, the pattern upgrades to either: (a) call a Server Action from the existing `handleSubmit`, or (b) use a Route Handler at `app/api/contact/route.ts`. Either approach is compatible with the client-side form pattern.

### The established pattern to replicate

From `FooterCTA.tsx` (verified):

```tsx
"use client"

import { useState } from "react"

export default function SampleRequestForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "", address: "", phone: "", email: "",
    grade: "", quantity: "", application: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Phase 5: send to Resend/WhatsApp
    console.log("Sample request:", form)
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessState />
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

### ContactForm refactor

Per D-24, the `/contact` page reuses FooterCTA's form. Extract the form JSX into a shared `<ContactForm />` component in `src/components/ui/ContactForm.tsx`. Both FooterCTA and the `/contact` page import it.

---

## PDF Download Pattern

### How to trigger a browser file download after form submit

The cleanest approach in a client component is a programmatic anchor click after state is set:

```tsx
"use client"

import { useState } from "react"

export default function TDSGate() {
  const [expanded, setExpanded] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", email: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Trigger browser download immediately
    const link = document.createElement("a")
    link.href = "/santosh-tds-placeholder.pdf"
    link.download = "Santosh-Group-II-Plus-TDS.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // 2. Stub notification (Phase 5: Resend + WhatsApp)
    console.log("TDS download captured:", form)

    // 3. Show success state
    setSubmitted(true)
  }

  // ...
}
```

**Why this pattern (not a redirect or fetch):**
- PDF is a static file in `/public/` — no server round-trip needed
- `link.download` attribute forces browser download dialog instead of opening in a new tab
- Works across all modern browsers (Chrome 111+, Firefox 111+, Safari 16.4+ — which are the Next.js 16 minimum browser targets)
- Does not require Server Actions

**The placeholder PDF must exist at `/public/santosh-tds-placeholder.pdf` before this code runs.** A Wave 0 task must create it (even a 1KB blank PDF is sufficient).

### Alternative: `<a href="/santosh-tds-placeholder.pdf" download>` as hidden link

For cases where JavaScript is disabled, this degrades gracefully. But the form-submit trigger requires the programmatic approach above since the download happens on form submit, not a static click.

---

## Architecture Patterns

### New file structure

```
src/
├── app/
│   ├── products/
│   │   └── page.tsx          # /products — Server Component wrapper
│   ├── process/
│   │   └── page.tsx          # /process — Server Component wrapper
│   ├── sample-request/
│   │   └── page.tsx          # /sample-request
│   └── contact/
│       └── page.tsx          # /contact
├── components/
│   ├── sections/
│   │   ├── products/
│   │   │   ├── ProductsHero.tsx
│   │   │   ├── SpecTable.tsx
│   │   │   ├── ComparisonTable.tsx
│   │   │   ├── GradeCards.tsx
│   │   │   ├── PackFormats.tsx
│   │   │   └── TDSGate.tsx
│   │   └── process/
│   │       ├── ProcessHero.tsx
│   │       ├── ProcessSteps.tsx      # Framer Motion scroll — "use client"
│   │       └── IOCLCallout.tsx       # Indian Oil Technology section
│   └── ui/
│       ├── ContactForm.tsx           # Shared — used by FooterCTA + /contact
│       └── SampleRequestForm.tsx     # Used by /sample-request page
└── public/
    └── santosh-tds-placeholder.pdf   # Must exist before TDS gate task
```

### Page composition pattern (from existing page.tsx)

```tsx
// src/app/products/page.tsx
import type { Metadata } from "next"
import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"
import WhatsAppButton from "@/components/ui/WhatsAppButton"
import ProductsHero from "@/components/sections/products/ProductsHero"
// ... other section imports

export const metadata: Metadata = {
  title: "Group II+ RRBO Products | Santosh Petrochemical",
  description: "...",
}

export default function ProductsPage() {
  return (
    <>
      <Nav />
      <main>
        <ProductsHero />
        <SpecTable />
        <ComparisonTable />
        <GradeCards />
        <PackFormats />
        <TDSGate />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
```

### Nav update — already has the links

Inspecting `Nav.tsx`: `navLinks` array already includes `{ href: "/products", label: "Products" }` and `{ href: "/process", label: "Process" }`. The CTA button links to `/products#sample`. Per D-27, update the CTA to `/sample-request`.

### Footer update — already has most links

Footer `footerLinks.Products` already has `"Request a Sample"` linking to `/products#sample` — update to `/sample-request`. `"Download TDS"` links to `/products#tds` — correct as-is (it's inline on the products page per D-30). All needed routes are already present in footer data.

### ProcessTeaser.tsx copy update (D-02 correction)

The `<p>` in ProcessTeaser.tsx (line 122) reads "REVA Process Technologies (Pune/European)". This must be updated to "Indian Oil Technology" as part of Phase 3. This is a simple text change in one file.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-linked animations | Custom scroll event listener + state | `useScroll` + `useTransform` from `framer-motion` | Already installed; handles RAF, cleanup, SSR safety |
| PDF download trigger | Fetch-to-blob or server redirect | Programmatic anchor click on static `/public/` file | Simpler, no server round-trip, works with Turbopack static serving |
| Form state management | Custom reducer | `useState` with flat object (established pattern) | Consistent with FooterCTA; sufficient for 4-7 field forms |
| Sticky positioning | JavaScript scroll + position:fixed toggle | CSS `position: sticky` + `.sticky-section` class (already in globals.css) | Native CSS; better performance; already defined |
| Table mobile UX | JS-driven card collapse | `overflow-x-auto` wrapper + "swipe →" hint text (per D-13) | Per user decision; simpler; no JS required |

---

## Common Pitfalls

### Pitfall 1: Framer Motion in Server Components
**What goes wrong:** Importing `motion` or `useScroll` in a file without `"use client"` causes a build error — React hooks cannot run in Server Components.
**Why it happens:** ProcessSteps.tsx will use hooks; if the page file accidentally imports it without the "use client" boundary propagating.
**How to avoid:** Keep process page animation components in their own files with `"use client"` at the top. The page.tsx itself remains a Server Component.

### Pitfall 2: PDF file missing at build time
**What goes wrong:** TDS gate submits successfully but triggers a 404. The download link resolves to `/santosh-tds-placeholder.pdf` which doesn't exist in `/public/`.
**Why it happens:** The file must be physically present in `/public/` before `npm run build` or before testing.
**How to avoid:** Wave 0 task: create `/public/santosh-tds-placeholder.pdf` (can be a minimal valid PDF or even a 1-line text file renamed — browsers will still download it). Better: create a minimal placeholder PDF.

### Pitfall 3: `framer-motion` SSR hydration mismatch
**What goes wrong:** Scroll-linked values (scrollYProgress) are 0 on server, non-zero on client, causing a hydration warning.
**Why it happens:** `useScroll` reads `window.scrollY` which doesn't exist server-side.
**How to avoid:** Framer Motion handles this internally via `useIsomorphicLayoutEffect` (verified in source). No special handling needed — just ensure the component has `"use client"`.

### Pitfall 4: Nav CTA still pointing to `/products#sample`
**What goes wrong:** "Request Sample →" button in Nav takes users to `/products` page instead of `/sample-request`.
**Why it happens:** Nav.tsx currently has `href="/products#sample"` (lines 98 and 144).
**How to avoid:** Update both desktop and mobile Nav CTA hrefs to `/sample-request` as part of CTA architecture task.

### Pitfall 5: Table overflow on mobile breaking layout
**What goes wrong:** Spec table overflows the page width instead of scrolling horizontally.
**Why it happens:** `overflow-x-auto` must be on the *wrapper div*, not the table itself. If the parent has `overflow: hidden`, scroll is blocked.
**How to avoid:** Wrap `<table>` in `<div className="overflow-x-auto w-full">`. Ensure no ancestor has `overflow: hidden` that would trap the scroll.

### Pitfall 6: ProcessTeaser.tsx still references REVA
**What goes wrong:** Homepage process section still shows "REVA Process Technologies" after Phase 3 ships.
**Why it happens:** ProcessTeaser.tsx line 122 hardcodes the old partner name.
**How to avoid:** This file edit is in scope for Phase 3 (D-02). Must be included in the Process page task or as a dedicated "site-wide corrections" task.

---

## Code Examples

### useScroll per-step entrance animation

```tsx
// Source: framer-motion@12.38.0 — verified from dist/framer-motion.dev.js
"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

function StepReveal({ children, index, totalSteps }: {
  children: React.ReactNode
  index: number
  totalSteps: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"]
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [32, 0])

  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      {children}
    </motion.div>
  )
}
```

### Inline TDS gate expand pattern

```tsx
"use client"

import { useState } from "react"

export default function TDSGate() {
  const [expanded, setExpanded] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", email: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Trigger download
    const a = document.createElement("a")
    a.href = "/santosh-tds-placeholder.pdf"
    a.download = "Santosh-Group-II-Plus-TDS.pdf"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    // Stub notification (Phase 5)
    console.log("TDS download lead captured:", { ...form })
    setSubmitted(true)
  }

  if (!expanded) {
    return (
      <button onClick={() => setExpanded(true)}
        className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition-colors"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}
      >
        Download TDS →
      </button>
    )
  }

  if (submitted) {
    return <div>Downloading... Check your downloads folder.</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name, Phone (required), Email (optional) */}
    </form>
  )
}
```

### HTML table with mobile scroll

```tsx
// Per D-11, D-13
<div className="overflow-x-auto w-full">
  <p className="text-xs text-ink-400 mb-2 lg:hidden"
    style={{ fontFamily: "'JetBrains Mono', monospace" }}>
    ← swipe →
  </p>
  <table className="w-full min-w-[600px] border-collapse">
    <thead>
      <tr className="border-b border-ink-600/60">
        <th className="text-left py-3 px-4 text-xs text-ink-400 uppercase tracking-wider"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}>Property</th>
        {/* ... columns */}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="py-3 px-4 text-ink-200">Viscosity Index</td>
        <td className="py-3 px-4 text-green-400"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}>≥95</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `useViewportScroll()` (Framer Motion) | `useScroll()` | FM v7 | Old API still exported but marked deprecated; use `useScroll()` |
| `useElementScroll(ref)` (Framer Motion) | `useScroll({ container: ref })` | FM v7 | Same — deprecated warning in v12 source |
| Synchronous `params` in page components | `await params` (Promise) | Next.js 15/16 | Only affects dynamic routes; not relevant to Phase 3's static pages |
| `experimental.turbopack` config | Top-level `turbopack` config | Next.js 16 | No custom webpack config in this project; Turbopack default is transparent |
| `middleware.ts` | `proxy.ts` | Next.js 16 | Not used in Phase 3; note for future phases |

---

## Validation Architecture

### Manual verification checklist (no automated test framework detected)

No `jest.config.*`, `vitest.config.*`, `pytest.ini`, or `__tests__/` directory exists in the project. Testing for this phase is manual browser verification.

### Phase Gate Checklist (run before marking Phase 3 complete)

| Check | Command / Method | Pass Criteria |
|-------|-----------------|---------------|
| Build succeeds | `npm run build` | Exit 0, no TypeScript errors |
| Dev server starts | `npm run dev` | No console errors |
| /products renders | Browser: localhost:3000/products | All 7 sections visible, no layout breaks |
| Spec table mobile | Browser: devtools 375px | Horizontal scroll works, "swipe →" visible |
| Comparison table highlighted | Browser | Santosh column has green border, amber header |
| TDS gate expands | Click "Download TDS" | Form appears in-place |
| TDS download fires | Submit TDS form | PDF download dialog appears |
| /process renders | Browser: localhost:3000/process | Sticky left panel, 6 step sections |
| Scroll animation | Scroll /process page | Steps animate in on scroll |
| Indian Oil Technology section | Browser: /process | Visible after step 6, prominent not footnote |
| Process CTA → /products | Click CTA on /process | Navigates to /products |
| /sample-request renders | Browser | All required fields, success state on submit |
| /contact renders | Browser | ContactForm component, success state |
| Nav "Request Sample" CTA | Click in nav | Routes to /sample-request |
| "Get in Touch" CTAs | Click in Hero/AudienceCards | Routes to /contact |
| ProcessTeaser copy updated | Browser: homepage | Shows "Indian Oil Technology", not "REVA" |
| Footer links | Browser: footer | /sample-request and /contact links present |

### Quick build verification

```bash
cd /Users/abindal/dev/SantoshWebsite && npm run build
```

---

## Open Questions

1. **ProcessTeaser homepage — which CTA URLs to update?**
   - What we know: ProcessTeaser has a "View Full Process →" link to `/process` (correct). AudienceCards likely has "Request a Sample" pointing somewhere — needs inspection.
   - What's unclear: Exact current href values in Hero, AudienceCards, and any other section with "Request a Sample" or "Get in Touch" copy.
   - Recommendation: Read `src/components/sections/Hero.tsx` and `src/components/sections/AudienceCards.tsx` at plan time to identify all CTA hrefs that need updating.

2. **ContactForm extraction — does FooterCTA need to change its structure?**
   - What we know: D-26 says FooterCTA on homepage remains as-is. D-24 says /contact page reuses the form component.
   - What's unclear: Whether to extract form JSX into a shared component and have FooterCTA import it, or duplicate the form in the /contact page.
   - Recommendation: Extract into `<ContactForm />` component. FooterCTA imports and uses it. /contact page uses it independently. This satisfies both D-24 and D-26 cleanly.

3. **Grade cards — Cards vs table rows?**
   - What we know: Three grades (SN 150, SN 500, Bright Stock) with spec previews. Left to Claude's discretion.
   - Recommendation: Card layout (3 columns on desktop, stacked on mobile). Each card: grade name in Bebas Neue, spec highlights in JetBrains Mono, "Request Sample" CTA linking to /sample-request.

---

## Sources

### Primary (HIGH confidence)
- `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` — Next.js 16 breaking changes, async params, Turbopack defaults
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md` — page.tsx API, params as Promise
- `node_modules/next/dist/docs/01-app/02-guides/forms.md` — Server Actions, useActionState, form patterns
- `node_modules/framer-motion/dist/framer-motion.dev.js` — useScroll, useTransform, motion exports verified at source
- `node_modules/framer-motion/package.json` — version 12.38.0 confirmed
- `src/components/sections/FooterCTA.tsx` — existing form pattern
- `src/components/sections/ProcessTeaser.tsx` — step data to reuse
- `src/app/globals.css` — design tokens, .sticky-section helper
- `src/components/layout/Nav.tsx` — existing nav links, CTA hrefs
- `src/components/layout/Footer.tsx` — existing footer links

### Secondary (MEDIUM confidence)
- `node_modules/framer-motion/README.md` — confirms "Framer Motion is now Motion" rebrand, both import paths work

---

## Metadata

**Confidence breakdown:**
- Next.js 16 page conventions: HIGH — read directly from installed docs
- Framer Motion v12 scroll API: HIGH — verified from installed source code
- Form strategy (client-side): HIGH — established pattern in codebase + constraint (PDF download requires browser DOM)
- PDF download pattern: HIGH — standard browser API, verified against Next.js 16 browser support matrix
- Architecture patterns: HIGH — derived from existing codebase structure

**Research date:** 2026-03-21
**Valid until:** 2026-06-21 (90 days — stable APIs)
