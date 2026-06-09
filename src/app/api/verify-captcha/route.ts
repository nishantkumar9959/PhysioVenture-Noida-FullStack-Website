export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      console.error("TURNSTILE_SECRET_KEY is missing from environment variables.");
      return NextResponse.json(
        { error: "Server misconfiguration. Turnstile secret key is missing." },
        { status: 500 }
      );
    }

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required." },
        { status: 400 }
      );
    }

    const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for") || "";

    const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: ip || undefined,
      }),
    });

    const outcome = await result.json() as any;
    if (outcome.success === true) {
      return NextResponse.json({ success: true });
    } else {
      console.warn("Turnstile validation failed:", outcome["error-codes"]);
      return NextResponse.json(
        { error: "Security check failed. Please refresh the page and try again." },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Error in verify-captcha API:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
