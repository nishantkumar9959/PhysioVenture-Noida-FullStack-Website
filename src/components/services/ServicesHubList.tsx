"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/services-data";
import ServiceCard from "./ServiceCard";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function ServicesHubList() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // State for horizontal indicator chevron (mobile only)
  const [showRightFade, setShowRightFade] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowRightFade(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  return (
    <div className="w-full mb-16 relative">
      {isMobile ? (
        <div className="flex flex-col gap-2">
          {/* Scrollable Container */}
          <div className="relative w-full overflow-hidden">
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 scrollbar-none w-full -mx-4 px-4"
            >
              {SERVICES_DATA.filter(s => !s.isSubService).map((service, idx) => (
                <div key={idx} className="w-[82vw] shrink-0 snap-start">
                  <ServiceCard
                    name={service.name}
                    slug={service.slug}
                    categoryLabel={service.categoryLabel}
                    shortDesc={service.shortDesc}
                    symptoms={service.symptoms}
                    highlightedConditions={service.highlightedConditions}
                    ctaText={service.ctaText}
                    iconName={service.iconName}
                  />
                </div>
              ))}
            </div>

            {/* Mobile swipe indicator */}
            {showRightFade && (
              <div 
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-background/95 border border-border shadow-md flex items-center justify-center text-primary pointer-events-none animate-pulse"
                aria-hidden="true"
              >
                <ChevronRight className="w-5 h-5 text-accent" />
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Desktop 3x2 Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 py-4">
          {SERVICES_DATA.filter(s => !s.isSubService).map((service, idx) => (
            <ServiceCard
              key={idx}
              name={service.name}
              slug={service.slug}
              categoryLabel={service.categoryLabel}
              shortDesc={service.shortDesc}
              symptoms={service.symptoms}
              highlightedConditions={service.highlightedConditions}
              ctaText={service.ctaText}
              iconName={service.iconName}
            />
          ))}
        </div>
      )}
    </div>
  );
}
