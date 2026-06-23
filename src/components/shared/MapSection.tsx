"use client";

import { MapPin, Phone, ExternalLink } from "lucide-react";
import { BUSINESS, LOCATION } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function MapSection() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${LOCATION.lat},${LOCATION.lng}`;
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(
    BUSINESS.whatsappMessage
  )}`;

  return (
    <section 
      className="w-full bg-card border border-border shadow-xs rounded-3xl p-6 sm:p-8 flex flex-col gap-6" 
      aria-labelledby="map-heading"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/85 border border-primary/10 w-fit mb-3">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Clinic Location</span>
          </div>
          <h2 id="map-heading" className="text-2xl sm:text-3xl font-display font-extrabold text-primary tracking-tight">
            Find Our Clinic
          </h2>
          <p className="text-muted-foreground text-sm mt-1 max-w-xl">
            {BUSINESS.address.full}
          </p>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full sm:w-auto shrink-0">
          <Button variant="primary" asChild className="w-full sm:w-auto">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              Get Directions
            </a>
          </Button>
          <div className="flex flex-col min-[360px]:flex-row gap-3 w-full sm:w-auto sm:flex-none">
            <Button variant="secondary" asChild className="w-full min-[360px]:flex-1 sm:w-auto sm:flex-none">
              <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                Call Clinic
              </a>
            </Button>
            <Button variant="outline" asChild className="w-full min-[360px]:flex-1 sm:w-auto sm:flex-none">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 hover:text-[#20ba5a] group"
              >
                <svg
                  className="w-4 h-4 shrink-0 fill-[#25D366] transition-colors duration-300 group-hover:fill-[#20ba5a]"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Map Embed Iframe */}
      <div className="rounded-2xl overflow-hidden border border-border/80 h-[350px] md:h-[450px] relative w-full shadow-inner bg-secondary/10">
        <iframe
          src={BUSINESS.mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-2xl"
          title={`${BUSINESS.name} Location Map`}
        />
      </div>
    </section>
  );
}
