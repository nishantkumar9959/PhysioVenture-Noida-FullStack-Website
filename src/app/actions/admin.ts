// Client-side admin utilities — compatible with output: export (static HTML)
// No server-side code, no cookies API, no 'use server' directive.

import { supabase } from '@/lib/supabase';

export type AdminRole = 'super_admin' | 'admin' | 'viewer';

export async function getAdminRole(userId: string): Promise<AdminRole | null> {
  const { data, error } = await supabase
    .from('admin_users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error || !data) return null;
  return data.role as AdminRole;
}

export async function logoutAdmin() {
  await supabase.auth.signOut();
  window.location.href = '/admin/login';
}

export async function updateAppointmentStatus(id: string, status: string) {
  const { error } = await supabase
    .from('appointments')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
}

export async function updateInquiryStatus(id: string, status: string) {
  const { error } = await supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
}

export async function markNotificationRead(id: string) {
  const { error } = await supabase
    .from('admin_notifications')
    .update({ is_read: true })
    .eq('id', id);

  if (error) throw error;
}
