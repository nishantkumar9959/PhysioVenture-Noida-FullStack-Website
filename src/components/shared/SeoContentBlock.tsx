import Link from "next/link";
import { BUSINESS, DOCTOR_NAME } from "@/lib/constants";

interface SeoContentBlockProps {
  pageType: "home" | "services" | "service" | "blogs" | "blog";
  title?: string;
  summary?: string;
  category?: string;
  symptoms?: string[];
  benefits?: string[];
}

export default function SeoContentBlock({ pageType, title }: SeoContentBlockProps) {
  const dynamicTitle = title ? ` for ${title}` : "";
  const contextLabel = getContextLabel(pageType, title);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 mt-10 border-t border-border/40 text-left bg-background">
      <div className="max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-wider text-accent mb-3">
          PHYSIOVENTURE NOIDA
        </p>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary mb-6 leading-tight">
          Physiotherapy in Noida{dynamicTitle}: PhysioVenture Care Guide
        </h2>

        <div className="space-y-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
          <p>
            PhysioVenture is a focused physiotherapy clinic in Noida for patients who need clear assessment, practical treatment, and guided recovery instead of generic exercise advice. People searching for physiotherapy in Noida, physiotherapy near me, or physiotherapist near me usually want two things: quick relief from pain and a trustworthy plan that prevents the same problem from returning. Our work is built around both goals. {DOCTOR_NAME}, lead physiotherapist at PhysioVenture, evaluates posture, joint mobility, strength, neurological control, pain behavior, daily routine, and home environment before recommending clinic sessions or physiotherapy at home.
          </p>

          <p>
            This {contextLabel} is written for patients comparing the best physiotherapy in Noida, a dependable physiotherapy clinic near me, or a practical physiotherapy centre near me for family care. PhysioVenture supports orthopaedic pain, spine stiffness, sciatica, slip disc, frozen shoulder, knee pain, sports injuries, stroke recovery, Parkinson&apos;s mobility issues, post-surgery rehabilitation, geriatric balance training, chiropractic and manual therapy, dry needling, cupping therapy, and long-term exercise prescription. Treatment is not limited to machines or short-term symptom relief. Each session connects hands-on therapy with progressive strengthening, movement retraining, patient education, and measurable functional goals.
          </p>

          <h3 className="text-xl font-display font-extrabold text-primary pt-3">
            Why Patients Choose PhysioVenture
          </h3>

          <p>
            Choosing a physiotherapist in Noida should be based on clinical reasoning, convenience, communication, and continuity of care. At PhysioVenture, patients receive a structured first assessment, a condition-specific treatment plan, and a home program that is realistic for their lifestyle. For an office worker with cervical pain, the plan may include posture correction, deep neck flexor activation, manual therapy, and workstation changes. For a senior recovering after knee replacement, the plan may include pain control, range-of-motion work, gait training, stair practice, and fall-prevention guidance. For a stroke patient, sessions may focus on balance, transfers, coordination, gait safety, and caregiver education.
          </p>

          <p>
            Many patients also need home physiotherapy Noida services because travel is painful, unsafe, or simply difficult during recovery. PhysioVenture provides physiotherapy Noida at home for post-operative patients, seniors, neurological cases, acute back pain, and families who prefer private one-to-one rehabilitation. Portable electrotherapy, resistance tools, manual therapy skills, balance drills, gait practice, and functional training can be delivered at home where the patient actually sits, walks, climbs stairs, and performs daily activities. This makes physiotherapy at home in Noida especially useful when the goal is independence inside the patient&apos;s own environment.
          </p>

          <h3 className="text-xl font-display font-extrabold text-primary pt-3">
            Conditions, Treatments, and Home Visit Support
          </h3>

          <p>
            PhysioVenture covers a wide range of treatment needs under one local rehabilitation system. Orthopaedic physiotherapy focuses on back pain, knee pain, shoulder pain, slip disc, sciatica, osteoarthritis, cervical spondylitis, muscle stiffness, and postural strain. Neurological physiotherapy supports stroke rehabilitation, paralysis recovery, Parkinson&apos;s disease, balance problems, gait instability, and functional retraining. Sports physiotherapy helps with ACL rehabilitation, meniscus injury, ligament sprain, tennis elbow, golfer&apos;s elbow, muscle strain, and return-to-play conditioning. Geriatric physiotherapy improves strength, walking confidence, fall prevention, chronic pain control, and daily independence for older adults.
          </p>

          <p>
            If you are comparing physiotherapy at home charges, the right question is not only the session fee. The better question is what clinical value each visit provides. A good home session should include assessment, hands-on correction when needed, supervised exercise, progression, safety advice, and clear instructions for the days between visits. PhysioVenture keeps pricing transparent and recommends session frequency based on condition severity, mobility limitations, treatment goals, and whether the patient needs clinic equipment or home-based functional training. This helps patients avoid both undertreatment and unnecessary appointments.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            <div className="rounded-2xl border border-border/40 bg-secondary/20 p-5">
              <h4 className="font-display font-extrabold text-primary mb-2">Clinic physiotherapy</h4>
              <p>
                Best for detailed assessment, manual therapy, advanced modalities, progressive strengthening, posture correction, and patients who can travel safely to the Sector 49 clinic.
              </p>
            </div>
            <div className="rounded-2xl border border-border/40 bg-secondary/20 p-5">
              <h4 className="font-display font-extrabold text-primary mb-2">Home physiotherapy</h4>
              <p>
                Best for post-surgery recovery, senior care, neurological rehabilitation, severe pain, mobility restriction, and patients searching for physiotherapy at home near me.
              </p>
            </div>
          </div>

          <p>
            The aim is simple: help patients move better, reduce pain, rebuild confidence, and return to work, sport, family life, and independent daily routines. Whether you need a physiotherapist Noida residents trust for a single painful joint or a full rehabilitation plan after surgery or stroke, PhysioVenture combines local access with condition-specific care. Patients can begin by reviewing the relevant service page, reading the blog guides, or booking a consultation for clinic or home treatment.
          </p>

          <p className="border-l-4 border-accent pl-4 text-sm">
            For personal advice, contact {BUSINESS.shortName} and speak with {DOCTOR_NAME}. Medical content on this website is educational and should be matched with a direct assessment before starting treatment.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/services/" className="text-sm font-bold text-accent hover:text-primary transition-colors">
              Explore physiotherapy services
            </Link>
            <Link href="/book/" className="text-sm font-bold text-accent hover:text-primary transition-colors">
              Book physiotherapy in Noida
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function getContextLabel(pageType: SeoContentBlockProps["pageType"], title?: string) {
  if (pageType === "home") return "home page";
  if (pageType === "services") return "services hub";
  if (pageType === "service") return `${title || "service"} treatment page`;
  if (pageType === "blogs") return "blog hub";
  return `${title || "blog"} article`;
}
