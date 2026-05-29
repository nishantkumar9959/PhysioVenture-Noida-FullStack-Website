import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physiotherapy Services in Noida — 23+ Specialized Treatments | PhysioVenture",
  description:
    "Explore 23+ specialized physiotherapy services at PhysioVenture Noida — neurological rehab, orthopaedic therapy, chiropractic care, sports injury, geriatric physio, and home-visit treatments.",
  keywords: [
    "physiotherapy services Noida",
    "neurological physiotherapy",
    "orthopaedic physiotherapy",
    "sports injury treatment Noida",
    "chiropractic care Noida",
    "home visit physiotherapy Noida",
    "back pain treatment Noida",
    "knee pain treatment Noida",
    "stroke rehabilitation Noida",
  ],
  alternates: {
    canonical: "https://physioventurenoida.vercel.app/services",
  },
  openGraph: {
    title: "23+ Physiotherapy Services | PhysioVenture Noida",
    description:
      "Comprehensive physiotherapy services including neuro, ortho, sports, geriatric, and home-visit treatments in Noida.",
    type: "website",
    locale: "en_IN",
    url: "https://physioventurenoida.vercel.app/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
