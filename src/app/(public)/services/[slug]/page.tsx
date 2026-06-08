import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
  TrendingUp,
  Brain,
  Trophy,
  Home as HomeIcon,
  Hand,
  Users
} from "lucide-react";
import { SERVICES_DATA, getServiceBySlug } from "@/lib/services-data";
import { BLOG_ARTICLES, getBlogCategoryByService } from "@/lib/blogs-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { SITE_URL, DOCTOR_NAME } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

// Map string keys to Lucide Icon components
const ICON_MAP = {
  Activity: Activity,
  Brain: Brain,
  Trophy: Trophy,
  Home: HomeIcon,
  Hand: Hand,
  Users: Users
};

function getBlogCategorySlug(categoryName: string): string {
  switch (categoryName) {
    case "Orthopedic Care":
      return "orthopedic-care";
    case "Neurological Rehabilitation":
      return "neurological-rehabilitation";
    case "Sports Rehabilitation":
      return "sports-rehabilitation";
    case "Home Physiotherapy":
      return "home-physiotherapy";
    case "Geriatric Care":
      return "geriatric-care";
    default:
      return "orthopedic-care";
  }
}

function getLocalKeywords(slug: string, serviceName: string): string[] {
  const baseKeywords = [
    `${serviceName} Noida`,
    `Best ${serviceName} in Noida`,
    `Physiotherapist in Noida`,
    `Home visit physiotherapist Noida`,
  ];
  
  if (slug === "orthopedic-rehabilitation") {
    return [
      ...baseKeywords,
      "Back Pain Treatment in Noida",
      "Knee Pain Treatment in Noida",
      "Slip Disc Treatment Noida",
      "Sciatica Pain Relief Noida",
      "Frozen Shoulder Physiotherapy Noida"
    ];
  }
  if (slug === "neurological-rehabilitation") {
    return [
      ...baseKeywords,
      "Stroke Rehabilitation in Noida",
      "Paralysis Treatment Noida",
      "Parkinson Rehabilitation Noida",
      "Neurological Physiotherapist Noida"
    ];
  }
  if (slug === "sports-injury-rehabilitation") {
    return [
      ...baseKeywords,
      "ACL Rehabilitation in Noida",
      "Knee Injury Therapy Noida",
      "Tennis Elbow Recovery Noida",
      "Sports Physiotherapy Noida",
      "Ligament Injury Rehabilitation Noida"
    ];
  }
  if (slug === "home-visit-physiotherapy") {
    return [
      ...baseKeywords,
      "Home Physiotherapy Noida",
      "Knee Replacement Rehab Home Noida",
      "Physiotherapy Home Visit Noida",
      "Physiotherapist Home Visit Noida"
    ];
  }
  if (slug === "chiropractic-manual-therapy") {
    return [
      ...baseKeywords,
      "Chiropractic Treatment in Noida",
      "Spine Mobilization Noida",
      "Postural Correction Noida",
      "Best Chiropractor in Noida"
    ];
  }
  if (slug === "geriatric-rehabilitation") {
    return [
      ...baseKeywords,
      "Geriatric Physiotherapy Noida",
      "Fall Prevention for Seniors Noida",
      "Elderly Care Physiotherapy Noida",
      "Balance Exercises for Seniors Noida"
    ];
  }
  return baseKeywords;
}

// Generate static routes at build time for all 6 primary services
export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

// Generate dynamic localized SEO metadata for each service
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return {
      title: "Service Not Found | PhysioVenture Noida",
    };
  }

  const localKeywords = getLocalKeywords(service.slug, service.name);

  return {
    title: `${service.name} in Noida | PhysioVenture Home Rehabilitation`,
    description: `Specialized ${service.name} by Dr. Rohit Verma (7+ Yrs Exp) in Sector 49, Noida. We treat ${service.symptoms.slice(0, 4).join(", ")}. Book a premium home visit session today.`,
    keywords: localKeywords,
    alternates: {
      canonical: `/services/${resolvedParams.slug}/`,
    },
    openGraph: {
      title: `${service.name} in Noida | PhysioVenture`,
      description: service.shortDesc,
      type: "website",
      locale: "en_IN",
      url: `/services/${resolvedParams.slug}/`,
    }
  };
}

