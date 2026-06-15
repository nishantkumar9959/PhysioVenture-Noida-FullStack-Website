"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, animate } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES_DATA, ServiceDetail } from "@/lib/services-data";

function getHomeCategories(service: ServiceDetail): string[] {
  const slug = service.slug;
  if (slug === "orthopedic-rehabilitation") {
    return ["back", "joint"];
  }
  if (slug === "neurological-rehabilitation") {
    return ["neuro"];
  }
  if (slug === "sports-injury-rehabilitation") {
    return ["sports"];
  }
  if (slug === "home-visit-physiotherapy") {
    return ["back", "joint", "neuro", "sports"];
  }
  if (slug === "chiropractic-manual-therapy") {
    return ["back", "joint"];
  }
  if (slug === "geriatric-rehabilitation") {
    return ["joint", "sports"];
  }
  return [];
}

function getServiceImage(slug: string): string {
  switch (slug) {
    case "orthopedic-rehabilitation":
      return "/images/service_ortho.png";
    case "neurological-rehabilitation":
      return "/images/service_neuro.png";
    case "sports-injury-rehabilitation":
      return "/images/service_sports.png";
    case "home-visit-physiotherapy":
      return "/images/service_home.png";
    case "chiropractic-manual-therapy":
      return "/images/service_chiro.png";
    case "geriatric-rehabilitation":
      return "/images/service_geriatric.png";
    default:
      return "/images/service_sports.png";
  }
}

const SYMPTOM_CATEGORIES = [
  { id: "all", name: "All Conditions" },
  { id: "back", name: "Spine & Neck" },
  { id: "joint", name: "Knee & Joint" },
  { id: "neuro", name: "Stroke & Neuro" },
  { id: "sports", name: "Sports & Balance" }
];

