export async function onRequest(context) {
  const { request, next, env } = context;

  // Bypass auth for preflight OPTIONS requests
  if (request.method === "OPTIONS") {
    return await next();
  }

  const supabaseUrl = env.SUPABASE_URL;
  const supabaseServiceKey = env.SUPABASE_SECRET_KEY;
  const supabasePublishableKey = env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey || !supabasePublishableKey) {
    console.error("Supabase environment variables are missing.");
    return new Response(
      JSON.stringify({ error: "Server misconfiguration. API keys are missing." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const authorization = request.headers.get("Authorization");
  if (authorization) {
    const parts = authorization.split(" ");
    if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
      const token = parts[1];
      try {
        // 1. Verify token with Supabase Auth API
        const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
          method: "GET",
          headers: {
            "apikey": supabasePublishableKey,
            "Authorization": `Bearer ${token}`
          }
        });

        if (userResponse.ok) {
          const user = await userResponse.json();

          if (user && user.id) {
            // 2. Query admin_users table using service key to check if user has privileges
            const adminQueryUrl = `${supabaseUrl}/rest/v1/admin_users?id=eq.${user.id}`;
            const adminResponse = await fetch(adminQueryUrl, {
              method: "GET",
              headers: {
                "apikey": supabaseServiceKey,
                "Authorization": `Bearer ${supabaseServiceKey}`
              }
            });

            if (adminResponse.ok) {
              const adminData = await adminResponse.json();
              
              if (Array.isArray(adminData) && adminData.length > 0) {
                const adminRole = adminData[0].role;
                if (adminRole === "super_admin" || adminRole === "admin") {
                  return await next();
                }
              }
            }
          }
        }
      } catch (e) {
        console.error("Token verification failed with error:", e);
      }
    }
  }

  return new Response(
    JSON.stringify({ error: "Unauthorized access. Session expired or insufficient privileges." }),
    {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
