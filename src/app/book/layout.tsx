import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Physiotherapy Appointment in Noida | PhysioVenture",
  description:
    "Schedule a home-visit or clinic physiotherapy session with Dr. Rohit Kumar in Noida. Book online for neurological, orthopaedic, or sports injury rehabilitation.",
  alternates: {
    canonical: "https://physioventure.vercel.app/book",
  },
  openGraph: {
    title: "Book Appointment | PhysioVenture Noida",
    description:
      "Schedule your physiotherapy session — home visit or clinic. Expert neuro & ortho care in Noida.",
    type: "website",
    locale: "en_IN",
    url: "https://physioventure.vercel.app/book",
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
