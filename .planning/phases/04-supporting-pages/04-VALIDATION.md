---
phase: 4
slug: supporting-pages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-21
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (via Next.js / react-testing-library) |
| **Config file** | none — visual/render checks via `npm run build` |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 4-01-01 | 01 | 1 | ABOUT-01 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 4-01-02 | 01 | 1 | ABOUT-02 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 4-02-01 | 02 | 1 | QUAL-01 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 4-02-02 | 02 | 1 | QUAL-02 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 4-03-01 | 03 | 2 | SUST-01 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 4-03-02 | 03 | 2 | SUST-02 | manual | — | — | ⬜ pending |
| 4-04-01 | 04 | 2 | COLL-01 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 4-04-02 | 04 | 2 | COLL-02 | build | `npm run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/app/about/page.tsx` — route file stub
- [ ] `src/app/quality/page.tsx` — route file stub
- [ ] `src/app/sustainability/page.tsx` — route file stub
- [ ] `src/app/collect/page.tsx` — route file stub

*Existing Next.js + Tailwind + Framer Motion infrastructure covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| EPR progress bars animate on scroll | SUST-01 | CSS/Framer Motion scroll-triggered animation | Visit /sustainability, scroll to EPR section, verify bars animate from 0 to target % |
| Circular economy SVG loop animates | SUST-01 | SVG animation — not verifiable via build | Visit /sustainability, verify SVG loop animates continuously |
| Collection form submits to Google Sheets | COLL-01 | Requires live Google Sheets credentials | Submit form on /collect, verify row appears in "Collect Pickup" sheet tab |
| WhatsApp success CTA appears after submission | COLL-02 | Requires form submission flow | Submit collection form, verify WhatsApp link shows in success state |
| CO₂ savings figure includes cited source | SUST-02 | Content review | Read /sustainability, confirm CO₂ stat has inline source citation |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
