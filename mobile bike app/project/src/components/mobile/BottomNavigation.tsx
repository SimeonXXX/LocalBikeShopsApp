import React from 'react';
import { motion } from 'framer-motion';
import { Home, Search, Calendar, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-bottom">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-colors ${
                isActive ? 'text-emerald-600' : 'text-gray-500'
              }`}
            >
              <div className="relative">
                <Icon className={`h-6 w-6 ${isActive ? 'text-emerald-600' : 'text-gray-500'}`} />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full"
                  />
                )}
              </div>
              <span className={`text-xs mt-1 ${isActive ? 'text-emerald-600 font-medium' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;