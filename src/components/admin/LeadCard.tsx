'use client';

import { Phone, MessageCircle, Mail, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type LeadStatus = 'New' | 'Contacted' | 'Closed';

interface LeadCardProps {
  id: string;
  initials: string;
  name: string;
  phone: string;
  treatment: string;
  condition: string;
  date: string;
  timeSlot?: string;
  status: LeadStatus;
  timeAgo: string;
}

export function LeadCard({
  initials,
  name,
  phone,
  treatment,
  condition,
  date,
  timeSlot,
  status,
  timeAgo
}: LeadCardProps) {
  const statusStyles = {
    New: { badge: 'bg-destructive/10 text-destructive', border: 'border-destructive/20' },
    Contacted: { badge: 'bg-yellow-500/10 text-yellow-600', border: 'border-yellow-500/20' },
    Closed: { badge: 'bg-primary/10 text-primary', border: 'border-primary/20' },
  };

  const style = statusStyles[status];

  return (
    <div className={`bg-card border rounded-2xl p-4 sm:p-6 mb-4 shadow-sm relative ${style.border}`}>
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${style.badge}`}>
          {status}
        </span>
      </div>
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <span className="text-xs text-muted-foreground">{timeAgo}</span>
      </div>

      <div className="flex items-start gap-4 mt-8">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-bold text-foreground truncate">{name}</h4>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
            <Phone className="w-3.5 h-3.5" />
            <span>{phone}</span>
          </div>
          <div className="mt-2 text-sm">
            <p><span className="text-muted-foreground">Treatment:</span> <span className="text-primary font-medium">{treatment}</span></p>
            <p className="truncate"><span className="text-muted-foreground">Condition:</span> <span className="text-foreground">{condition}</span></p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            {timeSlot && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{timeSlot}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-primary/20 text-primary hover:bg-primary/5">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-green-500/20 text-green-600 hover:bg-green-500/5">
            <MessageCircle className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-blue-500/20 text-blue-600 hover:bg-blue-500/5">
            <Mail className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {status !== 'Closed' && (
            <Button variant="outline" className="flex-1 sm:flex-none rounded-full border-primary text-primary hover:bg-primary/5">
              {status === 'New' ? 'Mark Contacted' : 'Close Case'}
            </Button>
          )}
          <Button variant="ghost" className="flex-1 sm:flex-none rounded-full font-semibold group">
            View Details
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
