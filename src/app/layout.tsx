import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import FloatingCTAs from "@/components/shared/floating-ctas";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "PhysioVenture | Premier Neurological & Orthopaedic Physiotherapy Noida",
    template: "%s | PhysioVenture Noida",
  },
  description: "Premium physiotherapy clinic in Sector 49, Noida. Specialized in stroke recovery, joint pain, sports injuries, and advanced post-surgery recovery with a strong focus on home visits.",
  keywords: [
    "Physiotherapist in Noida",
    "Best Physiotherapy Clinic in Noida",
    "Neuro Physiotherapy Noida",
    "Orthopaedic Physiotherapy Noida",
    "Back Pain Treatment Noida",
    "Physiotherapy Near Me",
    "Home Visit Physiotherapist Noida",
    "Home Physiotherapy Noida",
    "Stroke Rehabilitation Noida",
    "Physiotherapy Sector 49 Noida",
    "Physiotherapy at home Noida",
    "Best physiotherapist for home visits in Noida",
    "Physiotherapy Sector 50 Noida",
    "Physiotherapy Sector 78 Noida",
    "Physiotherapy Sector 137 Noida",
    "Physiotherapy Sector 150 Noida",
    "Chiropractor near me Sector 50 Noida",
    "Stroke rehabilitation home visits Sector 50 Noida",
    "Dr Rohit Verma physiotherapist",
    "PhysioVenture Noida",
  ],
  // Correct canonical base — all relative URLs in metadata resolve against this
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  // Authorship & geo signals for GEO (AI citation engines)
  authors: [{ name: "Dr. Rohit Verma", url: "/about" }],
  creator: "Dr. Rohit Verma — PhysioVenture",
  publisher: "PhysioVenture Neuro & Ortho Physiotherapy Clinic",
  category: "Health & Medical",
  openGraph: {
    title: "PhysioVenture | Premier Neurological & Orthopaedic Physiotherapy Noida",
    description: "Premium physiotherapy clinic in Sector 49, Noida. Specialized in stroke recovery, joint pain, sports injuries, and advanced post-surgery recovery with a strong focus on home visits.",
    siteName: "PhysioVenture",
    locale: "en_IN",
    type: "website",
    url: "/",
    images: [
      {
        url: "/images/hero_physiotherapy_bg.jpg",
        width: 1200,
        height: 630,
        alt: "PhysioVenture — Premier Physiotherapy Clinic in Noida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PhysioVenture | Premier Physiotherapy Noida",
    description: "Premium physiotherapy clinic in Sector 49, Noida. Expert stroke recovery, joint pain treatment, and home visits.",
    images: ["/images/hero_physiotherapy_bg.jpg"],
  },
  // Robots: allow all indexing, enable AI snippet reading
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=5' },
      { url: '/favicon-16x16.png?v=5', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png?v=5', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=5', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: "/site.webmanifest?v=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Preload the first hero video so the browser fetches it as early as possible */}
        <link rel="preload" as="video" href="/videos/hero-bg.mp4" type="video/mp4" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
