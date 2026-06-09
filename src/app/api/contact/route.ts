export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/verifyTurnstile";
import { contactSchema } from "@/lib/validation";

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
    
    // Parse with Zod
    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Invalid input data." },
        { status: 400, headers: corsHeaders }
      );
    }

    const {
      name,
      email,
      phone,
      message,
      turnstileToken
    } = parseResult.data;

    // Validate token
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
      name,
      email,
      phone: phone || null,
      message,
    };

    const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/contact_inquiries`, {
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
        { error: "Failed to store contact inquiry in database." },
        { status: 500, headers: corsHeaders }
      );
    }

    const responseData = await supabaseResponse.json();

    return NextResponse.json(
      {
        success: true,
        message: "Contact inquiry recorded successfully.",
        data: responseData
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error("Internal server error in contact:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
