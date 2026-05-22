import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import FloatingCTAs from "@/components/shared/floating-ctas";
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
  title: "PhysioVenture | Premier Neurological & Orthopaedic Physiotherapy Noida",
  description: "Premium physiotherapy clinic in Sector 49, Noida. Specialized in stroke recovery, joint pain, sports injuries, and advanced post-surgery recovery with a strong focus on home visits.",
  keywords: [
    "Physiotherapist in Noida",
    "Best Physiotherapy Clinic in Noida",
    "Neuro Physiotherapy Noida",
    "Orthopaedic Physiotherapy Noida",
    "Back Pain Treatment Noida",
    "Physiotherapy Near Me",
    "Home Visit Physiotherapist Noida",
    "Home Physiotherapy Noida"
  ],
  metadataBase: new URL("https://physioventure.vercel.app"), // Default staging fallback
  alternates: {
    canonical: "https://physioventure.vercel.app",
  },
  openGraph: {
    title: "PhysioVenture | Premier Neurological & Orthopaedic Physiotherapy Noida",
    description: "Premium physiotherapy clinic in Sector 49, Noida. Specialized in stroke recovery, joint pain, sports injuries, and advanced post-surgery recovery with a strong focus on home visits.",
    locale: "en_IN",
    type: "website",
    url: "https://physioventure.vercel.app",
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
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Navbar />
        <main className="flex-1 w-full flex flex-col pt-16">
          {children}
        </main>
        <Footer />
        <FloatingCTAs />
      </body>
    </html>
  );
}
