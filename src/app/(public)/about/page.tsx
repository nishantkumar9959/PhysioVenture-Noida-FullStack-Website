import Link from "next/link";
import Image from "next/image";
import {
  Award,
  MapPin,
  CheckCircle,
  HeartHandshake,
  Calendar,
  Activity,
  Compass,
  ShieldCheck,
  Zap,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SITE_URL, DOCTOR_NAME } from "@/lib/constants";

export default function About() {
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/about#physician`,
    "name": DOCTOR_NAME,
    "givenName": "Rohit",
    "familyName": "Verma",
    "honorificPrefix": "Dr.",
    "jobTitle": "Lead Physiotherapist & Clinical Director",
    "description": `${DOCTOR_NAME} is Noida's leading physiotherapist with 7+ years of clinical experience in neurological and orthopaedic rehabilitation. He has successfully treated over 2,100 patients with conditions including stroke, slip disc, and post-surgical joint replacement.`,
    "url": `${SITE_URL}/about`,
    "image": `${SITE_URL}/images/doctor_profile.jpg`,
    "telephone": "+918932082549",
    "email": "info@physioventure.in",
    "memberOf": {
      "@type": "Organization",
      "name": "Indian Association of Physiotherapists (IAP)"
    },
    "hasCredential": [
      { "@type": "EducationalOccupationalCredential", "name": "Bachelor of Physiotherapy (B.P.T)" },
      { "@type": "EducationalOccupationalCredential", "name": "Master of Physiotherapy — Neuro Rehabilitation & Musculoskeletal Recovery (M.P.T)" },
      { "@type": "EducationalOccupationalCredential", "name": "Neuro-Developmental Therapy (NDT) Certification" },
      { "@type": "EducationalOccupationalCredential", "name": "Advanced Chiropractic Manual Adjustment Certification" }
    ],
    "knowsAbout": [
      "Neurological Physiotherapy",
      "Orthopaedic Rehabilitation",
      "Stroke Rehabilitation",
      "Chiropractic Care",
      "Dry Needling",
      "Post-Surgery Rehabilitation",
      "Geriatric Physiotherapy"
    ],
    "availableLanguage": ["English", "Hindi"],
    "worksFor": {
      "@type": "MedicalBusiness",
      "@id": `${SITE_URL}/#medicalbusiness`,
      "name": "PhysioVenture Neuro & Ortho Physiotherapy Clinic"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": `${SITE_URL}/about`
      }
    ]
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* 1. Header Hero */}
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-4 items-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-primary/10 w-fit">
          <Bookmark className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-wider text-primary">About PhysioVenture</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-primary tracking-tight leading-tight">
          Noida's Premium Home Rehabilitation Service
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
          Restoring pain-free movement, function, and independent living. We combine advanced clinical therapy protocols with the ease of in-home visits.
        </p>
      </div>

      {/* 2. Brand Values / Core Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <Card hoverEffect className="p-6 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-primary">Patient-First Care</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We don't believe in generic exercise sheets. Every treatment plan is uniquely crafted around your biomechanical diagnosis, lifestyle, and recovery timeline.
          </p>
        </Card>
        <Card hoverEffect className="p-6 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-primary">Hospital-Grade Safety</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your safety is our absolute priority. We adhere to clinical sterilization protocols, bring sterile portable modalities, and conduct regular sanitization sweeps.
          </p>
        </Card>
        <Card hoverEffect className="p-6 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-primary">Evidence-Based Results</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We employ modern, scientifically-backed clinical methodologies including neural plasticity activation, chiropractic mobilization, and specialized motor learning programs.
          </p>
        </Card>
      </div>

      {/* 3. Founder Profile in detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 pb-12 border-b border-border/60">
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full aspect-[3/4] max-w-[360px] rounded-3xl overflow-hidden shadow-lg border border-border/80 bg-secondary/40">
            <Image
              src="/images/doctor_profile.jpg"
              alt="Dr. Rohit Verma - Senior Physiotherapist"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <div>
            <h2 className="text-3xl font-display font-extrabold text-primary">Dr. Rohit Verma</h2>
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mt-1">
              Founder & Lead Physical Therapist
            </p>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">
              B.P.T, M.P.T (Neurological & Orthopaedic Rehabilitation) | Over 7 Years Experience
            </p>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              Dr. Rohit Verma established PhysioVenture with a simple mission: to bridge the gap between high-end hospital-level physical therapy and patient comfort. Throughout his 7+ years of clinical practice, he observed that patients, especially stroke survivors or those post joint replacement surgeries, faced severe stress and pain commuting to clinics daily.
            </p>
            <p>
              Recognizing that rehabilitation works best when patients feel relaxed, safe, and supported, Dr. Rohit Verma customized his practice to specialize in **evidence-based home visit treatments**.
            </p>
            <p>
              He brings clinical-grade specialized equipment (including portable neuromuscular stimulators, ultrasound devices, chiropractic tables, dry needles, and kinesiology tapes) directly to patients' homes.
            </p>
          </div>

          <div className="border-t border-border/60 pt-6">
            <h4 className="text-sm font-bold text-primary mb-3">Professional Milestones & Credentials:</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <CheckCircle className="w-4.5 h-4.5 text-accent flex-shrink-0 mt-0.5" />
                <span>Bachelors & Masters in Physiotherapy from premier medical institutions.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <CheckCircle className="w-4.5 h-4.5 text-accent flex-shrink-0 mt-0.5" />
                <span>Active Member of the Indian Association of Physiotherapists (IAP).</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <CheckCircle className="w-4.5 h-4.5 text-accent flex-shrink-0 mt-0.5" />
                <span>Specialized certifications in Neuro-Developmental Therapy (NDT) & Bobath concepts.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <CheckCircle className="w-4.5 h-4.5 text-accent flex-shrink-0 mt-0.5" />
                <span>Advanced certified in Chiropractic manual adjustment & spine manipulation.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <CheckCircle className="w-4.5 h-4.5 text-accent flex-shrink-0 mt-0.5" />
                <span>Successfully treated 2100+ stroke recovery, slip-disc, and post-surgery knee patients.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <CheckCircle className="w-4.5 h-4.5 text-accent flex-shrink-0 mt-0.5" />
                <span>Integrated portable pain modalities (IFT/TENS/Laser) for precise home therapy.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Equipment Details */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 items-center mb-10">
          <h2 className="text-3xl font-display font-extrabold text-primary">Advanced Rehabilitation Equipment Brought to You</h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            We carry premium, certified equipment for every home visit. We bring the clinical setups directly to you so that your therapy matches hospital outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hoverEffect className="p-6 border border-border/40">
            <h4 className="font-display font-extrabold text-base text-primary mb-2">Electrotherapy Modalities</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Portable Interferential Therapy (IFT), Transcutaneous Electrical Nerve Stimulation (TENS), and Muscle Stimulators for targeted muscle activation and pain relief.
            </p>
          </Card>
          <Card hoverEffect className="p-6 border border-border/40">
            <h4 className="font-display font-extrabold text-base text-primary mb-2">Chiropractic Adjusters</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Specialized portable manual drop-piece boards and clinical mobilization instruments for spinal adjustments and joint alignment corrections in your home.
            </p>
          </Card>
          <Card hoverEffect className="p-6 border border-border/40">
            <h4 className="font-display font-extrabold text-base text-primary mb-2">Therapeutic Resistances</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Heavy-duty resistance bands (Therabands), balance pads, posture correction straps, and progressive weights to restore muscle tone and core stability.
            </p>
          </Card>
          <Card hoverEffect className="p-6 border border-border/40">
            <h4 className="font-display font-extrabold text-base text-primary mb-2">Sterile Needling & Release</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Single-use acupuncture needles for medical dry needling and deep tissue myofascial release tools to relieve stubborn trigger points and muscle knots.
            </p>
          </Card>
        </div>
      </div>

      {/* 5. Home Visit Parameters & Booking Steps */}
      <div className="bg-secondary/40 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 text-left flex flex-col gap-4">
          <h3 className="text-2xl font-display font-extrabold text-primary">How Our Noida Home-Visit Program Works</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            PhysioVenture offers dedicated in-home physiotherapy across all sectors in Noida (including Sector 50, 49, 62, 74, 93, Noida Expressway, and Greater Noida West).
          </p>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
              <div>
                <h5 className="text-xs font-bold text-primary uppercase tracking-wider">Initial Detailed Assessment</h5>
                <p className="text-xs text-muted-foreground mt-0.5">Dr. Rohit Verma conducts a 60-minute diagnostic session examining range of motion, muscle strength, and gait pattern.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
              <div>
                <h5 className="text-xs font-bold text-primary uppercase tracking-wider">Custom Treatment Plan</h5>
                <p className="text-xs text-muted-foreground mt-0.5">A structured progression program with defined recovery milestones is mapped out according to the assessment.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
              <div>
                <h5 className="text-xs font-bold text-primary uppercase tracking-wider">Scheduled Daily/Weekly Visits</h5>
                <p className="text-xs text-muted-foreground mt-0.5">Sessions are conducted inside your home at your preferred time slot, utilizing portable clinical modalities.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
          <h4 className="font-display font-extrabold text-lg text-primary mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" /> Service Coverage
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            We provide prompt visits to Noida, Greater Noida, and Indirapuram. Typical session duration ranges from <strong>45 to 60 minutes</strong>.
          </p>

          <div className="space-y-2 border-t border-border/60 pt-4 mb-6">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-muted-foreground">Availability</span>
              <span className="font-bold text-primary">Mon - Sat (8 AM - 8 PM)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="font-medium text-muted-foreground">Session Booking</span>
              <span className="font-bold text-primary">Min 24 hrs notice</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="font-medium text-muted-foreground">Consultation Fee</span>
              <span className="font-bold text-accent">Nominal rates (Inquire)</span>
            </div>
          </div>

          <Button variant="primary" className="w-full" asChild>
            <Link href="/book" className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" /> Book Consultation
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
