"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { 
  Plus,
  Edit,
  Trash2,
  Settings,
  MapPin,
  Camera,
  Calendar,
  Bell,
  CheckCircle
} from 'lucide-react';

interface ParkingLot {
  id: string;
  name: string;
  zones: number;
  spots: number;
  cameras: number;
  status: 'active' | 'inactive';
}

interface ParkingZone {
  id: string;
  name: string;
  description: string;
  spots: number;
  cameras: number;
  status: 'active' | 'inactive';
}

interface ParkingCamera {
  id: string;
  name: string;
  zone: string;
  spotsMonitored: number;
  status: 'online' | 'offline';
}

export default function ParkingSettingsPage() {
  const [activeTab, setActiveTab] = useState('lots');
  const [is247Monitoring, setIs247Monitoring] = useState(true);
  const [isBusinessHours, setIsBusinessHours] = useState(false);
  const [isHighOccupancyAlert, setIsHighOccupancyAlert] = useState(true);
  const [isCameraOfflineAlert, setIsCameraOfflineAlert] = useState(true);
  const [isExtendedParkingAlert, setIsExtendedParkingAlert] = useState(true);
  const [isEmailNotifications, setIsEmailNotifications] = useState(true);
  
  const parkingLots: ParkingLot[] = [
    {
      id: '1',
      name: 'Main Parking Lot',
      zones: 4,
      spots: 180,
      cameras: 7,
      status: 'active'
    },
    {
      id: '2',
      name: 'Employee Parking',
      zones: 2,
      spots: 60,
      cameras: 3,
      status: 'active'
    },
    {
      id: '3',
      name: 'Visitor Parking',
      zones: 1,
      spots: 30,
      cameras: 2,
      status: 'active'
    }
  ];

  const parkingZones: ParkingZone[] = [
    {
      id: '1',
      name: 'Zone A - Front Area',
      description: 'Main entrance parking spaces near the building entrance',
      spots: 45,
      cameras: 2,
      status: 'active'
    },
    {
      id: '2',
      name: 'Zone B - Side Area',
      description: 'Side parking area with covered spaces',
      spots: 38,
      cameras: 1,
      status: 'active'
    },
    {
      id: '3',
      name: 'Zone C - Rear Area',
      description: 'Rear parking area with additional overflow capacity',
      spots: 32,
      cameras: 1,
      status: 'active'
    },
    {
      id: '4',
      name: 'Zone D - VIP Area',
      description: 'Reserved parking for VIP guests and executives',
      spots: 22,
      cameras: 2,
      status: 'active'
    }
  ];

  const parkingCameras: ParkingCamera[] = [
    {
      id: '1',
      name: 'Camera 01',
      zone: 'Zone A - Front Area',
      spotsMonitored: 25,
      status: 'online'
    },
    {
      id: '2',
      name: 'Camera 02',
      zone: 'Zone A - Front Area',
      spotsMonitored: 20,
      status: 'online'
    },
    {
      id: '3',
      name: 'Camera 03',
      zone: 'Zone B - Side Area',
      spotsMonitored: 38,
      status: 'online'
    },
    {
      id: '4',
      name: 'Camera 04',
      zone: 'Zone C - Rear Area',
      spotsMonitored: 32,
      status: 'offline'
    },
    {
      id: '5',
      name: 'Camera 05',
      zone: 'Zone D - VIP Area',
      spotsMonitored: 12,
      status: 'online'
    },
    {
      id: '6',
      name: 'Camera 06',
      zone: 'Zone D - VIP Area',
      spotsMonitored: 10,
      status: 'online'
    },
    {
      id: '7',
      name: 'Camera 07',
      zone: 'Zone A - Front Area',
      spotsMonitored: 23,
      status: 'online'
    }
  ];

  const tabs = [
    { id: 'lots', label: 'Parking Lots', icon: MapPin },
    { id: 'zones', label: 'Zones', icon: MapPin },
    { id: 'cameras', label: 'Cameras', icon: Camera },
    { id: 'schedules', label: 'Schedules', icon: Calendar },
    { id: 'alerts', label: 'Alerts', icon: Bell }
  ];

  return (
    <AppShell>
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-zinc-900">Parking Detection Settings</h1>
            <p className="text-zinc-600 mt-1">Configure parking lots, zones, cameras, and detection rules</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-zinc-200 mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'lots' && (
            <div>
              {/* Section Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-zinc-900">Parking Lots</h2>
                <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Parking Lot</span>
                </button>
              </div>

              {/* Parking Lots List */}
              <div className="space-y-4">
                {parkingLots.map((lot) => (
                  <div key={lot.id} className="bg-white rounded-lg border border-zinc-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-zinc-900">{lot.name}</h3>
                        <div className="flex items-center space-x-6 mt-2">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-zinc-500" />
                            <span className="text-sm text-zinc-600">{lot.zones} zones</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Settings className="w-4 h-4 text-zinc-500" />
                            <span className="text-sm text-zinc-600">{lot.spots} spots</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Camera className="w-4 h-4 text-zinc-500" />
                            <span className="text-sm text-zinc-600">{lot.cameras} cameras</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          lot.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {lot.status === 'active' && (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          )}
                          {lot.status}
                        </span>
                        <button className="p-2 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'zones' && (
            <div>
              {/* Section Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-zinc-900">Zones</h2>
                <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Zone</span>
                </button>
              </div>

              {/* Zones List */}
              <div className="space-y-4">
                {parkingZones.map((zone) => (
                  <div key={zone.id} className="bg-white rounded-lg border border-zinc-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-zinc-900">{zone.name}</h3>
                        <p className="text-sm text-zinc-600 mt-1">{zone.description}</p>
                        <div className="flex items-center space-x-6 mt-3">
                          <div className="flex items-center space-x-2">
                            <Settings className="w-4 h-4 text-zinc-500" />
                            <span className="text-sm text-zinc-600">{zone.spots} spots</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Camera className="w-4 h-4 text-zinc-500" />
                            <span className="text-sm text-zinc-600">{zone.cameras} cameras</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors">
                          <Settings className="w-4 h-4" />
                          <span>Configure Spots</span>
                        </button>
                        <button className="p-2 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cameras' && (
            <div>
              {/* Section Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-zinc-900">Cameras</h2>
                <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Camera</span>
                </button>
              </div>

              {/* Cameras List */}
              <div className="space-y-4">
                {parkingCameras.map((camera) => (
                  <div key={camera.id} className="bg-white rounded-lg border border-zinc-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-zinc-900">{camera.name}</h3>
                        <div className="flex items-center space-x-6 mt-2">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-zinc-500" />
                            <span className="text-sm text-zinc-600">{camera.zone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Settings className="w-4 h-4 text-zinc-500" />
                            <span className="text-sm text-zinc-600">{camera.spotsMonitored} spots monitored</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          camera.status === 'online' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {camera.status === 'online' && (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          )}
                          {camera.status}
                        </span>
                        <button className="p-2 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schedules' && (
            <div className="bg-white rounded-lg border border-zinc-200 p-6">
              <h2 className="text-xl font-bold text-zinc-900 mb-2">Detection Schedule</h2>
              <p className="text-zinc-600 mb-6">Configure when the parking detection system is active</p>

              <div className="space-y-1">
                {/* 24/7 Monitoring */}
                <div className="flex items-center justify-between py-4 border-b border-zinc-200">
                  <div>
                    <h3 className="text-lg font-medium text-zinc-900">24/7 Monitoring</h3>
                    <p className="text-zinc-500 text-sm mt-1">Keep detection active at all times</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={is247Monitoring}
                      onChange={(e) => setIs247Monitoring(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                {/* Capture Interval */}
                <div className="flex items-center justify-between py-4 border-b border-zinc-200">
                  <div>
                    <h3 className="text-lg font-medium text-zinc-900">Capture Interval</h3>
                    <p className="text-zinc-500 text-sm mt-1">How often to capture and analyze images</p>
                  </div>
                  <span className="text-foreground font-medium">Every 30 seconds</span>
                </div>

                {/* Business Hours Only */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="text-lg font-medium text-zinc-900">Business Hours Only</h3>
                    <p className="text-zinc-500 text-sm mt-1">Increase frequency during peak hours (8AM - 6PM)</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={isBusinessHours}
                      onChange={(e) => setIsBusinessHours(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="bg-white rounded-lg border border-zinc-200 p-6">
              <h2 className="text-xl font-bold text-zinc-900 mb-2">Alert Configuration</h2>
              <p className="text-zinc-600 mb-6">Configure when and how to send parking alerts</p>

              <div className="space-y-1">
                {/* High Occupancy Alert */}
                <div className="flex items-center justify-between py-4 border-b border-zinc-200">
                  <div>
                    <h3 className="text-lg font-medium text-zinc-900">High Occupancy Alert</h3>
                    <p className="text-zinc-500 text-sm mt-1">Alert when parking occupancy exceeds threshold</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-foreground font-medium">90%</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={isHighOccupancyAlert}
                        onChange={(e) => setIsHighOccupancyAlert(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>

                {/* Camera Offline Alert */}
                <div className="flex items-center justify-between py-4 border-b border-zinc-200">
                  <div>
                    <h3 className="text-lg font-medium text-zinc-900">Camera Offline Alert</h3>
                    <p className="text-zinc-500 text-sm mt-1">Notify when cameras go offline</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={isCameraOfflineAlert}
                      onChange={(e) => setIsCameraOfflineAlert(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                {/* Extended Parking Alert */}
                <div className="flex items-center justify-between py-4 border-b border-zinc-200">
                  <div>
                    <h3 className="text-lg font-medium text-zinc-900">Extended Parking Alert</h3>
                    <p className="text-zinc-500 text-sm mt-1">Alert for vehicles parked longer than allowed</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-foreground font-medium">8 hours</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={isExtendedParkingAlert}
                        onChange={(e) => setIsExtendedParkingAlert(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>

                {/* Email Notifications */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="text-lg font-medium text-zinc-900">Email Notifications</h3>
                    <p className="text-zinc-500 text-sm mt-1">Send alerts via email to administrators</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={isEmailNotifications}
                      onChange={(e) => setIsEmailNotifications(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
