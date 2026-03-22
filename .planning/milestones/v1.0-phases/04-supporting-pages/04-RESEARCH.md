# Phase 4: Supporting Pages - Research

**Researched:** 2026-03-21
**Domain:** Next.js 16 App Router static content pages with form integration, scroll-triggered animation, SVG animation, Google Sheets API reuse
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01:** EPR mandate progression displayed as animated progress bars — one bar per year milestone, fills on scroll. Milestones: FY2025 (5%), FY2027 (15%), FY2029 (30%), FY2031 (50%).
**D-02:** CO₂ savings framing is research-based — executor must look up published figures for CO₂ savings per tonne of RRBO vs virgin base oil and cite the source inline. Do NOT invent numbers.
**D-03:** Circular economy diagram is an animated SVG loop — 4 nodes: Used Oil Collected → Re-Refined → Back Into Engines → Collected Again. Style consistent with ProcessTeaser icon treatment (SVG icons, green/amber palette).
**D-04:** Page hero leads with environmental opportunity framing — "Turning India's Used Oil Problem Into an Opportunity" or similar. Not regulatory-first.
**D-05:** Pickup scheduling form submits to Google Sheets (same API route as /sample-request, ships in Phase 3-05) + success state shows WhatsApp link (`wa.me/919810121438`).
**D-06:** Form fields: Business name, Phone (required), Location/address, Quantity available (approximate liters or drums), Preferred frequency (one-time / regular).
**D-07:** Service area displayed as text list: Delhi NCR, Ghaziabad, Meerut, Muzaffarnagar, Saharanpur, Moradabad, Rampur. No map component.
**D-08:** /collect page tone — warm/accessible hero ("We pick up. You get paid. No hassle.") followed by structured process steps in standard brand voice.
**D-09:** Prominent WhatsApp CTA on /collect is page-specific — a large button or callout block, not just the floating button.
**D-10:** 2 promoters featured: Lalit Bindal (35yr oil industry experience, IOCL SSI background) and Robin Kumar. Each gets a card with name, role, and short bio. Pooja Bindal and Abhinav Bindal listed by name only (or omitted from v1).
**D-11:** Company history is a simple text section — well-structured paragraphs, no visual timeline.
**D-12:** Santosh Petrochemical Innovations framed with milestone framing for setup phase — "Plant commissioning underway, production expected within ~2 years."
**D-13:** Page has two distinct sections: (1) Company & credibility story, (2) Market opportunity / why now.
**D-14:** 3 cert cards (PCB registration, BIS IS 18722, ISO 9001), all shown with "Pursuing" / "In Progress" badge.
**D-15:** Cert card design: icon + name + issuing body + short description. No logo placeholder area.
**D-16:** Lab testing data section shows methodology only — no specific numbers committed.
**D-17:** /quality is an independent authoritative page. CertificationsStrip.tsx stays as-is. No update to the strip in Phase 4.

### Claude's Discretion
- Exact animated progress bar implementation (CSS transition vs Framer Motion)
- SVG loop animation technique (CSS keyframes or Framer Motion)
- Section ordering within each page beyond the decisions above
- Promoter card layout (horizontal vs. vertical)
- Whether /about includes a "Why now?" stat callout (EPR mandate % or market size)

