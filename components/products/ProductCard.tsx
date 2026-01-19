'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatPrice, calculateDiscountPrice } from '@/lib/utils';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);

    // Save to localStorage
    const favorites = JSON.parse(localStorage.getItem('FavoriteProducts') || '[]');
    if (isFavorite) {
      const updated = favorites.filter((id: string) => id !== product.id);
      localStorage.setItem('FavoriteProducts', JSON.stringify(updated));
    } else {
      favorites.push(product.id);
      localStorage.setItem('FavoriteProducts', JSON.stringify([...new Set(favorites)]));
    }
  };

  const finalPrice = calculateDiscountPrice(product.price, product.discount);
  const hasDiscount = product.discount > 0;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30 rounded-sm mb-4">
        <Link 
          href={`/products/${product.id}`} 
          className="absolute inset-0 z-10" 
          aria-label={`View ${product.title}`}
        />
        <Image
          src={product.minisrc[0]}
          alt={product.title}
          fill
          className={`object-cover transition-transform duration-700 ease-out pointer-events-none ${isHovered ? 'scale-105' : 'scale-100'
            }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <Badge
            variant="destructive"
            className="absolute top-3 left-3 rounded-none px-2 py-1 text-[10px] tracking-wider font-bold uppercase z-20 pointer-events-none"
          >
            -{Math.round(product.discount * 100)}%
          </Badge>
        )}

        {/* Quick Actions Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 ease-out z-20 ${isHovered ? 'translate-y-0' : ''}`}>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-white/90 backdrop-blur text-black hover:bg-white border-none shadow-lg font-medium text-sm tracking-wide uppercase"
            size="md"
          >
            <ShoppingBag size={16} className="mr-2" />
            Quick Add
          </Button>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-20 ${isFavorite ? 'text-red-500 bg-white shadow-sm' : 'text-foreground/60 hover:text-foreground hover:bg-white/50'}`}
        >
          <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="font-medium text-foreground text-base group-hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(product.itemRate) ? 'fill-current' : 'text-muted stroke-muted-foreground/30'}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.itemRate})</span>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(finalPrice)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through decoration-muted-foreground/50">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
