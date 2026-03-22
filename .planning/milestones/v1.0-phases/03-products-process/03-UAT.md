---
status: diagnosed
phase: 03-products-process
source: [03-01-SUMMARY.md, 03-02-SUMMARY.md, 03-03-SUMMARY.md]
started: 2026-03-21T20:35:00Z
updated: 2026-03-21T21:10:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Nav CTAs route to /sample-request
expected: Open the site. In the desktop Nav, click "Request a Sample" — it should navigate to /sample-request. Open mobile nav, same button should also go to /sample-request (not /products or any other URL).
result: pass

### 2. Footer "Contact Us" link and ContactForm
expected: Scroll to the site footer. There should be a "Contact Us" link in the Company column that routes to /contact. The footer CTA section should render a contact form (Name, Email, Message fields) with a Submit button — not a broken/empty section.
result: pass

### 3. ProcessTeaser Indian Oil Technology copy
expected: On the homepage, find the Process Teaser section. The body copy should read "Indian Oil Technology powers our plant..." — no mention of "REVA" anywhere in that section.
result: pass

### 4. Hero trust strip
expected: On the homepage hero section, the trust strip (small logos/badges at the bottom of the hero) should show "Indian Oil Technology" — not "REVA Process Technology".
result: issue
reported: "Trust strip uses text labels, not real logos — needs Indian Oil logo from web and real Santosh Petrochemical logo from /asset/"
severity: major

### 5. /products page loads with all sections
expected: Navigate to /products. The page should load with 6 visible sections in order: hero (Group II+ headline + dual CTA), spec table, comparison table, grade cards, pack formats, and TDS gate at the bottom. No broken layouts or missing sections.
result: pass

### 6. Spec table mobile scroll
expected: On /products, the spec table (7 columns of technical specs) should be horizontally scrollable on a narrow screen. There should be a visible swipe hint (text or icon) prompting the user to scroll the table. On desktop it should display all columns without scrolling.
result: skipped
reason: Testing on laptop only — mobile layout to verify later on phone

### 7. Comparison table — Santosh column highlighted
expected: On /products, the comparison table should have 3 columns (competitors + Santosh). The Santosh column should have a green border on left and right, a green-tinted background, and a "RECOMMENDED" badge above it — visually distinguishing it from the competitor columns.
result: pass

### 8. Grade cards → /sample-request links
expected: On /products, there are 3 grade cards (e.g. SN 150, SN 250, SN 500 or similar). Each card should have a CTA button that links to /sample-request. The cards should animate in on scroll (staggered entrance).
result: pass

### 9. TDS gate — 3-state flow
expected: On /products, find the TDS gate section. Initially shows a "Download TDS" button. Clicking it reveals a form with Full Name (required), Phone (required), and Email (optional). Submitting the form shows a success state and triggers a PDF download of the TDS file.
result: pass

### 10. /process page loads
expected: Navigate to /process. The page should load with a hero section that mentions Indian Oil Technology in the subheadline. Below it, 6 process steps should be visible. No broken layouts.
result: pass

### 11. Process steps sticky panel + scroll animation
expected: On /process (desktop), as you scroll through the 6 steps, a sticky left panel should track the active step — showing the current step's title and technical parameters. Each step should animate in as you scroll to it (fade/slide up from Framer Motion). On mobile, steps show vertically without a sticky panel.
result: issue
reported: "Scroll works but steps have no images — need real pictures of each process step from the internet"
severity: major

### 12. IOCL callout section
expected: On /process, after the 6 steps, there should be an "Indian Oil Technology" callout section. The text "Indian Oil Technology" should appear in amber/yellow color (not white). There should be a CTA button linking to /products.
result: pass

### 13. /sample-request page loads with form
expected: Navigate to /sample-request. The page should load with a two-column layout: left side has context copy about the sample request process, right side has a form card. The form has fields for Name, Address, Phone (all required), and Email, Grade, Quantity, Application (all optional).
result: pass

### 14. Sample request form — validation and success state
expected: On /sample-request, try submitting the form without Name/Address/Phone — it should show validation errors or refuse to submit. Fill in all required fields and submit — you should see a success state with a confirmation message and a WhatsApp link (wa.me/...) as a fallback contact option.
result: issue
reported: "I was able to send a sample request without putting in required fields"
severity: major

### 15. /contact page loads with ContactForm
expected: Navigate to /contact. The page should load with the site's shared contact form (Name, Email, Message fields) on the right, and direct contact details on the left — phone number, email address, and Ghaziabad address. No duplicate form implementations.
result: pass

## Summary

total: 15
passed: 11
issues: 3
pending: 0
skipped: 1
blocked: 0

## Gaps

- truth: "Hero trust strip should display readable Indian Oil and Santosh logos, not just text labels"
  status: failed
  reason: "User reported: Trust strip uses text labels, not real logos — needs Indian Oil logo from web and real Santosh Petrochemical logo from /asset/"
  severity: major
  test: 4
  root_cause: "Logo <Image> tags exist in Hero.tsx (lines 213-243) but are rendered at 24x24 and 20x20 — too small for both SVGs. Santosh logo has a 838x1100 portrait viewBox that squishes to nothing; IOCL emblem is unreadable at 24px. Only text labels are visible."
  artifacts:
    - path: "src/components/sections/Hero.tsx"
      issue: "Indian Oil Image at width=24 height=24 (unreadable); Santosh Image at width=20 height=20 with 838x1100 portrait SVG (invisible)"
  missing:
    - "Increase Santosh logo to ~width=28 height=37 (or height=40px auto-width)"
    - "Increase Indian Oil logo to at least width=40 height=40 so circular emblem is readable"
  debug_session: ".planning/debug/hero-trust-strip-logos.md"

- truth: "Form should refuse to submit without Name, Address, and Phone — show validation errors on required fields"
  status: failed
  reason: "User reported: I was able to send a sample request without putting in required fields"
  severity: major
  test: 14
  root_cause: "SampleRequestForm.tsx has noValidate on the <form> (disables browser validation) AND handleSubmit unconditionally calls setSubmitted(true) with zero field checks. No errors state or error message JSX exists."
  artifacts:
    - path: "src/components/ui/SampleRequestForm.tsx"
      issue: "noValidate disables browser validation; handleSubmit has no guards; no errors state or error UI"
  missing:
    - "Add errors useState object for name/address/phone"
    - "Add validation checks in handleSubmit before setSubmitted(true)"
    - "Add error message JSX beneath each required field"
  debug_session: ".planning/debug/sample-request-validation-bypass.md"

- truth: "Sample request form submissions should be saved to Google Sheets for tracking"
  status: failed
  reason: "User requested: save form data to Google Sheets (https://docs.google.com/spreadsheets/d/1oc5WnrHE_MA139bN5X7PF6bEYZCbkNJz8LA5LlO09vI/)"
  severity: major
  test: 14
  root_cause: "Feature not implemented — form currently only logs to console and shows success state"
  artifacts:
    - path: "src/components/ui/SampleRequestForm.tsx"
      issue: "handleSubmit does console.log only, no API call to Google Sheets"
  missing:
    - "Google Sheets API route (app/api/sample-request/route.ts) to append rows"
    - "Form submission to call the API route with collected data"
