import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | PhysioVenture',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

// Admin layout is intentionally minimal at the server level.
// Route protection is handled client-side via AdminGuard (static export compatible).
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
