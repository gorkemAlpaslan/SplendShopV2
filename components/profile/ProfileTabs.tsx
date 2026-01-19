'use client';

import { motion } from 'framer-motion';
import { User, Heart, Package } from 'lucide-react';

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'orders', label: 'Orders', icon: Package },
  ];

  return (
    <div className="flex gap-2 border-b border-gray-200 mb-6">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative px-6 py-3 font-medium transition-colors ${
              isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon size={20} />
              <span>{tab.label}</span>
            </div>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
