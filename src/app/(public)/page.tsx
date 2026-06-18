import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Award,
  ArrowRight,
  ChevronRight,
  HeartHandshake,
  CheckCircle,
  Sparkles,
  BookOpen,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";


import SymptomServicesSection from "@/components/home/SymptomServicesSection";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import SuccessStoriesCarousel from "@/components/home/SuccessStoriesCarousel";
import HeroVideo from "@/components/home/HeroVideo";
import SeoContentBlock from "@/components/shared/SeoContentBlock";
import FaqSection from "@/components/shared/FaqSection";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { BLOG_ARTICLES } from "@/lib/blogs-data";
import { SITE_URL, DOCTOR_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: "Best Physiotherapist in Noida | PhysioVenture",
  },
  description:
    "PhysioVenture offers physiotherapy in Noida for pain, stroke, sports injury, post-surgery rehab, and home physiotherapy across Noida.",
  keywords: [
    "physiotherapy in noida",
    "physiotherapy",
    "best physiotherapy in noida",
    "physiotherapy noida",
    "physiotherapy noida at home",
    "home physiotherapy noida",
    "physiotherapy near me",
    "physiotherapy clinic near me",
    "physiotherapy clinic",
    "physiotherapy centre near me",
    "physiotherapist near me",
    "physiotherapist",
    "best physiotherapist near me",
    "physiotherapist noida",
    "physiotherapist in noida",
    "physiotherapy at home",
    "physiotherapy at home near me",
    "physiotherapy at home charges",
    "physiotherapy at home in noida",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best Physiotherapist in Noida | PhysioVenture",
    description:
      "Clinic and home physiotherapy in Noida by PhysioVenture for pain relief, neurological rehab, sports injury, and post-surgery recovery.",
    url: "/",
    siteName: "PhysioVenture",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/Media_Assets/images/hero_physiotherapy_bg.jpg",
        width: 1200,
        height: 630,
        alt: "PhysioVenture physiotherapy clinic and home physiotherapy in Noida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Physiotherapist in Noida | PhysioVenture",
    description:
      "Book clinic or home physiotherapy in Noida with PhysioVenture.",
    images: ["/Media_Assets/images/hero_physiotherapy_bg.jpg"],
  },
};

