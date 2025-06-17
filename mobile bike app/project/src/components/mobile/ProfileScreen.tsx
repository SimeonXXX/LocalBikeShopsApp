import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Bike, Settings, Bell, HelpCircle, LogOut, ChevronRight, Edit } from 'lucide-react';

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState({
    name: 'John Smith',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    bikeModel: 'Trek Domane SL 7',
    memberSince: '2023'
  });

  const [isEditing, setIsEditing] = useState(false);

  const menuItems = [
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: HelpCircle, label: 'Help & Support', action: () => {} },
    { icon: Settings, label: 'Settings', action: () => {} },
    { icon: LogOut, label: 'Sign Out', action: () => {}, danger: true },
  ];

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-xl bg-emerald-100 text-emerald-600"
          >
            <Edit className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 pb-20">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="text-center mb-6">
            <div className="bg-emerald-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <User className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">Member since {user.memberSince}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <Mail className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <Phone className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">{user.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <Bike className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Bike Model</p>
                <p className="font-medium text-gray-900">{user.bikeModel}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <div className="text-2xl font-bold text-emerald-600">12</div>
            <div className="text-sm text-gray-600">Services</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <div className="text-2xl font-bold text-emerald-600">3</div>
            <div className="text-sm text-gray-600">Shops</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <div className="text-2xl font-bold text-emerald-600">4.9</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={index}
                whileTap={{ scale: 0.98 }}
                onClick={item.action}
                className={`w-full flex items-center justify-between p-4 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                } ${item.danger ? 'hover:bg-red-50' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${item.danger ? 'text-red-500' : 'text-gray-400'}`} />
                  <span className={`font-medium ${item.danger ? 'text-red-600' : 'text-gray-900'}`}>
                    {item.label}
                  </span>
                </div>
                <ChevronRight className={`h-5 w-5 ${item.danger ? 'text-red-400' : 'text-gray-400'}`} />
              </motion.button>
            );
          })}
        </div>
        
        {/* App Info */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">CycleMate v1.0.0</p>
          <p className="text-xs mt-1">Made with ❤️ for cyclists</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;