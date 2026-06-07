'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  LayoutDashboard, Calendar, MessageSquare, Users,
  Stethoscope, UserRound, BarChart2, Mail, Settings, LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logoutAdmin } from '@/app/actions/admin';

const NAV = [
  { label: 'Dashboard',    href: '/admin-cr7m10vk18msd7r45n16',              icon: LayoutDashboard },
  { label: 'Appointments', href: '/admin-cr7m10vk18msd7r45n16?tab=appointments', icon: Calendar        },
  { label: 'Inquiries',    href: '/admin-cr7m10vk18msd7r45n16?tab=inquiries',    icon: MessageSquare   },
  { label: 'Patients',     href: '/admin-cr7m10vk18msd7r45n16?tab=patients',     icon: Users           },
  { label: 'Treatments',   href: '/admin-cr7m10vk18msd7r45n16?tab=treatments',   icon: Stethoscope     },
  { label: 'Therapists',   href: '/admin-cr7m10vk18msd7r45n16?tab=therapists',   icon: UserRound       },
  { label: 'Reports',      href: '/admin-cr7m10vk18msd7r45n16?tab=reports',      icon: BarChart2       },
  { label: 'Messages',     href: '/admin-cr7m10vk18msd7r45n16?tab=messages',     icon: Mail            },
  { label: 'Settings',     href: '/admin-cr7m10vk18msd7r45n16?tab=settings',     icon: Settings        },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'dashboard';

  return (
    <aside className="w-full h-full bg-white flex flex-col">
      {/* Logo Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 lg:px-6 lg:pt-6 lg:pb-4 border-b border-gray-50/50 lg:border-none">
        <Link href="/admin-cr7m10vk18msd7r45n16" onClick={onClose} className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 lg:w-9 lg:h-9 shrink-0">
            <Image src="/images/logo.png" alt="PhysioVenture" fill sizes="36px" className="object-contain" priority />
          </div>
          <span className="font-display font-extrabold text-[18px] lg:text-xl leading-none tracking-tight">
            <span className="text-primary">Physio</span><span className="text-accent">Venture</span>
          </span>
        </Link>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto scrollbar-none">
        {NAV.map(({ label, href, icon: Icon }) => {
          let active = false;
          if (href === '/admin-cr7m10vk18msd7r45n16') {
            active = pathname === '/admin-cr7m10vk18msd7r45n16' && (!searchParams.get('tab') || searchParams.get('tab') === 'dashboard');
          } else if (href.includes('tab=')) {
            const tabName = href.split('tab=')[1];
            active = pathname === '/admin-cr7m10vk18msd7r45n16' && currentTab === tabName;
          } else {
            active = pathname === href;
          }
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors group',
                active
                  ? 'bg-[#E8F5EE] text-[#1a5c3a] font-semibold'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800',
              )}
            >
              <Icon
                className={cn('w-5 h-5 shrink-0', active ? 'text-[#1a5c3a]' : 'text-gray-400 group-hover:text-gray-600')}
              />
              <span className="flex-1">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Profile & Logout */}
      <div className="p-3 lg:p-4 border-t border-gray-100 mt-auto flex flex-col gap-1 bg-white">
        {/* Profile Card */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50/50 border border-gray-100/50">
          <div className="w-9 h-9 rounded-full bg-[#E8F5EE] flex items-center justify-center text-[#1a5c3a] text-sm font-bold shrink-0">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-gray-900 leading-tight truncate">Admin</p>
            <p className="text-[11px] text-gray-400 leading-tight truncate mt-0.5">Super Admin</p>
          </div>
        </div>

        {/* Explicit Red Logout Button */}
        <button
          onClick={logoutAdmin}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all text-red-600 hover:bg-red-50 hover:text-red-700 w-full text-left active:scale-[0.98]"
        >
          <LogOut className="w-5 h-5 shrink-0 text-red-500" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
