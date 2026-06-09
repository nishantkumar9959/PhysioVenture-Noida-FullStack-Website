export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/verifyTurnstile";
import { appointmentSchema } from "@/lib/validation";

function getCorsHeaders(request: NextRequest) {
  const origin = request.headers.get("Origin") || "";
  const allowedOrigins = [
    "https://physioventure.in",
    "http://localhost:3000",
    "http://localhost:8788",
  ];
  const isAllowed = allowedOrigins.includes(origin) || 
    (origin.endsWith(".pages.dev") && (origin.includes("physioventure") || origin.includes("pventure")));
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "https://physioventure.in",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
  };
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(request) });
}

export async function POST(request: NextRequest) {
  const corsHeaders = getCorsHeaders(request);
  try {
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY || process.env.CF_TURNSTILE_SECRET_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY;

    if (!turnstileSecret || !supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server misconfiguration. Environment variables are missing." },
        { status: 500, headers: corsHeaders }
      );
    }

    const contentType = request.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 415, headers: corsHeaders }
      );
    }

    const body = await request.json();
    
    // Parse using Zod schema
    const parseResult = appointmentSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Invalid input data." },
        { status: 400, headers: corsHeaders }
      );
    }

    const {
      patient_name,
      phone,
      email,
      service_id,
      preferred_date,
      preferred_time_slot,
      additional_notes,
      turnstileToken
    } = parseResult.data;

    // Validate turnstile token
    const clientIp = request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for") || "";
    const isTokenValid = await verifyTurnstile(turnstileToken, turnstileSecret, clientIp);
    if (!isTokenValid) {
      return NextResponse.json(
        { error: "Security check failed. Please refresh the page and try again." },
        { status: 400, headers: corsHeaders }
      );
    }

    // Insert into Supabase
    const dbData = {
      patient_name,
      phone,
      email: email || null,
      service_id,
      preferred_date,
      preferred_time_slot,
      additional_notes: additional_notes || null,
      status: "pending",
    };

    const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/appointment_requests`, {
      method: "POST",
      headers: {
        "apikey": supabaseServiceKey,
        "Authorization": `Bearer ${supabaseServiceKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify(dbData)
    });

    if (!supabaseResponse.ok) {
      const dbErrorText = await supabaseResponse.text();
      console.error("Supabase insert error:", dbErrorText);
      return NextResponse.json(
        { error: "Failed to store appointment request in database." },
        { status: 500, headers: corsHeaders }
      );
    }

    const responseData = await supabaseResponse.json();

    return NextResponse.json(
      {
        success: true,
        message: "Appointment request recorded successfully.",
        data: responseData
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error("Internal server error in bookings:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
