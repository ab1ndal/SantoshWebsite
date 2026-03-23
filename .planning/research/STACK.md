# Stack Research

**Domain:** Next.js 14+ marketing site — v1.1 Growth & Polish additions
**Researched:** 2026-03-22
**Confidence:** HIGH (all versions verified against npm and official docs)

> This file covers ONLY new additions for v1.1. The v1.0 stack (Next.js 16.2.1 / React 19 / Tailwind 4 / Sanity / Resend / PostHog / Framer Motion) is locked and not re-evaluated here.

---

## Existing Stack (Locked — for reference)

| Technology | Installed Version | Role |
|------------|-------------------|------|
| next | 16.2.1 | Framework (App Router) |
| react | 19.2.4 | UI runtime |
| resend | ^6.9.4 | Transactional email |
| posthog-js | ^1.363.1 | Client-side analytics |
| @sanity/client | ^7.20.0 | CMS client |
| tailwindcss | ^4 | Styling |
| framer-motion | ^12.38.0 | Animations |

---

## New Additions for v1.1

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| next-intl | ^4.8.3 | Hindi bilingual on /collect (no routing) | Official "without i18n routing" mode in v4 requires zero URL changes — locale lives in a cookie, no `/[locale]/` prefix needed. v4.0 is ESM-only and requires TypeScript 5+ (both satisfied). |
| posthog-node | ^5.28.5 | Server-side event capture from API routes | The existing posthog-js is client-only. Server actions and API routes (form submissions, TDS gate) need posthog-node to capture events without client JavaScript executing. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| schema-dts | ^1.1.2 | TypeScript types for JSON-LD/Schema.org | Type-safe structured data generation. Prevents malformed schemas. Use when extending existing Organization/Product/LocalBusiness JSON-LD. |

### No New Libraries Required For

| Feature | Why No New Library |
|---------|-------------------|
| Resend email sequences | `scheduledAt` parameter already in resend@6.9.4. No new package. |
| Sitemap | Next.js App Router has built-in `app/sitemap.ts` convention. No third-party package needed. |
| SEO meta tags | Next.js `generateMetadata()` API handles all head tags. Already available. |
| JSON-LD structured data | Render `<script type="application/ld+json">` in Server Components. Already possible. |
| Sanity SEO fields | Schema additions only — no new Sanity plugin needed for basic meta/keyword fields. |
| Core Web Vitals | Vercel Analytics (already on Vercel deployment) OR PostHog's built-in web vitals. No new package. |

---

## Detailed Integration Notes

### 1. Hindi Bilingual on /collect — next-intl ^4.8.3

**Pattern: "Without i18n routing"** (no URL changes)

Setup is four files:
- `messages/en.json` and `messages/hi.json` — translation strings
- `src/i18n/request.ts` — `getRequestConfig()` reads locale from a cookie
- `next.config.ts` — wrap with `createNextIntlPlugin()`
- `src/app/layout.tsx` — wrap with `NextIntlClientProvider`

The `/collect` page uses `useTranslations('collect')` in a Client Component language toggle. The toggle sets a cookie (`NEXT_LOCALE`) and the page re-renders with the selected locale. No URL routing changes; no middleware required.

**Why next-intl over alternatives:**
- next-translate requires webpack plugin config that conflicts with Tailwind 4's PostCSS setup
- Rolling a custom i18n context is 50+ lines of error-prone boilerplate
- next-intl's "without routing" mode is explicitly designed for this exact use case (single-page bilingual toggle)

**v4.0 breaking change to be aware of:** `NextIntlClientProvider` is now REQUIRED for all Client Components using `useTranslations`. The provider auto-inherits messages from `i18n/request.ts` — no explicit `messages` prop needed.

---

### 2. Resend Email Sequences — no new package, use scheduledAt

Resend's `scheduledAt` parameter is available in the current resend@6.9.4 SDK. Schedule follow-up emails at send time by computing a future ISO timestamp or using natural language syntax.