### Deferred Ideas (OUT OF SCOPE)
- Full company history / visual timeline
- Robin Kumar bio details (placeholder bio in v1)
- Actual cert logos (PCB, BIS IS 18722, ISO 9001)
- Confirmed product spec numbers (VI, sulfur, flash point batch results)
- Hindi language version of /collect
- Map visualization of service area
- Resend email confirmation for pickup form (Phase 5)
- PostHog event tracking on pickup form submission (Phase 5)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ABOUT-01 | About Us page — company history, Santosh Associates background, IOCL SSI context | Company story in PROJECT.md; two-section structure (credibility + market opportunity) per D-13; simple text sections, no special tech needed |
| ABOUT-02 | Promoter/team section (Lalit Bindal profile — 35yr experience) | Card pattern from established UI components; D-10 defines scope; vertical or horizontal card layout |
| QUAL-01 | Quality & Certifications page with cert display cards | New page with 3 cert cards + "In Progress" badge; icon + name + issuing body; independent of CertificationsStrip per D-17 |
| QUAL-02 | Lab testing data display (VI, sulfur, flash point methodology) | Methodology text section only; no spec numbers; mirrors ProcessTeaser technical language register |
| SUST-01 | Sustainability page — EPR mandate progression (5%→50% by FY2031), environmental impact | EPR data confirmed in MARKET.md; SustainabilitySnapshot.tsx already has progress bar and SVG — deep-dive version expands same content |
| SUST-02 | CO₂ savings calculator/counter and circular economy diagram | D-02: CO₂ data must be cited from real source; D-03: animated SVG loop, 4 nodes; Framer Motion already in use on /process |
| COLL-01 | Used Oil Collection page — how it works, service area | Text list per D-07; warm tone per D-08; process steps section |
| COLL-02 | Pickup scheduling form + WhatsApp CTA | Google Sheets API route `/api/sample-request` confirmed shipped in Phase 3-05; new route `/api/collect-pickup` needed (separate sheet tab); success state shows WhatsApp link |
</phase_requirements>

---

## Summary

Phase 4 builds 4 static-first content pages (about, quality, sustainability, collect) that function as trust-building landing pages for three distinct audiences: compliance teams (/quality), used oil suppliers (/collect), and investors/partners (/about, /sustainability). All four pages follow the exact same structural pattern already established in Phase 3: Server Component page wrapper + client islands for interactive elements (forms, animations).

The technical complexity in this phase is concentrated in two areas: (1) the /sustainability animated progress bars and circular economy SVG loop, and (2) the /collect pickup scheduling form. Everything else is static content composition using the established component library. The progress bar animation already exists in `SustainabilitySnapshot.tsx` — the /sustainability page is a deep-dive expansion of those same patterns. The /collect form is a direct structural clone of `SampleRequestForm.tsx` with different fields and a new Google Sheets tab.

**Primary recommendation:** Build each page as a Server Component page.tsx that composes sections. Extract only interactive islands (PickupForm, EPRProgressBars, CircularEconomySVG) as `"use client"` components. Reuse form submission logic against the existing `/api/sample-request` route pattern but write to a new "Collect Pickup" sheet tab via a new route `/api/collect-pickup`.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 16.2.1 (installed) | Page routing, Server Components, Metadata API | Already in use; this version, not v14 as stated in PROJECT.md |
| React | 19.2.4 (installed) | UI rendering | In use across all pages |
| Tailwind CSS | v4 (@import "tailwindcss") | Styling via brand tokens | globals.css uses @theme inline; all existing components use this |
| Framer Motion | ^12.38.0 (installed) | Scroll-triggered animation, SVG animation | Already used in ProcessSteps.tsx; `useScroll`, `useTransform`, `motion` API confirmed |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| google-auth-library | (installed) | Google Sheets auth for pickup form API route | Same pattern as `/api/sample-request/route.ts` |
| lucide-react | (installed) | Icons in Nav, Footer | Use for cert card icons if needed |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Framer Motion for progress bars | CSS transitions (IntersectionObserver + state) | SustainabilitySnapshot.tsx already uses CSS transition + IntersectionObserver for progress bars — this pattern is simpler and already works. Use CSS for progress bars; reserve Framer Motion for SVG loop animation |
| CSS keyframes for SVG loop | Framer Motion `animate` + `transition.repeat` | Framer Motion is cleaner for looping SVG path/dash animations; already imported in project |

**Installation:** No new packages required. All dependencies are already installed.

**Version note:** Next.js is 16.2.1 (not 14 as documented in PROJECT.md). AGENTS.md warns of breaking changes — App Router file conventions and Metadata API are confirmed stable and consistent with usage in Pages 3.

