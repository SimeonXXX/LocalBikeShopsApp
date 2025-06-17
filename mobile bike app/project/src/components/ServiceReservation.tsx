import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, FileText, CheckCircle } from 'lucide-react';
import { BikeShop } from '../types';
import { mockShops, serviceTypes } from '../data/mockData';

interface ServiceReservationProps {
  shopId: string;
  onBack: () => void;
  onComplete: () => void;
}

const ServiceReservation: React.FC<ServiceReservationProps> = ({ shopId, onBack, onComplete }) => {
  const shop = mockShops.find(s => s.id === shopId);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    serviceType: '',
    date: '',
    time: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitted(true);
      // In a real app, this would make an API call
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Generate time slots
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(time);
    }
  }

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md mx-4">
          <div className="bg-emerald-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your service appointment has been successfully booked with {shop.name}. 
            You'll receive a confirmation email shortly.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Appointment Details:</h3>
            <p className="text-sm text-gray-600">Service: {formData.serviceType}</p>
            <p className="text-sm text-gray-600">Date: {new Date(formData.date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Time: {formData.time}</p>
            <p className="text-sm text-gray-600">Shop: {shop.name}</p>
          </div>
          <button
            onClick={onComplete}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to shop
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Shop Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Book Service</h1>
              <div className="flex items-center space-x-4">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{shop.name}</h2>
                  <p className="text-gray-600">{shop.address}</p>
                  <p className="text-sm text-gray-500">{shop.phone}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Services</h3>
              <div className="space-y-3">
                {serviceTypes.map((service) => (
                  <div key={service.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600">{service.duration} minutes</p>
                    </div>
                    <span className="text-lg font-semibold text-emerald-600">${service.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Reservation Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Contact Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.customerName ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.customerName && (
                      <p className="text-red-600 text-sm mt-1">{errors.customerName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.email ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.phone ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Service Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Type *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => handleInputChange('serviceType', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.serviceType ? 'border-red-300' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map((service) => (
                        <option key={service.id} value={service.name}>
                          {service.name} - ${service.price} ({service.duration} min)
                        </option>
                      ))}
                    </select>
                    {errors.serviceType && (
                      <p className="text-red-600 text-sm mt-1">{errors.serviceType}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Date *
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        min={minDate}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                          errors.date ? 'border-red-300' : 'border-gray-200'
                        }`}
                      />
                      {errors.date && (
                        <p className="text-red-600 text-sm mt-1">{errors.date}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="h-4 w-4 inline mr-1" />
                        Time *
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                          errors.time ? 'border-red-300' : 'border-gray-200'
                        }`}
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                      {errors.time && (
                        <p className="text-red-600 text-sm mt-1">{errors.time}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileText className="h-4 w-4 inline mr-1" />
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Any specific issues or requests for your bike service..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Confirm Reservation</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceReservation;