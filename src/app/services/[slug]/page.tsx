import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  CheckCircle, 
  MapPin, 
  Phone, 
  Calendar, 
  HelpCircle,
  Activity,
  Sparkles,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { SERVICES_DATA, getServiceBySlug } from "@/lib/services-data";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static routes at build time for all 23 services
export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

// Generate dynamic SEO metadata for each service
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return {
      title: "Service Not Found | PhysioVenture Noida",
    };
  }

  const capitalizedCategory = service.categoryLabel;

  return {
    title: `${service.name} in Noida | PhysioVenture Home Rehabilitation`,
    description: `Specialized ${service.name} by Dr. Rohit Kumar (7+ Yrs Exp) in Sector 49, Noida. We treat ${service.symptoms.slice(0, 3).join(", ")}. Book a premium home visit session today.`,
    keywords: [
      `${service.name} Noida`,
      `Best ${service.name} in Noida`,
      `Physiotherapist in Noida`,
      `Home visit physiotherapist Noida`,
      `Stroke rehab Noida`,
      `Joint pain treatment Noida`
    ],
    openGraph: {
      title: `${service.name} in Noida | PhysioVenture`,
      description: service.shortDesc,
      type: "website",
      locale: "en_IN",
    }
  };
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  // Map symptoms list into items with unique keys for display
  const symptomItems = service.symptoms.map((symptom, i) => ({ id: i, text: symptom }));

  // Map FAQs to Accordion items
  const faqAccordionItems = service.faqs.map((faq, i) => ({
    id: `faq-${i}`,
    trigger: faq.question,
    content: faq.answer
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Dynamic Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-primary font-semibold">{service.name}</span>
      </div>

      {/* Back button */}
      <Link 
        href="/services" 
        className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Services Hub
      </Link>

      {/* Hero Header */}
      <div className="flex flex-col gap-4 max-w-4xl mb-12">
        <span className="text-xs font-bold text-accent uppercase tracking-wider block">
          {service.categoryLabel}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-primary leading-tight">
          {service.name}
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mt-2">
          {service.shortDesc}
        </p>
      </div>

      {/* Two Column Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Main Details Column */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          {/* About Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-display font-extrabold text-primary flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" /> Clinical Treatment Overview
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed border-l-2 border-accent/20 pl-4 py-1">
              {service.longDesc}
            </p>
          </div>

          {/* Treatment step by step timeline */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-display font-extrabold text-primary flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" /> Progressive Rehabilitation Timeline
            </h3>
            
            <div className="space-y-6 relative border-l border-border/60 pl-6 ml-3">
              {service.timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-white dark:border-background" />
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Phase {idx + 1}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Targeted Conditions Card */}
          <Card hoverEffect={false} className="p-6 border border-border/60">
            <h3 className="font-display font-extrabold text-base text-primary mb-4">
              Targeted Symptoms & Conditions
            </h3>
            <ul className="space-y-3">
              {symptomItems.map((item) => (
                <li key={item.id} className="flex items-start gap-2 text-xs text-muted-foreground text-left">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Quick Contact Info */}
          <div className="bg-secondary/40 rounded-2xl p-6 border border-border/40 text-left flex flex-col gap-4">
            <h4 className="font-display font-extrabold text-sm uppercase tracking-wider text-primary">Noida Home Visits</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dr. Rohit Kumar brings certified sterile modalities, chiropractic adjusters, and exercise Prescriptions directly to your home.
            </p>
            <div className="space-y-2.5 text-xs text-muted-foreground border-t border-border/40 pt-4">
              <div className="flex justify-between">
                <span>Coverage</span>
                <span className="font-bold text-primary">All Noida Sectors</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="font-bold text-primary">45 - 60 Mins</span>
              </div>
              <div className="flex justify-between">
                <span>Consultant</span>
                <span className="font-bold text-accent">Dr. Rohit Kumar (7+ Yrs Exp)</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 pt-2">
              <Button variant="primary" asChild>
                <Link href="/book" className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" /> Book Home Visit
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact" className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> Inquire via Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      {service.faqs && service.faqs.length > 0 && (
        <div className="max-w-4xl border-t border-border/40 pt-12 mb-16">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-accent" />
            <h3 className="text-xl font-display font-extrabold text-primary">Frequently Asked Questions</h3>
          </div>
          <Accordion items={faqAccordionItems} />
        </div>
      )}

      {/* CTA Box */}
      <div className="bg-primary text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl max-w-5xl mx-auto">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-4 items-center max-w-xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold leading-tight">
            Schedule a Custom Home Assessment
          </h3>
          <p className="text-primary-foreground/80 text-xs sm:text-sm leading-relaxed">
            Get a comprehensive physical diagnosis and structured rehabilitation roadmap matching this {service.name} protocol.
          </p>
          <div className="pt-2">
            <Button variant="accent" size="lg" asChild>
              <Link href="/book">Book Your Callback Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
