/**
 * Canonical business data — single source of truth for all pages.
 * Import from here instead of hard-coding values.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes("pages.dev"))
  ? process.env.NEXT_PUBLIC_SITE_URL
  : "https://physioventure.in";
export const DOCTOR_NAME = "Dr. Rohit Verma";

export const LOCATION = {
  name: "PhysioVenture Neuro & Ortho Physiotherapy Clinic",
  address: "A-256, Block A, Sector 47, Noida, Uttar Pradesh 201303, India",
  lat: 28.5495541,
  lng: 77.3724091,
} as const;

const CLINIC_ADDRESS = {
  streetAddress: "A-256, Block A, Sector 47",
  addressLocality: "Noida",
  addressRegion: "Uttar Pradesh",
  postalCode: "201303",
  addressCountry: "IN",
  full: LOCATION.address,
} as const;

export const BUSINESS = {
  name: "PhysioVenture Neuro & Ortho Physiotherapy Clinic",
  shortName: "PhysioVenture",
  phone: "+918932082549",
  phoneDisplay: "+91 89320 82549",
  email: "info@physioventure.in",
  location: CLINIC_ADDRESS.full,
  address: CLINIC_ADDRESS,
  hours: "Monday – Saturday: 8:00 AM – 8:00 PM",
  hoursShort: "Mon - Sat: 8:00 AM - 8:00 PM",
  sundayClosed: true,
  doctor: DOCTOR_NAME,
  doctorCredentials: "B.P.T, M.P.T (Neuro Rehabilitation & Musculoskeletal Recovery)",
  whatsappNumber: "918932082549",
  whatsappMessage: "Hi PhysioVenture! I would like to enquire about your physiotherapy services and book an appointment.",
  siteUrl: SITE_URL,
  mapUrl: `https://maps.google.com/maps?q=${LOCATION.lat},${LOCATION.lng}+(${encodeURIComponent(LOCATION.address)})&t=&z=16&ie=UTF8&iwloc=&output=embed`,
  geo: {
    latitude: LOCATION.lat,
    longitude: LOCATION.lng,
  },
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "20:00",
  },
} as const;

// Compile-time validation to ensure configuration matches requirements
interface ExpectedLocation {
  readonly name: string;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
}
interface ExpectedAddress {
  readonly streetAddress: string;
  readonly addressLocality: string;
  readonly addressRegion: string;
  readonly postalCode: string;
  readonly addressCountry: string;
  readonly full: string;
}
interface ExpectedGeo {
  readonly latitude: number;
  readonly longitude: number;
}

const _locationVal: ExpectedLocation = LOCATION;
const _addressVal: ExpectedAddress = BUSINESS.address;
const _geoVal: ExpectedGeo = BUSINESS.geo;

