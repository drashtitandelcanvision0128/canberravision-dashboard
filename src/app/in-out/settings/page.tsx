"use client";

/**
 * Settings Page for In/Out Detection
 * 
 * This page provides configuration settings for the In/Out Detection system.
 * It includes camera configuration, schedules, rules, and exceptions management.
 * 
 * Features:
 * - Camera configuration with list of cameras
 * - Schedules management
 * - Rules configuration
 * - Exceptions handling
 * - Clean, well-structured code with clear separation of concerns
 */

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { getCookie } from "@/lib/cookies";

// Type definitions for settings data
type Camera = {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  rtspUrl: string;
  resolution: string;
  fps: number;
  lastSeen: string;
};

type Schedule = {
  id: string;
  name: string;
  description: string;
  type: 'entry' | 'exit' | 'both';
  startTime: string;
  endTime: string;
  days: string[];
  active: boolean;
};

type Rule = {
  id: string;
  name: string;
  priority: number;
  platePattern: string;
  action: string;
};

type Exception = {
  id: string;
  plateNumber: string;
  reason: string;
  startDate: string;
  endDate: string;
  approvedBy: string;
  status: 'active' | 'expired' | 'pending';
};

export default function SettingsPage() {
  // Get authentication token from cookies
  const token = useMemo(() => getCookie(AUTH_COOKIE_NAME) || "", []);

  // State management
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [exceptions, setExceptions] = useState<Exception[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'cameras' | 'schedules' | 'rules' | 'exceptions'>('cameras');

  // Exception handling state
  const [exceptionSettings, setExceptionSettings] = useState({
    autoFlagReview: true,
    captureScreenshot: true,
    allowManualEntry: true,
    requireReasonOverride: false,
    maxStayDuration: 12,
    maxDailyEntries: 5
  });

  // Demo data for cameras
  const demoCameras: Camera[] = [
    {
      id: '1',
      name: 'Gate A - Entry Camera',
      location: 'Main Entrance Gate A',
      status: 'online',
      rtspUrl: 'rtsp://192.168.1.100:554/stream',
      resolution: '1920x1080',
      fps: 30,
      lastSeen: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Gate B - Exit Camera',
      location: 'Main Exit Gate B',
      status: 'online',
      rtspUrl: 'rtsp://192.168.1.101:554/stream',
      resolution: '1920x1080',
      fps: 30,
      lastSeen: new Date(Date.now() - 2 * 60000).toISOString()
    },
    {
      id: '3',
      name: 'Gate C - Secondary Entry',
      location: 'Secondary Entrance Gate C',
      status: 'maintenance',
      rtspUrl: 'rtsp://192.168.1.102:554/stream',
      resolution: '1280x720',
      fps: 25,
      lastSeen: new Date(Date.now() - 30 * 60000).toISOString()
    },
    {
      id: '4',
      name: 'Parking Lot Camera',
      location: 'Parking Area A',
      status: 'offline',
      rtspUrl: 'rtsp://192.168.1.103:554/stream',
      resolution: '1920x1080',
      fps: 30,
      lastSeen: new Date(Date.now() - 120 * 60000).toISOString()
    }
  ];

  // Demo data for schedules
  const demoSchedules: Schedule[] = [
    {
      id: '1',
      name: 'Regular Hours',
      description: 'Monday to Friday access schedule',
      type: 'both',
      startTime: '09:00',
      endTime: '17:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      active: true
    },
    {
      id: '2',
      name: 'Weekend Access',
      description: 'Saturday and Sunday access schedule',
      type: 'entry',
      startTime: '10:00',
      endTime: '16:00',
      days: ['Sat', 'Sun'],
      active: true
    },
    {
      id: '3',
      name: 'Night Shift',
      description: 'Overnight access for security personnel',
      type: 'both',
      startTime: '22:00',
      endTime: '06:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      active: false
    }
  ];

  // Demo data for rules
  const demoRules: Rule[] = [
    {
      id: '1',
      name: 'VIP Vehicles',
      priority: 1,
      platePattern: 'ABC-*, VIP-*',
      action: 'Always Allow'
    },
    {
      id: '2',
      name: 'Banned Vehicles',
      priority: 2,
      platePattern: 'BAN-001, BAN-002',
      action: 'Always Deny'
    },
    {
      id: '3',
      name: 'Delivery Hours',
      priority: 3,
      platePattern: 'DLV-*',
      action: 'Allow 8AM-5PM'
    }
  ];

  // Demo data for exceptions
  const demoExceptions: Exception[] = [
    {
      id: '1',
      plateNumber: 'VIP-001',
      reason: 'Executive Vehicle - Permanent Access',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      approvedBy: 'John Smith',
      status: 'active'
    },
    {
      id: '2',
      plateNumber: 'TEMP-123',
      reason: 'Contractor Vehicle - Project Duration',
      startDate: '2024-03-01',
      endDate: '2024-03-15',
      approvedBy: 'Sarah Johnson',
      status: 'active'
    },
    {
      id: '3',
      plateNumber: 'DELIVERY-456',
      reason: 'Delivery Vehicle - One Day Access',
      startDate: '2024-02-28',
      endDate: '2024-02-28',
      approvedBy: 'Mike Wilson',
      status: 'expired'
    }
  ];

  /**
   * Fetch initial data
   */
  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!mounted) return;
        
        // Set demo data
        setCameras(demoCameras);
        setSchedules(demoSchedules);
        setRules(demoRules);
        setExceptions(demoExceptions);
        
      } catch (err) {
        if (!mounted) return;
        console.log("Error loading settings data:", err);
        
        // Set demo data as fallback
        setCameras(demoCameras);
        setSchedules(demoSchedules);
        setRules(demoRules);
        setExceptions(demoExceptions);
        
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Get schedule day color for weekly overview
  const getScheduleDayColor = (schedule: Schedule, day: string) => {
    if (!schedule.active) return 'bg-zinc-100';
    if (schedule.days.includes(day)) {
      return schedule.type === 'entry' ? 'bg-green-100' : 
             schedule.type === 'exit' ? 'bg-red-100' : 'bg-blue-100';
    }
    return 'bg-zinc-100';
  };

  // Format days for display
  const formatDays = (days: string[]) => {
    if (days.length === 5 && days.includes('Mon') && days.includes('Fri')) {
      return 'Mon-Fri';
    }
    if (days.length === 2 && days.includes('Sat') && days.includes('Sun')) {
      return 'Sat-Sun';
    }
    return days.join(', ');
  };

  // Get priority color for rules
  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return 'bg-red-100 text-red-800';
      case 2:
        return 'bg-orange-100 text-orange-800';
      case 3:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get action color
  const getActionColor = (action: string) => {
    if (action.includes('Allow')) return 'bg-green-100 text-green-800';
    if (action.includes('Deny')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  // Get status color for exceptions
  const getExceptionStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          
        </div>

        {/* Two Column Layout */}
        <div className="flex gap-6">
          {/* Left Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('cameras')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'cameras'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Cameras
                </button>
                <button
                  onClick={() => setActiveTab('schedules')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'schedules'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Schedules
                </button>
                <button
                  onClick={() => setActiveTab('rules')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'rules'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Rules
                </button>
                <button
                  onClick={() => setActiveTab('exceptions')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'exceptions'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Exceptions
                </button>
              </nav>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-zinc-200">
              {/* Camera Configuration Tab */}
              {activeTab === 'cameras' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-zinc-900">Camera Configuration</h2>
                    <button className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 transition-colors">
                      Add Camera
                    </button>
                  </div>

                  <div className="space-y-4">
                    {cameras.map((camera) => (
                      <div key={camera.id} className="border border-zinc-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Camera Icon */}
                            <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
                              <svg className="h-6 w-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </div>
                            
                            {/* Camera Info */}
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-zinc-900">{camera.name}</h3>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                  camera.status === 'online' ? 'bg-green-100 text-green-800' :
                                  camera.status === 'offline' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {camera.status}
                                </span>
                              </div>
                              <p className="text-sm text-zinc-600">{camera.location}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                                <span>RTSP: {camera.rtspUrl}</span>
                                <span>Resolution: {camera.resolution}</span>
                                <span>FPS: {camera.fps}</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Schedules Tab */}
              {activeTab === 'schedules' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-zinc-900">Access Schedules</h2>
                      <p className="text-sm text-zinc-600 mt-1">Manage time-based access control schedules</p>
                    </div>
                    <button className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 transition-colors">
                      Add Schedule
                    </button>
                  </div>

                  {/* Schedule Cards */}
                  <div className="space-y-4 mb-8">
                    {schedules.map((schedule) => (
                      <div key={schedule.id} className="border border-zinc-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Schedule Type Icon */}
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              schedule.type === 'both' ? 'bg-blue-100' :
                              schedule.type === 'entry' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              <svg className={`h-6 w-6 ${
                                schedule.type === 'both' ? 'text-blue-600' :
                                schedule.type === 'entry' ? 'text-green-600' : 'text-red-600'
                              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            
                            {/* Schedule Info */}
                            <div>
                              <h3 className="font-medium text-zinc-900">{schedule.name}</h3>
                              <p className="text-sm text-zinc-600">{schedule.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                                <span>{formatDays(schedule.days)}</span>
                                <span>{schedule.startTime} - {schedule.endTime}</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Weekly Overview Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 mb-4">Weekly Overview</h3>
                    <div className="border border-zinc-200 rounded-lg overflow-hidden">
                      {/* Days Header */}
                      <div className="grid grid-cols-8 bg-zinc-50 border-b border-zinc-200">
                        <div className="px-4 py-3 text-sm font-medium text-zinc-700 border-r border-zinc-200">Schedule</div>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                          <div key={day} className="px-4 py-3 text-sm font-medium text-zinc-700 text-center border-r border-zinc-200 last:border-r-0">
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      {/* Schedule Rows */}
                      {schedules.map((schedule) => (
                        <div key={schedule.id} className="grid grid-cols-8 border-b border-zinc-200 last:border-b-0">
                          <div className="px-4 py-3 text-sm text-zinc-900 border-r border-zinc-200">
                            {schedule.name}
                          </div>
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                            <div 
                              key={day} 
                              className={`px-4 py-3 text-center border-r border-zinc-200 last:border-r-0 ${getScheduleDayColor(schedule, day)}`}
                            >
                              {schedule.days.includes(day) && schedule.active ? (
                                <div className="text-xs font-medium text-zinc-900">
                                  {schedule.startTime} - {schedule.endTime}
                                </div>
                              ) : (
                                <div className="text-xs text-zinc-400">-</div>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Rules Tab */}
              {activeTab === 'rules' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-zinc-900">Vehicle Rules</h2>
                      <p className="text-sm text-zinc-600 mt-1">Configure access rules based on plate patterns</p>
                    </div>
                    <button className="inline-flex items-center rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 transition-colors">
                      <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Rule
                    </button>
                  </div>

                  {/* Rules Table */}
                  <div className="border border-zinc-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-zinc-200">
                      <thead className="bg-zinc-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Priority</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Rule Name</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Plate Pattern</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Action</th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-zinc-200">
                        {rules.map((rule) => (
                          <tr key={rule.id}>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(rule.priority)}`}>
                                #{rule.priority}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-zinc-900">{rule.name}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-zinc-500">{rule.platePattern}</td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getActionColor(rule.action)}`}>
                                {rule.action}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-zinc-600 hover:text-zinc-900 mr-3">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Exceptions Tab */}
              {activeTab === 'exceptions' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-zinc-900">Exception Handling</h2>
                      <p className="text-sm text-zinc-600 mt-1">Configure how the system handles exceptions and edge cases</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Unreadable Plates Section */}
                    <div className="bg-white border border-zinc-200 rounded-lg p-6">
                      <h3 className="text-base font-medium text-zinc-900 mb-4">Unreadable Plates</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium text-zinc-900">Auto-flag for manual review</h4>
                                <p className="text-sm text-zinc-500">Send unreadable plates to review queue</p>
                              </div>
                              <button 
                                onClick={() => setExceptionSettings(prev => ({...prev, autoFlagReview: !prev.autoFlagReview}))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  exceptionSettings.autoFlagReview ? 'bg-green-600' : 'bg-zinc-200'
                                }`}
                              >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  exceptionSettings.autoFlagReview ? 'translate-x-6' : 'translate-x-1'
                                }`}></span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium text-zinc-900">Capture screenshot</h4>
                                <p className="text-sm text-zinc-500">Save image for failed plate reads</p>
                              </div>
                              <button 
                                onClick={() => setExceptionSettings(prev => ({...prev, captureScreenshot: !prev.captureScreenshot}))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  exceptionSettings.captureScreenshot ? 'bg-green-600' : 'bg-zinc-200'
                                }`}
                              >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  exceptionSettings.captureScreenshot ? 'translate-x-6' : 'translate-x-1'
                                }`}></span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Manual Override Section */}
                    <div className="bg-white border border-zinc-200 rounded-lg p-6">
                      <h3 className="text-base font-medium text-zinc-900 mb-4">Manual Override</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium text-zinc-900">Allow manual plate entry</h4>
                                <p className="text-sm text-zinc-500">Operators can manually enter plates</p>
                              </div>
                              <button 
                                onClick={() => setExceptionSettings(prev => ({...prev, allowManualEntry: !prev.allowManualEntry}))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  exceptionSettings.allowManualEntry ? 'bg-green-600' : 'bg-zinc-200'
                                }`}
                              >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  exceptionSettings.allowManualEntry ? 'translate-x-6' : 'translate-x-1'
                                }`}></span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium text-zinc-900">Require reason for override</h4>
                                <p className="text-sm text-zinc-500">Force operators to provide reason</p>
                              </div>
                              <button 
                                onClick={() => setExceptionSettings(prev => ({...prev, requireReasonOverride: !prev.requireReasonOverride}))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  exceptionSettings.requireReasonOverride ? 'bg-green-600' : 'bg-zinc-200'
                                }`}
                              >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  exceptionSettings.requireReasonOverride ? 'translate-x-6' : 'translate-x-1'
                                }`}></span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Alert Thresholds Section */}
                    <div className="bg-white border border-zinc-200 rounded-lg p-6">
                      <h3 className="text-base font-medium text-zinc-900 mb-4">Alert Thresholds</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="max-stay" className="block text-sm font-medium text-zinc-900 mb-2">
                            Max stay duration before alert (hours)
                          </label>
                          <input
                            type="number"
                            id="max-stay"
                            value={exceptionSettings.maxStayDuration}
                            onChange={(e) => setExceptionSettings(prev => ({...prev, maxStayDuration: parseInt(e.target.value) || 0}))}
                            className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="max-entries" className="block text-sm font-medium text-zinc-900 mb-2">
                            Max daily entries per vehicle
                          </label>
                          <input
                            type="number"
                            id="max-entries"
                            value={exceptionSettings.maxDailyEntries}
                            onChange={(e) => setExceptionSettings(prev => ({...prev, maxDailyEntries: parseInt(e.target.value) || 0}))}
                            className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
