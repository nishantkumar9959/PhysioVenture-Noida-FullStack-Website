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
  isSubService?: boolean;
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
    image: "/Media_Assets/images/service_ortho.png"
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
    image: "/Media_Assets/images/service_neuro.png"
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
    image: "/Media_Assets/images/service_sports.png"
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
    faqs: [],
    ctaText: "Book Home Visit",
    iconName: "Home",
    image: "/Media_Assets/images/service_home.png"
  },
  {
    name: "Chiropractic & Manual Therapy",
    slug: "chiropractic-manual-therapy",
    category: "chiro",
    categoryLabel: "Spine Alignment & Hands-on",
    shortDesc: "Hands-on techniques focused on restoring joint mobility, improving posture, and reducing pain.",
    longDesc: "Chiropractic & Manual Therapy at PhysioVenture focuses on manual spinal adjustments, joint mobilization, and advanced tissue release techniques. Dr. Rohit Verma uses precise, targeted manual adjustments, clinical dry needling, and cupping therapy to relieve deep muscle knots, restore joint articulation, correct postural compensations, and alleviate radiating nerve pain.",
    symptoms: [
      "Chiropractic Treatment",
      "Spine Mobilization",
      "Joint Mobilization",
      "Manual Therapy",
      "Postural Correction",
      "Dry Needling Therapy",
      "Cupping Therapy"
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
      },
      {
        question: "What are Dry Needling and Cupping Therapy, and how do they help?",
        answer: "Dry Needling uses sterile single-use needles to release painful trigger points (muscle knots), while Cupping Therapy uses suction cups to increase blood flow and relieve fascial tension. Both are highly effective when combined with manual chiropractic adjustments to speed up pain relief and muscle recovery."
      }
    ],
    ctaText: "Schedule Assessment",
    iconName: "Hand",
    image: "/Media_Assets/images/service_chiro.png"
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
    image: "/Media_Assets/images/service_geriatric.png"
  },
  {
    name: "Back Pain Treatment",
    slug: "back-pain-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Specialized clinical therapy and non-surgical decompression for chronic and acute lower back pain, lumbago, and muscle spasms in Noida.",
    longDesc: "Our Back Pain Treatment program focuses on diagnosing and treating the root cause of spinal discomfort. Whether caused by poor desk ergonomics, core weakness, or mechanical disc pressure, Dr. Rohit Verma utilizes manual spine mobilization, McKenzie protocol exercises, and deep myofascial release to relieve pressure, restore spinal articulation, and strengthen core stabilizer muscles to prevent recurring back pain.",
    symptoms: [
      "Lower Back Pain",
      "Spine Stiffness",
      "Muscle Spasms & Tightness",
      "Lumbago",
      "Postural Fatigue",
      "Mechanical Back Ache"
    ],
    highlightedConditions: [
      "Chronic Lower Back Pain",
      "Acute Muscle Spasms",
      "Ergonomic Back Strain",
      "Core Stabilization Training"
    ],
    benefits: [
      "Immediate relief from acute back muscle spasms",
      "Improved spinal flexion, extension, and rotation",
      "Strengthened core stabilizer muscles (transversus abdominis)",
      "Ergonomic advice to prevent desk-related back pain",
      "Reduced risk of future spinal disc compression"
    ],
    timeline: [
      "Biomechanical spinal screening and movement assessment.",
      "Acute pain relief using manual therapy and targeted heat/TENS.",
      "Progressive core recruitment and spinal mobilization exercises.",
      "Ergonomic coaching and home maintenance exercise planning."
    ],
    faqs: [
      {
        question: "How many physiotherapy sessions are needed for back pain?",
        answer: "Most patients experience significant pain relief within 3 to 6 sessions. Long-term core strengthening may take 4 to 8 weeks of consistent progressive exercises."
      },
      {
        question: "Do you offer home visit physiotherapy for severe back pain?",
        answer: "Yes, we provide home visit physiotherapy across Noida, bringing portable electrotherapy and mobilization tools for patients with acute back spasms who cannot travel."
      }
    ],
    ctaText: "Book Back Pain Assessment",
    iconName: "Activity",
    image: "/Media_Assets/images/service_ortho.png",
    isSubService: true
  },
  {
    name: "Knee Pain Treatment",
    slug: "knee-pain-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Targeted rehabilitation for knee osteoarthritis, meniscus tears, patella tracking issues, and joint stiffness in Noida.",
    longDesc: "Our Knee Pain Treatment program is designed to restore joint stability, reduce inflammation, and improve alignment. We address osteoarthritis, cartilage wear, and ligament strain. By employing manual joint glides, quadriceps strengthening, patella mobilization, and clinical modalities (TENS/ultrasound), Dr. Rohit Verma helps patients walk pain-free and avoid or delay joint replacement surgery.",
    symptoms: [
      "Knee Joint Stiffness",
      "Osteoarthritis Joint Wear",
      "Patella Tracking Dysfunction",
      "Meniscus Tear Soreness",
      "Swelling & Warmth",
      "Difficulty Climbing Stairs"
    ],
    highlightedConditions: [
      "Knee Osteoarthritis",
      "Patellofemoral Pain Syndrome",
      "Meniscal Strain Recovery",
      "Joint Mobilization & Stiff Knee Care"
    ],
    benefits: [
      "Increased joint range of motion and flexion",
      "Reduced knee joint friction and inflammation",
      "Strengthened quadriceps, hamstrings, and hip stabilizers",
      "Improved walking balance and stair climbing ease",
      "Effective postponement or avoidance of knee replacement surgery"
    ],
    timeline: [
      "Joint alignment assessment, ligament stability testing, and range of motion check.",
      "Swelling control and pain relief using cold packs and portable electrotherapy.",
      "Isometric quad sets and progressive closed-kinetic chain exercises.",
      "Proprioception (balance) training and stair navigation retraining."
    ],
    faqs: [
      {
        question: "Can physiotherapy cure knee osteoarthritis?",
        answer: "While physical therapy cannot reverse cartilage wear, it can build muscle strength around the knee to absorb shock, significantly reducing pain and improving daily mobility."
      },
      {
        question: "Is patella mobilization therapy painful?",
        answer: "Patella mobilization is generally not painful. We apply gentle, manual glides to the kneecap to restore its sliding motion, which actually provides instant movement relief."
      }
    ],
    ctaText: "Book Knee Assessment",
    iconName: "Activity",
    image: "/Media_Assets/images/service_ortho.png",
    isSubService: true
  },
  {
    name: "Frozen Shoulder Treatment",
    slug: "frozen-shoulder-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Comprehensive physical therapy and manual mobilization to resolve shoulder adhesive capsulitis and restore complete arm movement.",
    longDesc: "Frozen Shoulder (Adhesive Capsulitis) is characterized by severe stiffness and deep joint pain that limits normal arm movements like dressing or reaching. Our program uses progressive manual stretching, glenohumeral joint mobilization, scapular tracking exercises, and deep heat modalities to break down thick capsular adhesions and safely restore pain-free shoulder motion.",
    symptoms: [
      "Severe Shoulder Stiffness",
      "Adhesive Capsulitis Constraint",
      "Radiating Shoulder Pain",
      "Inability to Raise Arm",
      "Night Pain on Affected Side",
      "Rotator Cuff Tightness"
    ],
    highlightedConditions: [
      "Adhesive Capsulitis (Frozen Shoulder)",
      "Rotator Cuff Impingement",
      "Scapular Dyskinesia",
      "Glenohumeral Joint Mobilization"
    ],
    benefits: [
      "Safe breakdown of joint capsule scar tissue",
      "Restoration of overhead reach and internal/external rotation",
      "Elimination of deep, throbbing night pain",
      "Correction of compensatory shoulder shrugging patterns",
      "Strengthened rotator cuff muscles to stabilize the joint"
    ],
    timeline: [
      "Capsular pattern range of motion screening and pain threshold assessment.",
      "Pain modulation using deep heat, TENS, and gentle passive range of motion.",
      "Manual joint mobilization (Maitland/Mulligan techniques) and passive stretches.",
      "Active-assisted exercises, rotator cuff loading, and home exercise compliance."
    ],
    faqs: [
      {
        question: "How long does frozen shoulder physiotherapy take?",
        answer: "Frozen shoulder resolves in phases. With structured physical therapy, significant range-of-motion gains and pain reduction are achieved in 4 to 8 weeks, preventing the condition from lasting for years."
      },
      {
        question: "Is it okay to push through the pain during shoulder stretches?",
        answer: "No. Stretching a frozen shoulder must be controlled. Aggressive stretching can tear the inflamed capsule and increase pain. Dr. Rohit Verma applies precise manual glides within safe limits."
      }
    ],
    ctaText: "Book Shoulder Assessment",
    iconName: "Activity",
    image: "/Media_Assets/images/service_ortho.png",
    isSubService: true
  },
  {
    name: "Slip Disc Treatment",
    slug: "slip-disc-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Evidence-based spinal decompression, mechanical diagnostics, and core stabilization for lumbar and cervical disc herniation in Noida.",
    longDesc: "A herniated or 'slip' disc can press against sensitive spinal nerves, causing sharp pain, numbness, and weakness. Our Slip Disc Treatment program utilizes mechanical diagnosis and therapy (McKenzie Method) to centralize radiating symptoms back to the spine. Dr. Rohit Verma combines gentle manual traction, nerve flossing, postural alignment correction, and deep core stabilization to relieve disc pressure and speed up disc healing.",
    symptoms: [
      "Disc Herniation & Bulge",
      "Radiating Nerve Compression",
      "Spinal Column Soreness",
      "Numbness or Tingling in Limbs",
      "Loss of Core Support",
      "Increased Pain when Bending"
    ],
    highlightedConditions: [
      "Lumbar Herniated Disc",
      "Cervical Disc Protrusion",
      "Radiculopathy & Nerve Pinching",
      "McKenzie Spine Extension Therapy"
    ],
    benefits: [
      "Centralization and reduction of radiating leg/arm pain",
      "Decompression of pinched spinal nerve roots",
      "Restoration of natural lumbar lordosis (spinal curve)",
      "Strengthened deep core (multifidus and abdominis) to protect discs",
      "Education on safe lifting mechanics and ergonomic sitting posture"
    ],
    timeline: [
      "Neurological screening (reflexes, sensation, muscle power) and mechanical movement check.",
      "Symptom centralization utilizing McKenzie extension protocols and manual traction.",
      "Deep core stabilizer recruitment and progressive spine extension exercises.",
      "Functional loading, lifting mechanics instruction, and posture correction templates."
    ],
    faqs: [
      {
        question: "Can a slip disc heal without surgery?",
        answer: "Yes! Over 90% of slip disc cases recover successfully with conservative physical therapy. Decompressing the disc and building strong core support allows the herniated material to shrink and heal naturally."
      },
      {
        question: "What is the McKenzie Method for slip disc?",
        answer: "It is a standardized assessment and treatment system based on directional preference. By performing specific repetitive movements (like back extensions), we guide the bulging disc material away from the pinched nerve, reducing pain."
      }
    ],
    ctaText: "Book Spinal Evaluation",
    iconName: "Activity",
    image: "/Media_Assets/images/service_ortho.png",
    isSubService: true
  },
  {
    name: "Sciatica Pain Treatment",
    slug: "sciatica-pain-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Targeted therapy to relieve sciatic nerve compression, radiating leg pain, numbness, and piriformis syndrome in Noida.",
    longDesc: "Sciatica occurs when the sciatic nerve is compressed, usually by a lumbar disc herniation or a tight piriformis muscle, causing sharp shooting pain down the back of the leg. Our specialized Sciatica Pain Treatment program targets the source of compression. Through manual traction, sciatic nerve flossing, piriformis release, and lumbar stabilization exercises, Dr. Rohit Verma helps relieve nerve tension, restore leg sensation, and regain mobility.",
    symptoms: [
      "Shooting Leg Pain",
      "Sciatic Nerve Numbness",
      "Piriformis Syndrome Soreness",
      "Weakness in Foot or Leg",
      "Sharp Pain when Sitting",
      "Burning Sensation in Thigh"
    ],
    highlightedConditions: [
      "Sciatic Nerve Compression",
      "Piriformis Muscle Tightness",
      "Radiating Lumbar Radiculopathy",
      "Nerve Gliding & Flossing Therapy"
    ],
    benefits: [
      "Immediate reduction in radiating shooting leg pain",
      "Release of sciatic nerve entrapment points",
      "Relaxation of tight piriformis and gluteal muscles",
      "Restored leg strength and normal walking gait",
      "Decreased numbness, burning, and pins-and-needles sensations"
    ],
    timeline: [
      "Straight Leg Raise (SLR) test, dermatomal sensory checks, and spinal palpation.",
      "Manual spinal traction and gentle myofascial release of gluteal structures.",
      "Sciatic nerve mobilization (flossing) to restore nerve mobility within its sheath.",
      "Lumbar stabilization and hip strengthening to prevent nerve compression relapse."
    ],
    faqs: [
      {
        question: "What is nerve flossing for sciatica?",
        answer: "Nerve flossing is a gentle exercise technique that pulls the sciatic nerve back and forth through its pathway, releasing adhesions and decreasing hypersensitivity and pain."
      },
      {
        question: "Is sitting bad for sciatica?",
        answer: "Yes, prolonged sitting increases pressure on lumbar discs and the piriformis muscle, which can worsen sciatic nerve compression. We teach you active stretching breaks and ergonomic postures."
      }
    ],
    ctaText: "Book Sciatica Assessment",
    iconName: "Activity",
    image: "/Media_Assets/images/service_ortho.png",
    isSubService: true
  },
  {
    name: "Cervical Spondylitis Treatment",
    slug: "cervical-spondylitis-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Specialized rehabilitation for neck stiffness, chronic cervical strain, headaches, and radiating arm numbness caused by cervical spondylosis.",
    longDesc: "Cervical Spondylitis involves wear and tear of the neck bones and discs, causing chronic stiffness, radiating shoulder/arm pain, and tension headaches. Our program combines manual cervical traction, neck muscle strengthening (deep neck flexors), posture correction, and trigger-point dry needling to relieve muscle strain, decompress cervical nerves, and restore comfortable neck movement.",
    symptoms: [
      "Chronic Neck Stiffness",
      "Cervical Nerve Compression",
      "Cervicogenic Headaches",
      "Numbness in Fingers/Hands",
      "Shoulder Blade Aches",
      "Dizziness or Vertigo when Turning Neck"
    ],
    highlightedConditions: [
      "Cervical Spondylosis (Neck Wear)",
      "Cervical Radiculopathy",
      "Postural Kyphosis (Hunchback)",
      "Deep Neck Flexor Strengthening"
    ],
    benefits: [
      "Significant reduction in chronic neck pain and headaches",
      "Restored neck rotation, bending, and extension ranges",
      "Decompression of cervical nerves to eliminate finger numbness",
      "Improved forward-head posture and shoulder alignment",
      "Strengthened support muscles to reduce strain on cervical joints"
    ],
    timeline: [
      "Cervical range of motion assessment, nerve compression tests (Spurling's), and posture checks.",
      "Cervical traction (manual/mechanical) and soft-tissue release of tight trapezius muscles.",
      "Deep neck flexor activation and thoracic spine extension mobilization.",
      "Ergonomic workstation setups and posture maintenance guides."
    ],
    faqs: [
      {
        question: "Can neck pain cause headaches and dizziness?",
        answer: "Yes. Tight neck muscles and compressed cervical joints can trigger cervicogenic headaches and affect balance receptors in the neck, causing mild dizziness. Treating the neck resolves these symptoms."
      },
      {
        question: "Is traction safe for cervical spondylitis?",
        answer: "Manual traction is highly safe when performed by an experienced clinical physiotherapist. It creates space between cervical vertebrae to relieve compressed nerve roots."
      }
    ],
    ctaText: "Book Neck Assessment",
    iconName: "Activity",
    image: "/Media_Assets/images/service_ortho.png",
    isSubService: true
  },
  {
    name: "Stroke Rehabilitation",
    slug: "stroke-rehabilitation",
    category: "neuro",
    categoryLabel: "Neurological & Stroke Care",
    shortDesc: "Specialized post-stroke recovery program utilizing Bobath concept, PNF facilitation, and neuroplasticity retraining in Noida.",
    longDesc: "Recovering from a stroke requires rapid, structured rehabilitation to rebuild lost motor functions and coordination. Our Stroke Rehabilitation program utilizes neuroplasticity principles to help the brain reorganize and create new pathways. Dr. Rohit Verma provides personalized 1-on-1 therapy focusing on Bobath therapy, Proprioceptive Neuromuscular Facilitation (PNF), hemiplegic arm rehabilitation, sit-to-stand training, and progressive gait analysis.",
    symptoms: [
      "Hemiplegia / Hemiparesis Weakness",
      "Post-Stroke Coordination Loss",
      "Muscle Spasticity & Joint Contractures",
      "Gait & Balance Instability",
      "Difficulty Gripping Objects",
      "Facial Muscle Drooping"
    ],
    highlightedConditions: [
      "Post-Stroke Hemiplegia Recovery",
      "Bobath & PNF Neuromuscular Therapy",
      "Gait Training & Balance Rehabilitation",
      "Upper Limb Motor Retraining"
    ],
    benefits: [
      "Reactivation of dormant muscle groups on the hemiplegic side",
      "Reduction of spastic muscle tone to prevent joint stiffness",
      "Significant improvement in walking balance and safety",
      "Restoration of daily tasks (eating, dressing, transfers)",
      "Empowering training for family caregivers in transfer safety"
    ],
    timeline: [
      "Brunnstrom stroke recovery stage check, spasticity screening, and safety audit.",
      "PNF facilitation and passive/active-assisted movements to activate paretic muscles.",
      "Task-oriented training (reaching, grasping, sit-to-stand repetitions).",
      "Gait retraining with dynamic balance exercises on level and unlevel tracks."
    ],
    faqs: [
      {
        question: "What is the golden period for stroke rehabilitation?",
        answer: "The first 3 to 6 months post-stroke is considered the golden period because the brain's neuroplasticity is at its highest, allowing for rapid motor recovery. However, improvements can still be made years later with consistent therapy."
      },
      {
        question: "Is home visit physiotherapy good for stroke patients?",
        answer: "Yes, in-home rehabilitation is highly effective because it allows us to retrain you on the exact furniture, beds, and stairs you use daily, accelerating your real-world independence."
      }
    ],
    ctaText: "Book Stroke Consultation",
    iconName: "Brain",
    image: "/Media_Assets/images/service_neuro.png",
    isSubService: true
  },
  {
    name: "Paralysis Rehabilitation",
    slug: "paralysis-rehabilitation",
    category: "neuro",
    categoryLabel: "Neurological & Stroke Care",
    shortDesc: "Specialized physiotherapy to rebuild motor function, prevent joint contractures, and restore daily independence for paralytic conditions.",
    longDesc: "Paralysis rehabilitation requires systematic neuromuscular facilitation to stimulate paretic muscles, maintain muscle length, and prevent permanent joint stiffness (contractures). Whether caused by nerve injuries, neuropathy, or spinal trauma, Dr. Rohit Verma designs a custom protocol combining PNF techniques, active-assisted range of motion, muscle stimulation, and adaptive functional training to maximize movement potential.",
    symptoms: [
      "Loss of Voluntary Movement",
      "Neuromuscular Weakness",
      "Joint Stiffness & Tightness",
      "Muscle Atrophy & Wasting",
      "Impaired Reflexes",
      "Sensory Sensation Changes"
    ],
    highlightedConditions: [
      "Paresis & Paralytic Recovery",
      "Neuromuscular Facilitation (PNF)",
      "Contracture Prevention & Stretching",
      "Functional Independence Training"
    ],
    benefits: [
      "Rebuilding of voluntary muscle control and strength",
      "Prevention of painful joint contractures and muscle wasting",
      "Improved circulation and skin integrity in paretic limbs",
      "Enhanced ability to perform bed mobility and chair transfers",
      "Improved sensory awareness and coordination"
    ],
    timeline: [
      "Detailed motor power screening (MRC scale), sensory check, and range of motion mapping.",
      "Passive stretching and joint mobilization to preserve structural flexibility.",
      "Neuromuscular electrical stimulation (NMES) to evoke muscle contractions.",
      "Progressive active-assisted movements, trunk control, and transfer training."
    ],
    faqs: [
      {
        question: "How does electrical muscle stimulation help in paralysis?",
        answer: "NMES passes small electrical currents through paretic muscles to evoke involuntary contractions, which maintains muscle mass, improves circulation, and helps re-educate the brain on movement patterns."
      },
      {
        question: "Can physical therapy reverse paralysis?",
        answer: "Recovery depends on the underlying cause and level of nerve damage. Physiotherapy maximizes the function of remaining nerve paths, builds muscle strength, and trains alternate patterns to achieve independence."
      }
    ],
    ctaText: "Book Paralysis Consultation",
    iconName: "Brain",
    image: "/Media_Assets/images/service_neuro.png",
    isSubService: true
  },
  {
    name: "Parkinson's Rehabilitation",
    slug: "parkinsons-rehabilitation",
    category: "neuro",
    categoryLabel: "Neurological & Stroke Care",
    shortDesc: "Specialized balance training, gait correction, and rigidity release to improve mobility and reduce fall risks for Parkinson's disease.",
    longDesc: "Parkinson's Disease causes tremors, rigidity, slow movement (bradykinesia), and walking instability (shuffling gait). Our rehabilitation program focuses on expanding movement ranges, correcting gait, and improving balance. Dr. Rohit Verma utilizes large-amplitude movement training, cueing strategies, and balance exercises to reduce freezing episodes, increase walking speed, and help patients maintain active independence.",
    symptoms: [
      "Shuffling Gait (Walking Instability)",
      "Muscle Rigidity & Stiffness",
      "Bradykinesia (Slow Movement)",
      "Postural Tremors",
      "Freezing of Gait Episodes",
      "Impaired Balance & Fall Risk"
    ],
    highlightedConditions: [
      "Parkinsonian Shuffling Gait",
      "Postural Rigidity & Coordination Loss",
      "Gait Freezing Management",
      "Large-Amplitude Exercise Training"
    ],
    benefits: [
      "Reduced walking rigidity and body stiffness",
      "Improved stride length and walking speed",
      "Fewer freezing of gait episodes using sensory cues",
      "Significantly reduced fall risk through balance conditioning",
      "Maintained flexibility for everyday tasks"
    ],
    timeline: [
      "Gait analysis, balance testing (Berg Scale), and assessment of rigidity.",
      "Rigidity-relieving stretching and rotational spine mobilization exercises.",
      "Large-amplitude exercise protocols (LSVT BIG principles) and stride drills.",
      "Balance track practice, fall recovery training, and home safety guides."
    ],
    faqs: [
      {
        question: "How does physiotherapy help Parkinson's disease if it is progressive?",
        answer: "Physiotherapy helps Parkinson's patients by training alternative pathways, maintaining joint flexibility, and improving balance, which slows the rate of functional decline and preserves independent mobility."
      },
      {
        question: "What are sensory cueing strategies for gait freezing?",
        answer: "Cueing involves using rhythmic auditory beats, visual lines on the floor, or mental commands to bypass the damaged basal ganglia in the brain, helping patients step out of freezing episodes safely."
      }
    ],
    ctaText: "Book Parkinson's Assessment",
    iconName: "Brain",
    image: "/Media_Assets/images/service_neuro.png",
    isSubService: true
  },
  {
    name: "Spinal Cord Injury Rehabilitation",
    slug: "spinal-cord-injury-rehabilitation",
    category: "neuro",
    categoryLabel: "Neurological & Stroke Care",
    shortDesc: "Advanced physical rehabilitation, trunk stabilization, wheelchair skills, and functional transfers training post spinal cord trauma in Noida.",
    longDesc: "Spinal Cord Injury (SCI) rehab focuses on optimizing neurological recovery, strengthening intact muscle groups, and teaching functional independence. Whether dealing with paraplegia or tetraplegia, our specialized program includes progressive trunk control training, passive limb mobilization to prevent contractures, transfer training (bed to wheelchair), and pressure sore prevention techniques.",
    symptoms: [
      "Paraplegia or Tetraplegia Weakness",
      "Loss of Sensation & Reflexes",
      "Spasms or Flaccidity",
      "Trunk Instability",
      "Joint Stiffness & Tightness",
      "Impaired Balance when Sitting"
    ],
    highlightedConditions: [
      "Post-Traumatic Spinal Cord Rehabilitation",
      "Trunk Control & Sitting Balance",
      "Safe Bed-to-Wheelchair Transfers",
      "Preventative Joint Mobilization"
    ],
    benefits: [
      "Maximization of upper-body strength to compensate for lower-limb paresis",
      "Excellent sitting balance and independent trunk control",
      "Complete prevention of joint contractures and muscle wasting",
      "Safe, independent transfers and wheelchair management",
      "Caregiver guidance on skin checks and respiratory health"
    ],
    timeline: [
      "ASIA impairment scale screening, muscle testing, and baseline mobility assessment.",
      "Passive range of motion for paralyzed joints and respiratory muscle training.",
      "Trunk mobilization, sitting balance training, and core stabilization.",
      "Independent transfer training and customized home modifications advice."
    ],
    faqs: [
      {
        question: "What is the focus of spinal cord injury rehabilitation?",
        answer: "The primary focus is to maximize your independent movement. We strengthen functional muscles, train sitting balance, teach wheelchair skills, and guide you through safe transfers to build a highly active life."
      },
      {
        question: "Do you help with home setups for spinal cord injury patients?",
        answer: "Yes, we evaluate your home layout and recommend modifications (ramps, bathroom grab bars, bed heights) to ensure safe, barrier-free mobility."
      }
    ],
    ctaText: "Book SCI Assessment",
    iconName: "Brain",
    image: "/Media_Assets/images/service_neuro.png",
    isSubService: true
  },
  {
    name: "ACL Injury Rehabilitation",
    slug: "acl-rehabilitation",
    category: "sports",
    categoryLabel: "Sports & Performance Rehab",
    shortDesc: "Structured pre-operative and post-operative physical therapy for ACL/MCL reconstruction, knee ligament repairs, and meniscus tears.",
    longDesc: "An Anterior Cruciate Ligament (ACL) tear requires meticulous, phase-based rehabilitation to restore joint stability and ensure a safe return to sports. Our program focuses on early swelling control, kneecap (patella) mobility, complete extension restoration, progressive weight-bearing, quadriceps hypertrophy, and sport-specific plyometrics/agility drills to prevent re-injury.",
    symptoms: [
      "Post-ACL Reconstruction Stiffness",
      "Knee Ligament Laxity & Instability",
      "Swelling & Fluid Build-up",
      "Quadriceps Muscle Wasting",
      "Loss of Terminal Knee Extension",
      "Fear of Giving Way during Pivot"
    ],
    highlightedConditions: [
      "Post-Op ACL/MCL Reconstruction Care",
      "Pre-Surgery Joint Optimization (Prehab)",
      "Quadriceps Strengthening & Girth Building",
      "Plyometrics & Agility Sports Training"
    ],
    benefits: [
      "Restoration of full terminal knee extension (straightening)",
      "Elimination of post-surgical swelling and joint pain",
      "Rebuilt quadriceps and hamstring muscle volume",
      "Restored single-leg balance and pivoting confidence",
      "Safe return to high-intensity running and athletic sports"
    ],
    timeline: [
      "Swelling review, patellar mobility check, and quadriceps activation screening.",
      "Gentle passive range of motion, patellar glides, and isometric quadriceps sets.",
      "Closed-kinetic chain loading (squats, lunges) and proprioceptive balance training.",
      "Agility ladders, jogging progressions, and sport-specific return-to-play testing."
    ],
    faqs: [
      {
        question: "Why is restoring knee extension (straightening) critical after ACL surgery?",
        answer: "Restoring full knee extension within the first 2-3 weeks is critical. If delayed, scar tissue can build up in the joint, causing permanent extension loss and a limp."
      },
      {
        question: "What is ACL prehab, and is it necessary?",
        answer: "ACL Prehab is physical therapy performed before surgery to reduce swelling, restore extension, and build quadriceps strength. Research shows prehab significantly accelerates post-surgical recovery."
      }
    ],
    ctaText: "Book ACL Assessment",
    iconName: "Trophy",
    image: "/Media_Assets/images/service_sports.png",
    isSubService: true
  },
  {
    name: "Tennis Elbow Rehabilitation",
    slug: "tennis-elbow-rehabilitation",
    category: "sports",
    categoryLabel: "Sports & Performance Rehab",
    shortDesc: "Specialized treatment for lateral epicondylitis (Tennis Elbow) and medial epicondylitis (Golfer's Elbow) using dry needling and eccentric loading.",
    longDesc: "Tennis Elbow (lateral epicondylitis) is a painful tendon irritation caused by repetitive forearm movements, affecting athletes and office professionals alike. Our targeted rehabilitation program focuses on reducing tendon inflammation, releasing tight forearm extensor muscles using manual therapy and dry needling, and implementing progressive eccentric loading exercises to rebuild tendon strength and durability.",
    symptoms: [
      "Outer Elbow Pain (Lateral Epicondylitis)",
      "Inner Elbow Soreness (Golfer's Elbow)",
      "Weak Grip Strength & Pain",
      "Forearm Muscle Stiffness",
      "Pain when Typing or Lifting Cups",
      "Radiating Wrist Ache"
    ],
    highlightedConditions: [
      "Lateral Epicondylitis (Tennis Elbow)",
      "Medial Epicondylitis (Golfer's Elbow)",
      "Forearm Extensor Tendinopathy",
      "Eccentric Forearm Strengthening"
    ],
    benefits: [
      "Significant reduction in localized outer/inner elbow pain",
      "Healed tendon fibers through structured eccentric exercise",
      "Improved forearm flexibility and grip strength",
      "Released muscle knots using deep tissue release and needling",
      "Ergonomic adjustments for computer work to prevent recurrence"
    ],
    timeline: [
      "Palpation of epicondyles, grip strength testing, and forearm flexibility screening.",
      "Pain control using portable ultrasound, cold therapy, and soft-tissue mobilization.",
      "Eccentric wrist extension loading using specialized light weights/flexbars.",
      "Grip conditioning, stretching, and ergonomic mouse/keyboard setups."
    ],
    faqs: [
      {
        question: "Why does typing make my tennis elbow worse?",
        answer: "Typing keeping your wrist extended runs forearm muscles constantly under isometric tension. This constant strain irritates the lateral epicondyle tendon. We teach you correct wrist positions and stretches."
      },
      {
        question: "How does eccentric exercise help heal tendons?",
        answer: "Eccentric exercise (strengthening the muscle while it lengthens) stimulates collagen production, helping realign and repair micro-tears in the tendon fibers to restore pain-free load capacity."
      }
    ],
    ctaText: "Book Elbow Assessment",
    iconName: "Trophy",
    image: "/Media_Assets/images/service_sports.png",
    isSubService: true
  },
  {
    name: "Post-Surgery Rehabilitation",
    slug: "post-surgery-rehabilitation",
    category: "home",
    categoryLabel: "In-Home Care",
    shortDesc: "Advanced post-operative rehabilitation for total knee/hip replacements, spinal surgeries, and orthopedic fractures in Noida.",
    longDesc: "Post-Surgery Rehabilitation is essential to recover joint range of motion, rebuild muscle bulk, and prevent post-surgical stiffness (arthrofibrosis). Dr. Rohit Verma brings comprehensive in-home rehabilitation protocols directly to Noida residents. Ideal for total knee replacements (TKR), hip replacements, and spine surgeries, this program features gentle manual tracking, swelling modulation, scar tissue mobilization, and progressive walking retraining.",
    symptoms: [
      "Post-TKR Knee Stiffness",
      "Post-THR Hip Range Limitation",
      "Surgical Scar Tightness",
      "Post-Operative Muscle Wasting",
      "Gait Limping or Balance Loss",
      "Persistent Joint Swelling"
    ],
    highlightedConditions: [
      "Total Knee Replacement (TKR) Rehab",
      "Total Hip Replacement (THR) Rehab",
      "Spinal Laminectomy / Fusion Recovery",
      "Post-Fracture Stiffness Resolution"
    ],
    benefits: [
      "Rapid restoration of knee bending and hip flexion",
      "Prevention of permanent post-surgical joint stiffness",
      "Safe walking retraining without a walker or cane",
      "Reduced pain and swelling using sterile cold compression",
      "Improved scar tissue mobility to prevent skin tightness"
    ],
    timeline: [
      "Incision review, swelling check, and baseline passive joint range test.",
      "Gentle passive range of motion, scar mobilization, and quad lag checks.",
      "Active-assisted exercises, muscle activation (quads/glutes), and gait drills.",
      "Progressive independent walking, stair climbing practice, and return-to-activity goals."
    ],
    faqs: [
      {
        question: "When should physiotherapy start after a total knee replacement?",
        answer: "Physiotherapy should start within 24 to 48 hours after surgery. Early movements prevent blood clots, reduce initial swelling, and are critical to prevent joint stiffness."
      },
      {
        question: "Why is in-home physiotherapy recommended after surgery?",
        answer: "Home therapy is highly recommended. It eliminates the pain and risk of reopening incisions during travels, and allows you to practice walking and climbing stairs in your own safe home environment."
      }
    ],
    ctaText: "Book Post-Op Consultation",
    iconName: "Home",
    image: "/Media_Assets/images/service_home.png",
    isSubService: true
  },
  {
    name: "Geriatric Mobility & Fall Prevention",
    slug: "fall-prevention-geriatric",
    category: "geriatric",
    categoryLabel: "Senior Care",
    shortDesc: "Comprehensive fall risk screening, proprioception exercises, and mobility retraining to help seniors walk safely and independently.",
    longDesc: "As we age, changes in balance, joint health, and muscle mass (sarcopenia) increase fall risks. Our Geriatric Mobility & Fall Prevention program evaluates balance and builds senior safety. Dr. Rohit Verma performs thorough fall-risk audits in the home, designs low-impact strength routines, and guides seniors through proprioception (balance) training, enabling them to move confidently without fear of falling.",
    symptoms: [
      "Walking Instability & Wobbles",
      "Fear of Falling Outdoors",
      "Age-Related Muscle Weakness",
      "Joint Osteopenia & Stiffness",
      "Slow, Shuffling Stride",
      "Difficulty Standing Up from Low Chairs"
    ],
    highlightedConditions: [
      "Senior Balance Training",
      "Fall Risk Screening & Prevention",
      "Lower Limb Strength Development",
      "Independent Transfers Retraining"
    ],
    benefits: [
      "Significantly reduced risk of falls and related fractures",
      "Rebuilt thigh and hip muscle strength to stand up easily",
      "Improved coordination, step tracking, and posture",
      "Reclaimed confidence to walk outdoors and visit parks",
      "Home-environment modifications advice to remove hazards"
    ],
    timeline: [
      "Detailed balance screening (Berg Balance Test, Timed Up and Go) and home hazard audit.",
      "Gentle joint mobilization and flexibility training to reduce joint stiffness.",
      "Targeted balance training (single-leg stands, weight shifts) and lower body exercises.",
      "Independent stair practice, walking speed conditioning, and long-term activity maps."
    ],
    faqs: [
      {
        question: "How can physiotherapy prevent falls in seniors?",
        answer: "We focus on three areas: strengthening lower body muscles to prevent buckling, training balance receptors (proprioception) for steady footing, and recommending home safety changes to eliminate trip hazards."
      },
      {
        question: "Can we do senior balance training at home?",
        answer: "Yes, balance training at home is ideal because we train you on the exact floors, rugs, and hallways you navigate daily, directly translating exercises into daily safety."
      }
    ],
    ctaText: "Book Senior Care Evaluation",
    iconName: "Users",
    image: "/Media_Assets/images/service_geriatric.png",
    isSubService: true
  },
  {
    name: "Chiropractic Spinal Adjustments",
    slug: "chiropractic-treatment",
    category: "chiro",
    categoryLabel: "Spine Alignment & Hands-on",
    shortDesc: "Certified spinal adjustments, cervical manipulations, and joint mobilization to correct posture, alignment, and relieve nerve pain.",
    longDesc: "Chiropractic Spinal Adjustments focus on correcting spinal alignments and joint play to restore smooth movement. Dr. Rohit Verma uses manual manipulation, drop-board mobilization, and gentle joint traction to treat neck pain, lumbar stiffness, and postural problems, decompressing spinal nerves and bringing immediate flexibility to stiff joints.",
    symptoms: [
      "Spinal Misalignment Aches",
      "Acute Lumbar Stiffness",
      "Cervical Joint Restrictions",
      "Postural Kyphosis Strain",
      "Pinched Spinal Nerve Pain",
      "Rib Joint (Costochondral) Catch"
    ],
    highlightedConditions: [
      "Manual Spinal Adjustments",
      "Cervical & Lumbar Mobilization",
      "Postural Kyphosis Correction",
      "Joint Play Restoration"
    ],
    benefits: [
      "Immediate relief from neck and spinal joint stiffness",
      "Improved posture and structural alignment",
      "Decompressed spinal nerves to relieve radiating limb pain",
      "Restored range of motion in stiff vertebral segments",
      "Increased blood flow and relaxed deep spinal muscles"
    ],
    timeline: [
      "Postural screening, spinal segment palpation, and joint mobility checks.",
      "Soft-tissue heating and myofascial trigger-point release of surrounding muscles.",
      "Targeted manual adjustments to correct restricted vertebral joints.",
      "Core stabilization exercises to secure the adjusted spinal segment."
    ],
    faqs: [
      {
        question: "Are spinal adjustments safe?",
        answer: "Yes. When performed by a certified clinical physiotherapist like Dr. Rohit Verma, adjustments are highly safe. We perform a detailed screening to rule out contraindications like osteoporosis first."
      },
      {
        question: "Does the joint 'click' mean it is aligned?",
        answer: "The click (cavitation) is simply the release of gas bubbles from the joint fluid when the joint space is gently opened. Alignment is defined by the restoration of normal joint play and pain-free movement."
      }
    ],
    ctaText: "Book Spinal Adjustment",
    iconName: "Hand",
    image: "/Media_Assets/images/service_chiro.png",
    isSubService: true
  },
  {
    name: "Dry Needling Therapy",
    slug: "dry-needling-therapy",
    category: "chiro",
    categoryLabel: "Spine Alignment & Hands-on",
    shortDesc: "Intramuscular dry needling to release chronic myofascial trigger points, muscle knots, tension headaches, and sciatic tightness.",
    longDesc: "Dry Needling involves inserting thin, sterile single-use needles directly into hyper-irritable muscle spots (trigger points). This technique triggers a local twitch response that instantly releases muscle spasms, increases blood flow, and deactivates painful knots, making it highly effective for chronic neck tension, sciatica, and hamstring stiffness.",
    symptoms: [
      "Chronic Myofascial Trigger Points",
      "Deep Muscle Knots & Spasms",
      "Tension Headaches",
      "Hamstring & Calf Tightness",
      "Gluteal Sciatica Compression",
      "Myofascial Pain Syndrome"
    ],
    highlightedConditions: [
      "Trigger Point Release",
      "Intramuscular Stimulation (IMS)",
      "Myofascial Pain Syndrome Care",
      "Spasm Deactivation & Healing"
    ],
    benefits: [
      "Rapid release of deep, stubborn muscle knots",
      "Deactivated pain trigger points for lasting relief",
      "Increased local blood circulation to speed up muscle healing",
      "Improved flexibility in chronically tight muscles",
      "Instant improvement in joint range of motion"
    ],
    timeline: [
      "Identification of trigger points via muscle palpation and movement screening.",
      "Skin sterilization and insertion of fine acupuncture needles.",
      "Elicitation of local twitch responses to release muscle tension.",
      "Post-needling stretching and active movements to restore muscle function."
    ],
    faqs: [
      {
        question: "Does dry needling hurt?",
        answer: "You may feel a brief pinch during insertion and a dull ache or muscle twitch when the needle targets the trigger point, followed by immediate muscle relaxation."
      },
      {
        question: "How is dry needling different from acupuncture?",
        answer: "Acupuncture is based on traditional Chinese medicine mapping energy channels (meridians). Dry Needling is a Western medical treatment based on anatomical principles, targeting specific muscle trigger points to relieve pain."
      }
    ],
    ctaText: "Book Dry Needling Session",
    iconName: "Hand",
    image: "/Media_Assets/images/service_chiro.png",
    isSubService: true
  },
  {
    name: "Cupping Therapy",
    slug: "cupping-therapy",
    category: "chiro",
    categoryLabel: "Spine Alignment & Hands-on",
    shortDesc: "Advanced myofascial cupping to improve local blood flow, release restricted fascial layers, and reduce back stiffness.",
    longDesc: "Myofascial Cupping Therapy utilizes localized suction cups to pull skin and fascia away from the muscle, creating space for blood flow and cellular exchange. Dr. Rohit Verma combines static and dynamic (sliding) cupping to break down fascial adhesions, relieve deep back stiffness, and accelerate muscle recovery after athletic training.",
    symptoms: [
      "Myofascial Fascial Adhesions",
      "Chronic Back Muscle Stiffness",
      "Restricted Blood Circulation",
      "Lactic Acid Build-up",
      "Sports Muscle Fatigue",
      "Post-Workout Soreness"
    ],
    highlightedConditions: [
      "Myofascial Cupping Therapy",
      "Fascial Layer Release",
      "Dynamic Sliding Cupping",
      "Lactic Acid Flush & Recovery"
    ],
    benefits: [
      "Released fascial layers to restore smooth movement",
      "Increased blood flow and oxygenation to tight tissues",
      "Accelerated recovery from heavy workouts and muscle soreness",
      "Decompressed local sensory nerves to reduce pain signals",
      "Deep tissue relaxation and reduced back stiffness"
    ],
    timeline: [
      "Assessment of fascial mobility, muscle stiffness, and skin integrity.",
      "Application of dynamic/sliding cups to warm up tissue and release fascia.",
      "Placement of static cups on target trigger points for 5-10 minutes.",
      "Gentle stretching and light active movements to integrate the tissue release."
    ],
    faqs: [
      {
        question: "What causes the circular marks after cupping?",
        answer: "The marks are caused by suction drawing old blood and metabolic waste to the skin surface, indicating increased circulation. They are not bruises and fade in 3 to 7 days."
      },
      {
        question: "Can cupping help with back muscle stiffness?",
        answer: "Yes, cupping is highly effective. By lifting the fascia, it decompresses tight tissues, breaks up adhesions, and flushes out waste, providing deep muscle relief."
      }
    ],
    ctaText: "Book Cupping Session",
    iconName: "Hand",
    image: "/Media_Assets/images/service_chiro.png",
    isSubService: true
  },
  {
    name: "Shoulder Pain Treatment",
    slug: "shoulder-pain-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Specialized physical therapy and shoulder mobilization to relieve pain, restore range of motion, and treat rotator cuff strains.",
    longDesc: "Our Shoulder Pain Treatment program targets rotator cuff strains, shoulder impingement, and tendonitis to restore full range of motion. Using manual joint mobilization, posture correction, and progressive load-bearing exercises, Dr. Rohit Verma constructs a customized protocol to decompress the shoulder joint, correct scapular movement, and rebuild arm strength.",
    symptoms: [
      "Rotator Cuff Strain",
      "Shoulder Impingement",
      "Tendonitis",
      "Bursitis",
      "Shoulder Joint Stiffness",
      "Difficulty Lifting Arm"
    ],
    highlightedConditions: [
      "Rotator Cuff Tear Rehabilitation",
      "Shoulder Impingement Care",
      "Scapular Dyskinesia Correction",
      "Active Joint Range Recovery"
    ],
    benefits: [
      "Immediate relief from sharp and throbbing shoulder pain",
      "Full restoration of arm rotation and overhead reach",
      "Rebuilt strength in surrounding stabilizing muscles",
      "Correction of compensatory shoulder shrugging patterns",
      "Enhanced ability to carry and lift objects safely"
    ],
    timeline: [
      "Initial screening of shoulder mobility, range of motion, and joint stability.",
      "Pain relief utilizing manual therapy, thermal therapy, and gentle passive stretches.",
      "Progressive activation of rotator cuff and scapular stabilizer muscles.",
      "Functional overhead integration and long-term joint health planning."
    ],
    faqs: [
      {
        question: "How long does shoulder pain recovery take?",
        answer: "Minor strains can resolve in 2 to 4 weeks. Chronic impingement or rotator cuff rehab might take 6 to 12 weeks of consistent strengthening and manual therapy."
      },
      {
        question: "Can I do exercises on my own for shoulder pain?",
        answer: "You should start under professional guidance. Incorrect overhead movements can worsen shoulder impingement. We design a safe home exercise plan for you."
      }
    ],
    ctaText: "Book Shoulder Pain Assessment",
    iconName: "Activity",
    image: "/Media_Assets/images/service_shoulder.png",
    isSubService: true
  },
  {
    name: "Elbow Pain Treatment",
    slug: "elbow-pain-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Targeted clinical rehabilitation for tendonitis, nerve entrapment, and joint stiffness around the elbow.",
    longDesc: "Our Elbow Pain Treatment program is designed to resolve local tendon inflammation and joint restriction. Whether caused by repetitive occupational strains or direct injury, Dr. Rohit Verma combines manual therapy, soft-tissue mobilization, and eccentric loading exercises to reduce forearm muscle tension, relieve joint compression, and restore pain-free elbow extension and grip strength.",
    symptoms: [
      "Elbow Joint Stiffness",
      "Forearm Extensor Tightness",
      "Repetitive Strain Injury",
      "Nerve Pinning / Tingling",
      "Weak Grip Strength",
      "Pain when Lifting Objects"
    ],
    highlightedConditions: [
      "Elbow Tendinitis Care",
      "Joint Play Restoration",
      "Nerve Gliding Therapy",
      "Grip Strength Rehabilitation"
    ],
    benefits: [
      "Significant reduction in local elbow joint pain and stiffness",
      "Restoration of full elbow extension and flexion range",
      "Enhanced forearm muscle flexibility and elasticity",
      "Increased grip strength and typing endurance",
      "Safe return to daily lifting and occupational activities"
    ],
    timeline: [
      "Palpation of joint line, checking range of motion and grip strength.",
      "Pain reduction using gentle manual glides and portable electrotherapy/ultrasound.",
      "Eccentric loading exercises for forearm musculature to rebuild tendon strength.",
      "Functional grip conditioning and workplace ergonomics setup."
    ],
    faqs: [
      {
        question: "What causes sharp pain in the outer elbow?",
        answer: "This is often lateral epicondylitis (tennis elbow), caused by repetitive wrist extension and forearm rotations that create micro-tears in the tendon. Eccentric strengthening is highly effective for recovery."
      },
      {
        question: "Should I wear a brace for elbow pain?",
        answer: "A brace can help unload the tendon during strenuous activities, but it should not replace active physical therapy to strengthen the muscle."
      }
    ],
    ctaText: "Book Elbow Pain Assessment",
    iconName: "Activity",
    image: "/Media_Assets/images/service_ortho.png",
    isSubService: true
  },
  {
    name: "Hip Pain Treatment",
    slug: "hip-pain-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Comprehensive physical therapy for hip bursitis, arthritis, joint tightness, and muscle imbalances in Noida.",
    longDesc: "Our Hip Pain Treatment program targets structural imbalances and joint wear to restore fluid, pain-free mobility. Using advanced manual joint mobilization, stretching of tight hip flexors/piriformis, and targeted gluteal strengthening, Dr. Rohit Verma constructs a comprehensive recovery plan to stabilize the hip joint, correct walking posture, and reduce pressure on the lower back.",
    symptoms: [
      "Hip Joint Stiffness",
      "Deep Groin Pain",
      "Bursitis Swelling",
      "Difficulty Walking or Climbing Stairs",
      "Gluteal Muscle Weakness",
      "Hip Flexor Tightness"
    ],
    highlightedConditions: [
      "Hip Osteoarthritis Care",
      "Trochanteric Bursitis Rehabilitation",
      "Gait & Alignment Correction",
      "Gluteal Stabilization Exercises"
    ],
    benefits: [
      "Significant reduction in deep hip joint discomfort and groin pain",
      "Improved dynamic balance and walking stride length",
      "Enhanced joint range of motion for bending and sitting",
      "Strengthened gluteal and hip stabilizer muscle groups",
      "Reduced compensatory stress on the knees and lower back"
    ],
    timeline: [
      "Biomechanical evaluation of hip rotation, gait, and pelvic alignment.",
      "Gentle hip joint traction and manual mobilization to ease stiffness.",
      "Progressive gluteal and core strengthening exercises.",
      "Functional gait integration, stair navigation, and walking balance drills."
    ],
    faqs: [
      {
        question: "Can hip physiotherapy help delay joint replacement?",
        answer: "Yes. Strengthening the muscles around the hip joint absorbs shock and stabilizes the bone, which can significantly reduce osteoarthritis pain and delay surgical intervention."
      },
      {
        question: "What is trochanteric bursitis?",
        answer: "It is inflammation of the fluid-filled sac (bursa) on the outer side of the hip. Targeted stretching and low-impact loading help relieve the friction and pain."
      }
    ],
    ctaText: "Book Hip Pain Assessment",
    iconName: "Activity",
    image: "/Media_Assets/images/service_ortho.png",
    isSubService: true
  },
  {
    name: "Wrist Pain Treatment",
    slug: "wrist-pain-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Specialized rehabilitation for wrist sprains, repetitive typing strains, and joint stiffness to restore wrist strength.",
    longDesc: "Our Wrist Pain Treatment program addresses pain and stiffness resulting from repetitive wrist movement, typing, or sudden falls. Dr. Rohit Verma applies precise manual joint mobilization, wrist tendon gliding exercises, and progressive grip and forearm loading to release compressed nerves, restore tendon compliance, and build structural hand and wrist stability.",
    symptoms: [
      "Wrist Joint Stiffness",
      "Tendon Soreness & Crepitus",
      "Numbness in Fingers",
      "Weak Hand Grip",
      "Pain when Typing or Writing",
      "Clicking Sounds in Wrist"
    ],
    highlightedConditions: [
      "Repetitive Strain Injury (RSI)",
      "Wrist Tendinopathy Care",
      "Nerve Gliding Exercises",
      "Grip Strength Development"
    ],
    benefits: [
      "Immediate relief from wrist stiffness and local tendon aches",
      "Restoration of full wrist flexion, extension, and rotation",
      "Improved nerve conduction and reduced finger numbness",
      "Rebuilt hand grip and typing endurance",
      "Safe return to daily computer work and physical activities"
    ],
    timeline: [
      "Evaluation of wrist range of motion, nerve response, and grip strength.",
      "Pain reduction using cold compression, ultrasound, and gentle passive mobilization.",
      "Tendon and nerve gliding exercises alongside light wrist flexor loading.",
      "Ergonomic advice and functional hand strengthening drills."
    ],
    faqs: [
      {
        question: "How do I prevent wrist pain from office work?",
        answer: "Maintain a neutral wrist position while typing, avoid rest pads that compress the carpal tunnel, and perform regular forearm stretches. We offer detailed ergonomic guidelines during therapy."
      },
      {
        question: "Can physiotherapy help with old wrist sprains?",
        answer: "Yes. Chronic wrist stiffness can be treated with deep tissue release, joint mobilization, and progressive loading to break down old scar tissue."
      }
    ],
    ctaText: "Book Wrist Pain Assessment",
    iconName: "Activity",
    image: "/Media_Assets/images/service_ortho.png",
    isSubService: true
  },
  {
    name: "Foot Pain Treatment",
    slug: "foot-pain-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Clinical therapy for plantar fasciitis, heel spurs, ankle stiffness, and flat feet gait imbalances.",
    longDesc: "Our Foot Pain Treatment program is tailored to restore normal weight-bearing mechanics and relieve foot pain. We address conditions like plantar fasciitis, Achilles tendonitis, and heel spurs. Dr. Rohit Verma utilizes manual myofascial release of the plantar fascia, calf stretching, joint mobilization of foot bones, and custom arch support advice to correct gait compensations and resolve chronic foot soreness.",
    symptoms: [
      "Sharp Heel Pain in Morning",
      "Arch Soreness & Tension",
      "Achilles Tendon Stiffness",
      "Walking Gait Compensations",
      "Ankle Joint Restrictions",
      "Flat Foot Imbalances"
    ],
    highlightedConditions: [
      "Plantar Fasciitis Recovery",
      "Achilles Tendonitis Rehab",
      "Foot Arch Optimization",
      "Ankle Mobilization & Glides"
    ],
    benefits: [
      "Complete relief from sharp morning heel and arch pain",
      "Restored flexibility in the calf muscles and plantar fascia",
      "Improved ankle range of motion and weight-bearing capability",
      "Corrected walking gait to prevent knee and hip stress",
      "Advice on orthotics and proper therapeutic footwear"
    ],
    timeline: [
      "Weight-bearing analysis, gait check, and foot arch inspection.",
      "Myofascial release of the foot sole and local pain relief via electrotherapy.",
      "Progressive loading of the foot intrinsic muscles and Achilles tendon.",
      "Dynamic balance drills, gait correction, and daily activity return maps."
    ],
    faqs: [
      {
        question: "Why is heel pain worse during the first steps of the day?",
        answer: "This is a classic sign of plantar fasciitis. Overnight, the fascia contracts and heals. The first step stretches and re-tears the tissue. Custom stretching and night splints help resolve this."
      },
      {
        question: "Can flat feet cause knee and back pain?",
        answer: "Yes. A collapsed arch causes the ankle to roll inward (pronation), which rotates the shin bone and puts extra strain on the knee and hip joints."
      }
    ],
    ctaText: "Book Foot Pain Assessment",
    iconName: "Activity",
    image: "/Media_Assets/images/service_foot_ankle.png",
    isSubService: true
  },
  {
    name: "Muscle Pain Treatment",
    slug: "muscle-pain-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Advanced physical therapy to release chronic muscle tightness, trigger points, and muscle fatigue in Noida.",
    longDesc: "Our Muscle Pain Treatment program focuses on diagnosing and treating myofascial pain syndrome, deep muscle knots, and fatigue. Dr. Rohit Verma combines advanced manual therapy, trigger point compression, instrument-assisted soft tissue mobilization (IASTM), and therapeutic dry needling to decompress restricted muscle fibers, flush out metabolic waste, and restore normal muscle compliance.",
    symptoms: [
      "Deep Throbbing Muscle Aches",
      "Painful Muscle Knots (Trigger Points)",
      "Chronic Muscle Stiffness",
      "Restricted Range of Motion",
      "Localized Muscle Spasms",
      "Post-Workout Soreness"
    ],
    highlightedConditions: [
      "Myofascial Pain Syndrome Care",
      "Trigger Point Release",
      "IASTM Soft Tissue Therapy",
      "Muscle Recovery & Stretching"
    ],
    benefits: [
      "Immediate release of stubborn muscle knots and tension",
      "Significant improvement in joint range of motion and flexibility",
      "Increased blood flow and oxygenation to recovering muscle fibers",
      "Reduced muscle fatigue and faster athletic recovery",
      "Decreased radiating pain caused by trigger point compression"
    ],
    timeline: [
      "Palpation of muscles to locate trigger points and check muscle length.",
      "Manual compression therapy, stretching, and deep heat application.",
      "Localized myofascial release and optional clinical dry needling.",
      "Active stretching routines and posture training to prevent recurrence."
    ],
    faqs: [
      {
        question: "What is a trigger point?",
        answer: "A trigger point is a hyper-irritable spot in a taut band of muscle fibers (a knot). It can cause localized pain or refer pain to other parts of the body when compressed."
      },
      {
        question: "How does dry needling help muscle pain?",
        answer: "It inserts a fine needle into the knot, triggering a local twitch response. This twitch resets the muscle fibers, instantly releasing the spasm and improving local blood flow."
      }
    ],
    ctaText: "Book Muscle Pain Assessment",
    iconName: "Activity",
    image: "/Media_Assets/images/service_ortho.png",
    isSubService: true
  },
  {
    name: "Neck Pain Treatment",
    slug: "neck-pain-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Targeted clinical rehabilitation for neck stiffness, poor desk posture, and chronic muscle strain in Noida.",
    longDesc: "Our Neck Pain Treatment program addresses mechanical neck pain, muscle fatigue, and poor alignment. Whether caused by long hours at a computer (text neck) or muscle spasms, Dr. Rohit Verma combines manual cervical mobilization, deep neck flexor strengthening, upper back posture correction, and stretching of tight trapezius muscles to reduce spinal load and restore pain-free neck movement.",
    symptoms: [
      "Neck Joint Stiffness",
      "Trapezius Muscle Soreness",
      "Postural Kyphosis Strain",
      "Tension Headaches",
      "Clicking Sounds when Turning Head",
      "Forward Head Posture"
    ],
    highlightedConditions: [
      "Mechanical Neck Pain Care",
      "Text Neck Correction",
      "Deep Neck Flexor Activation",
      "Thoracic Spine Mobilization"
    ],
    benefits: [
      "Significant reduction in chronic neck pain and tension headaches",
      "Restored cervical rotation, side-bending, and extension ranges",
      "Improved forward-head alignment and shoulder posture",
      "Strengthened supporting neck stabilizers to reduce disc pressure",
      "Ergonomic advice to prevent desk-related neck strains"
    ],
    timeline: [
      "Assessment of neck posture, range of motion, and muscle strength.",
      "Acute pain relief using manual therapy and targeted heat/TENS.",
      "Progressive deep neck stabilizer activation and upper back exercises.",
      "Ergonomic workspace guidance and home care stretches."
    ],
    faqs: [
      {
        question: "Why does computer work cause neck pain?",
        answer: "A forward-head posture puts massive extra weight on the neck joints and muscles. For every inch forward, the head's effective weight doubles, straining the trapezius muscle."
      },
      {
        question: "Can neck tightness cause headaches?",
        answer: "Yes. Tension in the upper neck muscles can refer pain to the forehead, temples, and behind the eyes (cervicogenic headaches)."
      }
    ],
    ctaText: "Book Neck Pain Assessment",
    iconName: "Activity",
    image: "/Media_Assets/images/service_back.png",
    isSubService: true
  },
  {
    name: "Post-Accident Rehabilitation",
    slug: "post-accident-rehabilitation",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Structured physical recovery program post orthopedic fractures, whiplash, and multi-joint trauma in Noida.",
    longDesc: "Our Post-Accident Rehabilitation program is designed to rebuild physical function, strength, and mobility after traumatic events, fractures, or joint surgery. Dr. Rohit Verma constructs a gradual, safe, evidence-based protocol combining gentle joint mobilization, muscle activation, gait training with assistive aids, and swelling modulation to resolve joint stiffness and restore daily independence.",
    symptoms: [
      "Post-Fracture Joint Stiffness",
      "Whiplash Neck Pain",
      "Severe Muscle Wasting",
      "Walking Gait Imbalances",
      "Joint Swelling & Warmth",
      "Fear of Weight Bearing"
    ],
    highlightedConditions: [
      "Orthopedic Fracture Recovery",
      "Whiplash & Cervical Strain Care",
      "Joint Stiffness Resolution",
      "Progressive Weight Bearing Rehab"
    ],
    benefits: [
      "Safe, accelerated bone and soft-tissue healing support",
      "Restoration of joint flexibility and muscle bulk in immobilized limbs",
      "Improved walking balance and safe independent mobility",
      "Reduced post-traumatic joint swelling and chronic pain",
      "Enhanced confidence in performing daily self-care tasks"
    ],
    timeline: [
      "Detailed screening of bone healing, joint play, and muscle power.",
      "Swelling control, pain relief, and gentle passive range of motion.",
      "Active-assisted exercises and progressive weight bearing with support.",
      "Gait correction, balance conditioning, and independent movement integration."
    ],
    faqs: [
      {
        question: "When should post-fracture physiotherapy start?",
        answer: "As soon as your orthopedic surgeon allows weight-bearing or removes the cast. Early passive movements are critical to prevent permanent joint stiffness."
      },
      {
        question: "What is whiplash?",
        answer: "It is a neck injury caused by rapid back-and-forth movement, commonly in car accidents. Gentle mobilization and stabilization help restore normal neck alignment."
      }
    ],
    ctaText: "Book Rehabilitation Assessment",
    iconName: "Activity",
    image: "/Media_Assets/images/service_post_op.png",
    isSubService: true
  },
  {
    name: "Osteoarthritis Treatment",
    slug: "osteoarthritis-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Specialized non-surgical joint management, shock-absorption strengthening, and joint play restoration for osteoarthritis.",
    longDesc: "Our Osteoarthritis Treatment program is designed to relieve pain and improve mobility for degenerated joints. While cartilage wear cannot be reversed, physical therapy builds the surrounding muscles to act as natural shock absorbers. Dr. Rohit Verma utilizes gentle manual joint mobilization, low-impact strength loading, flexibility training, and swelling control to reduce bone friction and delay or avoid joint replacement surgery.",
    symptoms: [
      "Joint Crepitus & Grating",
      "Morning Joint Stiffness",
      "Deep Aching Joint Pain",
      "Swelling after Activity",
      "Muscle Weakness around Joint",
      "Loss of Flexibility"
    ],
    highlightedConditions: [
      "Knee Osteoarthritis Care",
      "Hip Osteoarthritis Rehab",
      "Joint Play & Lubrication Glides",
      "Low-Impact Muscle Strengthening"
    ],
    benefits: [
      "Significant reduction in chronic joint pain and grating sensation",
      "Improved joint flexibility and morning stiffness resolution",
      "Strengthened surrounding muscles to absorb walking impacts",
      "Enhanced ability to walk, bend, and climb stairs",
      "Delay or complete avoidance of orthopedic joint replacement"
    ],
    timeline: [
      "Evaluation of joint range of motion, muscle strength, and gait posture.",
      "Swelling modulation using cold therapy and gentle manual mobilization.",
      "Low-impact muscle building and targeted loading exercises.",
      "Gait retraining, balance drills, and joint preservation advice."
    ],
    faqs: [
      {
        question: "Can exercise worsen my osteoarthritis?",
        answer: "High-impact exercises can irritate the joint, but structured low-impact exercises are essential. They strengthen muscles to decompress the joint, actually reducing pain."
      },
      {
        question: "How does joint mobilization help arthritis?",
        answer: "Gentle manual glides stimulate the production of synovial fluid (the joint's natural lubricant), which reduces friction and stiffness."
      }
    ],
    ctaText: "Book Osteoarthritis Assessment",
    iconName: "Activity",
    image: "/Media_Assets/images/service_arthritis.png",
    isSubService: true
  },
  {
    name: "Carpal Tunnel Syndrome Treatment",
    slug: "carpal-tunnel-syndrome-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine Care",
    shortDesc: "Nerve decompression, wrist tendon gliding, and ergonomic rehabilitation to resolve hand numbness and tingling.",
    longDesc: "Our Carpal Tunnel Syndrome Treatment program focuses on decompressing the median nerve in the wrist. If you suffer from finger numbness, tingling, or hand weakness, Dr. Rohit Verma utilizes manual carpal bone mobilization, nerve flossing, tendon gliding exercises, and ergonomic wrist modifications to reduce pressure in the carpal tunnel, restore sensation, and prevent surgical release.",
    symptoms: [
      "Numbness in Thumb & Fingers",
      "Tingling / Pins-and-needles",
      "Hand Grip Weakness",
      "Burning Wrist Pain at Night",
      "Difficulty Holding Small Objects",
      "Forearm Tightness"
    ],
    highlightedConditions: [
      "Median Nerve Decompression",
      "Nerve Flossing & Glides",
      "Carpal Bone Mobilization",
      "Workplace Ergonomic Review"
    ],
    benefits: [
      "Significant reduction in finger numbness and night pain",
      "Decompressed median nerve without surgical intervention",
      "Restored hand grip and finger coordination",
      "Improved wrist flexor and extensor tendon flexibility",
      "Ergonomic workspace adjustments to prevent relapse"
    ],
    timeline: [
      "Nerve conduction checks, sensory screening, and wrist posture check.",
      "Gentle manual carpal bone mobilization and localized pain control.",
      "Tendon and nerve gliding exercises to restore nerve mobility.",
      "Workplace ergonomic set-up and progressive grip strengthening."
    ],
    faqs: [
      {
        question: "Can carpal tunnel heal without surgery?",
        answer: "Yes! Most mild-to-moderate cases respond exceptionally well to physical therapy, nerve flossing, and nighttime wrist splinting to reduce pressure on the nerve."
      },
      {
        question: "Why does carpal tunnel pain worsen at night?",
        answer: "Many people sleep with their wrists bent, which decreases the space in the carpal tunnel and pinches the median nerve. Splinting keeps the wrist neutral."
      }
    ],
    ctaText: "Book Carpal Tunnel Assessment",
    iconName: "Activity",
    image: "/Media_Assets/images/service_ortho.png",
    isSubService: true
  },
  {
    name: "Alzheimer's Treatment",
    slug: "alzheimers-treatment",
    category: "neuro",
    categoryLabel: "Neurological & Stroke Care",
    shortDesc: "Specialized balance training, gait safety, cognitive physical exercises, and caregiver training for Alzheimer's patients in Noida.",
    longDesc: "Our Alzheimer's Treatment program focuses on maintaining physical mobility, improving gait safety, and enhancing quality of life. Dr. Rohit Verma designs gentle, structured, and repetitive physical routines to preserve motor memory, improve static and dynamic balance, reduce fall risks, and support families with safe transfer and handling techniques.",
    symptoms: [
      "Gait Apraxia (Walking Loss)",
      "Shuffling Steps & Instability",
      "Loss of Balance & Fall Risks",
      "Muscle Rigidity",
      "Difficulty Standing Up",
      "Spatial Disorientation"
    ],
    highlightedConditions: [
      "Balance & Fall Prevention",
      "Motor Memory Preservation",
      "Structured Mobility Drills",
      "Caregiver Safety Training"
    ],
    benefits: [
      "Significantly reduced fall risk inside and outside the home",
      "Preserved walking ability and muscle strength for daily tasks",
      "Enhanced sensory-motor coordination and spatial awareness",
      "Improved sleep and decreased behavioral agitation",
      "Caregiver guidance on safe transfers to prevent back strain"
    ],
    timeline: [
      "Assessment of walking stability, balance, and home fall hazards.",
      "Gentle, repetitive range of motion and pacing exercises.",
      "Balance track training and functional chair transfers practice.",
      "Continuous tracking, motor memory reinforcement, and caregiver review."
    ],
    faqs: [
      {
        question: "How does physical therapy help Alzheimer's patients?",
        answer: "Regular exercise slows motor decline, preserves muscle memory for walking, reduces joint stiffness, and improves balance to prevent dangerous falls."
      },
      {
        question: "Is home visit therapy better for Alzheimer's?",
        answer: "Yes. Patients feel much safer and more cooperative in their familiar home environment. We can also audit the home for safety hazards."
      }
    ],
    ctaText: "Book Senior Assessment",
    iconName: "Brain",
    image: "/Media_Assets/images/service_neuro.png",
    isSubService: true
  },
  {
    name: "Diabetic Neuropathy Treatment",
    slug: "diabetic-neuropathy-treatment",
    category: "neuro",
    categoryLabel: "Neurological & Stroke Care",
    shortDesc: "Balance rehabilitation, sensory stimulation, nerve flossing, and foot circulation therapy for diabetic neuropathy.",
    longDesc: "Our Diabetic Neuropathy Treatment program targets peripheral nerve issues causing numbness, burning, and balance loss in the legs. Dr. Rohit Verma utilizes manual sensory stimulation, foot nerve flossing, balance training (proprioceptive tracks), and circulation-boosting exercise therapies to reduce nerve pain, restore walking stability, and prevent fall risks.",
    symptoms: [
      "Numbness in Feet & Toes",
      "Burning or Tingling Sensation",
      "Walking Instability & Wobbles",
      "Loss of Temperature Sensation",
      "Muscle Weakness in Ankles",
      "Hypersensitive Skin Pain"
    ],
    highlightedConditions: [
      "Peripheral Neuropathy Rehab",
      "Balance & Proprioception Training",
      "Sensory Stimulation Therapy",
      "Foot Circulation Optimization"
    ],
    benefits: [
      "Improved walking balance and reduced fall risks",
      "Reduced burning, numbness, and tingling sensations",
      "Enhanced blood flow and circulation in the lower limbs",
      "Strengthened ankle muscles to prevent foot drop",
      "Educated foot check protocols to prevent diabetic ulcers"
    ],
    timeline: [
      "Sensory screening (monofilament check), balance test, and ankle range check.",
      "Sensory stimulation therapy and active ankle mobilization.",
      "Static and dynamic balance track training (proprioceptive drills).",
      "Gait retraining, foot safety audit, and home activity guidance."
    ],
    faqs: [
      {
        question: "Why does diabetic neuropathy affect balance?",
        answer: "Nerve damage in the feet blocks messages about joint position (proprioception) from reaching the brain, making it hard to feel the floor and walk steadily."
      },
      {
        question: "Can nerve pain from neuropathy be reduced?",
        answer: "Yes, targeted exercise increases local circulation and nerve flossing helps desensitize hypersensitive nerves, reducing burning and pain."
      }
    ],
    ctaText: "Book Neuropathy Assessment",
    iconName: "Brain",
    image: "/Media_Assets/images/service_neuro.png",
    isSubService: true
  },
  {
    name: "Myasthenia Gravis Treatment",
    slug: "myasthenia-gravis-treatment",
    category: "neuro",
    categoryLabel: "Neurological & Stroke Care",
    shortDesc: "Paced physical conditioning, energy conservation training, and respiratory muscle strengthening for Myasthenia Gravis.",
    longDesc: "Our Myasthenia Gravis Treatment program focuses on safe physical training without causing excessive muscle fatigue. Dr. Rohit Verma designs customized, low-impact stretching, paced strengthening, respiratory muscle training, and energy conservation protocols to maintain joint flexibility and build endurance safely.",
    symptoms: [
      "Fluctuating Muscle Weakness",
      "Rapid Physical Fatigue",
      "Shallow Breathing / Weak Chest",
      "Difficulty Climbing Stairs",
      "Eyelid Drooping & Double Vision",
      "Swallowing Fatigue"
    ],
    highlightedConditions: [
      "Paced Muscle Strengthening",
      "Respiratory Muscle Training",
      "Energy Conservation Coaching",
      "Joint Flexibility Maintenance"
    ],
    benefits: [
      "Maintained muscle strength without trigger-fatigue episodes",
      "Improved lung capacity and chest wall expansion",
      "Restored stamina for walking and daily home transfers",
      "Reduced risk of joint contractures and muscle wasting",
      "Empowered energy conservation techniques for daily activities"
    ],
    timeline: [
      "Strength screening, lung capacity check, and fatigue timing review.",
      "Gentle, paced active-assisted movements and breathing exercises.",
      "Low-resistance isometric conditioning during peak strength hours.",
      "Caregiver pacing assistance plans and home energy conservation advice."
    ],
    faqs: [
      {
        question: "What is the rule of exercise in Myasthenia Gravis?",
        answer: "Exercise must be low-impact, paced, and performed when strength is highest (typically in the morning). We avoid training to the point of exhaustion."
      },
      {
        question: "Do you offer breathing exercises for Myasthenia Gravis?",
        answer: "Yes, we teach diaphragmatic breathing and chest expansion to keep your respiratory muscles active and improve oxygen levels."
      }
    ],
    ctaText: "Book Myasthenia Assessment",
    iconName: "Brain",
    image: "/Media_Assets/images/service_neuro.png",
    isSubService: true
  },
  {
    name: "Meningitis Rehabilitation",
    slug: "meningitis-rehabilitation",
    category: "neuro",
    categoryLabel: "Neurological & Stroke Care",
    shortDesc: "Post-meningitis neuromuscular recovery, neck stiffness release, balance training, and sensory integration in Noida.",
    longDesc: "Our Meningitis Rehabilitation program helps patients recover from neurological complications, chronic neck rigidity, and balance issues following meningitis. Dr. Rohit Verma combines manual therapy for spinal flexibility, neuromuscular re-education, coordination training, and cognitive-motor integration exercises to restore full spinal movement and walking balance.",
    symptoms: [
      "Chronic Neck & Spine Stiffness",
      "Loss of Balance & Dizziness",
      "Muscle Weakness / Paresis",
      "Sensory Hypersensitivity",
      "Coordination Difficulties",
      "Generalized Physical Fatigue"
    ],
    highlightedConditions: [
      "Neuromuscular Recovery",
      "Neck & Spine Rigidity Release",
      "Vestibular & Balance Training",
      "Sensory Integration Therapy"
    ],
    benefits: [
      "Significant reduction in chronic neck and back stiffness",
      "Restored walking coordination and static/dynamic balance",
      "Improved sensory processing and reduced dizziness",
      "Rebuilt muscle strength and physical stamina",
      "Reclaimed independence in performing daily home tasks"
    ],
    timeline: [
      "Neurological reflex screen, spinal range check, and balance audit.",
      "Gentle manual spinal mobilization and soft-tissue stretches.",
      "Neuromuscular coordination exercises and balance track drills.",
      "Functional walking retraining, cognitive-motor integration, and home guidelines."
    ],
    faqs: [
      {
        question: "Why is neck stiffness common after meningitis?",
        answer: "Meningitis causes inflammation of the protective membranes around the brain and spinal cord, leading to reflex muscle guarding and severe stiffness. Manual therapy helps release this safely."
      },
      {
        question: "How does coordination training help?",
        answer: "Meningitis can temporarily affect balance centers in the brain. Coordination drills re-train the brain to process balance signals correctly."
      }
    ],
    ctaText: "Book Meningitis Assessment",
    iconName: "Brain",
    image: "/Media_Assets/images/service_neuro.png",
    isSubService: true
  },
  {
    name: "Encephalitis Treatment",
    slug: "encephalitis-treatment",
    category: "neuro",
    categoryLabel: "Neurological & Stroke Care",
    shortDesc: "Post-encephalitis motor recovery, neuromuscular facilitation, balance retraining, and cognitive physical therapy.",
    longDesc: "Our Encephalitis Treatment program focuses on rebuilding physical function and coordination after brain inflammation. Dr. Rohit Verma applies Proprioceptive Neuromuscular Facilitation (PNF), balance retraining, muscle strengthening, and multi-tasking mobility exercises to stimulate neuroplasticity, correct gait, and help patients return to daily life.",
    symptoms: [
      "Neuromuscular Weakness",
      "Coordination & Balance Loss",
      "Cognitive-Physical Lag",
      "Muscle Spasticity or Flaccidity",
      "Difficulty walking independently",
      "Spatial Disorientation"
    ],
    highlightedConditions: [
      "Post-Encephalitis Recovery",
      "PNF Neuromuscular Therapy",
      "Balance & Coordination Training",
      "Cognitive-Physical Reintegration"
    ],
    benefits: [
      "Restored voluntary muscle control and limb strength",
      "Significantly improved walking coordination and balance",
      "Re-stimulated neuroplastic pathways to speed up recovery",
      "Reduced muscle spasticity and joint stiffness",
      "Enhanced ability to perform daily tasks with less cognitive fatigue"
    ],
    timeline: [
      "Cognitive-motor screening, muscle power test, and balance checks.",
      "Neuromuscular facilitation (PNF) to stimulate movement patterns.",
      "Task-oriented training (reaching, transfer drills, coordinate steps).",
      "Gait retraining, multi-tasking mobility, and caregiver safety guidance."
    ],
    faqs: [
      {
        question: "How long does recovery take after encephalitis?",
        answer: "Recovery can take months as brain tissue heals. Early, structured physical therapy leverages neuroplasticity to accelerate movement recovery."
      },
      {
        question: "What is PNF therapy?",
        answer: "Proprioceptive Neuromuscular Facilitation uses diagonal movement patterns and resistance to stimulate dormant muscle groups and restore coordination."
      }
    ],
    ctaText: "Book Encephalitis Assessment",
    iconName: "Brain",
    image: "/Media_Assets/images/service_neuro.png",
    isSubService: true
  },
  {
    name: "MCL Injury Rehabilitation",
    slug: "mcl-injury-rehabilitation",
    category: "sports",
    categoryLabel: "Sports & Performance Rehab",
    shortDesc: "Structured brace-unloading, progressive lateral loading, and inner knee stability rehab for MCL sprains in Noida.",
    longDesc: "Our Medial Collateral Ligament (MCL) Rehabilitation program focuses on healing inner knee pain and restoring lateral joint stability. Dr. Rohit Verma uses a structured, phase-based protocol combining brace-unloading, local swelling reduction, progressive closed-kinetic chain exercises (squats/lunges), and lateral alignment correction to restore strength and prevent recurrence.",
    symptoms: [
      "Inner Knee Joint Pain",
      "Knee Instability / Wobbles",
      "Local Swelling & Tenderness",
      "Difficulty Bending the Knee",
      "Inner Knee Stiffness in Morning",
      "Giving Way during Side Movement"
    ],
    highlightedConditions: [
      "MCL Sprain Care (Grade I/II/III)",
      "Inner Knee Joint Stabilization",
      "Lateral Alignment Correction",
      "Proprioception & Pivot Training"
    ],
    benefits: [
      "Significant reduction in inner knee pain and swelling",
      "Restored joint stability and confidence during side movements",
      "Rebuilt quadriceps and hamstring muscle strength",
      "Avoidance of chronic joint laxity or meniscus tears",
      "Safe, accelerated return to running and sports activities"
    ],
    timeline: [
      "Inner knee ligament play test, checking range of motion and joint stability.",
      "Pain and swelling control using cold compression, ultrasound, and gentle passive range.",
      "Isometric quad sets and straight leg raises in a protective plane.",
      "Lateral loading progressions, agility drills, and return-to-sport testing."
    ],
    faqs: [
      {
        question: "Does an MCL tear require surgery?",
        answer: "Most MCL tears (Grade I and II) heal successfully without surgery using structured physical therapy and protective bracing to align the ligament fibers."
      },
      {
        question: "Why is lateral stability training critical?",
        answer: "The MCL prevents the knee from collapsing inward. Strengthening hip stabilizers and quadriceps helps support the ligament and prevents re-injury."
      }
    ],
    ctaText: "Book MCL Assessment",
    iconName: "Trophy",
    image: "/Media_Assets/images/service_sports.png",
    isSubService: true
  },
  {
    name: "PCL Injury Rehabilitation",
    slug: "pcl-injury-rehabilitation",
    category: "sports",
    categoryLabel: "Sports & Performance Rehab",
    shortDesc: "Quadriceps-dominant knee reloading and posterior joint stability rehabilitation for PCL injuries.",
    longDesc: "Our Posterior Cruciate Ligament (PCL) Rehabilitation program focuses on resolving knee instability when stepping down or decelerating. Because the PCL prevents the shin bone from sliding backward, Dr. Rohit Verma structures a quadriceps-dominant loading program, combined with hamstring control, to provide dynamic stability, reduce knee wear, and guide patients back to peak activity.",
    symptoms: [
      "Posterior Knee Pain",
      "Instability when Walking Downhill",
      "Difficulty Decelerating or Stopping",
      "Shin Bone Sagging Backward",
      "Joint Swelling & Stiffness",
      "Knee Buckling under Load"
    ],
    highlightedConditions: [
      "PCL Sprain Rehabilitation",
      "Quadriceps-Dominant Loading",
      "Deceleration & Landing Control",
      "Posterior Joint Play Control"
    ],
    benefits: [
      "Significant improvement in knee stability when stepping down or stopping",
      "Elimination of deep posterior knee pain and swelling",
      "Rebuilt quadriceps strength to act as a dynamic PCL support",
      "Avoidance of chronic cartilage wear on the kneecap",
      "Safe return to pivoting sports and running activities"
    ],
    timeline: [
      "Posterior drawer test, checking shin alignment and extension range.",
      "Swelling control, pain relief, and gentle passive range of motion.",
      "Quadriceps activation (isometrics, leg raises) without bending knee past 90 degrees.",
      "Closed-kinetic loading (squats, lunges) and deceleration landing drills."
    ],
    faqs: [
      {
        question: "Can I recover from a PCL injury without surgery?",
        answer: "Yes! The quadriceps muscle can be trained to dynamically pull the shin bone forward, compensating for a PCL injury and restoring knee stability without surgery."
      },
      {
        question: "Why should I avoid deep bending initially?",
        answer: "Bending the knee past 90 degrees pulls the shin bone backward, putting extra strain on the healing PCL. We restrict deep bending during the early recovery phases."
      }
    ],
    ctaText: "Book PCL Assessment",
    iconName: "Trophy",
    image: "/Media_Assets/images/service_sports.png",
    isSubService: true
  },
  {
    name: "Golfer's Elbow Treatment",
    slug: "golfers-elbow-treatment",
    category: "sports",
    categoryLabel: "Sports & Performance Rehab",
    shortDesc: "Clinical therapy for medial epicondylitis (Golfer's Elbow) using dry needling, eccentric flexor loading, and grip retraining.",
    longDesc: "Our Golfer's Elbow Treatment program targets medial epicondylitis, which causes pain on the inner side of the elbow. Dr. Rohit Verma combines manual myofascial release of the wrist flexor tendons, clinical dry needling to release knots, and progressive eccentric flexor strengthening to rebuild tendon resilience, increase grip strength, and allow pain-free forearm movement.",
    symptoms: [
      "Inner Elbow Pain (Medial Epicondylitis)",
      "Wrist Flexor Stiffness",
      "Weak Grip Strength",
      "Pain when Squeezing or Shaking Hands",
      "Inner Forearm Aches",
      "Radiating Pain to Wrist"
    ],
    highlightedConditions: [
      "Medial Epicondylitis (Golfer's Elbow)",
      "Wrist Flexor Tendinopathy Care",
      "Eccentric Flexor Strengthening",
      "Myofascial Trigger Point Release"
    ],
    benefits: [
      "Significant reduction in inner elbow pain and local tenderness",
      "Healed inner elbow tendons through progressive loading",
      "Improved grip strength and forearm flexibility",
      "Released wrist flexor muscle tightness and trigger points",
      "Ergonomic advice for hand movements to prevent recurrence"
    ],
    timeline: [
      "Palpation of medial epicondyle, grip check, and wrist flexor length test.",
      "Pain reduction using cold therapy, ultrasound, and manual release.",
      "Eccentric wrist flexor loading using specialized resistance tools.",
      "Grip strengthening, stretching, and forearm movement biomechanics."
    ],
    faqs: [
      {
        question: "What is the difference between tennis elbow and golfer's elbow?",
        answer: "Tennis elbow affects the outer tendon (extensors) and is caused by wrist extension. Golfer's elbow affects the inner tendon (flexors) and is caused by wrist flexion and gripping."
      },
      {
        question: "How does eccentric exercise heal golfer's elbow?",
        answer: "Eccentric exercise loads the tendon while it is lengthening, which stimulates collagen synthesis and strengthens tendon structure to handle repetitive hand movements."
      }
    ],
    ctaText: "Book Golfer's Elbow Assessment",
    iconName: "Trophy",
    image: "/Media_Assets/images/service_sports.png",
    isSubService: true
  },
  {
    name: "Ligament Injury Rehabilitation",
    slug: "ligament-injury-rehabilitation",
    category: "sports",
    categoryLabel: "Sports & Performance Rehab",
    shortDesc: "Targeted physical therapy for joint sprains, ligament tears (ankle, knee, wrist), and joint laxity in Noida.",
    longDesc: "Our Ligament Injury Rehabilitation program is designed to restore joint stability and structural integrity after ligament tears (such as ankle sprains or wrist ligament injuries). Dr. Rohit Verma constructs a comprehensive recovery plan combining progressive load-bearing, joint proprioception (balance) training, manual therapy to break down scar tissue, and muscle strengthening to support joint alignment.",
    symptoms: [
      "Joint Instability & Wobbles",
      "Local Swelling & Bruising",
      "Sharp Pain on Weight Bearing",
      "Restricted Range of Motion",
      "Joint Laxity / Hypermobility",
      "Popping Sound during Injury"
    ],
    highlightedConditions: [
      "Ligament Sprain Care (Ankle, Knee, Wrist)",
      "Proprioception & Balance Retraining",
      "Joint Stabilization Strengthening",
      "Scar Tissue Adhesions Release"
    ],
    benefits: [
      "Significant reduction in local joint pain and chronic swelling",
      "Full restoration of joint range of motion and flexibility",
      "Rebuilt joint balance and reflex stability (proprioception)",
      "Stronger supporting muscles to protect the ligament from stretching",
      "Reduced risk of recurring sprains and chronic joint instability"
    ],
    timeline: [
      "Ligament stress test, joint play review, and swelling check.",
      "Swelling reduction using compression, elevation, and ultrasound.",
      "Proprioceptive training and protective plane loading.",
      "Progressive high-impact agility drills and sport-specific movements."
    ],
    faqs: [
      {
        question: "How long does a ligament sprain take to heal?",
        answer: "Grade I sprains can recover in 2 to 4 weeks. Grade II or III tears may require 6 to 12 weeks of structured rehabilitation to restore joint stability and strength."
      },
      {
        question: "Why is balance training critical after a sprain?",
        answer: "Ligament tears damage balance receptors (proprioception) in the joint, making you prone to rolling it again. Balance exercises re-train these receptors."
      }
    ],
    ctaText: "Book Ligament Assessment",
    iconName: "Trophy",
    image: "/Media_Assets/images/service_sports.png",
    isSubService: true
  },
  {
    name: "Meniscus Injury Rehabilitation",
    slug: "meniscus-injury-rehabilitation",
    category: "sports",
    categoryLabel: "Sports & Performance Rehab",
    shortDesc: "Non-surgical meniscus repair support, manual joint glides, and progressive load loading for knee cartilage tears.",
    longDesc: "Our Meniscus Injury Rehabilitation program focuses on reducing knee clicking, swelling, and joint line pain caused by meniscus tears. Dr. Rohit Verma structures a non-surgical joint management plan utilizing manual joint glides, progressive closed-kinetic chain strengthening, and alignment training to decompress the knee cartilage and restore smooth, pain-free walking.",
    symptoms: [
      "Knee Joint Line Tenderness",
      "Clicking or Catching in Knee",
      "Joint Swelling & Warmth",
      "Difficulty Bending or Squatting",
      "Knee Locking Episodes",
      "Pain when Pivoting on Knee"
    ],
    highlightedConditions: [
      "Meniscal Tear Rehab (Medial/Lateral)",
      "Knee Decompression Glides",
      "Closed-Kinetic Chain Exercises",
      "Gait & Alignment Correction"
    ],
    benefits: [
      "Significant reduction in knee clicking and local joint line pain",
      "Complete resolution of joint locking and catching episodes",
      "Strengthened quad and hip stabilizer muscles to absorb impact",
      "Improved knee bending and squatting range of motion",
      "Effective prevention or delay of arthroscopic knee surgery"
    ],
    timeline: [
      "Knee joint line palpation, McMurray's test, and swelling review.",
      "Swelling control and gentle manual glides to decompress the joint.",
      "Isometric quad sets and hip alignment correction exercises.",
      "Progressive squatting loading, balance training, and pivoting drills."
    ],
    faqs: [
      {
        question: "Can a meniscus tear heal without surgery?",
        answer: "Yes! The outer third of the meniscus has a good blood supply and can heal, while tears in the inner zone can be managed by strengthening surrounding muscles to absorb impact."
      },
      {
        question: "What should I avoid with a meniscus tear?",
        answer: "Avoid deep squats, heavy twisting on a loaded knee, and running on hard surfaces during the early phases of rehabilitation."
      }
    ],
    ctaText: "Book Meniscus Assessment",
    iconName: "Trophy",
    image: "/Media_Assets/images/service_sports.png",
    isSubService: true
  },
  {
    name: "Patella Mobilization Therapy",
    slug: "patella-mobilization-therapy",
    category: "sports",
    categoryLabel: "Sports & Performance Rehab",
    shortDesc: "Manual patellar glides, patellofemoral tracking correction, and quadriceps alignment training in Noida.",
    longDesc: "Our Patella Mobilization Therapy program is designed to correct kneecap tracking issues (patellofemoral pain syndrome) and release knee stiffness. Dr. Rohit Verma applies precise, hands-on manual glides to the patella to break down retinacular tightness, combined with selective muscle activation (VMO strengthening) to restore normal kneecap tracking and walk pain-free.",
    symptoms: [
      "Kneecap Grinding (Crepitus)",
      "Dull Ache behind Kneecap",
      "Patellofemoral Tracking Issues",
      "Knee Stiffness after Sitting",
      "Pain when Walking Down Stairs",
      "Quadriceps Muscle Imbalances"
    ],
    highlightedConditions: [
      "Patellofemoral Pain Syndrome Care",
      "Manual Patellar Mobilization",
      "Vastus Medialis Obliquus (VMO) Activation",
      "Knee Retinacular Tightness Release"
    ],
    benefits: [
      "Complete relief from grinding sensations and pain behind the kneecap",
      "Restored smooth movement of the kneecap during bending",
      "Corrected patellar tracking through selective muscle building",
      "Reduced knee stiffness after prolonged sitting (theater sign)",
      "Safe return to stair climbing and running activities"
    ],
    timeline: [
      "Patellar tracking check, tilt test, and quadriceps angle review.",
      "Manual patellar glides (medial, lateral, superior, inferior) and heat.",
      "Selective VMO muscle recruitment and foam rolling of tight lateral structures.",
      "Progressive squat loading with correct kneecap tracking check."
    ],
    faqs: [
      {
        question: "What is patellofemoral pain syndrome?",
        answer: "It is pain behind or around the kneecap caused by the patella rubbing unevenly against the thigh bone, often due to tight outer thigh tissues or weak inner quad muscles."
      },
      {
        question: "How does patella mobilization help?",
        answer: "Gentle manual glides stretch tight ligaments around the kneecap, allowing it to slide smoothly within its groove, reducing friction and pain."
      }
    ],
    ctaText: "Book Patella Assessment",
    iconName: "Trophy",
    image: "/Media_Assets/images/service_sports.png",
    isSubService: true
  },
  {
    name: "Sprain Rehabilitation",
    slug: "sprain-rehabilitation",
    category: "sports",
    categoryLabel: "Sports & Performance Rehab",
    shortDesc: "Targeted clinical rehabilitation for ligament sprains (ankle, knee, wrist) to restore joint balance and prevent chronic laxity.",
    longDesc: "Our Sprain Rehabilitation program focuses on restoring stability, balance, and movement after a joint sprain. Dr. Rohit Verma uses a structured, phase-based recovery protocol combining manual joint mobilization, local swelling reduction, progressive load-bearing, and intensive balance conditioning (proprioceptive training) to protect the joint and prevent re-injury.",
    symptoms: [
      "Joint Laxity & Wobbles",
      "Local Swelling & Tenderness",
      "Bruising around Joint",
      "Pain on Weight Bearing",
      "Restricted Range of Motion",
      "Joint Stiffness after Rest"
    ],
    highlightedConditions: [
      "Ankle Sprain Care (Grade I/II/III)",
      "Knee Sprain Rehabilitation",
      "Wrist Sprain Care",
      "Proprioception & Balance Track"
    ],
    benefits: [
      "Significant reduction in local joint pain and chronic swelling",
      "Restored joint range of motion and flexibility",
      "Improved dynamic balance and walking stride length",
      "Stronger supporting muscles to protect the joint",
      "Reduced risk of developing chronic joint instability"
    ],
    timeline: [
      "Joint stability screening, range of motion check, and swelling review.",
      "Swelling modulation using cold compression, elevation, and ultrasound.",
      "Proprioceptive training and progressive loading exercises.",
      "Agility drills, running progressions, and return-to-play testing."
    ],
    faqs: [
      {
        question: "Should I use ice or heat for a sprain?",
        answer: "Use ice for the first 48 hours to control swelling and acute pain. After the initial inflammation subsides, heat helps relax tight surrounding muscles."
      },
      {
        question: "Why does my ankle feel weak after a sprain?",
        answer: "Ligament sprains damage sensory nerve endings that tell your brain where your foot is. Balance training is essential to rebuild these pathways."
      }
    ],
    ctaText: "Book Sprain Assessment",
    iconName: "Trophy",
    image: "/Media_Assets/images/service_sports.png",
    isSubService: true
  },
  {
    name: "Strain Rehabilitation",
    slug: "strain-rehabilitation",
    category: "sports",
    categoryLabel: "Sports & Performance Rehab",
    shortDesc: "Structured muscle tear rehabilitation, scar tissue breakdown, and eccentric loading for strains (hamstring, calf, back).",
    longDesc: "Our Strain Rehabilitation program is designed to heal pulled muscles (such as hamstring, calf, or quad strains) and rebuild tissue elasticity. Dr. Rohit Verma combines myofascial release, instrument-assisted soft tissue mobilization (IASTM) to break down restricted scar tissue, and progressive eccentric loading exercises to restore muscle length and prevent chronic pulls.",
    symptoms: [
      "Sharp Muscle Tear Pain",
      "Local Muscle Swelling & Spasm",
      "Restricted Muscle Flexibility",
      "Weakness during Muscle Contraction",
      "Taut Bands & Tenderness",
      "Bruising in Muscle Belly"
    ],
    highlightedConditions: [
      "Hamstring Pull Rehabilitation",
      "Calf Strain Recovery",
      "Quad Strain Care",
      "Eccentric loading & Elasticity Rehab"
    ],
    benefits: [
      "Significant reduction in sharp muscle pain and local swelling",
      "Restored muscle length, flexibility, and range of motion",
      "Healed muscle fibers aligned through structured eccentric loading",
      "Stronger muscle tissue resilient to future strains",
      "Safe return to running, sprinting, and sports activities"
    ],
    timeline: [
      "Muscle palpation, length testing, and contraction power check.",
      "Pain relief, gentle active stretching, and localized heat/TENS.",
      "Progressive eccentric loading (strengthening while muscle is lengthening).",
      "Agility drills, sport-specific sprints, and return-to-sport testing."
    ],
    faqs: [
      {
        question: "How is a strain different from a sprain?",
        answer: "A strain is an injury to a muscle or tendon (pulled muscle). A sprain is an injury to a ligament (joint stabilizer). Strains respond well to progressive loading."
      },
      {
        question: "Why do muscle strains recur frequently?",
        answer: "If a strained muscle heals without stretching and eccentric loading, it forms stiff scar tissue that easily tears again under stress. We focus on rebuilding elasticity."
      }
    ],
    ctaText: "Book Strain Assessment",
    iconName: "Trophy",
    image: "/Media_Assets/images/service_sports.png",
    isSubService: true
  },
  {
    name: "Muscle Spasm Treatment",
    slug: "muscle-spasm-treatment",
    category: "sports",
    categoryLabel: "Sports & Performance Rehab",
    shortDesc: "Advanced spasm release, myofascial trigger-point therapy, dry needling, and muscle relaxation for acute catches in Noida.",
    longDesc: "Our Muscle Spasm Treatment program is designed to quickly release painful muscle catches and cramps. Dr. Rohit Verma combines clinical dry needling, myofascial release, static stretching, and thermal therapy to deactivate hyperactive nerve signals, improve local circulation, and provide immediate muscle relaxation.",
    symptoms: [
      "Acute Painful Muscle Catches",
      "Involuntary Muscle Cramping",
      "Severe Muscle Tightness",
      "Restricted Range of Motion",
      "Localized Muscle Soreness",
      "Difficulty Moving Joint"
    ],
    highlightedConditions: [
      "Acute Muscle Spasm Release",
      "Myofascial Trigger Point Therapy",
      "Dry Needling & Cupping",
      "Localized Deep Heat Release"
    ],
    benefits: [
      "Immediate relief from sharp, locking muscle catches and spasms",
      "Restored range of motion and joint flexibility",
      "Increased local blood circulation to ease muscle tightness",
      "Reduced muscle soreness and metabolic waste build-up",
      "Educated stretches to prevent future muscle locking"
    ],
    timeline: [
      "Palpation of spasm zone, checking joint range of motion.",
      "Localized heat therapy, TENS, and gentle passive stretching.",
      "Deep tissue trigger point release and optional dry needling.",
      "Active range of motion exercises and posture integration guidance."
    ],
    faqs: [
      {
        question: "What causes sudden muscle spasms?",
        answer: "Spasms are involuntary contractions often triggered by muscle fatigue, dehydration, poor posture, or nerve irritation. Targeted stretching helps release them."
      },
      {
        question: "How quickly does physiotherapy relieve a spasm?",
        answer: "Many patients experience immediate relief from acute spasms within 1 to 2 sessions of manual release and dry needling."
      }
    ],
    ctaText: "Book Spasm Assessment",
    iconName: "Trophy",
    image: "/Media_Assets/images/service_sports.png",
    isSubService: true
  },
  {
    name: "Muscle Stiffness Treatment",
    slug: "muscle-stiffness-treatment",
    category: "sports",
    categoryLabel: "Sports & Performance Rehab",
    shortDesc: "Therapeutic heat, clinical stretching, myofascial release, and mobility retraining to resolve chronic muscle tightness.",
    longDesc: "Our Muscle Stiffness Treatment program targets chronic, diffuse muscle tightness that limits joint movement and creates posture fatigue. Dr. Rohit Verma combines thermal therapy, myofascial release, instrument-assisted soft tissue mobilization (IASTM), and active mobility routines to increase muscle compliance, improve blood flow, and make everyday movements feel light and free.",
    symptoms: [
      "Chronic Muscle Tightness",
      "Ergonomic Posture Fatigue",
      "Morning Muscle Rigidity",
      "Diffuse Body Aches",
      "Restricted Joint Movement",
      "Lactic Acid Accumulation"
    ],
    highlightedConditions: [
      "Chronic Muscle Rigidity Care",
      "Myofascial Release & IASTM",
      "Active Mobility Exercises",
      "Workplace Ergonomic Correction"
    ],
    benefits: [
      "Significant reduction in chronic muscle stiffness and body aches",
      "Improved flexibility, posture, and joint range of motion",
      "Increased blood circulation and oxygen supply to muscles",
      "Decreased morning muscle stiffness and fatigue",
      "Enhanced ease of movement during daily activities"
    ],
    timeline: [
      "Assessment of muscle length, joint range of motion, and posture.",
      "Deep heat therapy, foam rolling, and active-assisted stretches.",
      "Targeted myofascial release and localized soft-tissue glides.",
      "Active mobility integration, posture habits, and home stretches."
    ],
    faqs: [
      {
        question: "Why do my muscles feel stiff in the morning?",
        answer: "During sleep, circulation slows and inflammatory markers can pool in tight muscles. Gentle movement and thermal therapy help increase circulation and resolve stiffness."
      },
      {
        question: "Can stretching alone cure muscle stiffness?",
        answer: "Stretching helps, but releasing myofascial restrictions and improving posture habits are critical for long-term relief."
      }
    ],
    ctaText: "Book Stiffness Assessment",
    iconName: "Trophy",
    image: "/Media_Assets/images/service_sports.png",
    isSubService: true
  }
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}