---

## Architecture Patterns

### Recommended Project Structure
```
src/app/
├── about/
│   └── page.tsx              # Server Component, no client state needed
├── quality/
│   └── page.tsx              # Server Component, no client state needed
├── sustainability/
│   └── page.tsx              # Server Component; imports client EPR + SVG components
└── collect/
    └── page.tsx              # Server Component; imports client PickupForm

src/components/
├── sections/
│   ├── sustainability/
│   │   ├── EPRProgressBars.tsx    # "use client" — IntersectionObserver + CSS transitions
│   │   └── CircularEconomySVG.tsx # "use client" — Framer Motion loop animation
│   └── collect/
│       └── PickupForm.tsx         # "use client" — form state, validation, Google Sheets POST
└── (no new ui/ components needed — reuse existing patterns)

src/app/api/
└── collect-pickup/
    └── route.ts              # New API route; mirrors sample-request/route.ts exactly; writes to "Collect Pickup" sheet tab
```

### Pattern 1: Server Component Page with Client Islands
**What:** page.tsx is a Server Component (no "use client" directive). Sections that require interactivity (form, animated elements) are extracted to separate `"use client"` files imported into the page.
**When to use:** All 4 pages in this phase follow this pattern.
**Example:**
```typescript
// src/app/sustainability/page.tsx — Server Component
import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import EPRProgressBars from "@/components/sections/sustainability/EPRProgressBars";
import CircularEconomySVG from "@/components/sections/sustainability/CircularEconomySVG";

export const metadata: Metadata = {
  title: "Sustainability | Santosh Petrochemical",
  description: "...",
};

export default function SustainabilityPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero section — pure markup, no client state */}
        <section className="bg-ink-950 py-24 pt-36 lg:pt-40">...</section>
        {/* EPR progress bars — needs IntersectionObserver */}
        <EPRProgressBars />
        {/* Circular economy SVG — Framer Motion animation */}
        <CircularEconomySVG />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
```

### Pattern 2: Pickup Form (mirrors SampleRequestForm)
**What:** `"use client"` component with `useState` for form fields + errors + submitted state; `fetch` POST to `/api/collect-pickup`; success state shows WhatsApp link.
**When to use:** /collect page form (COLL-02).
**Example:**
```typescript
// src/components/sections/collect/PickupForm.tsx
"use client";
import { useState } from "react";

const frequencies = ["One-time pickup", "Regular (weekly)", "Regular (monthly)", "Not sure yet"];

export default function PickupForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ business?: string; phone?: string }>({});
  const [form, setForm] = useState({
    business: "", phone: "", location: "", quantity: "", frequency: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { business?: string; phone?: string } = {};
    if (!form.business.trim()) newErrors.business = "Business name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    try {
      await fetch("/api/collect-pickup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (err) {
      console.error("Pickup form error:", err);
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        {/* success checkmark — same pattern as SampleRequestForm */}
        <h3 className="text-xl text-white font-bold mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          Pickup request received
        </h3>
        <p className="text-ink-200 text-sm mb-6">We'll call you within one business day to arrange.</p>
        <a
          href="https://wa.me/919810121438"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition-colors"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          WhatsApp us now →
        </a>
      </div>
    );
  }
  // ... form fields
}
```

### Pattern 3: EPR Progress Bars (extend SustainabilitySnapshot pattern)
**What:** IntersectionObserver triggers `setVisible(true)` once. CSS `transition-all duration-1000` with `transitionDelay` staggers bars. Width animates from `"0%"` to `${m.pct * 2}%`. This is the exact implementation in `SustainabilitySnapshot.tsx` — copy and expand.
**When to use:** /sustainability EPR section (D-01, SUST-01).

