'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Order } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ChevronDown, Package, Calendar, MapPin } from 'lucide-react';

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('Orders') || '[]');
    setOrders(savedOrders.reverse()); // Most recent first
  }, []);

  if (orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <Package size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
        <p className="text-gray-600">Your order history will appear here</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      <div className="space-y-4">
        <AnimatePresence>
          {orders.map((order) => {
            const isExpanded = expandedOrder === order.id;
            const orderDate = new Date(order.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                      <Package size={24} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Order #{order.id.slice(-8)}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Calendar size={14} />
                        {orderDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-lg">{formatPrice(order.total)}</p>
                      <p className="text-sm text-gray-600 capitalize">{order.status}</p>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-gray-400 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-200"
                    >
                      <div className="p-6 space-y-6">
                        {/* Address */}
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <MapPin size={18} />
                            Delivery Address
                          </h4>
                          <p className="text-gray-600">{order.address.addressName}</p>
                          <p className="text-gray-600">{order.address.deliveryAddress}</p>
                        </div>

                        {/* Items */}
                        <div>
                          <h4 className="font-semibold mb-3">Items ({order.items.length})</h4>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div
                                key={item.product.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                <div>
                                  <p className="font-medium">{item.product.title}</p>
                                  <p className="text-sm text-gray-600">
                                    Quantity: {item.quantity}
                                  </p>
                                </div>
                                <p className="font-semibold">
                                  {formatPrice(
                                    (item.product.price -
                                      item.product.price * item.product.discount) *
                                      item.quantity
                                  )}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
