---
status: diagnosed
trigger: "The /sample-request form submits without enforcing required fields (Name, Address, Phone)."
created: 2026-03-21T00:00:00Z
updated: 2026-03-21T00:00:00Z
---

## Current Focus

hypothesis: Form has `noValidate` on the `<form>` element which disables browser native validation, and `handleSubmit` contains no JS validation logic — so required fields are never checked.
test: Read SampleRequestForm.tsx completely
expecting: noValidate present + empty handleSubmit
next_action: DIAGNOSED — ready for fix

## Symptoms

expected: Submitting without Name, Address, or Phone shows validation errors and prevents submission
actual: Form submits successfully even when required fields are empty
errors: none (silent submission)
reproduction: Navigate to /sample-request, leave Name/Address/Phone blank, click "Send Sample Request"
started: unknown / likely from initial build

## Eliminated

(none — root cause confirmed on first read)

## Evidence

- timestamp: 2026-03-21T00:00:00Z
  checked: SampleRequestForm.tsx line 55
  found: `<form onSubmit={handleSubmit} className="space-y-5" noValidate>`
  implication: `noValidate` explicitly disables all browser built-in HTML5 validation for `required`, `type="email"`, `type="tel"`, etc.

- timestamp: 2026-03-21T00:00:00Z
  checked: SampleRequestForm.tsx lines 18-22
  found: |
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Sample request:", form); // Phase 5: Resend + WhatsApp
      setSubmitted(true);
    };
  implication: Handler calls e.preventDefault() then unconditionally sets submitted=true with no field checks. No validation of form.name, form.address, or form.phone whatsoever.

- timestamp: 2026-03-21T00:00:00Z
  checked: SampleRequestForm.tsx lines 64-73, 84-93, 104-113
  found: name, address, phone inputs each have `required` attribute
  implication: The `required` attributes are present in the HTML but are completely inert because `noValidate` suppresses the browser from acting on them. They are decorative only.

- timestamp: 2026-03-21T00:00:00Z
  checked: Entire component
  found: No `errors` state, no validation function, no error message JSX anywhere in the component
  implication: There is no infrastructure at all for displaying field-level errors to the user.

## Resolution

root_cause: |
  Two compounding issues in SampleRequestForm.tsx:
  1. `noValidate` on line 55 disables all browser HTML5 constraint validation, making the `required` attributes on name/address/phone inputs inert.
  2. `handleSubmit` (lines 18-22) contains zero validation logic — it unconditionally calls `setSubmitted(true)` after preventing default, bypassing any possible checks.

fix: |
  (Not applied — diagnose-only mode)
  Must:
  1. Add an `errors` state object tracking per-field error strings
  2. In handleSubmit, validate form.name.trim(), form.address.trim(), form.phone.trim() before calling setSubmitted(true); return early if any are empty
  3. Render error messages beneath each required input
  4. Either remove `noValidate` (restore browser validation) OR keep it and rely entirely on the JS validation added above

files_changed: []
