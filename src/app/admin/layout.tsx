import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

// The /admin route has been moved. This layout blocks all child routes.
export default function AdminLayout() {
  notFound();
}
