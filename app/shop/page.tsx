'use client';

import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ShopContent from '@/components/shop/ShopContent';
import { Loader2 } from 'lucide-react';

export default function ShopPage() {
    return (
        <div className="min-h-screen flex flex-col bg-secondary/30">
            <Navbar />
            <main className="flex-1 pt-20">
                <Suspense
                    fallback={
                        <div className="min-h-screen flex items-center justify-center">
                            <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        </div>
                    }
                >
                    <ShopContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
