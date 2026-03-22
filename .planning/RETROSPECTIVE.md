# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

---

## Milestone: v1.0 — Launch

**Shipped:** 2026-03-22
**Phases:** 5 | **Plans:** 23 | **Timeline:** 3 days (2026-03-20 → 2026-03-22)

### What Was Built
- Full 10-route marketing site: homepage, products, process, sample-request, contact, about, quality, sustainability, collect, blog
- Design system with brand tokens, 4-variant Button, StatCard, Tag, SectionLabel, Nav, Footer
- Sanity CMS integration with embedded Studio at /studio + 4 seed blog articles
- Google Sheets API routes on all 4 forms (contact, sample, TDS gate, pickup) with graceful degradation
- Resend email on all 4 routes + PostHog analytics + Schema.org JSON-LD + sitemap/robots.txt

### What Worked
- **Parallel plan execution** — multiple plans executing simultaneously within phases saved significant time
- **Shared component pattern** — ContactForm extracted once, reused in /contact + FooterCTA without duplication
- **Graceful degradation on API routes** — Sheets write failures return 200 with warning; users never see errors
- **Phase 3 gap closure plans** — catching missing validations and hero logo issues in dedicated gap plans kept main plans focused
- **YOLO + coarse granularity** — minimal confirmation gates allowed fast execution across 5 phases in 3 days
- **Debug sessions with persistence** — .planning/debug/ state survived context resets; continued investigation without re-explaining

### What Was Inefficient
- **SVG Image sizing** — hero trust strip and /process IOCL callout both had the same SVG intrinsic dimension bug; could have been caught once and fixed globally
- **Form validation** — had to write a debug session to catch that SampleRequestForm and ContactForm both lacked validation; this should be a standard plan checklist item
- **REQUIREMENTS.md checkboxes** — Phases 1 and 2 requirements were never checked off as phases completed; milestone archival caught the gap

### Patterns Established
- **SVG in Next.js Image**: always set real intrinsic dims matching viewBox, add `unoptimized`, `style={{ height: 'Xpx', width: 'auto' }}`, no `object-contain` className
- **Form validation pattern**: `errors` state object, `.trim()` checks in handleSubmit, `mt-1 text-xs text-red-400` inline messages, `noValidate` kept
- **API route resilience**: Sheets write first, Resend after in try/catch — user never blocked by third-party failure
- **Resend lazy init**: instantiate inside POST handler, not at module level — prevents build failure when env var absent

### Key Lessons
1. **Treat SVG sizing as a distinct checklist item** — SVG viewBox aspect ratios almost always need explicit height + auto width treatment in Next.js Image
2. **Validate forms in the plan spec, not as a debug session** — add "JS validation with errors state" as a requirement in every form plan
3. **Mark requirements complete at phase execution time** — don't leave requirement checkboxes for the milestone archival step

### Cost Observations
- Model mix: ~100% sonnet (balanced profile throughout)
- Sessions: ~4-5 sessions across 3 days
- Notable: 3-day full-site delivery enabled by YOLO mode + coarse granularity + parallel execution

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Duration | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 | 3 days | 5 | First milestone — greenfield site, all patterns established |

### Cumulative Quality

| Milestone | Forms | Routes | Build Status |
|-----------|-------|--------|--------------|
| v1.0 | 4 (all validated) | 10 | ✅ Passing |

### Top Lessons (Verified Across Milestones)

1. SVG sizing in Next.js Image requires explicit intrinsic dims + `unoptimized` + style
2. Form validation belongs in plan specs, not post-hoc debug sessions
