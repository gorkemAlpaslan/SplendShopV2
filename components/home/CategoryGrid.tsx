'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
    {
        id: 'shoes',
        name: 'Shoes',
        href: '/shop?category=Shoes',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
        description: 'Step into comfort'
    },
    {
        id: 'apparel',
        name: 'Apparel',
        href: '/shop?category=Apparel',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop',
        description: 'Everyday essentials'
    },
    {
        id: 'outerwear',
        name: 'Outerwear',
        href: '/shop?category=Outerwear',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
        description: 'Brave the elements'
    },
    {
        id: 'electronics',
        name: 'Electronics',
        href: '/shop?category=Electronics',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop',
        description: 'Smart living'
    }
];

export default function CategoryGrid() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container-width">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Shop by Category</h2>
                        <p className="text-muted-foreground mt-2 text-lg">Curated collections for every style.</p>
                    </div>
                    <Link href="/shop" className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                        View All Categories
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={category.href} className="group block relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/20">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <span className="text-xs font-semibold tracking-wider text-white/80 uppercase mb-2 block">
                                        {category.description}
                                    </span>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-serif font-bold text-white group-hover:text-accent transition-colors">
                                            {category.name}
                                        </h3>
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center translate-y-4 group-hover:translate-y-0">
                                            <ArrowRight className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
