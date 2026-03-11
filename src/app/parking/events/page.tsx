"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { 
  Car, 
  Clock,
  AlertTriangle,
  Filter,
  Search,
  Calendar,
  ChevronDown,
  MapPin,
  CheckCircle,
  XCircle,
  Bell,
  Eye
} from 'lucide-react';

interface ParkingEvent {
  id: string;
  spotId: string;
  zone: string;
  status: 'occupied' | 'vacant';
  vehicleType: string;
  duration: string;
  time: string;
  confidence?: number;
  camera?: string;
}

interface Alert {
  id: string;
  type: 'unauthorized' | 'overstay' | 'vacant' | 'system';
  message: string;
  time: string;
  severity: 'high' | 'medium' | 'low';
  spotId?: string;
  zone?: string;
}

export default function ParkingEventsPage() {
  const [activeTab, setActiveTab] = useState<'events' | 'alerts'>('events');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const parkingEvents: ParkingEvent[] = [
    {
      id: '1',
      spotId: 'A-12',
      zone: 'Front Lot',
      status: 'occupied',
      vehicleType: 'Sedan',
      duration: '2h 15m',
      time: '10:30 AM',
      confidence: 98,
      camera: 'Camera 1'
    },
    {
      id: '2',
      spotId: 'B-08',
      zone: 'Side Lot',
      status: 'vacant',
      vehicleType: '-',
      duration: '5 min',
      time: '10:28 AM',
      confidence: 99,
      camera: 'Camera 3'
    },
    {
      id: '3',
      spotId: 'C-15',
      zone: 'Rear Lot',
      status: 'occupied',
      vehicleType: 'SUV',
      duration: '1h 45m',
      time: '09:45 AM',
      confidence: 97,
      camera: 'Camera 4'
    },
    {
      id: '4',
      spotId: 'D-03',
      zone: 'VIP Area',
      status: 'occupied',
      vehicleType: 'Sedan',
      duration: '3h 20m',
      time: '08:15 AM',
      confidence: 98,
      camera: 'Camera 2'
    },
    {
      id: '5',
      spotId: 'A-25',
      zone: 'Front Lot',
      status: 'vacant',
      vehicleType: 'Compact',
      duration: '12 min',
      time: '10:20 AM',
      confidence: 96,
      camera: 'Camera 1'
    },
    {
      id: '6',
      spotId: 'B-12',
      zone: 'Side Lot',
      status: 'occupied',
      vehicleType: 'Truck',
      duration: '45m',
      time: '09:45 AM',
      confidence: 99,
      camera: 'Camera 3'
    },
    {
      id: '7',
      spotId: 'C-22',
      zone: 'Rear Lot',
      status: 'vacant',
      vehicleType: '-',
      duration: '8 min',
      time: '10:25 AM',
      confidence: 98,
      camera: 'Camera 4'
    },
    {
      id: '8',
      spotId: 'A-18',
      zone: 'Front Lot',
      status: 'occupied',
      vehicleType: 'Motorcycle',
      duration: '30m',
      time: '10:00 AM',
      confidence: 95,
      camera: 'Camera 1'
    }
  ];

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'overstay',
      message: 'Vehicle overstay detected in spot D-03',
      time: '5 min ago',
      severity: 'high',
      spotId: 'D-03',
      zone: 'VIP Area'
    },
    {
      id: '2',
      type: 'unauthorized',
      message: 'Unauthorized vehicle detected in VIP area',
      time: '12 min ago',
      severity: 'high',
      spotId: 'D-05',
      zone: 'VIP Area'
    },
    {
      id: '3',
      type: 'vacant',
      message: 'Front Lot occupancy below 20%',
      time: '25 min ago',
      severity: 'medium',
      zone: 'Front Lot'
    },
    {
      id: '4',
      type: 'system',
      message: 'Camera 3 connection unstable',
      time: '1 hour ago',
      severity: 'low'
    }
  ];

  const zones = ['all', 'Front Lot', 'Side Lot', 'Rear Lot', 'VIP Area'];
  const statuses = ['all', 'occupied', 'vacant'];

  const filteredEvents = parkingEvents.filter(event => {
    const matchesSearch = event.spotId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.vehicleType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === 'all' || event.zone === selectedZone;
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    
    return matchesSearch && matchesZone && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'unauthorized': return <AlertTriangle className="w-4 h-4" />;
      case 'overstay': return <Clock className="w-4 h-4" />;
      case 'vacant': return <MapPin className="w-4 h-4" />;
      case 'system': return <Bell className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            {/* <h1 className="text-2xl font-bold text-zinc-900">Events & Alerts</h1>
            <p className="text-zinc-600 mt-1">Real-time parking events and system alerts</p> */}
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50"
          >
            <Filter className="w-4 h-4" />
            <span className="text-zinc-700">Filter</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border border-zinc-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search by spot or vehicle..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Zone</label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {zones.map(zone => (
                    <option key={zone} value={zone}>
                      {zone === 'all' ? 'All Zones' : zone}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Date Range</label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zinc-400" />
                  <select className="flex-1 px-3 py-2 border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Today</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white border border-zinc-200 rounded-lg">
          <div className="border-b border-zinc-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('events')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'events'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Events Timeline
              </button>
              <button
                onClick={() => setActiveTab('alerts')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'alerts'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Alerts
                <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full">4</span>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'events' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-zinc-900">Recent Parking Events</h3>
                  <span className="text-sm text-zinc-600">
                    Showing {filteredEvents.length} of {parkingEvents.length} events
                  </span>
                </div>
                
                <div className="space-y-3">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="bg-white border border-zinc-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.status === 'occupied' ? 'bg-red-100' : 'bg-green-100'
                          }`}>
                            {event.status === 'occupied' ? (
                              <Car className={`w-5 h-5 text-red-600`} />
                            ) : (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            )}
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-semibold text-zinc-900">Spot {event.spotId}</span>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                event.status === 'occupied' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                              }`}>
                                {event.status}
                              </span>
                              <span className="text-sm text-zinc-600">{event.zone}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-zinc-600">
                              <span>Vehicle: {event.vehicleType}</span>
                              <span>Duration: {event.duration}</span>
                              <span>Camera: {event.camera}</span>
                              <span>Confidence: {event.confidence}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm font-medium text-zinc-900">{event.time}</div>
                          <button className="mt-1 text-xs text-green-600 hover:text-green-700 flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-zinc-900">Active Alerts</h3>
                  <span className="text-sm text-zinc-600">{alerts.length} active alerts</span>
                </div>
                
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="bg-white border border-zinc-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                            {getAlertIcon(alert.type)}
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-semibold text-zinc-900">{alert.message}</span>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${getSeverityColor(alert.severity)}`}>
                                {alert.severity}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-zinc-600">
                              {alert.spotId && <span>Spot: {alert.spotId}</span>}
                              {alert.zone && <span>Zone: {alert.zone}</span>}
                              <span>Type: {alert.type}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-zinc-600">{alert.time}</div>
                          <div className="mt-2 flex gap-2">
                            <button className="text-xs text-green-600 hover:text-green-700">Acknowledge</button>
                            <button className="text-xs text-zinc-600 hover:text-zinc-700">Dismiss</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
