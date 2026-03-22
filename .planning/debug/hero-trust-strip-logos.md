---
status: diagnosed
trigger: "Hero trust strip uses text labels instead of real logos. Needs Indian Oil logo and Santosh Petrochemical logo from /asset/."
created: 2026-03-21T00:00:00Z
updated: 2026-03-21T00:00:00Z
---

## Current Focus

hypothesis: The Image tags ARE present in the code, but the Indian Oil SVG renders invisibly due to its fill colors being near-white/light against the dark hero background, and the Santosh logo is also invisible because its dark fills (#121713) disappear on a dark background — while the text labels ("Indian Oil", "Santosh") are what the user sees.
test: Inspected SVG fill colors and component rendering logic
expecting: Confirmed — the logos are technically present but render as invisible shapes
next_action: Fix SVG display issues per diagnosis below

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

## Resolution

root_cause: |
  Three compounding problems:
  1. Indian Oil SVG (public/indian-oil-logo.svg) is the full IOCL circular emblem — complex, multi-color, rendered at only 24x24px with no size adjustments. At that scale it is an unrecognizable smear.
  2. Santosh logo SVG has a portrait viewBox (838x1100) — at 20x20px with object-contain, it renders extremely small/narrow and unreadable.
  3. Both Image elements lack explicit width/height style constraints that would force the Next.js Image component to respect the container sizing correctly with SVGs.

  The text spans ("Indian Oil", "Santosh") are working fine — they ARE the visible content. The logos are there in the DOM but invisible or unreadably tiny.

fix: |
  For Indian Oil: increase display size to at minimum 32-40px height, or source/create a simpler version of the IOCL wordmark/logo that reads clearly at small sizes.
  For Santosh: increase height to 40-48px (and widen the container), remove the width constraint that forces square clipping of a portrait SVG. The current 20x20 crops it to near-nothing.
  Both: add explicit style={{ width: 'auto', height: '36px' }} or similar to let SVG aspect ratio breathe.

verification: not yet applied
files_changed: []