### Pattern 4: Animated SVG Loop (Framer Motion)
**What:** Framer Motion `animate` with `transition: { repeat: Infinity, duration, ease }` applied to SVG path `strokeDashoffset` or to individual nodes for pulse/glow effect.
**When to use:** /sustainability circular economy diagram (D-03, SUST-02).
**Example:**
```typescript
// src/components/sections/sustainability/CircularEconomySVG.tsx
"use client";
import { motion } from "framer-motion";

export default function CircularEconomySVG() {
  return (
    <svg viewBox="0 0 400 300" className="w-full max-w-lg">
      {/* Animated arrow loop — dash animation */}
      <motion.path
        d="M350 150 Q350 50 200 50 Q50 50 50 150 Q50 250 200 250 Q350 250 350 150"
        fill="none"
        stroke="#3a9e64"
        strokeWidth="2"
        strokeDasharray="8 4"
        animate={{ strokeDashoffset: [0, -48] }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      />
      {/* 4 nodes with labels */}
    </svg>
  );
}
```

### Pattern 5: Cert Card (new component, no existing equivalent)
**What:** Static card component. Icon + name + issuing body + description + "In Progress" badge. No client state needed.
**When to use:** /quality cert display (D-14, D-15, QUAL-01).
**Example:**
```typescript
// Inline in quality/page.tsx or extracted to CertCard.tsx
const certs = [
  {
    icon: <svg>...</svg>,  // custom SVG or lucide icon
    name: "PCB Registration",
    issuingBody: "State Pollution Control Board",
    description: "Required registration for used oil recyclers under Hazardous Waste Rules 2016.",
    status: "In Progress",
  },
  {
    name: "BIS IS 18722",
    issuingBody: "Bureau of Indian Standards",
    description: "India's first standard for Re-Refined Base Oils. Santosh targets Group II+ compliance.",
    status: "Pursuing",
  },
  {
    name: "ISO 9001",
    issuingBody: "International Organization for Standardization",
    description: "Quality Management System certification for consistent production processes.",
    status: "Pursuing",
  },
];
```

### Pattern 6: Google Sheets API Route (new route for collect-pickup)
**What:** Exact copy of `/api/sample-request/route.ts`. Change `SHEET_NAME` to `"Collect Pickup"`. Change destructured fields to `{ business, phone, location, quantity, frequency }`. Same SPREADSHEET_ID, same GoogleAuth pattern, same graceful degradation (200 with warning on Sheets failure).
**When to use:** COLL-02 form submission.

### Anti-Patterns to Avoid
- **Adding "use client" to page.tsx files:** All 4 page files should be Server Components. Only extract interactive islands to client components. Adding "use client" to the page prevents Server Component benefits and is inconsistent with /sample-request/page.tsx and /contact/page.tsx patterns.
- **Modifying CertificationsStrip.tsx:** D-17 explicitly locks this. /quality is independent.
- **Inventing CO₂ numbers:** D-02 is explicit — research a cited source, reference it inline. The SustainabilitySnapshot.tsx "66% less energy" figure comes from the project DPR — use that as a starting anchor, but CO₂ per tonne needs a verified source (see Open Questions).
- **Map component for service area:** D-07 says text list only. No react-leaflet, Google Maps, etc.
- **Adding new nav links for /quality:** Check Nav.tsx — it already has `/about`, `/sustainability`, `/collect` but NOT `/quality`. Footer.tsx already has "Quality & Certs" at `/quality`. Nav needs `/quality` added; footer is already correct.
- **Duplicating the WhatsApp floating button on /collect:** D-09 says the prominent CTA is a page-specific callout block. The global `<WhatsAppButton />` is inherited from layout and stays; the page adds its own distinct section-level CTA.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form state management | Custom form library | useState + noValidate pattern (established in project) | Consistent with ContactForm, SampleRequestForm, TDSGate |
| Scroll-triggered animation | Custom scroll math | IntersectionObserver + CSS transition OR Framer Motion `useScroll` | Both already in use; IntersectionObserver for simple reveal, Framer Motion for complex |
| SVG loop animation | CSS-only keyframes on path | Framer Motion `animate` + `transition.repeat: Infinity` | Framer Motion is already installed and used; cleaner API for repeating animations |
| Google auth for Sheets | Custom OAuth flow | `GoogleAuth` from `google-auth-library` + env vars | Same pattern as `/api/sample-request/route.ts` — already working |
| Service area map | Any map library | Plain text list in styled container | D-07 locked; no map component |

