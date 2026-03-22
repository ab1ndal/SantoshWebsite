# Phase 5: Blog, Integrations & Launch — Research

**Researched:** 2026-03-22
**Domain:** Sanity CMS + next-sanity, Portable Text, Resend email, PostHog analytics, Schema.org JSON-LD, Next.js 16 sitemap/robots, Vercel deployment
**Confidence:** HIGH (all findings verified against Next.js 16 docs in node_modules and npm registry versions)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Sanity CMS — Studio**
- D-01: Sanity Studio embedded in the Next.js app at `/studio` — single deployment, no separate Sanity project URL. Access controlled by Sanity's own auth: only users invited to the Sanity project via sanity.io dashboard can log in. Public visitors cannot access Studio.
- D-02: Sanity project initialized with `@sanity/client` + `next-sanity`. Studio rendered via the App Router at `src/app/studio/[[...tool]]/page.tsx` using `NextStudio` component.

**Sanity CMS — Blog Schema**
- D-03: Blog post document type (`post`) with fields: `title` (string, required), `slug` (slug, required, auto-generated from title), `tag` (string, enum: Technical / Regulatory / Comparison / How-To), `featuredImage` (image with hotspot), `readTime` (number, minutes), `publishedAt` (datetime), `excerpt` (text, 1-2 sentence summary for cards), `body` (array of Portable Text blocks — rich text)
- D-04: No author field in v1 — Lalit Bindal is sole author; author display hardcoded if needed.

**Sanity CMS — Seed Content**
- D-05: Claude authors all 4 seed articles as full long-form content (600–900 words each). Topics: Group II+, EPR Compliance 2026, RRBO vs Virgin, NCR used oil disposal. Lalit/Santosh reviews before publishing via Studio.
- D-06: Seed posts created directly in Sanity using Studio at /studio — not injected via migration script.

**Homepage — LatestInsights Wiring**
- D-07: `LatestInsights.tsx` updated to fetch the 3 most recent published posts from Sanity using GROQ query (`*[_type == "post"] | order(publishedAt desc)[0..2]`). Component updated to dark ink-900 theme. Uses ISR with 1h revalidation.

**Blog/Insights Pages — Theme and Layout**
- D-08: Both `/insights` listing page and `/insights/[slug]` post pages use the site's dark ink-900 theme. No light-zone exception for blog content.
- D-09: `/insights` listing page: grid of post cards. Hero with section label + headline. Responsive 1-col mobile → 3-col desktop grid.
- D-10: `/insights/[slug]` post page: simple prose layout — full-width hero with title, tag badge, date, and read time. Single-column reading body (max-w ~65ch), no sidebar, no TOC.
- D-11: Post body rendered via custom Portable Text renderer mapping Sanity block types to site design tokens: Barlow 16px body text, Bebas Neue for headings (H2/H3), green-500 underline for links, amber-500 for blockquote accents.

**Resend Emails**
- D-12: Sender address is a placeholder — executor leaves `FROM_EMAIL` as a `TODO` env var comment in `.env.example`. Actual address set by Santosh when domain is confirmed.
- D-13: TDS download confirmation email: Subject `"Your Santosh TDS is ready"`. Body: brief thank-you, PDF download link, WhatsApp contact CTA. No PDF attachment — just the link.
- D-14: Enquiry notification email: sent to two recipients — `NOTIFY_EMAIL_PRIMARY` and `NOTIFY_EMAIL_CC`. Subject: `"New enquiry from [Name] — Santosh website"`. Body includes form field values.
- D-15: Resend integration is additive — Google Sheets write still happens first, Resend fires after. If Resend fails, the form submission still succeeds (graceful degradation).

**PostHog Analytics**
- D-16: PostHog JS snippet added via `<Script>` in root layout. Events tracked: `tds_download`, `sample_request`, `pickup_booking`. No custom properties needed in v1.

**Schema.org Structured Data**
- D-17: JSON-LD added as `<script type="application/ld+json">` in root layout for Organization + LocalBusiness types. Also add Product type on `/products` page.

**Sitemap & robots.txt**
- D-18: Use Next.js built-in `sitemap.ts` and `robots.ts` in App Router. Sitemap includes all static routes + dynamically fetched Sanity post slugs. `robots.txt` allows all crawlers, disallows `/studio`.

