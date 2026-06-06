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
    quote: "Honestly didn't know what to expect when we first called. My mother had the stroke in March and by April Dr. Rohit was visiting us at home three times a week. She could barely hold a spoon when we started. Four months later she's walking to the kitchen on her own. I still can't believe the change.",
    rating: 5,
    type: "Home Visit",
  },
  {
    name: "Aarav Sharma",
    role: "Software Architect",
    location: "Sector 62, Noida",
    condition: "Slip Disc & Sciatica",
    category: "spine",
    quote: "I'd been dealing with that sharp shooting pain down my left leg for almost eight months. Tried two other physiotherapists before this. Dr. Rohit actually sat with me, looked at my posture at my desk, and explained exactly why the pain was radiating. The dry needling session was a bit intense but the relief after was real. Back to running 5k now.",
    rating: 5,
    type: "Clinic Visit",
  },
  {
    name: "Rajeshwari Goel",
    role: "Retired School Teacher",
    location: "Sector 49, Noida",
    condition: "Post-OP Knee Replacement",
    category: "ortho",
    quote: "My daughter-in-law found PhysioVenture after my knee surgery. Dr. Rohit came home with all his equipment — I was a bit nervous but he was very patient and gentle. He never pushed too hard but always pushed enough. Getting up and down stairs was my goal, and I can do it now without holding the rail.",
    rating: 5,
    type: "Home Visit",
  },
  {
    name: "Rahul Verma",
    role: "Amateur Marathoner",
    location: "Sector 137, Noida",
    condition: "ACL Tear & Sports Recovery",
    category: "ortho",
    quote: "Tore my ACL in November, surgery was done by December, and I genuinely thought my running days were behind me. Dr. Rohit's rehab plan was structured week by week — no rushing, but no slacking either. He kept me honest about form. Ran a half marathon in September. That says everything.",
    rating: 5,
    type: "Clinic Visit",
  },
  {
    name: "Sonal Gupta",
    role: "Homemaker",
    location: "Sector 15, Noida",
    condition: "Frozen Shoulder",
    category: "ortho",
    quote: "Six weeks of not being able to raise my arm properly. Couldn't even put on a dupatta without wincing. My husband booked a home session because I honestly couldn't travel. Dr. Rohit was punctual and very thorough. The heat therapy followed by the joint mobilization — week three I felt real movement returning. By week six it was nearly normal.",
    rating: 5,
    type: "Home Visit",
  },
  {
    name: "Devendra Nath",
    role: "Retired Civil Engineer",
    location: "Sector 22, Noida",
    condition: "Geriatric Balance & Fall Prevention",
    category: "geriatric",
    quote: "I'm 78 and had two small falls in six months. My son was very worried. Dr. Rohit came home, did a proper assessment of how I walk and where I wobble, and then started balance training right there in my drawing room. My confidence walking outdoors has come back a lot. Even my doctor noticed the improvement.",
    rating: 5,
    type: "Home Visit",
  },
  {
    name: "Priya Sen",
    role: "Marketing Director",
    location: "Sector 78, Noida",
    condition: "Cervical Spondylosis & Posture Strain",
    category: "spine",
    quote: "The tension headaches were almost daily — I just assumed it was stress from work. Turned out it was entirely posture-related from years of bad laptop habits. Dr. Rohit showed me what my spine actually looked like on assessment and it was eye-opening. Four clinic sessions plus the exercises he gave me, and the headaches are down to maybe once a month.",
    rating: 5,
    type: "Clinic Visit",
  },
  {
    name: "Meena Kapoor",
    role: "Daughter of Parkinson's Patient",
    location: "Sector 93, Noida",
    condition: "Parkinson's Gait Rehabilitation",
    category: "neuro",
    quote: "Papa was diagnosed two years ago and his walking had become very shuffled and slow. We were scared of falls constantly. Dr. Rohit specializes in this — he knew exactly which exercises to work on. The treadmill gait work at clinic and the home exercises together made a visible difference. Papa is steadier now and that means the world to us.",
    rating: 5,
    type: "Home Visit",
  },
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
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${selectedCategory === cat.id
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
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 ${selectedType === t.id
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
