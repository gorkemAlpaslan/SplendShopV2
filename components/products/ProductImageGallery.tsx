'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Desktop: Grid Layout (First image large, others in grid) or simple stack
  // Mobile: Slider

  return (
    <div className="space-y-4">
      {/* Mobile Slider (Hidden on lg) */}
      <div className="lg:hidden relative aspect-[3/4] overflow-hidden rounded-sm bg-secondary/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImage]}
              alt={`${title} - View ${currentImage + 1}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw"
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${currentImage === idx ? 'bg-white w-4' : 'bg-white/50'
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden lg:grid grid-cols-2 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={cn(
              "relative overflow-hidden bg-secondary/10 group cursor-zoom-in rounded-sm",
              idx === 0 ? "col-span-2 aspect-[4/5]" : "aspect-[3/4]"
            )}
          >
            <Image
              src={img}
              alt={`${title} - Detail ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
              sizes="(min-width: 1024px) 50vw"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
