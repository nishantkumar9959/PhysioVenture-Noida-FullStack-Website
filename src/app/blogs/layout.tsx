import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physiotherapy Blogs & Health Tips | PhysioVenture Noida",
  description: "Explore expert insights, posture ergonomics tips, stroke recovery protocols, and geriatric rehabilitation guides from the leading physiotherapy clinic in Noida.",
  alternates: {
    canonical: "https://physioventure.vercel.app/blogs",
  },
  openGraph: {
    title: "Physiotherapy Blogs & Health Tips | PhysioVenture Noida",
    description: "Explore expert insights, posture ergonomics tips, stroke recovery protocols, and geriatric rehabilitation guides from the leading physiotherapy clinic in Noida.",
    url: "https://physioventure.vercel.app/blogs",
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
