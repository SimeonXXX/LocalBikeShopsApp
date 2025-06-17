export interface BikeShop {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  distance: number;
  openingHours: string;
  services: string[];
  image: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  tags: string[];
  isOpen: boolean;
  priceRange: '$' | '$$' | '$$$';
}

export interface ServiceReservation {
  id: string;
  shopId: string;
  shopName: string;
  customerName: string;
  email: string;
  phone: string;
  serviceType: string;
  date: string;
  time: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ServiceType {
  id: string;
  name: string;
  duration: number;
  price: number;
  icon: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bikeModel?: string;
  preferredServices: string[];
}

export interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}