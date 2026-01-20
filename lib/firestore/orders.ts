import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    getDocs,
    Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { Order } from '@/types';

const ORDERS_COLLECTION = 'orders';

/**
 * Create a new order in Firestore
 */
export async function createOrder(order: Omit<Order, 'id'> & { userId: string }) {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    
    const docRef = await addDoc(ordersRef, {
        ...order,
        createdAt: Timestamp.now(), // Use server timestamp for sorting
        date: new Date().toISOString() // Keep string date for UI
    });

    return docRef.id;
}

/**
 * Get orders for a specific user
 */
export async function getUserOrders(userId: string): Promise<Order[]> {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    const q = query(
        ordersRef, 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Order));
}
