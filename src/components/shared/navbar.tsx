"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services/" },
  { name: "About", href: "/about/" },
  { name: "Testimonials", href: "/testimonials/" },
  { name: "Blogs", href: "/blogs/" },
  { name: "Contact", href: "/contact/" },
];

const SERVICES_DROPDOWN_DATA = [
  {
    category: "Orthopaedic Rehabilitation",
    services: [
      { name: "Back Pain Treatment", href: "/services/back-pain-treatment/" },
      { name: "Knee Pain Treatment", href: "/services/knee-pain-treatment/" },
      { name: "Shoulder Pain Treatment", href: "/services/frozen-shoulder-treatment/" },
      { name: "Elbow Pain Treatment", href: "/services/tennis-elbow-rehabilitation/" },
      { name: "Hip Pain Treatment", href: "/services/orthopedic-rehabilitation/" },
      { name: "Wrist Pain Treatment", href: "/services/orthopedic-rehabilitation/" },
      { name: "Foot Pain Treatment", href: "/services/orthopedic-rehabilitation/" },
      { name: "Muscle Pain Treatment", href: "/services/orthopedic-rehabilitation/" },
      { name: "Neck Pain Treatment", href: "/services/cervical-spondylitis-treatment/" },
      { name: "Post-Accident Rehabilitation", href: "/services/orthopedic-rehabilitation/" },
      { name: "Frozen Shoulder Treatment", href: "/services/frozen-shoulder-treatment/" },
      { name: "Osteoarthritis Treatment", href: "/services/knee-pain-treatment/" },
      { name: "Carpal Tunnel Syndrome Treatment", href: "/services/orthopedic-rehabilitation/" },
      { name: "Sciatica Treatment", href: "/services/sciatica-pain-treatment/" },
      { name: "Slip Disc Treatment", href: "/services/slip-disc-treatment/" },
      { name: "Cervical Spondylitis Treatment", href: "/services/cervical-spondylitis-treatment/" },
    ],
  },
  {
    category: "Neurological Rehabilitation",
    services: [
      { name: "Stroke Rehabilitation", href: "/services/stroke-rehabilitation/" },
      { name: "Parkinson's Treatment", href: "/services/parkinsons-rehabilitation/" },
      { name: "Alzheimer's Treatment", href: "/services/neurological-rehabilitation/" },
      { name: "Spinal Cord Injury Rehabilitation", href: "/services/spinal-cord-injury-rehabilitation/" },
      { name: "Diabetic Neuropathy Treatment", href: "/services/neurological-rehabilitation/" },
      { name: "Myasthenia Gravis Treatment", href: "/services/neurological-rehabilitation/" },
      { name: "Meningitis Rehabilitation", href: "/services/neurological-rehabilitation/" },
      { name: "Encephalitis Treatment", href: "/services/neurological-rehabilitation/" },
      { name: "Paralysis Treatment", href: "/services/paralysis-rehabilitation/" },
    ],
  },
  {
    category: "Sports Injury Rehabilitation",
    services: [
      { name: "ACL Injury Rehabilitation", href: "/services/acl-rehabilitation/" },
      { name: "MCL Injury Rehabilitation", href: "/services/sports-injury-rehabilitation/" },
      { name: "PCL Injury Rehabilitation", href: "/services/sports-injury-rehabilitation/" },
      { name: "Golfer's Elbow Treatment", href: "/services/tennis-elbow-rehabilitation/" },
      { name: "Tennis Elbow Treatment", href: "/services/tennis-elbow-rehabilitation/" },
      { name: "Ligament Injury Rehabilitation", href: "/services/sports-injury-rehabilitation/" },
      { name: "Meniscus Injury Rehabilitation", href: "/services/sports-injury-rehabilitation/" },
      { name: "Patella Mobilization Therapy", href: "/services/sports-injury-rehabilitation/" },
      { name: "Sprain Rehabilitation", href: "/services/sports-injury-rehabilitation/" },
      { name: "Strain Rehabilitation", href: "/services/sports-injury-rehabilitation/" },
      { name: "Muscle Spasm Treatment", href: "/services/sports-injury-rehabilitation/" },
      { name: "Muscle Stiffness Treatment", href: "/services/sports-injury-rehabilitation/" },
    ],
  },
];

