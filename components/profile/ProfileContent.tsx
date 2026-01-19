'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileTabs from '@/components/profile/ProfileTabs';
import ProfileSettings from '@/components/profile/ProfileSettings';
import FavoritesList from '@/components/profile/FavoritesList';
import OrdersList from '@/components/profile/OrdersList';
import { useAuth } from '@/context/AuthContext';

export default function ProfileContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, loading } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && ['profile', 'favorites', 'orders'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/signup');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <div>
                    <h1 className="text-3xl font-serif font-bold mb-2">My Account</h1>
                    <p className="text-muted-foreground">Manage your profile, favorites, and orders</p>
                </div>

                <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

                <AnimatePresence mode="wait">
                    {activeTab === 'profile' && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <ProfileSettings />
                        </motion.div>
                    )}
                    {activeTab === 'favorites' && (
                        <motion.div
                            key="favorites"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <FavoritesList />
                        </motion.div>
                    )}
                    {activeTab === 'orders' && (
                        <motion.div
                            key="orders"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <OrdersList />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
