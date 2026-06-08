"use client";

import { useState } from "react";
import { Star, Home as HomeIcon, MapPin } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  condition: string;
  quote: string;
  rating: number;
  type: "Home Visit" | "Clinic Visit";
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const [isTouched, setIsTouched] = useState(false);

  // Duplicate testimonials to create a seamless infinite loop effect
  const loopItems = [...testimonials, ...testimonials];

  return (
    <div className="w-full relative py-4 group overflow-hidden">
      
      {/* ── Unified Infinite Marquee Container (Pauses on Hover/Touch) ── */}
      <div 
        className="flex overflow-hidden relative w-full -mx-4 px-4 sm:mx-0 sm:px-0"
        onTouchStart={() => setIsTouched(true)}
        onTouchEnd={() => setIsTouched(false)}
        onTouchCancel={() => setIsTouched(false)}
      >
        <div
          className="flex items-stretch gap-4 w-max testimonials-marquee-track"
          style={{
            animation: `infiniteSlide 25s linear infinite`,
            animationPlayState: isTouched ? "paused" : undefined,
          }}
        >
          {loopItems.map((t, idx) => (
            <div
              key={idx}
              className="w-[85vw] md:w-[calc((100vw-4rem)/2)] lg:w-[calc((min(100vw,80rem)-6rem)/3)] shrink-0 bg-card border border-border/30 shadow-sm rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 cursor-default"
            >
              {/* Decorative quote glyph */}
              <span className="absolute right-4 top-2 text-7xl font-display font-extrabold text-accent/8 select-none leading-none pointer-events-none">
                ❝
              </span>

              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-sm"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs italic text-muted-foreground leading-relaxed flex-1 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Footer */}
              <div className="border-t border-border/30 pt-3 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">{t.name}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary/80 text-primary border border-primary/5">
                    {t.type === "Home Visit" ? (
                      <>
                        <HomeIcon className="w-3 h-3 text-accent shrink-0" /> Home
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3 h-3 text-accent shrink-0" /> Clinic
                      </>
                    )}
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {t.role} · {t.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Fade Overlays for seamless blending at edges */}
        <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-secondary/30 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-secondary/30 to-transparent pointer-events-none" />
      </div>

      <style>{`

        @keyframes infiniteSlide {
          from {
            transform: translateX(0);
          }
          to {
            /* Shift by exactly half the width. Since there are 2N items with gap-4 (1rem),
               half width = 50% + 0.5rem (half a gap) */
            transform: translateX(calc(-50% - 0.5rem));
          }
        }
        @media (hover: hover) {
          .testimonials-marquee-track:hover {
            animation-play-state: paused !important;
          }
        }
      `}</style>
    </div>
  );
}


