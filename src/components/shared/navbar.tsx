"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, ChevronDown, ChevronRight, Activity, Brain, Trophy, Hand, Users, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES_DATA } from "@/lib/services-data";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services/" },
  { name: "About", href: "/about/" },
  { name: "Testimonials", href: "/testimonials/" },
  { name: "Blogs", href: "/blogs/" },
  { name: "Contact", href: "/contact/" },
];

const serviceCategories = [
  { id: "ortho", label: "Orthopaedic & Spine Care", icon: Activity },
  { id: "neuro", label: "Neurological & Stroke Care", icon: Brain },
  { id: "sports", label: "Sports & Performance Rehab", icon: Trophy },
  { id: "home", label: "In-Home Care", icon: Home },
  { id: "chiro", label: "Spine Alignment & Hands-on", icon: Hand },
  { id: "geriatric", label: "Senior Care", icon: Users },
];
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedNav, setExpandedNav] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

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
    if (!isOpen) {
      // Reset accordions when mobile menu is closed
      setExpandedNav(null);
      setExpandedCategory(null);
    }
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
          <div className="hidden md:flex items-center gap-5 lg:gap-6 xl:gap-8 h-full">
            {navLinks.map((link) => {
              if (link.name === "Services") {
                return (
                  <div key={link.name} className="relative group/nav-item flex items-center h-full">
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent duration-200 py-4",
                        activeLink === link.href ? "text-accent font-semibold" : "text-muted-foreground"
                      )}
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover/nav-item:rotate-180" />
                    </Link>
                    
                    {/* Primary Dropdown */}
                    <div className="absolute top-full -left-4 pt-2 opacity-0 invisible group-hover/nav-item:opacity-100 group-hover/nav-item:visible transition-all duration-300 z-50">
                      <div className="bg-white dark:bg-card rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-border/60 p-2 flex flex-col relative w-[320px]">
                        {serviceCategories.map(category => {
                          const CategoryIcon = category.icon;
                          const categoryServices = SERVICES_DATA.filter(s => s.category === category.id);
                          
                          return (
                            <div key={category.id} className="group/category relative">
                              <Link 
                                href={`/services/#${category.id}`} 
                                className="flex items-center justify-between px-3 py-3 hover:bg-secondary/80 rounded-xl transition-all duration-200"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover/category:bg-accent/10 group-hover/category:text-accent transition-colors">
                                     <CategoryIcon className="w-4 h-4" />
                                  </div>
                                  <span className="text-[15px] font-semibold text-foreground group-hover/category:text-primary transition-colors">
                                    {category.label}
                                  </span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover/category:text-accent group-hover/category:translate-x-0.5 transition-all" />
                              </Link>

                              {/* Secondary Sub-Menu (Treatments) */}
                              <div className="absolute top-0 left-full pl-2 opacity-0 invisible group-hover/category:opacity-100 group-hover/category:visible transition-all duration-300 w-[340px]">
                                <div className="bg-white dark:bg-card rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-border/60 p-4 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-accent/5 before:to-transparent before:pointer-events-none">
                                  <div className="px-2 pb-3 mb-2 border-b border-border/50 flex items-center gap-2 relative z-10">
                                    <CategoryIcon className="w-4 h-4 text-accent" />
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                      Specific Treatments
                                    </span>
                                  </div>
                                  <div className="flex flex-col gap-1 relative z-10">
                                    {categoryServices.map(service => (
                                      <Link 
                                        key={service.slug} 
                                        href={`/services/${service.slug}`} 
                                        className="group/link flex items-center px-3 py-2.5 rounded-xl hover:bg-secondary/80 transition-all duration-200"
                                      >
                                        <span className="text-sm font-medium text-muted-foreground group-hover/link:text-foreground transition-colors">
                                          {service.name}
                                        </span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
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
          <div className="hidden md:flex items-center">
            <Link
              href="/book/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary text-white hover:bg-accent hover:text-primary transition-all duration-300 shadow-sm"
            >
              <Calendar className="w-[18px] h-[18px] shrink-0" />
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
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
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-[56px] bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-300 ease-in-out z-40 overflow-y-auto",
          isOpen ? "max-h-[calc(100vh-60px)] opacity-100 py-4" : "max-h-0 opacity-0 pointer-events-none"
        )}
        id="mobile-menu"
        aria-hidden={!isOpen}
      >
        <div className="px-4">
          <ul className="space-y-3" role="list">
            {navLinks.map((link) => {
              if (link.name === "Services") {
                const isServicesExpanded = expandedNav === "Services";
                return (
                  <li key={link.name} className="flex flex-col">
                    <button
                      onClick={() => setExpandedNav(isServicesExpanded ? null : "Services")}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-colors w-full text-left",
                        activeLink === link.href || activeLink?.startsWith("/services/")
                          ? "bg-secondary text-accent font-semibold"
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-primary"
                      )}
                    >
                      {link.name}
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform duration-300",
                          isServicesExpanded ? "rotate-180" : ""
                        )}
                      />
                    </button>
                    
                    {/* First Level Accordion (Categories) */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isServicesExpanded ? "max-h-[2000px] mt-2 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <ul className="pl-4 space-y-2 border-l-2 border-secondary ml-3">
                        {serviceCategories.map(category => {
                          const isCategoryExpanded = expandedCategory === category.id;
                          const CategoryIcon = category.icon;
                          const categoryServices = SERVICES_DATA.filter(s => s.category === category.id);
                          
                          return (
                            <li key={category.id} className="flex flex-col">
                              <button
                                onClick={() => setExpandedCategory(isCategoryExpanded ? null : category.id)}
                                className={cn(
                                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left",
                                  isCategoryExpanded ? "text-primary font-semibold bg-secondary/50" : "text-muted-foreground hover:bg-secondary/30 hover:text-foreground"
                                )}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex-shrink-0 w-6 h-6 rounded bg-primary/5 flex items-center justify-center text-primary">
                                    <CategoryIcon className="w-3.5 h-3.5" />
                                  </div>
                                  <span>{category.label}</span>
                                </div>
                                <ChevronDown
                                  className={cn(
                                    "h-4 w-4 transition-transform duration-300",
                                    isCategoryExpanded ? "rotate-180" : ""
                                  )}
                                />
                              </button>
                              
                              {/* Second Level Accordion (Treatments) */}
                              <div
                                className={cn(
                                  "overflow-hidden transition-all duration-300 ease-in-out",
                                  isCategoryExpanded ? "max-h-[1000px] mt-1 opacity-100" : "max-h-0 opacity-0"
                                )}
                              >
                                <ul className="pl-9 space-y-1 py-1">
                                  {categoryServices.map(service => (
                                    <li key={service.slug}>
                                      <Link
                                        href={`/services/${service.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-accent hover:bg-accent/5 transition-colors"
                                      >
                                        {service.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
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
