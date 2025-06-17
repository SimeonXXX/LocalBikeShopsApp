import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OnboardingScreen from './components/mobile/OnboardingScreen';
import BottomNavigation from './components/mobile/BottomNavigation';
import HomeScreen from './components/mobile/HomeScreen';
import ShopDetailScreen from './components/mobile/ShopDetailScreen';
import BookingScreen from './components/mobile/BookingScreen';
import BookingsScreen from './components/mobile/BookingsScreen';
import ProfileScreen from './components/mobile/ProfileScreen';

type Screen = 'onboarding' | 'home' | 'search' | 'bookings' | 'profile' | 'shop-detail' | 'booking';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedShopId, setSelectedShopId] = useState<string>('');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const completed = localStorage.getItem('onboarding-completed');
    if (completed) {
      setHasCompletedOnboarding(true);
      setCurrentScreen('home');
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding-completed', 'true');
    setHasCompletedOnboarding(true);
    setCurrentScreen('home');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'search':
        setCurrentScreen('search');
        break;
      case 'bookings':
        setCurrentScreen('bookings');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
    }
  };

  const handleShopSelect = (shopId: string) => {
    setSelectedShopId(shopId);
    setCurrentScreen('shop-detail');
  };

  const handleBookService = (shopId: string) => {
    setSelectedShopId(shopId);
    setCurrentScreen('booking');
  };

  const handleBack = () => {
    if (currentScreen === 'shop-detail') {
      setCurrentScreen('home');
      setActiveTab('home');
    } else if (currentScreen === 'booking') {
      setCurrentScreen('shop-detail');
    }
  };

  const handleBookingComplete = () => {
    setCurrentScreen('bookings');
    setActiveTab('bookings');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case 'home':
      case 'search':
        return <HomeScreen onShopSelect={handleShopSelect} />;
      case 'bookings':
        return <BookingsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'shop-detail':
        return (
          <ShopDetailScreen
            shopId={selectedShopId}
            onBack={handleBack}
            onBookService={handleBookService}
          />
        );
      case 'booking':
        return (
          <BookingScreen
            shopId={selectedShopId}
            onBack={handleBack}
            onComplete={handleBookingComplete}
          />
        );
      default:
        return <HomeScreen onShopSelect={handleShopSelect} />;
    }
  };

  const showBottomNav = hasCompletedOnboarding && 
    !['onboarding', 'shop-detail', 'booking'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      
      {showBottomNav && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
}

export default App;