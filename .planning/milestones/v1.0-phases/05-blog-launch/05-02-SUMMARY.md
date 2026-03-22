---
phase: 05-blog-launch
plan: 02
subsystem: blog-ui
tags: [blog, sanity, portable-text, insights, server-components, isr, next-js-16]

# Dependency graph
requires:
  - phase: 05-01
    provides: Sanity client, Post type, GROQ queries (allPostsQuery, postBySlugQuery, latestPostsQuery, allPostSlugsQuery)
provides:
  - PostCard reusable dark-theme blog card at src/components/sections/PostCard.tsx
  - PortableTextRenderer client component with design token mapping at src/components/blog/PortableTextRenderer.tsx
  - /insights listing page with ISR at src/app/insights/page.tsx
  - /insights/[slug] post page with generateStaticParams at src/app/insights/[slug]/page.tsx
  - LatestInsights wired to Sanity with dark ink-900 theme at src/components/sections/LatestInsights.tsx
  - /insights in Nav (7th link) and Footer (pre-existing)
affects: [05-03, 05-04]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - unstable_cache wrapper around sanityClient.fetch for ISR caching (revalidate=3600)
    - Next.js 16 async params pattern: params as Promise<{ slug: string }>, const { slug } = await params
    - Server Component async function pattern for data-fetching pages
    - PortableTextRenderer as Client Component island within Server Component tree
    - null return from LatestInsights when zero posts (no static fallback data)

# Key files
key-files:
  created:
    - src/components/sections/PostCard.tsx
    - src/components/blog/PortableTextRenderer.tsx
    - src/app/insights/page.tsx
    - src/app/insights/[slug]/page.tsx
  modified:
    - src/components/sections/LatestInsights.tsx
    - src/components/layout/Nav.tsx

# Key decisions
decisions:
  - PortableTextRenderer uses `as any` cast for Post.body (typed as unknown[]) to satisfy @portabletext/react TypedObject constraint — avoids changing shared type interface, fix-in-place per Rule 1
  - LatestInsights returns null when posts.length === 0 per D-07 spec — no static fallback, section hides until Sanity seed content is published
  - Footer already had /insights link in Company section — no changes needed
  - Nav Insights link appended as 7th entry (after Quality), matching plan spec

# Metrics
metrics:
  duration: ~3 minutes
  completed_date: "2026-03-22"
  tasks_completed: 2
  tasks_total: 2
  files_created: 4
  files_modified: 2
---

# Phase 05 Plan 02: Blog UI Pages Summary

**One-liner:** Dark-theme blog UI with ISR, PostCard component, PortableTextRenderer, /insights listing + slug pages, LatestInsights wired to Sanity, Nav updated with Insights link.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create PostCard and PortableTextRenderer components | 33bf0bb | PostCard.tsx, PortableTextRenderer.tsx |
| 2 | Create /insights pages, wire LatestInsights + Nav + Footer | 1c606b6 | 5 files |

## What Was Built

**PostCard component** (`src/components/sections/PostCard.tsx`): Server Component rendering dark ink-800 cards with tag color map (Technical=green, Regulatory=amber, Comparison/How-To=ink), JetBrains Mono meta row with date/read-time/hover "Read →", Barlow Condensed title, full-card link target.

**PortableTextRenderer** (`src/components/blog/PortableTextRenderer.tsx`): Client Component mapping all Sanity Portable Text block types to design tokens — Bebas Neue h2/h3 headings, Barlow body/lists, amber blockquote border, green link underlines.

**/insights listing page** (`src/app/insights/page.tsx`): Async Server Component with ISR revalidate=3600, hero with section label + Bebas Neue headline, 3-column post grid, empty state when no posts.

**/insights/[slug] post page** (`src/app/insights/[slug]/page.tsx`): Next.js 16 async params pattern, generateStaticParams, generateMetadata, notFound() on missing slug, prose article in max-w-[65ch], footer CTA with sample-request + contact buttons.

**LatestInsights** (`src/components/sections/LatestInsights.tsx`): Rewritten as async Server Component fetching latest 3 posts from Sanity via unstable_cache, full dark ink-900 theme conversion, returns null if zero posts.

**Nav** (`src/components/layout/Nav.tsx`): Insights link added as 7th nav entry after Quality.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed PortableTextRenderer type mismatch**
- **Found during:** Task 2 TypeScript check
- **Issue:** `Post.body` is typed as `unknown[]` but `@portabletext/react PortableText` component requires `TypedObject | TypedObject[]`. TypeScript error: Type 'unknown[]' is not assignable to type 'TypedObject[]'.
- **Fix:** Added `as any` cast at the PortableText value prop in PortableTextRenderer. The `Post` interface in types.ts uses `body?: unknown[]` as a generic container; changing it would affect the Sanity schema definition pattern from Plan 01.
- **Files modified:** `src/components/blog/PortableTextRenderer.tsx`
- **Commit:** 1c606b6 (bundled with Task 2)

## Known Stubs

None — all data is wired to Sanity. LatestInsights and /insights pages return null/empty state when no posts exist, which is intentional pending seed content (Plan 05-04).

## Build Note

`npm run build` fails due to pre-existing missing Resend API key in `/api/collect-pickup` and `/api/contact` routes — confirmed to pre-date this plan (same error on commit c093dd9 before plan 05-02 changes). Out of scope per deviation scope boundary rules. Deferred to `/api` configuration when env vars are set in deployment.

## Self-Check: PASSED

Files verified:
- src/components/sections/PostCard.tsx: FOUND
- src/components/blog/PortableTextRenderer.tsx: FOUND
- src/app/insights/page.tsx: FOUND
- src/app/insights/[slug]/page.tsx: FOUND
- src/components/sections/LatestInsights.tsx: FOUND (modified)
- src/components/layout/Nav.tsx: FOUND (modified, contains /insights)

Commits verified:
- 33bf0bb: feat(05-02): create PostCard and PortableTextRenderer components — FOUND
- 1c606b6: feat(05-02): create insights pages, wire LatestInsights to Sanity, update Nav — FOUND