const FOOTER_PILLS = [
  { text: "Chiropractor Treatment — Spine & Joints", href: "/services/chiropractic-manual-therapy/" },
  { text: "Home Visit — All Treatments", href: "/services/home-visit-physiotherapy/" },
  { text: "Geriatric / Old Age Care", href: "/services/geriatric-rehabilitation/" },
];


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const triggerRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Reset mobile accordion when mobile menu closes
  useEffect(() => {
    if (!isOpen) {
      setIsMobileServicesOpen(false);
    }
  }, [isOpen]);

  // Click outside to close desktop Services dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isServicesOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isServicesOpen]);

  // Throttled scroll listener via requestAnimationFrame
  // Hides navbar on scroll down, reveals on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const diff = currentScrollY - lastScrollY.current;

          // Mark as scrolled past threshold for compact styling
          setScrolled(currentScrollY > 20);

          // Hide on scroll down (after 80px), show on scroll up
          if (currentScrollY > 80) {
            if (diff > 4) {
              setHidden(true);
              setIsOpen(false);
            } else if (diff < -4) {
              setHidden(false);
            }
          } else {
            setHidden(false);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Computed active link for navbar styling (mutually exclusive)
  const getActiveLink = () => {
    if (pathname === "/") return "/";
    if (pathname === "/services/" || pathname.startsWith("/services/")) return "/services/";
    if (pathname === "/about/" || pathname.startsWith("/about/")) return "/about/";
    if (pathname === "/testimonials/" || pathname.startsWith("/testimonials/")) return "/testimonials/";
    if (pathname === "/blogs/" || pathname.startsWith("/blogs/")) return "/blogs/";
    if (pathname === "/contact/" || pathname.startsWith("/contact/")) return "/contact/";
    return null;
  };

  const activeLink = getActiveLink();

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full bg-white dark:bg-background border-b border-border/80 shadow-xs",
        scrolled ? "py-2.5" : "py-4",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 md:w-11 md:h-11 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/Media_Assets/images/logo.png"
                alt="PhysioVenture Logo"
                fill
                sizes="(max-width: 768px) 40px, 44px"
                className="object-contain"
                priority
              />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-primary">
              Physio<span className="text-accent">Venture</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5 lg:gap-6 xl:gap-8 h-full">
            {navLinks.map((link) => {
              if (link.name === "Services") {
                return (
                  <div
                    key={link.name}
                    className="relative flex items-center h-full"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setIsServicesOpen(false);
                        triggerRef.current?.focus();
                      }
                    }}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setIsServicesOpen(false);
                      }
                    }}
                  >
                    <Link
                      ref={triggerRef as any}
                      href={link.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-accent duration-200 py-4 flex items-center gap-1 focus:outline-none focus:text-accent",
                        activeLink === link.href || isServicesOpen ? "text-accent font-semibold" : "text-muted-foreground"
                      )}
                      aria-haspopup="true"
                      aria-expanded={isServicesOpen}
                      aria-controls="services-mega-menu"
                      onFocus={() => setIsServicesOpen(true)}
                    >
                      {link.name}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isServicesOpen ? "rotate-180 text-accent" : "text-muted-foreground group-hover:text-accent"
                        )}
                      />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <div
                      id="services-mega-menu"
                      ref={dropdownRef}
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white dark:bg-card border border-border rounded-2xl shadow-xl p-6 z-50 transition-all duration-150 ease-in-out text-left",
                        isServicesOpen
                          ? "opacity-100 translate-y-2 pointer-events-auto visible"
                          : "opacity-0 translate-y-0 pointer-events-none invisible"
                      )}
                    >
                      <div className="grid grid-cols-3 gap-6">
                        {SERVICES_DROPDOWN_DATA.map((cat, idx) => (
                          <div key={idx} className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#1B4D3E] dark:text-accent mb-3 block">
                              {cat.category}
                            </span>
                            <ul className="space-y-2">
                              {cat.services.map((service, sIdx) => (
                                <li key={sIdx}>
                                  <Link
                                    href={service.href}
                                    className="text-[13px] text-muted-foreground hover:text-accent dark:hover:text-accent font-medium leading-normal transition-colors block py-0.5"
                                    onClick={() => setIsServicesOpen(false)}
                                  >
                                    {service.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Footer Row */}
                      <div className="mt-6 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-2">
                        {FOOTER_PILLS.map((pill, pIdx) => (
                          <Link
                            key={pIdx}
                            href={pill.href}
                            className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-[#E8F5F0] dark:bg-secondary/40 text-[#1B4D3E] dark:text-accent hover:opacity-90 transition-opacity"
                            onClick={() => setIsServicesOpen(false)}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1B4D3E] dark:bg-accent mr-2 shrink-0" />
                            {pill.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-accent duration-200 py-4",
                    activeLink === link.href ? "text-accent font-semibold" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/book/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary text-white hover:bg-accent hover:text-primary transition-all duration-300 shadow-sm"
            >
              <Calendar className="w-[18px] h-[18px] shrink-0" />
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">Toggle main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Click-outside overlay to close mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-[56px] bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-300 ease-in-out z-40 overflow-y-auto",
          isOpen ? "max-h-[calc(100vh-60px)] opacity-100 py-4" : "max-h-0 opacity-0 pointer-events-none"
        )}
        id="mobile-menu"
        aria-hidden={!isOpen}
      >
        <div className="px-4">
          <ul className="space-y-3" role="list">
            {navLinks.map((link) => {
              if (link.name === "Services") {
                return (
                  <li key={link.name} className="flex flex-col">
                    <button
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                      className={cn(
                        "flex w-full items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-colors text-left focus:outline-none",
                        activeLink === link.href
                          ? "bg-secondary text-accent font-semibold"
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-primary"
                      )}
                      aria-expanded={isMobileServicesOpen}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isMobileServicesOpen ? "rotate-180 text-accent" : "text-muted-foreground"
                        )}
                      />
                    </button>

                    {/* Accordion Content */}
                    <div
                      className={cn(
                        "transition-all duration-300 ease-in-out overflow-hidden pl-4 pr-2",
                        isMobileServicesOpen ? "max-h-[2000px] opacity-100 py-2 mt-1" : "max-h-0 opacity-0 pointer-events-none"
                      )}
                    >
                      <div className="space-y-4">
                        {SERVICES_DROPDOWN_DATA.map((cat, idx) => (
                          <div key={idx} className="flex flex-col">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B4D3E] dark:text-accent mb-2">
                              {cat.category}
                            </span>
                            <ul className="space-y-1.5 pl-2 border-l border-border/80">
                              {cat.services.map((service, sIdx) => (
                                <li key={sIdx}>
                                  <Link
                                    href={service.href}
                                    onClick={() => {
                                      setIsMobileServicesOpen(false);
                                      setIsOpen(false);
                                    }}
                                    className="block py-1 text-sm text-muted-foreground hover:text-accent"
                                  >
                                    {service.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        {/* Special Mobile Services */}
                        <div className="pt-3 border-t border-border/60 flex flex-col gap-2">
                          <Link
                            href="/services/chiropractic-manual-therapy/"
                            onClick={() => {
                              setIsMobileServicesOpen(false);
                              setIsOpen(false);
                            }}
                            className="flex items-center px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#E8F5F0] dark:bg-secondary/40 text-[#1B4D3E] dark:text-accent hover:opacity-90 w-fit"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1B4D3E] dark:bg-accent mr-2 shrink-0" />
                            Chiropractor Treatment — Spine & Joints
                          </Link>
                          <Link
                            href="/services/home-visit-physiotherapy/"
                            onClick={() => {
                              setIsMobileServicesOpen(false);
                              setIsOpen(false);
                            }}
                            className="flex items-center px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#E8F5F0] dark:bg-secondary/40 text-[#1B4D3E] dark:text-accent hover:opacity-90 w-fit"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1B4D3E] dark:bg-accent mr-2 shrink-0" />
                            Home Visit — All Treatments Available
                          </Link>
                          <Link
                            href="/services/geriatric-rehabilitation/"
                            onClick={() => {
                              setIsMobileServicesOpen(false);
                              setIsOpen(false);
                            }}
                            className="flex items-center px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#E8F5F0] dark:bg-secondary/40 text-[#1B4D3E] dark:text-accent hover:opacity-90 w-fit"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1B4D3E] dark:bg-accent mr-2 shrink-0" />
                            Geriatric /old age care
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-3 py-2.5 rounded-lg text-base font-medium transition-colors",
                      activeLink === link.href
                        ? "bg-secondary text-accent font-semibold"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="pt-2">
            <Link
              href="/book/"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 py-3 rounded-full text-base font-semibold bg-primary text-white hover:bg-accent hover:text-primary transition-colors"
            >
              <Calendar className="w-[18px] h-[18px] shrink-0" />
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
