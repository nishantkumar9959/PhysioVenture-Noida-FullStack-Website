"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  Brain, 
  Trophy, 
  Home, 
  Hand, 
  Users, 
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp
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
  
  const [showConditions, setShowConditions] = useState(false);

  return (
    <Card 
      hoverEffect 
      className="group flex flex-col justify-between h-full border border-border/40 bg-card/65 dark:bg-card/30 backdrop-blur-xs rounded-2xl overflow-hidden"
    >
      <div className="p-6 md:p-8 flex flex-col gap-5 text-left h-full">
        {/* Top Header Row with Icon and Label */}
        <div className="flex items-center justify-between gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
            <IconComponent className="w-6 h-6 rom-pivoting-hover" />
          </div>
          <span className="text-[9px] font-mono font-bold text-accent uppercase tracking-widest bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full">
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

        {/* Progressive Disclosure Toggle */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => setShowConditions(!showConditions)}
            className="flex items-center gap-1.5 text-xs font-bold text-accent hover:text-primary transition-colors cursor-pointer w-fit font-mono tracking-wider"
          >
            {showConditions ? (
              <>
                <ChevronUp className="w-4 h-4" /> Hide Conditions
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> View Treated Conditions
              </>
            )}
          </button>

          <AnimatePresence initial={false}>
            {showConditions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="border-t border-border/20 pt-4 flex flex-col gap-2.5">
                  <span className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-widest block">
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
                  
                  {/* Dynamic Remaining Counter */}
                  {remainingCount > 0 && (
                    <div className="text-[10px] font-mono font-bold text-accent tracking-wider mt-1 uppercase">
                      + {remainingCount} More Conditions Treated
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA Row (Correctly Separated CTAs) */}
        <div className="mt-auto pt-6 border-t border-border/20 flex items-center justify-between gap-4">
          <Button variant="primary" size="sm" asChild className="rounded-xl font-bold">
            <Link href={`/book/?service=${slug}`}>
              Book Session
            </Link>
          </Button>

          <Link
            href={`/services/${slug}/`}
            className="text-xs font-bold text-muted-foreground hover:text-accent transition-all duration-300 flex items-center gap-1 group/link cursor-pointer"
            aria-label={`View details for ${name}`}
          >
            Explore Details <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
