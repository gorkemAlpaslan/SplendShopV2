'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Minus, X } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { formatPrice, calculateDiscountPrice } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item;
  const finalPrice = calculateDiscountPrice(product.price, product.discount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 p-4 bg-white rounded-lg shadow-md"
    >
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={product.minisrc[0]}
          alt={product.title}
          fill
          className="object-cover rounded-lg"
          sizes="96px"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{product.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.content}</p>
        <p className="text-lg font-bold text-gray-900">{formatPrice(finalPrice)}</p>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => onRemove(product.id)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
            className="p-1 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            className="p-1 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
