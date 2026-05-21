import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dr. Rohit Kumar — Lead Physiotherapist | PhysioVenture Noida",
  description:
    "Meet Dr. Rohit Kumar — 7+ years of expertise in neurological and orthopaedic rehabilitation. Learn about PhysioVenture's mission, credentials, and clinical approach in Noida.",
  alternates: {
    canonical: "https://physioventure.vercel.app/about",
  },
  openGraph: {
    title: "About Dr. Rohit Kumar | PhysioVenture Noida",
    description:
      "7+ years of expert neurological & orthopaedic physiotherapy. Discover Dr. Rohit Kumar's qualifications and the PhysioVenture clinic story.",
    type: "profile",
    locale: "en_IN",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
