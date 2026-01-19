'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { getProducts, getProductById } from '@/lib/firestore/products';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                console.log('[useProducts] Fetching from Firestore...');
                const firestoreProducts = await getProducts();
                console.log('[useProducts] Firestore returned:', firestoreProducts.length, 'products');
                setProducts(firestoreProducts);
            } catch (err) {
                console.error('[useProducts] Error fetching products:', err);
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return { products, loading, error };
}

export function useProduct(id: string) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            if (!id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                console.log('[useProduct] Fetching product from Firestore, id:', id);
                const fetchedProduct = await getProductById(id);
                console.log('[useProduct] Product fetched:', fetchedProduct);
                setProduct(fetchedProduct);
            } catch (err) {
                console.error('[useProduct] Error fetching product:', err);
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    return { product, loading, error };
}
