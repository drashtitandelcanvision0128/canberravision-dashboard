"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { 
  FileText, 
  TrendingUp, 
  BarChart3, 
  Activity,
  AlertTriangle,
  Settings,
  Calendar,
  Filter,
  Download,
  Search,
  Bell
} from 'lucide-react';

export default function UtilityReportsPage() {
  const [selectedDateRange, setSelectedDateRange] = useState('Last 7 Days');
  const [selectedMeter, setSelectedMeter] = useState('All Meters');

  const reportCards = [
    {
      title: "Daily Summary",
      description: "View detailed daily summary for all configured meters and gauges.",
      icon: FileText,
      color: "blue"
    },
    {
      title: "Weekly Trends", 
      description: "View detailed weekly trends for all configured meters and gauges.",
      icon: TrendingUp,
      color: "green"
    },
    {
      title: "Monthly Analysis",
      description: "View detailed monthly analysis for all configured meters and gauges.",
      icon: BarChart3,
      color: "purple"
    },
    {
      title: "Consumption Report",
      description: "View detailed consumption report for all configured meters and gauges.",
      icon: Activity,
      color: "orange"
    },
    {
      title: "Anomaly Report",
      description: "View detailed anomaly report for all configured meters and gauges.",
      icon: AlertTriangle,
      color: "red"
    },
    {
      title: "Maintenance Log",
      description: "View detailed maintenance log for all configured meters and gauges.",
      icon: Settings,
      color: "gray"
    }
  ];

  const getIconColor = (color: string) => {
    const colors = {
      blue: "text-blue-600",
      green: "text-green-600", 
      purple: "text-purple-600",
      orange: "text-orange-600",
      red: "text-red-600",
      gray: "text-gray-600"
    };
    return colors[color as keyof typeof colors] || "text-gray-600";
  };

  const getIconBgColor = (color: string) => {
    const colors = {
      blue: "bg-blue-100",
      green: "bg-green-100",
      purple: "bg-purple-100", 
      orange: "bg-orange-100",
      red: "bg-red-100",
      gray: "bg-gray-100"
    };
    return colors[color as keyof typeof colors] || "bg-gray-100";
  };

  return (
    <AppShell>
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            {/* <h1 className="text-2xl font-bold text-zinc-900">Utility Reports</h1>
            <p className="text-zinc-600 mt-1">Meter reading history and analytics</p> */}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="search"
                placeholder="Search reports..."
                className="w-64 pl-10 pr-4 py-2 border border-zinc-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            {/* Notification Icon */}
            <button className="relative p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            
            {/* Export Report Button */}
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-3 mb-6">
          {/* Date Range Button */}
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors">
            <Calendar className="w-4 h-4 text-zinc-600" />
            <span className="text-sm text-zinc-700">Date Range</span>
            <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">{selectedDateRange}</span>
          </button>
          
          {/* All Meters Button */}
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors">
            <Filter className="w-4 h-4 text-zinc-600" />
            <span className="text-sm text-zinc-700">All Meters</span>
            <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">{selectedMeter}</span>
          </button>
        </div>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportCards.map((report, index) => {
            const Icon = report.icon;
            return (
              <div key={index} className="bg-white rounded-lg border border-zinc-200 p-6 hover:shadow-lg transition-shadow">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg ${getIconBgColor(report.color)} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${getIconColor(report.color)}`} />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">{report.title}</h3>
                
                {/* Description */}
                <p className="text-sm text-zinc-600 mb-4 leading-relaxed">{report.description}</p>
                
                {/* View Report Button */}
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <FileText className="w-4 h-4" />
                  View Report
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
