# Google Sheets Integration Setup

**When to do this:** End of Phase 4, before executing plan `03-05-PLAN.md`

**Spreadsheet:** https://docs.google.com/spreadsheets/d/1oc5WnrHE_MA139bN5X7PF6bEYZCbkNJz8LA5LlO09vI/

---

## Step 1 — Google Cloud Setup

1. Go to https://console.cloud.google.com/
2. Create a project (or select an existing one)
3. Enable the Google Sheets API:
   - APIs & Services → Library → search "Google Sheets API" → Enable

## Step 2 — Create API Key

1. APIs & Services → Credentials → Create Credentials → API Key
2. (Recommended) Restrict the key: API restrictions → Google Sheets API only
3. Copy the key — you'll need it in Step 4

## Step 3 — Share the Spreadsheet

1. Open the spreadsheet
2. Click **Share** (top right)
3. Set to **"Anyone with the link" → Editor**
   - This allows the API key to append rows

## Step 4 — Create `.env.local`

In the project root (`/Users/abindal/dev/SantoshWebsite/`), create a file named `.env.local`:

```
GOOGLE_SHEETS_API_KEY=your_key_here
```

> `.env.local` is already in `.gitignore` — it will not be committed.

## Step 5 — Add Header Row to Sheet

If the spreadsheet is empty, manually add this row in **Row 1**:

| Timestamp | Name | Address | Phone | Email | Grade | Quantity | Application |
|-----------|------|---------|-------|-------|-------|----------|-------------|

## Step 6 — Execute the Plan

Once the above is done, run:

```
/gsd:execute-phase 03-products-process
```

The executor will detect plan `03-05` has no summary and run it. Type `"ready"` at the checkpoint prompt.

---

## What the integration does

- Every `/sample-request` form submission POSTs to `/api/sample-request`
- The API route appends a row to the sheet: Timestamp, Name, Address, Phone, Email, Grade, Quantity, Application
- If the Sheets write fails (e.g. wrong API key), the user still sees the success confirmation — failure is logged server-side only
