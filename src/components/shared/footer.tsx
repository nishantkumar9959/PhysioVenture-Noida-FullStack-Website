"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border mt-auto" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-white p-1.5 sm:p-2 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/10 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center shrink-0">
                <div className="relative w-7 h-7 sm:w-8 sm:h-8">
                  <Image
                    src="/images/logo.png"
                    alt="PhysioVenture Logo"
                    fill
                    sizes="(max-width: 768px) 28px, 32px"
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                Physio<span className="text-accent">Venture</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Premium Neurological &amp; Orthopaedic physical rehabilitation clinic in Noida. 7+ years of expert care delivered at our modern facility or directly in your home.
            </p>
            <div className="flex space-y-2 flex-col pt-2 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span>{BUSINESS.hoursShort}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wide text-sm uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/services/" className="hover:text-accent transition-colors">Physiotherapy Services</Link>
              </li>
              <li>
                <Link href="/about/" className="hover:text-accent transition-colors">About Founder &amp; Clinic</Link>
              </li>
              <li>
                <Link href="/contact/" className="hover:text-accent transition-colors">Contact &amp; Location</Link>
              </li>
              <li>
                <Link href="/book/" className="hover:text-accent transition-colors">Book Appointment</Link>
              </li>
            </ul>
          </div>

          {/* Top Services */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wide text-sm uppercase mb-4">
              Rehab Services
            </h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="/services/neurological-rehabilitation/" className="hover:text-accent transition-colors">Neurological Rehabilitation</Link>
              </li>
              <li>
                <Link href="/services/orthopedic-rehabilitation/" className="hover:text-accent transition-colors">Orthopedic Rehabilitation</Link>
              </li>
              <li>
                <Link href="/services/sports-injury-rehabilitation/" className="hover:text-accent transition-colors">Sports Injury Rehab</Link>
              </li>
              <li>
                <Link href="/services/home-visit-physiotherapy/" className="hover:text-accent transition-colors">Home Visit Physiotherapy</Link>
              </li>
              <li>
                <Link href="/services/chiropractic-manual-therapy/" className="hover:text-accent transition-colors">Chiropractic &amp; Manual Therapy</Link>
              </li>
              <li>
                <Link href="/services/geriatric-rehabilitation/" className="hover:text-accent transition-colors">Geriatric Rehabilitation</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-white tracking-wide text-sm uppercase mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">

              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href={`tel:${BUSINESS.phone}`} className="hover:text-accent transition-colors">
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-accent transition-colors">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/15 my-10" />

        {/* Disclaimer and Copyright */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-1 max-w-xl">
            <p className="text-xs text-primary-foreground/60 leading-relaxed">
              <strong>Medical Disclaimer:</strong> The content on this website is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physiotherapist or primary healthcare provider with any questions regarding a medical condition.
            </p>
            <p className="text-xs text-primary-foreground/60">
              &copy; {new Date().getFullYear()} PhysioVenture. All rights reserved.
            </p>
          </div>
          <div className="text-xs text-primary-foreground/60 flex gap-4">
            <Link href="/privacy/" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms/" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>

        {/* Developer Attribution */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50 space-y-1">
          <div>Designed &amp; Developed by</div>
          <div className="text-base font-bold text-white tracking-wide">N16 WebStudio</div>
        </div>
      </div>
    </footer>
  );
}
