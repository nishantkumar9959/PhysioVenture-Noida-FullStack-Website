export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    const isAdmin = await verifyAdmin(authHeader);
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access. Session expired or insufficient privileges." },
        { status: 401 }
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server misconfiguration. Environment variables are missing." },
        { status: 500 }
      );
    }

    const headers = {
      "apikey": supabaseServiceKey,
      "Authorization": `Bearer ${supabaseServiceKey}`,
      "Content-Type": "application/json",
    };

    // Fetch bookings and inquiries concurrently
    const [bookingsRes, inquiriesRes] = await Promise.all([
      fetch(`${supabaseUrl}/rest/v1/appointment_requests?select=id,patient_name,phone,email,service_id,preferred_date,preferred_time_slot,additional_notes,status,created_at,updated_at&order=created_at.desc`, {
        headers,
      }),
      fetch(`${supabaseUrl}/rest/v1/contact_inquiries?select=id,name,email,phone,message,status,created_at&order=created_at.desc`, {
        headers,
      })
    ]);

    if (!bookingsRes.ok) {
      const errText = await bookingsRes.text();
      console.error("Failed to fetch appointment_requests from Supabase:", errText);
      return NextResponse.json(
        { error: "Failed to fetch appointment requests." },
        { status: 500 }
      );
    }

    if (!inquiriesRes.ok) {
      const errText = await inquiriesRes.text();
      console.error("Failed to fetch contact_inquiries from Supabase:", errText);
      return NextResponse.json(
        { error: "Failed to fetch contact inquiries." },
        { status: 500 }
      );
    }

    const [appointments, inquiries] = await Promise.all([
      bookingsRes.json(),
      inquiriesRes.json()
    ]);

    return NextResponse.json(
      {
        success: true,
        appointments,
        inquiries,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Internal server error in get-bookings:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