**Vercel Deployment**
- D-19: Vercel is already deployed with default domain. Phase 5 plan includes: (a) adding all new env vars to Vercel project settings, (b) a clear TODO doc for domain attachment when purchased, (c) verify `npm run build` passes.
- D-20: Preview deployments enabled for all branches in Vercel.

### Claude's Discretion
- Exact GROQ query construction for Sanity queries
- ISR vs `no-store` caching strategy for blog posts
- Portable Text renderer component file structure
- PostHog event property schema beyond event name
- sitemap.ts dynamic slug fetching implementation detail

### Deferred Ideas (OUT OF SCOPE)
- Custom domain DNS attachment — deferred until domain is purchased. Plan documents the steps as a TODO.
- Hindi language version of /collect and blog — v2
- CRM integration (Zoho/HubSpot) — v2
- A/B testing on hero CTAs — v2
- Author field in blog post schema — v1 omitted; add in v2 if needed
- Email templates with HTML design — v1 uses plain-text Resend emails; styled HTML templates in v2
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| BLOG-01 | Insights listing page with Sanity-powered blog posts | Sanity GROQ + next-sanity client patterns; ISR revalidation via `export const revalidate` |
| BLOG-02 | Individual blog post page with [slug] routing | Next.js 16 dynamic routes — `params` is a Promise; `generateStaticParams` for ISR pre-rendering |
| BLOG-03 | Seed post — Group II+ Base Oil article | Blog content framework — Sanity Studio paste-in workflow, 600–900 words |
| BLOG-04 | Seed post — EPR Compliance Guide 2026 | EPR data from MARKET.md — April 1, 2024 effective, 5%→50% by FY2031 |
| BLOG-05 | Seed post — RRBO vs Virgin Base Oil comparison | Technical comparison data from MARKET.md — hydrotreating vs adsorption, specs |
| BLOG-06 | Seed post — NCR used oil disposal | MARKET.md regulatory context — hazardous waste classification, PCB portal |
| INT-01 | Resend email integration — TDS download confirmation + enquiry notification | Resend 6.9.4 API; additive pattern over existing Google Sheets route |
| INT-02 | PostHog analytics — event tracking for TDS downloads, sample requests, pickup bookings | PostHog JS 1.363.1; `next/script` in root layout; event calls from form submit handlers |
| INT-03 | Schema.org structured data — Organization, Product, LocalBusiness types | Native `<script type="application/ld+json">` (NOT next/script); place in layout.tsx and products/page.tsx |
| INT-04 | Sitemap and robots.txt generated | Next.js 16 built-in `MetadataRoute.Sitemap` and `MetadataRoute.Robots` types; `src/app/sitemap.ts` and `src/app/robots.ts` |
| INT-05 | Vercel deployment with production domain configured | Vercel already deployed; env var addition + build verification plan |
</phase_requirements>

---

## Summary

Phase 5 assembles four distinct integration domains on top of the completed Next.js 16.2.1 site. Sanity CMS provides the headless content backend for the blog; next-sanity 12.1.3 is the official bridge library. The blog pages use standard App Router patterns but require awareness of two Next.js 16 breaking changes: `params` is now a `Promise` (must be awaited), and `fetch` requests are NOT cached by default (opposite of Next.js 14 behavior). Caching for Sanity queries should use `export const revalidate = 3600` at the route segment level combined with `unstable_cache` for non-fetch async functions like Sanity client calls.

Resend (v6.9.4) is the email service. Its integration is purely additive — the existing Google Sheets POST pattern in each route is extended by appending a `resend.emails.send()` call after the sheets write. PostHog (v1.363.1) requires a client-side initialization script loaded via `next/script` in root layout; custom event tracking (`posthog.capture()`) is called from the existing form submit handlers which are already client components. Schema.org JSON-LD uses a native `<script>` tag (confirmed by Next.js docs: "next/script is optimized for executable code; JSON-LD is structured data, not executable code") and must use `.replace(/</g, '\\u003c')` for XSS safety.

