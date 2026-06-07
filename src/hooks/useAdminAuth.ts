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
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.replace('/admin-cr7m10vk18msd7r45n16/login');
      return;
    }

    // Verify this is actually an admin user
    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (error || !adminUser) {
      await supabase.auth.signOut();
      router.replace('/admin-cr7m10vk18msd7r45n16/login');
      return;
    }

    setUser(user);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    checkAuth();

    // Listen for auth state changes (logout from another tab, token expiry)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.replace('/admin-cr7m10vk18msd7r45n16/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [checkAuth, router]);

  return { user, loading };
}
