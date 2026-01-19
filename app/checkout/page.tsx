'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/checkout/CartItem';
import AddressForm from '@/components/checkout/AddressForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { useCart } from '@/context/CartContext';
import { Address, Order } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const SHIPPING_COST = 10;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 0,
      addressName: 'Home',
      deliveryAddress: '123 Main Street, City, State 12345',
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  const subtotal = getTotal();
  const shipping = items.length > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    // Load addresses from localStorage
    const savedAddresses = localStorage.getItem('addresses');
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  const handleAddAddress = (addressData: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      id: addresses.length,
      ...addressData,
    };
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress || items.length === 0) return;

    const order: Order = {
      id: Date.now().toString(),
      items,
      total,
      address: addresses.find((a) => a.id === selectedAddress)!,
      date: new Date().toISOString(),
      status: 'pending',
    };

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('Orders') || '[]');
    orders.push(order);
    localStorage.setItem('Orders', JSON.stringify(orders));

    // Clear cart
    clearCart();

    // Redirect to profile/orders
    router.push('/profile?tab=orders');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some products to get started</p>
            <Link href="/">
              <Button size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
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
                  addresses={addresses}
                  selectedAddress={selectedAddress}
                  onSelectAddress={setSelectedAddress}
                  onAddAddress={handleAddAddress}
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
