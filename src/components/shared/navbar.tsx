"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Throttled scroll listener via requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
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
    if (pathname === "/services" || pathname.startsWith("/services/")) return "/services";
    if (pathname === "/about" || pathname.startsWith("/about/")) return "/about";
    if (pathname === "/testimonials" || pathname.startsWith("/testimonials/")) return "/testimonials";
    if (pathname === "/blogs" || pathname.startsWith("/blogs/")) return "/blogs";
    if (pathname === "/contact" || pathname.startsWith("/contact/")) return "/contact";
    return null;
  };

  const activeLink = getActiveLink();

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full bg-white dark:bg-background border-b border-border/80 shadow-xs",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 md:w-11 md:h-11 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
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
          <div className="hidden md:flex items-center gap-5 lg:gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent duration-200",
                  activeLink === link.href ? "text-accent font-semibold" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/book"
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
          "md:hidden fixed inset-x-0 top-[56px] bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-300 ease-in-out z-40 overflow-hidden",
          isOpen ? "max-h-[420px] opacity-100 py-4" : "max-h-0 opacity-0 pointer-events-none"
        )}
        id="mobile-menu"
        aria-hidden={!isOpen}
      >
        <div className="px-4">
          <ul className="space-y-3" role="list">
            {navLinks.map((link) => (
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
            ))}
          </ul>
          <div className="pt-2">
            <Link
              href="/book"
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
