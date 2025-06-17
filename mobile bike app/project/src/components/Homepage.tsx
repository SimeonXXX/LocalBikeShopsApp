import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, Phone, Clock, ChevronRight } from 'lucide-react';
import { BikeShop } from '../types';
import { mockShops } from '../data/mockData';

interface HomepageProps {
  onSelectShop: (shopId: string) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onSelectShop }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState('Current Location');

  const filteredShops = useMemo(() => {
    return mockShops.filter(shop =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Perfect Bike Shop
            </h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Discover trusted local bike shops and book professional services for your ride
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search shops, services, or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Nearby Bike Shops ({filteredShops.length})
          </h3>
          <select className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
            <option>Sort by Distance</option>
            <option>Sort by Rating</option>
            <option>Sort by Name</option>
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => onSelectShop(shop.id)}
            >
              <div className="relative">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg shadow-sm">
                  <span className="text-sm font-medium text-emerald-600">
                    {shop.distance} mi
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {shop.name}
                  </h4>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                </div>
                
                <StarRating rating={shop.rating} />
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{shop.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">{shop.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{shop.openingHours}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-3">Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {shop.services.slice(0, 3).map((service) => (
                      <span
                        key={service}
                        className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-xs font-medium"
                      >
                        {service}
                      </span>
                    ))}
                    {shop.services.length > 3 && (
                      <span className="text-emerald-600 text-xs font-medium">
                        +{shop.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredShops.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No shops found</h3>
            <p className="text-gray-500">Try adjusting your search terms or location</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;