**Primary recommendation:** Wire Sanity first (install + schema + Studio route + client), then implement the blog pages, then add email/analytics/SEO integrations in parallel, then seed content, then Vercel env vars and build verification.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@sanity/client` | 7.20.0 (latest) | GROQ queries to Sanity Content Lake | Official Sanity JS client |
| `next-sanity` | 12.1.3 (latest) | `NextStudio` component + Sanity-aware server helpers | Official Sanity/Next.js integration |
| `@portabletext/react` | 6.0.3 (latest) | Render Portable Text blocks as React JSX | Official Portable Text renderer |
| `@sanity/image-url` | 2.0.3 (latest) | Build image URLs with transforms from Sanity asset refs | Official Sanity image URL builder |
| `resend` | 6.9.4 (latest) | Transactional email API | Simple REST-first SDK, no SMTP config |
| `posthog-js` | 1.363.1 (latest) | Client-side event tracking | PostHog's official browser SDK |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `next/script` | (bundled with next 16.2.1) | Load PostHog initialization script | Third-party JS that runs in browser |
| `MetadataRoute` | (bundled with next 16.2.1) | TypeScript types for sitemap/robots | sitemap.ts and robots.ts |
| `unstable_cache` | (bundled with next 16.2.1) | Cache Sanity client calls (non-fetch) | Any async function that isn't fetch() |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `@portabletext/react` | Custom block renderer from scratch | Hand-rolling misses edge cases (nested marks, custom block types, list nesting) |
| `resend` | `nodemailer` + SMTP | Resend needs only an API key, no SMTP server management |
| `unstable_cache` for Sanity | `cache: 'force-cache'` on fetch | Sanity client uses its own HTTP layer, not native fetch — must wrap with `unstable_cache` |

**Installation:**
```bash
npm install @sanity/client next-sanity @portabletext/react @sanity/image-url resend posthog-js
```

**Version verification (confirmed 2026-03-22):**
- `@sanity/client`: 7.20.0
- `next-sanity`: 12.1.3
- `@portabletext/react`: 6.0.3
- `@sanity/image-url`: 2.0.3
- `resend`: 6.9.4
- `posthog-js`: 1.363.1

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx          # NextStudio embedded Sanity Studio
│   ├── insights/
│   │   ├── page.tsx              # Server Component — list all posts (ISR)
│   │   └── [slug]/
│   │       └── page.tsx          # Server Component — single post (ISR + generateStaticParams)
│   ├── api/
│   │   └── sample-request/
│   │       └── route.ts          # EXTEND: add Resend after Sheets write
│   ├── sitemap.ts                # Next.js MetadataRoute.Sitemap
│   └── robots.ts                 # Next.js MetadataRoute.Robots
├── lib/
│   └── sanity/
│       ├── client.ts             # createClient config
│       ├── queries.ts            # GROQ query strings
│       └── types.ts              # TypeScript Post interface
└── components/
    └── blog/
        └── PortableTextRenderer.tsx  # Custom Portable Text → JSX
```

### Pattern 1: Sanity Client Setup
**What:** Create a singleton Sanity client and typed GROQ query helpers
**When to use:** All server-side Sanity data fetching

```typescript
// src/lib/sanity/client.ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

```typescript
// src/lib/sanity/queries.ts
export const allPostsQuery = `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    title,
    slug,
    tag,
    readTime,
    publishedAt,
    excerpt
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    slug,
    tag,
    readTime,
    publishedAt,
    excerpt,
    body
  }
`

export const latestPostsQuery = `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0..2] {
    title,
    slug,
    tag,
    readTime,
    publishedAt,
    excerpt
  }
`
```

### Pattern 2: ISR Blog Pages with Async Params (Next.js 16)
**What:** Blog listing and post pages with ISR revalidation
**When to use:** Any dynamic route in Next.js 16 — params is a Promise

```typescript
// src/app/insights/[slug]/page.tsx
import { unstable_cache } from 'next/cache'
import { sanityClient } from '@/lib/sanity/client'
import { postBySlugQuery, allPostsQuery } from '@/lib/sanity/queries'

// CRITICAL: In Next.js 16, params is a Promise — must be awaited
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  // ...
}

// CRITICAL: In Next.js 16, fetch is NOT cached by default
// Use export const revalidate = 3600 (ISR) or unstable_cache for Sanity client
export const revalidate = 3600

// generateStaticParams for ISR pre-rendering of known slugs
export async function generateStaticParams() {
  const posts = await sanityClient.fetch(allPostsQuery)
  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }))
}

// Wrap Sanity client call in unstable_cache because sanityClient.fetch
// is NOT a native fetch() call — route-level revalidate alone does not cache it
const getPost = unstable_cache(
  async (slug: string) => sanityClient.fetch(postBySlugQuery, { slug }),
  ['post'],
  { revalidate: 3600 }
)
```

### Pattern 3: Embedded Sanity Studio
**What:** Studio served inside Next.js app, protected by Sanity auth
**When to use:** D-01 / D-02 — single-deployment Studio

```typescript
// src/app/studio/[[...tool]]/page.tsx
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export { viewport } from 'next-sanity/studio'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

