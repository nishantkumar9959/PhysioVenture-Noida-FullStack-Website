export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/verifyTurnstile";

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
    const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_SECRET_KEY;

    if (!turnstileSecret || !supabaseUrl || !supabaseServiceKey || !supabasePublishableKey) {
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
    const { email, password, turnstileToken } = body;

    // Validate turnstile token
    const clientIp = request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for") || "";
    const isTokenValid = await verifyTurnstile(turnstileToken, turnstileSecret, clientIp);
    if (!isTokenValid) {
      return NextResponse.json(
        { error: "Security check failed. Please refresh the page and try again." },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate email/password presence
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400, headers: corsHeaders }
      );
    }

    // Call Supabase Auth API
    const authResponse = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        "apikey": supabasePublishableKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    });

    if (!authResponse.ok) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401, headers: corsHeaders }
      );
    }

    const authData: any = await authResponse.json();
    const { access_token, refresh_token, expires_in, user } = authData;

    if (!user || !user.id) {
      return NextResponse.json(
        { error: "Invalid response from authorization server." },
        { status: 500, headers: corsHeaders }
      );
    }

    // Query admin_users to verify user is an admin
    const adminResponse = await fetch(`${supabaseUrl}/rest/v1/admin_users?id=eq.${user.id}`, {
      method: "GET",
      headers: {
        "apikey": supabaseServiceKey,
        "Authorization": `Bearer ${supabaseServiceKey}`,
      }
    });

    if (!adminResponse.ok) {
      // Invalidate the session
      await fetch(`${supabaseUrl}/auth/v1/logout`, {
        method: "POST",
        headers: {
          "apikey": supabasePublishableKey,
          "Authorization": `Bearer ${access_token}`
        }
      });

      return NextResponse.json(
        { error: "Access denied. Failed to check privileges." },
        { status: 500, headers: corsHeaders }
      );
    }

    const adminData: any = await adminResponse.json();

    if (!Array.isArray(adminData) || adminData.length === 0) {
      // User is not in admin_users, log them out immediately to invalidate session
      await fetch(`${supabaseUrl}/auth/v1/logout`, {
        method: "POST",
        headers: {
          "apikey": supabasePublishableKey,
          "Authorization": `Bearer ${access_token}`
        }
      });

      return NextResponse.json(
        { error: "Access denied. You do not have administrator privileges." },
        { status: 403, headers: corsHeaders }
      );
    }

    // Return the session tokens
    return NextResponse.json(
      {
        success: true,
        access_token,
        refresh_token,
        expires_in,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error("Internal server error in admin-login:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
