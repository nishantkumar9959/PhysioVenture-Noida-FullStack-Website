'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export function useAdminAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      router.replace('/admin/login');
      return;
    }

    // Verify this is actually an admin user
    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (error || !adminUser) {
      await supabase.auth.signOut();
      router.replace('/admin/login');
      return;
    }

    setUser(session.user);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    checkAuth();

    // Listen for auth state changes (logout from another tab, token expiry)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.replace('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [checkAuth, router]);

  return { user, loading };
}