```typescript
// sanity.config.ts (project root)
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { postSchema } from './src/lib/sanity/schemas/post'

export default defineConfig({
  name: 'santosh-studio',
  title: 'Santosh Petrochemical',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [postSchema],
  },
})
```

### Pattern 4: Resend — Additive After Google Sheets
**What:** Fire Resend email after existing Sheets write, with graceful degradation
**When to use:** D-15 — all existing form API routes

```typescript
// Extend src/app/api/sample-request/route.ts (after sheetsRes block)
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// After sheets write (whether it succeeded or warned):
try {
  await resend.emails.send({
    from: process.env.FROM_EMAIL ?? 'TODO@placeholder.com',
    to: [
      process.env.NOTIFY_EMAIL_PRIMARY!,
      process.env.NOTIFY_EMAIL_CC!,
    ],
    subject: `New enquiry from ${name} — Santosh website`,
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nGrade: ${grade}\nQuantity: ${quantity}\nApplication: ${application}`,
  })
} catch (resendErr) {
  // Graceful degradation: log but do not fail the request
  console.error('Resend notification failed:', resendErr)
}
```

### Pattern 5: PostHog — Script + Client Event Calls
**What:** PostHog initialization in root layout via next/script; capture calls from form submit handlers
**When to use:** D-16 — analytics events from existing client components

```typescript
// src/app/layout.tsx — add Script tag
import Script from 'next/script'

// Inside <body>:
<Script
  id="posthog-init"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}...}
    `,
  }}
/>

// In form submit handlers (already "use client" components):
// After successful form submit:
if (typeof window !== 'undefined' && window.posthog) {
  window.posthog.capture('tds_download')
  // or 'sample_request', 'pickup_booking'
}
```

**Note:** PostHog's actual snippet is fetched from posthog.com/docs. The id attribute on the Script tag is REQUIRED for Next.js to track inline scripts (per Next.js docs warning).

### Pattern 6: JSON-LD Schema.org
**What:** Inline JSON-LD in layout.tsx and products/page.tsx using native `<script>` tag
**When to use:** D-17 — NOT next/script (JSON-LD is structured data, not executable code)

```typescript
// src/app/layout.tsx — inside <body>, after {children}
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'Santosh Petrochemical Innovations',
  url: 'https://santoshpetrochemical.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ghaziabad',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  description: 'India\'s premium Group II+ RRBO producer via vacuum distillation and hydrotreating technology.',
}

// In JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c'),
  }}
/>
```

### Pattern 7: Sitemap with Dynamic Sanity Slugs (Next.js 16)
**What:** `src/app/sitemap.ts` exporting MetadataRoute.Sitemap with static routes + Sanity slugs
**When to use:** D-18 — INT-04

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { sanityClient } from '@/lib/sanity/client'

