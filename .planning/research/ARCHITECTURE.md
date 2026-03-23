# Architecture Research

**Domain:** B2B marketing + lead generation website — v1.1 Growth & Polish integration
**Researched:** 2026-03-22
**Confidence:** HIGH (code directly inspected; Next.js 16 local docs read)

---

## Actual Stack Correction

**The project is NOT Next.js 14.** `package.json` confirms `"next": "16.2.1"` with React 19.2.4. PROJECT.md labels it "Next.js 14 App Router" but that is stale. All integration decisions below apply to Next.js 16 conventions.

**Key Next.js 16 breaking changes that affect v1.1:**
- `middleware.ts` is deprecated — renamed to `proxy.ts` (nodejs runtime only, no edge runtime)
- Async Request APIs (`params`, `searchParams`, `cookies`, `headers`) are fully async — no sync compat
- `sitemap.ts` already exists and is correct; no changes needed for basic sitemap

---

## System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                        Vercel Edge / CDN                              │
├──────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ / home   │  │/products │  │/collect  │  │/insights │  (+ 7 more) │
│  │ (Server) │  │(Server)  │  │(Server)  │  │(Server)  │             │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘             │
│       │ RSC fetch         │               │ Sanity fetch              │
├───────┴───────────────────┴───────────────┴──────────────────────────┤
│                     Route Handlers (API)                              │
│  /api/sample-request  /api/contact  /api/tds-download  /api/collect  │
│  [→ Google Sheets + Resend immediate notifications]                   │
├──────────────────────────────────────────────────────────────────────┤
│                     External Services                                 │
│  ┌──────────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐    │
│  │ Sanity CMS   │  │ Resend   │  │ PostHog  │  │ Google Sheets │    │
│  │ (content)    │  │ (email)  │  │(analytics│  │  (leads DB)   │    │
│  └──────────────┘  └──────────┘  └──────────┘  └───────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities (existing v1.0)

| Component | Responsibility | Location |
|-----------|----------------|----------|
| Route handlers | Form → Google Sheets + Resend fire-and-forget | `src/app/api/*/route.ts` |
| Page Server Components | Fetch Sanity data, export `metadata`, render layout | `src/app/*/page.tsx` |
| Section components | Presentational; client components only where animation needed | `src/components/sections/` |
| `layout.tsx` | Global metadata, PostHog init script, JSON-LD schema.org | `src/app/layout.tsx` |
| `sitemap.ts` | Static routes + dynamic Sanity blog slugs | `src/app/sitemap.ts` |
| `robots.ts` | Allow all, disallow /studio | `src/app/robots.ts` |
| Sanity `post` schema | Blog post document — single schema file | `src/lib/sanity/schemas/post.ts` |

---

## v1.1 Integration Map: Feature by Feature

### Feature 1: Resend Email Sequences (Delayed Follow-ups)

**The problem:** Resend has no native scheduling. The 4 existing route handlers fire immediately. A follow-up email at +3 days requires delayed execution.

**Recommended approach: Vercel Cron Jobs + a scheduled-emails Google Sheet row**

This is the practical approach for a small-scale B2B site with zero new infrastructure cost:

```
Form submit → /api/[form]/route.ts
  1. Write to Google Sheets (existing)
  2. Send immediate notification to team (existing)
  3. NEW: Write a "pending follow-up" row to a "Scheduled Emails" sheet
     with columns: [send_at_iso, to_email, template_key, context_json, sent]

Vercel Cron (daily at 08:00 IST) → /api/cron/send-followups/route.ts
  1. Read "Scheduled Emails" sheet, filter rows where sent=false AND send_at <= now
  2. For each row: call Resend, mark sent=true in sheet
  3. Graceful failure: log errors, continue processing other rows
```

**Why not alternatives:**
- **Resend native scheduling:** Does not exist (confirmed by Resend docs — only `scheduledAt` for batch sends, not arbitrary delay from trigger)
- **Upstash QStash:** Works well but adds $0-$1/mo dependency + new credentials — overkill for <50 leads/month
- **Vercel Functions with setTimeout:** Serverless functions time out; 3-day delay impossible
- **External cron + webhook:** Same result as Vercel Cron but free and already on Vercel

**New API route needed:** `src/app/api/cron/send-followups/route.ts`

This route must be protected with `CRON_SECRET` bearer token (Vercel Cron passes this automatically when configured in `vercel.json`).

**New file needed:** `vercel.json` (does not currently exist)
```json
{
  "crons": [
    {
      "path": "/api/cron/send-followups",
      "schedule": "0 2 * * *"
    }
  ]
}
```
(02:00 UTC = 07:30 IST)

**Sequence templates by touchpoint:**

| Touchpoint | Immediate (exists) | +3 day follow-up | +7 day follow-up |
|------------|-------------------|------------------|------------------|
| TDS Download | User gets PDF link | "Did you review the TDS? Questions?" | "Sample available — ship within 5 days" |
| Sample Request | Team notified | "Sample dispatched confirmation" | "Sample received? Feedback?" |
| Contact/Enquiry | Team notified | "Following up on your enquiry" | (optional) |
| Used Oil Pickup | Team notified | "Pickup scheduled confirmation" | (optional) |

**Note:** Pickup and contact follow-ups only make sense if email is collected. The collect form only requires `phone`; follow-ups for pickup are phone-based (WhatsApp) not email — keep email sequences to TDS and sample-request only for v1.1.

---

### Feature 2: SEO Improvements

**What already exists (no changes needed):**
- `sitemap.ts` — correct, auto-generates XML including Sanity blog posts
- `robots.ts` — correct
- Per-page static `metadata` export on every page (`/products`, `/collect`, `/about`, etc.)
- Schema.org JSON-LD for Organization + Product in `layout.tsx` and `/products/page.tsx`

**What needs to be added:**

**2a. Per-page OG metadata (missing on most pages):**

All page `metadata` exports currently have `title` and `description` only. Add `openGraph` and `twitter` fields to each page's static metadata object. This is a modification to existing pages, not new files.

Pages to update: `/`, `/products`, `/process`, `/collect`, `/about`, `/quality`, `/sustainability`, `/contact`, `/sample-request`, `/insights`

Pattern (Next.js 16, existing convention already in use):
```typescript
export const metadata: Metadata = {
  title: "...",
  description: "...",
  openGraph: {
    title: "...",
    description: "...",
    url: "https://santoshrrbo.com/products",
    siteName: "Santosh Petrochemical Innovations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "...",
    description: "...",
  },
}
```

**2b. Blog post dynamic metadata (missing):**

`/insights/[slug]/page.tsx` needs `generateMetadata` function pulling from Sanity:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params  // Next.js 16: params is async
  const post = await sanityClient.fetch(/* query by slug */)
  return {
    title: `${post.title} | Santosh Insights`,
    description: post.excerpt,
    openGraph: { ... }
  }
}
```

**2c. Sanity post schema SEO fields (new fields, not new schema):**

Add to existing `post.ts` schema:
- `seoTitle` (string) — override for meta title (optional, falls back to `title`)
- `seoDescription` (string/text) — meta description (optional, falls back to `excerpt`)
- `canonicalUrl` (url, optional) — for syndicated content

This is a non-breaking addition. Existing posts continue to work without these fields.

**2d. Core Web Vitals:**

No code changes needed for initial audit. Steps are:
1. Submit sitemap to Google Search Console (operational, not code)
2. Run PageSpeed Insights against production URL
3. LCP issue (if any) most likely the Google Fonts `<link>` in layout — already has `preconnect`; add `rel="preload"` for the font CSS if needed
4. Framer Motion animations are already `'use client'` components — no RSC hydration issues

**2e. Internal linking:**

Not a code change — a content edit pass. Blog posts and page copy need cross-links added. No schema or component changes.

---

### Feature 3: PostHog Custom Dashboards + Additional Event Tracking

**What already exists:**
- PostHog initialized via `<Script strategy="afterInteractive">` in `layout.tsx`
- `person_profiles: 'identified_only'` (correct — avoids inflating costs)
- No custom event captures in form components verified from code inspection

**What needs to be added:**

**3a. Form event tracking (modify existing form components):**

Each form client component needs `posthog.capture()` calls. Since PostHog is loaded via snippet (not `posthog-js` import), access it via `window.posthog`.

Forms to instrument:
- `PickupForm.tsx` (`/collect`) — capture `pickup_form_submitted` with `{location, quantity, frequency}`
- `TDSGate.tsx` (`/products`) — capture `tds_gate_submitted` and `tds_downloaded`
- Sample request form — capture `sample_request_submitted` with `{grade, quantity}`
- `ContactForm` (shared by `/contact` + `FooterCTA`) — capture `contact_form_submitted`

**3b. PostHog `posthog-js` package already installed** (`"posthog-js": "^1.363.1"`) but the current init uses a raw snippet. Two valid approaches:

- Option A (keep snippet): Use `window.posthog.capture(...)` in client components — works, no import needed
- Option B (use package): Import `posthog` from `posthog-js` in client components — cleaner typing

**Recommendation: Option A for v1.1.** Keeps zero architectural change — the snippet is already trusted and working. Adding typed imports would require refactoring the init to use `posthog.init()` from the package instead of the snippet. Not worth it for this milestone.

**3c. Funnel dashboards:**

PostHog dashboards are configured in the PostHog UI (app.posthog.com), not in code. Define these funnels after event tracking is instrumented:
- Blender funnel: page_view(/products) → tds_gate_submitted → sample_request_submitted
- Supplier funnel: page_view(/collect) → pickup_form_submitted

**3d. No new API routes or files needed for PostHog.**

---

### Feature 4: Hindi Bilingual Content on /collect

**Scope constraint:** NOT full i18n. One page only. The out-of-scope list in PROJECT.md explicitly says "Hindi language version" is out of scope for v1 — but the milestone targets Hindi on /collect only for the supplier audience. This is scoped as bilingual section display, not route-based i18n.

**Approach: Bilingual section toggle (client component, no routing change)**

Do NOT implement Next.js i18n routing (`/hi/collect`). Reason: it requires restructuring the entire app under `app/[lang]/` and rewrites for all existing routes — disproportionate effort for one page.

Instead, add a language toggle to the `/collect` page that swaps visible text between English and Hindi. This is a pure client-side state pattern.

**What changes:**

**4a. New component:** `src/components/sections/collect/LanguageToggle.tsx`
- A `'use client'` component with `useState<'en' | 'hi'>`
- Renders two buttons: "English / हिंदी"
- Passes `lang` prop down to the section content

**4b. Modify `/collect/page.tsx`:**
- Extract hardcoded strings into a content object with `en` and `hi` keys
- Wrap the page content in a client wrapper that accepts `lang` state
- OR: make `/collect/page.tsx` a client component itself — acceptable since all content is static strings, no Sanity fetch needed

**Content scope for Hindi on /collect:**
- Page headline, subheadline, hero paragraph
- Step titles and descriptions ("How It Works" section)
- Service area section heading and footer text
- Form field labels and placeholder text (in PickupForm)
- Form bullet points
- WhatsApp CTA text

**What does NOT need Hindi:**
- Nav and Footer (sitewide components, English only)
- WhatsApp button (phone number, universal)
- SEO metadata (keep English only — Hindi users find via WhatsApp/referral, not search)

**4c. PickupForm.tsx** will need a `lang` prop to switch its label text. This is a prop addition to existing component.

**No new API routes, no Sanity schema changes, no i18n library needed.**

---

### Feature 5: Content Copy Updates

**Scope:** Updating hardcoded text in components + Sanity CMS content.

**What's hardcoded vs. CMS-managed:**

| Content Type | Location | Edit Method |
|--------------|----------|-------------|
| Blog posts | Sanity CMS | Client edits in /studio |
| Product specs (spec table) | `SpecTable.tsx` hardcoded | Code edit |
| Comparison table data | `ComparisonTable.tsx` hardcoded | Code edit |
| About page bios | `src/app/about/page.tsx` hardcoded | Code edit |
| Company story | `src/app/about/page.tsx` hardcoded | Code edit |
| Process steps | `src/app/process/page.tsx` hardcoded | Code edit |
| /collect copy | `src/app/collect/page.tsx` hardcoded | Code edit (plus Hindi in v1.1) |

**Recommended:** Keep all copy edits as direct code changes — do not migrate hardcoded content to Sanity for this milestone. Migrating product specs to CMS is a separate architectural decision that adds schema complexity without benefit if the client isn't changing specs frequently.

**Exception:** If the client wants to self-edit bios and company story after handoff, consider a simple `siteSettings` Sanity singleton document in a future milestone.

---

## Recommended Project Structure Changes for v1.1

```
src/
├── app/
│   ├── api/
│   │   ├── collect-pickup/       (existing)
│   │   ├── contact/              (existing)
│   │   ├── sample-request/       (existing)
│   │   ├── tds-download/         (existing — add scheduled-email write)
│   │   └── cron/
│   │       └── send-followups/
│   │           └── route.ts      (NEW — Vercel Cron job handler)
│   ├── collect/
│   │   └── page.tsx              (MODIFIED — add LanguageToggle, bilingual content)
│   ├── insights/
│   │   └── [slug]/
│   │       └── page.tsx          (MODIFIED — add generateMetadata)
│   └── [all other pages]/        (MODIFIED — add openGraph to metadata)
│
├── components/
│   └── sections/
│       └── collect/
│           ├── PickupForm.tsx    (MODIFIED — add lang prop, PostHog capture)
│           └── LanguageToggle.tsx (NEW)
│
├── lib/
│   └── sanity/
│       └── schemas/
│           └── post.ts           (MODIFIED — add seoTitle, seoDescription fields)
│
└── [no other structural changes]

