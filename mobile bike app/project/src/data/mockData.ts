import { BikeShop, ServiceType, ServiceReservation, OnboardingSlide } from '../types';

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: "Find Local Bike Shops",
    description: "Discover trusted bicycle shops near you with ratings, reviews, and real-time availability",
    icon: "MapPin",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 2,
    title: "Book Services Instantly",
    description: "Schedule repairs, tune-ups, and maintenance with just a few taps",
    icon: "Calendar",
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: 3,
    title: "Track Your Appointments",
    description: "Manage your bookings, get reminders, and stay connected with your bike shop",
    icon: "Bell",
    color: "from-purple-500 to-pink-600"
  }
];

export const mockShops: BikeShop[] = [
  {
    id: '1',
    name: 'Velocity Cycles',
    address: '123 Main Street, Downtown',
    phone: '(555) 123-4567',
    rating: 4.8,
    distance: 0.5,
    openingHours: 'Mon-Fri: 9AM-7PM, Sat-Sun: 10AM-6PM',
    services: ['Tune-ups', 'Brake Service', 'Wheel Building', 'Custom Builds'],
    image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Premier bicycle shop specializing in high-performance road and mountain bikes. Expert mechanics with 20+ years of experience.',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    tags: ['Certified Mechanics', 'Same Day Service', 'Custom Builds'],
    isOpen: true,
    priceRange: '$$'
  },
  {
    id: '2',
    name: 'Urban Bike Co.',
    address: '456 Oak Avenue, Midtown',
    phone: '(555) 987-6543',
    rating: 4.6,
    distance: 1.2,
    openingHours: 'Mon-Sat: 8AM-8PM, Sun: 11AM-5PM',
    services: ['Basic Maintenance', 'Tire Repair', 'Chain Service', 'Accessories'],
    image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Your neighborhood bike shop focusing on commuter bikes and urban cycling solutions.',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    tags: ['Commuter Bikes', 'Quick Service', 'Accessories'],
    isOpen: true,
    priceRange: '$'
  },
  {
    id: '3',
    name: 'Mountain Peak Bikes',
    address: '789 Hill Road, North Side',
    phone: '(555) 456-7890',
    rating: 4.9,
    distance: 2.8,
    openingHours: 'Tue-Sun: 10AM-6PM, Closed Mondays',
    services: ['Suspension Service', 'Wheel Truing', 'Drivetrain Overhaul', 'Frame Repair'],
    image: 'https://images.pexels.com/photos/100588/pexels-photo-100588.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Mountain biking specialists with full-service repair shop and rental fleet.',
    coordinates: { lat: 40.7829, lng: -73.9654 },
    tags: ['Mountain Bikes', 'Suspension Experts', 'Rentals'],
    isOpen: false,
    priceRange: '$$$'
  },
  {
    id: '4',
    name: 'Pedal & Chain',
    address: '321 River Street, East District',
    phone: '(555) 234-5678',
    rating: 4.5,
    distance: 3.5,
    openingHours: 'Mon-Fri: 10AM-6PM, Sat: 9AM-7PM, Sun: 12PM-4PM',
    services: ['E-bike Service', 'Custom Fitting', 'Parts Installation', 'Safety Inspections'],
    image: 'https://images.pexels.com/photos/100591/pexels-photo-100591.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Full-service bike shop with expertise in electric bikes and professional fitting services.',
    coordinates: { lat: 40.7282, lng: -73.9942 },
    tags: ['E-bike Specialists', 'Custom Fitting', '24/7 Service'],
    isOpen: true,
    priceRange: '$$'
  },
  {
    id: '5',
    name: 'Cycle Hub',
    address: '654 Park Lane, West End',
    phone: '(555) 345-6789',
    rating: 4.7,
    distance: 1.8,
    openingHours: 'Mon-Sun: 7AM-9PM',
    services: ['Quick Repairs', 'Bike Wash', 'Tire Service', 'Emergency Fixes'],
    image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Fast and reliable bike services with extended hours for busy cyclists.',
    coordinates: { lat: 40.7505, lng: -73.9934 },
    tags: ['Extended Hours', 'Quick Service', 'Emergency Repairs'],
    isOpen: true,
    priceRange: '$'
  }
];

export const serviceTypes: ServiceType[] = [
  { 
    id: '1', 
    name: 'Basic Tune-Up', 
    duration: 60, 
    price: 75, 
    icon: 'Settings',
    description: 'Complete bike inspection and basic adjustments'
  },
  { 
    id: '2', 
    name: 'Comprehensive Tune-Up', 
    duration: 120, 
    price: 125, 
    icon: 'Wrench',
    description: 'Full service including cleaning, lubrication, and adjustments'
  },
  { 
    id: '3', 
    name: 'Brake Service', 
    duration: 45, 
    price: 50, 
    icon: 'Disc',
    description: 'Brake pad replacement and cable adjustments'
  },
  { 
    id: '4', 
    name: 'Wheel Truing', 
    duration: 30, 
    price: 35, 
    icon: 'Circle',
    description: 'Wheel alignment and spoke tension adjustment'
  },
  { 
    id: '5', 
    name: 'Chain & Drivetrain Service', 
    duration: 90, 
    price: 85, 
    icon: 'Link',
    description: 'Chain replacement and drivetrain cleaning'
  },
  { 
    id: '6', 
    name: 'Flat Tire Repair', 
    duration: 20, 
    price: 25, 
    icon: 'RotateCcw',
    description: 'Quick puncture repair and tube replacement'
  },
  { 
    id: '7', 
    name: 'Custom Bike Fitting', 
    duration: 180, 
    price: 200, 
    icon: 'Ruler',
    description: 'Professional bike fitting for optimal comfort'
  },
  { 
    id: '8', 
    name: 'E-bike Service', 
    duration: 90, 
    price: 100, 
    icon: 'Zap',
    description: 'Electric bike maintenance and battery check'
  }
];

export const mockReservations: ServiceReservation[] = [
  {
    id: '1',
    shopId: '1',
    shopName: 'Velocity Cycles',
    customerName: 'John Smith',
    email: 'john@example.com',
    phone: '(555) 111-2222',
    serviceType: 'Basic Tune-Up',
    date: '2024-01-15',
    time: '10:00',
    status: 'confirmed',
    createdAt: '2024-01-10T09:00:00Z'
  },
  {
    id: '2',
    shopId: '2',
    shopName: 'Urban Bike Co.',
    customerName: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '(555) 333-4444',
    serviceType: 'Brake Service',
    date: '2024-01-16',
    time: '14:30',
    status: 'pending',
    createdAt: '2024-01-12T14:00:00Z'
  },
  {
    id: '3',
    shopId: '3',
    shopName: 'Mountain Peak Bikes',
    customerName: 'Mike Wilson',
    email: 'mike@example.com',
    phone: '(555) 555-6666',
    serviceType: 'Suspension Service',
    date: '2024-01-17',
    time: '11:00',
    status: 'completed',
    createdAt: '2024-01-08T16:00:00Z'
  }
];