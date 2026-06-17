import { z } from "zod";

// Phone validation regex for Indian numbers (optional country code +91 or 0, followed by 10 digits starting with 6-9)
const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

/**
 * Sanitizes input string to escape HTML entities and prevent XSS injections.
 * Removes leading and trailing whitespace.
 */
export const sanitizeString = (val: string): string => {
  return val
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
};

/**
 * Normalizes input phone numbers by stripping non-digit and non-plus characters.
 */
export const normalizePhone = (val: string): string => {
  return val.replace(/[^\d+]/g, "");
};

export const appointmentSchema = z.object({
  patient_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .transform(sanitizeString),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? val.trim().toLowerCase() : "")),
  phone: z
    .string()
    .transform(normalizePhone)
    .refine((val) => phoneRegex.test(val), {
      message: "Please enter a valid 10-digit phone number.",
    }),
  service_id: z
    .string({ message: "Please select a service." })
    .min(1, { message: "Invalid service selection." })
    .transform(sanitizeString),
  preferred_date: z
    .string()
    .refine((dateStr) => {
      // Create date strictly at midnight UTC to prevent offset issues
      const selectedDate = new Date(`${dateStr}T00:00:00Z`);
      
      // Calculate today's date in clinic timezone (Asia/Kolkata)
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
      return selectedDate >= clinicToday;
    }, { message: "Preferred date cannot be in the past." }),
  preferred_time_slot: z.enum(["morning", "afternoon", "evening"], {
    message: "Please select a preferred time slot.",
  }),
  additional_notes: z
    .string()
    .max(500)
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeString(val) : "")),
  turnstileToken: z.string().min(1, { message: "Please complete the security check." }),
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50)
    .transform(sanitizeString),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .transform((val) => val.trim().toLowerCase()),
  phone: z
    .string()
    .transform(normalizePhone)
    .refine((val) => phoneRegex.test(val), {
      message: "Please enter a valid 10-digit phone number.",
    }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(1000)
    .transform(sanitizeString),
  turnstileToken: z.string().min(1, { message: "Please complete the security check." }),
});

export const enquirySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .transform(sanitizeString),
  phone: z
    .string()
    .transform(normalizePhone)
    .refine((val) => phoneRegex.test(val), {
      message: "Please enter a valid 10-digit phone number.",
    }),
  symptom_details: z
    .string()
    .max(500)
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeString(val) : "")),
  source_service: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeString(val) : "")),
  turnstileToken: z.string().min(1, { message: "Please complete the security check." }),
});

export type AppointmentInput = z.input<typeof appointmentSchema>;
export type ContactInput = z.input<typeof contactSchema>;
export type EnquiryInput = z.input<typeof enquirySchema>;
