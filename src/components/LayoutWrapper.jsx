'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollEffects from '@/components/ScrollEffects';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) return children;

  return (
    <>
      <ScrollEffects />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}