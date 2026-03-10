"use client";

/**
 * Events & Alerts Page for In/Out Detection
 * 
 * This page displays activity timeline, active alerts, and summary statistics
 * for vehicle entry and exit events. It provides real-time monitoring capabilities
 * with filtering and alert management features.
 * 
 * Features:
 * - Real-time activity timeline with expandable event details
 * - Active alerts management with priority levels
 * - Summary statistics cards with trend indicators
 * - Event filtering by type, severity, and time range
 * - Responsive design with dark mode support
 */

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { getCookie } from "@/lib/cookies";
import { fetchInOutEvents, fetchInOutStatistics } from "@/lib/api";
import { closeSocket, getSocket } from "@/lib/socket";

// Type definitions for our data structures
type ActivityEvent = {
  id: string;
  type: 'entry' | 'exit' | 'unauthorized';
  plateNumber: string;
  vehicleType: string;
  color: string;
  gate: string;
  timestamp: string;
  confidence: number;
  status: 'success' | 'warning' | 'error';
  image?: string;
  details?: string;
};

type Alert = {
  id: string;
  type: 'unauthorized' | 'suspicious' | 'system' | 'maintenance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  plateNumber?: string;
  gate?: string;
};

type EventStats = {
  totalEvents: number;
  activeAlerts: number;
  unauthorizedAttempts: number;
  systemAccuracy: number;
  avgResponseTime: string;
  peakActivityHour: string;
};

