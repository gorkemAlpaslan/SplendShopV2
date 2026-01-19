'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function PromoBanner() {
    return (
        <section className="py-8 md:py-16">
            <div className="container-width">
                <div className="relative rounded-3xl overflow-hidden bg-foreground text-background min-h-[500px] flex items-center">
                    {/* Background Image/Video Placeholder */}
                    <div
                        className="absolute inset-0 z-0 opacity-60"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

                    {/* Content */}
                    <div className="relative z-20 container-width px-6 md:px-12 py-12 text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur border border-white/20 mb-6 text-sm font-semibold tracking-wider uppercase">
                                Limited Time Offer
                            </div>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
                                Summer Collection <br />
                                <span className="text-accent">Up to 40% Off</span>
                            </h2>
                            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-lg">
                                Upgrade your wardrobe with our latest arrivals. Premium materials, sustainable production, and timeless designs now at special prices.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/shop?category=Apparel"
                                    className="px-8 py-4 bg-white text-black rounded-lg font-bold text-lg hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2"
                                >
                                    Shop Women
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="/shop?category=Outerwear"
                                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-black transition-colors flex items-center justify-center"
                                >
                                    Shop Men
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
