---
status: resolved
trigger: "The /sample-request form submits without enforcing required fields (Name, Address, Phone)."
created: 2026-03-21T00:00:00Z
updated: 2026-03-22T00:00:00Z
---

## Current Focus

hypothesis: RESOLVED — all forms have JS validation with errors state, trim() checks, and inline error messages
test: n/a
expecting: n/a
next_action: archive session

## Symptoms

expected: Submitting without Name, Address, or Phone shows validation errors and prevents submission
actual: Form submits successfully even when required fields are empty
errors: none (silent submission)
reproduction: Navigate to /sample-request, leave Name/Address/Phone blank, click "Send Sample Request"
started: unknown / likely from initial build

## Eliminated

- hypothesis: none — root cause confirmed on first read
  evidence: n/a
  timestamp: 2026-03-21T00:00:00Z

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

- timestamp: 2026-03-22T00:00:00Z
  checked: All four form components (SampleRequestForm, ContactForm, TDSGate, PickupForm)
  found: SampleRequestForm, TDSGate, PickupForm already fully fixed prior to this session. ContactForm had errors state and name/email validation but was missing message validation.
  implication: One gap remained — ContactForm did not validate the message field despite it being required per spec.

- timestamp: 2026-03-22T00:00:00Z
  checked: ContactForm.tsx after fix
  found: errors type extended to include message?, validation added `if (!form.message.trim()) newErrors.message = "Message is required"`, error message JSX added under textarea, label updated to MESSAGE *
  implication: All four forms now enforce required fields consistently via JS validation with inline error messages.

## Resolution

root_cause: |
  Two compounding issues in SampleRequestForm.tsx (original):
  1. `noValidate` on the <form> element disabled all browser HTML5 constraint validation, making the `required` attributes on name/address/phone inputs inert.
  2. `handleSubmit` contained zero validation logic — it unconditionally called `setSubmitted(true)` after preventing default, bypassing any possible checks.

  Extended audit revealed ContactForm also missing message field validation (name and email were validated; message was not).

fix: |
  SampleRequestForm.tsx:
  - Added `errors` state: `useState<{ name?: string; address?: string; phone?: string }>({})`
  - handleSubmit validates name/address/phone with .trim() checks, calls setErrors and returns early if any fail
  - Inline error messages rendered under each required input with `mt-1 text-xs text-red-400`
  - noValidate retained (JS validation is the canonical pattern)

  ContactForm.tsx:
  - Extended errors type to include `message?: string`
  - Added `if (!form.message.trim()) newErrors.message = "Message is required"` in handleSubmit
  - Added error message JSX under the message textarea
  - Updated MESSAGE label to MESSAGE * to indicate required status

  TDSGate.tsx: Already correct — errors state, name/phone validation, inline messages all present.
  PickupForm.tsx: Already correct — errors state, business/phone validation, inline messages all present.

verification: |
  All four forms verified by reading complete component files:
  - errors state object present in each
  - handleSubmit performs .trim() checks on all required fields before calling setSubmitted
  - Returns early with setErrors when any required field fails
  - Inline error messages render with mt-1 text-xs text-red-400 under each validated field
  - noValidate kept on all forms (consistent with codebase pattern)

files_changed:
  - src/components/ui/ContactForm.tsx
