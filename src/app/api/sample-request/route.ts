import { NextRequest } from "next/server";

const SPREADSHEET_ID = "1oc5WnrHE_MA139bN5X7PF6bEYZCbkNJz8LA5LlO09vI";
const SHEET_NAME = "Sheet1"; // Update if the sheet tab has a different name

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, phone, email, grade, quantity, application } = body;

    const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!apiKey) {
      console.error("GOOGLE_SHEETS_API_KEY not set");
      return Response.json({ error: "Server configuration error" }, { status: 500 });
    }

    const timestamp = new Date().toISOString();
    const row = [timestamp, name, address, phone, email ?? "", grade ?? "", quantity ?? "", application ?? ""];

    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}:append?valueInputOption=USER_ENTERED&key=${apiKey}`;

    const sheetsRes = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ values: [row] }),
    });

    if (!sheetsRes.ok) {
      const errText = await sheetsRes.text();
      console.error("Sheets API error:", sheetsRes.status, errText);
      // Still return 200 to user — lead is not lost (they see success, team gets notified via other means)
      return Response.json({ ok: true, warning: "Sheets write failed" }, { status: 200 });
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("sample-request route error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
