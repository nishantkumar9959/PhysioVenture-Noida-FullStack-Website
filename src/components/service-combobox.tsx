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

  // Group services
  const groupedServices = React.useMemo(() => {
    return SERVICES_DATA.reduce((acc, srv) => {
      if (!acc[srv.categoryLabel]) acc[srv.categoryLabel] = []
      acc[srv.categoryLabel].push(srv)
      return acc
    }, {} as Record<string, typeof SERVICES_DATA>)
  }, [])

  const selectedService = SERVICES_DATA.find((s) => s.slug === value)

  const ServiceList = (
    <Command>
      <CommandInput placeholder="Search treatments..." />
      <CommandList id={`${id}-listbox`}>
        <CommandEmpty>No service found.</CommandEmpty>
        {Object.entries(groupedServices).map(([category, srvs]) => (
          <CommandGroup key={category} heading={category}>
            {srvs.map((srv) => (
              <CommandItem
                key={srv.slug}
                value={srv.name}
                onSelect={() => {
                  onChange(srv.slug)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === srv.slug ? "opacity-100" : "opacity-0"
                  )}
                />
                {srv.name}
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
            {selectedService ? selectedService.name : "Select Required Treatment"}
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
          {selectedService ? selectedService.name : "Select Required Treatment"}
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
