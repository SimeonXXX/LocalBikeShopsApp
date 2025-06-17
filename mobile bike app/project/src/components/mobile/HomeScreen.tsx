import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Clock, Filter, Map, List, ChevronRight } from 'lucide-react';
import { BikeShop } from '../../types';
import { mockShops } from '../../data/mockData';

interface HomeScreenProps {
  onShopSelect: (shopId: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onShopSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filter, setFilter] = useState<'all' | 'open' | 'nearby' | 'top-rated'>('all');

  const filteredShops = mockShops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    
    switch (filter) {
      case 'open': return matchesSearch && shop.isOpen;
      case 'nearby': return matchesSearch && shop.distance <= 2;
      case 'top-rated': return matchesSearch && shop.rating >= 4.7;
      default: return matchesSearch;
    }
  });

  const StarRating: React.FC<{ rating: number; size?: 'sm' | 'md' }> = ({ rating, size = 'sm' }) => {
    const starSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
    
    return (
      <div className="flex items-center space-x-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className={`ml-1 ${size === 'sm' ? 'text-xs' : 'text-sm'} text-gray-600`}>
          {rating}
        </span>
      </div>
    );
  };

  const ShopCard: React.FC<{ shop: BikeShop; index: number }> = ({ shop, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onShopSelect(shop.id)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4 active:shadow-md transition-all"
    >
      <div className="relative">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <span className="text-sm font-medium text-emerald-600">
            {shop.distance} mi
          </span>
        </div>
        <div className="absolute top-3 left-3">
          {shop.isOpen ? (
            <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Open
            </span>
          ) : (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Closed
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-1">{shop.name}</h3>
          <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
        </div>
        
        <StarRating rating={shop.rating} />
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{shop.address}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{shop.openingHours}</span>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {shop.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {shop.tags.length > 2 && (
            <span className="text-emerald-600 text-xs font-medium">
              +{shop.tags.length - 2}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Find Bike Shops</h1>
          <p className="text-gray-600">Discover trusted shops near you</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search shops or services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-4">
          {[
            { id: 'all', label: 'All' },
            { id: 'open', label: 'Open Now' },
            { id: 'nearby', label: 'Nearby' },
            { id: 'top-rated', label: 'Top Rated' }
          ].map((filterOption) => (
            <motion.button
              key={filterOption.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterOption.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === filterOption.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {filterOption.label}
            </motion.button>
          ))}
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {filteredShops.length} shops found
          </span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <List className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'map' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <Map className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 pb-20">
        {viewMode === 'list' ? (
          <div>
            {filteredShops.map((shop, index) => (
              <ShopCard key={shop.id} shop={shop} index={index} />
            ))}
            
            {filteredShops.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No shops found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <Map className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Map View</h3>
              <p className="text-gray-500">Interactive map coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;