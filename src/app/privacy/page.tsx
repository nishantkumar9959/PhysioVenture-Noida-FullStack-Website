import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BUSINESS.shortName}`,
  description: `Privacy policy for ${BUSINESS.name}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
          <li className="text-border">/</li>
          <li className="text-primary font-medium">Privacy Policy</li>
        </ol>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-primary mb-8">
        Privacy Policy
      </h1>

      <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-display font-bold text-primary mb-3">1. Information We Collect</h2>
          <p>
            When you use our website or book an appointment, we may collect personal information including your name, phone number, email address, and details about your medical condition or symptoms. This information is provided voluntarily through our booking and contact forms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold text-primary mb-3">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
            <li>Schedule and manage your physiotherapy appointments</li>
            <li>Communicate with you about your treatment plan</li>
            <li>Send appointment reminders and follow-up messages</li>
            <li>Improve our services and website experience</li>
            <li>Respond to your enquiries and support requests</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold text-primary mb-3">3. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information. Your data is stored securely and is only accessible to authorized personnel who need it to provide you with our physiotherapy services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold text-primary mb-3">4. Third-Party Services</h2>
          <p>
            We may use third-party services for appointment scheduling, analytics, and communication. These services have their own privacy policies. We do not sell or rent your personal information to third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold text-primary mb-3">5. Cookies</h2>
          <p>
            Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can configure your browser to refuse cookies, though this may limit some website functionality.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold text-primary mb-3">6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact us at{" "}
            <a href={`mailto:${BUSINESS.email}`} className="text-accent hover:underline font-medium">
              {BUSINESS.email}
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold text-primary mb-3">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:{" "}
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
