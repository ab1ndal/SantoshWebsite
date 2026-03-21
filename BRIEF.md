# Santosh Petrochemical Innovations — Project Brief

> Last updated: March 2026  
> Use this file as the single source of truth when starting any Claude Code session on this project.

---

## 1. Company

| Field | Value |
|---|---|
| **Legal Name** | Santosh Petrochemical Innovations Private Limited |
| **Short Name** | Santosh Petrochemical |
| **Location** | Off: 7, New Arya Nagar, Meerut Road, Ghaziabad, Uttar Pradesh |
| **Contact** | Lalit Bindal · 9810121438 · santoshgzb@yahoo.com |
| **Business** | Re-refining of used lubricating oil into Group II+ Re-Refined Base Oil (RRBO) |
| **Competitor** | IFP Petro Products Pvt. Ltd. (ifp-petro.com) — founded 1977, Sahibabad, Ghaziabad |

---

## 2. Product & Positioning

**Core product:** Group II+ Re-Refined Base Oil (RRBO) produced from collected used lubricating oil.

**Key differentiator vs IFP:** IFP primarily produces Group I. Santosh targets Group II+ — the premium grade now required by BS-VI automotive standards and modern OEM lubricant specs.

**Market context (use these stats on the website):**
- India generates ~1.3 million tonnes of used lubricating oil annually
- Only ~15% is formally recycled through legitimate channels
- India mandates 25% RRBO use in lubricant manufacturing (EPR regulations)
- IOCL + Re Sustainability signed an MOU (March 2026) to build India's first national Group II+ RRBO circular economy — validates Santosh's entire business model
- Global base oil market: $38.5B in 2025, projected $61.7B by 2035

**Output grades (to be confirmed with client):**
- SN 150 (light viscosity)
- SN 500 (medium viscosity)
- Bright Stock equivalent

**Pack formats:** Bulk tanker, 210L drum, IBC

---

## 3. Brand Identity

### 3.1 Logo
- **Style:** Icon + wordmark
- **Icon:** Gear (industrial process) with oil drop inside (the product) — conceptually strong, keep this
- **Current colors on business card:** Lime green + orange gear — needs evolution
- **Evolution:** Deepen green to Forest Green, shift orange to Refined Amber
- **Wordmark:** "SANTOSH" in condensed bold, "Petrochemical Innovations" smaller below
- **Status:** Logo file not yet provided — request SVG from client. Brief designer to update colors only, keep icon structure.

### 3.2 Color Palette

```css
/* === PRIMARY — Forest Green === */
--color-green-900:  #1a3a2a;   /* dark backgrounds, footer tints */
--color-green-700:  #235c3a;   /* dark accents */
--color-green-600:  #2d7a4e;   /* borders, dividers */
--color-green-500:  #3a9e64;   /* PRIMARY CTA, links, icon fills */
--color-green-400:  #52c17e;   /* hover states */
--color-green-200:  #a8e6c0;   /* light-mode accents */
--color-green-100:  #d6f5e6;   /* light section backgrounds */

/* === SECONDARY — Refined Amber === */
--color-amber-700:  #b45309;   /* strong alerts */
--color-amber-600:  #d97706;   /* secondary CTA background */
--color-amber-500:  #f59e0b;   /* ACCENT — stats, numbers, highlights */
--color-amber-300:  #fcd34d;   /* decorative, light themes */
--color-amber-100:  #fef3c7;   /* light amber backgrounds */

/* === NEUTRALS — Charcoal Foundation === */
--color-ink-950:    #0a0b09;   /* deepest background */
--color-ink-900:    #111410;   /* page background (dark mode) */
--color-ink-800:    #1c1e18;   /* section alternates */
--color-ink-700:    #242720;   /* card backgrounds */
--color-ink-600:    #343629;   /* borders */
--color-ink-400:    #5c6050;   /* muted text, placeholder */
--color-ink-200:    #a8ad96;   /* secondary body text */
--color-ink-100:    #d4d8c8;   /* primary body text */
--color-ink-50:     #f3f4ee;   /* light mode body text */

/* === SURFACE === */
--color-warm-white: #faf9f6;   /* light section backgrounds */
--color-warm-50:    #f5f3ee;   /* page background (light mode) */
```

**Tailwind config extension:**
```js
// tailwind.config.js
colors: {
  green: {
    900: '#1a3a2a', 700: '#235c3a', 600: '#2d7a4e',
    500: '#3a9e64', 400: '#52c17e', 200: '#a8e6c0', 100: '#d6f5e6'
  },
  amber: {
    700: '#b45309', 600: '#d97706', 500: '#f59e0b',
    300: '#fcd34d', 100: '#fef3c7'
  },
  ink: {
    950: '#0a0b09', 900: '#111410', 800: '#1c1e18', 700: '#242720',
    600: '#343629', 400: '#5c6050', 200: '#a8ad96', 100: '#d4d8c8', 50: '#f3f4ee'
  },
  'warm-white': '#faf9f6',
}
```

