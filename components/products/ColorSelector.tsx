'use client';

import { motion } from 'framer-motion';
import { COLOR_OPTIONS } from '@/lib/constants';

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string | null;
  onColorSelect: (color: string) => void;
}

export default function ColorSelector({
  colors,
  selectedColor,
  onColorSelect,
}: ColorSelectorProps) {
  const availableColors = COLOR_OPTIONS.filter((option) =>
    colors.includes(option.value)
  );

  return (
    <div>
      <label className="block text-sm font-semibold mb-3">Color</label>
      <div className="flex flex-wrap gap-3">
        {availableColors.map((colorOption) => {
          const isSelected = selectedColor === colorOption.value;
          return (
            <motion.button
              key={colorOption.value}
              onClick={() => onColorSelect(colorOption.value)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full border-2 transition-all ${
                isSelected
                  ? 'border-gray-900 scale-110 shadow-lg'
                  : 'border-gray-300 hover:border-gray-500'
              }`}
              style={{ backgroundColor: colorOption.color }}
              title={colorOption.label}
              aria-label={`Select ${colorOption.label} color`}
            />
          );
        })}
      </div>
    </div>
  );
}
