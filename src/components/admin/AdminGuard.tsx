'use client';

import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Sidebar } from '@/components/admin/Sidebar';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, Menu } from 'lucide-react';
import { useState, Suspense } from 'react';

function MobileHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="h-[60px] bg-white border-b border-gray-100 flex items-center justify-between px-4 sticky top-0 z-40 shrink-0">
      <Link href="/admin-cr7m10vk18msd7r45n16" className="flex items-center gap-2">
        <div className="relative w-8 h-8 shrink-0">
          <Image src="/images/logo.png" alt="PhysioVenture" fill sizes="32px" className="object-contain" priority />
        </div>
        <span className="font-display font-extrabold text-[17px] leading-none">
          <span className="text-primary">Physio</span><span className="text-accent">Venture</span>
        </span>
      </Link>

      <div className="flex items-center gap-0.5">
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors" aria-label="Notifications">
          <Bell className="w-[22px] h-[22px] text-gray-800" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary border-2 border-white" />
        </button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors" aria-label="Open menu">
              <Menu className="w-[22px] h-[22px] text-gray-800" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 w-[80vw] max-w-[280px] sm:w-[280px] border-l border-gray-100">
            <SheetTitle className="sr-only">Admin Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">Access different sections of the admin panel</SheetDescription>
            <Suspense fallback={<div className="w-full h-full bg-white" />}>
              <Sidebar onClose={() => setOpen(false)} />
            </Suspense>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 rounded-full border-[3px] border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground font-medium">Verifying access…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F7FAF8] overflow-hidden">
      {/* ─── Desktop sidebar ─── */}
      <div className="hidden lg:block shrink-0 border-r border-gray-100 h-full">
        <Suspense fallback={<div className="w-[280px] h-full bg-white" />}>
          <Sidebar />
        </Suspense>
      </div>

      {/* ─── Right side: header + scrollable content ─── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile-only header */}
        <div className="lg:hidden">
          <MobileHeader />
        </div>

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
