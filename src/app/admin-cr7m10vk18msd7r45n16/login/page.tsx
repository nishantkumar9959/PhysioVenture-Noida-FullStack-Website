'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { z } from 'zod';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow]         = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [focused, setFocused]   = useState<'email' | 'password' | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) { setError(parsed.error.issues[0].message); return; }

    setLoading(true);
    try {
      const { data, error: signInErr } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      if (signInErr) { setError(signInErr.message); return; }
      const { data: admin, error: roleErr } = await supabase
        .from('admin_users').select('role').eq('id', data.user.id).single();
      if (roleErr || !admin) {
        await supabase.auth.signOut();
        setError(roleErr ? `Auth check failed: ${roleErr.message}` : 'Unauthorized. Only admin users are allowed.');
        return;
      }
      router.replace('/admin-cr7m10vk18msd7r45n16');
    } catch {
      setError('Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const wrap = (f: 'email' | 'password') =>
    `flex items-center rounded-lg border bg-white transition-all duration-150 ${
      focused === f
        ? 'border-primary/60 ring-2 ring-primary/15'
        : 'border-gray-200 hover:border-gray-300'
    }`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7FAF8] px-4 py-8">

      {/* ── Logo ── */}
      <a href="/" className="flex items-center gap-2 mb-5">
        <div className="relative w-8 h-8 shrink-0">
          <Image src="/images/logo.png" alt="PhysioVenture" fill sizes="32px" className="object-contain" priority />
        </div>
        <span className="font-display font-extrabold text-[21px] tracking-tight leading-none select-none">
          <span className="text-primary">Physio</span>
          <span style={{ color: 'hsl(160 75% 28%)' }}>Venture</span>
        </span>
      </a>

      {/* ── Card ── */}
      <div className="w-full max-w-[360px] bg-white rounded-2xl border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.07)] px-6 py-7">

        {/* Icon + headings */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-gray-500" strokeWidth={1.8} />
          </div>
          <h1 className="text-[18px] font-bold text-gray-900 tracking-tight">Admin Access</h1>
          <p className="text-[12px] text-gray-400 mt-1 text-center leading-relaxed">
            Secure login for authorized personnel only
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="adm-email" className="text-[12px] font-semibold text-gray-600">
              Email Address
            </label>
            <div className={wrap('email')}>
              <input
                id="adm-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                required
                className="flex-1 h-10 px-3.5 text-[13px] text-gray-800 placeholder-gray-400 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="adm-password" className="text-[12px] font-semibold text-gray-600">
              Password
            </label>
            <div className={wrap('password')}>
              <input
                id="adm-password"
                key={show ? 'text' : 'password'}
                type={show ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                required
                className="flex-1 h-10 pl-3.5 text-[13px] text-gray-800 placeholder-gray-400 outline-none bg-transparent"
              />
              {/* Eye — right-side sibling, not absolute */}
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShow(v => !v)}
                aria-label={show ? 'Hide password' : 'Show password'}
                className="w-10 h-10 flex items-center justify-center shrink-0 text-gray-400 hover:text-primary transition-colors rounded-r-lg"
              >
                {show
                  ? <EyeOff size={16} strokeWidth={1.8} />
                  : <Eye    size={16} strokeWidth={1.8} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 text-[12px] text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
              <span className="mt-px">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-lg font-semibold text-[14px] text-white mt-1
                       bg-primary hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60
                       flex items-center justify-center gap-2 shadow-sm transition-all duration-150"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating…
              </>
            ) : (
              <>
                <ShieldCheck size={15} strokeWidth={2} />
                Login to Dashboard
              </>
            )}
          </button>
        </form>
      </div>

      <p className="text-[11px] text-gray-400 mt-4 text-center px-4">
        This area is restricted. Unauthorized access is prohibited.
      </p>
    </div>
  );
}
