"use server";

/**
 * Server Action to verify a Cloudflare Turnstile token.
 * Validates the token against the official Cloudflare siteverify endpoint.
 * Handles placeholder keys in development/demo environments gracefully.
 */
export async function verifyTurnstileToken(token: string): Promise<{ success: boolean; error?: string }> {
  if (!token) {
    return { success: false, error: "Security check token is required." };
  }

  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  
  if (!secretKey) {
    console.warn("CLOUDFLARE_TURNSTILE_SECRET_KEY is not defined. Defaulting to true in development/demo mode.");
    const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder.supabase.co");
    if (process.env.NODE_ENV === "development" || isDemoMode) {
      return { success: true };
    }
    return { success: false, error: "Server misconfiguration: Security secret key is missing." };
  }

  // Graceful fallback for local development or demo environments
  if (secretKey === "PLACEHOLDER_SECRET_KEY") {
    console.log("[Demo Mode] Bypassing Turnstile verification since secret key is a placeholder.");
    return { success: true };
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });

    if (!response.ok) {
      throw new Error(`Cloudflare API responded with status ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return { success: true };
    } else {
      console.error("Turnstile verification failed error codes:", data["error-codes"]);
      return { 
        success: false, 
        error: data["error-codes"]?.join(", ") || "Turnstile verification failed. Please try again." 
      };
    }
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error("Turnstile verification network error:", error);
    return { 
      success: false, 
      error: `Security verification network error: ${error.message}` 
    };
  }
}
