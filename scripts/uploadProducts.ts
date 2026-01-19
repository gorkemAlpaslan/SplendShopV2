/**
 * One-time migration script to upload products to Firestore
 * Run this with: npx ts-node scripts/uploadProducts.ts
 */

import { uploadProducts } from '../lib/firestore/products';
import { PRODUCTS } from '../lib/constants';

async function main() {
    try {
        console.log('Starting product upload to Firestore...');
        console.log(`Found ${PRODUCTS.length} products to upload`);

        await uploadProducts(PRODUCTS);

        console.log('✅ All products uploaded successfully!');
        console.log('You can now fetch products from Firestore instead of using constants.ts');
    } catch (error) {
        console.error('❌ Error uploading products:', error);
        process.exit(1);
    }
}

main();
