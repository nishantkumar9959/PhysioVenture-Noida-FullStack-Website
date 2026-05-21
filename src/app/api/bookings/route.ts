import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { appointmentSchema } from "@/lib/validation";

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

    const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder.supabase.co");

    if (isPlaceholder) {
      console.log("[Demo Mode] Booking received successfully:", result.data);
      return NextResponse.json(
        { 
          success: true, 
          message: "Appointment request recorded (Demo Mode - Local fallback)", 
          data: [{ id: "demo-id-" + Date.now(), ...result.data }] 
        },
        { status: 201 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("appointments")
      .insert([result.data])
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
  } catch (err: any) {
    console.error("Internal Server Error in booking API:", err);
    return NextResponse.json(
      { error: "Internal server error", message: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
