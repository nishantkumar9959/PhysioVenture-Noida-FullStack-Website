import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact PhysioVenture — Physiotherapy Clinic Noida | Sector 47",
  description:
    "Get in touch with PhysioVenture clinic in Sector 47, Noida. Call, WhatsApp, or visit us for expert neurological and orthopaedic physiotherapy. Mon-Sat 8AM-8PM.",
  alternates: {
    canonical: "/contact/",
  },
  openGraph: {
    title: "Contact Us | PhysioVenture Noida",
    description:
      "Reach PhysioVenture — Sector 47, Noida. Phone, WhatsApp, email, or visit for physiotherapy appointments.",
    type: "website",
    locale: "en_IN",
    url: "/contact/",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
