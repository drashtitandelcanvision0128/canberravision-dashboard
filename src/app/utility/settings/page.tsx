"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { 
  Plus, 
  Settings, 
  Zap, 
  Flame, 
  Droplet,
  Thermometer,
  Gauge,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function UtilitySettingsPage() {
  const [activeTab, setActiveTab] = useState('types');
  const [supportedMeterTypes, setSupportedMeterTypes] = useState([
    {
      id: 1,
      name: 'Electric Meter',
      unit: 'kWh',
      isActive: true,
      icon: Zap,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-100'
    },
    {
      id: 2,
      name: 'Gas Gauge',
      unit: 'psi',
      isActive: true,
      icon: Flame,
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-100'
    },
    {
      id: 3,
      name: 'Water Meter',
      unit: 'gal',
      isActive: true,
      icon: Droplet,
      iconColor: 'text-cyan-500',
      iconBg: 'bg-cyan-100'
    },
    {
      id: 4,
      name: 'Temperature',
      unit: '°F',
      isActive: false,
      icon: Thermometer,
      iconColor: 'text-red-500',
      iconBg: 'bg-red-100'
    },
    {
      id: 5,
      name: 'Pressure Gauge',
      unit: 'bar',
      isActive: false,
      icon: Gauge,
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-100'
    }
  ]);
  
  const [peakHoursEnabled, setPeakHoursEnabled] = useState(true);
  const [criticalThresholdsEnabled, setCriticalThresholdsEnabled] = useState(true);
  const [warningThresholdsEnabled, setWarningThresholdsEnabled] = useState(true);
  const [anomalyDetectionEnabled, setAnomalyDetectionEnabled] = useState(true);

  const tabs = [
    { id: 'meters', label: 'Meters' },
    { id: 'types', label: 'Meter Types' },
    { id: 'schedules', label: 'Schedules' },
    { id: 'alerts', label: 'Alerts' }
  ];

  const configuredMeters = [
    {
      id: 1,
      name: 'Electric Meter #1',
      type: 'Electric',
      location: 'Utility Room A',
      frequency: 'Every 5 min',
      status: 'active',
      icon: Zap,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-100'
    },
    {
      id: 2,
      name: 'Gas Gauge #3',
      type: 'Gas',
      location: 'Boiler Room',
      frequency: 'Every 10 min',
      status: 'active',
      icon: Flame,
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-100'
    },
    {
      id: 3,
      name: 'Water Meter #2',
      type: 'Water',
      location: 'Basement',
      frequency: 'Every 15 min',
      status: 'active',
      icon: Droplet,
      iconColor: 'text-cyan-500',
      iconBg: 'bg-cyan-100'
    }
  ];


  const toggleMeterType = (id: number) => {
    setSupportedMeterTypes(prev => 
      prev.map(meter => 
        meter.id === id ? { ...meter, isActive: !meter.isActive } : meter
      )
    );
  };

  return (
    <AppShell>
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            {/* <h1 className="text-2xl font-bold text-zinc-900">Utility Settings</h1>
            <p className="text-zinc-600 mt-1">Configure meters, gauges and reading parameters</p> */}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-zinc-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'meters' && (
          <div className="bg-white rounded-lg border border-zinc-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-zinc-900">Configured Meters</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Meter
              </button>
            </div>

            {/* Meters Grid */}
            <div className="space-y-4">
              {configuredMeters.map((meter) => {
                const Icon = meter.icon;
                return (
                  <div key={meter.id} className="border border-zinc-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      {/* Meter Info */}
                      <div className="flex items-center space-x-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-lg ${meter.iconBg} flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${meter.iconColor}`} />
                        </div>
                        
                        {/* Details */}
                        <div>
                          <h3 className="text-base font-semibold text-zinc-900">{meter.name}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-zinc-600">{meter.type}</span>
                            <span className="text-sm text-zinc-400">•</span>
                            <span className="text-sm text-zinc-600">{meter.location}</span>
                            <span className="text-sm text-zinc-400">•</span>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-zinc-400" />
                              <span className="text-sm text-zinc-600">{meter.frequency}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status and Settings */}
                      <div className="flex items-center space-x-3">
                        {/* Status Badge */}
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-sm text-green-600 font-medium">active</span>
                        </div>
                        
                        {/* Settings Button */}
                        <button className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="bg-white rounded-lg border border-zinc-200 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 mb-6">Supported Meter Types</h2>
            
            {/* Meter Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {supportedMeterTypes.map((meterType) => {
                const Icon = meterType.icon;
                return (
                  <div key={meterType.id} className="border border-zinc-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      {/* Meter Type Info */}
                      <div className="flex items-center space-x-3">
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-lg ${meterType.iconBg} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${meterType.iconColor}`} />
                        </div>
                        
                        {/* Details */}
                        <div>
                          <h3 className="text-sm font-semibold text-zinc-900">{meterType.name}</h3>
                          <p className="text-xs text-zinc-500">{meterType.unit}</p>
                        </div>
                      </div>

                      {/* Toggle Switch */}
                      <button
                        onClick={() => toggleMeterType(meterType.id)}
                        className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                          meterType.isActive ? 'bg-green-600' : 'bg-zinc-200'
                        }`}
                      >
                        <span
                          className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                            meterType.isActive ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'schedules' && (
          <div className="bg-white rounded-lg border border-zinc-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-zinc-600" />
              <h2 className="text-lg font-semibold text-zinc-900">Reading Schedule</h2>
            </div>
            
            {/* Default Interval Setting */}
            <div className="border border-zinc-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 mb-1">Default Interval</h3>
                  <p className="text-xs text-zinc-500">How often to capture readings</p>
                </div>
                <select className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                  <option>Every 1 minute</option>
                  <option>Every 5 minutes</option>
                  <option>Every 10 minutes</option>
                  <option>Every 15 minutes</option>
                  <option>Every 30 minutes</option>
                  <option>Every 1 hour</option>
                </select>
              </div>
            </div>
            
            {/* Peak Hours Interval Setting */}
            <div className="border border-zinc-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 mb-1">Peak Hours Interval</h3>
                  <p className="text-xs text-zinc-500">More frequent readings during peak hours</p>
                </div>
                <button
                  onClick={() => setPeakHoursEnabled(!peakHoursEnabled)}
                  className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                    peakHoursEnabled ? 'bg-green-600' : 'bg-zinc-200'
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                      peakHoursEnabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="bg-white rounded-lg border border-zinc-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-zinc-600" />
              <h2 className="text-lg font-semibold text-zinc-900">Alert Configuration</h2>
            </div>
            
            {/* Critical Thresholds Setting */}
            <div className="border border-zinc-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 mb-1">Critical Thresholds</h3>
                  <p className="text-xs text-zinc-500">Alert when readings exceed critical limits</p>
                </div>
                <button
                  onClick={() => setCriticalThresholdsEnabled(!criticalThresholdsEnabled)}
                  className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                    criticalThresholdsEnabled ? 'bg-green-600' : 'bg-zinc-200'
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                      criticalThresholdsEnabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
            
            {/* Warning Thresholds Setting */}
            <div className="border border-zinc-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 mb-1">Warning Thresholds</h3>
                  <p className="text-xs text-zinc-500">Alert when readings approach warning limits</p>
                </div>
                <button
                  onClick={() => setWarningThresholdsEnabled(!warningThresholdsEnabled)}
                  className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                    warningThresholdsEnabled ? 'bg-green-600' : 'bg-zinc-200'
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                      warningThresholdsEnabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
            
            {/* Anomaly Detection Setting */}
            <div className="border border-zinc-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 mb-1">Anomaly Detection</h3>
                  <p className="text-xs text-zinc-500">Detect unusual patterns in reading data</p>
                </div>
                <button
                  onClick={() => setAnomalyDetectionEnabled(!anomalyDetectionEnabled)}
                  className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                    anomalyDetectionEnabled ? 'bg-green-600' : 'bg-zinc-200'
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                      anomalyDetectionEnabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
