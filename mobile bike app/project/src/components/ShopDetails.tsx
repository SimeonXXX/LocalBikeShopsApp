import React from 'react';
import { ArrowLeft, MapPin, Phone, Clock, Star, Calendar, User, Wrench } from 'lucide-react';
import { BikeShop } from '../types';
import { mockShops } from '../data/mockData';

interface ShopDetailsProps {
  shopId: string;
  onBack: () => void;
  onBookService: (shopId: string) => void;
}

const ShopDetails: React.FC<ShopDetailsProps> = ({ shopId, onBack, onBookService }) => {
  const shop = mockShops.find(s => s.id === shopId);

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop not found</h2>
          <button
            onClick={onBack}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-lg text-gray-600 ml-2">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to shops
          </button>
        </div>
      </div>

      {/* Shop Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Images and Basic Info */}
          <div>
            <div className="relative mb-6">
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-lg shadow-sm">
                <span className="text-lg font-semibold text-emerald-600">
                  {shop.distance} mi away
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{shop.name}</h1>
              <StarRating rating={shop.rating} />
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">Address</p>
                    <p className="text-gray-600">{shop.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">Phone</p>
                    <a 
                      href={`tel:${shop.phone}`}
                      className="text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      {shop.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">Hours</p>
                    <p className="text-gray-600">{shop.openingHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Services and Booking */}
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{shop.description}</p>
            </div>

            {/* Services */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Wrench className="h-5 w-5 mr-2" />
                Services Offered
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {shop.services.map((service) => (
                  <div
                    key={service}
                    className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg"
                  >
                    <span className="text-emerald-800 font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Card */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-xl shadow-lg text-white">
              <h2 className="text-2xl font-bold mb-2">Ready to Book?</h2>
              <p className="text-emerald-100 mb-6">
                Schedule your bike service with our expert mechanics
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-emerald-100">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    Expert Staff
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Same Day Service
                  </div>
                </div>
                
                <button
                  onClick={() => onBookService(shop.id)}
                  className="bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Book Service
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-emerald-600">{shop.rating}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-emerald-600">{shop.services.length}</div>
                <div className="text-sm text-gray-600">Services</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-emerald-600">{shop.distance}</div>
                <div className="text-sm text-gray-600">Miles</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;