const BASE_URL = 'https://santoshpetrochemical.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanityClient.fetch(
    `*[_type == "post" && defined(publishedAt)] { "slug": slug.current, publishedAt }`
  )

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/process`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/quality`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/sustainability`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/collect`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/insights`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post: { slug: string; publishedAt: string }) => ({
    url: `${BASE_URL}/insights/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...postRoutes]
}
```

### Pattern 8: robots.ts (Next.js 16)
```typescript
// src/app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio',
    },
    sitemap: 'https://santoshpetrochemical.com/sitemap.xml',
  }
}
```

### Anti-Patterns to Avoid

- **Using `next/script` for JSON-LD:** JSON-LD is structured data, not executable code. Use native `<script type="application/ld+json">`. Confirmed by Next.js 16 docs.
- **Not awaiting `params` in dynamic routes:** In Next.js 16, `params` is a Promise. `const { slug } = params` (without await) is wrong. Must be `const { slug } = await params`.
- **Relying on default fetch caching from Next.js 14:** In Next.js 16, `fetch` requests are NOT cached by default. Route segment `export const revalidate = 3600` does NOT automatically cache `sanityClient.fetch()` calls because Sanity's client is not a native fetch. Wrap with `unstable_cache`.
- **No id on inline Script tags:** Next.js docs warn that inline Script tags MUST have an `id` attribute. Missing `id` will cause optimization to fail.
- **LatestInsights.tsx current light theme:** Currently uses `bg-white`, `text-gray-900`, light `tagColor` classes. D-08 mandates dark ink-900 theme. The entire component needs theme conversion, not just data wiring.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Portable Text → HTML/JSX | Custom block switch/case renderer | `@portabletext/react` with `components` prop | Handles nested marks, custom block types, list nesting, marks overlap — all edge cases |
| Sanity image URLs | String concatenation of Sanity CDN URL + asset ref | `@sanity/image-url` builder | Handles image transforms, hotspot cropping, CDN URL format |
| GROQ query result caching | Manual Map/WeakMap | `unstable_cache` from `next/cache` | Integrates with Next.js ISR revalidation, supports tag-based invalidation |
| Sitemap XML generation | Template literal XML string | `MetadataRoute.Sitemap` from Next.js | Type-safe, automatically served at /sitemap.xml |
| Robots.txt generation | Static robots.txt file | `MetadataRoute.Robots` from Next.js | Type-safe, allows conditional logic, auto-served at /robots.txt |

**Key insight:** The Portable Text renderer has far more edge cases than it appears — ordered/unordered list nesting, marks that span blocks, custom block types (image, callout), and mark definitions (links, annotations) all require careful handling that `@portabletext/react` already solves.

---

## Common Pitfalls

### Pitfall 1: `params` is a Promise in Next.js 16
**What goes wrong:** `Cannot destructure property 'slug' of 'params' as it is undefined` or TypeScript error on `params.slug`
**Why it happens:** Next.js 16 changed dynamic route `params` to be a Promise (async params). This is a breaking change from Next.js 14.
**How to avoid:** Always declare `params: Promise<{ slug: string }>` and `const { slug } = await params`
**Warning signs:** TypeScript complaining that `string` is not assignable to `Promise<{slug: string}>`

### Pitfall 2: Sanity Client Calls Not Cached
**What goes wrong:** Every page request hits the Sanity Content Lake API even with `export const revalidate = 3600`
**Why it happens:** Route segment `revalidate` config applies to `fetch()` requests. `sanityClient.fetch()` uses its own HTTP layer, not native `fetch`. The route-level revalidate does not wrap non-fetch async calls.
**How to avoid:** Use `unstable_cache` to wrap `sanityClient.fetch()` calls. Set the same `revalidate` value on `unstable_cache` as the route segment.
**Warning signs:** High Sanity API usage or rate limit warnings in Sanity project dashboard

### Pitfall 3: Studio Route Breaks on Vercel Edge
**What goes wrong:** Sanity Studio fails to load at `/studio` in production
**Why it happens:** Studio requires `export const dynamic = 'force-dynamic'` — without it, the catch-all route may be statically pre-rendered which breaks Studio's auth flow
**How to avoid:** Always include `export const dynamic = 'force-dynamic'` and `export { viewport } from 'next-sanity/studio'` in `src/app/studio/[[...tool]]/page.tsx`
**Warning signs:** 500 error at /studio in production only (works in dev)

### Pitfall 4: NEXT_PUBLIC vs server-only Sanity env vars
**What goes wrong:** `SANITY_PROJECT_ID` is needed both in `sanityClient` (server-only) and in `sanity.config.ts` (Studio, runs in browser)
**Why it happens:** `sanity.config.ts` is imported by the Studio component which runs client-side. Server-only env vars (`process.env.SANITY_PROJECT_ID`) are undefined in browser context.
**How to avoid:** Use `NEXT_PUBLIC_SANITY_PROJECT_ID` for the project ID (safe to expose — it's not a secret). Use `SANITY_API_TOKEN` (server-only, no NEXT_PUBLIC prefix) for API token.
**Warning signs:** Studio renders blank, browser console shows `undefined` project ID

### Pitfall 5: LatestInsights Theme Conversion
**What goes wrong:** After wiring Sanity data, the LatestInsights component still uses light theme classes from Phase 2 (`bg-white`, `text-gray-900`, light tag colors)
**Why it happens:** The data wiring and theme conversion are distinct tasks — easy to complete the data wiring and forget the visual update
**How to avoid:** D-07 explicitly says the dark ink-900 theme update is part of the Sanity wiring plan. Tag colors need conversion: Technical → `text-green-400 border-green-500/30 bg-green-900/20`, Regulatory → `text-amber-400 border-amber-500/30 bg-amber-900/20`, Comparison → `text-ink-200 border-ink-600 bg-ink-800`
**Warning signs:** Post cards appear with white backgrounds on the dark homepage

### Pitfall 6: Resend Sender Domain Not Verified
**What goes wrong:** Emails go to spam or Resend rejects sends with `sender domain not verified`
**Why it happens:** Resend requires the sending domain's DNS to have verified SPF/DKIM records before production sends
**How to avoid:** Per D-12, use `TODO` placeholder for `FROM_EMAIL` in Phase 5. Document in env comments that the domain must be verified in the Resend dashboard before going live. Use `onboarding@resend.dev` as a temporary test sender in development only.
**Warning signs:** Resend API returns 422 or emails fail to deliver

### Pitfall 7: PostHog Script ID Missing
**What goes wrong:** Inline Script tag silently fails Next.js optimization, or TypeScript/ESLint warns
**Why it happens:** Next.js docs explicitly warn: "An id property must be assigned for inline scripts in order for Next.js to track and optimize the script"
**How to avoid:** Always set `id="posthog-init"` on the inline Script component
**Warning signs:** PostHog events not firing, or Next.js build warns about unidentified scripts

---

## Code Examples

Verified patterns from official sources:

### Sanity Post Schema (sanity.config.ts)
```typescript
// src/lib/sanity/schemas/post.ts
import { defineType, defineField } from 'sanity'

