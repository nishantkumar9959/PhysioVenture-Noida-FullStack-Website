import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestimonialsFilterList from "@/components/testimonials/TestimonialsFilterList";

export default function TestimonialsPage() {
  return (
    <div className="w-full py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5 flex-wrap">
            <li>
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
            </li>
            <li className="text-border">/</li>
            <li className="text-primary font-medium">Testimonials</li>
          </ol>
        </nav>

        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 w-fit mb-4">
            <MessageSquare className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Patient Testimonials</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-primary leading-tight mb-4">
            Success Stories of Restored Mobility
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Read real stories from our patients across Noida. Learn how Dr. Rohit Verma’s tailored therapeutic programs helped them overcome complex pain, stroke impairments, and joint limitations.
          </p>
        </div>

        {/* Interactive Testimonials Filter & Grid */}
        <TestimonialsFilterList />

        {/* CTA section */}
        <div className="mt-16 bg-primary text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-6 items-center max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
              Begin Your Own Success Story
            </h2>
            <p className="text-primary-foreground/80 text-sm sm:text-base leading-relaxed">
              Schedule your comprehensive initial assessment. Choose between a home visit by Dr. Rohit Verma or a consultation at our Sector 49 clinic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button variant="accent" size="md" asChild>
                <Link href="/book/">Book Appointment</Link>
              </Button>
              <Button variant="outline" size="md" className="border-white/20 text-white hover:bg-white/10 hover:text-white" asChild>
                <Link href="/contact/">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
