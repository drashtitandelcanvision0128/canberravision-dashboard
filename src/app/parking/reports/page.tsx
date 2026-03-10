"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { 
  BarChart2, 
  Calendar, 
  Clock, 
  PieChart, 
  MapPin, 
  Car, 
  Download,
  FileText,
  TrendingUp
} from 'lucide-react';

export default function ParkingReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const availableReports = [
    {
      id: 'daily-occupancy',
      title: 'Daily Occupancy Report',
      description: 'Summary of parking occupancy rates throughout the day',
      frequency: 'Daily',
      lastRun: 'Today, 6:00 AM',
      icon: BarChart2,
      color: 'green'
    },
    {
      id: 'weekly-usage',
      title: 'Weekly Usage Analysis',
      description: 'Detailed analysis of parking usage patterns by zone',
      frequency: 'Weekly',
      lastRun: 'Monday, 7:00 AM',
      icon: Calendar,
      color: 'blue'
    },
    {
      id: 'peak-hours',
      title: 'Peak Hours Report',
      description: 'Analysis of busiest parking hours and capacity utilization',
      frequency: 'Daily',
      lastRun: 'Today, 6:00 AM',
      icon: Clock,
      color: 'orange'
    },
    {
      id: 'zone-utilization',
      title: 'Zone Utilization Report',
      description: 'Comparison of parking efficiency across different zones',
      frequency: 'Weekly',
      lastRun: 'Monday, 7:00 AM',
      icon: MapPin,
      color: 'purple'
    },
    {
      id: 'duration-analysis',
      title: 'Duration Analysis',
      description: 'Average parking duration and turnover rates analysis',
      frequency: 'Monthly',
      lastRun: 'Nov 1, 6:00 AM',
      icon: TrendingUp,
      color: 'red'
    },
    {
      id: 'vehicle-distribution',
      title: 'Vehicle Type Distribution',
      description: 'Breakdown of parking by vehicle types and categories',
      frequency: 'Weekly',
      lastRun: 'Monday, 7:00 AM',
      icon: Car,
      color: 'indigo'
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Daily Occupancy Report - Nov 15, 2024',
      date: 'Nov 15, 2024',
      time: '6:00 AM',
      size: '2.4 MB',
      status: 'ready'
    },
    {
      id: 2,
      name: 'Weekly Usage Analysis - Nov 11-15, 2024',
      date: 'Nov 15, 2024',
      time: '7:00 AM',
      size: '8.7 MB',
      status: 'ready'
    },
    {
      id: 3,
      name: 'Peak Hours Report - Nov 14, 2024',
      date: 'Nov 14, 2024',
      time: '6:00 AM',
      size: '1.8 MB',
      status: 'ready'
    },
    {
      id: 4,
      name: 'Zone Utilization Report - Week 45, 2024',
      date: 'Nov 11, 2024',
      time: '7:00 AM',
      size: '5.2 MB',
      status: 'ready'
    },
    {
      id: 5,
      name: 'Duration Analysis - October 2024',
      date: 'Nov 1, 2024',
      time: '6:00 AM',
      size: '3.9 MB',
      status: 'ready'
    },
    {
      id: 6,
      name: 'Vehicle Type Distribution - Week 44, 2024',
      date: 'Nov 4, 2024',
      time: '7:00 AM',
      size: '2.1 MB',
      status: 'ready'
    }
  ];

  const getIconColor = (color: string) => {
    const colors = {
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <AppShell>
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="flex justify-end items-center mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700 transition-colors">
            <BarChart2 className="w-5 h-5" />
            <span>Generate Custom Report</span>
          </button>
        </div>

        {/* Available Reports */}
        <div className="mb-8">
          <div className="text-sm font-semibold text-zinc-900 mb-4">Available Reports</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableReports.map((report) => {
              const Icon = report.icon;
              return (
                <div 
                  key={report.id}
                  className={`bg-white rounded-lg border border-zinc-200 p-6 flex items-start space-x-4 cursor-pointer transition-all hover:shadow-md hover:bg-zinc-50 ${
                    selectedReport === report.id ? 'ring-2 ring-green-500' : ''
                  }`}
                  onClick={() => setSelectedReport(report.id)}
                >
                  <div className={`p-3 rounded-full ${getIconColor(report.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-zinc-900">{report.title}</h3>
                    <p className="text-zinc-600 text-sm mb-2">{report.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-zinc-500">
                      <span className="bg-zinc-100 px-2 py-1 rounded text-zinc-700">{report.frequency}</span>
                      <span className="text-zinc-500">Last: {report.lastRun}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Reports */}
        <div>
          <div className="text-sm font-semibold text-zinc-900 mb-4">Recent Reports</div>
          <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Generated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-zinc-200">
                {recentReports.map((report) => (
                  <tr key={report.id} className="hover:bg-zinc-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-zinc-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-zinc-900">
                            {report.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-zinc-900">{report.date}</div>
                      <div className="text-xs text-zinc-500">{report.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                      {report.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
