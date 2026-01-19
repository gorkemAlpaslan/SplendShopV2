'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFilters } from '@/context/FilterContext';
import { CATEGORIES, GENDERS, SIZES, COLOR_OPTIONS } from '@/lib/constants';
import Button from '@/components/ui/Button';
import { X } from 'lucide-react';

export default function FilterSidebar() {
  const { filters, applyFilters, resetFilters } = useFilters();
  const [localFilters, setLocalFilters] = useState({
    category: filters.category,
    gender: filters.gender,
    size: filters.size,
    colors: filters.colors,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Ensure sidebar is always visible on desktop
  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        setIsOpen(true); // Always open on desktop
      }
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleApply = () => {
    applyFilters(localFilters);
    setIsOpen(false);
  };

  const handleReset = () => {
    resetFilters();
    setLocalFilters({
      category: 'Any',
      gender: 'Any',
      size: 'Any',
      colors: [],
    });
  };

  const toggleColor = (color: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  // Auto-apply filters on desktop when selection changes
  useEffect(() => {
    if (isDesktop) {
      applyFilters(localFilters);
    }
  }, [localFilters, isDesktop, applyFilters]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white p-4 rounded-full shadow-luxury-lg z-40 hover:from-[#E5C158] hover:to-[#D4AF37] transition-all"
      >
        Filters
      </button>

      {/* Overlay - Mobile Only */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Always visible on desktop, animated on mobile */}
      <motion.div
        data-sidebar
        initial={false}
        animate={
          isOpen || isDesktop
            ? { x: 0, opacity: 1 }
            : { x: '-100%', opacity: 0 }
        }
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed lg:relative top-0 left-0 h-screen lg:h-auto bg-background lg:bg-transparent border-r lg:border-none border-border shadow-2xl lg:shadow-none z-50 lg:z-auto w-80 lg:w-full overflow-y-auto lg:overflow-visible p-6 lg:p-0"
      >
        <div className="flex flex-col h-full lg:h-auto space-y-8">
          {/* Header - Mobile Only */}
          <div className="flex items-center justify-between lg:hidden mb-2">
            <h2 className="text-2xl font-serif font-bold text-primary">Filters</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between mb-4 border-b border-border pb-4">
            <h3 className="text-xl font-serif font-bold text-primary">Refine By</h3>
            <button
              onClick={handleReset}
              className="text-sm text-muted-foreground hover:text-accent transition-colors underline decoration-dotted underline-offset-4"
            >
              Clear All
            </button>
          </div>

          {/* Category */}
          <div>
            <h4 className="font-semibold text-primary mb-3">Category</h4>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <label key={cat.value} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="category"
                      checked={localFilters.category === cat.value}
                      onChange={() => setLocalFilters({ ...localFilters, category: cat.value })}
                      className="peer appearance-none w-5 h-5 rounded-full border border-input checked:border-accent checked:bg-accent transition-all"
                    />
                    <div className="absolute w-2 h-2 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className={`text-sm group-hover:text-primary transition-colors ${localFilters.category === cat.value ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    {cat.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div>
            <h4 className="font-semibold text-primary mb-3">Gender</h4>
            <div className="space-y-2">
              {GENDERS.map((gender) => (
                <label key={gender.value} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="gender"
                      checked={localFilters.gender === gender.value}
                      onChange={() => setLocalFilters({ ...localFilters, gender: gender.value })}
                      className="peer appearance-none w-5 h-5 rounded-full border border-input checked:border-accent checked:bg-accent transition-all"
                    />
                    <div className="absolute w-2 h-2 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className={`text-sm group-hover:text-primary transition-colors ${localFilters.gender === gender.value ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    {gender.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h4 className="font-semibold text-primary mb-3">Colors</h4>
            <div className="flex flex-wrap gap-3">
              {COLOR_OPTIONS.map((color) => {
                const isSelected = localFilters.colors.includes(color.value);
                return (
                  <button
                    key={color.value}
                    onClick={() => toggleColor(color.value)}
                    className={`group relative w-8 h-8 rounded-full border transition-all ${isSelected
                      ? 'border-primary ring-2 ring-primary/20 scale-110'
                      : 'border-border hover:border-accent hover:scale-105'
                      }`}
                    style={{ backgroundColor: color.color }}
                    title={color.label}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions - Mobile Only mainly */}
          <div className="pt-4 lg:hidden">
            <Button onClick={handleApply} className="w-full">
              Apply Filters
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