### 3.3 Typography

| Role | Font | Weight | Use |
|---|---|---|---|
| **Display** | Bebas Neue | 400 | H1, hero text, section titles, large numbers |
| **Condensed** | Barlow Condensed | 700 / 400 | H2, H3, nav, buttons, card titles, labels |
| **Body** | Barlow | 300 / 400 / 600 | Paragraphs, descriptions, blog content |
| **Mono** | JetBrains Mono | 400 / 500 | Specs, certifications, tags, eyebrows, data |

All fonts available free via Google Fonts.

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&family=Barlow+Condensed:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
--font-display:   'Bebas Neue', sans-serif;
--font-condensed: 'Barlow Condensed', sans-serif;
--font-body:      'Barlow', sans-serif;
--font-mono:      'JetBrains Mono', monospace;
```

### 3.4 Voice & Tone

**Direction:** Confident and forward-looking — like a sustainability report, not a brochure.

**Write like this:**
- "India produces 1.3 million tonnes of used lubricating oil every year. Only 15% is formally recycled. We are changing that."
- "Our Group II+ RRBO meets virgin base oil specifications — verified by third-party lab testing."
- Short declarative sentences. Concrete numbers. Present tense.

**Never write like this:**
- "We are a leading company providing world-class solutions..."
- "State-of-the-art facility using cutting-edge technology..."
- Vague superlatives, passive voice, exclamation marks.

---

## 4. Target Audiences

### A — Lubricant Blenders & Oil Companies (Primary buyers)
- Procurement engineers at IOCL, HPCL, Valvoline, Castrol, independents
- Need: TDS downloads, spec tables, BIS certs, sample requests, pricing enquiry
- CTA: "Request a Sample" / "Download TDS" / "Get a Quote"

### B — Used Oil Suppliers (Feedstock pipeline)
- Workshop owners, fleet operators, garages, petrol pumps in NCR
- Need: Simple pickup scheduling, fair price explanation, hazardous waste compliance help
- CTA: "Schedule a Pickup" / WhatsApp button
- **Important:** Use simpler, warmer language for this audience

### C — Regulators & Compliance Teams
- MoEF/PCB auditors, EPR compliance officers, corporate ESG teams
- Need: Certifications page, environmental data, EPR registration proof
- CTA: "View Certifications" / "Download Environmental Report"

---

## 5. Site Architecture

### Pages

| # | Page | URL | Priority | Primary CTA |
|---|---|---|---|---|
| 1 | Home | `/` | Core | Dual: "Request Sample" + "Schedule Pickup" |
| 2 | About Us | `/about` | Trust | "Contact Us" |
| 3 | Our Process | `/process` | Core | "See Our Products" |
| 4 | Products | `/products` | Core | "Request Sample" / "Download TDS" |
| 5 | Sustainability | `/sustainability` | Impact | "View Certifications" |
| 6 | Used Oil Collection | `/collect` | Feedstock | "Schedule Pickup" / WhatsApp |
| 7 | Quality & Certs | `/quality` | Trust | "Download Certificate" |
| 8 | Insights / Blog | `/insights` | SEO | "Subscribe" / individual post CTAs |

### Navigation structure
```
[Logo] — Home | Products | Process | Sustainability | Collect Used Oil | About | [Request Sample CTA button]
```

### Homepage sections (in order)
1. **Hero** — Bold headline + stat + dual CTA + subtle grid/particle background
2. **Stats bar** — 1.3MT / 15% recycled / Group II+ / Ghaziabad
3. **Audience entry points** — 3-column cards routing Blenders / Suppliers / Compliance
4. **Process teaser** — Animated 4-step horizontal flow
5. **Why Group II+** — Technical differentiator section vs Group I
6. **Sustainability snapshot** — CO₂ offset counter, circular economy visual
7. **Certifications strip** — Logo row of certs
8. **Latest insights** — 3 blog card strip
9. **Footer CTA** — "Ready to source Group II+ RRBO?" + form

### Products page sections
1. Hero — Group II+ positioning headline
2. Spec table — Viscosity index, sulfur (ppm), flash point, pour point, colour, VI
3. Comparison table — Santosh RRBO vs Virgin Base Oil vs Group I RRBO
4. Available grades — SN150, SN500, Bright Stock
5. Pack formats — Bulk, drum, IBC with icons
6. TDS download (gated with email via Resend)
7. Sample request form

### Process page sections
1. Intro — "From waste to premium base oil in 6 steps"
2. Animated step diagram (scroll-triggered SVG):
   - Step 1: Used oil collection & intake testing
   - Step 2: Pre-treatment — dehydration, filtration, decontamination
   - Step 3: Vacuum distillation — separation of base fractions
   - Step 4: Hydrotreating / finishing — Group II+ polishing
   - Step 5: Quality lab testing — VI, sulfur, flash point verification
   - Step 6: Dispatch — bulk tanker / drum / IBC
3. Lab capabilities callout
4. CTA → Products page

---

## 6. Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | SSG for static pages, SSR for dynamic |
| **Styling** | Tailwind CSS | Custom brand tokens in tailwind.config.js |
| **CMS** | Sanity.io | Blog posts, product specs, certifications — non-dev editable |
| **Hosting** | Vercel | Free tier sufficient |
| **Email** | Resend + React Email | TDS download confirmation, enquiry notifications |
| **Analytics** | PostHog | Funnel tracking: TDS downloads, sample requests, pickups |
| **WhatsApp** | WhatsApp Business floating button | Critical for used oil supplier audience |
| **SEO** | Schema.org structured data | Organization, Product, LocalBusiness types |
| **Animation** | Framer Motion | Process diagram, hero, scroll reveals |

### Folder structure
```
/
├── app/
│   ├── page.tsx              # Home
│   ├── about/page.tsx
│   ├── process/page.tsx
│   ├── products/page.tsx
│   ├── sustainability/page.tsx
│   ├── collect/page.tsx
│   ├── quality/page.tsx
│   └── insights/
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── ui/                   # Buttons, tags, stat cards, callouts
│   ├── layout/               # Nav, Footer, PageWrapper
│   └── sections/             # Reusable page sections
├── lib/
│   └── sanity.ts             # Sanity client
├── public/
│   └── brand/                # Logo SVGs, favicon
├── styles/
│   └── globals.css           # CSS variables, base styles
├── sanity/
│   └── schemas/              # Blog post, product, certification schemas
├── BRIEF.md                  # ← This file
└── tailwind.config.js
```

---

## 7. UI Component Conventions

### Buttons
```tsx
// Primary — green fill
<Button variant="primary">Request a Sample →</Button>

