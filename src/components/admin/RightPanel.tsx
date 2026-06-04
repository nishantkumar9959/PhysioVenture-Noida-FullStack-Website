'use client';

import { Calendar, MessageSquare, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RightPanel() {
  return (
    <div className="w-full xl:w-[350px] flex-shrink-0 flex flex-col gap-6">
      
      {/* Upcoming Appointments */}
      <div className="bg-card border rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">Upcoming Appointments</h3>
          </div>
          <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold px-2">
            View Calendar
          </Button>
        </div>

        <div className="space-y-6">
          {/* Item 1 */}
          <div className="flex items-start gap-4">
            <div className="w-20 text-sm font-bold text-foreground pt-1 flex-shrink-0">
              09:00 AM
            </div>
            <div className="flex-1 min-w-0 border-l-2 border-primary/20 pl-4">
              <p className="font-bold text-foreground text-sm truncate">Neha Gupta</p>
              <p className="text-xs text-muted-foreground truncate">Physiotherapy • Back Pain</p>
            </div>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded flex-shrink-0">
              Confirmed
            </span>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-4">
            <div className="w-20 text-sm font-bold text-foreground pt-1 flex-shrink-0">
              10:30 AM
            </div>
            <div className="flex-1 min-w-0 border-l-2 border-primary/20 pl-4">
              <p className="font-bold text-foreground text-sm truncate">Rohan Mehta</p>
              <p className="text-xs text-muted-foreground truncate">Sports Physiotherapy • Knee</p>
            </div>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded flex-shrink-0">
              Confirmed
            </span>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-4">
            <div className="w-20 text-sm font-bold text-foreground pt-1 flex-shrink-0">
              12:00 PM
            </div>
            <div className="flex-1 min-w-0 border-l-2 border-primary/20 pl-4">
              <p className="font-bold text-foreground text-sm truncate">Sunita Rao</p>
              <p className="text-xs text-muted-foreground truncate">Neuro Physiotherapy • Migraine</p>
            </div>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded flex-shrink-0">
              Confirmed
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <Button variant="ghost" className="w-full justify-between font-semibold group text-primary">
            View all appointments
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-card border rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-bold text-foreground">Recent Inquiries</h3>
          </div>
          <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold px-2">
            View All
          </Button>
        </div>

        <div className="space-y-6">
          {/* Item 1 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground flex-shrink-0">
              AK
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="font-bold text-sm text-foreground truncate">Aman Kumar</p>
                <span className="text-[10px] text-muted-foreground">10m ago</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 mb-1.5">98763 21098</p>
              <p className="text-xs text-foreground line-clamp-2 leading-relaxed">
                I have shoulder pain while lifting weights...
              </p>
              <span className="inline-block mt-2 text-[10px] font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded">
                New
              </span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground flex-shrink-0">
              SC
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="font-bold text-sm text-foreground truncate">Sneha Choudhary</p>
                <span className="text-[10px] text-muted-foreground">1h ago</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 mb-1.5">98760 98887</p>
              <p className="text-xs text-foreground line-clamp-2 leading-relaxed">
                Post-surgery rehabilitation program details.
              </p>
              <span className="inline-block mt-2 text-[10px] font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded">
                New
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
