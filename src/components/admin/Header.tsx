'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { Bell, RefreshCw, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Sidebar } from './Sidebar';
import Image from 'next/image';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6 shrink-0 z-20">

      {/* Left — Logo (mobile only) */}
      <div className="flex items-center lg:hidden">
        <Link href="/admin-cr7m10vk18msd7r45n16" className="flex items-center gap-2">
          <div className="relative w-7 h-7 shrink-0">
            <Image
              src="/Media_Assets/images/logo.png"
              alt="PhysioVenture Logo"
              fill
              sizes="28px"
              className="object-contain"
              priority
            />
          </div>
          <span className="font-display font-extrabold text-base tracking-tight text-primary leading-none">
            Physio<span className="text-accent">Venture</span>
          </span>
        </Link>
      </div>

      {/* Center spacer (desktop) / pushes icons right */}
      <div className="flex-1" />

      {/* Right — Actions */}
      <div className="flex items-center gap-1 lg:gap-2">

        {/* Timestamp — desktop only */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full mr-2">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Updated 2m ago</span>
        </div>

        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full w-9 h-9"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {/* Badge dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-card" />
        </Button>

        {/* Hamburger — mobile only */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full w-9 h-9" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-[80vw] max-w-[280px] sm:w-[280px] border-l border-border">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">Access different sections of the admin panel</SheetDescription>
              <Suspense fallback={<div className="w-full h-full bg-white" />}>
                <Sidebar onClose={() => setIsOpen(false)} />
              </Suspense>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