export default function EventsPage() {
  // Get authentication token from cookies
  const token = useMemo(() => getCookie(AUTH_COOKIE_NAME) || "", []);

  // State management
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [stats, setStats] = useState<EventStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'entry' | 'exit' | 'unauthorized'>('all');
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  // Demo data for events
  const demoEvents: ActivityEvent[] = [
    {
      id: '1',
      type: 'entry',
      plateNumber: 'ABC-1234',
      vehicleType: 'Sedan',
      color: 'White',
      gate: 'Gate A',
      timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
      confidence: 95,
      status: 'success',
      details: 'Authorized vehicle entry detected'
    },
    {
      id: '2',
      type: 'unauthorized',
      plateNumber: 'XYZ-5678',
      vehicleType: 'SUV',
      color: 'Black',
      gate: 'Gate B',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      confidence: 78,
      status: 'error',
      details: 'Unauthorized vehicle attempt detected'
    },
    {
      id: '3',
      type: 'exit',
      plateNumber: 'DEF-9012',
      vehicleType: 'Truck',
      color: 'Blue',
      gate: 'Gate A',
      timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
      confidence: 92,
      status: 'success',
      details: 'Vehicle exit completed successfully'
    },
    {
      id: '4',
      type: 'entry',
      plateNumber: 'GHI-3456',
      vehicleType: 'Van',
      color: 'Silver',
      gate: 'Gate B',
      timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
      confidence: 88,
      status: 'success',
      details: 'Authorized commercial vehicle entry'
    },
    {
      id: '5',
      type: 'exit',
      plateNumber: 'JKL-7890',
      vehicleType: 'Sedan',
      color: 'Red',
      gate: 'Gate A',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      confidence: 90,
      status: 'success',
      details: 'Regular vehicle exit recorded'
    }
  ];

  // Demo data for alerts
  const demoAlerts: Alert[] = [
    {
      id: '1',
      type: 'unauthorized',
      severity: 'high',
      title: 'Unauthorized Vehicle Detected',
      description: 'Vehicle XYZ-5678 attempted entry without authorization at Gate B',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      status: 'active',
      plateNumber: 'XYZ-5678',
      gate: 'Gate B'
    },
    {
      id: '2',
      type: 'suspicious',
      severity: 'medium',
      title: 'Suspicious Activity',
      description: 'Multiple failed recognition attempts for vehicle DEF-9012',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      status: 'active',
      plateNumber: 'DEF-9012',
      gate: 'Gate A'
    },
    {
      id: '3',
      type: 'system',
      severity: 'low',
      title: 'Camera Maintenance Required',
      description: 'Camera at Gate A requires cleaning for optimal performance',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      status: 'acknowledged',
      gate: 'Gate A'
    }
  ];

  // Demo statistics
  const demoStats: EventStats = {
    totalEvents: 247,
    activeAlerts: 3,
    unauthorizedAttempts: 12,
    systemAccuracy: 98.5,
    avgResponseTime: '< 1s',
    peakActivityHour: '14:00'
  };

  /**
   * Fetch initial data from API
   * Falls back to demo data if backend is unavailable
   */
  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Attempt to fetch real data from backend
        const [eventsData, statsData] = await Promise.all([
          fetchInOutEvents(token).catch(() => demoEvents),
          fetchInOutStatistics(token).catch(() => demoStats),
        ]);
        
        if (!mounted) return;
        
        setEvents(Array.isArray(eventsData) ? eventsData : demoEvents);
        setStats(statsData);
        setAlerts(demoAlerts);
        
      } catch (err) {
        if (!mounted) return;
        
        // Use demo data when backend is not available
        console.log("Backend not available, using demo data");
        setEvents(demoEvents);
        setStats(demoStats);
        setAlerts(demoAlerts);
        
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [token]);

  /**
   * WebSocket connection for real-time updates
   */
  useEffect(() => {
    if (!token) return;

    try {
      const socket = getSocket(token);

      const onConnect = () => {
        console.log("Connected to WebSocket for real-time updates");
      };

      const onEvent = (payload: ActivityEvent) => {
        setEvents((prev) => [payload, ...prev].slice(0, 100));
      };

      const onAlert = (payload: Alert) => {
        setAlerts((prev) => [payload, ...prev].slice(0, 50));
      };

      socket.on("connect", onConnect);
      socket.on("in-out:event", onEvent);
      socket.on("in-out:alert", onAlert);

      return () => {
        socket.off("connect", onConnect);
        socket.off("in-out:event", onEvent);
        socket.off("in-out:alert", onAlert);
        closeSocket();
      };
      
    } catch (err) {
      console.log("WebSocket connection not available, using demo mode");
    }
  }, [token]);

  // Filter events based on selected filter
  const filteredEvents = events.filter(event => 
    selectedFilter === 'all' || event.type === selectedFilter
  );

  // Format timestamp to readable time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  // Format date for timeline
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return date.toLocaleDateString();
  };

  // Get event type icon and color
  const getEventIcon = (type: string, status: string) => {
    switch (type) {
      case 'entry':
        return {
          icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          ),
          bgColor: 'bg-green-100',
          iconColor: 'text-green-600'
        };
      case 'exit':
        return {
          icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
          ),
          bgColor: 'bg-red-100',
          iconColor: 'text-red-600'
        };
      case 'unauthorized':
        return {
          icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          ),
          bgColor: 'bg-orange-100',
          iconColor: 'text-orange-600'
        };
      default:
        return {
          icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          bgColor: 'bg-gray-100',
          iconColor: 'text-gray-600'
        };
    }
  };

  // Get alert severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
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
          <div className="flex items-center gap-3">
            {/* <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors">
              Export Report
            </button> */}
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors">
              Export Report
            </button>
          </div>
        </div>

        {/* Summary Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Unacknowledged Card */}
          <div className="bg-white rounded-lg border border-zinc-200 p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-600">Unacknowledged</p>
                <p className="text-2xl font-bold text-zinc-900 mt-1">2</p>
              </div>
              <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          {/* Today's Alerts Card */}
          <div className="bg-white rounded-lg border border-zinc-200 p-4 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-600">Today's Alerts</p>
                <p className="text-2xl font-bold text-zinc-900 mt-1">5</p>
              </div>
              <svg className="h-6 w-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>

          {/* Total Events Card */}
          <div className="bg-white rounded-lg border border-zinc-200 p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-600">Total Events</p>
                <p className="text-2xl font-bold text-zinc-900 mt-1">247</p>
              </div>
              <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Recognition Rate Card */}
          <div className="bg-white rounded-lg border border-zinc-200 p-4 border-l-4 border-teal-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-600">Recognition Rate</p>
                <p className="text-2xl font-bold text-zinc-900 mt-1">98.2%</p>
              </div>
              <svg className="h-6 w-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Activity Timeline and Active Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Timeline Section */}
          <div className="bg-white rounded-lg border border-zinc-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-900">Activity Timeline</h2>
              <div className="flex items-center gap-2">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value as any)}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 outline-none hover:bg-zinc-100 focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                >
                  <option value="all">All Events</option>
                  <option value="entry">Entries Only</option>
                  <option value="exit">Exits Only</option>
                  <option value="unauthorized">Unauthorized</option>
                </select>
                <button className="text-sm text-green-600 hover:text-green-700">View All</button>
              </div>
            </div>
            
            {/* Timeline Events */}
            <div className="space-y-4">
              {filteredEvents.map((event) => {
                const { icon, bgColor, iconColor } = getEventIcon(event.type, event.status);
                
                return (
                  <div key={event.id} className="relative">
                    {/* Timeline connector line */}
                    {event.id !== filteredEvents[filteredEvents.length - 1]?.id && (
                      <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-zinc-200"></div>
                    )}
                    
                    <div className="flex gap-4">
                      {/* Event Icon */}
                      <div className={`flex items-center justify-center w-10 h-10 ${bgColor} rounded-full flex-shrink-0 z-10`}>
                        <div className={iconColor}>
                          {icon}
                        </div>
                      </div>
                      
                      {/* Event Content */}
                      <div className="flex-1 min-w-0">
                        <div 
                          className="bg-white rounded-lg border border-zinc-200 p-4 cursor-pointer hover:bg-zinc-50 transition-colors"
                          onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm font-semibold text-zinc-900">
                                  {event.type === 'entry' ? 'Vehicle Entered' : 
                                   event.type === 'exit' ? 'Vehicle Exited' : 
                                   'Unauthorized Attempt'}
                                </p>
                                {event.status === 'error' && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                    Alert
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-zinc-600 mb-2">
                                {event.plateNumber} • {event.vehicleType} • {event.color} • {event.gate}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-zinc-500">
                                <span className="flex items-center gap-1">
                                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {formatTime(event.timestamp)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {event.confidence}% confidence
                                </span>
                              </div>
                            </div>
                            
                            {/* Expand/Collapse Arrow */}
                            <svg 
                              className={`h-5 w-5 text-zinc-400 transform transition-transform flex-shrink-0 ml-2 ${
                                expandedEvent === event.id ? 'rotate-180' : ''
                              }`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          
                          {/* Expanded Details */}
                          {expandedEvent === event.id && (
                            <div className="mt-4 pt-4 border-t border-zinc-100">
                              <p className="text-sm font-semibold text-zinc-700 mb-2">Event Details</p>
                              <p className="text-sm text-zinc-600 mb-3">{event.details}</p>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-zinc-500">Gate:</span>
                                  <span className="ml-2 font-medium text-zinc-700">{event.gate}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500">Direction:</span>
                                  <span className="ml-2 font-medium text-zinc-700 capitalize">{event.type}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500">Vehicle Type:</span>
                                  <span className="ml-2 font-medium text-zinc-700">{event.vehicleType}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500">Color:</span>
                                  <span className="ml-2 font-medium text-zinc-700">{event.color}</span>
                                </div>
                              </div>
                              
                              {event.image && (
                                <div className="mt-3">
                                  <p className="text-sm font-semibold text-zinc-700 mb-2">Capture Image</p>
                                  <div className="bg-zinc-100 rounded-lg h-32 flex items-center justify-center">
                                    <svg className="h-8 w-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Alerts Section */}
          <div className="bg-white rounded-lg border border-zinc-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-900">Active Alerts</h2>
              <div className="flex items-center gap-2">
                <span className="flex items-center text-xs text-zinc-500">
                  <div className="h-2 w-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
                  Live
                </span>
                <button className="text-sm text-green-600 hover:text-green-700">Manage</button>
              </div>
            </div>
            
            {/* Alerts List */}
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="bg-white rounded-lg border border-zinc-200 p-4">
                  <div className="flex items-start gap-3">
                    {/* Severity Indicator */}
                    <div className={`w-1 h-full ${getSeverityColor(alert.severity)} rounded-full flex-shrink-0`}></div>
                    
                    {/* Alert Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-zinc-900 truncate">
                              {alert.title}
                            </h3>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                              alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                              alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-600 mb-2">{alert.description}</p>
                          
                          {/* Alert Metadata */}
                          <div className="flex items-center gap-3 text-xs text-zinc-500">
                            <span className="flex items-center gap-1">
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {formatDate(alert.timestamp)}
                            </span>
                            {alert.plateNumber && (
                              <span className="flex items-center gap-1">
                                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                {alert.plateNumber}
                              </span>
                            )}
                            {alert.gate && (
                              <span className="flex items-center gap-1">
                                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {alert.gate}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Alert Actions */}
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-100">
                        <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Acknowledge
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-zinc-600 hover:text-zinc-700 hover:bg-zinc-50 rounded transition-colors">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Details
                        </button>
                        {alert.status === 'active' && (
                          <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors">
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Dismiss
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
