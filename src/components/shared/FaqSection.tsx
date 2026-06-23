"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { DOCTOR_NAME } from "@/lib/constants";

export default function FaqSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const faqItems = [
    {
      id: "faq-select-physio",
      trigger: "How to Select Best Physiotherapist for Treatment in Noida ?",
      content: `To select the best physiotherapist in Noida, verify their clinical credentials (BPT and MPT certifications), clinical experience (7+ years is standard for specialized care), patient reviews (look for high ratings such as 4.9/5 stars), and depth of expertise in neurological or orthopaedic rehabilitation. Ensure they offer both clinical visits and comprehensive home visit programs in Noida. At PhysioVenture, ${DOCTOR_NAME} (MPT Neuro) leads all sessions directly rather than delegating to junior assistants, guaranteeing personalized, high-quality rehabilitation.`,
    },
    {
      id: "faq-prescription",
      trigger: "Do I need doctor prescription for physiotherapy treatment?",
      content: "No, you do not need a doctor's prescription or reference to begin physiotherapy treatment in India. Physiotherapists are qualified direct-access healthcare professionals. You can contact PhysioVenture directly to schedule your detailed clinical assessment and begin your recovery immediately.",
    },
    {
      id: "faq-home-visit",
      trigger: "When to go for physiotherapy at home?",
      content: "In-home physiotherapy is highly recommended for patients recovering from major orthopaedic surgeries (like knee or hip replacements), individuals dealing with acute, debilitating back pain or sciatica, geriatric patients seeking balance or fall-prevention training, and neurological cases (such as stroke, Parkinson's disease, or paralysis recovery) where traveling to a clinic is difficult or unsafe.",
    },
    {
      id: "faq-home-visit-areas",
      trigger: "Which areas in Noida do you cover for home visits?",
      content: "We provide home-visit physiotherapy across all major sectors of Noida, including Sector 47, 49, 50, 51, 62, 78, 100, 137, 150, Noida Expressway, and Greater Noida West.",
    },
    {
      id: "faq-home-vs-clinic-quality",
      trigger: "Is the quality of treatment at home same as in the clinic?",
      content: "Absolutely. We bring the exact same clinical-grade portable modalities, exercise tools, and expertise, ensuring no compromise in your rehabilitation outcomes.",
    },
    {
      id: "faq-80-20-rule",
      trigger: "What is the 80 20 rule in physiotherapy?",
      content: "The 80/20 rule in physiotherapy refers to the collaborative split between therapist and patient for a successful recovery. About 20% of your progress comes from hands-on clinical sessions, manual therapy, and adjustments with the physiotherapist. The remaining 80% is driven by the patient's consistency in performing prescribed home exercises, modifying posture, and following ergonomic guidelines in their daily routine.",
    },
    {
      id: "faq-leg-pain",
      trigger: "Can physiotherapy cure leg pain?",
      content: "Yes, physiotherapy can effectively cure leg pain by identifying and treating its root cause. Whether the pain is caused by sciatic nerve compression, a muscle strain, ligament sprain, knee joint wear-and-tear (osteoarthritis), or a slip disc, targeted physical therapy uses decompression stretches, nerve flossing, manual release, and progressive strengthening to provide permanent relief.",
    },
    {
      id: "faq-paying-worth",
      trigger: "Is it worth paying for physiotherapy?",
      content: "Absolutely. Paying for physiotherapy is highly cost-effective because it resolves the underlying cause of pain instead of briefly masking symptoms with medication. Proper physical therapy improves long-term joint health, restores correct posture, speeds up post-surgical healing, and prevents future injuries, helping you avoid expensive medical bills and invasive surgeries later.",
    },
    {
      id: "faq-sessions-per-week",
      trigger: "How many physiotherapy sessions per week?",
      content: "The ideal frequency varies by condition. For acute injuries or intensive neurological rehabilitation (like stroke recovery), we typically recommend 3 to 5 sessions per week. For sub-acute recovery, maintenance, or chronic pain management, 1 to 2 sessions per week combined with a structured home exercise plan is usually sufficient.",
    },
    {
      id: "faq-safety",
      trigger: "Is physical therapy safe?",
      content: "Yes, physical therapy is exceptionally safe when conducted by a licensed and qualified physiotherapist. It is a non-invasive, drug-free approach to recovery. At PhysioVenture, every plan is tailored to the patient's individual pain levels, surgical history, and functional capacity after a comprehensive biomechanical evaluation.",
    },
    {
      id: "faq-first-session-length",
      trigger: "How long is a first physiotherapy session?",
      content: "A first physiotherapy session usually lasts 45 to 60 minutes. This includes a comprehensive physical evaluation where the therapist assesses your medical history, posture, muscle strength, joint mobility, and neurological signs, followed by a discussion of your custom recovery program and initial therapy.",
    },
    {
      id: "faq-session-duration",
      trigger: "How long per physio session?",
      content: "Standard follow-up physiotherapy sessions run for about 40 to 60 minutes. The duration is tailored dynamically based on the specific treatments required that day, such as chiropractic adjustments, dry needling, active muscle release, or supervised corrective exercises.",
    },
    {
      id: "faq-trapped-nerve",
      trigger: "Does physio help trapped nerves?",
      content: "Yes, physiotherapy helps relieve trapped or pinched nerves (such as sciatica, cervical radiculopathy, or carpal tunnel syndrome). By combining gentle spinal mobilization, nerve flossing techniques, targeted stretches, and postural strengthening, physical therapy removes the mechanical compression causing the nerve pain.",
    },
    {
      id: "faq-daily-duration",
      trigger: "How long to do physiotherapy a day?",
      content: "Under professional clinical guidance, a scheduled physiotherapy session is about 45 to 60 minutes. For your prescribed at-home exercise program, performing the targeted movements for 15 to 30 minutes once or twice a day is recommended to accelerate healing and maintain joint mobility.",
    },
    {
      id: "faq-better-than-meds",
      trigger: "Is physical therapy better than medication?",
      content: "Yes, physical therapy is generally better than long-term pain medication for musculoskeletal and neurological conditions. Medications provide temporary pain relief and carry risks of side effects, whereas physical therapy restores normal biomechanics, strengthens support muscles, improves joint mobility, and addresses the root physical cause of the problem.",
    },
    {
      id: "faq-physio-role",
      trigger: "What exactly does a physiotherapist do?",
      content: `A physiotherapist is a movement expert who restores physical function. They assess joint alignment, diagnose muscle imbalances, perform manual therapy and spinal manipulations, apply healing modalities (like dry needling, cupping, and electrotherapy), and design personalized exercise routines to help patients return to normal activities safely.`,
    },
    {
      id: "faq-physio-purpose",
      trigger: "What does physiotherapy do?",
      content: "Physiotherapy helps restore, maintain, and maximize movement, strength, and overall physical well-being. It helps patients recover from injuries, manage chronic pain, regain motor control after a stroke, prevent future joint degradation, and achieve physical independence and a higher quality of life.",
    },
  ];

  // Split items: first 5 visible, remaining hidden
  const visibleFaqItems = faqItems.slice(0, 5);
  const hiddenFaqItems = faqItems.slice(5);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 border-t border-border/40 text-left bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <HelpCircle className="w-6 h-6 text-accent" />
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="relative">
          <Accordion items={visibleFaqItems} allowMultiple={true} />

          <div
            className={`transition-all duration-700 ease-in-out overflow-hidden ${isExpanded
              ? "max-h-[5000px] opacity-100 space-y-3 mt-3"
              : "max-h-0 opacity-0 pointer-events-none"
              }`}
          >
            <Accordion items={hiddenFaqItems} allowMultiple={true} />
          </div>

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-24 read-more-gradient backdrop-blur-[1px] flex items-end justify-center pointer-events-none pb-2">
              <button
                onClick={() => setIsExpanded(true)}
                className="group flex items-center gap-1.5 px-4 py-1.5 bg-primary text-primary-foreground font-semibold rounded-full shadow-sm hover:bg-accent hover:text-white transition-all duration-300 pointer-events-auto transform hover:-translate-y-0.5 cursor-pointer text-xs border border-border/20"
              >
                <span>Show More</span>
                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-300" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
