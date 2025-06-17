import React from 'react';
import { Bike, MapPin, Wrench } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-emerald-600 p-2 rounded-lg group-hover:bg-emerald-700 transition-colors">
              <Bike className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CycleMate</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Find. Book. Ride.</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Shops</span>
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'admin'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;