**Pattern for a 2-day follow-up:**
```ts
// In the same API route handler, after sending confirmation email:
await resend.emails.send({
  from: 'Santosh <noreply@santoshpetro.in>',
  to: [leadEmail],
  subject: 'Following up on your sample request',
  react: FollowUpEmail({ name }),
  scheduledAt: 'in 2 days',
});
```

**Scheduling limits (verified):**
- Maximum: 30 days in advance (extended from 72 hours in April 2025)
- Natural language supported: `'in 2 days'`, `'in 3 days'`, ISO 8601 string
- Cancel/reschedule via `resend.emails.update({ id, scheduledAt: ... })`

**Four touchpoints to sequence:**
1. TDS download → confirmation immediately + follow-up in 2 days ("Did the specs meet your requirements?")
2. Sample request → confirmation immediately + follow-up in 3 days ("Your sample is on its way")
3. Enquiry form → confirmation immediately + follow-up in 2 days ("Next steps with our team")
4. Used oil pickup → confirmation immediately + follow-up day-before reminder

**Why not a dedicated drip campaign tool (Resendly, Loops, etc.):**
Overhead of a third-party automation platform is not justified for 4 simple 2-step sequences. Resend's `scheduledAt` covers the entire requirement with zero new dependencies.

---

### 3. PostHog — add posthog-node ^5.28.5

The existing `posthog-js` client is correct for browser-side capture. The gap is server-side: form submission API routes run on the server and cannot call `posthog.capture()` from the browser SDK.

**Add for server-side capture:**
```ts
import { PostHog } from 'posthog-node';

// Singleton pattern in src/lib/posthog-server.ts
const posthogServer = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  flushAt: 1,       // flush immediately (short-lived serverless)
  flushInterval: 0,
});
export default posthogServer;
```

**Dashboard setup (no code required):**
PostHog's funnel dashboards are configured in the PostHog UI, not in code. The work is: verify existing events are capturing correctly → create a "Conversion Funnel" insight in PostHog dashboard with steps: page_view → tds_download_requested → sample_request_submitted → contact_enquiry_submitted.

**Core Web Vitals:** PostHog's built-in "Web Analytics" section (already enabled with posthog-js) tracks FCP, LCP, CLS automatically. No additional library needed.

---

### 4. SEO — built-in Next.js, no new packages

Next.js 16 App Router handles all SEO tooling natively:

**Sitemap:** Create `src/app/sitemap.ts` exporting a default async function. Fetch Sanity blog slugs inside it. No `next-sitemap` package needed — that package was designed for Pages Router and adds a post-build step that's redundant with App Router's file convention.

**robots.txt:** Create `src/app/robots.ts` — auto-served at `/robots.txt`.

**JSON-LD:** Render in Server Components with `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />`. Use `schema-dts` for TypeScript types.

**Per-page metadata:** `generateMetadata()` export in each `page.tsx`. Already used in v1.0 for Organization schema — extend to include `keywords`, `openGraph.description`, canonical URLs.

**Why not next-sitemap:** Multiple developers have documented migrating away from it to the built-in convention. The package adds a build script dependency; the native approach is type-safe, co-located with routes, and directly integrates with Sanity data fetching.

---

### 5. Sanity Blog SEO Schema Fields — schema additions only

Add an `seo` object field to the existing `post` schema. No new Sanity plugins required.

**Fields to add:**
```ts
// In schemas/post.ts
{
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Override title for <title> tag. 50-65 characters.',
      validation: Rule => Rule.max(65)
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Search result snippet. 120-155 characters.',
      validation: Rule => Rule.max(155)
    },
    {
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      description: 'Primary keyword this post targets (e.g. "Group II RRBO India")',
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Override canonical URL if republishing external content.',
    },
    {
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      description: 'Social share image. 1200x630px recommended.',
    },
  ]
}
```

Apply the same `seo` object pattern to other content types (products, certifications) where `generateMetadata()` needs per-document overrides.

---

## Installation

```bash
# New production dependency
npm install next-intl posthog-node schema-dts

# No new dev dependencies required
```

---

## Alternatives Considered

