export async function onRequestGet(context) {
  try {
    const { env } = context;
    const supabaseUrl = env.SUPABASE_URL;
    const supabaseServiceKey = env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: "Server misconfiguration. Environment variables are missing." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const headers = {
      "apikey": supabaseServiceKey,
      "Authorization": `Bearer ${supabaseServiceKey}`,
      "Content-Type": "application/json",
    };

    // Fetch bookings and inquiries concurrently
    const [bookingsRes, inquiriesRes] = await Promise.all([
      fetch(`${supabaseUrl}/rest/v1/appointment_requests?select=id,patient_name,phone,email,service_id,preferred_date,preferred_time_slot,additional_notes,status,created_at,updated_at&order=created_at.desc`, {
        headers,
      }),
      fetch(`${supabaseUrl}/rest/v1/contact_inquiries?select=id,name,email,phone,message,status,created_at&order=created_at.desc`, {
        headers,
      })
    ]);

    if (!bookingsRes.ok) {
      const errText = await bookingsRes.text();
      console.error("Failed to fetch appointment_requests from Supabase:", errText);
      return new Response(
        JSON.stringify({ error: "Failed to fetch appointment requests." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!inquiriesRes.ok) {
      const errText = await inquiriesRes.text();
      console.error("Failed to fetch contact_inquiries from Supabase:", errText);
      return new Response(
        JSON.stringify({ error: "Failed to fetch contact inquiries." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const [appointments, inquiries] = await Promise.all([
      bookingsRes.json(),
      inquiriesRes.json()
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        appointments,
        inquiries,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Internal server error in get-bookings:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