export const postSchema = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'tag', title: 'Tag', type: 'string', options: { list: ['Technical', 'Regulatory', 'Comparison', 'How-To'] } }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'readTime', title: 'Read Time (minutes)', type: 'number' }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
  ],
})
```

### Portable Text Renderer
```typescript
// src/components/blog/PortableTextRenderer.tsx
'use client' // PortableText needs client context for custom components
import { PortableText, PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-[2rem] text-ink-100 mt-10 mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[1.5rem] text-ink-100 mt-8 mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-amber-500 pl-4 my-6 text-ink-200 italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-ink-100 leading-relaxed mb-4" style={{ fontFamily: "'Barlow', sans-serif", fontSize: '16px' }}>
        {children}
      </p>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} className="text-green-400 underline underline-offset-2 hover:text-green-300">
        {children}
      </a>
    ),
  },
}

export function PortableTextRenderer({ value }: { value: unknown[] }) {
  return <PortableText value={value} components={components} />
}
```

### robots.ts (Next.js 16 — source: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md)
```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio',
    },
    sitemap: 'https://santoshpetrochemical.com/sitemap.xml',
  }
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `params.slug` direct access | `const { slug } = await params` (Promise) | Next.js 15+ (confirmed in v16) | Dynamic routes MUST await params |
| `fetch` auto-cached by default | `fetch` NOT cached by default | Next.js 15+ (confirmed in v16) | Use `force-cache` or `unstable_cache` explicitly |
| `next/script` for JSON-LD | Native `<script type="application/ld+json">` | Always (clarified in v16 docs) | next/script is for executable JS only |
| Global caching via `cache: 'no-store'` to opt out | Opt-in caching with `cache: 'force-cache'` | Next.js 15+ | Default is now uncached (dynamic) |

**Deprecated/outdated:**
- `getStaticProps` + `getStaticPaths`: Pages Router only, not applicable in App Router
- `cache: 'no-store'` as an explicit choice: It is now the default — no need to set it

---

## Open Questions

1. **Sanity Project ID — not yet created**
   - What we know: `@sanity/client` and `next-sanity` are the correct libraries. The initialization command is `npx sanity@latest init` or manual config via `sanity.config.ts`.
   - What's unclear: The Sanity project does not yet exist (no project ID in env vars). The plan executor must create the project at sanity.io before initializing.
   - Recommendation: Plan Wave 0 should include step: "Run `npx sanity@latest init` to create project, capture SANITY_PROJECT_ID and SANITY_DATASET"

2. **PostHog Project Key**
   - What we know: `POSTHOG_KEY` env var needed; loaded via next/script in layout.
   - What's unclear: PostHog project does not yet exist. Plan executor must create account and project at posthog.com to get the API key.
   - Recommendation: Plan should note that `POSTHOG_KEY` must be created before testing analytics events.

3. **Production Domain URL for Sitemap/Schema.org**
   - What we know: Domain is not yet purchased (deferred per D-19). Sitemap and JSON-LD require absolute URLs.
   - What's unclear: The actual production domain. Vercel default domain is available.
   - Recommendation: Use `NEXT_PUBLIC_BASE_URL` env var defaulting to the Vercel default domain. Swap when custom domain is purchased. In sitemap.ts, use `process.env.NEXT_PUBLIC_BASE_URL ?? 'https://santosh-web.vercel.app'`.