| Recommended | Alternative | Why Not |
|-------------|-------------|---------|
| next-intl (without routing) | next-translate | Requires webpack plugin; conflicts with Tailwind 4 PostCSS chain |
| next-intl (without routing) | Custom React context i18n | 50+ lines of boilerplate, no TypeScript inference, no pluralization support |
| next-intl (without routing) | react-i18next | Correct tool but adds 3 packages (i18next + react-i18next + i18next-resources-to-backend); next-intl is purpose-built for Next.js RSC |
| Resend scheduledAt | Resendly / Loops | Third-party SaaS overhead; 4 simple 2-step sequences don't justify a new vendor relationship |
| Resend scheduledAt | BullMQ / queue worker | Requires Redis, a worker process — massively over-engineered for a Vercel deployment |
| Built-in sitemap.ts | next-sitemap | next-sitemap is Pages Router heritage; App Router file convention is native, no post-build step, type-safe |
| posthog-node | @vercel/analytics | PostHog already integrated — adding Vercel Analytics is redundant instrumentation; posthog-node completes the existing setup |
| schema-dts | Raw JSON.stringify | Type safety prevents invalid Schema.org types from reaching production |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| next-sitemap | Pages Router-era package; adds a `postbuild` script; redundant with App Router's native `sitemap.ts` convention | `app/sitemap.ts` built-in |
| @sanity/plugin-seo | Heavyweight plugin with keyword density analysis; overkill for a 10-page B2B site; requires Sanity Studio v3 plugin install | Manual `seo` object schema fields |
| Loops / Resendly / Customer.io | Full drip campaign SaaS; 4 two-step sequences don't justify vendor + cost | `resend.emails.send({ scheduledAt: 'in 2 days' })` |
| BullMQ / Agenda for email queuing | Requires persistent Redis + worker; incompatible with Vercel serverless | Resend `scheduledAt` API |
| next-i18next | Pages Router only; deprecated for App Router | next-intl |
| Full site i18n routing (`/[locale]/`) | Out-of-scope per PROJECT.md; adds URL complexity, middleware, redirect logic for a single bilingual page | next-intl "without routing" mode |

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| next-intl@4.8.3 | next@16.2.1, react@19, TypeScript 5 | ESM-only in v4; `createNextIntlPlugin()` wraps `next.config.ts`; requires `NextIntlClientProvider` in layout |
| posthog-node@5.28.5 | Node 20+, Next.js API routes and Server Actions | Set `flushAt: 1, flushInterval: 0` for serverless; always call `await client.shutdown()` |
| schema-dts@1.1.2 | TypeScript 5+, any framework | Type-only package; zero runtime overhead |

---

## Sources

- [next-intl "without i18n routing" docs](https://next-intl.dev/docs/getting-started/app-router/without-i18n-routing) — setup pattern confirmed (HIGH)
- [next-intl 4.0 release notes](https://next-intl.dev/blog/next-intl-4-0) — breaking changes, ESM-only, NextIntlClientProvider requirement (HIGH)
- [Resend schedule email docs](https://resend.com/docs/dashboard/emails/schedule-email) — `scheduledAt` parameter, natural language syntax (HIGH)
- [Resend extended scheduling changelog](https://resend.com/changelog/extended-email-scheduling) — 30-day limit confirmed April 2025 (HIGH)
- [PostHog Node.js docs](https://posthog.com/docs/libraries/node) — `flushAt: 1` pattern for serverless (HIGH)
- [Next.js sitemap.xml file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) — built-in App Router sitemap (HIGH)
- [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld) — Server Component script injection (HIGH)
- [Sanity SEO schema guide](https://www.sanity.io/learn/course/seo-optimization/seo-schema-types-and-metadata) — reusable SEO object pattern (MEDIUM)
- npm registry — next-sitemap@4.2.3, next-intl@4.8.3, posthog-node@5.28.5 confirmed (HIGH)

---
*Stack research for: Santosh Petrochemical Innovations — v1.1 Growth & Polish*
*Researched: 2026-03-22*
