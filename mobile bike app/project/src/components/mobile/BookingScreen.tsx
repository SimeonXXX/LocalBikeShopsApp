import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, FileText, CheckCircle, X } from 'lucide-react';
import { BikeShop } from '../../types';
import { mockShops, serviceTypes } from '../../data/mockData';

interface BookingScreenProps {
  shopId: string;
  onBack: () => void;
  onComplete: () => void;
}

const BookingScreen: React.FC<BookingScreenProps> = ({ shopId, onBack, onComplete }) => {
  const shop = mockShops.find(s => s.id === shopId);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    serviceType: '',
    date: '',
    time: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Shop not found</h2>
          <button onClick={onBack} className="bg-emerald-600 text-white px-6 py-3 rounded-xl">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    } else if (step === 2) {
      if (!formData.serviceType) newErrors.serviceType = 'Please select a service';
    } else if (step === 3) {
      if (!formData.date) newErrors.date = 'Please select a date';
      if (!formData.time) newErrors.time = 'Please select a time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-sm mx-auto"
        >
          <div className="bg-emerald-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your appointment with {shop.name} has been successfully booked.
          </p>
          <div className="bg-gray-50 p-4 rounded-2xl mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Appointment Details:</h3>
            <p className="text-sm text-gray-600">Service: {formData.serviceType}</p>
            <p className="text-sm text-gray-600">Date: {new Date(formData.date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Time: {formData.time}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-semibold"
          >
            Done
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-2 rounded-xl bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </motion.button>
          <h1 className="text-lg font-semibold text-gray-900">Book Service</h1>
          <div className="w-9" />
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center space-x-2 mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex-1">
              <div className={`h-2 rounded-full ${
                step <= currentStep ? 'bg-emerald-600' : 'bg-gray-200'
              }`} />
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Step {currentStep} of 3 - {
              currentStep === 1 ? 'Contact Info' :
              currentStep === 2 ? 'Select Service' : 'Choose Date & Time'
            }
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {/* Shop Info */}
          <div className="flex items-center space-x-3 mb-6 p-4 bg-gray-50 rounded-xl">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div>
              <h2 className="font-semibold text-gray-900">{shop.name}</h2>
              <p className="text-sm text-gray-600">{shop.address}</p>
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
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
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
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
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
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
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                      errors.phone ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Service
                </h3>
                
                <div className="space-y-3">
                  {serviceTypes.map((service) => (
                    <motion.div
                      key={service.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleInputChange('serviceType', service.name)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.serviceType === service.name
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{service.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{service.duration} minutes</p>
                        </div>
                        <div className="text-right ml-4">
                          <span className="text-lg font-semibold text-emerald-600">${service.price}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {errors.serviceType && (
                  <p className="text-red-600 text-sm">{errors.serviceType}</p>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Choose Date & Time
                </h3>
                
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
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
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
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.slice(0, 12).map((time) => (
                      <motion.button
                        key={time}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleInputChange('time', time)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all ${
                          formData.time === time
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                  {errors.time && (
                    <p className="text-red-600 text-sm mt-1">{errors.time}</p>
                  )}
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Any specific issues or requests..."
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="bg-white border-t border-gray-200 p-4 safe-area-bottom">
        <div className="flex space-x-3">
          {currentStep > 1 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-semibold"
            >
              Back
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-semibold"
          >
            {currentStep === 3 ? 'Confirm Booking' : 'Next'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default BookingScreen;