export async function onRequestPost(context) {
  try {
    const { env, request } = context;
    const supabaseUrl = env.SUPABASE_URL;
    const supabaseServiceKey = env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: "Server misconfiguration. Environment variables are missing." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json();
    const { id, type, status } = body;

    if (!id || !type || !status) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: id, type, and status are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const TABLE_MAP = {
      appointment: "appointment_requests",
      inquiry: "contact_inquiries",
    };

    const tableName = TABLE_MAP[type];
    if (!tableName) {
      return new Response(
        JSON.stringify({ error: "Invalid type. Must be 'appointment' or 'inquiry'." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const targetUrl = `${supabaseUrl}/rest/v1/${tableName}?id=eq.${id}`;

    const supabaseResponse = await fetch(targetUrl, {
      method: "PATCH",
      headers: {
        "apikey": supabaseServiceKey,
        "Authorization": `Bearer ${supabaseServiceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!supabaseResponse.ok) {
      const errText = await supabaseResponse.text();
      console.error(`Failed to update status in Supabase table ${tableName}:`, errText);
      return new Response(
        JSON.stringify({ error: "Failed to update record in database." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Status updated successfully.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Internal server error in update-status:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
