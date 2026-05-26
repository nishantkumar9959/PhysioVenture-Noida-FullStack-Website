import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Terms of Service | ${BUSINESS.shortName}`,
  description: `Terms of service for ${BUSINESS.name}. Review our terms regarding physiotherapy services, appointments, and medical disclaimers.`,
  alternates: {
    canonical: "https://physioventure.vercel.app/terms",
  },
  openGraph: {
    title: `Terms of Service | ${BUSINESS.shortName}`,
    description: `Terms of service for ${BUSINESS.name}. Review our terms regarding physiotherapy services, appointments, and medical disclaimers.`,
    url: "https://physioventure.vercel.app/terms",
    type: "website",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
          <li className="text-border">/</li>
          <li className="text-primary font-medium">Terms of Service</li>
        </ol>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-primary mb-8">
        Terms of Service
      </h1>

      <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-display font-bold text-primary mb-3">1. Services</h2>
          <p>
            {BUSINESS.name} provides professional physiotherapy services including neurological rehabilitation, orthopaedic therapy, chiropractic care, sports injury treatment, and home-visit physiotherapy. Our services are delivered by qualified physiotherapists with appropriate medical credentials.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold text-primary mb-3">2. Appointments & Cancellations</h2>
          <p>
            Appointments can be booked through our website, phone, or WhatsApp. We request at least 4 hours' notice for cancellations. Repeated no-shows may result in a requirement for advance payment for future bookings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold text-primary mb-3">3. Medical Disclaimer</h2>
          <p>
            The content on this website is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physiotherapist or primary healthcare provider with any questions regarding a medical condition.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold text-primary mb-3">4. Limitation of Liability</h2>
          <p>
            While we strive to provide the highest quality physiotherapy care, individual results may vary. {BUSINESS.shortName} and its practitioners are not liable for outcomes that differ from expectations, provided services were delivered in accordance with professional medical standards.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold text-primary mb-3">5. Payment Terms</h2>
          <p>
            Payment is expected at the time of service unless alternate arrangements have been made. We accept cash, UPI, and bank transfers. Pricing for specific services is available upon request.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold text-primary mb-3">6. Intellectual Property</h2>
          <p>
            All content on this website — including text, images, logos, and design elements — is the property of {BUSINESS.name} and is protected by applicable intellectual property laws. Unauthorized reproduction or distribution is prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold text-primary mb-3">7. Contact</h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a href={`mailto:${BUSINESS.email}`} className="text-accent hover:underline font-medium">
              {BUSINESS.email}
            </a>{" "}
            or call{" "}
            <a href={`tel:${BUSINESS.phone}`} className="text-accent hover:underline font-medium">
              {BUSINESS.phoneDisplay}
            </a>.
          </p>
        </section>

        <p className="text-xs text-muted-foreground/70 pt-4 border-t border-border/40">
          Last updated: May 2026
        </p>
      </div>
    </div>
  );
}
