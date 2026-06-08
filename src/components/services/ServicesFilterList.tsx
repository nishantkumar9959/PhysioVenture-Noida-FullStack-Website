"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/services-data";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const CATEGORIES = [
  { id: "all", name: "All Services" },
  { id: "neuro", name: "Neurological & Stroke" },
  { id: "ortho", name: "Orthopaedic & Spine" },
  { id: "active", name: "Active & Water Therapy" },
  { id: "specialized", name: "Specialized Programs" }
];

export default function ServicesFilterList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredServices = SERVICES_DATA.filter(s => !s.isSubService).filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Search & Filter Section */}
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 items-center mb-12">
        <div className="w-full relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Search by condition or treatment (e.g. Back Pain, Stroke)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 rounded-full border border-border bg-card/60 pl-12 pr-4 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-200 shadow-xs"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2 bg-secondary/20 p-1.5 rounded-2xl border border-border/30 max-w-3xl">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-primary text-white shadow-xs"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Services Cards Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredServices.map((service, idx) => {
            return (
              <Card key={idx} hoverEffect className="group flex flex-col justify-between h-full border border-border/40">
                <CardHeader className="pb-3 text-left">
                  <div className="mb-2.5">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                      {service.categoryLabel}
                    </span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-accent transition-colors duration-200 leading-snug">
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed mt-2.5">
                    {service.shortDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 pb-6 flex flex-col gap-4 mt-auto">
                  <div className="border-t border-border/30 pt-4 flex items-center justify-end">
                    <Link
                      href={`/services/${service.slug}/`}
                      className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all duration-300"
                      aria-label={`View protocol for ${service.name}`}
                    >
                      <ArrowRight className="w-4.5 h-4.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl max-w-md mx-auto mb-16">
          <p className="text-sm text-muted-foreground font-medium">
            No services found matching your criteria.
          </p>
          <Button
            variant="link"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-2 text-xs"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </>
  );
}
