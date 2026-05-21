# PhysioVenture Clinic Website Project Context

This file serves as the single source of truth for the **PhysioVenture Neuro & Ortho Physiotherapy Clinic** website project. It contains business data, architectural guidelines, brand rules, and development details.

---

## 1. Business Credentials

*   **Clinic Name:** PhysioVenture Neuro & Ortho Physiotherapy Clinic
*   **Clinic Focus:** Advanced Neurological Rehabilitation, Orthopaedic Rehabilitation, Sports Physiotherapy, Chiropractic, and Specialty Physical Therapy.
*   **Special Highlight:** Strong emphasis on **Home Visits / In-Home Rehabilitation** across Noida for patients with mobility limitations or acute pain.
*   **Address:** A-31, Block A, Sector 49, Noida, Uttar Pradesh 201303, India
*   **Primary Contact Phone:** +91 89320 82549 (WhatsApp integrated)
*   **Target Market:** Sector 49, Noida and surrounding high-income residential hubs (Sector 50, Sector 51, Sector 78, Sector 150, Noida Expressway).
*   **Primary Conversion Objectives:**
    1. High-value appointment bookings (via custom booking interface)
    2. Instant phone call connections
    3. Direct WhatsApp clinical enquiries
    4. Building local authority on Google Search (Map Pack + Organic Local SERPs)

---

## 2. Founder Profile (Approved)

*   **Practitioner:** Single physiotherapist owner and clinical director.
*   **Experience:** 7+ Years of clinical and home rehabilitation experience.
*   **Positioning:** Highly qualified, trust-driven individual clinical leader, providing personalized care directly to patients (avoiding junior staff delegation).
*   **Asset:** Currently using a premium placeholder image for headshot, to be updated later by client.

---

## 3. Core Service List

The website must support individual, SEO-optimized landing pages for each of the following 23 services:

1.  **Aquatic Physiotherapy** (Hydrotherapy for reduced weight-bearing exercises)
2.  **Arthritis Treatment** (Osteoarthritis and Rheumatoid Arthritis management)
3.  **Back Pain Treatment** (Slip disc, sciatica, postural correction)
4.  **Balance Exercise Therapy** (Neurological and age-related gait/balance issues)
5.  **Chiropractic Care** (Spinal adjustments and manual alignment)
6.  **Foot & Ankle Pain Treatment** (Plantar fasciitis, sprains)
7.  **Geriatric Physiotherapy** (Elderly mobility, strength, and fall prevention)
8.  **Heat Therapy** (Thermotherapy for muscle relaxation and blood flow)
9.  **Hip Pain Treatment** (Bursitis, arthritis, joint stability)
10. **Hydrotherapy Training** (Specialized pool-based physical training)
11. **Inpatient Physiotherapy** (Post-acute in-clinic admission care)
12. **Knee Pain Treatment** (ACL/meniscus recovery, osteoarthritis)
13. **Massage Therapy** (Myofascial release, therapeutic sports massage)
14. **Neurological Physiotherapy** (Stroke, Parkinson's, Multiple Sclerosis, Spinal Cord Injury)
15. **Occupational Therapy** (Functional recovery for daily activities)
16. **Orthopaedic Rehabilitation** (Fractures, joint stiffness, bone injuries)
17. **Paediatric Physiotherapy** (Developmental delays, congenital disorders)
18. **Physical Therapy** (General biomechanical rehabilitation)
19. **Post-Surgery Rehabilitation** (Post-total knee replacement, hip replacement, spinal fusion)
20. **Shoulder Pain Treatment** (Frozen shoulder, rotator cuff injuries)
21. **Spinal Injury Rehabilitation** (Paraplegia/quadriplegia management)
22. **Therapeutic Exercise** (Targeted strengthening and flexibility conditioning)
23. **Vestibular Rehabilitation** (Vertigo, inner-ear balance disorders)

---

## 4. Brand Identity & Design Direction

*   **Design Inspiration:** Stripe (complex grid layouts, premium typography, flawless gradients), Linear (sleek borders, clean cards, dark-mode-first luxury aesthetic), Apple (spacious layouts, large headings, product focus), Raycast (exquisite micro-interactions, clean cards).
*   **Tone:** Highly professional, clinical, elegant, clinical authority meets modern digital-product sophistication.
*   **Visual Assets:** High-end licensed clinical and home physiotherapy stock photography (no low-quality mobile shots).
*   **Typography:**
    *   *Headings:* `Outfit` (Premium, geometric, modern)
    *   *Body:* `Inter` (Highly legible, crisp, clean)
*   **Color Palette (Healthcare Reinvented):**
    *   *Emerald Deep (Primary - Trust & Healing):* `hsl(160, 84%, 12%)`
    *   *Mint Active (Accent - Movement & Vitality):* `hsl(160, 60%, 45%)`
    *   *Alabaster Clean (Backgrounds):* `hsl(210, 20%, 98%)`
    *   *Card Glass:* `rgba(255, 255, 255, 0.7)` with `backdrop-filter: blur(12px)`
*   **Avoid:** Bright generic cyan/blue hospital aesthetics, stock icon collections, cluttered WordPress widgets, slow slider animations, low-contrast text.

---

## 5. Technology Stack & Scalability

*   **Frontend:** Next.js 15 (App Router) for Server-Side Rendering (SSR) & Static Site Generation (SSG) with optimized image loading and dynamic routing.
*   **Language:** TypeScript for compile-time safety and self-documenting code.
*   **Styles:** Tailwind CSS v4 (native CSS variables, zero-runtime, modern grids, CSS nested support).
*   **Components:** `shadcn/ui` (Radix primitives for full accessibility, styled with custom brand tokens).
*   **Animations:** `Motion` (formerly Framer Motion) for performance-oriented entrance and scroll animations.
*   **Form Management & Validation:** React Hook Form + Zod (for validation schemas).
*   **Backend & DB:** Supabase (PostgreSQL) with strict **Row Level Security (RLS)** active on all tables.
*   **Domain & Hosting:** Currently no domain. Deploy to Vercel/similar staging before pointing domain.

---

## 6. Local SEO Roadmap

1.  **URL Structure:** `/services/[service-slug]` (e.g., `/services/neurological-physiotherapy`)
2.  **Meta Strategy:** Inject "in Noida" and "Home Visits" naturally in Title Tags and Meta Descriptions.
3.  **Local Schema:** Global `MedicalBusiness` schema + nested `Physiotherapy` page schema.
4.  **Internal Linking:** Hub-and-Spoke model. Home page links to Services Overview, which links to individual services. Individual services link back to home, related service categories, and the booking form.
5.  **GBP Integration:** Map embed using Google Maps API + real-time review pull.
