'use client';

import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroCarousel from '@/components/layout/HeroCarousel';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedSlider from '@/components/home/FeaturedSlider';
import PromoBanner from '@/components/home/PromoBanner';
import TrendingSection from '@/components/home/TrendingSection';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          }
        >
          {/* Hero Section */}
          <HeroCarousel />

          {/* Shop by Category - Visual Grid */}
          <CategoryGrid />

          {/* Trending/Featured Slider */}
          <FeaturedSlider />

          {/* Full Width Promo Banner */}
          <PromoBanner />

          {/* Curated Selections */}
          <TrendingSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
