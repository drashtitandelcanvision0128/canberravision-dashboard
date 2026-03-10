"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { 
  AlertTriangle, 
  AlertCircle, 
  Clock,
  CheckCircle,
  Thermometer,
  Flame,
  Zap,
  Droplet,
  Gauge,
  Search,
  Bell
} from 'lucide-react';

export default function UtilityEventsAlertsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const summaryData = [
    { 
      title: "Critical", 
      value: "2", 
      icon: AlertTriangle, 
      color: "red",
      bgColor: "bg-red-100",
      textColor: "text-red-600"
    },
    { 
      title: "Warnings", 
      value: "5", 
      icon: AlertCircle, 
      color: "yellow",
      bgColor: "bg-yellow-100", 
      textColor: "text-yellow-600"
    },
    { 
      title: "Events Today", 
      value: "48", 
      icon: Clock, 
      color: "teal",
      bgColor: "bg-teal-100", 
      textColor: "text-teal-600"
    },
    { 
      title: "Resolved", 
      value: "12", 
      icon: CheckCircle, 
      color: "green",
      bgColor: "bg-green-100", 
      textColor: "text-green-600"
    }
  ];

  const recentEvents = [
    {
      id: 1,
      title: "Temperature #4",
      description: "Reading exceeds threshold: 72.3°F > 70°F",
      time: "2 min ago",
      severity: "critical",
      icon: Thermometer,
      iconColor: "text-red-500",
      bgColor: "bg-red-100"
    },
    {
      id: 2,
      title: "Gas Gauge #3",
      description: "Pressure approaching limit: 85.2 psi",
      time: "15 min ago",
      severity: "warning",
      icon: Flame,
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-100"
    },
    {
      id: 3,
      title: "Electric Meter #1",
      description: "Scheduled reading completed",
      time: "32 min ago",
      severity: "info",
      icon: Zap,
      iconColor: "text-teal-500",
      bgColor: "bg-teal-100"
    },
    {
      id: 4,
      title: "Water Meter #2",
      description: "Anomaly resolved - readings normalized",
      time: "1 hr ago",
      severity: "success",
      icon: Droplet,
      iconColor: "text-green-500",
      bgColor: "bg-green-100"
    },
    {
      id: 5,
      title: "Pressure Gauge #1",
      description: "Unusual fluctuation detected",
      time: "2 hr ago",
      severity: "warning",
      icon: Gauge,
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-100"
    }
  ];

  return (
    <AppShell>
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            {/* <h1 className="text-2xl font-bold text-zinc-900">Events & Alerts</h1>
            <p className="text-zinc-600 mt-1">Utility monitoring notifications</p> */}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="search"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-zinc-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            {/* Notification Bell */}
            <button className="relative p-2.5 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {summaryData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-white rounded-lg border border-zinc-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-600">{item.title}</p>
                    <p className="text-2xl font-bold text-zinc-900 mt-1">{item.value}</p>
                  </div>
                  <div className={`h-8 w-8 rounded-full ${item.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${item.textColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Events Section */}
        <div className="bg-white rounded-lg border border-zinc-200 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Recent Events</h2>
          <div className="space-y-4">
            {recentEvents.map((event) => {
              const Icon = event.icon;
              return (
                <div key={event.id} className="flex items-start space-x-4 p-4 border border-zinc-100 rounded-lg hover:bg-zinc-50 transition-colors">
                  {/* Event Icon */}
                  <div className={`w-10 h-10 rounded-full ${event.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${event.iconColor}`} />
                  </div>
                  
                  {/* Event Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-zinc-900">{event.title}</h3>
                      <span className="text-xs text-zinc-500">{event.time}</span>
                    </div>
                    <p className="text-sm text-zinc-600">{event.description}</p>
                  </div>
                  
                  {/* Severity Indicator */}
                  <div className="flex-shrink-0">
                    {event.severity === 'critical' && (
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                    )}
                    {event.severity === 'warning' && (
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    )}
                    {event.severity === 'info' && (
                      <div className="w-3 h-3 bg-teal-500 rounded-full" />
                    )}
                    {event.severity === 'success' && (
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
