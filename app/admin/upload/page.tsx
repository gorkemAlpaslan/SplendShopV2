'use client';

import { useState } from 'react';
import { uploadProducts, deleteAllProducts } from '@/lib/firestore/products';
import { FIRESTORE_PRODUCTS } from '@/lib/productData';
import Button from '@/components/ui/Button';
import { Loader2, Check, AlertCircle, Trash2 } from 'lucide-react';

export default function AdminUploadPage() {
    const [status, setStatus] = useState<'idle' | 'clearing' | 'uploading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleClearAndUpload = async () => {
        try {
            // Step 1: Clear database
            setStatus('clearing');
            setMessage('Clearing all products from Firestore...');
            console.log('[Upload] Clearing all products from Firestore...');
            await deleteAllProducts();

            // Step 2: Upload new products
            setStatus('uploading');
            setMessage('Uploading products to Firestore...');
            console.log('[Upload] Starting upload of', FIRESTORE_PRODUCTS.length, 'products');
            await uploadProducts(FIRESTORE_PRODUCTS);

            setStatus('success');
            setMessage(`Successfully cleared database and uploaded ${FIRESTORE_PRODUCTS.length} products to Firestore!`);
        } catch (error) {
            setStatus('error');
            setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            console.error('Upload error:', error);
        }
    };

    const handleUpload = async () => {
        try {
            setStatus('uploading');
            setMessage('Uploading products to Firestore...');

            console.log('[Upload] Starting upload of', FIRESTORE_PRODUCTS.length, 'products');
            await uploadProducts(FIRESTORE_PRODUCTS);

            setStatus('success');
            setMessage(`Successfully uploaded ${FIRESTORE_PRODUCTS.length} products to Firestore!`);
        } catch (error) {
            setStatus('error');
            setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            console.error('Upload error:', error);
        }
    };

    const handleClearOnly = async () => {
        try {
            setStatus('clearing');
            setMessage('Clearing all products from Firestore...');
            console.log('[Upload] Clearing all products from Firestore...');
            await deleteAllProducts();

            setStatus('success');
            setMessage('Successfully cleared all products from Firestore!');
        } catch (error) {
            setStatus('error');
            setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            console.error('Clear error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="max-w-2xl w-full bg-card rounded-2xl border border-border shadow-xl p-8">
                <h1 className="text-3xl font-serif font-bold mb-2">Product Upload</h1>
                <p className="text-muted-foreground mb-8">
                    Upload {FIRESTORE_PRODUCTS.length} products from productData.ts to Firestore database.
                </p>

                {status === 'idle' && (
                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                            <p className="text-sm text-muted-foreground mb-2">
                                This will upload {FIRESTORE_PRODUCTS.length} products from productData.ts to Firestore database. Make sure:
                            </p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                <li>Firebase project is properly configured</li>
                                <li>Firestore database is enabled in Firebase Console</li>
                                <li>You have write permissions</li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <Button onClick={handleClearAndUpload} size="lg" className="w-full" variant="primary">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Clear Database & Upload Products
                            </Button>
                            <div className="flex gap-3">
                                <Button onClick={handleClearOnly} size="lg" variant="primary" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Clear Only
                                </Button>
                                <Button onClick={handleUpload} size="lg" variant="outline" className="flex-1">
                                    Upload Only
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {(status === 'clearing' || status === 'uploading') && (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
                        <span className="text-lg">{message}</span>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-4">
                        <div className="flex items-center p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                            <Check className="w-6 h-6 text-green-600 mr-3" />
                            <div>
                                <p className="font-semibold text-green-900 dark:text-green-100">{message}</p>
                                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                    You can now enable Firestore in <code className="px-1 py-0.5 rounded bg-green-100 dark:bg-green-900">hooks/useProducts.ts</code> by setting <code className="px-1 py-0.5 rounded bg-green-100 dark:bg-green-900">USE_FIRESTORE = true</code>
                                </p>
                            </div>
                        </div>
                        <Button onClick={() => window.location.reload()} variant="outline" size="lg" className="w-full">
                            Upload Again
                        </Button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-4">
                        <div className="flex items-center p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                            <div>
                                <p className="font-semibold text-red-900 dark:text-red-100">Upload Failed</p>
                                <p className="text-sm text-red-700 dark:text-red-300 mt-1">{message}</p>
                            </div>
                        </div>
                        <Button onClick={() => setStatus('idle')} variant="outline" size="lg" className="w-full">
                            Try Again
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