// Secondary — green outline
<Button variant="secondary">Download TDS</Button>

// Amber — used oil collection CTAs only
<Button variant="amber">Schedule Pickup</Button>

// Ghost — low-emphasis
<Button variant="ghost">Learn More</Button>
```

### Stat display
- Value: Bebas Neue, large, amber (#f59e0b)
- Label: Barlow 400, small, ink-200

### Tags / badges
- Green: certifications, product grades, positive indicators
- Amber: compliance-related, collection-related
- Neutral: status, availability, location

### Section structure pattern
```tsx
<section>
  <p className="section-label">01 · Category</p>  {/* mono, amber, uppercase */}
  <h2 className="section-title">Main <span>Heading</span></h2>  {/* Bebas Neue, span = green */}
  {/* content */}
</section>
```

### Alternating section backgrounds
- Odd sections: `bg-ink-900` (dark)
- Even sections: `bg-ink-800` (slightly lighter)
- Special sections: `bg-warm-white` (light) for contrast breaks

---

## 8. SEO Target Keywords

| Keyword | Page | Priority |
|---|---|---|
| `group ii base oil supplier india` | Products | High |
| `rrbo supplier ghaziabad ncr` | Products / Home | High |
| `re-refined base oil india` | Home / Products | High |
| `used oil collection ncr delhi` | Collect | Feedstock |
| `epr compliant base oil india` | Sustainability | Regulatory |
| `used oil recycling ghaziabad` | Collect / About | Local |
| `re-refined vs virgin base oil` | Blog | Informational |
| `group ii+ base oil specifications` | Blog / Products | Informational |

---

## 9. First Blog Posts to Publish

1. **"What is Group II+ Base Oil and Why India's Lubricant Industry is Shifting to It"**
   - Definitional anchor page. Target: `group ii+ base oil india`

2. **"EPR Compliance Guide 2026: What Lubricant Manufacturers Need to Know"**
   - Target: `epr lubricant manufacturer india 2026`

3. **"Re-Refined Base Oil vs Virgin Base Oil: A Technical Comparison"**
   - Target: `re-refined vs virgin base oil`

4. **"How to Properly Dispose of Used Engine Oil in the NCR Region"**
   - Target: `used oil disposal ncr ghaziabad` — feedstock audience

---

## 10. Build Order

```
Phase 1 (Weeks 1–2):  Brand setup, design tokens, Next.js scaffold, Sanity config
Phase 2 (Weeks 3–5):  Home, Products, Process, Contact/Enquiry form, WhatsApp button
Phase 3 (Weeks 6–7):  About, Quality/Certs, Sustainability, Used Oil Collection
Phase 4 (Week 8+):    Blog setup, first 3 posts, Google Search Console, Schema.org, launch
```

---

## 11. Assets Still Needed from Client

- [ ] Logo file in SVG format (for color evolution update)
- [ ] Product specification sheets (viscosity index, sulfur content, flash point, pour point)
- [ ] Facility photos (plant exterior, lab, equipment, drums)
- [ ] Team photos (Lalit Bindal + any other key team members)
- [ ] Existing certifications (PCB registration, any BIS docs)
- [ ] Confirmed available grades and pack sizes
- [ ] Service area for used oil collection (radius from Ghaziabad)

---

*This brief was generated from a planning session in Claude.ai (March 2026). Update this file as the project evolves.*
