/**
 * Canonical business data — single source of truth for all pages.
 * Import from here instead of hard-coding values.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.CF_PAGES_URL || "https://physioventure.in";
export const DOCTOR_NAME = "Dr. Rohit Verma";

export const BUSINESS = {
  name: "PhysioVenture Neuro & Ortho Physiotherapy Clinic",
  shortName: "PhysioVenture",
  phone: "+918932082549",
  phoneDisplay: "+91 89320 82549",
  email: "info@physioventure.in",
  location: "Noida, Gautam Buddha Nagar, Uttar Pradesh, India",
  hours: "Monday – Saturday: 8:00 AM – 8:00 PM",
  hoursShort: "Mon - Sat: 8:00 AM - 8:00 PM",
  sundayClosed: true,
  doctor: DOCTOR_NAME,
  doctorCredentials: "B.P.T, M.P.T (Neuro Rehabilitation & Musculoskeletal Recovery)",
  whatsappNumber: "918932082549",
  whatsappMessage: "Hi PhysioVenture! I would like to enquire about booking a Home Visit physiotherapy session in Noida.",
  siteUrl: SITE_URL,
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.812!2d77.362143!3d28.577488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzM5LjAiTiA3N8KwMjEnNDMuNyJF!5e0!3m2!1sen!2sin!4v1",
  geo: {
    latitude: 28.577488,
    longitude: 77.362143,
  },
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "20:00",
  },
} as const;
