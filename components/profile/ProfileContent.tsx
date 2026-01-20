'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getUserOrders } from '@/lib/firestore/orders';
import { getUserProfile } from '@/lib/firestore/users';
import { Order, Address } from '@/types';
import ProfileSidebar from './ProfileSidebar';
import OrderList from './OrderList';
import SavedItems from './SavedItems';
import AddressForm from '@/components/checkout/AddressForm';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function ProfileContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, logoutUser, loading: authLoading } = useAuth();
    
    // Tab state
    const [activeTab, setActiveTab] = useState('overview');

    // Data state
    const [orders, setOrders] = useState<Order[]>([]);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    // Initial load handling
    useEffect(() => {
        // Sync tab with URL
        const tab = searchParams.get('tab');
        if (tab && ['overview', 'orders', 'favorites', 'addresses', 'settings'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    // Data fetching
    useEffect(() => {
        async function loadProfileData() {
            if (!user) return;
            
            setLoadingData(true);
            try {
                // Fetch orders and profile concurrently
                const [ordersData, profileData] = await Promise.all([
                    getUserOrders(user.uid),
                    getUserProfile(user.uid)
                ]);

                setOrders(ordersData);
                if (profileData && profileData.addresses) {
                    setAddresses(profileData.addresses);
                }
            } catch (error) {
                console.error("Error loading profile data:", error);
            } finally {
                setLoadingData(false);
            }
        }

        if (user) {
            loadProfileData();
        }
    }, [user]);

    // Redirect if not logged in
    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/');
        }
    }, [authLoading, user, router]);

    const handleLogout = async () => {
        try {
            await logoutUser();
            router.push('/');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="container-width py-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">My Account</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <ProfileSidebar 
                        activeTab={activeTab} 
                        onTabChange={(tab) => {
                            setActiveTab(tab);
                            router.push(`/profile?tab=${tab}`, { scroll: false });
                        }}
                        onLogout={handleLogout}
                        user={user}
                    />
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* OVERVIEW TAB */}
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-card p-6 rounded-xl border border-border">
                                            <h3 className="text-muted-foreground mb-2 text-sm uppercase tracking-wider">Total Orders</h3>
                                            <p className="text-3xl font-serif font-bold">{orders.length}</p>
                                        </div>
                                        <div className="bg-card p-6 rounded-xl border border-border">
                                            <h3 className="text-muted-foreground mb-2 text-sm uppercase tracking-wider">Saved Addresses</h3>
                                            <p className="text-3xl font-serif font-bold">{addresses.length}</p>
                                        </div>
                                        <div className="bg-card p-6 rounded-xl border border-border">
                                            <h3 className="text-muted-foreground mb-2 text-sm uppercase tracking-wider">Member Since</h3>
                                            <p className="text-3xl font-serif font-bold">2024</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-xl font-serif font-bold">Recent Orders</h2>
                                            <button 
                                                onClick={() => setActiveTab('orders')}
                                                className="text-primary hover:underline text-sm font-medium"
                                            >
                                                View All
                                            </button>
                                        </div>
                                        <OrderList orders={orders.slice(0, 3)} loading={loadingData} />
                                    </div>
                                </div>
                            )}

                            {/* ORDERS TAB */}
                            {activeTab === 'orders' && (
                                <div>
                                    <h2 className="text-2xl font-serif font-bold mb-6">Order History</h2>
                                    <OrderList orders={orders} loading={loadingData} />
                                </div>
                            )}

                            {/* SAVED ITEMS TAB */}
                            {activeTab === 'favorites' && (
                                <div>
                                    <h2 className="text-2xl font-serif font-bold mb-6">Saved Items</h2>
                                    <SavedItems />
                                </div>
                            )}

                            {/* ADDRESSES TAB */}
                            {activeTab === 'addresses' && (
                                <div>
                                    <h2 className="text-2xl font-serif font-bold mb-6">Saved Addresses</h2>
                                    <div className="bg-card p-6 rounded-xl border border-border">
                                        <AddressForm 
                                            selectedAddressId={null} 
                                            onSelectAddress={() => {}} 
                                        />
                                    </div>
                                </div>
                            )}

                            {/* SETTINGS TAB */}
                            {activeTab === 'settings' && (
                                <div className="max-w-xl">
                                    <h2 className="text-2xl font-serif font-bold mb-6">Account Settings</h2>
                                    <div className="bg-card p-8 rounded-xl border border-border space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Email Address</label>
                                            <input 
                                                type="email" 
                                                value={user.email || ''} 
                                                disabled 
                                                className="w-full px-4 py-2 rounded-lg border border-border bg-secondary/50 text-muted-foreground cursor-not-allowed"
                                            />
                                            <p className="text-xs text-muted-foreground mt-2">
                                                To change your email, please contact support.
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Display Name</label>
                                            <input 
                                                type="text" 
                                                value={user.displayName || ''} 
                                                disabled 
                                                className="w-full px-4 py-2 rounded-lg border border-border bg-secondary/50 text-muted-foreground cursor-not-allowed"
                                            />
                                        </div>
                                        
                                        <div className="pt-4 border-t border-border">
                                            <Button variant="outline" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900">
                                                Sign Out
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
