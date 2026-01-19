'use client';

import ProductCard from '@/components/products/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

export default function TrendingSection() {
    const { products, loading } = useProducts();
    
    // Get distinct nice products
    const items = products.slice(8, 12);

    if (loading) {
        return (
            <section className="py-16 md:py-24 bg-background">
                <div className="container-width">
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                            <p className="text-muted-foreground">Loading products...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container-width">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider mb-4">
                        <Sparkles className="w-4 h-4 text-accent" />
                        Curated For You
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
                        Style Inspirations
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Handpicked selections to refresh your look this week.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
