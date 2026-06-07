import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Dr. Rohit Verma — Lead Physiotherapist | PhysioVenture Noida",
  description:
    "Meet Dr. Rohit Verma — 7+ years of expertise in neurological and orthopaedic rehabilitation. Learn about PhysioVenture's mission, credentials, and clinical approach in Noida.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Dr. Rohit Verma | PhysioVenture Noida",
    description:
      "7+ years of expert neurological & orthopaedic physiotherapy. Discover Dr. Rohit Verma's qualifications and the PhysioVenture clinic story.",
    type: "profile",
    locale: "en_IN",
    url: `${SITE_URL}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
