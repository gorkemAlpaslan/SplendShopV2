'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductCard from '@/components/products/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function FeaturedSlider() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { products, loading } = useProducts();

    // Get top 8 rated products
    const featuredProducts = products
        .sort((a, b) => Number(b.itemRate) - Number(a.itemRate))
        .slice(0, 8);

    if (loading) {
        return (
            <section className="py-16 md:py-24 bg-secondary/30 relative overflow-hidden">
                <div className="container-width relative z-10">
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                            <p className="text-muted-foreground">Loading featured products...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 md:py-24 bg-secondary/30 relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-40 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container-width relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="max-w-xl">
                        <span className="text-accent text-sm font-bold uppercase tracking-widest mb-2 block">Don't Miss Out</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Trending Now</h2>
                        <p className="text-muted-foreground mt-4 text-lg">
                            Our most coveted pieces of the season. Discover the styles everyone is talking about.
                        </p>
                    </div>
                    <Link href="/shop" className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-background hover:bg-foreground hover:text-white transition-all font-medium group">
                        Shop All
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Horizontal Slider */}
                <div
                    ref={containerRef}
                    className="flex gap-6 overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="min-w-[280px] md:min-w-[320px] snap-center"
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}

                    {/* View More Card */}
                    <Link
                        href="/shop"
                        className="min-w-[200px] flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-border hover:border-accent hover:bg-accent/5 transition-colors group snap-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <ArrowRight className="w-6 h-6 text-foreground" />
                        </div>
                        <span className="font-serif font-bold text-lg">View All</span>
                        <span className="text-muted-foreground text-sm">Discover more items</span>
                    </Link>
                </div>

                <div className="mt-8 flex justify-center md:hidden">
                    <Link href="/shop" className="flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-background hover:bg-foreground hover:text-white transition-all font-medium group w-full justify-center">
                        Shop All
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
