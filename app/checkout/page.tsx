'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/checkout/CartItem';
import AddressForm from '@/components/checkout/AddressForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { createOrder } from '@/lib/firestore/orders';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Address, Order } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const SHIPPING_COST = 10;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const subtotal = getTotal();
  const shipping = items.length > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    if (!user) {
        router.push('/signup');
        return;
    }

    if (!selectedAddress || items.length === 0) return;

    setIsProcessing(true);
    try {
        const orderData = {
            items,
            total,
            address: selectedAddress,
            status: 'pending' as const,
            date: new Date().toISOString()
        };
        
        await createOrder({
            ...orderData,
            userId: user.uid
        });

        clearCart();
        router.push('/profile?tab=orders');
    } catch (error) {
        console.error("Order creation failed:", error);
        alert("Failed to place order. Please try again.");
    } finally {
        setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-32 pb-32 flex items-center justify-center px-4">
          <div className="text-center max-w-md w-full space-y-6">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag size={40} className="text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-foreground">Your cart is empty</h2>
              <p className="text-muted-foreground">Add some products to get started</p>
            </div>
            <div className="pt-4">
              <Link href="/">
                <Button size="lg">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container-width py-8 md:py-12">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shopping
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-4">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Cart Items & Address */}
            <div className="lg:col-span-2 space-y-8">
              {/* Cart Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h2 className="text-xl font-serif font-semibold text-foreground mb-6">Your Items ({items.length})</h2>
                <div className="space-y-4 divide-y divide-border">
                  {items.map((item) => (
                    <CartItem
                      key={item.product.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Address Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <AddressForm
                  selectedAddressId={selectedAddress?.id ?? null}
                  onSelectAddress={setSelectedAddress}
                />
              </motion.div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <OrderSummary
                  items={items}
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                  onPlaceOrder={handlePlaceOrder}
                  isDisabled={!selectedAddress}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
