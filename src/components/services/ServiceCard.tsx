"use client";

import Link from "next/link";
import { 
  Activity, 
  Brain, 
  Trophy, 
  Home, 
  Hand, 
  Users, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Map string keys to Lucide Icon components
const ICON_MAP = {
  Activity: Activity,
  Brain: Brain,
  Trophy: Trophy,
  Home: Home,
  Hand: Hand,
  Users: Users
};

interface ServiceCardProps {
  name: string;
  slug: string;
  categoryLabel: string;
  shortDesc: string;
  symptoms: string[];
  highlightedConditions: string[];
  ctaText: string;
  iconName: string;
}

export default function ServiceCard({
  name,
  slug,
  categoryLabel,
  shortDesc,
  symptoms,
  highlightedConditions,
  ctaText,
  iconName
}: ServiceCardProps) {
  // Select icon component
  const IconComponent = ICON_MAP[iconName as keyof typeof ICON_MAP] || Activity;
  
  // Calculate remaining conditions count
  const remainingCount = symptoms.length - highlightedConditions.length;

  return (
    <Card 
      hoverEffect 
      className="group flex flex-col justify-between h-full border border-border/40 bg-card/60 dark:bg-card/30 backdrop-blur-xs rounded-3xl transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 overflow-hidden"
    >
      <div className="p-6 md:p-8 flex flex-col gap-5 text-left h-full">
        {/* Top Header Row with Icon and Label */}
        <div className="flex items-center justify-between gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
            <IconComponent className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full">
            {categoryLabel}
          </span>
        </div>

        {/* Title & Description */}
        <div className="flex flex-col gap-2">
          <CardTitle className="text-xl md:text-2xl font-display font-extrabold text-primary group-hover:text-accent transition-colors duration-200 leading-snug">
            <Link href={`/services/${slug}/`}>{name}</Link>
          </CardTitle>
          <CardDescription className="text-xs md:text-sm leading-relaxed text-muted-foreground">
            {shortDesc}
          </CardDescription>
        </div>

        {/* Core Treatments Highlight Box */}
        <div className="border-t border-border/20 pt-4 flex flex-col gap-2.5">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Core Treatments & Focus
          </span>
          <ul className="space-y-2">
            {highlightedConditions.map((condition, i) => (
              <li key={i} className="flex items-start gap-2 text-xs font-medium text-muted-foreground/90">
                <CheckCircle2 className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" />
                <span>{condition}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Remaining Counter */}
        {remainingCount > 0 && (
          <div className="text-xs font-bold text-accent tracking-wide mt-1">
            + {remainingCount} More Conditions Treated
          </div>
        )}

        {/* Bottom CTA Row */}
        <div className="mt-auto pt-6 border-t border-border/20 flex items-center justify-between gap-4">
          <Button variant="outline" size="sm" asChild className="rounded-full group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300 font-bold">
            <Link href={`/services/${slug}/`}>
              {ctaText}
            </Link>
          </Button>

          <Link
            href={`/services/${slug}/`}
            className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all duration-300 shrink-0"
            aria-label={`View details for ${name}`}
          >
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
