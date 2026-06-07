export async function onRequest(context) {
  const { request, next, env } = context;

  // Bypass auth for preflight OPTIONS requests
  if (request.method === "OPTIONS") {
    return await next();
  }

  const adminUser = env.ADMIN_USERNAME;
  const adminPass = env.ADMIN_PASSWORD;

  if (!adminUser || !adminPass) {
    console.error("ADMIN_USERNAME or ADMIN_PASSWORD env variables are missing.");
    return new Response(
      JSON.stringify({ error: "Server misconfiguration. Admin credentials not set." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const authorization = request.headers.get("Authorization");
  if (authorization) {
    const parts = authorization.split(" ");
    if (parts.length === 2 && parts[0].toLowerCase() === "basic") {
      try {
        const decoded = atob(parts[1]);
        const index = decoded.indexOf(":");
        if (index !== -1) {
          const username = decoded.slice(0, index);
          const password = decoded.slice(index + 1);

          if (username === adminUser && password === adminPass) {
            return await next();
          }
        }
      } catch (e) {
        console.error("Failed to decode authorization header:", e);
      }
    }
  }

  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Dashboard"',
    },
  });
}
