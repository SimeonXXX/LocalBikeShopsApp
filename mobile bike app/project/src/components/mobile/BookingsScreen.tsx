import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, CheckCircle, X, RotateCcw } from 'lucide-react';
import { ServiceReservation } from '../../types';
import { mockReservations } from '../../data/mockData';

const BookingsScreen: React.FC = () => {
  const [reservations, setReservations] = useState<ServiceReservation[]>(mockReservations);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  const filteredReservations = reservations.filter(reservation => {
    const reservationDate = new Date(reservation.date);
    const today = new Date();
    
    switch (filter) {
      case 'upcoming':
        return reservationDate >= today && reservation.status !== 'completed' && reservation.status !== 'cancelled';
      case 'past':
        return reservationDate < today || reservation.status === 'completed' || reservation.status === 'cancelled';
      default:
        return true;
    }
  });

  const getStatusColor = (status: ServiceReservation['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-emerald-100 text-emerald-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: ServiceReservation['status']) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <X className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const cancelReservation = (id: string) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === id ? { ...reservation, status: 'cancelled' } : reservation
      )
    );
  };

  const rescheduleReservation = (id: string) => {
    // In a real app, this would open a reschedule modal
    alert('Reschedule functionality would open here');
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600">Manage your appointments</p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-2">
          {[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'past', label: 'Past' },
            { id: 'all', label: 'All' }
          ].map((filterOption) => (
            <motion.button
              key={filterOption.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterOption.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === filterOption.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {filterOption.label}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 pb-20">
        {filteredReservations.length > 0 ? (
          <div className="space-y-4">
            {filteredReservations.map((reservation, index) => (
              <motion.div
                key={reservation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{reservation.shopName}</h3>
                      <p className="text-emerald-600 font-medium">{reservation.serviceType}</p>
                    </div>
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                      {getStatusIcon(reservation.status)}
                      <span className="capitalize">{reservation.status}</span>
                    </span>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-3" />
                      <span className="text-sm">
                        {new Date(reservation.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-3" />
                      <span className="text-sm">{reservation.time}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  {reservation.status === 'confirmed' && (
                    <div className="flex space-x-2 pt-3 border-t border-gray-100">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => rescheduleReservation(reservation.id)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl text-sm font-medium flex items-center justify-center space-x-1"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>Reschedule</span>
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => cancelReservation(reservation.id)}
                        className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-xl text-sm font-medium flex items-center justify-center space-x-1"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </motion.button>
                    </div>
                  )}
                  
                  {reservation.status === 'pending' && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        Waiting for shop confirmation. You'll receive a notification once confirmed.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'upcoming' ? 'No upcoming bookings' : 
               filter === 'past' ? 'No past bookings' : 'No bookings found'}
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === 'upcoming' ? 'Book your first service appointment' : 
               filter === 'past' ? 'Your completed bookings will appear here' : 
               'Start by booking a service'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsScreen;