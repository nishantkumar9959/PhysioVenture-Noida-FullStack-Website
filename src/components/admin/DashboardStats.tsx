'use client';

import { Calendar, MessageSquare, Users, ClipboardList } from 'lucide-react';

const stats = [
  {
    title: 'New Appointments',
    value: '3',
    subtitle: 'Needs attention',
    icon: Calendar,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
  {
    title: 'New Inquiries',
    value: '1',
    subtitle: 'Needs attention',
    icon: MessageSquare,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-500/10',
  },
  {
    title: 'Open Cases',
    value: '4',
    subtitle: 'New + Contacted',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: "Today's Appointments",
    value: '12',
    subtitle: 'Total scheduled',
    icon: ClipboardList,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-card border rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
            <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center mb-4`}>
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <h3 className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</h3>
            <p className="font-semibold text-foreground">{stat.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
}
