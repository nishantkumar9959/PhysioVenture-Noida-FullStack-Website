"use client";

import { useState } from "react";
import Image from "next/image";

const TESTIMONIAL_IMAGES = [
  "/Media_Assets/testimonials/Physiotherapy-Noida-for-Neckpain.jpg",
  "/Media_Assets/testimonials/Physiotherapy-in-Noida-for-vertigo.jpg",
  "/Media_Assets/testimonials/cupping.jpeg",
  "/Media_Assets/testimonials/needling.jpeg",
  "/Media_Assets/testimonials/physiotherapy-Noida-back-pain.jpg",
  "/Media_Assets/testimonials/physiotherapy-Noida-for-Lower-Back-Pain.jpg",
  "/Media_Assets/testimonials/physiotherapy-Noida-services-at-home-294x300.jpg",
  "/Media_Assets/testimonials/physiotherapy-noida-for-frozen-shoulder.jpg",
  "/Media_Assets/testimonials/therapy103.jpeg",
  "/Media_Assets/testimonials/therapy104.jpeg",
  "/Media_Assets/testimonials/therapy105.jpeg",
  "/Media_Assets/testimonials/therapy106.jpeg",
  "/Media_Assets/testimonials/therapy107.jpeg",
  "/Media_Assets/testimonials/therapy108.jpeg",
  "/Media_Assets/testimonials/therapy109.jpeg"
];

export default function TestimonialsCarousel() {
  const [isTouched, setIsTouched] = useState(false);

  // Duplicate testimonials to create a seamless infinite loop effect
  const loopItems = [...TESTIMONIAL_IMAGES, ...TESTIMONIAL_IMAGES];

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
          {loopItems.map((imgSrc, idx) => (
            <div
              key={idx}
              className="w-[280px] sm:w-[320px] aspect-[4/3] shrink-0 bg-neutral-900 border border-border/30 shadow-sm rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:-translate-y-1 cursor-default"
            >
              {/* Blurred background image to fill letterbox space */}
              <div className="absolute inset-0 z-0 opacity-30 blur-md scale-110 pointer-events-none">
                <Image
                  src={imgSrc}
                  alt=""
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>

              {/* Main contained image */}
              <div className="absolute inset-0 z-10 flex items-center justify-center p-1">
                <Image
                  src={imgSrc}
                  alt={`Testimonial image ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 280px, 320px"
                  className="object-contain"
                />
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
