/**
 * One-time migration script to upload products to Firestore
 * Run this with: npx ts-node scripts/uploadProducts.ts
 */

import { uploadProducts } from '../lib/firestore/products';
import { FIRESTORE_PRODUCTS } from '../lib/productData';

async function main() {
    try {
        console.log('Starting product upload to Firestore...');
        console.log(`Found ${FIRESTORE_PRODUCTS.length} products to upload`);

        await uploadProducts(FIRESTORE_PRODUCTS);

        console.log('✅ All products uploaded successfully!');
        console.log('You can now fetch products from Firestore instead of using constants.ts');
    } catch (error) {
        console.error('❌ Error uploading products:', error);
        process.exit(1);
    }
}

main();
