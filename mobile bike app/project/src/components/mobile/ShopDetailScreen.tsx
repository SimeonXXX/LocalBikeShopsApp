import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, Clock, Star, Calendar, Share, Heart, ChevronRight } from 'lucide-react';
import { BikeShop } from '../../types';
import { mockShops, serviceTypes } from '../../data/mockData';

interface ShopDetailScreenProps {
  shopId: string;
  onBack: () => void;
  onBookService: (shopId: string) => void;
}

const ShopDetailScreen: React.FC<ShopDetailScreenProps> = ({ shopId, onBack, onBookService }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const shop = mockShops.find(s => s.id === shopId);

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Shop not found</h2>
          <button
            onClick={onBack}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-64 object-cover"
        />
        
        {/* Header Controls */}
        <div className="absolute top-12 left-4 right-4 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-sm"
          >
            <ArrowLeft className="h-5 w-5 text-gray-900" />
          </motion.button>
          
          <div className="flex space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-sm"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-900'}`} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-sm"
            >
              <Share className="h-5 w-5 text-gray-900" />
            </motion.button>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="absolute bottom-4 left-4">
          {shop.isOpen ? (
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Open Now
            </span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Closed
            </span>
          )}
        </div>
        
        {/* Distance Badge */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-emerald-600">
            {shop.distance} mi away
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 min-h-screen">
        <div className="p-6">
          {/* Shop Info */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{shop.name}</h1>
            <StarRating rating={shop.rating} />
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-3" />
                <span>{shop.address}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-3" />
                <span>{shop.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-3" />
                <span>{shop.openingHours}</span>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">{shop.description}</p>
          </div>
          
          {/* Tags */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {shop.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Services */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Services</h2>
            <div className="space-y-3">
              {serviceTypes.slice(0, 4).map((service) => (
                <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{service.duration} minutes</p>
                  </div>
                  <div className="text-right ml-4">
                    <span className="text-lg font-semibold text-emerald-600">${service.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-emerald-600">{shop.rating}</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-emerald-600">{shop.services.length}</div>
              <div className="text-sm text-gray-600">Services</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-emerald-600">{shop.priceRange}</div>
              <div className="text-sm text-gray-600">Price Range</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-bottom">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onBookService(shop.id)}
          className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 shadow-lg"
        >
          <Calendar className="h-5 w-5" />
          <span>Book Service</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ShopDetailScreen;