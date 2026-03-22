---
status: resolved
trigger: "Hero trust strip uses text labels instead of real logos. Needs Indian Oil logo and Santosh Petrochemical logo from /asset/."
created: 2026-03-21T00:00:00Z
updated: 2026-03-22T00:00:00Z
---

## Current Focus

hypothesis: CONFIRMED — logos render unrecognizably due to scale/aspect-ratio/color-contrast issues
test: Fix applied to Hero.tsx — Image props corrected with real SVG intrinsic dims, style for rendered height, unoptimized flag, Indian Oil badge given white background
expecting: Both logos visually readable in browser
next_action: Human verifies logos render in hero trust strip

## Symptoms

expected: Trust strip shows actual logo images — Indian Oil Technology logo and Santosh Petrochemical logo
actual: Trust strip shows only text labels ("Indian Oil", "Santosh")
errors: No runtime errors — purely a visual/rendering issue
reproduction: Load the hero section, look at the trust strip logo badges
started: Current state of codebase

## Eliminated

- hypothesis: Image files missing from public/ entirely
  evidence: Both /public/indian-oil-logo.svg and /public/santosh-logo.svg exist
  timestamp: 2026-03-21

- hypothesis: Image component using wrong src paths
  evidence: src="/indian-oil-logo.svg" and src="/santosh-logo.svg" correctly reference public/ files
  timestamp: 2026-03-21

- hypothesis: Next.js image config blocking local SVGs
  evidence: next.config.ts only restricts remote patterns; local public/ files need no config
  timestamp: 2026-03-21

## Evidence

- timestamp: 2026-03-21
  checked: /public/indian-oil-logo.svg fill colors
  found: Three fill groups — #fefefe (near-white), #02164f (dark navy), #f37022 (orange). The outer ring shape uses #fefefe which is nearly invisible on white backgrounds. The component renders this at 24x24px against a dark bg — the navy and orange parts are small and may render but the white ring dominates.
  implication: At 24x24px, the complex multi-color IOCL logo likely renders as an unidentifiable smear; the #fefefe areas disappear against lighter containers

- timestamp: 2026-03-21
  checked: /public/santosh-logo.svg (= asset/Santosh Petrochemical logo.svg — files are identical)
  found: SVG has fills #121713 (near-black text), #f49f1e (amber), #399e65 (green). The component applies className="brightness-0 invert" which converts all fills to white. viewBox is 0 0 838.85 1100.97 (portrait, tall/narrow). Rendered at 20x20px.
  implication: brightness-0 invert makes the entire logo white-on-transparent, which should be visible on dark backgrounds — but the portrait aspect ratio (838x1100) means at 20x20, the logo is squished and unreadable

- timestamp: 2026-03-21
  checked: Hero.tsx trust strip markup (lines 203-244)
  found: The Image tags ARE rendered — both logos are coded. Each badge has Image + a text span. The user sees the text spans ("Indian Oil", "Santosh") but the images either render as invisible or as a tiny unrecognizable icon.
  implication: The "text labels instead of logos" complaint is because the images render invisibly/unrecognizably, leaving only the text labels visible

- timestamp: 2026-03-21
  checked: asset/ directory
  found: asset/Santosh Petrochemical logo.svg is identical to public/santosh-logo.svg — already copied correctly. No Indian Oil logo exists in asset/ — the public/indian-oil-logo.svg was sourced separately (likely from web).
  implication: The Santosh logo source is available and already in public/. No additional asset copying needed.

- timestamp: 2026-03-22
  checked: Indian Oil SVG viewBox
  found: viewBox="0 0 200.00202 238.97912" — slightly portrait, nearly square. The intrinsic width/height props were wrongly set to 40x40 (1:1 ratio), distorting the aspect ratio hint.
  implication: Corrected to width=200 height=239 to match real aspect ratio.

- timestamp: 2026-03-22
  checked: Fix applied to Hero.tsx
  found: Indian Oil badge — changed bg-white/8 to bg-white (white pill background so multi-color SVG fills are visible); Image props corrected to width=200 height=239, style={{ height:'40px', width:'auto' }}, unoptimized; label text changed to text-ink-700 (dark text on white bg). Santosh badge — Image props corrected to width=839 height=1101 (real portrait aspect ratio), style={{ height:'40px', width:'auto' }}, unoptimized; brightness-0 invert kept for white-on-dark-bg rendering.
  implication: Both logos should now render at a legible 40px height with correct aspect ratios.

## Resolution

root_cause: |
  Three compounding problems:
  1. Indian Oil SVG (public/indian-oil-logo.svg) is the full IOCL circular emblem — complex, multi-color, rendered at only 40x40px with no explicit style sizing. Width/height props were set to 40x40 (1:1) but actual SVG is 200x239. Most critically, the badge had bg-white/8 (semi-transparent dark) background — the SVG's #fefefe outer ring was invisible against the dark hero background.
  2. Santosh logo SVG has a portrait viewBox (838x1100) — width/height props set to 40x40 (1:1) forcing wrong aspect ratio. At that scale the portrait SVG renders as a thin sliver.
  3. Neither Image element had style={{ width: 'auto', height: '40px' }} to control rendered size independently of the intrinsic dimension hint.

  The text spans ("Indian Oil", "Santosh") are working fine — they ARE the visible content. The logos are there in the DOM but invisible or unreadably tiny.

fix: |
  Indian Oil: Changed badge container from bg-white/8 to bg-white (gives the multi-color SVG a white ground to show against). Corrected Image width=200 height=239 (real SVG intrinsic dims for correct aspect ratio). Added style={{ height:'40px', width:'auto' }} so rendered size is 40px tall with natural width. Added unoptimized (SVGs don't need raster optimization). Changed label text class to text-ink-700 (dark text on white badge).
  Santosh: Corrected Image width=839 height=1101 (real portrait intrinsic dims). Added style={{ height:'40px', width:'auto' }}. Added unoptimized. Kept brightness-0 invert (makes all fills white for visibility on dark hero bg).

verification: Confirmed fixed 2026-03-22 — logos now visible in browser at correct size.
files_changed:
  - src/components/sections/Hero.tsx
