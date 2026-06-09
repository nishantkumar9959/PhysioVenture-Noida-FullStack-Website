export async function verifyAdmin(authorizationHeader: string | null): Promise<boolean> {
  if (!authorizationHeader) return false;
  
  const parts = authorizationHeader.split(" ");
  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    return false;
  }
  
  const token = parts[1];
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY;
  const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_SECRET_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey || !supabasePublishableKey) {
    console.error("Missing environment variables in verifyAdmin");
    return false;
  }
  
  try {
    // 1. Verify token with Supabase Auth API
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      method: "GET",
      headers: {
        "apikey": supabasePublishableKey,
        "Authorization": `Bearer ${token}`
      }
    });
    
    if (!userResponse.ok) return false;
    
    const user = await userResponse.json() as any;
    if (!user || !user.id) return false;
    
    // 2. Query admin_users table using service key to check if user has privileges
    const adminQueryUrl = `${supabaseUrl}/rest/v1/admin_users?id=eq.${user.id}`;
    const adminResponse = await fetch(adminQueryUrl, {
      method: "GET",
      headers: {
        "apikey": supabaseServiceKey,
        "Authorization": `Bearer ${supabaseServiceKey}`
      }
    });
    
    if (!adminResponse.ok) return false;
    
    const adminData = await adminResponse.json() as any;
    if (Array.isArray(adminData) && adminData.length > 0) {
      const adminRole = adminData[0].role;
      if (adminRole === "super_admin" || adminRole === "admin") {
        return true;
      }
    }
  } catch (e) {
    console.error("verifyAdmin check failed with error:", e);
  }
  
  return false;
}
