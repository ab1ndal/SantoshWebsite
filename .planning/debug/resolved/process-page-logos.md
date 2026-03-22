---
status: resolved
trigger: "Investigate and fix logo display issues on the /process page"
created: 2026-03-22T00:00:00Z
updated: 2026-03-22T00:30:00Z
symptoms_prefilled: true
---

## Current Focus

hypothesis: Indian Oil at 64px was too small relative to Santosh at 160px; increasing Indian Oil to 120px should achieve better visual balance
test: Changed Indian Oil style height from 64px to 120px (width:auto, intrinsic dims 200x239 retained)
expecting: Indian Oil circular emblem renders ~100px wide at 120px height; better visual parity with Santosh at 160px
next_action: Awaiting human verification of fourth iteration (Santosh 160px, Indian Oil 120px)

## Symptoms

expected: Logos on the /process page render visibly and correctly
actual: Logos on /process page are not displaying correctly (same class of issue as hero trust strip — SVG sizing/visibility)
errors: No runtime errors — visual/rendering issue
reproduction: Load /process in the browser, observe logo images in IOCLCallout section (07 · TECHNOLOGY PARTNER)
started: Reported after hero trust strip logo fix was confirmed

## Eliminated

- hypothesis: ProcessHero or ProcessSteps contain logo Image components
  evidence: ProcessHero has no images; ProcessSteps only uses external Unsplash images for step photos, no SVG logos
  timestamp: 2026-03-22T00:00:00Z

## Evidence

- timestamp: 2026-03-22T00:00:00Z
  checked: All three process page components (ProcessHero, ProcessSteps, IOCLCallout)
  found: Only IOCLCallout.tsx uses logo Image components; ProcessHero has none; ProcessSteps uses only Unsplash photos
  implication: Bug is isolated to IOCLCallout.tsx

- timestamp: 2026-03-22T00:00:00Z
  checked: IOCLCallout.tsx Indian Oil Image props (line 61-67)
  found: width={140} height={80}, no unoptimized, no style override — actual SVG viewBox is 200×239 (portrait-ish)
  implication: Intrinsic dims don't match viewBox; without style height+width:auto, object-contain may collapse; missing unoptimized means Next.js may try to optimize an SVG

- timestamp: 2026-03-22T00:00:00Z
  checked: IOCLCallout.tsx Santosh Image props (line 87-92)
  found: width={100} height={80}, no unoptimized, no style override — actual SVG viewBox is 839×1101 (tall portrait)
  implication: Intrinsic dims are completely wrong for a tall portrait SVG; 100×80 would badly distort it

- timestamp: 2026-03-22T00:00:00Z
  checked: Hero.tsx trust strip (confirmed working fix reference, lines 214-240)
  found: Indian Oil uses width={200} height={239} + unoptimized + style={{ height:'40px', width:'auto' }}; Santosh uses width={839} height={1101} + unoptimized + style={{ height:'40px', width:'auto' }} + brightness-0 invert
  implication: Correct pattern established — apply same intrinsic dims, unoptimized flag, and style height constraint

## Resolution

root_cause: IOCLCallout.tsx Image components used incorrect intrinsic dimensions, missing `unoptimized` prop, missing explicit style dimensions, and had `className="object-contain"` which conflicted with style-based sizing and triggered the Next.js warning. Santosh's tall portrait SVG (839×1101) needs more height than Indian Oil (200×239) to achieve visual parity.
fix: Indian Oil: width=200 height=239 unoptimized style={{height:'120px',width:'auto'}} (no className). Santosh: width=839 height=1101 unoptimized style={{height:'120px',width:'auto'}} (no className). User manually tuned Santosh height from 160px to 120px to match Indian Oil — both logos now visually balanced at equal height.
verification: Confirmed fixed by user. Both logos render visibly and are visually balanced on the /process page IOCLCallout section.
files_changed: [src/components/sections/process/IOCLCallout.tsx]