**Key insight:** This phase is a composition phase, not a new-tech phase. All primitives exist. The risk is inconsistency, not complexity.

---

## Navigation Integration — Key Finding

Nav.tsx already has `/about`, `/sustainability`, `/collect` in `navLinks`. It does NOT have `/quality`. Footer.tsx already has `/quality` ("Quality & Certs") in the Company links column.

**Required change to Nav.tsx:** Add `{ href: "/quality", label: "Quality" }` to `navLinks`. This is a small code change that should be part of Plan 04-01 (or a dedicated nav update plan).

---

## CO₂ Research Finding (for D-02 / SUST-02)

The CONTEXT.md and project DPR reference "66% less energy vs virgin oil production" — this is an energy figure, not a CO₂/tonne figure. For D-02, the executor must find a published lifecycle analysis. Known reference points from the project research:

- SustainabilitySnapshot.tsx currently shows: "66% Less energy vs virgin oil production" (sourced from project DPR/TEV Report)
- "~70% Base oil yield from used oil feed" (project DPR)
- MARKET.md does not cite a CO₂ per tonne figure

**Recommendation for executor:** Search "lifecycle analysis re-refined base oil CO₂ emissions per tonne" and "RRBO vs virgin base oil carbon footprint". Academic sources such as the European Lubricants Industry Association (ATIEL), GEIR (Group for the Reuse of Lubricants), or published LCA studies are the canonical sources. If no specific India-applicable per-tonne figure can be found, frame around the 66% energy reduction with a note that CO₂ savings are proportional, and cite the energy figure source.

---

## Common Pitfalls

### Pitfall 1: Wrong `params` type in Next.js 16 dynamic routes
**What goes wrong:** Dynamic route pages use `params.id` directly (Next.js 14 pattern) instead of `await params`. Phase 4 has no dynamic routes, so this doesn't apply — but ProcessSteps.tsx shows the correct pattern for reference.
**Why it happens:** Next.js 16 made `params` a Promise.
**How to avoid:** Phase 4 pages are all static (`/about`, `/quality`, etc.) — no dynamic params. Non-issue for this phase.
**Warning signs:** Not applicable.

### Pitfall 2: IntersectionObserver Firing Before Component Mounts
**What goes wrong:** `ref.current` is null when `useEffect` runs if the ref hasn't attached.
**Why it happens:** Fast renders or conditional mounting.
**How to avoid:** Guard with `if (ref.current) observer.observe(ref.current)` before observing — this is already the pattern in `SustainabilitySnapshot.tsx` and `ProcessTeaser.tsx`. Copy exactly.
**Warning signs:** Progress bars never animate; no console errors.

### Pitfall 3: Google Sheets Route Tab Name Mismatch
**What goes wrong:** `SHEET_NAME` constant doesn't match the actual tab name in the spreadsheet.
**Why it happens:** Default is "Sheet1" — the sample-request route uses "Sample Request". A new tab "Collect Pickup" must be created in the same spreadsheet before the route is used.
**How to avoid:** Create the "Collect Pickup" tab in the spreadsheet before deploying. The route at `/api/collect-pickup` should use `const SHEET_NAME = "Collect Pickup"` and use the same `SPREADSHEET_ID` as sample-request.
**Warning signs:** Graceful degradation returns 200 with `warning: "Sheets write failed"` — form appears to succeed but data is lost.

