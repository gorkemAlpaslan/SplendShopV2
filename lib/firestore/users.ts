import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';
import { db } from '../firebase';
import { User, Address } from '@/types';

const USERS_COLLECTION = 'users';

/**
 * Create or update a user document in Firestore
 */
export async function syncUser(user: User) {
    const userRef = doc(db, USERS_COLLECTION, user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: new Date().toISOString(),
            addresses: [],
            favorites: []
        });
    }
}

/**
 * Get user profile including addresses
 */
export async function getUserProfile(uid: string) {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
        return snapshot.data() as User & { addresses: Address[] };
    }
    return null;
}

/**
 * Add an address to the user's profile
 */
export async function addUserAddress(uid: string, address: Omit<Address, 'id'>) {
    const userRef = doc(db, USERS_COLLECTION, uid);
    
    // Create a new address object with a unique ID (using timestamp)
    const newAddress: Address = {
        id: Date.now(),
        ...address
    };

    await updateDoc(userRef, {
        addresses: arrayUnion(newAddress)
    });

    return newAddress;
}

/**
 * Remove an address from the user's profile
 */
export async function removeUserAddress(uid: string, address: Address) {
    const userRef = doc(db, USERS_COLLECTION, uid);
    
    await updateDoc(userRef, {
        addresses: arrayRemove(address)
    });
}

/**
 * Add a product to user's favorites
 */
export async function addUserFavorite(uid: string, productId: string) {
    const userRef = doc(db, USERS_COLLECTION, uid);
    
    // Ensure user document exists
    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) {
        // User document doesn't exist, create it with favorites array
        await setDoc(userRef, {
            favorites: [productId]
        }, { merge: true });
    } else {
        // Add to existing favorites array
        await updateDoc(userRef, {
            favorites: arrayUnion(productId)
        });
    }
}

/**
 * Remove a product from user's favorites
 */
export async function removeUserFavorite(uid: string, productId: string) {
    const userRef = doc(db, USERS_COLLECTION, uid);
    
    await updateDoc(userRef, {
        favorites: arrayRemove(productId)
    });
}

/**
 * Get user's favorite product IDs
 */
export async function getUserFavorites(uid: string): Promise<string[]> {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const snapshot = await getDoc(userRef);
    
    if (snapshot.exists()) {
        const data = snapshot.data();
        return data.favorites || [];
    }
    return [];
}