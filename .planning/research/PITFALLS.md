# Pitfalls Research

**Domain:** v1.1 Growth & Polish — adding email sequences, SEO optimization, PostHog funnels, Hindi bilingual content, and copy updates to an existing Next.js 14 + Sanity + Resend + PostHog system.
**Researched:** 2026-03-22
**Confidence:** HIGH (code-informed, cross-referenced against official docs and known issues)

---

## Critical Pitfalls

### Pitfall 1: Resend Has No Native "Send Later" for Sequences — The 30-Day Scheduling Trap

**What goes wrong:**
Developers assume Resend handles multi-step email sequences (e.g., "send 3 days after form submit, then 7 days after") natively. It does not. Resend's scheduling API schedules individual emails up to 30 days in advance — it has no concept of a trigger-based sequence. Calling `resend.emails.send({ scheduledAt: '...' })` inside a Route Handler fires on request, not on a durable schedule. If the Vercel function invocation times out, crashes, or the call is never made, the sequence never fires. There is no retry, no queue, no persistence.

The current codebase already fires immediate `resend.emails.send()` calls inside four route handlers (tds-download, sample-request, collect-pickup, contact). Adding delayed follow-ups to those same handlers is the obvious wrong move.

**Why it happens:**
Resend's docs show `scheduledAt` as a first-class API param, which makes it appear sufficient. The gap is that Resend schedules delivery of a pre-queued email, not execution of future logic. You cannot call `resend.emails.send()` 3 days from now unless something invokes that code 3 days from now.

**How to avoid:**
Pick one of two patterns and commit before writing any sequence logic:

