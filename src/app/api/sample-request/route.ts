import { NextRequest } from "next/server";
import { GoogleAuth } from "google-auth-library";

const SPREADSHEET_ID = "1oc5WnrHE_MA139bN5X7PF6bEYZCbkNJz8LA5LlO09vI";
const SHEET_NAME = "Sample Request";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, phone, email, grade, quantity, application } = body;

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!clientEmail || !privateKey) {
      console.error("Google service account credentials not set");
      return Response.json({ error: "Server configuration error" }, { status: 500 });
    }

    const auth = new GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();
    const token = await client.getAccessToken();

    const timestamp = new Date().toISOString();
    const row = [timestamp, name, address, phone, email ?? "", grade ?? "", quantity ?? "", application ?? ""];

    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(SHEET_NAME)}:append?valueInputOption=USER_ENTERED`;

    const sheetsRes = await fetch(sheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify({ values: [row] }),
    });

    if (!sheetsRes.ok) {
      const errText = await sheetsRes.text();
      console.error("Sheets API error:", sheetsRes.status, errText);
      return Response.json({ ok: true, warning: "Sheets write failed" }, { status: 200 });
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("sample-request route error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