vercel.json                       (NEW — cron schedule config)
```

---

## Data Flow: Delayed Email Sequence

```
User submits form
        ↓
/api/[form]/route.ts
        ├── Write lead to Google Sheets "Sample Request" tab (existing)
        ├── Send immediate team notification via Resend (existing)
        └── Write row to "Scheduled Emails" tab (NEW)
            [send_at_iso, to_email, template_key, context_json, sent=false]

Vercel Cron fires daily (07:30 IST)
        ↓
/api/cron/send-followups/route.ts
        ├── Validate CRON_SECRET bearer token
        ├── Read "Scheduled Emails" sheet — filter sent=false, send_at <= now()
        └── For each pending row:
                ├── Call Resend with template content
                ├── Mark row sent=true in sheet
                └── Log any failures (continue loop)
```

---

## Data Flow: PostHog Event Tracking

```
User interacts with form
        ↓
Client component (PickupForm, TDSGate, etc.)
        ├── Existing: POST to /api/[form] on submit
        └── NEW: window.posthog.capture('event_name', { properties })
                Called on:
                - form_start (first field focus)
                - form_submitted (successful API response)
                - form_error (API returned error)
```

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Full Next.js i18n Routing for One Page

**What people do:** Implement `/hi/collect` route with `app/[lang]/` restructure because Next.js i18n docs show this as the pattern.

**Why it's wrong:** Requires moving all 10+ existing routes under `app/[lang]/`, updating all internal links, rewriting sitemap, adding middleware/proxy for locale detection. Weeks of refactoring for one page with a supplier audience that arrives via WhatsApp not organic search.

**Do this instead:** Client-side language toggle with `useState` in the collect page component. Zero routing impact.

### Anti-Pattern 2: setTimeout for Delayed Emails in Route Handlers

**What people do:** `setTimeout(() => sendFollowUp(), 3 * 24 * 60 * 60 * 1000)` inside an API route.

**Why it's wrong:** Vercel serverless functions have a 10-60 second max duration. The setTimeout fires into a dead process.

**Do this instead:** Write intent to Google Sheets; process via Vercel Cron.

### Anti-Pattern 3: Migrating All Hardcoded Copy to Sanity for "Flexibility"

**What people do:** Move every string from TSX files into Sanity documents so the client can edit everything.

**Why it's wrong:** Product specs, comparison tables, and process steps have structured data shapes that don't map cleanly to portable text. Schema complexity grows. Sanity queries add latency to every page.

**Do this instead:** Keep structured data hardcoded. Put only genuinely editorial content (blog posts, maybe bios) in Sanity.

### Anti-Pattern 4: Importing `posthog-js` in Client Components While Snippet Init Exists

**What people do:** Mix two PostHog initialization paths — snippet in layout AND `posthog.init()` from package import in a component.

**Why it's wrong:** Double initialization. PostHog will warn and behavior is undefined.

**Do this instead:** Pick one. For v1.1, keep the snippet (it works) and use `window.posthog.capture()` in client components. If you want typed imports, remove the snippet and do a full migration to the package in a future milestone.

---

## Integration Points

### External Services

| Service | Integration Pattern | v1.1 Changes |
|---------|---------------------|--------------|
| Google Sheets | Auth via service account JWT, REST Sheets API v4 | Add "Scheduled Emails" tab; cron reads it |
| Resend | Lazy init `new Resend(key)` in POST handlers | Cron route also uses same pattern; add follow-up templates |
| PostHog | Inline snippet in `layout.tsx`, `window.posthog` in components | Add `capture()` calls in 4 form components |
| Sanity CMS | `sanityClient.fetch()` in Server Components | Add SEO fields to post schema |
| Vercel | Auto-deploy from git | Add `vercel.json` for cron; set `CRON_SECRET` env var |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Page Server Component ↔ Sanity | Direct `sanityClient.fetch()` in RSC | No client boundary crossed |
| Form Client Component ↔ API Route | `fetch('/api/...')` POST | Existing pattern; add PostHog capture alongside |
| Cron Route ↔ Google Sheets | Same auth pattern as existing routes | Extract auth helper to avoid duplication |
| `/collect` page ↔ LanguageToggle | React prop drilling (`lang` state down) | Simple enough for prop drilling; no context needed |

---

## Build Order (Dependencies Drive This)

**Phase order rationale:** Each phase builds on stable prior work. SEO first because it's pure addition with no dependencies. PostHog second because instrumentation informs CRO decisions. Email sequences third because they require understanding what events to trigger follow-ups from. Hindi fourth because it modifies the collect page structure — do after PostHog is instrumented there. Copy last because it's content, not architecture.

| Order | Feature | Why This Position |
|-------|---------|-------------------|
| 1 | SEO metadata (OG tags, blog generateMetadata, Sanity SEO fields) | Pure additive, no deps, immediate search value |
| 2 | PostHog event tracking in forms | Needed before dashboards can show data; no deps |
| 3 | PostHog dashboards | Requires events from Step 2 to be live first |
| 4 | Email sequences (cron + Sheets "Scheduled Emails" + follow-up sends) | Requires understanding which touchpoints matter (from PostHog data) |
| 5 | Hindi on /collect | Structural change to collect page; do after PostHog instrumented there |
| 6 | Content copy updates | Final pass; no blockers; safe to batch |

---

## Scaling Considerations

This is a low-traffic B2B site. Scaling is not a concern for v1.1. The relevant operational limits:

| Constraint | Current Headroom | Action If Hit |
|------------|-----------------|---------------|
| Vercel Cron | 2 jobs on Hobby (free) | Already using 0; 1 job added for email sequences |
| Google Sheets API | 300 read req/min, 300 write req/min | <50 leads/month; no concern |
| Resend free tier | 100 emails/day, 3,000/month | With follow-ups, ~3 emails per lead × 50 leads = 150/month; well within free tier |
| Sanity free tier | 1 non-admin user, 500K API CDN requests/month | Negligible for this traffic level |

---

## Sources

- Next.js 16 docs: `/Users/abindal/dev/SantoshWebsite/node_modules/next/dist/docs/` (local, authoritative)
  - `01-app/02-guides/upgrading/version-16.md` — breaking changes confirmation
  - `01-app/03-api-reference/04-functions/generate-metadata.md` — metadata API
  - `01-app/02-guides/internationalization.md` — i18n routing scope assessment
  - `01-app/03-api-reference/03-file-conventions/01-metadata/index.md` — file conventions
- Direct code inspection: all 4 existing API route handlers, layout.tsx, collect/page.tsx, products/page.tsx, sitemap.ts, robots.ts, post.ts schema, package.json
- Resend scheduling capability: not available as native feature (no `scheduledAt` for triggered emails — only for batch/broadcast campaigns)

---

*Architecture research for: Santosh Petrochemical Innovations — v1.1 Growth & Polish*
*Researched: 2026-03-22*
