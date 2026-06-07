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

    if (!turnstileSecret || !supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: "Server misconfiguration. Environment variables are missing." }),
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
    const {
      name,
      phone,
      symptom_details,
      source_service,
      turnstileToken
    } = body;

    // Validate token
    const clientIp = request.headers.get("CF-Connecting-IP") || "";
    const isTokenValid = await verifyTurnstile(turnstileToken, turnstileSecret, clientIp);
    if (!isTokenValid) {
      return new Response(
        JSON.stringify({ error: "Security check failed. Please refresh the page and try again." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Basic server-side validations
    if (!name || !phone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Insert into Supabase
    const dbData = {
      name,
      phone,
      symptom_details: symptom_details || null,
      source_service: source_service || null,
      status: "pending",
    };

    const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/patient_enquiries`, {
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
      return new Response(
        JSON.stringify({ error: "Failed to store patient enquiry in database." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const responseData = await supabaseResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Patient enquiry recorded successfully.",
        data: responseData
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (err) {
    console.error("Internal server error in enquiries:", err);
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
