"use client";

import { useState } from "react";
import { MessageSquare, Star, CheckCircle, Home as HomeIcon, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  condition: string;
  category: "neuro" | "ortho" | "spine" | "geriatric";
  quote: string;
  rating: number;
  type: "Home Visit" | "Clinic Visit";
}

const ALL_TESTIMONIALS: Testimonial[] = [
  {
    name: "Vikram Mehta",
    role: "Son of Stroke Patient",
    location: "Sector 50, Noida",
    condition: "Stroke Recovery & Neuro Mobility",
    category: "neuro",
    quote: "Dr. Rohit Kumar's home visits were a game changer for my 70-year-old mother recovering from a stroke. Within 3 months of customized balance and motor therapy, she regained her confidence to walk independently. Truly professional and highly recommended.",
    rating: 5,
    type: "Home Visit",
  },
  {
    name: "Aarav Sharma",
    role: "Software Architect",
    location: "Sector 62, Noida",
    condition: "Slip Disc & Sciatica",
    category: "spine",
    quote: "Suffered from persistent slip disc pain for months due to sitting. Dr. Rohit Kumar's chiropractic adjustments and core strengthening exercises did wonders. His explanation of the biomechanics was reassuring. Best therapist in Noida!",
    rating: 5,
    type: "Clinic Visit",
  },
  {
    name: "Mrs. Rajeshwari Goel",
    role: "Retired Teacher",
    location: "Sector 49, Noida",
    condition: "Post-OP Knee Replacement",
    category: "ortho",
    quote: "Post-surgery knee rehab at home was incredibly convenient. Dr. Rohit Kumar brought advanced mobilization tools, checked my progress diligently, and guided me back to climbing stairs pain-free. A dedicated, experienced professional.",
    rating: 5,
    type: "Home Visit",
  },
  {
    name: "Rahul Verma",
    role: "Amateur Marathoner",
    location: "Sector 137, Noida",
    condition: "ACL Tear & Sports Recovery",
    category: "ortho",
    quote: "After tearing my ACL, I was unsure if I could run again. Dr. Rohit's clinical sports rehab program was rigorous and science-backed. We worked on hamstring strengthening, joint stabilization, and proprioception. I'm back on the track now!",
    rating: 5,
    type: "Clinic Visit",
  },
  {
    name: "Sonal Gupta",
    role: "Homemaker",
    location: "Sector 15, Noida",
    condition: "Frozen Shoulder",
    category: "ortho",
    quote: "I couldn't raise my right arm to reach shelves due to a frozen shoulder. The combination of moist heat therapy, passive joint mobilization, and guided stretching over 6 weeks completely restored my movement. Excellent and polite care.",
    rating: 5,
    type: "Home Visit",
  },
  {
    name: "Devendra Nath",
    role: "Senior Citizen",
    location: "Sector 22, Noida",
    condition: "Geriatric Balance & Fall Prevention",
    category: "geriatric",
    quote: "As I crossed 78, my balance became unstable and I had a fear of falling. Dr. Rohit conducted a fall-risk assessment in my house and guided me through balance retraining exercises. I feel much more secure walking daily now.",
    rating: 5,
    type: "Home Visit",
  },
  {
    name: "Priya Sen",
    role: "Marketing Director",
    location: "Sector 78, Noida",
    condition: "Cervical Spondylosis & Posture Strain",
    category: "spine",
    quote: "Suffered severe neck pain and regular tension headaches. Dr. Rohit diagnosed my postural imbalances from laptop work. His dry needling session gave instant relief, and the posture correction exercises prevented it from coming back.",
    rating: 5,
    type: "Clinic Visit",
  }
];

const CATEGORIES = [
  { id: "all", name: "All Conditions" },
  { id: "neuro", name: "Neurological" },
  { id: "ortho", name: "Orthopaedic & Joint" },
  { id: "spine", name: "Spine & Neck" },
  { id: "geriatric", name: "Geriatric Care" }
];

const TYPES = [
  { id: "all", name: "All Locations" },
  { id: "Home Visit", name: "Home Visits" },
  { id: "Clinic Visit", name: "Clinic Visits" }
];

export default function TestimonialsFilterList() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredTestimonials = ALL_TESTIMONIALS.filter((t) => {
    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
    const matchesType = selectedType === "all" || t.type === selectedType;
    return matchesCategory && matchesType;
  });

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col gap-4 mb-10 pb-6 border-b border-border/40">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Condition Filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-secondary/40 text-muted-foreground hover:bg-secondary/80 hover:text-primary"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Location Type Filters */}
          <div className="flex items-center gap-2 bg-secondary/30 p-1 rounded-full border border-border/45 shrink-0 self-end sm:self-auto">
            {TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 ${
                  selectedType === t.id
                    ? "bg-white dark:bg-card text-primary shadow-xs"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Display */}
      {filteredTestimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial, idx) => (
            <Card
              key={idx}
              hoverEffect
              className="bg-card border border-border/50 flex flex-col justify-between h-full p-6 shadow-xs relative overflow-hidden transition-all duration-300 hover:shadow-md animate-fadeIn"
            >
              {/* Visual quote indicator */}
              <span className="absolute right-6 top-4 text-6xl font-display font-extrabold text-accent/10 select-none">“</span>

              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed italic mb-6 relative z-10">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="border-t border-border/40 pt-4 mt-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-primary text-base">{testimonial.name}</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary/80 text-primary border border-primary/5">
                    {testimonial.type === "Home Visit" ? (
                      <>
                        <HomeIcon className="w-3.5 h-3.5 text-accent shrink-0" /> Home Visit
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3.5 h-3.5 text-accent shrink-0" /> Clinic
                      </>
                    )}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground font-medium">
                    {testimonial.role} · {testimonial.location}
                  </span>
                  <span className="text-[11px] text-accent font-bold tracking-wide uppercase mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> {testimonial.condition}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-secondary/10 rounded-2xl border border-dashed border-border/60">
          <MessageSquare className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-bold text-primary mb-2">No reviews found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            We couldn't find any recovery stories matching your filter combinations. Try selecting different condition or location parameters.
          </p>
        </div>
      )}
    </>
  );
}
