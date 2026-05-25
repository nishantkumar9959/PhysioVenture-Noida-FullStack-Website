import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { appointmentSchema } from "@/lib/validation";
import { verifyTurnstileToken } from "@/app/actions/turnstile";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate inputs
    const result = appointmentSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    // Verify Cloudflare Turnstile token
    const turnstileResult = await verifyTurnstileToken(result.data.turnstileToken);
    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: "Security check failed", message: turnstileResult.error },
        { status: 400 }
      );
    }

    const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder.supabase.co");

    // Remove turnstileToken from schema data before database insertion
    const dbData = { ...result.data };
    delete (dbData as { turnstileToken?: string }).turnstileToken;

    if (isPlaceholder) {
      console.log("[Demo Mode] Booking received successfully:", dbData);
      return NextResponse.json(
        { 
          success: true, 
          message: "Appointment request recorded (Demo Mode - Local fallback)", 
          data: [{ id: "demo-id-" + Date.now(), ...dbData }] 
        },
        { status: 201 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("appointments")
      .insert([dbData])
      .select();

    if (error) {
      console.error("Supabase Error on booking insert:", error);
      return NextResponse.json(
        { error: "Database write failed", message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Appointment request recorded", data },
      { status: 201 }
    );
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error("Internal Server Error in booking API:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
