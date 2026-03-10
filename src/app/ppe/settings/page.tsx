"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { 
  Settings, 
  Camera, 
  Shield,
  Bell,
  Mail,
  Users,
  Save,
  MapPin,
  Eye,
  AlertTriangle
} from 'lucide-react';

export default function PPESettingsPage() {
  const [activeTab, setActiveTab] = useState('detection');
  const [settings, setSettings] = useState({
    // Detection Settings
    detectionSensitivity: 85,
    confidenceThreshold: 75,
    enableRealTimeAlerts: true,
    autoAssignViolations: false,
    
    // PPE Requirements
    helmetRequired: true,
    vestRequired: true,
    glassesRequired: true,
    footwearRequired: false,
    
    // Camera Settings
    cameraResolution: '1080p',
    frameRate: 30,
    recordingEnabled: true,
    retentionDays: 30,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    notificationEmail: 'admin@company.com',
    
    // Zone Settings
    zones: [
      { id: 1, name: 'Construction Area A', active: true, cameras: 2 },
      { id: 2, name: 'Warehouse Section B', active: true, cameras: 1 },
      { id: 3, name: 'Loading Dock', active: true, cameras: 1 },
      { id: 4, name: 'Manufacturing Floor', active: false, cameras: 0 }
    ]
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleZoneToggle = (zoneId: number) => {
    setSettings(prev => ({
      ...prev,
      zones: prev.zones.map(zone => 
        zone.id === zoneId ? { ...zone, active: !zone.active } : zone
      )
    }));
  };

  const tabs = [
    { id: 'detection', label: 'Detection Settings', icon: Eye },
    { id: 'ppe', label: 'PPE Requirements', icon: Shield },
    { id: 'cameras', label: 'Camera Settings', icon: Camera },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'zones', label: 'Zone Management', icon: MapPin }
  ];

  return (
    <AppShell>
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">PPE Settings</h1>
              <p className="text-zinc-600">Configure PPE detection system parameters</p>
            </div>
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </div>

          <div className="flex gap-6">
            {/* Sidebar Tabs */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border border-zinc-200 p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 ${
                        activeTab === tab.id
                          ? 'bg-green-100 text-green-900'
                          : 'text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg border border-zinc-200 p-6">
                {/* Detection Settings */}
                {activeTab === 'detection' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-zinc-900 mb-4">Detection Parameters</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Detection Sensitivity: {settings.detectionSensitivity}%
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={settings.detectionSensitivity}
                        onChange={(e) => handleSettingChange('detectionSensitivity', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-zinc-500 mt-1">Higher values increase detection accuracy but may reduce performance</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Confidence Threshold: {settings.confidenceThreshold}%
                      </label>
                      <input
                        type="range"
                        min="60"
                        max="95"
                        value={settings.confidenceThreshold}
                        onChange={(e) => handleSettingChange('confidenceThreshold', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-zinc-500 mt-1">Minimum confidence level to trigger PPE detection</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-zinc-700">Alert Settings</h3>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-zinc-700">Enable Real-time Alerts</span>
                        <button
                          onClick={() => handleSettingChange('enableRealTimeAlerts', !settings.enableRealTimeAlerts)}
                          className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                            settings.enableRealTimeAlerts ? 'bg-green-600' : 'bg-zinc-200'
                          }`}
                        >
                          <span
                            className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                              settings.enableRealTimeAlerts ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between">
                        <span className="text-sm text-zinc-700">Auto-assign Violations</span>
                        <button
                          onClick={() => handleSettingChange('autoAssignViolations', !settings.autoAssignViolations)}
                          className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                            settings.autoAssignViolations ? 'bg-green-600' : 'bg-zinc-200'
                          }`}
                        >
                          <span
                            className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                              settings.autoAssignViolations ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </label>
                    </div>
                  </div>
                )}

                {/* PPE Requirements */}
                {activeTab === 'ppe' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-zinc-900 mb-4">Required PPE Items</h2>
                    
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 border border-zinc-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-zinc-500" />
                          <div>
                            <p className="text-sm font-medium text-zinc-900">Safety Helmet</p>
                            <p className="text-xs text-zinc-500">Required for construction and manufacturing areas</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSettingChange('helmetRequired', !settings.helmetRequired)}
                          className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                            settings.helmetRequired ? 'bg-green-600' : 'bg-zinc-200'
                          }`}
                        >
                          <span
                            className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                              settings.helmetRequired ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between p-4 border border-zinc-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-zinc-500" />
                          <div>
                            <p className="text-sm font-medium text-zinc-900">Safety Vest</p>
                            <p className="text-xs text-zinc-500">High-visibility clothing required</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSettingChange('vestRequired', !settings.vestRequired)}
                          className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                            settings.vestRequired ? 'bg-green-600' : 'bg-zinc-200'
                          }`}
                        >
                          <span
                            className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                              settings.vestRequired ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between p-4 border border-zinc-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-zinc-500" />
                          <div>
                            <p className="text-sm font-medium text-zinc-900">Safety Glasses</p>
                            <p className="text-xs text-zinc-500">Eye protection for hazardous areas</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSettingChange('glassesRequired', !settings.glassesRequired)}
                          className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                            settings.glassesRequired ? 'bg-green-600' : 'bg-zinc-200'
                          }`}
                        >
                          <span
                            className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                              settings.glassesRequired ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between p-4 border border-zinc-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-zinc-500" />
                          <div>
                            <p className="text-sm font-medium text-zinc-900">Safety Footwear</p>
                            <p className="text-xs text-zinc-500">Steel-toed boots required</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSettingChange('footwearRequired', !settings.footwearRequired)}
                          className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                            settings.footwearRequired ? 'bg-green-600' : 'bg-zinc-200'
                          }`}
                        >
                          <span
                            className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                              settings.footwearRequired ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </label>
                    </div>
                  </div>
                )}

                {/* Camera Settings */}
                {activeTab === 'cameras' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-zinc-900 mb-4">Camera Configuration</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Camera Resolution
                      </label>
                      <select
                        value={settings.cameraResolution}
                        onChange={(e) => handleSettingChange('cameraResolution', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
                      >
                        <option value="720p">720p HD</option>
                        <option value="1080p">1080p Full HD</option>
                        <option value="4K">4K Ultra HD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Frame Rate: {settings.frameRate} FPS
                      </label>
                      <input
                        type="range"
                        min="15"
                        max="60"
                        step="15"
                        value={settings.frameRate}
                        onChange={(e) => handleSettingChange('frameRate', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Video Retention Period: {settings.retentionDays} days
                      </label>
                      <input
                        type="range"
                        min="7"
                        max="90"
                        step="7"
                        value={settings.retentionDays}
                        onChange={(e) => handleSettingChange('retentionDays', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-zinc-700">Enable Recording</span>
                        <button
                          onClick={() => handleSettingChange('recordingEnabled', !settings.recordingEnabled)}
                          className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                            settings.recordingEnabled ? 'bg-green-600' : 'bg-zinc-200'
                          }`}
                        >
                          <span
                            className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                              settings.recordingEnabled ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </label>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-zinc-900 mb-4">Notification Preferences</h2>
                    
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 border border-zinc-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-zinc-500" />
                          <div>
                            <p className="text-sm font-medium text-zinc-900">Email Notifications</p>
                            <p className="text-xs text-zinc-500">Receive alerts via email</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                          className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                            settings.emailNotifications ? 'bg-green-600' : 'bg-zinc-200'
                          }`}
                        >
                          <span
                            className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                              settings.emailNotifications ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between p-4 border border-zinc-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-zinc-500" />
                          <div>
                            <p className="text-sm font-medium text-zinc-900">SMS Notifications</p>
                            <p className="text-xs text-zinc-500">Receive text message alerts</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSettingChange('smsNotifications', !settings.smsNotifications)}
                          className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                            settings.smsNotifications ? 'bg-green-600' : 'bg-zinc-200'
                          }`}
                        >
                          <span
                            className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                              settings.smsNotifications ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between p-4 border border-zinc-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-zinc-500" />
                          <div>
                            <p className="text-sm font-medium text-zinc-900">Push Notifications</p>
                            <p className="text-xs text-zinc-500">Browser push notifications</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
                          className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                            settings.pushNotifications ? 'bg-green-600' : 'bg-zinc-200'
                          }`}
                        >
                          <span
                            className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                              settings.pushNotifications ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Notification Email
                      </label>
                      <input
                        type="email"
                        value={settings.notificationEmail}
                        onChange={(e) => handleSettingChange('notificationEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
                      />
                    </div>
                  </div>
                )}

                {/* Zone Management */}
                {activeTab === 'zones' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-zinc-900 mb-4">Monitoring Zones</h2>
                    
                    <div className="space-y-4">
                      {settings.zones.map((zone) => (
                        <div key={zone.id} className="flex items-center justify-between p-4 border border-zinc-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-zinc-500" />
                            <div>
                              <p className="text-sm font-medium text-zinc-900">{zone.name}</p>
                              <p className="text-xs text-zinc-500">{zone.cameras} cameras assigned</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              zone.active 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {zone.active ? 'Active' : 'Inactive'}
                            </span>
                            <button
                              onClick={() => handleZoneToggle(zone.id)}
                              className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                                zone.active ? 'bg-green-600' : 'bg-zinc-200'
                              }`}
                            >
                              <span
                                className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                                  zone.active ? 'translate-x-4' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="w-full py-2 border-2 border-dashed border-zinc-300 rounded-lg text-zinc-600 hover:border-zinc-400 hover:text-zinc-700 transition-colors">
                      + Add New Zone
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
