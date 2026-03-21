---
status: testing
phase: 03-products-process
source: [03-01-SUMMARY.md, 03-02-SUMMARY.md, 03-03-SUMMARY.md]
started: 2026-03-21T20:35:00Z
updated: 2026-03-21T20:35:00Z
---

## Current Test

number: 11
name: Process steps sticky panel + scroll animation
expected: |
  On /process (desktop), as you scroll through the 6 steps, a sticky left panel should track the active step — showing the current step's title and technical parameters. Each step should animate in as you scroll to it (fade/slide up from Framer Motion). On mobile, steps show vertically without a sticky panel.
awaiting: user response

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
result: [pending]

### 13. /sample-request page loads with form
expected: Navigate to /sample-request. The page should load with a two-column layout: left side has context copy about the sample request process, right side has a form card. The form has fields for Name, Address, Phone (all required), and Email, Grade, Quantity, Application (all optional).
result: [pending]

### 14. Sample request form — validation and success state
expected: On /sample-request, try submitting the form without Name/Address/Phone — it should show validation errors or refuse to submit. Fill in all required fields and submit — you should see a success state with a confirmation message and a WhatsApp link (wa.me/...) as a fallback contact option.
result: [pending]

### 15. /contact page loads with ContactForm
expected: Navigate to /contact. The page should load with the site's shared contact form (Name, Email, Message fields) on the right, and direct contact details on the left — phone number, email address, and Ghaziabad address. No duplicate form implementations.
result: [pending]

## Summary

total: 15
passed: 8
issues: 2
pending: 5
skipped: 1
skipped: 0
blocked: 0

## Gaps

[none yet]
