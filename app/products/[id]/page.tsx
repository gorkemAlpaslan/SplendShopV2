'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductImageGallery from '@/components/products/ProductImageGallery';
import ColorSelector from '@/components/products/ColorSelector';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useProduct } from '@/hooks/useProducts';
import { formatPrice, calculateDiscountPrice } from '@/lib/utils';
import { Star, ShoppingBag, Heart, ArrowLeft, Truck, RefreshCw, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import LoginModal from '@/components/auth/LoginModal';
import { getUserFavorites, addUserFavorite, removeUserFavorite } from '@/lib/firestore/users';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const { user } = useAuth();
  const { product, loading, error } = useProduct(params.id as string);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  useEffect(() => {
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  useEffect(() => {
    async function loadFavoriteStatus() {
      if (product && user) {
        try {
          const favorites = await getUserFavorites(user.uid);
          setIsFavorite(favorites.includes(product.id));
        } catch (error) {
          console.error('Failed to load favorite status:', error);
        }
      } else {
        setIsFavorite(false);
      }
    }
    loadFavoriteStatus();
  }, [product, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error ? 'An error occurred while loading the product.' : 'The product you are looking for does not exist.'}
            </p>
            <Button onClick={() => router.push('/')} size="lg">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const finalPrice = calculateDiscountPrice(product.price, product.discount);
  const hasDiscount = product.discount > 0;

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setLoadingFavorite(true);
    try {
      if (isFavorite) {
        await removeUserFavorite(user.uid, product.id);
        setIsFavorite(false);
      } else {
        await addUserFavorite(user.uid, product.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    } finally {
      setLoadingFavorite(false);
    }
  };

  // Mock sizes for demo purposes if not in product type
  const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container-width py-8 md:py-12">
          {/* Breadcrumb / Back */}
          <nav className="mb-8 flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/" className="hover:text-primary transition-colors">{product.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Images - Takes up more space on desktop */}
            <div className="lg:col-span-7 xl:col-span-8">
              <ProductImageGallery images={product.src} title={product.title} />
            </div>

            {/* Product Info - Sticky Sidebar */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-20 space-y-8">
                {/* Header */}
                <div>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3 leading-tight">
                    {product.title}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-bold text-foreground">
                        {formatPrice(finalPrice)}
                      </span>
                      {hasDiscount && (
                        <span className="text-lg text-muted-foreground line-through decoration-muted-foreground/40">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-accent text-accent" />
                      <span className="text-sm font-medium">{product.itemRate}</span>
                      <span className="text-sm text-muted-foreground">(128 reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border/50" />

                {/* Selectors */}
                <div className="space-y-6">
                  {/* Size Selector */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wide">Size</h3>
                      <button className="text-xs text-muted-foreground underline hover:text-primary">Size Guide</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {SIZES.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`h-11 min-w-[3rem] px-3 rounded-md border text-sm font-medium transition-all ${selectedSize === size
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border hover:border-primary text-foreground'
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selector */}
                  {product.colors.length > 0 && (
                    <ColorSelector
                      colors={product.colors}
                      selectedColor={selectedColor}
                      onColorSelect={setSelectedColor}
                    />
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="flex-1 text-base uppercase tracking-wide"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <button
                    onClick={handleToggleFavorite}
                    disabled={loadingFavorite}
                    className={`h-14 w-14 rounded-xl border flex items-center justify-center transition-all ${isFavorite
                      ? 'border-red-200 bg-red-50 text-red-500'
                      : 'border-input hover:border-black hover:bg-secondary'
                      } ${loadingFavorite ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Heart className={isFavorite ? 'fill-current' : ''} size={24} />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 py-6 border-y border-border/50 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 border-l border-border/50">
                    <RefreshCw className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Free Returns</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 border-l border-border/50">
                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Secure Checkout</span>
                  </div>
                </div>

                {/* Details Accordion */}
                <Accordion
                  items={[
                    {
                      title: 'Description',
                      content: <p>{product.description}</p>,
                      defaultOpen: true
                    },
                    {
                      title: 'Material & Care',
                      content: (
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Premium cotton blend</li>
                          <li>Machine wash cold</li>
                          <li>Do not bleach</li>
                          <li>Tumble dry low</li>
                        </ul>
                      )
                    },
                    {
                      title: 'Shipping & Returns',
                      content: <p>Free standard shipping on orders over $100. Returns accepted within 30 days of purchase.</p>
                    }
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Related items section could go here */}
        </div>
      </main>
      <Footer />
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
}
