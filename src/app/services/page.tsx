import Link from "next/link";
import { 
  Activity, 
  Phone, 
  Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ServicesFilterList from "@/components/services/ServicesFilterList";

export default function ServicesHub() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-4 items-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-primary/10 w-fit">
          <Activity className="w-4 h-4 text-accent animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Treatment Portfolio</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-primary tracking-tight leading-tight">
          Specialized Physiotherapy Programs
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
          Explore our portfolio of 23 clinical treatments. From stroke neuro-rehab to post-surgery mobilization, Dr. Rohit Kumar delivers personalized recovery protocols directly to your Noida residence or clinic.
        </p>
      </div>

      {/* Interactive Search & Filtering Grid */}
      <ServicesFilterList />

      {/* In-Home Spotlight CTA */}
      <div className="bg-secondary/40 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 text-left max-w-5xl mx-auto">
        <div className="max-w-2xl flex flex-col gap-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">In-Home Rehabilitation</span>
          </div>
          <h3 className="text-2xl font-display font-extrabold text-primary leading-tight">
            Can't Travel to the Clinic?
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            All 23 services are available as clinical home visits. Dr. Rohit Kumar travels with compact electrotherapy modalities, chiropractic adjusters, and diagnostic gear to deliver custom recovery sessions directly to you in Noida.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
          <Button variant="primary" size="md" asChild>
            <Link href="/book">Schedule Home Session</Link>
          </Button>
          <Button variant="outline" size="md" asChild>
            <Link href="/contact" className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> Speak with Dr. Rohit Kumar
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}