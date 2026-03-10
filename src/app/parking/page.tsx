"use client";

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { 
  Car, 
  MapPin, 
  TrendingUp,
  Camera,
  Video,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function ParkingDetectionPage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const parkingZones = [
    { id: 'A', name: 'Front Lot', occupied: 45, total: 60, cameras: 2 },
    { id: 'B', name: 'Side Lot', occupied: 38, total: 50, cameras: 1 },
    { id: 'C', name: 'Rear Lot', occupied: 32, total: 45, cameras: 1 },
    { id: 'D', name: 'VIP Area', occupied: 22, total: 25, cameras: 2 }
  ];

  const totalSpots = parkingZones.reduce((sum, zone) => sum + zone.total, 0);
  const totalOccupied = parkingZones.reduce((sum, zone) => sum + zone.occupied, 0);
  const totalAvailable = totalSpots - totalOccupied;
  const occupancyRate = ((totalOccupied / totalSpots) * 100).toFixed(1);

  const recentActivities = [
    { spotId: 'A-12', status: 'occupied', vehicle: 'Sedan - Blue', time: '2 min ago' },
    { spotId: 'B-08', status: 'empty', vehicle: 'SUV - Black', time: '5 min ago' },
    { spotId: 'C-15', status: 'occupied', vehicle: 'Truck - White', time: '8 min ago' },
    { spotId: 'D-03', status: 'occupied', vehicle: 'Sedan - Red', time: '12 min ago' },
    { spotId: 'A-25', status: 'empty', vehicle: 'Compact - Gray', time: '15 min ago' }
  ];

  const cameras = [
    { id: 1, name: 'Camera 1', zone: 'Front Lot' },
    { id: 2, name: 'Camera 2', zone: 'Front Lot' },
    { id: 3, name: 'Camera 3', zone: 'Side Lot' },
    { id: 4, name: 'Camera 4', zone: 'VIP Area' }
  ];

  return (
    <AppShell>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
            {/* Header */}
           

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg border border-zinc-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-600">Total Spots</p>
                    <p className="text-2xl font-bold text-zinc-900 mt-1">{totalSpots}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-zinc-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-600">Occupied</p>
                    <p className="text-2xl font-bold text-zinc-900 mt-1">{totalOccupied}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <Car className="w-4 h-4 text-red-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-zinc-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-600">Available</p>
                    <p className="text-2xl font-bold text-zinc-900 mt-1">{totalAvailable}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-zinc-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-600">Occupancy Rate</p>
                    <p className="text-2xl font-bold text-zinc-900 mt-1">{occupancyRate}%</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Parking Zone Map */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-zinc-200 p-4">
                  <h2 className="text-lg font-semibold text-zinc-900 mb-4">Parking Zone Map</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {parkingZones.map((zone) => {
                      const zoneOccupancyRate = ((zone.occupied / zone.total) * 100).toFixed(1);
                      const isHighOccupancy = parseFloat(zoneOccupancyRate) > 80;
                      
                      return (
                        <div 
                          key={zone.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedZone === zone.id ? 'border-green-500 bg-green-50' : 'border-zinc-200 hover:border-zinc-300'
                          }`}
                          onClick={() => setSelectedZone(zone.id)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-zinc-900">Zone {zone.id} - {zone.name}</h3>
                            <div className="flex items-center space-x-1">
                              <Camera className="w-4 h-4 text-zinc-500" />
                              <span className="text-sm text-zinc-500">{zone.cameras}</span>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-zinc-600">Occupancy</span>
                              <span className={`font-medium ${isHighOccupancy ? 'text-red-600' : 'text-green-600'}`}>
                                {zoneOccupancyRate}%
                              </span>
                            </div>
                            <div className="w-full bg-zinc-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  isHighOccupancy ? 'bg-red-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${zoneOccupancyRate}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-zinc-600">
                              <span className="font-medium text-red-600">{zone.occupied}</span> occupied
                            </span>
                            <span className="text-zinc-600">
                              <span className="font-medium text-green-600">{zone.total - zone.occupied}</span> available
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <div className="bg-white rounded-lg border border-zinc-200 p-4">
                  <h2 className="text-lg font-semibold text-zinc-900 mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-0">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.status === 'occupied' ? 'bg-red-500' : 'bg-green-500'
                          }`} />
                          <div>
                            <p className="text-sm font-medium text-zinc-900">{activity.spotId}</p>
                            <p className="text-xs text-zinc-500">{activity.vehicle}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-zinc-500">{activity.time}</p>
                          {activity.status === 'occupied' ? (
                            <XCircle className="w-4 h-4 text-red-500 ml-auto" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Camera Feeds */}
            <div className="mt-6">
              <div className="bg-white rounded-lg border border-zinc-200 p-4">
                <h2 className="text-lg font-semibold text-zinc-900 mb-4">Live Camera Feeds</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cameras.map((camera) => (
                    <div key={camera.id} className="relative">
                      <div className="bg-zinc-900 rounded-lg aspect-video flex items-center justify-center">
                        <Video className="w-12 h-12 text-zinc-600" />
                      </div>
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span>Live</span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {camera.name}
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {camera.zone}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    </AppShell>
  );
}
