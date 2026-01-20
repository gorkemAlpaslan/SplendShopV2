'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/products/ProductCard';
import { Heart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { getUserFavorites } from '@/lib/firestore/users';

export default function SavedItems() {
  const { products, loading: loadingProducts } = useProducts();
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      if (user) {
        try {
          const favorites = await getUserFavorites(user.uid);
          setFavoriteIds(favorites);
        } catch (error) {
          console.error('Failed to load favorites:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setFavoriteIds([]);
        setLoading(false);
      }
    }
    loadFavorites();
  }, [user]);

  // Filter products that are in favorites
  // Optimization: If products list is huge, this might be slow, but for now it's fine.
  // Ideally useProducts should accept an array of IDs to fetch.
  const favoriteProducts = products.filter(p => favoriteIds.includes(p.id));

  if (loading || loadingProducts) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
        <p>Loading your saved items...</p>
      </div>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="text-center py-20 bg-card rounded-xl border border-border">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-serif font-medium mb-2">No saved items</h3>
          <p className="text-muted-foreground mb-6">Items you love will appear here.</p>
          <Link href="/">
              <Button>Start Shopping</Button>
          </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
                {favoriteProducts.map((product) => (
                    <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    </div>
  );
}
