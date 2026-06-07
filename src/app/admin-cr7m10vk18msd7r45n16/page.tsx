'use client';

import AdminGuard from '@/components/admin/AdminGuard';
import {
  Calendar, MessageSquare, Users, ClipboardList,
  Search, Filter, ArrowUpDown, Phone, MessageCircle,
  Mail, ChevronRight, Clock, RefreshCw, Bell, Plus, X,
} from 'lucide-react';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAdminRealtime } from '@/hooks/useAdminRealtime';
import { supabase } from '@/lib/supabase';

/* ─────────────────────────── types ─────────────────────────── */

interface Appointment {
  id: string;
  patient_name: string;
  phone: string;
  email: string | null;
  service_id: string;
  preferred_date: string;
  preferred_time_slot: string;
  additional_notes: string | null;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
}

/* ─────────────────────────── helpers ─────────────────────────── */

const formatService = (serviceId: string) => {
  return serviceId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
};

const formatTimeSlot = (slot: string) => {
  return slot.charAt(0).toUpperCase() + slot.slice(1);
};

const timeAgo = (dateStr: string) => {
  try {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  } catch (e) {
    return '';
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const formatWhatsAppLink = (phone: string) => {
  const cleanPhone = phone.replace(/\D/g, '');
  const formatted = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  return `https://wa.me/${formatted}`;
};

/* ─────────────────────────── sub-components ─────────────────────────── */

function StatCard({
  icon: Icon, iconBg, numberColor, number, label, sub,
  hideOnMobile = false,
}: {
  icon: React.ElementType; iconBg: string; numberColor: string;
  number: string; label: string; sub: string; hideOnMobile?: boolean;
}) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-2.5 sm:p-4 lg:p-5 flex flex-col items-center text-center${hideOnMobile ? ' hidden lg:flex' : ''}`}>
      <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-full ${iconBg} flex items-center justify-center mb-1.5 sm:mb-3`}>
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${numberColor}`} />
      </div>
      <span className={`text-xl sm:text-3xl font-bold leading-none mb-0.5 sm:mb-1 ${numberColor}`}>{number}</span>
      <span className="text-[10px] sm:text-[13px] font-bold text-gray-800 leading-tight truncate max-w-full">{label}</span>
      <span className="text-[9px] sm:text-[11px] text-gray-400 mt-0.5 leading-tight truncate max-w-full">{sub}</span>
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E8F5EE] flex items-center justify-center text-[#1a5c3a] font-bold text-[13px] sm:text-[15px] shrink-0">
      {initials}
    </div>
  );
}

/* ─────────────────────────── coming soon modal ─────────────────────────── */

interface ComingSoonModalProps {
  tabName: string | null;
  onClose: () => void;
}

function ComingSoonModal({ tabName, onClose }: ComingSoonModalProps) {
  if (!tabName) return null;
  const displayName = tabName.charAt(0).toUpperCase() + tabName.slice(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-0 duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl border border-gray-100 shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200">
        <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
          <Clock className="w-7 h-7 text-amber-500" />
        </div>
        <h3 className="text-[17px] font-bold text-gray-900 mb-2">Feature Coming Soon!</h3>
        <p className="text-[13px] text-gray-500 leading-relaxed mb-5">
          The <span className="font-bold text-primary">{displayName}</span> section is currently under development. Stay tuned for updates!
        </p>
        <button
          onClick={onClose}
          className="w-full py-2 px-4 rounded-full bg-primary text-white text-[13px] font-bold hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/10"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────── details modal ─────────────────────────── */

interface DetailsModalProps {
  item: { type: 'appointment' | 'inquiry'; data: any } | null;
  onClose: () => void;
  onUpdateStatus: (id: string, type: 'appointment' | 'inquiry', status: string) => Promise<void>;
}

function DetailsModal({ item, onClose, onUpdateStatus }: DetailsModalProps) {
  if (!item) return null;
  const { type, data } = item;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in-0 duration-200">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl border border-gray-100 shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300 flex flex-col max-h-[85vh] sm:max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-[15px] sm:text-lg">
            {type === 'appointment' ? 'Appointment Details' : 'Inquiry Details'}
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4 overflow-y-auto space-y-3.5 flex-1 text-[13px] sm:text-[14px]">
          {type === 'appointment' ? (
            <>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Patient Name</span>
                <p className="text-[14px] sm:text-[15px] font-bold text-gray-900 mt-0.5">{data.patient_name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Phone</span>
                  <p className="font-semibold text-gray-800 mt-0.5">{data.phone}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email</span>
                  <p className="font-semibold text-gray-800 mt-0.5 truncate">{data.email || 'Not provided'}</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Required Treatment</span>
                <p className="font-bold text-primary mt-0.5">{formatService(data.service_id)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Preferred Date</span>
                  <p className="font-semibold text-gray-800 mt-0.5">{formatDate(data.preferred_date)}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Preferred Time Slot</span>
                  <p className="font-semibold text-gray-800 mt-0.5">{formatTimeSlot(data.preferred_time_slot)}</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Symptoms / Notes</span>
                <p className="text-gray-700 bg-gray-50 rounded-xl p-3 mt-1 border border-gray-100 whitespace-pre-wrap leading-relaxed text-[12px] sm:text-[13px]">
                  {data.additional_notes || 'No symptoms/notes entered.'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Submission Date</span>
                  <p className="text-[12px] text-gray-500 mt-0.5">{new Date(data.created_at).toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Status</span>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold mt-0.5 capitalize border ${
                      data.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      data.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                      data.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-gray-100 text-gray-500 border-gray-200'
                    }`}>
                      {data.status}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Sender Name</span>
                <p className="text-[14px] sm:text-[15px] font-bold text-gray-900 mt-0.5">{data.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Phone</span>
                  <p className="font-semibold text-gray-800 mt-0.5">{data.phone || 'Not provided'}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email</span>
                  <p className="font-semibold text-gray-800 mt-0.5 truncate">{data.email}</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Message</span>
                <p className="text-gray-700 bg-gray-50 rounded-xl p-3 mt-1 border border-gray-100 whitespace-pre-wrap leading-relaxed text-[12px] sm:text-[13px]">
                  {data.message}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Submission Date</span>
                  <p className="text-[12px] text-gray-500 mt-0.5">{new Date(data.created_at).toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Status</span>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold mt-0.5 capitalize border ${
                      data.status === 'new' ? 'bg-red-50 text-red-700 border-red-200' :
                      data.status === 'contacted' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      'bg-gray-100 text-gray-500 border-gray-200'
                    }`}>
                      {data.status}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2 flex-wrap">
          {type === 'appointment' && data.status === 'pending' && (
            <>
              <button
                onClick={async () => {
                  await onUpdateStatus(data.id, 'appointment', 'cancelled');
                  onClose();
                }}
                className="px-3.5 py-2 text-xs font-bold rounded-full border border-red-200 text-red-600 hover:bg-red-50 bg-white transition-colors"
              >
                Reject
              </button>
              <button
                onClick={async () => {
                  await onUpdateStatus(data.id, 'appointment', 'confirmed');
                  onClose();
                }}
                className="px-3.5 py-2 text-xs font-bold rounded-full bg-primary text-white hover:opacity-90 transition-opacity"
              >
                Confirm
              </button>
            </>
          )}
          {type === 'appointment' && data.status === 'confirmed' && (
            <button
              onClick={async () => {
                await onUpdateStatus(data.id, 'appointment', 'completed');
                onClose();
              }}
              className="px-3.5 py-2 text-xs font-bold rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              Complete
            </button>
          )}
          {type === 'inquiry' && data.status === 'new' && (
            <button
              onClick={async () => {
                await onUpdateStatus(data.id, 'inquiry', 'contacted');
                onClose();
              }}
              className="px-3.5 py-2 text-xs font-bold rounded-full bg-primary text-white hover:opacity-90 transition-opacity"
            >
              Mark Contacted
            </button>
          )}
          {type === 'inquiry' && data.status === 'contacted' && (
            <button
              onClick={async () => {
                await onUpdateStatus(data.id, 'inquiry', 'closed');
                onClose();
              }}
              className="px-3.5 py-2 text-xs font-bold rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-bold rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 bg-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Unified lists ─────────────────────────── */

interface CardProps {
  onViewDetails: () => void;
  onUpdateStatus: (id: string, status: string) => Promise<void>;
}

function AppointmentCard({ item, onViewDetails, onUpdateStatus }: { item: Appointment } & CardProps) {
  const isPending = item.status === 'pending';
  const isConfirmed = item.status === 'confirmed';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-3.5 sm:p-4 relative">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
          item.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
          item.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
          item.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
          'bg-gray-100 text-gray-500 border-gray-200'
        }`}>
          {item.status}
        </span>
        <span className="text-[11px] text-gray-400">{timeAgo(item.created_at)}</span>
      </div>

      {/* Main Row */}
      <div className="flex items-start gap-3">
        <Avatar initials={getInitials(item.patient_name)} />
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] sm:text-[16px] font-bold text-gray-900 leading-tight truncate">{item.patient_name}</h3>
          
          <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-gray-500 mt-1">
            <Phone className="w-3 h-3 shrink-0" />
            <span className="truncate">{item.phone}</span>
          </div>

          <div className="mt-2 space-y-0.5 text-[12px] sm:text-[13px]">
            <p className="truncate"><span className="text-gray-400">Treatment: </span><span className="text-primary font-semibold">{formatService(item.service_id)}</span></p>
            <p className="truncate text-gray-600"><span className="text-gray-400">Notes: </span>{item.additional_notes || 'None'}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] sm:text-[12px] text-gray-500">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gray-400" />{formatDate(item.preferred_date)}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gray-400" />{formatTimeSlot(item.preferred_time_slot)}</span>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="border-t border-gray-100 mt-3 pt-2.5 flex items-center justify-between gap-2">
        {/* Contact Actions */}
        <div className="flex items-center gap-1.5">
          <a href={`tel:${item.phone}`} className="w-8 h-8 rounded-full border border-green-200 text-green-600 flex items-center justify-center hover:bg-green-50 active:bg-green-100 transition-colors" aria-label="Call">
            <Phone className="w-3.5 h-3.5" />
          </a>
          <a href={formatWhatsAppLink(item.phone)} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-green-200 text-green-600 flex items-center justify-center hover:bg-green-50 active:bg-green-100 transition-colors" aria-label="WhatsApp">
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
          {item.email && (
            <a href={`mailto:${item.email}`} className="w-8 h-8 rounded-full border border-blue-200 text-blue-500 flex items-center justify-center hover:bg-blue-50 active:bg-blue-100 transition-colors" aria-label="Email">
              <Mail className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* State Actions */}
        <div className="flex items-center gap-2">
          {isPending && (
            <button
              onClick={() => onUpdateStatus(item.id, 'confirmed')}
              className="px-3 py-1.5 text-[12px] font-bold rounded-full bg-primary text-white hover:opacity-95 active:scale-95 transition-all whitespace-nowrap"
            >
              Approve
            </button>
          )}
          {isConfirmed && (
            <button
              onClick={() => onUpdateStatus(item.id, 'completed')}
              className="px-3 py-1.5 text-[12px] font-bold rounded-full bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 transition-all whitespace-nowrap"
            >
              Complete
            </button>
          )}
          <button
            onClick={onViewDetails}
            className="flex items-center gap-0.5 text-[12px] font-bold text-gray-800 hover:text-primary active:scale-95 transition-all whitespace-nowrap"
          >
            View Details <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function InquiryCard({ item, onViewDetails, onUpdateStatus }: { item: Inquiry } & CardProps) {
  const isNew = item.status === 'new';
  const isContacted = item.status === 'contacted';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-3.5 sm:p-4 relative">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
          item.status === 'new' ? 'bg-red-50 text-red-700 border-red-200' :
          item.status === 'contacted' ? 'bg-amber-50 text-amber-700 border-amber-200' :
          'bg-gray-100 text-gray-500 border-gray-200'
        }`}>
          {item.status}
        </span>
        <span className="text-[11px] text-gray-400">{timeAgo(item.created_at)}</span>
      </div>

      {/* Main Row */}
      <div className="flex items-start gap-3">
        <Avatar initials={getInitials(item.name)} />
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] sm:text-[16px] font-bold text-gray-900 leading-tight truncate">{item.name}</h3>
          
          <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-gray-500 mt-1">
            <Mail className="w-3 h-3 shrink-0" />
            <span className="truncate">{item.email}</span>
          </div>
          {item.phone && (
            <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-gray-500 mt-0.5">
              <Phone className="w-3 h-3 shrink-0" />
              <span className="truncate">{item.phone}</span>
            </div>
          )}

          <div className="mt-2 space-y-0.5 text-[12px] sm:text-[13px]">
            <p className="line-clamp-2 text-gray-600 bg-gray-50/50 rounded-lg px-2.5 py-2 leading-relaxed mt-1 text-[11px] sm:text-[12px] border border-gray-50/50">
              {item.message}
            </p>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="border-t border-gray-100 mt-3 pt-2.5 flex items-center justify-between gap-2">
        {/* Contact Actions */}
        <div className="flex items-center gap-1.5">
          {item.phone && (
            <>
              <a href={`tel:${item.phone}`} className="w-8 h-8 rounded-full border border-green-200 text-green-600 flex items-center justify-center hover:bg-green-50 active:bg-green-100 transition-colors" aria-label="Call">
                <Phone className="w-3.5 h-3.5" />
              </a>
              <a href={formatWhatsAppLink(item.phone)} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-green-200 text-green-600 flex items-center justify-center hover:bg-green-50 active:bg-green-100 transition-colors" aria-label="WhatsApp">
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </>
          )}
          <a href={`mailto:${item.email}`} className="w-8 h-8 rounded-full border border-blue-200 text-blue-500 flex items-center justify-center hover:bg-blue-50 active:bg-blue-100 transition-colors" aria-label="Email">
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* State Actions */}
        <div className="flex items-center gap-2">
          {isNew && (
            <button
              onClick={() => onUpdateStatus(item.id, 'contacted')}
              className="px-3 py-1.5 text-[12px] font-bold rounded-full border border-gray-800 text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Mark Contacted
            </button>
          )}
          {isContacted && (
            <button
              onClick={() => onUpdateStatus(item.id, 'closed')}
              className="px-3 py-1.5 text-[12px] font-bold rounded-full bg-gray-600 text-white hover:bg-gray-700 active:scale-95 transition-all whitespace-nowrap"
            >
              Close Inquiry
            </button>
          )}
          <button
            onClick={onViewDetails}
            className="flex items-center gap-0.5 text-[12px] font-bold text-gray-800 hover:text-primary active:scale-95 transition-all whitespace-nowrap"
          >
            View Details <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Right panels ─────────────────────────── */

function UpcomingAppointments({ items, onViewDetails }: { items: Appointment[]; onViewDetails: (item: Appointment) => void }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-gray-900 text-[15px]">Upcoming Appointments</h3>
        </div>
      </div>
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-2">No upcoming appointments.</p>
        ) : (
          items.map((it) => (
            <div key={it.id} onClick={() => onViewDetails(it)} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
              <span className="text-[12px] font-bold text-gray-800 w-[72px] shrink-0">{formatTimeSlot(it.preferred_time_slot)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-900 truncate">{it.patient_name}</p>
                <p className="text-[11px] text-gray-400 truncate">{formatService(it.service_id)}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 capitalize ${
                it.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'
              }`}>{it.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function RecentInquiries({ items, onViewDetails }: { items: Inquiry[]; onViewDetails: (item: Inquiry) => void }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-gray-500" />
          <h3 className="font-bold text-gray-900 text-[15px]">Recent Inquiries</h3>
        </div>
      </div>
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-2">No recent inquiries.</p>
        ) : (
          items.map((it) => (
            <div key={it.id} onClick={() => onViewDetails(it)} className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-[12px] font-bold shrink-0">
                {getInitials(it.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <span className="text-[13px] font-bold text-gray-900 truncate">{it.name}</span>
                  <span className="text-[10px] text-gray-400 shrink-0 ml-1">{timeAgo(it.created_at)}</span>
                </div>
                {it.phone && <p className="text-[11px] text-gray-400 mt-0.5">{it.phone}</p>}
                <p className="text-[12px] text-gray-600 mt-1 line-clamp-2 leading-snug">{it.message}</p>
                <span className={`inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md border capitalize ${
                  it.status === 'new'
                    ? 'bg-red-50 text-red-500 border-red-200'
                    : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                }`}>{it.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────── main dashboard ─────────────────────────── */

function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<'dashboard' | 'appointments' | 'inquiries'>('dashboard');
  const [prevTab, setPrevTab] = useState<'dashboard' | 'appointments' | 'inquiries'>('dashboard');
  const [comingSoonTab, setComingSoonTab] = useState<string | null>(null);

  // Sync tab state and capture coming soon dialog routes
  useEffect(() => {
    const t = searchParams.get('tab');
    if (t === 'appointments' || t === 'inquiries') {
      setTab(t);
      setPrevTab(t);
    } else if (t === 'patients' || t === 'treatments' || t === 'therapists' || t === 'reports' || t === 'messages' || t === 'settings') {
      setComingSoonTab(t);
      // Clean query params in route to reset to previous active state
      const newParams = new URLSearchParams(window.location.search);
      if (prevTab === 'dashboard') {
        newParams.delete('tab');
      } else {
        newParams.set('tab', prevTab);
      }
      const newSearch = newParams.toString();
      router.replace(`/admin-cr7m10vk18msd7r45n16${newSearch ? '?' + newSearch : ''}`);
    } else {
      setTab('dashboard');
      setPrevTab('dashboard');
    }
  }, [searchParams, router, prevTab]);

  // Nested tab selection for the dashboard feed
  const [feedTab, setFeedTab] = useState<'appointments' | 'inquiries'>('appointments');

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'date_asc' | 'date_desc'>('newest');
  const [detailsItem, setDetailsItem] = useState<{ type: 'appointment' | 'inquiry'; data: any } | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const headers: HeadersInit = {};
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }
      const response = await fetch('/admin-dfhfvjhzbdsvhjzdgvbjhzbdv/get-bookings', { headers });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      if (result.success) {
        setAppointments(result.appointments || []);
        setInquiries(result.inquiries || []);
      } else {
        throw new Error(result.error || 'Failed to fetch data');
      }
    } catch (err) {
      console.error('Error fetching dashboard database data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Set up realtime updates
  useAdminRealtime(fetchData);

  const updateStatus = async (id: string, type: 'appointment' | 'inquiry', newStatus: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }
      const response = await fetch('/admin-dfhfvjhzbdsvhjzdgvbjhzbdv/update-status', {
        method: 'POST',
        headers,
        body: JSON.stringify({ id, type, status: newStatus }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to update status');
      }

      fetchData();
    } catch (err) {
      console.error(`Error updating status for ${type}:`, err);
      alert('Could not update status. Please try again.');
    }
  };

  // Helper date logic
  const todayStr = new Date().toLocaleDateString('en-CA');

  // Stats calculation
  const newAppointmentsCount = appointments.filter(a => a.status === 'pending').length;
  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;
  const openCasesCount = 
    appointments.filter(a => a.status === 'pending' || a.status === 'confirmed').length +
    inquiries.filter(i => i.status === 'new' || i.status === 'contacted').length;
  const todayAppointmentsCount = appointments.filter(a => a.preferred_date === todayStr).length;

  // Upcoming items logic for panels
  const upcomingList = appointments
    .filter(a => (a.status === 'confirmed' || a.status === 'pending') && a.preferred_date >= todayStr)
    .sort((a, b) => new Date(a.preferred_date).getTime() - new Date(b.preferred_date).getTime())
    .slice(0, 5);

  const recentInquiriesList = inquiries.slice(0, 3);

  // Search & Filter lists
  const filteredAppointments = appointments
    .filter(a => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        a.patient_name.toLowerCase().includes(q) ||
        a.phone.includes(q) ||
        (a.email && a.email.toLowerCase().includes(q)) ||
        a.service_id.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortBy === 'date_desc') return new Date(b.preferred_date).getTime() - new Date(a.preferred_date).getTime();
      if (sortBy === 'date_asc') return new Date(a.preferred_date).getTime() - new Date(b.preferred_date).getTime();
      return 0;
    });

  const filteredInquiries = inquiries
    .filter(i => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        (i.phone && i.phone.includes(q)) ||
        i.message.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return 0;
    });

  // Effective arrays based on the tab selection
  const activeTab = tab === 'dashboard' ? feedTab : tab;

  return (
    <div className="px-3 py-3 sm:px-6 lg:px-8 lg:py-8 max-w-[1400px] mx-auto">
      {/* Page header */}
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div>
          <h1 className="text-[20px] lg:text-[26px] font-bold text-gray-900 leading-tight">
            {tab === 'dashboard' && <>Welcome back, <span className="text-primary">Admin</span> 👋</>}
            {tab === 'appointments' && <>Appointment Requests 📅</>}
            {tab === 'inquiries' && <>Contact Inquiries ✉️</>}
          </h1>
          <p className="text-[12px] sm:text-[13px] text-gray-500 mt-0.5">
            {tab === 'dashboard' && "Here's what's happening today."}
            {tab === 'appointments' && "Manage and review all patient booking requests."}
            {tab === 'inquiries' && "Read and follow up on patient inquiries."}
          </p>
        </div>
        <button
          onClick={fetchData}
          className="hidden lg:flex items-center gap-1.5 text-[12px] text-gray-500 bg-white border border-gray-100 hover:border-gray-200 px-3 py-1.5 rounded-full shadow-sm mt-1 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Mobile refresh */}
      <div className="flex lg:hidden justify-end mb-4">
        <button
          onClick={fetchData}
          className="flex items-center gap-1.5 text-[12px] text-gray-500 bg-white border border-gray-100 active:bg-gray-55 px-3 py-1.5 rounded-full shadow-sm transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stat cards (only show on dashboard overview tab) */}
      {tab === 'dashboard' && (
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 mb-5 lg:mb-8">
          <StatCard
            icon={Calendar}
            iconBg="bg-red-50"
            numberColor="text-red-500"
            number={loading ? '...' : String(newAppointmentsCount)}
            label="New Appointments"
            sub="Needs attention"
          />
          <StatCard
            icon={MessageSquare}
            iconBg="bg-amber-50"
            numberColor="text-amber-500"
            number={loading ? '...' : String(newInquiriesCount)}
            label="New Inquiries"
            sub="Needs attention"
          />
          <StatCard
            icon={Users}
            iconBg="bg-emerald-50"
            numberColor="text-emerald-600"
            number={loading ? '...' : String(openCasesCount)}
            label="Open Cases"
            sub="New + Contacted"
          />
          <StatCard
            icon={ClipboardList}
            iconBg="bg-blue-50"
            numberColor="text-blue-600"
            number={loading ? '...' : String(todayAppointmentsCount)}
            label="Today's Appointments"
            sub="Total scheduled"
            hideOnMobile
          />
        </div>
      )}

      {/* Two-column layout */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* LEFT: Feed */}
        <div className="flex-1 min-w-0">
          
          {/* Tabs bar (Conditional layout depending on Tab state) */}
          {tab === 'dashboard' ? (
            <div className="flex items-center gap-0 border-b border-gray-200 mb-4 overflow-x-auto scrollbar-none whitespace-nowrap">
              <button
                onClick={() => setFeedTab('appointments')}
                className={`flex items-center gap-1.5 pb-2.5 px-1 mr-4 text-[13px] sm:text-[14px] font-semibold border-b-2 transition-colors shrink-0 ${
                  feedTab === 'appointments'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                Appointments ({appointments.length})
              </button>
              <button
                onClick={() => setFeedTab('inquiries')}
                className={`flex items-center gap-1.5 pb-2.5 px-1 text-[13px] sm:text-[14px] font-semibold border-b-2 transition-colors shrink-0 ${
                  feedTab === 'inquiries'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Inquiries ({inquiries.length})
              </button>
            </div>
          ) : null}

          {/* Search + Filter */}
          <div className="flex items-center gap-3 mb-3.5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === 'appointments' ? "Search by name, phone, email or treatment..." : "Search by name, email, phone or message..."}
                className="w-full h-9 pl-8 pr-4 rounded-full border border-gray-200 bg-white text-[12px] sm:text-[13px] text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>
          </div>

          {/* Sort selection */}
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-gray-400 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-8 px-2.5 py-0.5 rounded-full border border-gray-200 bg-white text-[12px] text-gray-700 outline-none hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <option value="newest">Newest Submission</option>
              <option value="oldest">Oldest Submission</option>
              {activeTab === 'appointments' && (
                <>
                  <option value="date_asc">Preferred Date (Soonest)</option>
                  <option value="date_desc">Preferred Date (Latest)</option>
                </>
              )}
            </select>
          </div>

          {/* Cards loading/display */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-8 h-8 rounded-full border-[3px] border-primary border-t-transparent animate-spin" />
              <p className="text-sm text-gray-400">Loading database records…</p>
            </div>
          ) : activeTab === 'appointments' ? (
            <div className="space-y-3.5 pb-24 lg:pb-6 animate-in fade-in-50 duration-200">
              {filteredAppointments.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                  <p className="text-sm text-gray-400">No appointment requests found.</p>
                </div>
              ) : (
                filteredAppointments.map((appt) => (
                  <AppointmentCard
                    key={appt.id}
                    item={appt}
                    onViewDetails={() => setDetailsItem({ type: 'appointment', data: appt })}
                    onUpdateStatus={(id, status) => updateStatus(id, 'appointment', status)}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="space-y-3.5 pb-24 lg:pb-6 animate-in fade-in-50 duration-200">
              {filteredInquiries.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                  <p className="text-sm text-gray-400">No contact inquiries found.</p>
                </div>
              ) : (
                filteredInquiries.map((inq) => (
                  <InquiryCard
                    key={inq.id}
                    item={inq}
                    onViewDetails={() => setDetailsItem({ type: 'inquiry', data: inq })}
                    onUpdateStatus={(id, status) => updateStatus(id, 'inquiry', status)}
                  />
                ))
              )}
            </div>
          )}
        </div>

        {/* RIGHT: Panels (desktop only - only show on Dashboard Overview) */}
        {tab === 'dashboard' && (
          <div className="hidden xl:flex flex-col gap-5 w-[320px] shrink-0">
            <UpcomingAppointments
              items={upcomingList}
              onViewDetails={(appt) => setDetailsItem({ type: 'appointment', data: appt })}
            />
            <RecentInquiries
              items={recentInquiriesList}
              onViewDetails={(inq) => setDetailsItem({ type: 'inquiry', data: inq })}
            />
          </div>
        )}
      </div>

      {/* Details Dialog Modal */}
      <DetailsModal
        item={detailsItem}
        onClose={() => setDetailsItem(null)}
        onUpdateStatus={updateStatus}
      />

      {/* Coming Soon Alert Popup */}
      <ComingSoonModal
        tabName={comingSoonTab}
        onClose={() => setComingSoonTab(null)}
      />
    </div>
  );
}

/* ─────────────────────────── export ─────────────────────────── */

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F7FAF8]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-9 h-9 rounded-full border-[3px] border-primary border-t-transparent animate-spin" />
            <p className="text-sm text-muted-foreground font-medium">Loading Dashboard…</p>
          </div>
        </div>
      }>
        <Dashboard />
      </Suspense>
    </AdminGuard>
  );
}