### Pitfall 4: Framer Motion `motion` Component on SVG Elements
**What goes wrong:** Using `<motion.circle>` or `<motion.path>` inside a plain `<svg>` without proper SVG namespace awareness causes render errors or ignored animations.
**Why it happens:** SVG elements require specific attribute handling.
**How to avoid:** Framer Motion supports SVG motion components natively (`motion.path`, `motion.circle`, `motion.g`). Use `strokeDashoffset` animation for path drawing effects. ProcessSteps.tsx uses `motion.div` wrapping SVG — for the circular economy loop, use `motion.path` directly inside `<svg>`.
**Warning signs:** Animation plays once then stops, or SVG renders with incorrect attributes.

### Pitfall 5: Nav Update Forgotten
**What goes wrong:** /quality page is live but unreachable from Nav — only reachable via Footer or direct URL.
**Why it happens:** Nav.tsx has `/about`, `/sustainability`, `/collect` but not `/quality`.
**How to avoid:** Include Nav.tsx update as an explicit task in Plan 04-01 or whichever plan builds /quality.
**Warning signs:** QA check of nav links misses /quality.

### Pitfall 6: Cert Card "In Progress" Badge Color Confusion
**What goes wrong:** Using green color for "In Progress" badges suggests certifications are complete — misleading for compliance-focused visitors.
**Why it happens:** Green is the brand primary and default "good" color.
**How to avoid:** Use amber badge for "In Progress"/"Pursuing" status — amber already signals "in flight" in the brand system (see CertificationsStrip.tsx where amber is used for pending items). Use `text-amber-500 bg-amber-500/10 border-amber-500/30` for status badges.

---

## Code Examples

Verified patterns from existing codebase:

### EPR Progress Bar (copy from SustainabilitySnapshot.tsx)
```typescript
// Source: src/components/sections/SustainabilitySnapshot.tsx lines 119-153
const eprMilestones = [
  { year: "FY2025", pct: 5, label: "EPR mandate begins" },
  { year: "FY2027", pct: 15, label: "Growing momentum" },
  { year: "FY2029", pct: 30, label: "Formal sector scales" },
  { year: "FY2031", pct: 50, label: "National target" },
];

// IntersectionObserver pattern (lines 16-23):
const ref = useRef<HTMLDivElement>(null);
const [visible, setVisible] = useState(false);
useEffect(() => {
  const observer = new IntersectionObserver(
    ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
    { threshold: 0.2 }
  );
  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect();
}, []);

// Bar CSS animation (lines 138-151):
<div className="h-3 bg-ink-700 rounded-full overflow-hidden">
  <div
    className="h-full rounded-full transition-all duration-1000 bg-green-700"
    style={{
      width: visible ? `${m.pct * 2}%` : "0%",
      transitionDelay: `${i * 0.2}s`,
    }}
  />
</div>
```

### Framer Motion Scroll Reveal (from ProcessSteps.tsx)
```typescript
// Source: src/components/sections/process/ProcessSteps.tsx lines 102-115
import { useScroll, useTransform, motion } from "framer-motion";

function StepReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [32, 0]);
  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}
```

### Google Sheets Route (exact pattern from sample-request)
```typescript
// Source: src/app/api/sample-request/route.ts
import { NextRequest } from "next/server";
import { GoogleAuth } from "google-auth-library";

const SPREADSHEET_ID = "1oc5WnrHE_MA139bN5X7PF6bEYZCbkNJz8LA5LlO09vI"; // same spreadsheet
const SHEET_NAME = "Collect Pickup"; // new tab — must be created in spreadsheet first

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { business, phone, location, quantity, frequency } = body;

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!clientEmail || !privateKey) {
      return Response.json({ error: "Server configuration error" }, { status: 500 });
    }

    const auth = new GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const client = await auth.getClient();
    const token = await client.getAccessToken();

    const timestamp = new Date().toISOString();
    const row = [timestamp, business, phone, location ?? "", quantity ?? "", frequency ?? ""];

    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(SHEET_NAME)}:append?valueInputOption=USER_ENTERED`;
    const sheetsRes = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token.token}` },
      body: JSON.stringify({ values: [row] }),
    });

    if (!sheetsRes.ok) {
      console.error("Sheets API error:", sheetsRes.status, await sheetsRes.text());
      return Response.json({ ok: true, warning: "Sheets write failed" }, { status: 200 }); // graceful degradation
    }
    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("collect-pickup route error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

### Section Label Pattern (from globals.css + all existing sections)
```typescript
// Source: src/app/globals.css — .section-label class
<p className="section-label mb-3">01 · ABOUT</p>
// Renders: JetBrains Mono, 0.75rem, 0.15em tracking, uppercase, amber-500
```

### Page Structure Shell (mirrors sample-request/page.tsx)
```typescript
// Source: src/app/sample-request/page.tsx
import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "[Page Name] | Santosh Petrochemical",
  description: "...",
};

