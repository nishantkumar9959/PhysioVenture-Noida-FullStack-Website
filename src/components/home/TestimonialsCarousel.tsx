"use client";

import { useEffect, useRef, useState } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const exactScrollLeft = useRef<number>(0);
  const [isInteracting, setIsInteracting] = useState(false);

  // Duplicate testimonials to create a seamless infinite loop effect
  const loopItems = [...testimonials, ...testimonials];

  // Auto-scroller for mobile native swipe container
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isInteracting) return;

    // Sync exact value with current DOM state in case user manually swiped
    exactScrollLeft.current = el.scrollLeft;

    let animationFrameId: number;
    let lastTime = performance.now();
    
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      // Only run if the frame delta is reasonable (avoids huge jumps on tab switch)
      if (delta < 100) {
        // The container has `pr-4` which exactly replicates the gap for the end,
        // so `scrollWidth / 2` is perfectly the width of one cycle.
        const halfWidth = el.scrollWidth / 2;
        
        // 30 seconds (30000ms) for one full cycle
        const speed = halfWidth / 30000; 
        
        exactScrollLeft.current += speed * delta;
        
        if (exactScrollLeft.current >= halfWidth) {
          exactScrollLeft.current -= halfWidth;
        }
        
        el.scrollLeft = exactScrollLeft.current;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteracting]);

  const handleInteractStart = () => {
    setIsInteracting(true);
  };

  const handleInteractEnd = () => {
    setIsInteracting(false);
  };

  return (
    <div className="w-full relative py-4 group">
      
      {/* ── Desktop: Infinite Marquee Container (Pauses on Hover) ── */}
      <div className="hidden md:flex overflow-hidden relative w-full">
        <div
          className="flex items-stretch gap-4 w-max hover:[animation-play-state:paused]"
          style={{
            animation: `infiniteSlide 30s linear infinite`,
          }}
        >
          {loopItems.map((t, idx) => (
            <div
              key={`desktop-${idx}`}
              className="w-[calc((100vw-4rem)/2)] lg:w-[calc((min(100vw,80rem)-6rem)/3)] shrink-0 bg-card border border-border/30 shadow-sm rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 cursor-default"
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

        {/* Fade Overlays for seamless blending at edges (Desktop) */}
        <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-secondary/60 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-secondary/60 to-transparent pointer-events-none" />
      </div>

      {/* ── Mobile: Native Swipeable Container with JS Auto-Scroll ── */}
      <div 
        ref={scrollRef}
        className="md:hidden flex overflow-x-auto gap-4 pb-4 pt-2 -mx-4 px-4 pr-4 w-[calc(100%+2rem)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x"
        onTouchStart={handleInteractStart}
        onTouchEnd={handleInteractEnd}
      >
        {loopItems.map((t, idx) => (
          <div
            key={`mobile-${idx}`}
            className="w-[85vw] shrink-0 bg-card border border-border/30 shadow-sm rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden transition-all duration-300"
          >
            <span className="absolute right-4 top-2 text-7xl font-display font-extrabold text-accent/8 select-none leading-none pointer-events-none">
              ❝
            </span>

            <div className="flex items-center gap-0.5">
              {[...Array(t.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-sm"
                />
              ))}
            </div>

            <p className="text-xs italic text-muted-foreground leading-relaxed flex-1 relative z-10">
              &ldquo;{t.quote}&rdquo;
            </p>

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
      `}</style>
    </div>
  );
}


