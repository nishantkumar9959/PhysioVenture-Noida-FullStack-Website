import { z } from "zod";

// Phone validation regex for Indian numbers (optional country code +91 or 0, followed by 10 digits starting with 6-9)
const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

export const appointmentSchema = z.object({
  patient_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .regex(phoneRegex, { message: "Please enter a valid 10-digit phone number." }),
  service_id: z
    .string({ message: "Please select a service." })
    .min(1, { message: "Invalid service selection." }),
  preferred_date: z
    .string()
    .refine((dateStr) => {
      const selectedDate = new Date(dateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, { message: "Preferred date cannot be in the past." }),
  preferred_time_slot: z.enum(["morning", "afternoon", "evening"], {
    message: "Please select a preferred time slot.",
  }),
  additional_notes: z.string().max(500).optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .regex(phoneRegex, { message: "Please enter a valid 10-digit phone number." })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(1000),
});

export const enquirySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  phone: z
    .string()
    .regex(phoneRegex, { message: "Please enter a valid 10-digit phone number." }),
  symptom_details: z.string().max(500).optional().or(z.literal("")),
  source_service: z.string().optional().or(z.literal("")),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type EnquiryInput = z.infer<typeof enquirySchema>;
