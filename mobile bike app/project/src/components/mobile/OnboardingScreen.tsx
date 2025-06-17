import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, Calendar, Bell, Check } from 'lucide-react';
import { onboardingSlides } from '../../data/mockData';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [locationPermission, setLocationPermission] = useState<'pending' | 'granted' | 'denied'>('pending');

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      requestLocationPermission();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const requestLocationPermission = async () => {
    try {
      const permission = await navigator.geolocation.getCurrentPosition(
        () => setLocationPermission('granted'),
        () => setLocationPermission('denied')
      );
    } catch (error) {
      setLocationPermission('denied');
    }
    
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin': return <MapPin className="h-16 w-16" />;
      case 'Calendar': return <Calendar className="h-16 w-16" />;
      case 'Bell': return <Bell className="h-16 w-16" />;
      default: return <MapPin className="h-16 w-16" />;
    }
  };

  if (locationPermission !== 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center text-white"
        >
          <div className="bg-white/20 rounded-full p-6 mb-6 mx-auto w-fit">
            <Check className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            {locationPermission === 'granted' ? 'Location Access Granted!' : 'No Problem!'}
          </h2>
          <p className="text-emerald-100">
            {locationPermission === 'granted' 
              ? 'We can now show you nearby bike shops'
              : 'You can still search for shops manually'
            }
          </p>
        </motion.div>
      </div>
    );
  }

  const slide = onboardingSlides[currentSlide];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${slide.color} flex flex-col`}>
      {/* Skip Button */}
      <div className="flex justify-end p-6 pt-12">
        <button
          onClick={handleSkip}
          className="text-white/80 hover:text-white transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="max-w-sm mx-auto"
          >
            <div className="bg-white/20 rounded-full p-8 mb-8 mx-auto w-fit">
              {getIcon(slide.icon)}
            </div>
            
            <h1 className="text-3xl font-bold mb-6">{slide.title}</h1>
            <p className="text-lg text-white/90 leading-relaxed mb-12">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Section */}
      <div className="p-6 pb-12">
        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2 mb-8">
          {onboardingSlides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="w-full bg-white text-gray-900 py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 shadow-lg"
        >
          <span>
            {currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
          </span>
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default OnboardingScreen;