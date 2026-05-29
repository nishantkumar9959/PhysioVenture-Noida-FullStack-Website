export interface ServiceDetail {
  name: string;
  slug: string;
  category: "neuro" | "ortho" | "active" | "specialized";
  categoryLabel: string;
  shortDesc: string;
  longDesc: string;
  symptoms: string[];
  timeline: string[];
  faqs: { question: string; answer: string }[];
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    name: "Aquatic Physiotherapy",
    slug: "aquatic-physiotherapy",
    category: "active",
    categoryLabel: "Active Rehab & Water Therapy",
    shortDesc: "Water-based physical therapy designed to reduce joint impact and support biomechanical recovery.",
    longDesc: "Aquatic Physiotherapy utilizes the physical properties of water—buoyancy, hydrostatic pressure, and thermal warmth—to facilitate rehabilitation. By reducing weight-bearing stresses on painful joints, water therapy allows stroke survivors, arthritis patients, and post-surgery individuals to perform range-of-motion and strengthening exercises that would be too painful or difficult on land.",
    symptoms: ["Severe joint arthritis", "Fibromyalgia & chronic pain", "Post-operative weight-bearing restrictions", "Neurological balance disorders", "Spinal cord decompression recovery"],
    timeline: [
      "Initial land evaluation to assess cardiovascular status, wound healing, and mobility limitations.",
      "Gentle water acclimatization, utilizing buoyancy to perform joint decompression and active range of motion.",
      "Progressive resistive training using water currents, aqua dumbbells, and dynamic balance tracks.",
      "Gradual transition back to land-based functional activities and home exercise routines."
    ],
    faqs: [
      { question: "Is swimming skills required for aquatic physiotherapy?", answer: "No, swimming is not required. Most therapeutic exercises are performed standing or walking in chest-deep water, supported by therapists and flotation devices." },
      { question: "Are aquatic therapy sessions available as home visits?", answer: "Since aquatic therapy requires a heated pool setup, we can coordinate these sessions at selected partner clinical pools in Noida or at your society's indoor pool under strict therapist supervision." }
    ]
  },
  {
    name: "Arthritis Treatment",
    slug: "arthritis-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine",
    shortDesc: "Specialized therapy to manage stiffness, reduce joint swelling, and improve osteoarthritis mobility.",
    longDesc: "Our Arthritis Treatment program focuses on mitigating joint inflammation, strengthening surrounding muscle groups to decompress joints, and preserving range of motion. We design custom pathways for Osteoarthritis (OA), Rheumatoid Arthritis (RA), and Ankylosing Spondylitis, ensuring patients in Noida maintain their functional independence and active lifestyle.",
    symptoms: ["Morning stiffness lasting over 30 minutes", "Joint swelling and tenderness", "Crepitus (grating sound in joints)", "Loss of joint flexibility", "Chronic pain during walking or stairs"],
    timeline: [
      "Biomechanical assessment of joint alignment, gait stability, and functional limitations.",
      "Acute pain relief using thermal therapy, gentle myofascial release, and joint mobilization.",
      "Custom muscle strengthening to decompress arthritic joints and improve structural support.",
      "Long-term joint protection strategies, lifestyle modification guides, and home exercises."
    ],
    faqs: [
      { question: "Can physiotherapy reverse osteoarthritis?", answer: "While physiotherapy cannot reverse structural cartilage loss, it significantly reduces pain, improves joint lubrication, strengthens supporting muscles, and halts rapid progression." },
      { question: "How often should I get therapy for arthritis?", answer: "Typically, 2-3 sessions per week are recommended initially, transitioning to a structured home plan once joint stability improves." }
    ]
  },
  {
    name: "Back Pain Treatment",
    slug: "back-pain-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine",
    shortDesc: "Comprehensive lumbar diagnosis, core alignment, and pain mitigation for slip disc and sciatica.",
    longDesc: "Back Pain is one of the most common issues among corporate professionals in Noida. Our Back Pain Treatment targets the underlying cause, whether it is a slip disc (herniated disc), sciatica, muscle strain, or spinal stenosis. We combine manual chiropractic adjustments, core stabilization protocols, and postural alignment therapies to achieve long-term pain relief and prevent recurrence.",
    symptoms: ["Sharp or dull lower back ache", "Radiating leg pain or numbness (Sciatica)", "Difficulty standing straight or bending", "Stiffness in the lumbar spine", "Pain triggered by prolonged sitting"],
    timeline: [
      "Neurological screening (reflexes, dermatomes) and spine alignment analysis.",
      "Decompression maneuvers, manual therapy, and electrical stimulation for acute pain relief.",
      "Core muscle reactivation (McKenzie method / core stability progressions).",
      "Ergonomic re-education, postural alignment drills, and long-term spine care home plans."
    ],
    faqs: [
      { question: "When should I choose home visits for back pain?", answer: "If you have acute sciatica or a slip disc flare-up making it difficult to sit in a car or stand, home-visit physical therapy is highly recommended to start initial relief therapy immediately." },
      { question: "Is a doctor referral necessary for back pain treatment?", answer: "No, a referral is not required. Dr. Rohit Verma conducts a complete diagnostic screen during the first session. If red flags are identified, we will refer you for an MRI or specialist consultation." }
    ]
  },
  {
    name: "Balance Exercise Therapy",
    slug: "balance-exercise-therapy",
    category: "neuro",
    categoryLabel: "Neurological & Stroke",
    shortDesc: "Targeted training for post-stroke, neurological deficits, or age-related balance challenges.",
    longDesc: "Balance Exercise Therapy is a critical component of neurological and geriatric rehabilitation. Using specialized balance tracks, foam surfaces, and coordination drills, we stimulate proprioceptive pathways, strengthen core stabilizers, and re-train the brain to process spatial orientation, reducing the risk of falls and improving gait patterns.",
    symptoms: ["Frequent stumbling or near-falls", "Dizziness during walking", "Fear of falling on uneven surfaces", "Post-stroke gait asymmetry", "Age-related walking instability"],
    timeline: [
      "Quantitative balance assessment (Berg Balance Scale) and fall risk evaluation.",
      "Static balance training focusing on weight-shifting, single-limb support, and posture.",
      "Dynamic balance exercises on unstable surfaces, incorporating head movements and dual-tasking.",
      "Integration of real-world functional obstacle courses and home fall-proofing checks."
    ],
    faqs: [
      { question: "How long does it take to improve balance?", answer: "Neurological and sensory balance adaptations typically take 6 to 12 weeks of consistent, progressive training to show stable, long-term improvement." },
      { question: "Can balance therapy be done at home?", answer: "Yes, balance training is highly effective as a home visit because we can train you directly on the surfaces and stairs you navigate daily, while making home-safety recommendations." }
    ]
  },
  {
    name: "Chiropractic Care",
    slug: "chiropractic-care",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine",
    shortDesc: "Manual spinal adjustment and joint mobilization techniques to restore alignment and relieve pressure.",
    longDesc: "Chiropractic Care at PhysioVenture combines manual spine manipulation with physical therapeutic modalities. Dr. Rohit Verma uses precise, gentle thrusts to adjust misaligned spinal segments, restoring normal joint biomechanics, relieving compressed nerves, and relaxing chronic muscle splinting. Highly effective for neck stiffness, tension headaches, and chronic lower back pain.",
    symptoms: ["Spinal stiffness and restricted neck rotation", "Tension headaches and shoulder tightness", "Facet joint lock or localized back catches", "Postural misalignment", "Chronic pelvis tilt"],
    timeline: [
      "Palpation study of spinal segments and active range-of-motion testing.",
      "Myofascial release of tight spinal muscles and preparatory thermal therapy.",
      "Precise joint manipulation (adjustments) to correct structural restrictions.",
      "Stabilizing therapeutic exercises to maintain the corrected alignment."
    ],
    faqs: [
      { question: "Are chiropractic adjustments safe?", answer: "Yes, when performed by a qualified physical therapist like Dr. Rohit Verma who has advanced training in manual adjustments. We screen for contraindications like osteoporosis first." },
      { question: "What is the 'popping' sound during an adjustment?", answer: "The sound is called cavitation. It is simply the release of gas bubbles (nitrogen) from the joint fluid when the joint space is gently opened, relieving pressure." }
    ]
  },
  {
    name: "Foot & Ankle Pain Treatment",
    slug: "foot-ankle-pain-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine",
    shortDesc: "Recovery plans for heel spurs, plantar fasciitis, Achilles tendonitis, and ankle sprains.",
    longDesc: "Our Foot & Ankle rehabilitation program addresses complex weight-bearing structures. Whether you are dealing with a severe ligament sprain, chronic heel pain from plantar fasciitis, or Achilles tendon tightness, we focus on restoring structural flexibility, calf strength, and proper foot arches to ensure painless walking and running.",
    symptoms: ["Sharp heel pain in the morning", "Swelling around the ankle joint after a twist", "Pain in the calf tendon during push-off", "Arch soreness or flat-foot fatigue", "Difficulty standing for prolonged periods"],
    timeline: [
      "Gait pattern, foot pressure distribution, and ankle joint range assessment.",
      "Pain and swelling control using cold compression, ultrasound, and cross-friction massage.",
      "Manual mobilization of tarsal bones, Achilles stretching, and intrinsic foot muscle strengthening.",
      "Proprioceptive balance training, footwear consulting, and custom orthotic recommendations."
    ],
    faqs: [
      { question: "How long does a severe ankle sprain take to heal?", answer: "A mild sprain recovers in 2-3 weeks, whereas a severe Grade 2/3 tear may require 6-12 weeks of structured loading and balance therapy to restore full joint stability." },
      { question: "Can plantar fasciitis be treated at home?", answer: "Yes, stretching, taping, local ultrasound, and foot strengthening exercises are highly compatible with home visits." }
    ]
  },
  {
    name: "Geriatric Physiotherapy",
    slug: "geriatric-physiotherapy",
    category: "specialized",
    categoryLabel: "Specialized Programs",
    shortDesc: "Active aging rehabilitation to maintain muscle tone, flexibility, strength, and fall prevention.",
    longDesc: "Geriatric Physiotherapy is designed to help older adults remain independent, active, and free from chronic pain. We address age-related challenges such as osteoporosis, generalized weakness, joint stiffness, and balance deficits, focusing on safe, gentle physical conditioning and home fall prevention strategies.",
    symptoms: ["Generalized age-related weakness", "Difficulty rising from a chair or bed", "Stiffness in multiple joints", "Unsteady gait or fear of falling", "Reduced stamina and breathlessness on exertion"],
    timeline: [
      "Comprehensive senior assessment evaluating balance, strength, safety, and cognitive comfort.",
      "Gentle joint mobilization and low-impact cardiovascular conditioning.",
      "Targeted lower limb strengthening (sit-to-stand re-training, calf raises).",
      "Home safety assessment, fall prevention counseling, and progressive daily active living plans."
    ],
    faqs: [
      { question: "Is geriatric physiotherapy painful for elderly patients?", answer: "No, geriatric physiotherapy is very gentle and paced according to the senior's comfort level. The focus is on encouraging comfortable movement, not straining." },
      { question: "Can my father receive therapy post-hospital discharge at home?", answer: "Yes, we specialize in transitional home care post-hospitalization, helping seniors regain muscle mass and baseline mobility safely at home." }
    ]
  },
  {
    name: "Heat Therapy",
    slug: "heat-therapy",
    category: "specialized",
    categoryLabel: "Specialized Programs",
    shortDesc: "Clinical application of thermal energy to improve tissue compliance, increase blood flow, and soothe spasm.",
    longDesc: "Clinical Heat Therapy uses specialized moist hot packs, paraffin wax baths, or infrared radiation to deep-heat soft tissues. This dilates blood vessels, bringing oxygen-rich blood to injured tissues, relaxes tight muscles, reduces joint stiffness, and prepares the body for stretching and manual mobilization.",
    symptoms: ["Chronic muscle stiffness and spasm", "Osteoarthritic joint stiffness", "Tension headaches and neck tightness", "Chronic muscle knots and fibromyalgia", "Pre-exercise tissue tightness"],
    timeline: [
      "Skin sensitivity testing and temperature tolerance check.",
      "Application of targeted moist heat packs or thermal modalities for 15-20 minutes.",
      "Immediate manual stretching or mobilization while the collagen fibers are warm and pliable.",
      "Stabilization exercises to secure the newly gained range of motion."
    ],
    faqs: [
      { question: "When should I use heat instead of ice?", answer: "Use heat for chronic pain, muscle stiffness, and joint tightness. Use ice for acute injuries, swelling, and fresh sprains (within the first 48 hours)." },
      { question: "Is heat therapy safe for home visits?", answer: "Yes, we bring specialized medical thermal wraps and infrared devices that are safe and temperature-controlled for home environments." }
    ]
  },
  {
    name: "Hip Pain Treatment",
    slug: "hip-pain-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine",
    shortDesc: "Specialized diagnostics and strengthening for hip bursitis, labral tears, and joint stiffness.",
    longDesc: "Hip Pain can severely impact daily activities like sitting, walking, or sleeping on your side. We treat hip problems including bursitis, arthritis, hip impingement (FAI), and post-operative hip replacement. Our focus is on stabilizing the pelvis, strengthening gluteal muscles, and restoring smooth joint glide.",
    symptoms: ["Pain in the groin or outer thigh", "Clicking or locking sensation in the hip", "Difficulty putting on socks or shoes", "Limping or asymmetric gait", "Pain when lying on the affected hip"],
    timeline: [
      "Assessment of hip joint mobility, pelvis alignment, and core/gluteal strength.",
      "Manual manual therapy, soft tissue release, and dry needling to reduce acute hip pocket pain.",
      "Progressive gluteal, core, and hip rotation strengthening exercises.",
      "Functional integration: squatting, gait correction, and single-leg balance stability."
    ],
    faqs: [
      { question: "How long does rehab take after a total hip replacement?", answer: "Total hip rehabilitation spans 6-12 weeks. Initial mobility starts day one, with progressive strengthening continuing to restore full walking function by week 8." },
      { question: "What is causing pain in my groin when I walk?", answer: "Groin pain is often a sign of hip joint involvement, such as osteoarthritis, labral tears, or hip flexor strains. Dr. Rohit Verma will diagnose this during your evaluation." }
    ]
  },
  {
    name: "Hydrotherapy Training",
    slug: "hydrotherapy-training",
    category: "active",
    categoryLabel: "Active Rehab & Water Therapy",
    shortDesc: "Structured water-based exercise training for active athletic recovery and strength rebuilding.",
    longDesc: "Hydrotherapy Training goes beyond basic therapy, offering athletic conditioning and load-free resistance training. Conducted in temperature-controlled water, this program is ideal for athletes returning from ACL surgery, runners with stress fractures, and individuals needing structured cardiovascular conditioning without joint compression.",
    symptoms: ["Post-surgical athletic recovery", "Stress fractures restricting running", "Severe muscular detraining", "Chronic fatigue syndrome", "Low cardiovascular capacity due to joint pain"],
    timeline: [
      "Assessment of physical capacity, surgical recovery status, and conditioning goals.",
      "Water resistance exercises using kickboards, aquatic bells, and deep-water running belts.",
      "Interval aquatic training to restore cardiovascular stamina and athletic movement patterns.",
      "Transition to high-performance land training and active sport-specific drills."
    ],
    faqs: [
      { question: "How does hydrotherapy help athletes?", answer: "Water buoyancy allows athletes to maintain running mechanics and cardiovascular fitness even when they are not permitted to load their bones/joints on land." },
      { question: "Can we use a community pool for this?", answer: "Yes, we can conduct hydrotherapy sessions at private or community pools in Noida, provided they meet basic depth and temperature requirements." }
    ]
  },
  {
    name: "Inpatient Physiotherapy",
    slug: "inpatient-physiotherapy",
    category: "specialized",
    categoryLabel: "Specialized Programs",
    shortDesc: "Short-term clinic-admitted physical therapy for intensive orthopedic and neurological healing.",
    longDesc: "For patients requiring intensive, daily, multi-hour rehabilitation, our inpatient physical therapy protocols coordinate intensive orthopedic and stroke care. Ideal for post-acute stroke recovery, severe spinal trauma, and complex polytrauma, this program ensures close clinical monitoring and accelerated recovery timelines.",
    symptoms: ["Acute stroke with complete hemiplegia", "Polytrauma recovery post multiple fractures", "Severe spinal cord injury needing assistance", "Deconditioned state post prolonged ICU stay"],
    timeline: [
      "Multidisciplinary clinical review of surgical records, vitals, and initial functional baseline.",
      "Daily twice-a-day structured physical and occupational therapy sessions.",
      "Progressive mobilization, bed mobility training, transfer practice, and assisted standing.",
      "Home-transition preparation, family caregiver training, and home-visit continuity setup."
    ],
    faqs: [
      { question: "Do you have an overnight stay facility at the clinic?", answer: "We focus primarily on clinic outpatient visits and home visits. For intensive inpatient needs, we partner with specialized care facilities in Noida or set up 24/7 care support at your home." },
      { question: "How is this different from regular home visits?", answer: "Inpatient-level care involves more intensive, multi-session daily therapy combined with nursing support, which we can coordinate directly for home setups." }
    ]
  },
  {
    name: "Knee Pain Treatment",
    slug: "knee-pain-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine",
    shortDesc: "Post-injury and osteoarthritic knee therapy for restoring full articulation, strength, and gait.",
    longDesc: "Knee Pain is highly prevalent among Noida's aging population and active runners. We treat knee arthritis, ACL/meniscus tears, patellar tendonitis, and post-total knee replacement (TKR). Our treatment reduces knee inflammation, improves range of motion (flexion/extension), and strengthens the quadriceps, hamstrings, and glutes to stabilize the knee joint.",
    symptoms: ["Pain when walking down stairs", "Knee swelling, warmth, or stiffness", "Inability to fully bend or straighten the leg", "Clicking, popping, or 'giving way' of the knee", "Difficulty walking after sitting for a while"],
    timeline: [
      "Evaluation of knee joint articulation, ligament stability, patella glide, and quadriceps lag.",
      "Swelling reduction with cold compress, microcurrents, and gentle patellar mobilization.",
      "Progressive knee strengthening (isometric quad drills to dynamic lunges) and muscle balancing.",
      "Gait re-education, biomechanical adjustment for stairs, and return-to-sport testing."
    ],
    faqs: [
      { question: "How long after Knee Replacement (TKR) should physiotherapy start?", answer: "Physiotherapy should start within 24 to 48 hours after surgery. Early movement prevents knee stiffness and blood clots, which is why our home-visit post-TKR protocol is highly sought after." },
      { question: "Can a torn meniscus heal without surgery?", answer: "Yes, mild to moderate meniscus tears (Grade 1 & 2) respond exceptionally well to conservative physiotherapy focusing on knee stabilization and tracking." }
    ]
  },
  {
    name: "Massage Therapy",
    slug: "massage-therapy",
    category: "specialized",
    categoryLabel: "Specialized Programs",
    shortDesc: "Clinical myofascial release, deep tissue therapy, and trigger point targeting for recovery.",
    longDesc: "Clinical Massage Therapy at PhysioVenture goes beyond basic spa relaxation. Dr. Rohit Verma applies anatomical expertise to perform myofascial release, deep tissue friction, and trigger point therapy. This breaks down muscle adhesions (scar tissue), improves lymphatic drainage, flushes out metabolic waste, and relieves chronic muscular tension.",
    symptoms: ["Chronic muscle knots and trigger points", "Muscle tightness from intense workouts", "Post-exercise soreness and lactic acid buildup", "Reduced range of motion due to tight muscles", "Stress-induced shoulder and neck tension"],
    timeline: [
      "Assessment of muscle tone, identification of active trigger points, and pain mapping.",
      "Application of clinical soft tissue release techniques for 30-45 minutes.",
      "Mild stretching to lengthen the newly relaxed muscle fibers.",
      "Hydration guidance and self-release education using foam rollers or massage balls."
    ],
    faqs: [
      { question: "How is clinical massage different from a regular spa massage?", answer: "Clinical massage is goal-oriented and performed by a physical therapist. It targets specific anatomical structures, trigger points, and fascial restrictions to resolve pain and dysfunction." },
      { question: "Can I book a massage session for general relaxation?", answer: "While relaxing, our massage therapy sessions are clinical interventions designed for pain relief, muscle injury recovery, and athletic conditioning." }
    ]
  },
  {
    name: "Neurological Physiotherapy",
    slug: "neurological-physiotherapy",
    category: "neuro",
    categoryLabel: "Neurological & Stroke",
    shortDesc: "Specialized neural plasticity programs for stroke recovery, Parkinson's disease, and balance disorders.",
    longDesc: "Neurological Physiotherapy focuses on re-wiring the nervous system through neuroplasticity. We treat stroke (hemiplegia), Parkinson's disease, Multiple Sclerosis, Guillain-Barré Syndrome (GBS), and facial palsy. Dr. Rohit Verma designs progressive sensory-motor retraining, balance tracks, and functional coordination tasks to help neurological patients reclaim control over their bodies.",
    symptoms: ["One-sided body weakness or paralysis (Hemiplegia)", "Loss of hand function and coordination", "Tremors, rigidity, or shuffling gait", "Difficulty speaking or facial asymmetry (Palsy)", "Impaired spatial awareness and balance"],
    timeline: [
      "Comprehensive neurological screening: muscle tone (spasticity check), reflexes, and functional safety.",
      "Facilitation techniques (PNF, Bobath) to activate dormant muscle groups and reduce spasticity.",
      "Task-specific functional training (reaching, grasping, sit-to-stand, gait re-training).",
      "Progressive independence training, family caregiver education, and regular mobility monitoring."
    ],
    faqs: [
      { question: "Can a patient recover from a stroke after 6 months?", answer: "Yes! While the fastest recovery occurs in the first 3-6 months, neuroplasticity continues for years. Structured, repetitive physical therapy can produce significant functional gains even years post-stroke." },
      { question: "Do you provide neurological physiotherapy as a home visit in Noida?", answer: "Yes, neurological rehabilitation is our primary home visit specialty. Treating stroke or Parkinson's patients in their home environment allows us to train them on actual daily tasks in their own space." }
    ]
  },
  {
    name: "Occupational Therapy",
    slug: "occupational-therapy",
    category: "specialized",
    categoryLabel: "Specialized Programs",
    shortDesc: "Adapting physical tasks and biomechanics to restore functional independence in daily living.",
    longDesc: "Occupational Therapy (OT) helps patients adapt to their physical challenges to perform daily activities. From dressing and eating to using computers and driving, we work with neurological, pediatric, and post-injury patients to improve fine motor skills, cognitive function, and coordinate assistive technology or home adjustments.",
    symptoms: ["Difficulty dressing, writing, or feeding oneself", "Impaired fine motor coordination", "Cognitive or sensory processing issues", "Hand injuries restricting daily tasks", "Need for home environmental modifications"],
    timeline: [
      "Evaluation of daily living skills (ADLs), hand dexterity, and sensory-motor integration.",
      "Fine motor training, hand therapy, and cognitive exercises.",
      "Training in adaptive techniques and the use of assistive devices (eating grips, button hooks).",
      "Home or workplace ergonomic evaluation and structural adjustment guidance."
    ],
    faqs: [
      { question: "What is the difference between physical therapy and occupational therapy?", answer: "Physical therapy focuses on restoring gross motor function, strength, and overall joint movement. Occupational therapy focuses on fine motor skills, hand coordination, and adapting daily tasks to maximize independence." },
      { question: "Is OT available for pediatric developmental delays?", answer: "Yes, our pediatric OT plans focus on sensory integration and fine motor play to help children reach their developmental milestones." }
    ]
  },
  {
    name: "Orthopaedic Rehabilitation",
    slug: "orthopaedic-rehabilitation",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine",
    shortDesc: "Restoring range of motion, muscle strength, and bone load-bearing post-fracture or orthopaedic injury.",
    longDesc: "Orthopaedic Rehabilitation is the cornerstone of musculoskeletal recovery. If you are recovering from a fracture, joint dislocation, ligament tear, or severe muscle strain, our program focuses on rebuilding range of motion, strengthening muscles, correcting gait compensations, and restoring tissue elasticity.",
    symptoms: ["Restricted joint movement post fracture removal", "Muscle wasting (atrophy) around an injured joint", "Persistent pain or stiffness after a trauma", "Limping or fear of loading an injured limb", "Chronic tendonitis or bursitis"],
    timeline: [
      "Assessment of bone healing state, joint mobility, muscle girth, and pain threshold.",
      "Manual joint mobilization, gentle stretching, and soft tissue release to restore initial range.",
      "Progressive strengthening using isometric, isotonic, and eccentric exercise loads.",
      "Functional integration: landing, jumping, lifting, and return to unrestricted daily activity."
    ],
    faqs: [
      { question: "When should I start orthopaedic rehab post-fracture?", answer: "Rehab starts immediately after your orthopedic doctor confirms bone stability or removes the plaster cast. Early mobilization prevents permanent joint stiffness." },
      { question: "Do you bring weights and bands to home visits?", answer: "Yes, we bring complete portable rehabilitation kits containing therabands, foam pads, and dynamic cuffs to every home visit." }
    ]
  },
  {
    name: "Paediatric Physiotherapy",
    slug: "paediatric-physiotherapy",
    category: "specialized",
    categoryLabel: "Specialized Programs",
    shortDesc: "Developmental assessment and therapeutic movement training for children with delays.",
    longDesc: "Paediatric Physiotherapy addresses gross motor development and neuromuscular health in infants, toddlers, and children. We treat cerebral palsy, developmental delays, torticollis, and gait abnormalities. Dr. Rohit Verma uses fun, play-based exercises to stimulate motor planning, improve muscle tone, and encourage normal developmental milestones.",
    symptoms: ["Delayed rolling, sitting, crawling, or walking", "Asymmetric movements or tilting the head to one side", "Toe walking or frequent tripping", "Floppy muscle tone or severe stiffness", "Cerebral palsy motor difficulties"],
    timeline: [
      "Developmental milestone check, muscle tone evaluation, and reflex analysis.",
      "Play-based sensory-motor exercises to encourage coordination, core strength, and balance.",
      "Task-specific developmental training (crawling tracks, assisted standing).",
      "Comprehensive parent education, home play guides, and orthotic/bracing consulting."
    ],
    faqs: [
      { question: "At what age can paediatric physiotherapy start?", answer: "It can start as early as a few weeks old for conditions like torticollis (neck tilt) or identified early developmental motor delays." },
      { question: "Are pediatric sessions conducted at home?", answer: "Yes, pediatric therapy is highly successful at home where the child feels comfortable, secure, and surrounded by their own toys." }
    ]
  },
  {
    name: "Physical Therapy",
    slug: "physical-therapy",
    category: "active",
    categoryLabel: "Active Rehab & Water Therapy",
    shortDesc: "Standard functional assessment and recovery plans for musculoskeletal sprains and strains.",
    longDesc: "Our core Physical Therapy service addresses daily musculoskeletal aches, sports strains, and bad posture. Using a blend of manual therapy, postural corrections, and specialized exercise prescriptions, we target the root causes of pain in your neck, back, knees, and shoulders to restore natural, fluid movement.",
    symptoms: ["General neck and shoulder stiffness", "Muscle strain from sudden lifting", "Postural neck ache (text neck)", "Mild joint pain after exercise", "Restricted range of motion in daily tasks"],
    timeline: [
      "Assessment of posture, muscle balance, flexibility, and daily movement triggers.",
      "Manual therapy, dry needling, and pain relief modalities (TENS/Ultrasound).",
      "Targeted stretching and biomechanical posture alignment exercises.",
      "Prescription of a customized home exercise program to maintain alignment."
    ],
    faqs: [
      { question: "What should I wear to a physical therapy session?", answer: "Wear loose, comfortable clothing (like t-shirts and track pants) that allows easy access to the painful area and lets you move freely." },
      { question: "How long is each physical therapy session?", answer: "Each session typically lasts 45 to 60 minutes, focusing on manual work, modality application, and structured exercises." }
    ]
  },
  {
    name: "Post-Surgery Rehabilitation",
    slug: "post-surgery-rehabilitation",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine",
    shortDesc: "Intensive timeline-driven protocols for recovery post joint replacement, ligament repair, or spinal surgery.",
    longDesc: "Post-Surgery Rehabilitation is crucial to ensure the success of your orthopaedic or neurological surgery. We specialize in recovery protocols post Total Knee Replacement (TKR), Total Hip Replacement (THR), ACL reconstruction, rotator cuff repair, and spine surgeries (discectomy/laminectomy). We coordinate with your surgical guidelines to restore range, prevent scarring, and rebuild muscle strength safely.",
    symptoms: ["Joint stiffness and swelling post-surgery", "Wasting of muscles surrounding the surgical site", "Difficulty walking or loading the operated joint", "Pain and scar tissue tightness", "Fear of moving the operated limb"],
    timeline: [
      "Review of surgeon guidelines, surgical incision healing check, and swelling control.",
      "Gentle passive range of motion, scar tissue mobilization, and circulatory exercises.",
      "Progressive active-assisted exercises and initial isometric muscle strengthening.",
      "Advanced resistance training, gait correction, balance drills, and return to full independence."
    ],
    faqs: [
      { question: "Why is post-surgery rehab important?", answer: "Without structured rehab, surgical joints can develop severe scar tissue adhesions, leading to permanent stiffness, muscle weakness, and chronic pain. Rehabilitation ensures you get the full benefit of your surgery." },
      { question: "Do you coordinate with my operating surgeon?", answer: "Yes. Dr. Rohit Verma carefully reviews your surgeon's discharge notes and specific protocol guidelines to ensure our home therapy matches their surgical parameters." }
    ]
  },
  {
    name: "Shoulder Pain Treatment",
    slug: "shoulder-pain-treatment",
    category: "ortho",
    categoryLabel: "Orthopaedic & Spine",
    shortDesc: "Focused therapy for frozen shoulder, rotator cuff tendonitis, and shoulder impingement syndrome.",
    longDesc: "The shoulder is the body's most mobile joint, making it highly susceptible to injury. We treat frozen shoulder (adhesive capsulitis), rotator cuff tears, tendonitis, and impingement. Our program focuses on reducing inflammation, using manual mobilization to break shoulder capsule stiffness, and strengthening rotator cuff muscles to restore overhead reach.",
    symptoms: ["Inability to raise your arm overhead or reach behind your back", "Sharp pain when lifting objects or sleeping on the shoulder", "Dull ache around the shoulder joint", "Clicking or grinding sound when rotating the arm", "Progressive loss of shoulder movement"],
    timeline: [
      "Assessment of shoulder biomechanics, scapular tracking, and rotator cuff strength.",
      "Capsular mobilization, manual stretching, and electrical modalities to reduce acute pain.",
      "Rotator cuff strengthening, scapular stabilization, and kinetic chain integration.",
      "Dynamic overhead functional drills, posture correction, and home maintenance guidelines."
    ],
    faqs: [
      { question: "How long does it take to resolve a frozen shoulder?", answer: "Frozen shoulder typically progresses through freezing, frozen, and thawing stages. With intensive physiotherapy, we can significantly accelerate recovery, reducing the timeline from 18 months down to 3-6 months." },
      { question: "Can dry needling help my shoulder pain?", answer: "Yes, dry needling is highly effective for releasing stubborn trigger points in the rotator cuff and shoulder muscles, providing quick pain relief and range improvements." }
    ]
  },
  {
    name: "Spinal Injury Rehabilitation",
    slug: "spinal-injury-rehabilitation",
    category: "neuro",
    categoryLabel: "Neurological & Stroke",
    shortDesc: "Long-term progressive physical therapy to maximize nerve function and core strength after spinal trauma.",
    longDesc: "Spinal Cord Injury (SCI) rehabilitation requires dedicated, long-term, specialized physical therapy. Whether addressing incomplete paraplegia or quadriplegia, our progressive programs focus on maximizing remaining nerve function, managing spasticity, rebuilding core and upper-body strength, preventing secondary complications, and guiding patients toward functional independence.",
    symptoms: ["Loss of sensation or motor function below the injury level", "Muscle spasticity or uncontrolled spasms", "Impaired bladder/bowel coordination support", "Severe core and trunk instability", "Difficulty transferring from wheelchair to bed"],
    timeline: [
      "Neurological baseline check, sensory-motor mapping (ASIA scale), and functional capacity review.",
      "Passive stretching to prevent joint contractures, managing spasticity, and chest physiotherapy.",
      "Mat activities, core stabilization, and rolling/transfer training.",
      "Tilt-table training, assisted standing, progressive gait training (if indicated), and wheelchair mobility drills."
    ],
    faqs: [
      { question: "Can a patient walk again after a spinal cord injury?", answer: "Walking depends on whether the injury is complete or incomplete. In incomplete injuries, aggressive neuro-rehabilitation can re-train nerve pathways to help patients stand and walk with or without braces." },
      { question: "Do you provide long-term care plans for spinal injuries at home?", answer: "Yes, we structure weekly and monthly home-visit programs, providing consistent therapy while teaching families how to safely assist with transfers and home exercises." }
    ]
  },
  {
    name: "Therapeutic Exercise",
    slug: "therapeutic-exercise",
    category: "active",
    categoryLabel: "Active Rehab & Water Therapy",
    shortDesc: "Customized exercise prescriptions for functional strength and posture repair.",
    longDesc: "Therapeutic Exercise is the core of active rehabilitation. Rather than generic gym workouts, these are biomechanically tailored movement prescriptions. Designed to target specific muscle imbalances, improve neuromuscular control, and rebuild endurance, our exercise plans form the foundation of long-term recovery.",
    symptoms: ["Persistent muscle weakness post-injury", "Postural imbalances (scoliosis, rounded shoulders)", "Reduced core stability and back fatigue", "Decreased cardiovascular stamina", "Chronic muscle tightness"],
    timeline: [
      "Evaluation of movement quality, muscle firing sequences, and strength imbalances.",
      "Prescription of target-specific exercises (stretching, stabilization, and light resistance).",
      "Progressive overload conditioning using bands, weights, and functional movement tracks.",
      "Independent home program integration and quarterly functional reviews."
    ],
    faqs: [
      { question: "How do therapeutic exercises differ from normal gym workouts?", answer: "Gym workouts focus on general conditioning or muscle bulk. Therapeutic exercises are designed by a medical professional to correct specific biomechanical pathologies, prevent injury recurrence, and restore normal muscle activation patterns." },
      { question: "Can these exercises be done without equipment?", answer: "Yes, many are bodyweight-based, while others utilize light resistance bands or foam pads that we provide." }
    ]
  },
  {
    name: "Vestibular Rehabilitation",
    slug: "vestibular-rehabilitation",
    category: "neuro",
    categoryLabel: "Neurological & Stroke",
    shortDesc: "Inner-ear exercises and positional maneuvers to eliminate vertigo, dizziness, and gait instability.",
    longDesc: "Vertigo and dizziness are often caused by dysfunction in the vestibular (inner ear) system. Our specialized Vestibular Rehabilitation uses positional canalith repositioning maneuvers (such as the Epley maneuver for BPPV) combined with gaze stabilization exercises to eliminate dizziness, restore balance, and give you back your confidence when moving.",
    symptoms: ["Vertigo (spinning sensation) when turning in bed", "Dizziness, lightheadedness, or feeling unsteady", "Nausea triggered by head movements", "Difficulty focusing on objects when walking", "Loss of balance in dark rooms or crowded spaces"],
    timeline: [
      "Vestibular diagnostic screen (nystagmus tracking, Dix-Hallpike test, balance checks).",
      "Canalith repositioning maneuvers (Epley, Semont) to clear inner ear debris.",
      "Gaze stabilization drills (VOR exercises) to re-coordinate eye and head movements.",
      "Dynamic balance and habituation training to eliminate residual walking instability."
    ],
    faqs: [
      { question: "What is BPPV, and how does physical therapy help?", answer: "Benign Paroxysmal Positional Vertigo (BPPV) occurs when tiny calcium crystals in the inner ear shift out of place. Dr. Rohit Verma can perform gentle head positioning maneuvers to guide these crystals back, resolving vertigo in just 1-2 sessions." },
      { question: "Will the exercises make me feel dizzy temporarily?", answer: "Yes, some gaze exercises may trigger mild, brief dizziness initially. This is a normal part of desensitizing the brain, and the therapist monitors you closely throughout." }
    ]
  }
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES_DATA.find(s => s.slug === slug);
}
