"use client";

import { useState } from "react";
import { Star, Home as HomeIcon, MapPin, CheckCircle } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  condition: string;
  quote: string;
  rating: number;
  type: "Home Visit" | "Clinic Visit";
}

interface SuccessStoriesCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

export default function SuccessStoriesCarousel({
  testimonials,
}: SuccessStoriesCarouselProps) {
  const [isTouched, setIsTouched] = useState(false);

  // Duplicate array to create a seamless infinite marquee effect
  const duplicated = [...testimonials, ...testimonials];

  return (
    <div 
      className="w-full overflow-hidden group py-4 relative"
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => setIsTouched(false)}
      onTouchCancel={() => setIsTouched(false)}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div 
        className="flex w-max ss-marquee-track"
        style={{
          animation: "marqueeLoop 30s linear infinite",
          animationPlayState: isTouched ? "paused" : undefined,
        }}
      >
        {duplicated.map((t, idx) => (
          <div
            key={idx}
            className="w-[280px] sm:w-[320px] shrink-0 mx-3 bg-card border border-border/50 rounded-2xl p-5 shadow-sm flex flex-col transition-all duration-300 hover:shadow-md hover:border-accent/40"
          >
            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-3">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote body */}
            <blockquote className="text-sm text-foreground/80 leading-relaxed italic relative z-10 mb-5 line-clamp-5 flex-1">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Author row */}
            <div className="flex flex-col gap-2 border-t border-border/40 pt-4 mt-auto">
              {/* Left: name + role */}
              <div className="flex flex-col gap-0.5">
                <span className="font-display font-bold text-primary text-sm">{t.name}</span>
                <span className="text-xs text-muted-foreground">
                  {t.role} &middot; {t.location}
                </span>
              </div>

              {/* Right: badges */}
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary/80 text-primary border border-primary/5">
                  {t.type === "Home Visit" ? (
                    <><HomeIcon className="w-3 h-3 text-accent shrink-0" /> Home</>
                  ) : (
                    <><MapPin className="w-3 h-3 text-accent shrink-0" /> Clinic</>
                  )}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent/10 text-accent border border-accent/20">
                  <CheckCircle className="w-3 h-3 shrink-0" />
                  {t.condition}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeLoop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (hover: hover) {
          .group:hover .ss-marquee-track {
            animation-play-state: paused !important;
          }
        }
      `}</style>
    </div>
  );
}