export default function [PageName]Page() {
  return (
    <>
      <Nav />
      <main>
        {/* pt-36 lg:pt-40 on first section to clear fixed Nav */}
        <section className="bg-ink-950 py-24 lg:py-32 pt-36 lg:pt-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* content */}
          </div>
        </section>
        {/* Alternating: bg-ink-900, bg-ink-800, bg-ink-800/50 */}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| params direct access | `await params` (Promise) | Next.js 15+ | Phase 4 has no dynamic routes — no impact |
| Route Handlers use `res.json()` | `Response.json()` | Next.js 14+ | Already in use correctly in all 3 API routes |
| `next/font` font loading | Google Fonts via CSS `@import` | Project choice | This project uses Google Fonts via layout, not `next/font` — do not change |

**Not deprecated in this version:**
- `"use client"` directive — still required for client components
- `export const metadata` — still the correct Metadata API
- `IntersectionObserver` in useEffect — still idiomatic for scroll-triggered effects
- `framer-motion` `motion.*` components — v12 API is stable; `useScroll`/`useTransform`/`motion.div` confirmed in ProcessSteps.tsx

---

## Open Questions

1. **CO₂ per tonne figure for SUST-02 (D-02)**
   - What we know: 66% less energy vs virgin production (from DPR); ~70% base oil yield
   - What's unclear: No specific CO₂/tonne figure in MARKET.md or PROJECT.md; CONTEXT.md says "research and cite the source"
   - Recommendation: Executor must research "GEIR re-refined base oil lifecycle CO₂" or "ATIEL used oil re-refining carbon savings" before implementing the sustainability page. GEIR (Group for the Reuse of Lubricants) publishes LCA data. If only an energy reduction figure is available (not CO₂), frame as "66% less energy consumed in production vs virgin base oil" and note CO₂ savings are proportional. Do not invent a figure.

2. **Robin Kumar bio content**
   - What we know: Robin Kumar is a promoter; D-10 says include a card with name, role, short bio
   - What's unclear: No bio details in PROJECT.md; CONTEXT.md defers "Robin Kumar bio details" to v2 but D-10 says include in v1 with "placeholder bio"
   - Recommendation: Use placeholder text: "Robin Kumar brings [industry] expertise to Santosh's operations. Full profile forthcoming." Clearly marked as placeholder in code comment.

3. **"Collect Pickup" sheet tab existence**
   - What we know: SPREADSHEET_ID is `1oc5WnrHE_MA139bN5X7PF6bEYZCbkNJz8LA5LlO09vI`; the Sample Request tab exists; a new "Collect Pickup" tab is needed
   - What's unclear: Whether the client has already created this tab
   - Recommendation: Plan 04-04 (collect page) should include a prerequisite step: verify "Collect Pickup" tab exists in the spreadsheet, or include setup instructions.

---

## Validation Architecture

> nyquist_validation key is absent from .planning/config.json — treating as enabled.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — no jest.config, vitest.config, pytest.ini, or test/ directory found |
| Config file | None — Wave 0 gap |
| Quick run command | N/A until framework installed |
| Full suite command | N/A until framework installed |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ABOUT-01 | /about page renders without error, contains company history content | smoke | `npx playwright test e2e/about.spec.ts` | Wave 0 |
| ABOUT-02 | Promoter cards render with name/role | smoke | `npx playwright test e2e/about.spec.ts` | Wave 0 |
| QUAL-01 | /quality page renders 3 cert cards with "In Progress" badges | smoke | `npx playwright test e2e/quality.spec.ts` | Wave 0 |
| QUAL-02 | Lab testing methodology section renders | smoke | `npx playwright test e2e/quality.spec.ts` | Wave 0 |
| SUST-01 | /sustainability page renders EPR section with all 4 milestones | smoke | `npx playwright test e2e/sustainability.spec.ts` | Wave 0 |
| SUST-02 | Circular economy SVG renders | smoke | `npx playwright test e2e/sustainability.spec.ts` | Wave 0 |
| COLL-01 | /collect page renders service area list with all 7 cities | smoke | `npx playwright test e2e/collect.spec.ts` | Wave 0 |
| COLL-02 | Pickup form submits successfully, success state shows WhatsApp link | integration | manual / `npx playwright test e2e/collect.spec.ts` | Wave 0 |

**Note:** This project has no test infrastructure. Given `mode: yolo` and `granularity: coarse` in config.json, the practical validation approach is: build and manually verify each page in dev, confirm nav links work, confirm form submission reaches the success state.

### Sampling Rate
- **Per task commit:** `npm run dev` and manually verify the page route loads without hydration errors
- **Per wave merge:** Manual review of all 4 pages in browser
- **Phase gate:** All 4 pages accessible via nav/footer, forms reach success state, no console errors

### Wave 0 Gaps
- No test framework installed — if automated tests are wanted, install Playwright: `npm install -D @playwright/test` and `npx playwright install`
- For Phase 4's content-heavy, animation-heavy nature, manual browser QA is the practical validation path given the current infrastructure state

---

## Sources

### Primary (HIGH confidence)
- `src/components/sections/SustainabilitySnapshot.tsx` — EPR progress bar pattern, IntersectionObserver + CSS transition animation
- `src/components/sections/process/ProcessSteps.tsx` — Framer Motion `useScroll`/`useTransform`/`motion.div` pattern
- `src/components/ui/SampleRequestForm.tsx` — Form pattern (fields, validation, fetch POST, success state)
- `src/app/api/sample-request/route.ts` — Google Sheets API route with GoogleAuth
- `src/components/layout/Nav.tsx` — Current nav links (missing /quality)
- `src/components/layout/Footer.tsx` — Footer links (already has /quality)
- `/Users/abindal/dev/SantoshWebsite/node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` — Server vs Client component guidance for Next.js 16
- `package.json` — Confirmed versions: next@16.2.1, framer-motion@^12.38.0, react@19.2.4
- `.planning/research/MARKET.md` — EPR mandate data, CO₂ savings figures
- `.planning/PROJECT.md` — Company background, promoter details, tech stack

### Secondary (MEDIUM confidence)
- `.planning/phases/04-supporting-pages/4-CONTEXT.md` — All locked decisions (D-01 through D-17)

### Tertiary (LOW confidence)
- CO₂ per tonne RRBO vs virgin figures — not verified in project files; executor must research before implementing SUST-02

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries verified from package.json and existing component files
- Architecture patterns: HIGH — derived directly from existing codebase patterns (SampleRequestForm, ProcessSteps, SustainabilitySnapshot, page.tsx files)
- Navigation integration: HIGH — read Nav.tsx and Footer.tsx directly
- CO₂ data for SUST-02: LOW — CONTEXT.md explicitly defers to executor research; no figure in project files
- Pitfalls: HIGH — derived from reading existing code and locked decisions

**Research date:** 2026-03-21
**Valid until:** 2026-04-21 (stable stack, no fast-moving dependencies)
