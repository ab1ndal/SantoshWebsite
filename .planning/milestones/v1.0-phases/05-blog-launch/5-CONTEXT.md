# Phase 5: Blog, Integrations & Launch - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Install and wire Sanity CMS, build /insights listing + [slug] post pages, author 4 seed articles, integrate Resend email, add PostHog analytics + Schema.org + sitemap, and finalize Vercel environment variable configuration. Domain attachment is deferred until the custom domain is purchased.

Does NOT include: custom domain DNS attachment (deferred — user awaiting domain purchase), Hindi language version (v2), CRM integration (v2), A/B testing (v2).

</domain>

<decisions>
## Implementation Decisions

### Sanity CMS — Studio

- **D-01:** Sanity Studio embedded in the Next.js app at `/studio` — single deployment, no separate Sanity project URL. Access controlled by Sanity's own auth: only users invited to the Sanity project via sanity.io dashboard can log in. Public visitors cannot access Studio.
- **D-02:** Sanity project initialized with `@sanity/client` + `next-sanity`. Studio rendered via the App Router at `src/app/studio/[[...tool]]/page.tsx` using `NextStudio` component.

### Sanity CMS — Blog Schema

- **D-03:** Blog post document type (`post`) with fields:
  - `title` (string, required)
  - `slug` (slug, required, auto-generated from title)
  - `tag` (string, enum: Technical / Regulatory / Comparison / How-To)
  - `featuredImage` (image with hotspot)
  - `readTime` (number, minutes — manually set or computed from body word count)
  - `publishedAt` (datetime)
  - `excerpt` (text, 1-2 sentence summary for cards)
  - `body` (array of Portable Text blocks — rich text)
- **D-04:** No author field in v1 — Lalit Bindal is the sole author; author display is hardcoded if needed.

### Sanity CMS — Seed Content

- **D-05:** Claude authors all 4 seed articles as full long-form content (600–900 words each), drawing on technical context from PROJECT.md, REQUIREMENTS.md, and MARKET.md research. Topics: Group II+, EPR Compliance 2026, RRBO vs Virgin, NCR used oil disposal. Lalit/Santosh reviews before publishing via Studio.
- **D-06:** Seed posts are created directly in Sanity using the Studio at /studio — not injected via migration script. Plan includes authoring instructions and post content for the executor to paste in.

### Homepage — LatestInsights Wiring

- **D-07:** `LatestInsights.tsx` updated to fetch the 3 most recent published posts from Sanity using a GROQ query (`*[_type == "post"] | order(publishedAt desc)[0..2]`). Component updated to dark ink-900 theme to match rest of site. Uses Next.js `cache: 'no-store'` or ISR with 1h revalidation.

### Blog/Insights Pages — Theme and Layout

- **D-08:** Both `/insights` listing page and `/insights/[slug]` post pages use the site's **dark ink-900 theme** — consistent with all other pages. No light-zone exception for blog content.
- **D-09:** `/insights` listing page: grid of post cards (same pattern as LatestInsights strip, but shows all posts). Hero with section label + headline. Responsive 1-col mobile → 3-col desktop grid.
- **D-10:** `/insights/[slug]` post page: **simple prose layout** — full-width hero with title, tag badge, date, and read time. Single-column reading body (max-w ~65ch), no sidebar, no TOC. Clean and fast.
- **D-11:** Post body rendered via **custom Portable Text renderer** mapping Sanity block types to site design tokens: Barlow 16px body text, Bebas Neue for headings (H2/H3), green-500 underline for links, amber-500 for blockquote accents.

### Resend Emails

- **D-12:** Sender address is a **placeholder** — executor leaves `FROM_EMAIL` as a `TODO` env var comment in `.env.example`. Actual address set by Santosh when domain is confirmed. Value format: `hello@[domain]`.
- **D-13:** TDS download confirmation email: Subject `"Your Santosh TDS is ready"`. Body: brief thank-you, PDF download link (same URL as the inline gate delivers), WhatsApp contact CTA. No PDF attachment — just the link.
- **D-14:** Enquiry notification email (fires on sample-request and contact form submit): sent to **two recipients** — Lalit's personal email + a team inbox. Both stored as env vars: `NOTIFY_EMAIL_PRIMARY` and `NOTIFY_EMAIL_CC`. Subject: `"New enquiry from [Name] — Santosh website"`. Body includes form field values.
- **D-15:** Resend integration is **additive** to existing forms — the Google Sheets write still happens first (Phase 3-05 pattern), Resend fires after. If Resend fails, the form submission still succeeds (graceful degradation).

### PostHog Analytics

- **D-16:** PostHog JS snippet added via `<Script>` in the root layout (`src/app/layout.tsx`). Events tracked: `tds_download` (TDS gate submit), `sample_request` (sample-request form submit), `pickup_booking` (collect form submit). No custom properties needed in v1 — event name alone is sufficient for funnel tracking.

### Schema.org Structured Data

