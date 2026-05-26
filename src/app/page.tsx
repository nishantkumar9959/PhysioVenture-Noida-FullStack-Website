import Link from "next/link";
import Image from "next/image";
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
  Star,
  Home as HomeIcon,
  BookOpen,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import SymptomServicesSection from "@/components/home/SymptomServicesSection";
import { BLOG_ARTICLES } from "@/lib/blogs-data";

const PATIENT_TESTIMONIALS = [
  {
    name: "Vikram Mehta",
    role: "Son of Stroke Patient",
    location: "Sector 50, Noida",
    condition: "Stroke & Neuro Mobility",
    quote: "Dr. Rohit Kumar's home visits were a game changer for my 70-year-old mother recovering from a stroke. Within 3 months of customized balance and motor therapy, she regained her confidence to walk independently. Truly professional and highly recommended.",
    rating: 5,
    type: "Home Visit",
  },
  {
    name: "Aarav Sharma",
    role: "Software Architect",
    location: "Sector 62, Noida",
    condition: "Slip Disc & Sciatica",
    quote: "Suffered from persistent slip disc pain for months due to sitting. Dr. Rohit Kumar's chiropractic adjustments and core strengthening exercises did wonders. His explanation of the biomechanics was reassuring. Best therapist in Noida!",
    rating: 5,
    type: "Clinic Visit",
  },
  {
    name: "Mrs. Rajeshwari Goel",
    role: "Retired Teacher",
    location: "Sector 49, Noida",
    condition: "Post-OP Knee Replacement",
    quote: "Post-surgery knee rehab at home was incredibly convenient. Dr. Rohit Kumar brought advanced mobilization tools, checked my progress diligently, and guided me back to climbing stairs pain-free. A dedicated, experienced professional.",
    rating: 5,
    type: "Home Visit",
  }
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "PhysioVenture Neuro & Ortho Physiotherapy Clinic",
    "alternateName": "PhysioVenture",
    "image": "https://physioventure.vercel.app/images/hero_physiotherapy_bg.jpg",
    "@id": "https://physioventure.vercel.app/#medicalbusiness",
    "url": "https://physioventure.vercel.app",
    "telephone": "+91 89320 82549",
    "priceRange": "$$",
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
      "PhysicalTherapy"
    ]
  };

  return (
    <div className="w-full flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. Hero Section Wrapper with Fading Background Image */}
      <div id="hero" className="relative w-full border-b border-border/20 bg-background/50 overflow-hidden">
        {/* Absolute Background Image fading to the left */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Background image container covering the entire hero area */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/hero_physiotherapy_bg.jpg"
              alt="Hands-on Physiotherapy Session in Noida by Dr. Rohit Kumar"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center lg:object-right opacity-25 lg:opacity-100 transition-opacity duration-700"
            />
            {/* Horizontal fade on desktop, solid light shield overlay on mobile to guarantee accessibility contrast */}
            <div className="absolute inset-0 hero-gradient" />
          </div>
          {/* Subtle colored glow blur effects to enrich the canvas */}
          <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content Section */}
        <section className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-secondary/60 border border-accent/20 w-fit backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent animate-pulse shrink-0" />
              <span className="text-[12px] sm:text-[13px] font-semibold text-primary">Noida's Premier Home-Visit & Clinic Rehab</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-primary leading-[1.1] max-w-2xl">
              Restore Movement.<br />
              Rebuild Vitality.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">In Your Own Home.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Personalized, high-end Neuro and Orthopaedic physical therapy. Get clinic-grade treatment delivered directly to your doorstep in Noida by an expert practitioner with 7+ years of experience.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button variant="primary" size="lg" asChild>
                <Link href="/book" className="flex items-center gap-2">
                  Book Home Visit <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">
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
                <span className="font-display font-extrabold text-2xl text-primary">7+ Yrs</span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Expertise</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display font-extrabold text-2xl text-primary">1200+</span>
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
      <section className="w-full bg-secondary/30 border-y border-border/40 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-shrink-0 text-center md:text-left">
            <h2 className="font-display font-extrabold text-lg text-primary">Trusted by Noida Residents</h2>
            <div className="flex items-center gap-1.5 justify-center md:justify-start mt-1" role="img" aria-label="4.9 out of 5 stars rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-sm font-semibold text-muted-foreground ml-2">4.9 Star Rating (150+ Reviews)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-4xl overflow-x-auto pb-2 scrollbar-none">
            {PATIENT_TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-card dark:bg-card/50 border border-border/40 p-4 rounded-xl shadow-xs min-w-[280px] flex-1">
                <div className="flex items-center gap-1 mb-2" role="img" aria-label={`${t.rating} out of 5 stars`}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs italic text-muted-foreground leading-relaxed">"{t.quote}"</p>
                <div className="mt-3 flex flex-col">
                  <span className="text-xs font-bold text-primary">{t.name}</span>
                  <span className="text-xs text-muted-foreground">{t.role} · {t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Diagnostic / Symptom Selector & Stories Carousel */}
      <SymptomServicesSection />

      {/* 4. Specialized Home-Visit Spotlight */}
      <section className="w-full bg-secondary/20 border-y border-border/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-square max-w-[420px] rounded-3xl overflow-hidden shadow-xl border-4 border-white/60 dark:border-primary/10">
              <Image
                src="/images/home_visit.png"
                alt="Dr. Rohit Kumar providing physical therapy at patient's home"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 w-fit">
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
                <Link href="/book?type=home">Book Home Visit Session</Link>
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
              Meet Dr. Rohit Kumar
              <span className="block text-sm font-medium text-accent mt-1">B.P.T, M.P.T (Neuro Rehabilitation & Musculoskeletal Recovery)</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Dr. Rohit Kumar is Noida's leading physical therapist specializing in comprehensive Neurological & Orthopaedic Rehabilitation. Over a career spanning <strong>more than 7 years</strong>, he has successfully guided over 1,200 patients back to peak mobility and pain-free living.
              </p>
              <p>
                Having worked across renowned multi-specialty hospitals and active sports academies, Dr. Rohit Kumar recognized that recovery is fastest, safest, and most lasting when clinical expertise is combined with a stress-free environment. This realization drove him to pioneer the <strong>PhysioVenture Home Rehabilitation Program</strong> in Noida.
              </p>
              <p>
                He combines cutting-edge physical therapeutic methods (like neuro-developmental therapy, chiropractic spine adjustments, dry needling, and clinical myofascial release) with empathetic, personalized care, ensuring every treatment plan aligns with the patient's lifestyle goals.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-primary">Member of IAP (Indian Association)</span>
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
                <Link href="/about">Read Detailed Credentials</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full aspect-[3/4] max-w-[340px] rounded-3xl overflow-hidden shadow-xl bg-secondary/40 border border-border">
              <Image
                src="/images/doctor_profile.png"
                alt="Dr. Rohit Kumar - Lead Physiotherapist in Noida"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 340px"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white text-left">
                <p className="font-display font-extrabold text-lg">Dr. Rohit Kumar</p>
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
              Hear directly from our patients in Noida about their recovery journeys and how Dr. Rohit Kumar’s customized therapy helped them regain active, pain-free lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {PATIENT_TESTIMONIALS.map((testimonial, idx) => (
              <Card key={idx} hoverEffect className="bg-card border border-border/50 flex flex-col justify-between h-full p-6 shadow-xs relative overflow-hidden">
                {/* Visual quote indicator */}
                <span className="absolute right-6 top-4 text-6xl font-display font-extrabold text-accent/10 select-none">“</span>
                
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed italic mb-6 relative z-10">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="border-t border-border/40 pt-4 mt-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-primary text-base">{testimonial.name}</span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary/80 text-primary border border-primary/5">
                      {testimonial.type === "Home Visit" ? (
                        <>
                          <HomeIcon className="w-3.5 h-3.5 text-accent shrink-0" /> Home Visit
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3.5 h-3.5 text-accent shrink-0" /> Clinic
                        </>
                      )}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-muted-foreground font-medium">{testimonial.role} · {testimonial.location}</span>
                    <span className="text-[11px] text-accent font-bold tracking-wide uppercase mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> {testimonial.condition}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="w-full flex justify-center mt-12">
            <Button variant="outline" size="md" asChild>
              <Link href="/testimonials">View All Patient Reviews</Link>
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
            Read medical insights, posture guidelines, and treatment resources curated by Noida's home-visit rehabilitation specialist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_ARTICLES.map((article, idx) => (
            <Link key={idx} href={`/blogs/${article.slug}`} className="group bg-card border border-border/40 overflow-hidden flex flex-col h-full rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 outline-none">
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
            <Link href="/blogs">View All Articles & Guides</Link>
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
              Schedule your detailed biomechanical evaluation today. Choose between a clinic visit or have Dr. Rohit Kumar bring the treatment to your Noida home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button variant="accent" size="lg" asChild>
                <Link href="/book">Schedule Home Visit</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:text-white" asChild>
                <Link href="/contact" className="flex items-center gap-2">
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
    </div>
  );
}
