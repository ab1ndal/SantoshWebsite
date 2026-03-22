# GSD Debug Knowledge Base

Resolved debug sessions. Used by `gsd-debugger` to surface known-pattern hypotheses at the start of new investigations.

---

## hero-trust-strip-logos — Hero trust strip logos invisible, only text labels visible
- **Date:** 2026-03-22
- **Error patterns:** logo invisible, svg not showing, trust strip, image not visible, text label, brightness invert, aspect ratio, portrait viewBox, bg-white/8, unoptimized
- **Root cause:** Three compounding issues: (1) Indian Oil badge had bg-white/8 (semi-transparent dark) background making its #fefefe outer ring invisible; (2) both SVG Image elements had width/height props set to 40x40 ignoring actual intrinsic dimensions (Indian Oil is 200x239, Santosh is 839x1101) causing distorted aspect ratios; (3) neither Image had style={{ height, width:auto }} to control rendered size independently.
- **Fix:** Indian Oil badge: changed bg to bg-white (solid white so multi-color fills are visible), corrected Image intrinsic dims to width=200 height=239, added style={{ height:'40px', width:'auto' }}, added unoptimized, changed label text to text-ink-700. Santosh badge: corrected intrinsic dims to width=839 height=1101, added style={{ height:'40px', width:'auto' }}, added unoptimized.
- **Files changed:** src/components/sections/Hero.tsx
---

## process-page-logos — Process page IOCLCallout logos not displaying correctly
- **Date:** 2026-03-22
- **Error patterns:** logo not displaying, svg sizing, IOCLCallout, process page, object-contain, unoptimized, intrinsic dimensions, portrait viewBox, visual balance
- **Root cause:** IOCLCallout.tsx Image components used incorrect intrinsic dimensions (140x80 for Indian Oil, 100x80 for Santosh), were missing the `unoptimized` prop, had no explicit style dimensions to control rendered size, and carried `className="object-contain"` which conflicted with style-based sizing.
- **Fix:** Set correct intrinsic dims (Indian Oil: width=200 height=239; Santosh: width=839 height=1101), add unoptimized to both, add style={{ height:'120px', width:'auto' }} to both, remove object-contain className from both.
- **Files changed:** src/components/sections/process/IOCLCallout.tsx
---

## sample-request-validation-bypass — Form submits silently when required fields are empty
- **Date:** 2026-03-22
- **Error patterns:** noValidate, required, validation, silent submission, form submit, handleSubmit, setSubmitted, errors state, trim
- **Root cause:** `noValidate` on the form element disabled browser HTML5 constraint validation, and `handleSubmit` contained no JS validation logic — unconditionally calling `setSubmitted(true)`. A secondary gap existed in ContactForm where the message field was required per spec but not validated.
- **Fix:** Add `errors` state object, validate each required field with `.trim()` in handleSubmit before setSubmitted, return early on failure, render inline error messages (`mt-1 text-xs text-red-400`) under each validated field. Keep `noValidate` and use JS-only validation.
- **Files changed:** src/components/ui/SampleRequestForm.tsx, src/components/ui/ContactForm.tsx
---