- **D-17:** JSON-LD added as `<script type="application/ld+json">` in root layout for Organization + LocalBusiness types. Also add Product type on `/products` page. Values from PROJECT.md: company name, address (Ghaziabad), product (Group II+ RRBO), contact.

### Sitemap & robots.txt

- **D-18:** Use Next.js built-in `sitemap.ts` and `robots.ts` in the App Router (`src/app/sitemap.ts`, `src/app/robots.ts`). Sitemap includes all static routes + dynamically fetched Sanity post slugs. `robots.txt` allows all crawlers, disallows `/studio`.

### Vercel Deployment

- **D-19:** Vercel is already deployed with default domain. Phase 5 plan includes: (a) adding all new env vars to Vercel project settings (SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN, RESEND_API_KEY, POSTHOG_KEY, NOTIFY_EMAIL_PRIMARY, NOTIFY_EMAIL_CC, FROM_EMAIL), (b) a clear TODO doc for domain attachment when purchased, (c) verify `npm run build` passes after adding new dependencies.
- **D-20:** Preview deployments enabled for all branches in Vercel.

### Claude's Discretion
- Exact GROQ query construction for Sanity queries
- ISR vs `no-store` caching strategy for blog posts
- Portable Text renderer component file structure
- PostHog event property schema beyond event name
- sitemap.ts dynamic slug fetching implementation detail

</decisions>

<specifics>
## Specific Ideas

- Sanity Studio at /studio — access-restricted to invited project members only (Sanity's own auth)
- `LatestInsights.tsx` dark theme update is part of the Sanity wiring plan — not a separate cosmetic fix
- Seed articles authored by Claude, pasted into Studio by executor during plan execution — not a migration script
- Resend sender domain is a TODO — executor documents the setup steps and leaves placeholder env var
- Enquiry notification uses two env vars: `NOTIFY_EMAIL_PRIMARY` + `NOTIFY_EMAIL_CC`
- Vercel already deployed — Phase 5 Vercel plan is "add env vars + domain TODO + build verification" not "set up from scratch"

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` §Phase 5 — BLOG-01 to BLOG-06, INT-01 to INT-05

### Brand & design system
- `src/app/globals.css` — all design tokens (colors, fonts, CSS variables). Blog pages must use dark ink-900 theme, not white/light.

### Existing components to update
- `src/components/sections/LatestInsights.tsx` — currently hardcoded static data + light theme. Phase 5 wires to Sanity + updates to dark theme.
- `src/app/layout.tsx` — PostHog Script + Schema.org JSON-LD added here.

### Existing forms to extend with Resend
- `src/app/api/sample-request/route.ts` — Google Sheets write already wired. Add Resend notification call after sheets write.
- `src/app/sample-request/page.tsx` — TDS gate submit path. Add Resend TDS confirmation after gate submit.
- `src/app/contact/page.tsx` (or ContactForm.tsx) — Add Resend notification after form submit.

### Market context for blog content
- `.planning/research/MARKET.md` — EPR mandate details, IOCL MOU context, market size figures for seed article content

### Project context for blog content
- `.planning/PROJECT.md` §Company + §Core Value — company history, Group II+ positioning, Santosh Associates background for seed articles

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/api/sample-request/route.ts`: Google Sheets POST pattern — Resend integration mirrors this (API route → external API call → return success). Same graceful degradation approach.
- `src/components/sections/LatestInsights.tsx`: Post card visual pattern already designed — reuse card JSX for /insights listing grid.
- `src/components/ui/ContactForm.tsx`: Form validation + success state pattern — Resend integration is additive, not a rewrite.

### Established Patterns
- Server Components fetch data at render time — Sanity queries fit naturally as async Server Component data fetching.
- `"use client"` only for interactive components — post pages and listing are static (Server Components), PostHog init is client-side.
- Section labels: `.section-label` class (JetBrains Mono, amber, uppercase, numbered).
- Section backgrounds: `bg-ink-900` / `bg-ink-800` / `bg-ink-800/50` — blog pages use this, not white.

### Integration Points
- Nav: Add `/insights` link (currently missing)
- Footer: Add `/insights` link
- `src/app/layout.tsx`: PostHog `<Script>` + Schema.org `<script type="application/ld+json">`
- `src/app/sitemap.ts` + `src/app/robots.ts`: New files (Next.js App Router convention)
- `src/app/studio/[[...tool]]/page.tsx`: New file for embedded Sanity Studio

</code_context>

<deferred>
## Deferred Ideas

- Custom domain DNS attachment — deferred until domain is purchased. Plan documents the steps as a TODO.
- Hindi language version of /collect and blog — v2
- CRM integration (Zoho/HubSpot) — v2
- A/B testing on hero CTAs — v2
- Author field in blog post schema — v1 omitted (Lalit is sole author); add in v2 if needed
- Email templates with HTML design — v1 uses plain-text Resend emails for speed; styled HTML templates in v2

</deferred>

---

*Phase: 05-blog-launch*
*Context gathered: 2026-03-22*
