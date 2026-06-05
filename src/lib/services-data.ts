export interface ServiceDetail {
  name: string;
  slug: string;
  category: "ortho" | "neuro" | "sports" | "home" | "chiro" | "geriatric";
  categoryLabel: string;
  shortDesc: string;
  longDesc: string;
  symptoms: string[]; // Represents all conditions covered
  highlightedConditions: string[]; // Represents 3-5 core treatments to highlight on cards
  benefits: string[]; // Enriched benefits section
  timeline: string[]; // Progressive rehabilitation process steps
  faqs: { question: string; answer: string }[];
  ctaText: string;
  iconName: string;
  image: string;
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    name: "Orthopedic Rehabilitation",
    slug: "orthopedic-rehabilitation",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Pain relief and functional recovery for bones, joints, muscles, ligaments, posture-related conditions, and musculoskeletal disorders.",
    longDesc: "Our Orthopedic Rehabilitation program targets musculoskeletal conditions to restore pain-free movement and structural strength. Using evidence-based manuals, advanced joint mobilization, and patient-specific loading progressions, we treat spine, shoulder, knee, and hip disorders. Whether you suffer from chronic lower back strain, osteoarthritis, or joint stiffness, Dr. Rohit Verma designs a custom protocol to restore joint articulation, correct postural compensations, and rebuild muscle strength.",
    symptoms: [
      "Back Pain Treatment",
      "Knee Pain Treatment",
      "Shoulder Pain Treatment",
      "Elbow Pain Treatment",
      "Hip Pain Treatment",
      "Wrist Pain Treatment",
      "Foot Pain Treatment",
      "Muscle Pain Treatment",
      "Neck Pain Treatment",
      "Frozen Shoulder",
      "Osteoarthritis",
      "Carpal Tunnel Syndrome",
      "Sciatica",
      "Slip Disc",
      "Cervical Spondylitis",
      "Accident Pain Rehabilitation"
    ],
    highlightedConditions: [
      "Back Pain & Sciatica",
      "Knee Osteoarthritis",
      "Frozen Shoulder",
      "Slip Disc & Cervical Spondylitis"
    ],
    benefits: [
      "Significant reduction in chronic joint and spinal pain",
      "Restoration of joint range of motion and flexibility",
      "Correction of postural alignment and gait compensations",
      "Strengthening of supporting muscle groups to decompress joints",
      "Enhanced daily functional independence without reliance on painkillers"
    ],
    timeline: [
      "Comprehensive orthopedic screening, range-of-motion testing, and biomechanical assessment.",
      "Acute pain relief using manual traction, gentle mobilization, and localized heat/electrical stimulation.",
      "Progressive muscle activation and strengthening of core stabilizers (McKenzie/postural progressions).",
      "Functional integration focusing on lifting, bending, and long-term home maintenance protocols."
    ],
    faqs: [
      {
        question: "When should I start rehabilitation for orthopedic pain?",
        answer: "Rehabilitation should start as soon as acute inflammation subsides or immediately after cast/immobilization removal. Early activation prevents permanent joint stiffness and muscle wasting."
      },
      {
        question: "Can physiotherapy help avoid orthopedic surgery?",
        answer: "Yes, conservative physiotherapy is highly effective for conditions like osteoarthritis, slip disc, and rotator cuff strain, often strengthening the joints enough to delay or completely avoid surgical intervention."
      },
      {
        question: "Do you bring specialized equipment for home visits?",
        answer: "Yes, we bring portable clinical devices (TENS/IFT electrotherapy, muscle stimulators), manual adjustment tools, resistance bands, and stabilization cushions to Noida home visits."
      }
    ],
    ctaText: "Book Consultation",
    iconName: "Activity",
    image: "/images/service_ortho.png"
  },
  {
    name: "Neurological Rehabilitation",
    slug: "neurological-rehabilitation",
    category: "neuro",
    categoryLabel: "Neurological & Stroke Care",
    shortDesc: "Specialized rehabilitation programs for neurological conditions affecting movement, balance, coordination, and independence.",
    longDesc: "Neurological Rehabilitation at PhysioVenture is designed to rebuild motor control, balance, and coordination using neural plasticity principles. We treat stroke, paralysis, multiple sclerosis, and Parkinson's disease. By utilizing progressive motor learning, Bobath/PNF facilitation techniques, and intensive coordination exercises, Dr. Rohit Verma helps patients re-train dormant neural pathways, improve gait safety, and reclaim their functional independence in a supportive environment.",
    symptoms: [
      "Stroke Rehabilitation",
      "Paralysis Rehabilitation",
      "Multiple Sclerosis Rehabilitation",
      "Parkinson's Rehabilitation",
      "Bell's Palsy Rehabilitation",
      "Spinal Cord Injury Rehabilitation",
      "Cerebral Palsy Rehabilitation",
      "Balance & Gait Training"
    ],
    highlightedConditions: [
      "Post-Stroke Mobility",
      "Paralysis Recovery",
      "Parkinson's Gait Training",
      "Spinal Cord Injury Rehab"
    ],
    benefits: [
      "Stimulation of neuroplasticity to rebuild motor function",
      "Improvement in static and dynamic balance to prevent falls",
      "Spasticity reduction and preservation of muscle length",
      "Restoration of independent transfers (bed to wheelchair to standing)",
      "Empowered caregiver training for safe daily mobility support"
    ],
    timeline: [
      "Sensory-motor evaluation, reflex screening, spasticity check, and functional safety mapping.",
      "Neurological facilitation (PNF, Bobath therapy) to activate muscles and regulate spastic tone.",
      "Task-specific motor retraining including grasping, reaching, sit-to-stand, and coordination drills.",
      "Gait correction on balance tracks and real-world environment training for safe home living."
    ],
    faqs: [
      {
        question: "How long does stroke recovery take?",
        answer: "The fastest adaptations occur in the first 90 days post-stroke (the golden window), but neural pathways continue to reorganize for years. Continuous, structured physical therapy can yield functional improvements even years later."
      },
      {
        question: "Is neurological physiotherapy effective at home?",
        answer: "Yes! In-home rehabilitation is highly recommended for neurological patients because we train you directly on the chairs, beds, and stairs you navigate daily, optimizing real-world functionality."
      }
    ],
    ctaText: "Start Recovery Program",
    iconName: "Brain",
    image: "/images/service_neuro.png"
  },
  {
    name: "Sports Injury Rehabilitation",
    slug: "sports-injury-rehabilitation",
    category: "sports",
    categoryLabel: "Sports & Performance Rehab",
    shortDesc: "Evidence-based recovery programs designed to help athletes and active individuals return to peak performance safely.",
    longDesc: "Our Sports Injury Rehabilitation program is tailored for active individuals, runners, and competitive athletes. We focus on healing ligament, tendon, and muscle tears (such as ACL, MCL, meniscus, and tennis elbow) and returning you to sport safely. We combine targeted load-bearing progressions, sport-specific movement mechanics, proprioceptive training, and manual therapy to ensure you recover full joint stability, prevent re-injury, and rebuild power.",
    symptoms: [
      "ACL Rehabilitation",
      "MCL Rehabilitation",
      "PCL Rehabilitation",
      "Meniscus Injury Rehabilitation",
      "Ligament Injury Rehabilitation",
      "Golfer's Elbow",
      "Tennis Elbow",
      "Sprain Rehabilitation",
      "Strain Rehabilitation",
      "Muscle Spasm Treatment",
      "Muscle Stiffness Treatment",
      "Patella Mobilization Therapy"
    ],
    highlightedConditions: [
      "ACL/MCL Reconstruction Care",
      "Meniscus Tears",
      "Tennis & Golfer's Elbow",
      "Ankle Sprains & Strains"
    ],
    benefits: [
      "Safe return to sports and high-intensity activities",
      "Rebuilding of muscle strength, power, and local muscular endurance",
      "Restoration of joint proprioception and spatial coordination",
      "Breaking down of restrictive scar tissue adhesions",
      "Biomechanical analysis to prevent future athletic injuries"
    ],
    timeline: [
      "Sport-specific biomechanical review, ligament stability checks, and muscle girth measurement.",
      "Pain and swelling control using cold compression, ultrasound, and cross-friction massage.",
      "Progressive strength reloading (isometric to dynamic) and joint stability training.",
      "Plyometric training, agility drills, and quantitative return-to-sport testing."
    ],
    faqs: [
      {
        question: "How long after ACL surgery should I start physiotherapy?",
        answer: "Physiotherapy should start within the first week after surgery. Early therapy focuses on swelling control, patella mobility, and restoring full knee extension to prevent joint locking."
      },
      {
        question: "Can sports physical therapy help with muscle spasms and stiffness?",
        answer: "Yes, we use advanced manual techniques, deep tissue release, dry needling, and clinical stretching to release muscle knots and restore normal tissue compliance."
      }
    ],
    ctaText: "Get Sports Assessment",
    iconName: "Trophy",
    image: "/images/service_sports.png"
  },
  {
    name: "Home Visit Physiotherapy",
    slug: "home-visit-physiotherapy",
    category: "home",
    categoryLabel: "In-Home Care",
    shortDesc: "Professional physiotherapy treatment delivered in the comfort of the patient's home.",
    longDesc: "Home Visit Physiotherapy brings the clinic to you, eliminating the pain and stress of commuting. Dr. Rohit Verma travels with portable clinical modalities (TENS, IFT, muscle stimulators), chiropractic adjusters, and orthopedic mobilization aids. Ideal for post-surgery patients, elderly care, and acute pain cases, our in-home sessions guarantee personalized, 1-on-1 attention designed around your household environment for optimal real-world recovery.",
    symptoms: [
      "Post-Surgery Rehabilitation",
      "Elderly Care",
      "Mobility Training",
      "Pain Management",
      "Neurological Rehabilitation at Home",
      "Orthopedic Rehabilitation at Home"
    ],
    highlightedConditions: [
      "Post-Op Knee/Hip Replacements",
      "Elderly Mobility & Care",
      "In-Home Neurological Care",
      "Acute Pain Management"
    ],
    benefits: [
      "Zero travel stress or risk of re-injury during commutes",
      "Treatment scheduled in the comfort and privacy of your home",
      "Environmental safety audit to prevent home-based fall risks",
      "1-on-1 dedicated attention for the entire duration of the session",
      "Highly effective functional training using your own furniture and stairs"
    ],
    timeline: [
      "Home-environment safety assessment and baseline clinical evaluation.",
      "Pain control using portable electrotherapy and manual soft-tissue mobilization.",
      "Personalized exercise therapy using portable resistance bands and cuffs.",
      "Caregiver orientation and progressive independent home activity mapping."
    ],
    faqs: [
      {
        question: "Which areas in Noida do you cover for home visits?",
        answer: "We provide home-visit physiotherapy across all major sectors of Noida, including Sector 49, 50, 51, 62, 78, 100, 137, 150, Noida Expressway, and Greater Noida West."
      },
      {
        question: "Is the quality of treatment at home same as in the clinic?",
        answer: "Absolutely. We bring the exact same clinical-grade portable modalities, exercise tools, and expertise, ensuring no compromise in your rehabilitation outcomes."
      }
    ],
    ctaText: "Book Home Visit",
    iconName: "Home",
    image: "/images/service_home.png"
  },
  {
    name: "Chiropractic & Manual Therapy",
    slug: "chiropractic-manual-therapy",
    category: "chiro",
    categoryLabel: "Spine Alignment & Hands-on",
    shortDesc: "Hands-on techniques focused on restoring joint mobility, improving posture, and reducing pain.",
    longDesc: "Chiropractic & Manual Therapy at PhysioVenture focuses on manual spinal adjustments and joint mobilization. Dr. Rohit Verma uses precise, targeted manual techniques to release joint restrictions, correct alignment imbalances, and relieve nerve compression. By combining spine adjustments with myofascial release and muscle energy techniques, this hands-on therapy provides fast relief for neck stiffness, lumbar catches, tension headaches, and postural misalignment.",
    symptoms: [
      "Chiropractic Treatment",
      "Spine Mobilization",
      "Joint Mobilization",
      "Manual Therapy",
      "Postural Correction"
    ],
    highlightedConditions: [
      "Spinal Alignment Adjustments",
      "Joint Mobilization & Glides",
      "Postural Correction & Realignment",
      "Myofascial Trigger Point Release"
    ],
    benefits: [
      "Immediate relief from acute spine and neck stiffness",
      "Restoration of natural joint glide and biomechanics",
      "Reduction of tension headaches and localized muscle catches",
      "Improved posture and ergonomic spinal alignment",
      "Decompression of spinal nerves to alleviate radiating pain"
    ],
    timeline: [
      "Postural alignment check, spinal segment palpation study, and joint play test.",
      "Preparatory soft-tissue heating and myofascial trigger-point release.",
      "Targeted manual chiropractic adjustments (manipulation) to restore joint play.",
      "Stabilization exercises to secure and maintain the corrected joint alignment."
    ],
    faqs: [
      {
        question: "Are spinal adjustments safe?",
        answer: "Yes. When performed by a certified clinical physiotherapist like Dr. Rohit Verma, manual adjustments are extremely safe. We perform a thorough screening to rule out contraindications like osteoporosis first."
      },
      {
        question: "What causes the clicking sound during chiropractic care?",
        answer: "The sound is called cavitation. It is simply the release of gas bubbles (nitrogen) from the joint fluid when the joint space is gently opened, reducing internal pressure."
      }
    ],
    ctaText: "Schedule Assessment",
    iconName: "Hand",
    image: "/images/service_chiro.png"
  },
  {
    name: "Geriatric Rehabilitation",
    slug: "geriatric-rehabilitation",
    category: "geriatric",
    categoryLabel: "Senior Care",
    shortDesc: "Specialized physiotherapy care for older adults to improve mobility, balance, strength, and independence.",
    longDesc: "Geriatric Rehabilitation is designed to help seniors maintain their physical independence, strength, and safety. We address age-related issues such as arthritis, osteoporosis, generalized weakness, and walking instability. Using gentle, paced range-of-motion routines, core balance training, and gait conditioning, Dr. Rohit Verma focuses on reducing fall risks and ensuring seniors can navigate stairs and daily tasks with confidence.",
    symptoms: [
      "Fall Prevention",
      "Balance Training",
      "Strength Development",
      "Mobility Improvement",
      "Chronic Pain Management",
      "Functional Independence Training"
    ],
    highlightedConditions: [
      "Fall Prevention & Balance",
      "Chronic Pain Management",
      "Mobility & Strength Rebuilding",
      "Post-Hospitalization Mobilization"
    ],
    benefits: [
      "Significant reduction in fall risk and walking instability",
      "Enhanced lower-limb strength for easy sitting-to-standing",
      "Management of chronic osteoarthritic and age-related pain",
      "Increased daily stamina and functional range of motion",
      "Reclaimed confidence in walking independently"
    ],
    timeline: [
      "Comprehensive senior functional screen (Berg Balance Scale, fall risk audit).",
      "Gentle joint mobilization and thermal therapy to ease morning stiffness.",
      "Paced strength conditioning and static/dynamic balance track exercises.",
      "Household mobility practice (stairs, bathroom transfers) and fall-proofing advice."
    ],
    faqs: [
      {
        question: "Is geriatric physiotherapy safe for seniors with osteoporosis?",
        answer: "Yes. The therapy is completely customized, low-impact, and gentle. We focus on safe loading and balance, avoiding high-velocity thrusts to ensure senior safety."
      },
      {
        question: "Can we get geriatric physiotherapy at home post-hospital discharge?",
        answer: "Yes, transitional home-visit care is highly beneficial for seniors to recover muscle tone and mobility after hospital stays."
      }
    ],
    ctaText: "Book Senior Care Consultation",
    iconName: "Users",
    image: "/images/service_geriatric.png"
  }
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}
