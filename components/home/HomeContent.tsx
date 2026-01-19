'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';
import FilterSidebar from '@/components/filters/FilterSidebar';
import HeroCarousel from '@/components/layout/HeroCarousel';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useFilters } from '@/context/FilterContext';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types';
import { ChevronLeft, ChevronRight, SlidersHorizontal, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';

const ITEMS_PER_PAGE = 12;

export default function HomeContent() {
    const searchParams = useSearchParams();
    const { filters } = useFilters();
    const { products: PRODUCTS, loading, error } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const searchQuery = searchParams.get('search') || '';

    // Update filters from URL - Context handles this mostly, just syncing page
    useEffect(() => {
        setCurrentPage(1);
        // Scroll to top when filters change
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [filters, searchQuery]);

    // Filter products
    const filteredProducts = useMemo(() => {
        let filtered: Product[] = [...PRODUCTS];

        const query = searchQuery || filters.searchQuery;
        if (query) {
            filtered = filtered.filter((product) =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (filters.category !== 'Any') {
            filtered = filtered.filter((product) => product.category === filters.category);
        }

        if (filters.gender !== 'Any') {
            filtered = filtered.filter((product) => product.gender === filters.gender);
        }

        if (filters.colors.length > 0) {
            filtered = filtered.filter((product) =>
                filters.colors.some((color) => product.colors.includes(color))
            );
        }

        return filtered;
    }, [filters, searchQuery, PRODUCTS]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Show loading state
    if (loading) {
        return (
            <>
                <HeroCarousel />
                <div className="container-width py-12 md:py-20">
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                            <p className="text-muted-foreground">Loading products...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {/* Hero Section */}
            <HeroCarousel />

            <div className="container-width py-12 md:py-20">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-20">
                            <FilterSidebar />
                        </div>
                    </aside>

                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden mb-6">
                        <Button
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            variant="outline"
                            className="w-full justify-between"
                        >
                            <span>Filters</span>
                            <SlidersHorizontal size={18} />
                        </Button>
                        {/* Simple conditional rendering for mobile filters for now */}
                        {showMobileFilters && (
                            <div className="mt-4 p-4 bg-background rounded-xl border border-border">
                                <FilterSidebar />
                            </div>
                        )}
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-primary mb-2">
                                    {filters.category === 'Any' ? 'All Products' : filters.category}
                                </h2>
                                <p className="text-muted-foreground">
                                    {filteredProducts.length} items found
                                </p>
                            </div>
                        </div>

                        {paginatedProducts.length > 0 ? (
                            <>
                                <div 
                                    key={`products-${JSON.stringify(filters)}-${currentPage}`}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mb-12"
                                >
                                    {paginatedProducts.map((product, index) => (
                                        <ScrollReveal key={product.id} delay={index * 0.05}>
                                            <ProductCard product={product} />
                                        </ScrollReveal>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-12">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft size={18} />
                                        </Button>

                                        <div className="flex items-center gap-1 mx-2">
                                            {[...Array(totalPages)].map((_, i) => {
                                                const page = i + 1;
                                                if (
                                                    page === 1 ||
                                                    page === totalPages ||
                                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <button
                                                            key={page}
                                                            onClick={() => setCurrentPage(page)}
                                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${currentPage === page
                                                                    ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                                                                    : 'bg-transparent text-muted-foreground hover:bg-muted'
                                                                }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    );
                                                } else if (page === currentPage - 2 || page === currentPage + 2) {
                                                    return <span key={page} className="text-muted-foreground px-1">...</span>;
                                                }
                                                return null;
                                            })}
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                            disabled={currentPage === totalPages}
                                        >
                                            <ChevronRight size={18} />
                                        </Button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                    <SlidersHorizontal className="text-muted-foreground" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-2">No products found</h3>
                                <p className="text-muted-foreground max-w-sm mx-auto">
                                    Try checking your spelling or using different filters.
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-6"
                                    onClick={() => window.location.href = '/'}
                                >
                                    Clear All Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
