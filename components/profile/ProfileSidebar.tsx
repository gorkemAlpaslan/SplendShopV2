'use client';

import { User as UserIcon, Package, MapPin, Settings, LogOut, LayoutDashboard, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

import { User } from '@/types';

interface ProfileSidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    onLogout: () => void;
    user: User | null; 
}

const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'favorites', label: 'Saved Items', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
];

export default function ProfileSidebar({ activeTab, onTabChange, onLogout, user }: ProfileSidebarProps) {
    return (
        <div className="bg-card border border-border rounded-xl p-6 h-full min-h-[500px] flex flex-col">
            {/* User Profile Summary */}
            <div className="flex flex-col items-center text-center mb-8 pb-8 border-b border-border">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary text-2xl font-serif font-bold">
                    {user?.displayName?.[0]?.toUpperCase() || <UserIcon size={32} />}
                </div>
                <h2 className="font-serif font-bold text-lg">{user?.displayName || 'User'}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative group ${
                                isActive 
                                    ? 'text-primary-foreground bg-primary shadow-lg shadow-primary/20' 
                                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                            }`}
                        >
                            <Icon size={18} />
                            <span className="font-medium">{item.label}</span>
                            
                            {isActive && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute left-0 w-1 h-1/2 bg-white/20 rounded-r-full"
                                />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Logout */}
            <button
                onClick={onLogout}
                className="mt-8 flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors w-full"
            >
                <LogOut size={18} />
                <span className="font-medium">Sign Out</span>
            </button>
        </div>
    );
}
