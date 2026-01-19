'use client';

import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileContent from '@/components/profile/ProfileContent';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          }
        >
          <ProfileContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
