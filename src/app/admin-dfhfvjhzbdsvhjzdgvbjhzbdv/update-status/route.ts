export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { id, type, status } = body;

    if (!id || !type || !status) {
      return NextResponse.json(
        { error: "Missing required fields: id, type, and status are required." },
        { status: 400 }
      );
    }

    const TABLE_MAP: Record<string, string> = {
      appointment: "appointment_requests",
      inquiry: "contact_inquiries",
    };

    const tableName = TABLE_MAP[type];
    if (!tableName) {
      return NextResponse.json(
        { error: "Invalid type. Must be 'appointment' or 'inquiry'." },
        { status: 400 }
      );
    }

    const targetUrl = `${supabaseUrl}/rest/v1/${tableName}?id=eq.${id}`;

    const supabaseResponse = await fetch(targetUrl, {
      method: "PATCH",
      headers: {
        "apikey": supabaseServiceKey,
        "Authorization": `Bearer ${supabaseServiceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!supabaseResponse.ok) {
      const errText = await supabaseResponse.text();
      console.error(`Failed to update status in Supabase table ${tableName}:`, errText);
      return NextResponse.json(
        { error: "Failed to update record in database." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Status updated successfully.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Internal server error in update-status:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