function getSymptomLink(symptomText: string): string | null {
  const staticMap: Record<string, string> = {
    "Shoulder Pain Treatment": "frozen-shoulder-treatment",
    "Frozen Shoulder": "frozen-shoulder-treatment",
    "Sciatica": "sciatica-pain-treatment",
    "Slip Disc": "slip-disc-treatment",
    "Cervical Spondylitis": "cervical-spondylitis-treatment",
    "ACL Rehabilitation": "acl-rehabilitation",
    "Tennis Elbow": "tennis-elbow-rehabilitation",
    "Chiropractic Treatment": "chiropractic-treatment",
    "Fall Prevention": "fall-prevention-geriatric",
  };

  const textClean = symptomText.trim();
  if (staticMap[textClean]) {
    return `/services/${staticMap[textClean]}/`;
  }

  // Attempt direct matching by name (case-insensitive)
  const directMatch = SERVICES_DATA.find(
    (s) => s.name.toLowerCase() === textClean.toLowerCase()
  );
  if (directMatch) {
    return `/services/${directMatch.slug}/`;
  }

  // Attempt slug comparison
  const slugifiedSymptom = textClean
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const slugMatch = SERVICES_DATA.find((s) => s.slug === slugifiedSymptom);
  if (slugMatch) {
    return `/services/${slugMatch.slug}/`;
  }

  return null;
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const IconComponent = ICON_MAP[service.iconName as keyof typeof ICON_MAP] || Activity;
  const blogCategory = getBlogCategoryByService(service.slug);
  const relatedArticles = BLOG_ARTICLES.filter(
    (article) => article.category === blogCategory
  ).slice(0, 3);

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
        "name": "Services",
        "item": `${SITE_URL}/services/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.name,
        "item": `${SITE_URL}/services/${resolvedParams.slug}/`
      }
    ]
  };

  const medicalWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${SITE_URL}/services/${resolvedParams.slug}/#webpage`,
    "url": `${SITE_URL}/services/${resolvedParams.slug}/`,
    "name": `${service.name} in Noida`,
    "description": service.shortDesc,
    "inLanguage": "en-IN",
    "isPartOf": { "@id": `${SITE_URL}/#website` },
    "about": {
      "@type": "MedicalBusiness",
      "name": "PhysioVenture Neuro & Ortho Physiotherapy Clinic"
    },
    "author": {
      "@type": "Person",
      "name": DOCTOR_NAME,
      "url": `${SITE_URL}/about/`
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
      />
      
      {/* Dynamic Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services/" className="hover:text-primary transition-colors">Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-primary font-semibold">{service.name}</span>
      </div>

      {/* Back button */}
      <Link
        href="/services/"
        className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Services Hub
      </Link>

      {/* Hero Header */}
      <div className="flex flex-col gap-4 max-w-4xl mb-12">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-secondary/80 flex items-center justify-center text-accent shrink-0">
            <IconComponent className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider">
            {service.categoryLabel}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-primary leading-tight">
          {service.name} in Noida
        </h1>
        <h2 className="text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed mt-2 font-medium">
          {service.shortDesc}
        </h2>
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
            {/* Expert Citation Component */}
            <blockquote
              className="p-5 my-6 rounded-r-2xl border-l-4 italic text-sm sm:text-base leading-relaxed shadow-xs"
              style={{
                borderLeft: "4px solid hsl(160, 60%, 45%)",
                backgroundColor: "hsl(210, 20%, 98%)",
                color: "hsl(160, 84%, 12%)"
              }}
            >
              "Consistent, evidence-based physical therapy is essential to restore proper biomechanics. By bringing specialized clinical care directly to your home, we optimize safety and speed up recovery times."
              <span className="block mt-2 text-xs font-bold not-italic text-muted-foreground">
                — {DOCTOR_NAME}, Lead Physiotherapist & Clinical Director
              </span>
            </blockquote>
          </div>

          {/* Benefits Section */}
          <div className="flex flex-col gap-4 bg-secondary/15 rounded-3xl p-6 sm:p-8 border border-border/20">
            <h3 className="text-xl font-display font-extrabold text-primary flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent" /> Key Clinical Benefits
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
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
              {symptomItems.map((item) => {
                const linkHref = getSymptomLink(item.text);
                return (
                  <li key={item.id} className="flex items-start gap-2 text-xs text-muted-foreground text-left">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    {linkHref ? (
                      <Link
                        href={linkHref}
                        className="font-medium hover:text-accent hover:underline transition-colors cursor-pointer"
                      >
                        {item.text}
                      </Link>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* Quick Contact Info */}
          <div className="bg-secondary/40 rounded-2xl p-6 border border-border/40 text-left flex flex-col gap-4">
            <h4 className="font-display font-extrabold text-sm uppercase tracking-wider text-primary">Noida Home Visits</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dr. Rohit Verma brings certified sterile modalities, chiropractic adjusters, and exercise prescriptions directly to your home.
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
                <span className="font-bold text-accent">{DOCTOR_NAME} (7+ Yrs Exp)</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <Button variant="primary" asChild>
                <Link href="/book/" className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" /> Book Home Visit
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact/" className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> Inquire via Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Health Guides (Automated Internal Linking Component) */}
      {relatedArticles.length > 0 && (
        <div className="border-t border-border/45 pt-12 mb-16 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-display font-extrabold text-primary">Related Health Insights</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Read medical guidelines and exercises for {service.name} by Dr. Rohit Verma.
              </p>
            </div>
            <Link 
              href={`/blogs/category/${getBlogCategorySlug(blogCategory)}/`} 
              className="text-xs font-bold text-accent hover:text-primary transition-colors flex items-center gap-1.5 self-start sm:self-center"
            >
              View All {blogCategory} Articles <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((article, idx) => (
              <Link 
                key={idx} 
                href={`/blogs/${article.slug}/`} 
                className="group bg-card border border-border/40 overflow-hidden flex flex-col h-full rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 outline-none"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary/20">
                  <Image
                    src={article.image}
                    alt={`Blog cover: ${article.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[9px] font-bold text-accent uppercase tracking-wider mb-2 block">
                    {article.category}
                  </span>
                  <h4 className="font-display font-extrabold text-base text-primary group-hover:text-accent transition-colors duration-200 line-clamp-2 leading-snug mb-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <span className="text-xs font-bold text-primary group-hover:text-accent transition-colors mt-auto flex items-center gap-1">
                    Read Article <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

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
              <Link href="/book/">Book Your Callback Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
