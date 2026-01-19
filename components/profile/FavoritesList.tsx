'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice, calculateDiscountPrice } from '@/lib/utils';
import { Heart, ShoppingCart, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function FavoritesList() {
  const { addItem } = useCart();
  const { products, loading } = useProducts();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('FavoriteProducts') || '[]');
    setFavoriteIds(favorites);
  }, []);

  const favorites = products.filter((product) => favoriteIds.includes(product.id));

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading favorites...</p>
      </motion.div>
    );
  }

  const handleRemoveFavorite = (productId: string) => {
    const updated = favoriteIds.filter((id) => id !== productId);
    setFavoriteIds(updated);
    localStorage.setItem('FavoriteProducts', JSON.stringify(updated));
  };

  const handleAddToCart = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      addItem(product);
    }
  };

  if (favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <Heart size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
        <p className="text-gray-600 mb-6">Start adding products to your favorites!</p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
        >
          Browse Products
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {favorites.map((product, index) => {
            const finalPrice = calculateDiscountPrice(product.price, product.discount);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-square">
                    <Image
                      src={product.minisrc[0]}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-lg font-bold mb-4">{formatPrice(finalPrice)}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFavorite(product.id)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Heart size={18} className="fill-red-500 text-red-500" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
