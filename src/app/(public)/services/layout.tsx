import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Physiotherapy Services in Noida — 23+ Specialized Treatments | PhysioVenture",
  description:
    "Explore 23+ specialized physiotherapy services at PhysioVenture Noida — neurological rehab, orthopaedic therapy, chiropractic care, sports injury, geriatric physio, and home-visit treatments.",
  keywords: [
    "physiotherapy in noida",
    "physiotherapy",
    "best physiotherapy in noida",
    "physiotherapy noida",
    "physiotherapy noida at home",
    "home physiotherapy noida",
    "physiotherapy near me",
    "physiotherapy clinic near me",
    "physiotherapy centre near me",
    "physiotherapist near me",
    "physiotherapist in noida",
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
    canonical: `${SITE_URL}/services/`,
  },
  openGraph: {
    title: "23+ Physiotherapy Services | PhysioVenture Noida",
    description:
      "Comprehensive physiotherapy services including neuro, ortho, sports, geriatric, and home-visit treatments in Noida.",
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/services/`,
    siteName: "PhysioVenture",
    images: [
      {
        url: "/images/service_home.png",
        width: 1200,
        height: 630,
        alt: "PhysioVenture physiotherapy services in Noida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "23+ Physiotherapy Services | PhysioVenture Noida",
    description:
      "Comprehensive physiotherapy services including neuro, ortho, sports, geriatric, and home-visit treatments in Noida.",
    images: ["/images/service_home.png"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
