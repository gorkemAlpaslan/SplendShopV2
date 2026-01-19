'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
    title: 'Autumn Elegance',
    subtitle: 'Discover the warmth of our new season collection.',
    link: '/?category=Clothing',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop',
    title: 'Modern Essentials',
    subtitle: 'Timeless pieces for the contemporary wardrobe.',
    link: '/?category=Clothing',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop',
    title: 'Statement Accessories',
    subtitle: 'Bold touches that define your unique style.',
    link: '/?category=Accessories',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full container-width flex items-center">
        <div className="max-w-2xl text-white pt-20">
          <AnimatePresence mode="wait">
            <div key={currentSlide} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
              >
                <h2 className="text-xl md:text-2xl font-light tracking-widest text-[#D4AF37] uppercase mb-4">
                  {slides[currentSlide].subtitle}
                </h2>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
                  {slides[currentSlide].title}
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
              >
                <Link href={slides[currentSlide].link}>
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 border-0 rounded-none px-10 py-6 text-lg tracking-widest uppercase"
                  >
                    Explore Collection
                  </Button>
                </Link>
              </motion.div>
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-10">
        <div className="container-width flex items-center gap-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="group relative py-4"
            >
              <div className={`h-1 transition-all duration-500 ${index === currentSlide ? 'w-16 bg-white' : 'w-8 bg-white/30 group-hover:bg-white/50'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
