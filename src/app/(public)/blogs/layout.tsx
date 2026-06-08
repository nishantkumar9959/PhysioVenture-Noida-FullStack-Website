import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Physiotherapy Blogs & Health Tips | PhysioVenture Noida",
  description: "Explore expert insights, posture ergonomics tips, stroke recovery protocols, and geriatric rehabilitation guides from the leading physiotherapy clinic in Noida.",
  alternates: {
    canonical: `${SITE_URL}/blogs/`,
  },
  openGraph: {
    title: "Physiotherapy Blogs & Health Tips | PhysioVenture Noida",
    description: "Explore expert insights, posture ergonomics tips, stroke recovery protocols, and geriatric rehabilitation guides from the leading physiotherapy clinic in Noida.",
    url: `${SITE_URL}/blogs/`,
    type: "website",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
