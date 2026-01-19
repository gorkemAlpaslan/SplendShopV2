import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    addDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    QueryConstraint,
    writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';
import { Product } from '@/types';

const PRODUCTS_COLLECTION = 'products';

/**
 * Upload products to Firestore
 * Use this once to migrate data from constants.ts to Firestore
 */
export async function uploadProducts(products: Product[]) {
    const batch = [];

    for (const product of products) {
        const productRef = doc(db, PRODUCTS_COLLECTION, product.id);
        batch.push(setDoc(productRef, product));
    }

    await Promise.all(batch);
    console.log(`Successfully uploaded ${products.length} products to Firestore`);
}

/**
 * Get all products from Firestore
 */
export async function getProducts(): Promise<Product[]> {
    console.log('[Firestore] Getting products from collection:', PRODUCTS_COLLECTION);
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    console.log('[Firestore] Collection ref created');

    const snapshot = await getDocs(productsRef);
    console.log('[Firestore] Snapshot received, docs count:', snapshot.docs.length);

    const products = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log('[Firestore] Doc ID:', doc.id, 'Data:', data);
        return {
            ...data,
            id: doc.id
        };
    }) as Product[];

    console.log('[Firestore] Returning', products.length, 'products');
    return products;
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
        return null;
    }

    return {
        ...snapshot.data(),
        id: snapshot.id
    } as Product;
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(productsRef, where('category', '==', category));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    })) as Product[];
}

/**
 * Search products by title
 */
export async function searchProducts(searchTerm: string): Promise<Product[]> {
    // Note: Firestore doesn't support full-text search natively
    // For production, consider using Algolia or Elasticsearch
    // This is a simple implementation that fetches all and filters client-side
    const products = await getProducts();
    return products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

/**
 * Add a new product
 */
export async function addProduct(product: Omit<Product, 'id'>): Promise<string> {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const docRef = await addDoc(productsRef, product);
    return docRef.id;
}

/**
 * Update a product
 */
export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    await setDoc(productRef, data, { merge: true });
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string): Promise<void> {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(productRef);
}

/**
 * Delete all products from Firestore
 * WARNING: This operation cannot be undone!
 */
export async function deleteAllProducts(): Promise<void> {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const snapshot = await getDocs(productsRef);
    
    if (snapshot.empty) {
        console.log('[Firestore] No products to delete');
        return;
    }

    console.log(`[Firestore] Deleting ${snapshot.docs.length} products...`);
    
    // Firestore batch limit is 500 operations
    const BATCH_SIZE = 500;
    const batches: Promise<void>[] = [];

    for (let i = 0; i < snapshot.docs.length; i += BATCH_SIZE) {
        const batch = writeBatch(db);
        const docsToDelete = snapshot.docs.slice(i, i + BATCH_SIZE);
        
        docsToDelete.forEach((docSnapshot) => {
            const docRef = doc(db, PRODUCTS_COLLECTION, docSnapshot.id);
            batch.delete(docRef);
        });

        batches.push(batch.commit());
    }

    await Promise.all(batches);
    console.log(`[Firestore] Successfully deleted ${snapshot.docs.length} products`);
}
