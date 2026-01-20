'use client';

import { motion } from 'framer-motion';
import { Order } from '@/types';
import { Package, Clock, CheckCircle, XCircle, Truck, Calendar } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

interface OrderListProps {
  orders: Order[];
  loading: boolean;
}

const statusConfig = {
    pending: { color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', icon: Clock, label: 'Processing' },
    processing: { color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: Package, label: 'Preparing' },
    shipped: { color: 'bg-purple-500/10 text-purple-500 border-purple-500/20', icon: Truck, label: 'Shipped' },
    delivered: { color: 'bg-green-500/10 text-green-500 border-green-500/20', icon: CheckCircle, label: 'Delivered' },
    cancelled: { color: 'bg-red-500/10 text-red-500 border-red-500/20', icon: XCircle, label: 'Cancelled' },
};

export default function OrderList({ orders, loading }: OrderListProps) {
    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2].map((i) => (
                    <div key={i} className="h-48 bg-card animate-pulse rounded-xl border border-border" />
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-20 bg-card rounded-xl border border-border">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-2">No orders yet</h3>
                <p className="text-muted-foreground">Start shopping to see your orders here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {orders.map((order, index) => {
                const StatusIcon = statusConfig[order.status].icon;
                
                return (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                        {/* Order Header */}
                        <div className="p-6 border-b border-border bg-muted/20 flex flex-wrap gap-4 justify-between items-center">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="font-mono">#{order.id.slice(-8).toUpperCase()}</span>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>{new Date(order.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="font-semibold">{formatPrice(order.total)}</div>
                            </div>
                            
                            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border ${statusConfig[order.status].color}`}>
                                <StatusIcon size={14} />
                                {statusConfig[order.status].label}
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-6">
                            <div className="space-y-4">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex gap-4 items-center">
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                            {item.product.src?.[0] && (
                                                <Image 
                                                    src={item.product.src[0]} 
                                                    alt={item.product.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium truncate">{item.product.title}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Qty: {item.quantity} × {formatPrice(item.product.price)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Delivery Info */}
                            <div className="mt-6 pt-6 border-t border-border">
                                <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Delivery To</h5>
                                <p className="font-medium text-sm">{order.address.addressName}</p>
                                <p className="text-sm text-muted-foreground">{order.address.deliveryAddress}</p>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
