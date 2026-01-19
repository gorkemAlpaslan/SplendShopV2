'use client';

import { motion } from 'framer-motion';
import { CartItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onPlaceOrder: () => void;
  isDisabled: boolean;
}

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  total,
  onPlaceOrder,
  isDisabled,
}: OrderSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 sticky top-20"
    >
      <h3 className="text-xl font-bold mb-6">Order Summary</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Items ({items.length})</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{formatPrice(shipping)}</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      <Button
        onClick={onPlaceOrder}
        disabled={isDisabled}
        className="w-full"
        size="lg"
      >
        Place Order
      </Button>

      <p className="text-xs text-gray-500 mt-4 text-center">
        By placing your order, you agree to our terms and conditions
      </p>
    </motion.div>
  );
}
