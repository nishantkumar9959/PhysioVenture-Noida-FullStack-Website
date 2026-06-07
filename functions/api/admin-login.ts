function getCorsHeaders(request: Request) {
  const origin = request.headers.get("Origin") || "";
  const allowedOrigins = [
    "https://physioventure.in",
    "http://localhost:3000",
    "http://localhost:8788",
  ];
  const isAllowed = allowedOrigins.includes(origin) || origin.endsWith(".pages.dev");
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "https://physioventure.in",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
  };
}

async function verifyTurnstile(token: string, secretKey: string, ip: string) {
  if (!token) return false;
  try {
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
    const outcome: any = await result.json();
    return outcome.success === true;
  } catch (e) {
    console.error("Turnstile verification failed:", e);
    return false;
  }
}

export async function onRequestOptions(context: { request: Request }) {
  return new Response(null, { status: 204, headers: getCorsHeaders(context.request) });
}

export async function onRequestPost(context: { request: Request; env: any }) {
  const corsHeaders = getCorsHeaders(context.request);
  try {
    const { env, request } = context;
    const turnstileSecret = env.CF_TURNSTILE_SECRET_KEY;
    const supabaseUrl = env.SUPABASE_URL;
    const supabaseServiceKey = env.SUPABASE_SECRET_KEY;
    const supabasePublishableKey = env.SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_SECRET_KEY;

    if (!turnstileSecret || !supabaseUrl || !supabaseServiceKey || !supabasePublishableKey) {
      return new Response(
        JSON.stringify({ error: "Server misconfiguration. Environment variables (SUPABASE_URL, SUPABASE_SECRET_KEY, or CF_TURNSTILE_SECRET_KEY) are missing." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const contentType = request.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({ error: "Content-Type must be application/json" }),
        { status: 415, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const body = await request.json();
    const { email, password, turnstileToken } = body;

    // Validate turnstile token
    const clientIp = request.headers.get("CF-Connecting-IP") || "";
    const isTokenValid = await verifyTurnstile(turnstileToken, turnstileSecret, clientIp);
    if (!isTokenValid) {
      return new Response(
        JSON.stringify({ error: "Security check failed. Please refresh the page and try again." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email/password presence
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
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
      return new Response(
        JSON.stringify({ error: "Invalid email or password." }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const authData: any = await authResponse.json();
    const { access_token, refresh_token, expires_in, user } = authData;

    if (!user || !user.id) {
      return new Response(
        JSON.stringify({ error: "Invalid response from authorization server." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
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

      return new Response(
        JSON.stringify({ error: "Access denied. Failed to check privileges." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
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

      return new Response(
        JSON.stringify({ error: "Access denied. You do not have administrator privileges." }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Return the session tokens
    return new Response(
      JSON.stringify({
        success: true,
        access_token,
        refresh_token,
        expires_in,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (err) {
    console.error("Internal server error in admin-login:", err);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
}
