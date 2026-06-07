'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useAdminRealtime(onUpdate: () => void) {
  useEffect(() => {
    // We subscribe to all changes on relevant tables
    const channel = supabase.channel('admin-dashboard-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'appointment_requests' },
        (payload) => {
          void payload; // payload intentionally unused – no PII in logs
          onUpdate();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contact_inquiries' },
        (payload) => {
          void payload; // payload intentionally unused – no PII in logs
          onUpdate();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onUpdate]);
}
