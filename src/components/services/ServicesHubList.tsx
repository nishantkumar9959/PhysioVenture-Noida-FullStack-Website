"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { SERVICES_DATA } from "@/lib/services-data";
import ServiceCard from "./ServiceCard";
import { useMediaQuery } from "@/hooks/use-media-query";
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const TABS = [
  { id: "all", label: "All Treatments" },
  { id: "spine-joint", label: "Spine & Joint Care" },
  { id: "neuro-senior", label: "Neuro & Senior Recovery" },
  { id: "sports-performance", label: "Sports & Performance" }
];

export default function ServicesHubList() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredServices = SERVICES_DATA.filter(s => !s.isSubService).filter(service => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "spine-joint") return service.category === "ortho" || service.category === "chiro";
    if (selectedCategory === "neuro-senior") return service.category === "neuro" || service.category === "geriatric";
    if (selectedCategory === "sports-performance") return service.category === "sports" || service.category === "home";
    return true;
  });

  return (
    <div className="w-full mb-16 relative flex flex-col items-center">
      {/* Category Selector: Dropdown for Mobile, Tabs for Desktop */}
      <div className="w-full mb-8">
        {/* Mobile Dropdown Select */}
        <div className="w-full px-4 md:hidden">
          <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={dropdownOpen}
                className="w-full justify-between h-11 bg-card hover:bg-card border-border font-bold rounded-xl text-sm"
              >
                {TABS.find(tab => tab.id === selectedCategory)?.label || "Select Category"}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[calc(100vw-32px)] p-1.5 bg-card border border-border shadow-md rounded-2xl" align="center">
              <div className="flex flex-col gap-1 w-full">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedCategory(tab.id);
                      setDropdownOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${
                      selectedCategory === tab.id
                        ? "bg-secondary text-primary"
                        : "text-muted-foreground hover:bg-secondary/40 hover:text-primary"
                    }`}
                  >
                    {tab.label}
                    {selectedCategory === tab.id && (
                      <Check className="w-4 h-4 text-accent" />
                    )}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Desktop Segment Tabs */}
        <div className="hidden md:flex items-center w-full justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-2 bg-secondary/30 p-1.5 rounded-2xl md:rounded-full border border-border/30 whitespace-nowrap min-w-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`snap-start shrink-0 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 outline-none ${
                  selectedCategory === tab.id
                    ? "bg-primary text-white shadow-xs"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isMobile ? (
        <div className="flex flex-col gap-6 w-full px-4">
          {filteredServices.map((service, idx) => (
            <div key={idx} className="w-full">
              <ServiceCard
                name={service.name}
                slug={service.slug}
                categoryLabel={service.categoryLabel}
                shortDesc={service.shortDesc}
                symptoms={service.symptoms}
                highlightedConditions={service.highlightedConditions}
                ctaText={service.ctaText}
                iconName={service.iconName}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Desktop 3x2 Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 py-4 w-full">
          {filteredServices.map((service, idx) => (
            <ServiceCard
              key={idx}
              name={service.name}
              slug={service.slug}
              categoryLabel={service.categoryLabel}
              shortDesc={service.shortDesc}
              symptoms={service.symptoms}
              highlightedConditions={service.highlightedConditions}
              ctaText={service.ctaText}
              iconName={service.iconName}
            />
          ))}
        </div>
      )}
    </div>
  );
}
