import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Recovery Success Stories & Testimonials | PhysioVenture Noida",
  description: "Read real recovery testimonials from patients at PhysioVenture Noida. See how Dr. Rohit Verma helps patients overcome stroke, slip disc, back pain, and joint mobility issues.",
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title: "Patient Recovery Success Stories & Testimonials | PhysioVenture Noida",
    description: "Read real recovery testimonials from patients at PhysioVenture Noida. See how Dr. Rohit Verma helps patients overcome stroke, slip disc, back pain, and joint mobility issues.",
    url: "/testimonials",
    type: "website",
  },
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