- **Option A (Recommended for this project's scale): Vercel Cron + Google Sheets as queue.** Store a `follow_up_at` timestamp in the Sheets row on form submit. A Vercel Cron Job (free tier: 1 per day) runs a Route Handler that reads Sheets rows where `follow_up_at <= now && follow_up_sent == false`, sends via Resend, marks sent. No new infrastructure.

- **Option B: Resend `scheduledAt` for simple single-delay follow-ups.** For each touchpoint that needs only one follow-up (e.g., "3-day check-in after TDS download"), schedule the email at form-submit time using `scheduledAt: addDays(new Date(), 3).toISOString()`. Hard limit: 30-day window, no conditional logic, no cancellation if user converts.

Do NOT use in-process `setTimeout` or Node timers — Vercel serverless functions terminate after the response is returned.

**Warning signs:**
- Route handler response already returned before the `scheduledAt` email is confirmed queued
- Sequence emails showing as "never delivered" in Resend dashboard with no error in logs
- `resend.emails.send()` called sequentially inside a single handler for multiple delay times

**Phase to address:** Email Sequences phase — define the pattern (Cron or scheduledAt) in the task spec before any code is written.

---

### Pitfall 2: PostHog Double-Counting Pageviews Due to `person_profiles: 'identified_only'` + Manual Capture Pattern Mismatch

**What goes wrong:**
The existing `layout.tsx` initialises PostHog with `person_profiles: 'identified_only'` via an inline script. This is the correct option for a lead gen site (don't pay for anonymous profiles). However, the current setup does NOT set `capture_pageview: false`. PostHog's default is to auto-capture pageviews on init AND on every URL change it observes. In a Next.js App Router SPA, this fires on every client-side navigation. If a `PostHogPageView` component is later added to manually capture pageviews (the recommended pattern for App Router), every navigation will fire twice — once from the auto-capture and once from the manual capture component.

Result: every funnel based on `$pageview` events will show inflated step counts and incorrect conversion rates from day one.

**Why it happens:**
PostHog's JS snippet documentation assumes a traditional MPA. The App Router makes routing a client-side affair. Developers add the manual pageview pattern from the PostHog Next.js docs without removing the auto-capture that was already running.

**How to avoid:**
In the PostHog init call in `layout.tsx`, explicitly set `capture_pageview: false` alongside any manual pageview logic:

```javascript
posthog.init(key, {
  api_host: host,
  person_profiles: 'identified_only',
  capture_pageview: false,   // <-- MUST be set when using manual capture
  capture_pageleave: true,
})
```

Then implement a `<PostHogPageView />` client component that uses `usePathname()` + `useEffect` to fire `posthog.capture('$pageview')` on route change. Wrap it in `<Suspense>` in the root layout.

Verify fix: check PostHog dashboard for any specific page — if pageview count equals unique visitor count (not 2x), the fix is working.

**Warning signs:**
- PostHog shows 2x pageviews vs Google Search Console impressions on the same URLs
- Funnel step 1 completion rate > 100% of unique sessions
- `$pageview` appears twice in the PostHog event stream for a single page load during testing

**Phase to address:** Analytics & CRO phase — audit and fix event capture before building any funnel dashboards.

---

### Pitfall 3: Sanity Schema Additions Breaking Existing Queries Without a Data Migration

**What goes wrong:**
Adding new fields to the `post` schema (e.g., `seoTitle`, `metaDescription`, `focusKeyword` for blog SEO templates) does NOT fail — Sanity's schema changes are additive by default. But the existing TypeScript `Post` type in `src/lib/sanity/types.ts` and the GROQ queries in `src/lib/sanity/queries.ts` will not include these fields unless updated. The failure mode is subtle: pages render without error but SEO fields are silently `undefined`, `generateMetadata` falls back to generic defaults, and no SEO improvement is actually shipped. The client believes the feature is done; Google never sees it.

A secondary failure: if an existing field is *renamed* (e.g., `tag` → `category`), existing content retains the old field name and all `post.tag` references in TypeScript return `undefined` silently — the existing posts lose their tag display.

**Why it happens:**
Sanity schema changes are purely editorial — they tell the Studio what form fields to show. They have no effect on the stored documents. Developers add fields to the schema, update queries, but forget to update the TypeScript type, or update the type but forget to add the field to every affected GROQ query.

**How to avoid:**
For every new Sanity field added in v1.1:

1. Add the field to the schema (e.g., `sanity/schemas/post.ts`)
2. Add the field to the GROQ query (`src/lib/sanity/queries.ts`)
3. Add the field to the TypeScript type (`src/lib/sanity/types.ts`)
4. Verify in `/studio` that old posts can populate the new field (no migration needed if additive and optional)
5. If renaming any field, write a Sanity migration script — do not just rename in the schema

Do not rename existing fields (`tag`, `slug`, `body`). Only add new optional fields.

**Warning signs:**
- `generateMetadata` for blog posts returns the post title but no description — SEO fields added to schema but not to GROQ query
- TypeScript build passes but runtime shows `undefined` for new fields
- Studio shows new fields correctly, but the site shows nothing

**Phase to address:** SEO Content Optimization phase — schema additions and type/query updates must be treated as a 3-part atomic change.

---

### Pitfall 4: `metadataBase` Not Set, Causing Broken OG Images and Canonical URLs in Production

**What goes wrong:**
The existing `layout.tsx` sets `metadata.title` and `metadata.description` but does not set `metadataBase`. Without `metadataBase`, Next.js 14 generates relative URLs for `openGraph.images` and `twitter.images`. When the pages are rendered, social preview scrapers (LinkedIn, WhatsApp, Twitter) receive a relative path like `/og-image.png` instead of `https://santoshinnovations.in/og-image.png` and fail to load the image. Similarly, any `alternates.canonical` defined on sub-pages will be relative, meaning Google cannot canonicalize correctly.

**Why it happens:**
The `metadataBase` field is easy to omit because the site works perfectly in local development (relative URLs resolve against localhost) and Vercel preview deployments (where `VERCEL_URL` is set automatically). The bug only manifests in production where the domain is custom and no `metadataBase` is explicitly provided.

**How to avoid:**
Set `metadataBase` in `layout.tsx` using the env var already in the codebase:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://santoshinnovations.in'),
  title: { ... },
  // ...
}
```

Verify: `curl https://santoshinnovations.in | grep og:image` — the value must be an absolute URL.

**Warning signs:**
- WhatsApp/LinkedIn link previews show a blank image even though the OG image file exists
- `<meta property="og:image" content="/og-image.png">` (relative) in production HTML source
- Google Search Console "Invalid canonical URL" warnings

**Phase to address:** SEO Content Optimization phase — fix `metadataBase` before any other metadata work or OG image generation.

---

## Moderate Pitfalls

### Pitfall 5: Hindi Copy on /collect Without Loading a Devanagari Font — Rendering as Boxes

**What goes wrong:**
The `/collect` page uses Bebas Neue, Barlow, and JetBrains Mono — all Latin-only fonts. Hindi (Devanagari script) characters will render as tofu (empty boxes) on any device that does not have a Devanagari system font installed, which includes most Windows machines without Indian language packs and some older Android devices. The result looks broken and damages trust with the exact supplier audience the Hindi copy is meant to reach.

**Why it happens:**
Developers test on macOS (which has Devanagari built-in via San Francisco/system fonts) and don't notice the rendering failure. Windows Chrome on a non-Hindi locale machine will show boxes.

**How to avoid:**
Add a Google Font with Devanagari support for Hindi text elements only. Noto Sans Devanagari is the standard choice. Load it scoped to the `/collect` page only — do NOT add it to the root layout or it will increase global font payload.

```typescript
// app/collect/layout.tsx (create this file)
import { Noto_Sans_Devanagari } from 'next/font/google'
const devanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], weight: ['400', '500'] })
```

Apply the font class only to Hindi text spans, not the whole page body. This avoids layout interference with the existing Barlow/Bebas Neue design system.

**Warning signs:**
- Rectangular boxes appearing where Hindi text should render in Windows Chrome dev tools (device emulation: Windows)
- Hindi text appearing as question marks in some browsers

**Phase to address:** Hindi Bilingual Content phase — font loading is a prerequisite, not an afterthought.

---

### Pitfall 6: Language Toggle State Not Persisting Across Navigations — Hindi Users Lose Their Preference

**What goes wrong:**
If a language toggle is implemented with React `useState`, the Hindi/English state is lost on any page navigation. A supplier who switches to Hindi on `/collect`, then taps "Chat on WhatsApp" and comes back via browser back button, will see the page reset to English. This is particularly bad for the supplier audience who may be less comfortable with English and navigated to Hindi specifically because they needed it.

**Why it happens:**
Component-local state is wiped on unmount. App Router page transitions unmount components.

**How to avoid:**
For a single-page bilingual feature, use `localStorage` to persist the language preference and read it on mount:

```typescript
const [lang, setLang] = useState<'en' | 'hi'>(() => {
  if (typeof window === 'undefined') return 'en'
  return (localStorage.getItem('collect_lang') as 'en' | 'hi') ?? 'en'
})
```

This is simpler than adding a full i18n framework for one page. Do NOT use URL-based locale switching (e.g., `/hi/collect`) — this requires full i18n routing infrastructure and would break the existing App Router setup.

**Warning signs:**
- Language resets on back navigation
- Hindi users see English on first load even though they previously selected Hindi

**Phase to address:** Hindi Bilingual Content phase — implement with localStorage from the start, not as a follow-up fix.

---

### Pitfall 7: Commissioning-Phase Copy Contradiction — SEO Content and Blog Posts Claiming Production Status

**What goes wrong:**
The site is deliberately aspirational ("production imminent, forward-looking"). When new blog posts or updated copy is written for SEO, a well-intentioned description like "Santosh currently produces 65 TPD of Group II+ RRBO" contradicts pages that say "plant commissioning in progress." Search engines index all content; if blog posts claim active production and the homepage says "commissioning phase," the factual inconsistency creates credibility problems when real leads investigate.

The copy constraint is documented in PROJECT.md: "Plant is in SETUP/commissioning phase — website frames production as imminent/forward-looking."

**Why it happens:**
SEO content writers optimize for keyword density and miss the single most important business constraint — the plant status. Blog posts written for SEO typically make factual claims ("we produce X"). This project cannot.

**How to avoid:**
Before writing any SEO content, establish and document the approved copy register — a list of approved present-tense claims vs. claims that must be future-tense or framed as capability:

- Approved: "Designed for 65 TPD capacity", "Group II+ quality achieved in trials", "Serving blenders from [date]"
- Not approved: "We currently produce", "Our plant output is", "In production since"

Every new blog post and updated copy section must pass a single-question review: "Does this claim require the plant to be actively producing?" If yes, reframe or defer.

**Warning signs:**
- Blog post draft says "Santosh produces" or "we manufacture"
- About page update changes "commissioning" to "operational"
- Contact page copy implies immediate product availability without qualification

**Phase to address:** Content Polish phase — create the copy register first, before writing a single word.

---

### Pitfall 8: PostHog Funnel Windows Default to 14 Days — B2B Leads Never Complete

**What goes wrong:**
PostHog funnels have a default conversion window of 14 days. For a B2B industrial supplier, the consideration cycle from "TDS download" to "sample request confirmation" can exceed 30-60 days — procurement engineers route the TDS to a lab, wait for a lab test, then submit a sample request. With a 14-day window, the funnel will show near-zero conversion on the TDS→Sample step even when real conversions are happening, leading to incorrect CRO conclusions (e.g., "the TDS download is generating no leads, kill it").

**Why it happens:**
PostHog's default conversion window is optimized for SaaS and consumer products where funnels complete within days. The UI default is 14 days and most developers don't adjust it.

**How to avoid:**
When building funnel dashboards, set the conversion window to 60 days minimum for all funnels involving TDS download or sample request steps. Document this decision in the dashboard description so future users understand why the window is non-standard.

**Warning signs:**
- Funnel shows 0-2% conversion on steps where Google Sheets shows real leads are coming in
- Dashboard shows a steep drop-off at every step with no correlation to traffic spikes

**Phase to address:** Analytics & CRO phase — set conversion windows before sharing any funnel screenshots with the client.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hindi copy hardcoded in TSX (not in Sanity) | No new schema or CMS work | Client cannot update Hindi copy without dev; text lives in two codebases if English is in Sanity | Acceptable for v1.1 — supplier copy is stable, client won't edit it |
| Vercel Cron + Sheets as email queue (Option A) | No new service, free tier | Sheets becomes a fragile job queue; no retry on Resend failure; max 1 run/day on free plan | Acceptable at this lead volume (<50 leads/month); upgrade to Inngest if volume grows |
| Using `scheduledAt` for single-delay follow-ups (Option B) | No infrastructure, pure Resend API | No cancellation if user converts; hard 30-day limit; no conditional logic | Acceptable for simple single-step follow-ups |
| Adding `metadataBase` without per-page `canonicals` | Fixes OG images immediately | Canonical will default to the current URL, which is correct for most pages but wrong for paginated content | Acceptable for v1.1 — no paginated routes exist |
| Static Hindi copy in a `lang_hi` const object co-located with the component | Fast to build | Creates drift if English copy is updated in Sanity but Hindi isn't | Acceptable for v1.1 with a code comment flagging the divergence risk |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Resend sequences | Calling `resend.emails.send()` with `scheduledAt` for multiple steps in one handler | Schedule each step independently at submission time, or use Cron to poll a queue |
| Resend `from` address | Using `TODO@placeholder.com` (present in existing handlers as fallback) in production | Verify `FROM_EMAIL` env var is set and the domain is verified in Resend dashboard before v1.1 deploys |
| PostHog App Router | Adding manual pageview capture component without disabling auto-capture | Set `capture_pageview: false` in `posthog.init()` before adding any `PostHogPageView` component |
| PostHog `person_profiles: 'identified_only'` | Assuming anonymous events are excluded from funnels | Anonymous events ARE captured and appear in funnels — only person profile creation is skipped; funnel counts include all events |
| Sanity schema + TypeScript | Updating `schemas/post.ts` but not `types.ts` and `queries.ts` | Treat schema + query + type as a 3-file atomic change, always update all three |
| Next.js `generateMetadata` | Defining both a static `metadata` export and a `generateMetadata` function in the same file | Use one or the other per file segment — cannot export both |
| Next.js `generateMetadata` | Making a separate Sanity fetch inside `generateMetadata` and another in the page component | Next.js automatically memoises identical `fetch()` calls within the same request — use the same GROQ query string in both |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Loading Noto Sans Devanagari globally in root layout | 200-400KB font file added to every page's LCP | Scope the font import to `app/collect/layout.tsx` only | Day 1 if added to root layout |
| Adding `metadataBase` pointing to wrong domain (e.g., Vercel preview URL) | OG images work in preview but break in production | Tie `metadataBase` to `NEXT_PUBLIC_BASE_URL` env var, set correctly in Vercel production env | Only in production with custom domain |
| Resend called twice inside one handler (immediate + scheduled) | Slower route handler response, risk of partial failure (one send succeeds, one fails silently) | Wrap each Resend call in its own try/catch; log separately; graceful degrade is already the pattern | With any request volume |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| `FROM_EMAIL` env var missing in production, falling back to `TODO@placeholder.com` | Resend rejects emails from unverified domains; emails silently fail | Verify all four route handlers use `process.env.FROM_EMAIL` and that it maps to a verified domain in Resend dashboard |
| Embedding user-submitted `name` in Resend subject line (`New enquiry from ${name}`) without sanitization | Low risk (team-only inbox), but email subject injection is possible | For team notification emails: acceptable at this scale. If subject is ever user-visible, sanitize |
| Hindi content served without `lang` attribute update | Screen readers announce the Hindi content with English phonetics, confusing visually impaired users | Add `lang="hi"` attribute to Hindi text containers; do not change root `<html lang="en">` |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Language toggle placed at the bottom of /collect after all the content | Hindi-preferring supplier must scroll past English content before finding the toggle | Place the language toggle prominently at the top of the hero section, above the fold |
| Follow-up email arrives 3 days later referencing a specific grade the user didn't actually select (collect-pickup form has no grade field) | Confuses supplier, feels like a mistake | Sequence emails must branch on lead type — the collect-pickup touchpoint should not reference RRBO grades |
| SEO-optimized blog post using English technical jargon ("vacuum distillation," "hydrotreating") without Hindi equivalents | Loses the supplier audience that the Hindi /collect page was designed to capture | Blog SEO targets blenders (English audience); Hindi /collect targets suppliers. Don't mix the audiences |
| Funnel dashboard shared with client showing 0% conversion due to wrong time window | Client loses confidence in the analytics investment | Always validate funnel data against Sheets ground truth before sharing with client |

---

## "Looks Done But Isn't" Checklist

- [ ] **Resend sequences:** Sequence fires on submit — verify it also fires on next day, day 3, and day 7 in staging by manually manipulating the `follow_up_at` timestamp in Sheets
- [ ] **Resend domain:** `FROM_EMAIL` is set in Vercel production env, not just local `.env` — check Vercel dashboard, not just `.env.example`
- [ ] **PostHog pageviews:** `capture_pageview: false` is set — open browser DevTools Network tab, navigate between pages, confirm `$pageview` fires exactly once per navigation (not twice)
- [ ] **PostHog funnels:** Funnel conversion window explicitly set to 60 days — check dashboard settings, not just the graph
- [ ] **Sanity SEO fields:** New `seoTitle`/`metaDescription` fields visible in Studio AND appearing in `<head>` on production — check source HTML on a real blog post
- [ ] **`metadataBase`:** OG image URL in production HTML is absolute (`https://santoshinnovations.in/...`) — `curl` the production URL and grep for `og:image`
- [ ] **Hindi font:** No tofu boxes — test specifically in Windows Chrome with no Hindi language pack (use BrowserStack or Chromium with `--lang=en-US --no-sandbox`)
- [ ] **Plant status copy:** No new content claims the plant is "currently producing" — search all new copy for "currently", "today", "now produce", "we manufacture"

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Sequences fired incorrectly (wrong lead type, wrong delay) | MEDIUM | Delete the incorrectly queued emails in Resend dashboard before they fire; mark those Sheets rows as `follow_up_sent = error`; fix logic; re-queue |
| Double pageview counts in PostHog | HIGH | Events cannot be deleted retroactively from PostHog. Fix capture_pageview immediately; note the contamination date in dashboard descriptions; wait for clean data to accumulate before trusting funnel percentages |
| Broken OG images at launch | LOW | Add `metadataBase` to `layout.tsx`, deploy; social platforms cache OG metadata — request re-scrape via LinkedIn/WhatsApp/Twitter debug tools |
| Hindi tofu boxes in production | LOW | Add Devanagari font, deploy; no data loss, purely visual |
| Commissioning-era copy contradiction in published blog post | MEDIUM | Update Sanity CMS document directly; no code change needed; verify Google has re-crawled the URL via Search Console |
| Sanity query missing new SEO fields | LOW | Update GROQ query and TypeScript type; redeploy; ISR will refresh cached pages within the revalidate window (3600s) |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Resend sequences — no native scheduling | Email Sequences | Manually trigger each touchpoint and verify follow-up arrives at correct delay in staging |
| PostHog double pageview counting | Analytics & CRO | Network tab shows single `$pageview` per navigation |
| Sanity schema/type/query mismatch | SEO Content Optimization | Build passes AND new SEO fields appear in `<head>` HTML on production blog post |
| `metadataBase` missing | SEO Content Optimization | `curl` production URL; grep `og:image` shows absolute URL |
| Hindi font missing (Devanagari tofu) | Hindi Bilingual Content | Cross-browser test including Windows Chrome without Hindi locale |
| Language toggle state lost on navigation | Hindi Bilingual Content | Navigate away from /collect and back — language preference preserved |
| Commissioning-phase copy contradiction | Content Polish | Manual copy review checklist: grep new copy for banned phrases |
| PostHog funnel window too short for B2B | Analytics & CRO | Funnel dashboard explicitly shows 60-day window in settings |

---

## Sources

- Resend schedule API docs and changelog: https://resend.com/docs/dashboard/emails/schedule-email and https://resend.com/changelog/extended-email-scheduling
- PostHog Next.js integration: https://posthog.com/docs/libraries/next-js and https://posthog.com/tutorials/nextjs-analytics
- PostHog anonymous vs identified events: https://posthog.com/docs/data/anonymous-vs-identified-events
- PostHog form_start bug with identified_only: https://github.com/PostHog/posthog-js/issues/3136
- PostHog event naming conventions: https://posthog.com/docs/product-analytics/best-practices
- PostHog funnels: https://posthog.com/docs/product-analytics/funnels
- Next.js generateMetadata pitfalls: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js metadata duplicate tags issue: https://github.com/vercel/next.js/issues/82783
- Next.js App Router SEO guide: https://prateeksha.com/blog/nextjs-app-router-seo-metadata-sitemaps-canonicals
- Sanity schema migration considerations: https://www.sanity.io/docs/content-lake/important-considerations-for-schema-and-content-migrations
- Next.js font optimization and subsets: https://nextjs.org/docs/14/app/building-your-application/optimizing/fonts
- Codebase review: all four route handlers in `src/app/api/`, `src/app/layout.tsx`, `src/lib/sanity/schemas/post.ts`, `src/lib/sanity/types.ts`, `src/lib/sanity/queries.ts`

---
*Pitfalls research for: v1.1 Growth & Polish — Next.js 14 + Sanity + Resend + PostHog, existing system additions*
*Researched: 2026-03-22*