export default function SymptomServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Carousel Navigation Arrows State
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Category Scroll State
  const [showLeftCatFade, setShowLeftCatFade] = useState(false);
  const [showRightCatFade, setShowRightCatFade] = useState(true);
  const [hasUserScrolledCat, setHasUserScrolledCat] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const handleCategoryScroll = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
      setShowLeftCatFade(scrollLeft > 0);
      setShowRightCatFade(scrollLeft < scrollWidth - clientWidth - 2);
      
      if (scrollLeft > 5) {
        setHasUserScrolledCat(true);
      }
    }
  };

  useEffect(() => {
    handleCategoryScroll();
    window.addEventListener('resize', handleCategoryScroll);
    return () => window.removeEventListener('resize', handleCategoryScroll);
  }, []);

  // One-time onboarding scroll animation
  useEffect(() => {
    if (isMobile && !hasUserScrolledCat) {
      const timer = setTimeout(() => {
        if (categoryScrollRef.current && !hasUserScrolledCat) {
          categoryScrollRef.current.scrollBy({ left: 80, behavior: 'smooth' });
          
          setTimeout(() => {
            if (categoryScrollRef.current && !hasUserScrolledCat) {
              categoryScrollRef.current.scrollBy({ left: -80, behavior: 'smooth' });
            }
          }, 1000);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile, hasUserScrolledCat]);

  // Auto-scroll Animation State
  const x = useMotionValue(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isDraggingRef = useRef(false);

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    setIsHovered(false);
    
    let currentX = x.get();
    if (trackWidth > 0) {
      while (currentX <= -trackWidth) {
        currentX += trackWidth;
      }
      while (currentX > 0) {
        currentX -= trackWidth;
      }
      x.set(currentX);
    }
  };

  const filteredServices = useMemo(() => {
    const mainServices = SERVICES_DATA.filter(s => !s.isSubService);
    return selectedCategory === "all"
      ? mainServices
      : mainServices.filter(s => getHomeCategories(s).includes(selectedCategory));
  }, [selectedCategory]);

  const displayServices = useMemo(() => {
    const mainServices = SERVICES_DATA.filter(s => !s.isSubService);
    return selectedCategory === "all" && !prefersReducedMotion
      ? [...mainServices, ...mainServices]
      : filteredServices;
  }, [filteredServices, selectedCategory, prefersReducedMotion]);

  const checkScrollLimits = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Measure track width for infinite looping safely using ResizeObserver
  useEffect(() => {
    if (selectedCategory !== "all" || prefersReducedMotion) return;
    
    const mainServicesCount = SERVICES_DATA.filter(s => !s.isSubService).length;
    
    const updateWidth = () => {
      if (trackRef.current && trackRef.current.children.length > mainServicesCount) {
        const firstCard = trackRef.current.children[0] as HTMLElement;
        const middleCard = trackRef.current.children[mainServicesCount] as HTMLElement;
        
        const firstRect = firstCard.getBoundingClientRect();
        const middleRect = middleCard.getBoundingClientRect();
        
        setTrackWidth(middleRect.left - firstRect.left);
      }
    };

    // Run initial measurement
    updateWidth();

    // Use ResizeObserver to monitor layout updates (images loading, responsive scaling)
    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    window.addEventListener("resize", updateWidth);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, [selectedCategory, prefersReducedMotion]);

  // Continuous loop animation
  useAnimationFrame((t, delta) => {
    if (selectedCategory !== "all" || prefersReducedMotion || isDraggingRef.current || isHovered || trackWidth === 0) return;
    
    // Calibrate speed: 35 seconds for desktop, 40 seconds for mobile (fast & dynamic)
    const loopDuration = isMobile ? 40000 : 35000;
    const moveBy = (trackWidth / loopDuration) * delta;
    let newX = x.get() - moveBy;
    
    if (trackWidth > 0) {
      while (newX <= -trackWidth) {
        newX += trackWidth;
      }
    }
    x.set(newX);
  });

  // Run limit check on resize, scroll, or category change
  useEffect(() => {
    if (selectedCategory !== "all") {
      checkScrollLimits();
      window.addEventListener("resize", checkScrollLimits);
      return () => window.removeEventListener("resize", checkScrollLimits);
    }
  }, [filteredServices, selectedCategory]);

  const scroll = (direction: "left" | "right") => {
    if (selectedCategory === "all" && !prefersReducedMotion) {
      if (!trackRef.current) return;
      const shiftAmount = trackRef.current.clientWidth * 0.85;
      const shift = direction === "left" ? shiftAmount : -shiftAmount;
      let newX = x.get() + shift;
      if (newX <= -trackWidth) newX += trackWidth;
      if (newX > 0) newX -= trackWidth;
      animate(x, newX, { type: "tween", duration: 0.5, ease: "easeOut" });
    } else if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.85;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 w-full">
        <div className="text-left max-w-2xl flex flex-col gap-3">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-primary">
            Find the Right Treatment for Your Pain
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Select a target body region or recovery type to discover specialized physical therapy plans designed to restore function.
          </p>
        </div>
      </div>

      {/* Selector Tabs with Layout-Level Chevron */}
      <div className="flex items-center w-full md:w-fit mb-8 gap-2">
        <div 
          ref={categoryScrollRef}
          onScroll={handleCategoryScroll}
          className="flex-1 flex flex-row overflow-x-auto md:flex-wrap scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-2 bg-secondary/30 p-1.5 rounded-2xl md:rounded-full border border-border/30 whitespace-nowrap min-w-0"
        >
          {SYMPTOM_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`snap-start shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 outline-none ${
                selectedCategory === cat.id
                  ? "bg-primary text-white shadow-xs"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Explicit Un-overlapped Chevron Indicator (Mobile Only) */}
        <div className={`w-6 shrink-0 flex items-center justify-center md:hidden transition-opacity duration-300 ${showRightCatFade ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
           <ChevronRight className="w-6 h-6 text-primary animate-pulse" />
        </div>
      </div>

      {/* Horizontal Scroll Services Container */}
      <div className="relative w-full group/slider overflow-hidden">
        {/* Left Arrow Button */}
        {(canScrollLeft || selectedCategory === "all") && (
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-border bg-background/95 backdrop-blur-xs items-center justify-center text-primary shadow-md hover:bg-secondary hover:text-accent hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 outline-none"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {selectedCategory === "all" && !prefersReducedMotion ? (
          <motion.div 
            ref={trackRef}
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -trackWidth, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => {
              isDraggingRef.current = true;
              setIsHovered(true);
            }}
            onDragEnd={handleDragEnd}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              if (!isDraggingRef.current) {
                setIsHovered(false);
              }
            }}
            onFocusCapture={() => setIsHovered(true)}
            onBlurCapture={() => setIsHovered(false)}
            className="flex flex-row gap-3 md:gap-6 py-3 w-full cursor-grab active:cursor-grabbing"
          >
            {displayServices.map((service, idx) => (
              <Link
                key={idx}
                href={`/services/${service.slug}/`}
                className="group relative flex flex-col justify-between h-[310px] sm:h-[335px] md:h-auto md:aspect-square overflow-hidden border border-border/40 bg-card rounded-2xl transition-all duration-500 ease-out hover:shadow-md md:hover:shadow-lg lg:hover:shadow-xl hover:translate-y-0 hover:scale-100 md:hover:-translate-y-[3px] md:hover:scale-[1.005] lg:hover:-translate-y-[5px] lg:hover:scale-[1.01] transform-gpu w-[82vw] md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] shrink-0 snap-start outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                <div className="relative z-20 p-3 md:p-6 pb-2 md:pb-3 text-left">
                  <h3 className="text-lg leading-tight md:leading-snug font-extrabold group-hover:text-accent transition-colors duration-200 line-clamp-3 md:line-clamp-2 text-primary">
                    {service.name}
                  </h3>
                  <p className="line-clamp-2 md:line-clamp-3 text-xs leading-relaxed mt-2 font-medium text-muted-foreground/90">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="absolute inset-x-0 top-[28%] bottom-0 w-full overflow-hidden z-10 pointer-events-none">
                  <Image
                    src={getServiceImage(service.slug)}
                    alt={`Physiotherapy treatment for ${service.name}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 ease-out transform-gpu group-hover:scale-100 md:group-hover:scale-[1.015] lg:group-hover:scale-[1.025]"
                  />
                </div>

                <div
                  className="absolute inset-0 z-[15] rounded-2xl pointer-events-none"
                  style={{
                    background: `linear-gradient(
                      to bottom,
                      hsl(var(--card)) 0%,
                      hsl(var(--card)) 24%,
                      hsl(var(--card) / 0.98) 27%,
                      hsl(var(--card) / 0.95) 29%,
                      hsl(var(--card) / 0.88) 32%,
                      hsl(var(--card) / 0.7) 36%,
                      hsl(var(--card) / 0.45) 41%,
                      hsl(var(--card) / 0.2) 47%,
                      hsl(var(--card) / 0.05) 54%,
                      hsl(var(--card) / 0) 65%
                    )`
                  }}
                />

                <div className="p-3 md:p-6 pt-0 pb-3 md:pb-6 flex flex-col mt-auto w-full relative z-20 pointer-events-none">
                  <div className="flex items-center justify-start w-full">
                    <div
                      className="w-8 h-8 rounded-full bg-white dark:bg-secondary shadow-md flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300"
                      aria-hidden="true"
                    >
                      <ArrowRight className="w-4.5 h-4.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        ) : (
          <div 
            ref={scrollRef}
            onScroll={checkScrollLimits}
            className="flex flex-row gap-3 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-3 scrollbar-none w-full"
          >
            {filteredServices.map((service, idx) => (
              <Link
                key={idx}
                href={`/services/${service.slug}/`}
                className="group relative flex flex-col justify-between h-[310px] sm:h-[335px] md:h-auto md:aspect-square overflow-hidden border border-border/40 bg-card rounded-2xl transition-all duration-500 ease-out hover:shadow-md md:hover:shadow-lg lg:hover:shadow-xl hover:translate-y-0 hover:scale-100 md:hover:-translate-y-[3px] md:hover:scale-[1.005] lg:hover:-translate-y-[5px] lg:hover:scale-[1.01] transform-gpu w-[82vw] md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] shrink-0 snap-start outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                <div className="relative z-20 p-3 md:p-6 pb-2 md:pb-3 text-left">
                  <h3 className="text-lg leading-tight md:leading-snug font-extrabold group-hover:text-accent transition-colors duration-200 line-clamp-3 md:line-clamp-2 text-primary">
                    {service.name}
                  </h3>
                  <p className="line-clamp-2 md:line-clamp-3 text-xs leading-relaxed mt-2 font-medium text-muted-foreground/90">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="absolute inset-x-0 top-[28%] bottom-0 w-full overflow-hidden z-10 pointer-events-none">
                  <Image
                    src={getServiceImage(service.slug)}
                    alt={`Physiotherapy treatment for ${service.name}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 ease-out transform-gpu group-hover:scale-100 md:group-hover:scale-[1.015] lg:group-hover:scale-[1.025]"
                  />
                </div>

                <div
                  className="absolute inset-0 z-[15] rounded-2xl pointer-events-none"
                  style={{
                    background: `linear-gradient(
                      to bottom,
                      hsl(var(--card)) 0%,
                      hsl(var(--card)) 24%,
                      hsl(var(--card) / 0.98) 27%,
                      hsl(var(--card) / 0.95) 29%,
                      hsl(var(--card) / 0.88) 32%,
                      hsl(var(--card) / 0.7) 36%,
                      hsl(var(--card) / 0.45) 41%,
                      hsl(var(--card) / 0.2) 47%,
                      hsl(var(--card) / 0.05) 54%,
                      hsl(var(--card) / 0) 65%
                    )`
                  }}
                />

                <div className="p-3 md:p-6 pt-0 pb-3 md:pb-6 flex flex-col mt-auto w-full relative z-20 pointer-events-none">
                  <div className="flex items-center justify-start w-full">
                    <div
                      className="w-8 h-8 rounded-full bg-white dark:bg-secondary shadow-md flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300"
                      aria-hidden="true"
                    >
                      <ArrowRight className="w-4.5 h-4.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Right Arrow Button */}
        {(canScrollRight || selectedCategory === "all") && (
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-border bg-background/95 backdrop-blur-xs items-center justify-center text-primary shadow-md hover:bg-secondary hover:text-accent hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 outline-none"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Faded edges to indicate scroll track depth on overflow */}
        <div className={`absolute top-3 bottom-3 left-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10 transition-opacity duration-300 ${canScrollLeft || selectedCategory === "all" ? "opacity-0 sm:opacity-100" : "opacity-0"}`} />
        <div className={`absolute top-3 bottom-3 right-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 transition-opacity duration-300 ${canScrollRight || selectedCategory === "all" ? "opacity-0 sm:opacity-100" : "opacity-0"}`} />
      </div>

      <div className="w-full flex justify-center mt-6">
        <Button variant="outline" size="md" asChild>
          <Link href="/services/">View All Specialized Services</Link>
        </Button>
      </div>
    </section>
  );
}
