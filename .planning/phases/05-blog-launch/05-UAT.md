---
status: complete
phase: 05-blog-launch
source: [05-01-SUMMARY.md, 05-02-SUMMARY.md, 05-03-SUMMARY.md, 05-04-SUMMARY.md]
started: 2026-03-22T22:30:03Z
updated: 2026-03-22T22:30:03Z
---

## Current Test

[testing complete]

## Tests

### 1. Sanity Studio loads at /studio
expected: Visit http://localhost:3000/studio — the Sanity Studio UI loads with a "Post" document type in the sidebar. You can create and edit blog posts.
result: pass

### 2. Published article appears on /insights
expected: Visit http://localhost:3000/insights — your published article appears as a card showing its title, excerpt, tag badge, date, and read time.
result: pass

### 3. Nav and Footer on /insights
expected: The /insights page has the same navigation header and footer as all other pages (logo, nav links, footer columns).
result: pass

### 4. Blog post page renders correctly
expected: Click an article card on /insights — the post page at /insights/[slug] loads with the tag badge, title, date/read time, article body text, and the "Interested in Group II+ RRBO?" CTA section at the bottom.
result: pass

### 5. Featured image parallax hero
expected: If you uploaded a featured image for the article in Studio, the post page shows that image as a full-width background behind the title. As you scroll down into the article body, the image blurs and fades out.
result: pass

### 6. Body images render
expected: If you added an image block inside the article body in Studio, it renders as a full-width image within the article content.
result: pass

### 7. Nav has Insights link
expected: The site navigation includes an "Insights" link that takes you to /insights.
result: pass

### 8. /sitemap.xml serves routes
expected: Visit http://localhost:3000/sitemap.xml — an XML file loads listing static routes (/, /products, /about, /contact, /insights, etc.) plus your published blog post slug.
result: pass

### 9. /robots.txt disallows /studio
expected: Visit http://localhost:3000/robots.txt — the file shows "Disallow: /studio" to prevent crawlers from indexing the CMS.
result: pass

### 10. Schema.org JSON-LD on homepage
expected: View source on http://localhost:3000 (Cmd+U) and search for "application/ld+json" — find a script tag with Organization and LocalBusiness structured data for Santosh Petrochemical.
result: pass

### 11. LatestInsights section on homepage
expected: Visit the homepage — if you have published articles, the "Latest Insights" section appears showing up to 3 recent post cards. If no articles are published, the section is hidden entirely (no empty placeholder).
result: pass

## Summary

total: 11
passed: 11
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

[none yet]
