// Server-side validation helpers for Cloudflare Pages Functions

const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitizeString(val: string): string {
  return val
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

export function normalizePhone(val: string): string {
  return val.replace(/[^\d+]/g, "");
}

export interface BookingInput {
  patient_name: string;
  phone: string;
  email?: string;
  service_id: string;
  preferred_date: string;
  preferred_time_slot: string;
  additional_notes?: string;
}

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface EnquiryInput {
  name: string;
  phone: string;
  symptom_details?: string;
  source_service?: string;
}

export function validateBooking(data: Partial<BookingInput>): { error?: string; data?: BookingInput } {
  const patient_name = sanitizeString(data.patient_name || "");
  const phone = normalizePhone(data.phone || "");
  const email = data.email ? data.email.trim().toLowerCase() : "";
  const service_id = sanitizeString(data.service_id || "");
  const preferred_date = data.preferred_date || "";
  const preferred_time_slot = data.preferred_time_slot || "";
  const additional_notes = data.additional_notes ? sanitizeString(data.additional_notes) : "";

  if (patient_name.length < 2 || patient_name.length > 50) {
    return { error: "Name must be between 2 and 50 characters." };
  }

  if (!phoneRegex.test(phone)) {
    return { error: "Please enter a valid 10-digit Indian phone number." };
  }

  if (email && (!emailRegex.test(email) || email.length > 100)) {
    return { error: "Please enter a valid email address." };
  }

  if (service_id.length < 1 || service_id.length > 100) {
    return { error: "Invalid service selection." };
  }

  if (!preferred_date) {
    return { error: "Preferred date is required." };
  }

  // Validate date is not in the past (Asia/Kolkata timezone safe comparison)
  try {
    const selectedDate = new Date(`${preferred_date}T00:00:00Z`);
    if (isNaN(selectedDate.getTime())) {
      return { error: "Invalid preferred date." };
    }
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    const parts = formatter.formatToParts(new Date());
    const year = parts.find(p => p.type === 'year')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const day = parts.find(p => p.type === 'day')?.value;
    const clinicToday = new Date(`${year}-${month}-${day}T00:00:00Z`);

    if (selectedDate < clinicToday) {
      return { error: "Preferred date cannot be in the past." };
    }
  } catch {
    return { error: "Failed to validate preferred date." };
  }

  if (!["morning", "afternoon", "evening"].includes(preferred_time_slot)) {
    return { error: "Please select a preferred time slot." };
  }

  if (additional_notes.length > 500) {
    return { error: "Additional notes cannot exceed 500 characters." };
  }

  return {
    data: {
      patient_name,
      phone,
      email: email || undefined,
      service_id,
      preferred_date,
      preferred_time_slot,
      additional_notes: additional_notes || undefined
    }
  };
}

export function validateContact(data: Partial<ContactInput>): { error?: string; data?: ContactInput } {
  const name = sanitizeString(data.name || "");
  const email = (data.email || "").trim().toLowerCase();
  const phone = data.phone ? normalizePhone(data.phone) : "";
  const message = sanitizeString(data.message || "");

  if (name.length < 2 || name.length > 50) {
    return { error: "Name must be between 2 and 50 characters." };
  }

  if (!emailRegex.test(email) || email.length > 100) {
    return { error: "Please enter a valid email address." };
  }

  if (phone && !phoneRegex.test(phone)) {
    return { error: "Please enter a valid 10-digit Indian phone number." };
  }

  if (message.length < 10 || message.length > 1000) {
    return { error: "Message must be between 10 and 1000 characters." };
  }

  return {
    data: {
      name,
      email,
      phone: phone || undefined,
      message
    }
  };
}

export function validateEnquiry(data: Partial<EnquiryInput>): { error?: string; data?: EnquiryInput } {
  const name = sanitizeString(data.name || "");
  const phone = normalizePhone(data.phone || "");
  const symptom_details = data.symptom_details ? sanitizeString(data.symptom_details) : "";
  const source_service = data.source_service ? sanitizeString(data.source_service) : "";

  if (name.length < 2 || name.length > 50) {
    return { error: "Name must be between 2 and 50 characters." };
  }

  if (!phoneRegex.test(phone)) {
    return { error: "Please enter a valid 10-digit Indian phone number." };
  }

  if (symptom_details.length > 500) {
    return { error: "Symptom details cannot exceed 500 characters." };
  }

  if (source_service.length > 100) {
    return { error: "Source service cannot exceed 100 characters." };
  }

  return {
    data: {
      name,
      phone,
      symptom_details: symptom_details || undefined,
      source_service: source_service || undefined
    }
  };
}