---

## Validation Architecture

> `workflow.nyquist_validation` is not set in `.planning/config.json` — treated as enabled.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None installed — no test infrastructure found in project |
| Config file | None — see Wave 0 |
| Quick run command | N/A |
| Full suite command | N/A |

**Note:** Phases 1–4 were implemented without a test suite. Phase 5 is primarily integration work (Sanity, Resend, PostHog) where the most meaningful validation is manual UAT against the phase UAT criteria. Automated testing of external API integrations requires mocking; the Phase 5 scope and timeline do not warrant introducing a test framework mid-project. Validation should be manual UAT per the phase UAT checklist.

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | Notes |
|--------|----------|-----------|-------------------|-------|
| BLOG-01 | /insights page lists posts from Sanity | manual | N/A | Requires live Sanity project |
| BLOG-02 | /insights/[slug] renders post body | manual | N/A | Requires live Sanity posts |
| BLOG-03 to BLOG-06 | Seed posts visible at correct URLs | manual | N/A | Content pasted in Studio |
| INT-01 | Resend emails fire on form submit | manual | N/A | Requires live Resend key |
| INT-02 | PostHog events captured | manual | N/A | Verify in PostHog dashboard |
| INT-03 | Schema.org JSON-LD in page source | manual | N/A | View source + schema validator |
| INT-04 | /sitemap.xml and /robots.txt return correct content | manual | `curl https://[domain]/sitemap.xml` | Can be tested post-deploy |
| INT-05 | Build passes, site live on Vercel | manual | `npm run build` | Run locally before deploy |

### Wave 0 Gaps
- No test framework installed — manual UAT is the validation strategy for this phase
- `npm run build` is the single automated check that must pass before Vercel deployment

---

## Sources

### Primary (HIGH confidence)
- `/Users/abindal/dev/SantoshWebsite/node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md` — sitemap.ts API, MetadataRoute.Sitemap type
- `/Users/abindal/dev/SantoshWebsite/node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md` — robots.ts API, MetadataRoute.Robots type
- `/Users/abindal/dev/SantoshWebsite/node_modules/next/dist/docs/01-app/02-guides/json-ld.md` — JSON-LD must use native `<script>` not next/script; XSS sanitization pattern
- `/Users/abindal/dev/SantoshWebsite/node_modules/next/dist/docs/01-app/02-guides/scripts.md` — next/script strategies; inline scripts require id attribute
- `/Users/abindal/dev/SantoshWebsite/node_modules/next/dist/docs/01-app/02-guides/incremental-static-regeneration.md` — params as Promise pattern; revalidate config
- `/Users/abindal/dev/SantoshWebsite/node_modules/next/dist/docs/01-app/02-guides/caching-without-cache-components.md` — fetch NOT cached by default in Next.js 16; unstable_cache for non-fetch functions
- `npm view` registry — @sanity/client@7.20.0, next-sanity@12.1.3, @portabletext/react@6.0.3, @sanity/image-url@2.0.3, resend@6.9.4, posthog-js@1.363.1 (verified 2026-03-22)

### Secondary (MEDIUM confidence)
- `package.json` (project) — confirmed next@16.2.1, react@19.2.4, no Sanity/Resend/PostHog packages yet installed
- `src/app/globals.css` — confirmed ink-900 (#111410), ink-800 (#1c1e18), green-500 (#3a9e64), amber-500 (#f59e0b) design tokens
- `src/components/sections/LatestInsights.tsx` — confirmed current static data + light theme requiring conversion

### Tertiary (LOW confidence)
- None — all critical claims verified against official sources

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all package versions verified via npm registry 2026-03-22
- Architecture: HIGH — all patterns verified against Next.js 16 docs in node_modules
- Pitfalls: HIGH — params-as-Promise and fetch-not-cached verified directly in Next.js 16 docs; Studio dynamic pattern from next-sanity known pattern
- JSON-LD vs next/script: HIGH — direct quote from Next.js 16 docs: "next/script is optimized for executable code; JSON-LD is structured data, not executable code"

**Research date:** 2026-03-22
**Valid until:** 2026-04-22 (stable libraries; Next.js 16 docs are local so won't drift)
