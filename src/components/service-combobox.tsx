"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SERVICES_DATA } from "@/lib/services-data"

export function ServiceCombobox({
  value,
  onChange,
  id = "service-select",
}: {
  value: string
  onChange: (value: string) => void
  id?: string
}) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Generate all options dynamically (including sub-services/symptoms)
  const allOptions = React.useMemo(() => {
    const slugify = (text: string) =>
      text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_]+/g, "-");

    const options: { slug: string; name: string; categoryLabel: string }[] = [];

    SERVICES_DATA.forEach((srv) => {
      // Add the primary service
      options.push({
        slug: srv.slug,
        name: srv.name,
        categoryLabel: srv.categoryLabel,
      });

      // Add each symptom/treatment as a selectable option
      srv.symptoms.forEach((symptom) => {
        const symptomSlug = slugify(symptom);
        if (!options.some((opt) => opt.slug === symptomSlug)) {
          options.push({
            slug: symptomSlug,
            name: symptom,
            categoryLabel: srv.categoryLabel,
          });
        }
      });
    });

    return options;
  }, []);

  // Group options
  const groupedOptions = React.useMemo(() => {
    return allOptions.reduce((acc, opt) => {
      if (!acc[opt.categoryLabel]) acc[opt.categoryLabel] = []
      acc[opt.categoryLabel].push(opt)
      return acc
    }, {} as Record<string, typeof allOptions>)
  }, [allOptions])

  const selectedOption = allOptions.find((opt) => opt.slug === value)

  const ServiceList = (
    <Command>
      <CommandInput placeholder="Search treatments..." />
      <CommandList id={`${id}-listbox`}>
        <CommandEmpty>No service found.</CommandEmpty>
        {Object.entries(groupedOptions).map(([category, opts]) => (
          <CommandGroup key={category} heading={category}>
            {opts.map((opt) => (
              <CommandItem
                key={opt.slug}
                value={opt.name}
                onSelect={() => {
                  onChange(opt.slug)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === opt.slug ? "opacity-100" : "opacity-0"
                  )}
                />
                {opt.name}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  )

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={open ? `${id}-listbox` : undefined}
            className="w-full justify-between h-11 bg-card/60 hover:bg-card/80 font-normal rounded-xl border-border"
          >
            {selectedOption ? selectedOption.name : "Select Required Treatment"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          {ServiceList}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? `${id}-listbox` : undefined}
          className="w-full justify-between h-11 bg-card/60 hover:bg-card/80 font-normal rounded-xl border-border"
        >
          {selectedOption ? selectedOption.name : "Select Required Treatment"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          {ServiceList}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
