export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  body: string[];
  metaTitle: string;
  metaDescription: string;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "post-stroke-mobility-golden-window",
    title: "The Golden 90-Day Window: Maximizing Post-Stroke Mobility",
    excerpt: "Discover why early, intense, and targeted physiotherapy in the first 90 days after a stroke is crucial for neuroplasticity and regaining independence.",
    date: "May 15, 2026",
    readTime: "5 min read",
    category: "Stroke Rehab",
    image: "/images/stroke_recovery_blog.png",
    body: [
      "Stroke recovery is a race against time. Neuroscience research consistently shows that the first 90 days after a stroke — often called the 'golden window' — represent the period of highest neuroplasticity, when the brain is most capable of rewiring damaged neural pathways.",
      "During this critical period, intensive and targeted physiotherapy can dramatically improve outcomes. Studies have shown that patients who begin structured rehabilitation within the first week post-stroke achieve significantly better functional recovery compared to those who delay treatment.",
      "At PhysioVenture, our neurological rehabilitation protocol leverages this window with daily sessions focused on progressive motor retraining, balance exercises, and functional task practice. Dr. Rohit Verma designs each programme around the patient's specific deficits — whether it's hemiplegia, aphasia-related coordination issues, or postural instability.",
      "Key components of our 90-day stroke recovery programme include: proprioceptive neuromuscular facilitation (PNF), constraint-induced movement therapy (CIMT), gait retraining with progressive resistance, and home-environment adaptation to prevent falls.",
      "If you or a loved one has recently experienced a stroke, every day counts. Contact PhysioVenture to begin your structured recovery journey with expert home-visit or clinic-based neurological physiotherapy in Noida."
    ],
    metaTitle: "The Golden 90-Day Window: Maximizing Post-Stroke Mobility | PhysioVenture",
    metaDescription: "Discover why early, intense, and targeted physiotherapy in the first 90 days after a stroke is crucial for neuroplasticity and regaining independence."
  },
  {
    slug: "preventing-back-pain-remote-ergonomics",
    title: "Preventing Back Pain: The Ergonomics of Remote Working",
    excerpt: "Combat the silent epidemic of slip disc and lumbar strain. Learn the exact screen, chair, and desk configurations to protect your spine at home.",
    date: "May 10, 2026",
    readTime: "4 min read",
    category: "Ergonomics",
    image: "/images/home_ergonomics_blog.png",
    body: [
      "The shift to remote work has brought a silent epidemic: a dramatic rise in back pain, neck strain, and postural dysfunction. Without the ergonomic infrastructure of an office, many professionals are working from couches, dining tables, and beds — all of which wreak havoc on spinal alignment.",
      "The most common complaints we see at PhysioVenture from remote workers include lumbar disc bulges, cervical spondylosis aggravation, thoracic outlet syndrome, and chronic myofascial pain in the upper trapezius and levator scapulae muscles.",
      "Here are the essential ergonomic adjustments every remote worker should implement: position your screen at eye level with the top third of the monitor at natural gaze height. Keep your elbows at 90 degrees with wrists neutral. Use a chair with lumbar support that maintains your spine's natural lordotic curve. Keep feet flat on the floor with knees at 90 degrees.",
      "Beyond workstation setup, regular movement breaks are critical. We recommend the 30-30-30 rule: every 30 minutes, stand for 30 seconds and perform 30 seconds of gentle stretching. This prevents the sustained loading that leads to disc dehydration and muscle fatigue.",
      "If you're already experiencing persistent back pain from desk work, don't wait for it to become chronic. PhysioVenture offers comprehensive spinal assessment and treatment — both at our Sector 49 clinic and through home visits across Noida."
    ],
    metaTitle: "Preventing Back Pain: The Ergonomics of Remote Working | PhysioVenture",
    metaDescription: "Combat the silent epidemic of slip disc and lumbar strain. Learn the exact screen, chair, and desk configurations to protect your spine at home."
  },
  {
    slug: "home-physiotherapy-geriatric-care",
    title: "Why In-Home Physiotherapy is the Future of Geriatric Care",
    excerpt: "Explore the psychological and clinical benefits of home rehab for seniors. Learn how personalized, stress-free care accelerates recovery outcomes.",
    date: "May 02, 2026",
    readTime: "6 min read",
    category: "Elder Care",
    image: "/images/geriatric_rehab_blog.png",
    body: [
      "For elderly patients, the journey to a physiotherapy clinic can be the biggest barrier to recovery. Transportation stress, unfamiliar environments, and the physical toll of travel can undermine the very rehabilitation being sought. This is why in-home physiotherapy is rapidly becoming the gold standard for geriatric care.",
      "Research published in the Journal of Geriatric Physical Therapy demonstrates that home-based rehabilitation programmes achieve equivalent or superior outcomes compared to outpatient clinic visits for elderly patients, particularly in measures of functional independence, fall risk reduction, and treatment adherence.",
      "The advantages of home-based geriatric physiotherapy are multifaceted. The familiar environment reduces anxiety and cognitive load, allowing patients to focus entirely on their exercises. Therapists can assess and modify the home environment to prevent falls — identifying loose rugs, poor lighting, and unsafe bathroom configurations.",
      "At PhysioVenture, our geriatric home-visit programme includes comprehensive fall risk assessment, progressive balance and strength training, joint mobility preservation, pain management through manual therapy and modalities, and caregiver education to ensure continuity between sessions.",
      "Dr. Rohit Verma brings portable clinical equipment — including resistance bands, balance boards, TENS units, and ultrasound devices — directly to the patient's home, ensuring clinic-grade treatment quality without the travel burden.",
      "If you have an elderly family member in Noida who could benefit from professional physiotherapy in the comfort of their home, PhysioVenture's geriatric care programme is designed specifically for them."
    ],
    metaTitle: "Why In-Home Physiotherapy is the Future of Geriatric Care | PhysioVenture",
    metaDescription: "Explore the psychological and clinical benefits of home rehab for seniors. Learn how personalized, stress-free care accelerates recovery outcomes."
  }
];

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}
