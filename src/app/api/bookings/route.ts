import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { appointmentSchema } from "@/lib/validation";
import { sendEmail } from "@/lib/mail";

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  if (!secret || secret === "PLACEHOLDER_SECRET_KEY" || secret === "") {
    console.warn("Turnstile secret key is not set. Skipping verification.");
    return true;
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: secret,
        response: token,
      }),
    });
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validate request body against Zod schema
    const validationResult = appointmentSchema.safeParse(body);
    if (!validationResult.success) {
      return Response.json(
        { message: "Validation failed: " + validationResult.error.errors.map(e => e.message).join(", ") },
        { status: 400 }
      );
    }

    const { turnstileToken, ...rawData } = validationResult.data;

    // 2. Verify Cloudflare Turnstile token
    const isSecurityValid = await verifyTurnstile(turnstileToken);
    if (!isSecurityValid) {
      return Response.json(
        { message: "Security verification failed. Please try again." },
        { status: 400 }
      );
    }

    // 3. Prepare data for Supabase insert (handling empty string to null normalization)
    const dbData = {
      patient_name: rawData.patient_name,
      phone: rawData.phone,
      email: rawData.email || null,
      service_id: rawData.service_id,
      preferred_date: rawData.preferred_date,
      preferred_time_slot: rawData.preferred_time_slot,
      additional_notes: rawData.additional_notes || null,
      status: "pending",
    };

    // 4. Insert data into Supabase
    const { error } = await supabase
      .from("appointment_requests")
      .insert([dbData]);

    if (error) {
      console.error("Supabase Database error:", error);
      return Response.json(
        { message: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    // 5. Send notification email via Resend
    const subject = `[PhysioVenture] New Appointment Request - ${dbData.patient_name}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #0f3d30; border-bottom: 2px solid #38b293; padding-bottom: 10px; margin-top: 0;">New Appointment Request</h2>
        <p>A new appointment has been scheduled through the website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eeeeee; font-weight: bold; width: 35%;">Patient Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eeeeee;">${dbData.patient_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eeeeee; font-weight: bold;">Phone Number:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eeeeee;"><a href="tel:${dbData.phone}">${dbData.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eeeeee; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eeeeee;">${dbData.email ? `<a href="mailto:${dbData.email}">${dbData.email}</a>` : "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eeeeee; font-weight: bold;">Required Treatment:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eeeeee; text-transform: capitalize;">${dbData.service_id.replace(/-/g, " ")}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eeeeee; font-weight: bold;">Preferred Date:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eeeeee;">${dbData.preferred_date}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eeeeee; font-weight: bold;">Time of Day:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eeeeee; text-transform: capitalize;">${dbData.preferred_time_slot}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eeeeee; font-weight: bold; vertical-align: top;">Symptoms / Notes:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eeeeee; white-space: pre-wrap;">${dbData.additional_notes || "None"}</td>
          </tr>
        </table>
        
        <p style="font-size: 12px; color: #888888; margin-top: 30px;">
          Submitted at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} (IST)
        </p>
      </div>
    `;
    const text = `
      New Appointment Request:
      -----------------------
      Patient Name: ${dbData.patient_name}
      Phone Number: ${dbData.phone}
      Email: ${dbData.email || "Not provided"}
      Treatment: ${dbData.service_id.replace(/-/g, " ")}
      Preferred Date: ${dbData.preferred_date}
      Preferred Time Slot: ${dbData.preferred_time_slot}
      Symptoms/Notes: ${dbData.additional_notes || "None"}
    `;

    // Fire-and-forget or await email delivery. We await to ensure we catch errors.
    await sendEmail({ subject, html, text });

    return Response.json(
      { message: "Appointment request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error in /api/bookings:", error);
    return Response.json(
      { message: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