const PATIENT_TESTIMONIALS: {
  name: string;
  role: string;
  location: string;
  condition: string;
  quote: string;
  rating: number;
  type: "Home Visit" | "Clinic Visit";
}[] = [
    {
      name: "Vikram Mehta",
      role: "Son of Stroke Patient",
      location: "Sector 50, Noida",
      condition: "Stroke & Neuro Mobility",
      quote: "Honestly didn't know what to expect when we first called. My mother had the stroke in March and by April Dr. Rohit was visiting us at home three times a week. She could barely hold a spoon when we started. Four months later she's walking to the kitchen on her own. I still can't believe the change.",
      rating: 5,
      type: "Home Visit",
    },
    {
      name: "Aarav Sharma",
      role: "Software Architect",
      location: "Sector 62, Noida",
      condition: "Slip Disc & Sciatica",
      quote: "I'd been dealing with that sharp shooting pain down my left leg for almost eight months. Tried two other physiotherapists before this. Dr. Rohit actually sat with me, looked at my posture at my desk, and explained exactly why the pain was radiating. The dry needling session was a bit intense but the relief after was real. Back to running 5k now.",
      rating: 5,
      type: "Clinic Visit",
    },
    {
      name: "Rajeshwari Goel",
      role: "Retired School Teacher",
      location: "Sector 49, Noida",
      condition: "Post-Knee Replacement Rehab",
      quote: "My daughter-in-law found PhysioVenture after my knee surgery. Dr. Rohit came home with all his equipment — I was a bit nervous but he was very patient and gentle. He never pushed too hard but always pushed enough. Getting up and down stairs was my goal, and I can do it now without holding the rail.",
      rating: 5,
      type: "Home Visit",
    },
    {
      name: "Rahul Verma",
      role: "Amateur Marathoner",
      location: "Sector 137, Noida",
      condition: "ACL Tear & Sports Recovery",
      quote: "Tore my ACL in November, surgery was done by December, and I genuinely thought my running days were behind me. Dr. Rohit's rehab plan was structured week by week — no rushing, but no slacking either. He kept me honest about form. Ran a half marathon in September. That says everything.",
      rating: 5,
      type: "Clinic Visit",
    },
    {
      name: "Sonal Gupta",
      role: "Homemaker",
      location: "Sector 15, Noida",
      condition: "Frozen Shoulder",
      quote: "Six weeks of not being able to raise my arm properly. Couldn't even put on a dupatta without wincing. My husband booked a home session because I honestly couldn't travel. Dr. Rohit was punctual and very thorough. The heat therapy followed by the joint mobilization — week three I felt real movement returning. By week six it was nearly normal.",
      rating: 5,
      type: "Home Visit",
    },
    {
      name: "Devendra Nath",
      role: "Retired Civil Engineer",
      location: "Sector 22, Noida",
      condition: "Geriatric Balance & Fall Prevention",
      quote: "I'm 78 and had two small falls in six months. My son was very worried. Dr. Rohit came home, did a proper assessment of how I walk and where I wobble, and then started balance training right there in my drawing room. My confidence walking outdoors has come back a lot. Even my doctor noticed the improvement.",
      rating: 5,
      type: "Home Visit",
    },
    {
      name: "Priya Sen",
      role: "Marketing Director",
      location: "Sector 78, Noida",
      condition: "Cervical Pain & Posture Strain",
      quote: "The tension headaches were almost daily — I just assumed it was stress from work. Turned out it was entirely posture-related from years of bad laptop habits. Dr. Rohit showed me what my spine actually looked like on assessment and it was eye-opening. Four clinic sessions plus the exercises he gave me, and the headaches are down to maybe once a month.",
      rating: 5,
      type: "Clinic Visit",
    },
    {
      name: "Meena Kapoor",
      role: "Daughter of Parkinson's Patient",
      location: "Sector 93, Noida",
      condition: "Parkinson's Gait Rehabilitation",
      quote: "Papa was diagnosed two years ago and his walking had become very shuffled and slow. We were scared of falls constantly. Dr. Rohit specializes in this — he knew exactly which exercises to work on. The treadmill gait work at clinic and the home exercises together made a visible difference. Papa is steadier now and that means the world to us.",
      rating: 5,
      type: "Home Visit",
    },
  ];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "PhysioVenture Neuro & Ortho Physiotherapy Clinic",
    "alternateName": "PhysioVenture",
    "description": "Premium neurological and orthopaedic physiotherapy clinic in Sector 49, Noida. Specializing in stroke recovery, joint pain, sports injuries, and post-surgery rehabilitation with expert home-visit services across all Noida sectors.",
    "image": `${SITE_URL}/Media_Assets/images/hero_physiotherapy_bg.jpg`,
    "@id": `${SITE_URL}/#medicalbusiness`,
    "url": SITE_URL,
    "telephone": "+91 89320 82549",
    "email": "info@physioventure.in",
    "priceRange": "$$",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, UPI, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "A-31, Block A, Sector 49",
      "addressLocality": "Noida",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201303",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.577488,
      "longitude": 77.362143
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    },
    "medicalSpecialty": [
      "Physiotherapy",
      "PhysicalTherapy",
      "Neurological Rehabilitation",
      "Orthopaedic Rehabilitation"
    ],
    "availableLanguage": ["English", "Hindi"],
    "areaServed": [
      { "@type": "Place", "name": "Sector 49, Noida" },
      { "@type": "Place", "name": "Sector 50, Noida" },
      { "@type": "Place", "name": "Sector 51, Noida" },
      { "@type": "Place", "name": "Sector 62, Noida" },
      { "@type": "Place", "name": "Sector 74, Noida" },
      { "@type": "Place", "name": "Sector 78, Noida" },
      { "@type": "Place", "name": "Sector 93, Noida" },
      { "@type": "Place", "name": "Sector 100, Noida" },
      { "@type": "Place", "name": "Sector 137, Noida" },
      { "@type": "Place", "name": "Sector 150, Noida" },
      { "@type": "Place", "name": "Noida Expressway" },
      { "@type": "Place", "name": "Greater Noida West" },
      { "@type": "Place", "name": "Noida, Uttar Pradesh" }
    ],
    "founder": {
      "@type": "Person",
      "name": DOCTOR_NAME,
      "jobTitle": "Lead Physiotherapist & Clinical Director",
      "description": `Dr. Rohit Verma has 7+ years of clinical expertise in Neurological and Orthopaedic Rehabilitation serving 2100+ patients in Noida.`,
      "url": `${SITE_URL}/about`,
      "hasCredential": [
        { "@type": "EducationalOccupationalCredential", "name": "B.P.T (Bachelor of Physiotherapy)" },
        { "@type": "EducationalOccupationalCredential", "name": "M.P.T (Neuro Rehabilitation & Musculoskeletal Recovery)" },
        { "@type": "EducationalOccupationalCredential", "name": "Stroke Rehabilitation Expert Certification" }
      ]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Physiotherapy Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Neurological Physiotherapy", "url": `${SITE_URL}/services/neurological-rehabilitation/` } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Orthopaedic Rehabilitation", "url": `${SITE_URL}/services/orthopedic-rehabilitation/` } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Back Pain & Sciatica Treatment", "url": `${SITE_URL}/services/orthopedic-rehabilitation/` } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Post-Surgery Rehabilitation", "url": `${SITE_URL}/services/home-visit-physiotherapy/` } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Chiropractic Care", "url": `${SITE_URL}/services/chiropractic-manual-therapy/` } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Knee Pain Treatment", "url": `${SITE_URL}/services/orthopedic-rehabilitation/` } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Shoulder Pain Treatment", "url": `${SITE_URL}/services/orthopedic-rehabilitation/` } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Geriatric Physiotherapy", "url": `${SITE_URL}/services/geriatric-rehabilitation/` } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Stroke Rehabilitation", "url": `${SITE_URL}/services/neurological-rehabilitation/` } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Home Visit Physiotherapy", "url": `${SITE_URL}/services/home-visit-physiotherapy/` } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Sports Injury Rehabilitation", "url": `${SITE_URL}/services/sports-injury-rehabilitation/` } }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PhysioVenture",
    "url": "https://physioventure.in"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to Select Best Physiotherapist for Treatment in Noida ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `To select the best physiotherapist in Noida, verify their clinical credentials (BPT and MPT certifications), clinical experience (7+ years is standard for specialized care), patient reviews (look for high ratings such as 4.9/5 stars), and depth of expertise in neurological or orthopaedic rehabilitation. Ensure they offer both clinical visits and comprehensive home visit programs in Noida. At PhysioVenture, ${DOCTOR_NAME} (MPT Neuro) leads all sessions directly rather than delegating to junior assistants, guaranteeing personalized, high-quality rehabilitation.`
        }
      },
      {
        "@type": "Question",
        "name": "Do I need doctor prescription for physiotherapy treatment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, you do not need a doctor's prescription or reference to begin physiotherapy treatment in India. Physiotherapists are qualified direct-access healthcare professionals. You can contact PhysioVenture directly to schedule your detailed clinical assessment and begin your recovery immediately."
        }
      },
      {
        "@type": "Question",
        "name": "When to go for physiotherapy at home?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In-home physiotherapy is highly recommended for patients recovering from major orthopaedic surgeries (like knee or hip replacements), individuals dealing with acute, debilitating back pain or sciatica, geriatric patients seeking balance or fall-prevention training, and neurological cases (such as stroke, Parkinson's disease, or paralysis recovery) where traveling to a clinic is difficult or unsafe."
        }
      },
      {
        "@type": "Question",
        "name": "Which areas in Noida do you cover for home visits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide home-visit physiotherapy across all major sectors of Noida, including Sector 49, 50, 51, 62, 78, 100, 137, 150, Noida Expressway, and Greater Noida West."
        }
      },
      {
        "@type": "Question",
        "name": "Is the quality of treatment at home same as in the clinic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We bring the exact same clinical-grade portable modalities, exercise tools, and expertise, ensuring no compromise in your rehabilitation outcomes."
        }
      },
      {
        "@type": "Question",
        "name": "What is the 80 20 rule in physiotherapy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 80/20 rule in physiotherapy refers to the collaborative split between therapist and patient for a successful recovery. About 20% of your progress comes from hands-on clinical sessions, manual therapy, and adjustments with the physiotherapist. The remaining 80% is driven by the patient's consistency in performing prescribed home exercises, modifying posture, and following ergonomic guidelines in their daily routine."
        }
      },
      {
        "@type": "Question",
        "name": "Can physiotherapy cure leg pain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, physiotherapy can effectively cure leg pain by identifying and treating its root cause. Whether the pain is caused by sciatic nerve compression, a muscle strain, ligament sprain, knee joint wear-and-tear (osteoarthritis), or a slip disc, targeted physical therapy uses decompression stretches, nerve flossing, manual release, and progressive strengthening to provide permanent relief."
        }
      },
      {
        "@type": "Question",
        "name": "Is it worth paying for physiotherapy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Paying for physiotherapy is highly cost-effective because it resolves the underlying cause of pain instead of briefly masking symptoms with medication. Proper physical therapy improves long-term joint health, restores correct posture, speeds up post-surgical healing, and prevents future injuries, helping you avoid expensive medical bills and invasive surgeries later."
        }
      }
    ]
  };

  return (
    <div className="w-full flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* 1. Hero Section Wrapper with Fading Background Image */}
      <div id="hero" className="relative w-full border-b border-border/20 bg-background/50 overflow-hidden">
        {/* Absolute Background Video */}
        {/* On mobile: clip to ~72% height with a bottom fade so video ends at the Clinical Grade badge */}
        <div className="absolute inset-x-0 top-0 h-[72%] lg:inset-0 lg:h-full z-0 pointer-events-none overflow-hidden">
          <HeroVideo />
          {/* Soft bottom fade on mobile only */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent lg:hidden z-20" />
        </div>

        {/* Hero Content Section */}
        <section className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-secondary/60 border border-accent/20 w-fit backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent animate-pulse shrink-0" />
              <span className="text-[12px] sm:text-[13px] font-semibold text-primary">Noida&apos;s Premier Home-Visit & Clinic Rehab</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-primary leading-[1.1] max-w-2xl">
              Restore Movement.<br />
              Rebuild Vitality.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">In Your Own Home.</span>
            </h1>

            <p className="text-[11px] sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Personalized, high-end Neuro and Orthopaedic physical therapy. Get clinic-grade treatment delivered directly to your doorstep in Noida by an expert practitioner with 7+ years of experience.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button variant="primary" size="lg" asChild>
                <Link href="/book/" className="flex items-center gap-2">
                  Book Home Visit <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services/">
                  Explore Services
                </Link>
              </Button>

              {/* Clinical Grade Safety Badge */}
              <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 h-8 sm:h-auto px-3 sm:px-3 sm:py-2 rounded-full sm:rounded-xl bg-secondary/60 border border-primary/10 w-fit backdrop-blur-xs self-center sm:self-auto mt-2 sm:mt-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-accent shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold text-primary whitespace-nowrap">Clinical Grade Sterile Safety</span>
              </div>
            </div>

            {/* Quick trust trustmarks */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border max-w-lg">
              <div className="flex flex-col gap-1">
                <span className="font-display font-extrabold text-2xl text-primary"><AnimatedCounter end={7} suffix="+" syncId="hero-trustmarks" /> Yrs</span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Expertise</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display font-extrabold text-2xl text-primary"><AnimatedCounter end={2100} suffix="+" syncId="hero-trustmarks" /></span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Patients Restored</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display font-extrabold text-2xl text-primary">4.9/5 ★</span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Google Reviews</span>
              </div>
            </div>
          </div>

          {/* Empty spacer column to keep left layout balanced and let the background image shine */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none" />
        </section>
      </div>

      {/* 2. Google Review / Social Proof Strip */}
      <section className="w-full bg-secondary/30 border-y border-border/40 py-10 overflow-hidden">
        <div className="w-full flex flex-col gap-6">
          <TestimonialsCarousel />
        </div>
      </section>


      {/* 3. Diagnostic / Symptom Selector & Stories Carousel */}
      <SymptomServicesSection />

      {/* 4. Specialized Home-Visit Spotlight */}
      <section className="w-full bg-secondary/20 ortho-dot-grid border-y border-border/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-square max-w-[420px] rounded-2xl overflow-hidden shadow-lg border-2 border-white/60 dark:border-primary/10">
              <Image
                src="/Media_Assets/images/home_visit.jpg"
                alt="Dr. Rohit Verma providing physical therapy at patient's home"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 w-fit font-mono text-[9px] tracking-widest">
              <HeartHandshake className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Specialized In-Home Care</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-primary leading-tight">
              Hospital-Grade Rehabilitation, Delivered to Your Living Room
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Why stress over transportation when healing can take place in a supportive, familiar setting? Our customized home-visit physiotherapy protocols match the outcomes of in-clinic visits, with zero compromise on safety or equipment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-primary">Stroke & Neuro Mobility</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Progressive walking, coordination, and functional strength exercises.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-primary">Senior Fall Prevention</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Proprioceptive balance training and environment hazard evaluations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-primary">Post-OP Knee/Hip Rehab</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Continuous passive motion exercises, surgical scar mobility.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-primary">Advanced Pain Modalities</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Portable heat therapy, TENS, dry needling, and clinical bands.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="primary" size="md" asChild>
                <Link href="/book/?type=home">Book Home Visit Session</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Doctor Profile Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-primary/10 w-fit">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Lead Physiotherapist</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-primary leading-tight">
              Meet Dr. Rohit Verma
              <span className="block text-sm font-medium text-accent mt-1">B.P.T, M.P.T (Neuro Rehabilitation & Musculoskeletal Recovery)</span>
            </h2>

            {/* Mobile Image (Visible only on smaller screens) */}
            <div className="flex lg:hidden justify-center w-full my-2">
              <div className="relative w-full aspect-[3/4] max-w-[340px] rounded-3xl overflow-hidden shadow-xl bg-secondary/40 border border-border">
                <Image
                  src="/Media_Assets/images/doctor_profile.jpg"
                  alt="Dr. Rohit Verma - Lead Physiotherapist in Noida"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 340px"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white text-left">
                  <p className="font-display font-extrabold text-lg">Dr. Rohit Verma</p>
                  <p className="text-xs text-accent font-semibold tracking-wider uppercase mt-0.5">7+ Years Clinical Experience</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Dr. Rohit Verma is Noida&apos;s leading physical therapist specializing in comprehensive Neurological & Orthopaedic Rehabilitation. Over a career spanning <strong>more than 7 years</strong>, he has successfully guided over 2,100 patients back to peak mobility and pain-free living.
              </p>
              <p>
                Having worked across renowned multi-specialty hospitals and active sports academies, Dr. Rohit Verma recognized that recovery is fastest, safest, and most lasting when clinical expertise is combined with a stress-free environment. This realization drove him to pioneer the <strong>PhysioVenture Home Rehabilitation Program</strong> in Noida.
              </p>
              <p>
                He combines cutting-edge physical therapeutic methods (like neuro-developmental therapy, chiropractic spine adjustments, dry needling, and clinical myofascial release) with empathetic, personalized care, ensuring every treatment plan aligns with the patient&apos;s lifestyle goals.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-primary">Member of IAP (Indian Association of Physiotherapists)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-primary">Stroke Rehab Expert Certification</span>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="outline" size="md" asChild>
                <Link href="/about/">Read Detailed Credentials</Link>
              </Button>
            </div>
          </div>

          {/* Desktop Image (Visible only on large screens) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <div className="relative w-full aspect-[3/4] max-w-[340px] rounded-3xl overflow-hidden shadow-xl bg-secondary/40 border border-border">
              <Image
                src="/Media_Assets/images/doctor_profile.jpg"
                alt="Dr. Rohit Verma - Lead Physiotherapist in Noida"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 340px"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white text-left">
                <p className="font-display font-extrabold text-lg">Dr. Rohit Verma</p>
                <p className="text-xs text-accent font-semibold tracking-wider uppercase mt-0.5">7+ Years Clinical Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Patient Success Stories (Testimonials) Section */}
      <section id="testimonials" className="w-full bg-secondary/15 py-20 border-y border-border/30 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto flex flex-col gap-3 items-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 w-fit">
              <MessageSquare className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Patient Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-primary">
              Success Stories of Restored Mobility
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
              Hear directly from our patients in Noida about their recovery journeys and how Dr. Rohit Verma’s customized therapy helped them regain active, pain-free lives.
            </p>
          </div>
          <SuccessStoriesCarousel testimonials={PATIENT_TESTIMONIALS} autoPlayInterval={5500} />

          <div className="w-full flex justify-center mt-10">
            <Button variant="outline" size="md" asChild>
              <Link href="/testimonials/">View All Patient Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Health Insights & Blogs Section */}
      <section id="blog" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 items-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-primary/10 w-fit">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Health Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-primary">
            Latest Guides & Recovery Tips
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Read medical insights, posture guidelines, and treatment resources curated by Noida&apos;s home-visit rehabilitation specialist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_ARTICLES.filter((article, index, self) =>
            index === self.findIndex((a) => a.category === article.category)
          ).slice(0, 3).map((article, idx) => (
            <Link key={idx} href={`/blogs/${article.slug}/`} className="group bg-card border border-border/40 overflow-hidden flex flex-col h-full rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 outline-none">
              {/* Blog Card Image wrapper */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary/20">
                <Image
                  src={article.image}
                  alt={`Blog cover: ${article.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-white/90 dark:bg-card/90 text-primary shadow-xs">
                  {article.category}
                </span>
              </div>

              {/* Blog Card Content */}
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {article.date}
                  </span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-display font-extrabold text-lg text-primary group-hover:text-accent transition-colors duration-200 mb-3 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                  {article.excerpt}
                </p>

                <div className="mt-auto border-t border-border/30 pt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-accent transition-colors duration-200">
                    Read Article <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </CardContent>
            </Link>
          ))}
        </div>

        <div className="w-full flex justify-center mt-12">
          <Button variant="outline" size="md" asChild>
            <Link href="/blogs/">View All Articles & Guides</Link>
          </Button>
        </div>
      </section>

      {/* 8. Call to Action (CTA) Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="bg-primary text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 items-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight leading-tight">
              Ready to Recover Without the Travel Stress?
            </h2>
            <p className="text-primary-foreground/80 text-sm sm:text-base leading-relaxed">
              Schedule your detailed biomechanical evaluation today. Choose between a clinic visit or have Dr. Rohit Verma bring the treatment to your Noida home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button variant="accent" size="lg" asChild>
                <Link href="/book/">Schedule Home Visit</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:text-white" asChild>
                <Link href="/contact/" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Call Clinic
                </Link>
              </Button>
            </div>

            <div className="text-xs text-primary-foreground/60 mt-2 flex flex-col sm:flex-row gap-4 items-center">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent" /> Serving all Sectors in Noida
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent" /> Mon - Sat: 8:00 AM - 8:00 PM
              </span>
            </div>
          </div>
        </div>
      </section>

      <SeoContentBlock pageType="home" />
      <FaqSection />
    </div>
  );
}
