import { NextRequest } from "next/server";
import { GoogleAuth } from "google-auth-library";
import { Resend } from "resend";

const SPREADSHEET_ID = "1oc5WnrHE_MA139bN5X7PF6bEYZCbkNJz8LA5LlO09vI";
const SHEET_NAME = "Sample Request";
const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Resend enquiry notification (D-14, D-15: additive, graceful degradation)
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL ?? "TODO@placeholder.com",
        to: [process.env.NOTIFY_EMAIL_PRIMARY!, process.env.NOTIFY_EMAIL_CC!].filter(Boolean),
        subject: `New enquiry from ${name} — Santosh website`,
        text: `New sample request received:\n\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nEmail: ${email ?? "Not provided"}\nGrade: ${grade ?? "Not specified"}\nQuantity: ${quantity ?? "Not specified"}\nApplication: ${application ?? "Not specified"}\n\nSubmitted: ${timestamp}`,
      });
    } catch (resendErr) {
      console.error("Resend notification failed:", resendErr);
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("sample-request route error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
