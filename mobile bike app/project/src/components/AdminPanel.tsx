import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, X, Eye, Filter } from 'lucide-react';
import { ServiceReservation } from '../types';
import { mockReservations } from '../data/mockData';

const AdminPanel: React.FC = () => {
  const [reservations, setReservations] = useState<ServiceReservation[]>(mockReservations);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [selectedReservation, setSelectedReservation] = useState<ServiceReservation | null>(null);

  const filteredReservations = reservations.filter(reservation => 
    filter === 'all' || reservation.status === filter
  );

  const updateReservationStatus = (id: string, status: ServiceReservation['status']) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === id ? { ...reservation, status } : reservation
      )
    );
  };

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
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const stats = {
    total: reservations.length,
    pending: reservations.filter(r => r.status === 'pending').length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    completed: reservations.filter(r => r.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage service reservations and bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.confirmed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
              </div>
              <User className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            <div className="flex space-x-2">
              {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status as any)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reservations Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Service Reservations ({filteredReservations.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shop
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {reservation.customerName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-2">
                          <Mail className="h-3 w-3" />
                          <span>{reservation.email}</span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-2">
                          <Phone className="h-3 w-3" />
                          <span>{reservation.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {reservation.shopName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reservation.serviceType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(reservation.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">{reservation.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                        {getStatusIcon(reservation.status)}
                        <span>{reservation.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <button
                        onClick={() => setSelectedReservation(reservation)}
                        className="text-emerald-600 hover:text-emerald-900 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {reservation.status === 'pending' && (
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                          className="text-emerald-600 hover:text-emerald-900 transition-colors"
                          title="Confirm"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      {reservation.status !== 'cancelled' && (
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Cancel"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReservations.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reservations found</h3>
              <p className="text-gray-500">No reservations match the selected filter</p>
            </div>
          )}
        </div>

        {/* Reservation Details Modal */}
        {selectedReservation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Reservation Details</h3>
                  <button
                    onClick={() => setSelectedReservation(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedReservation.customerName}</p>
                      <p><span className="font-medium">Email:</span> {selectedReservation.email}</p>
                      <p><span className="font-medium">Phone:</span> {selectedReservation.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Service Details</h4>
                    <div className="space-y-2">
                      <p><span className="font-medium">Shop:</span> {selectedReservation.shopName}</p>
                      <p><span className="font-medium">Service:</span> {selectedReservation.serviceType}</p>
                      <p><span className="font-medium">Date:</span> {new Date(selectedReservation.date).toLocaleDateString()}</p>
                      <p><span className="font-medium">Time:</span> {selectedReservation.time}</p>
                      <p><span className="font-medium">Status:</span> 
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedReservation.status)}`}>
                          {selectedReservation.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                
                {selectedReservation.notes && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Additional Notes</h4>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedReservation.notes}</p>
                  </div>
                )}
                
                <div className="mt-6 flex space-x-3">
                  {selectedReservation.status === 'pending' && (
                    <button
                      onClick={() => {
                        updateReservationStatus(selectedReservation.id, 'confirmed');
                        setSelectedReservation(null);
                      }}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Confirm Reservation
                    </button>
                  )}
                  {selectedReservation.status !== 'cancelled' && (
                    <button
                      onClick={() => {
                        updateReservationStatus(selectedReservation.id, 'cancelled');
                        setSelectedReservation(null);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Cancel Reservation
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;