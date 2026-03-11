"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  const [showDateInput, setShowDateInput] = useState(false);
  const [showMeterDropdown, setShowMeterDropdown] = useState(false);
  const [tempStartDate, setTempStartDate] = useState('');
  const [tempEndDate, setTempEndDate] = useState('');

  const dateRef = useRef<HTMLDivElement | null>(null);
  const meterRef = useRef<HTMLDivElement | null>(null);

  const meters = [
    'All Meters',
    'Electric Meter A',
    'Electric Meter B',
    'Water Meter Main',
    'Gas Meter',
    'Temperature Sensor 1',
    'Pressure Sensor 1',
  ];

  const handleDateApply = () => {
    if (tempStartDate && tempEndDate) {
      setSelectedDateRange(`${tempStartDate} to ${tempEndDate}`);
    }
    setShowDateInput(false);
    setTempStartDate('');
    setTempEndDate('');
  };

  const handleDateCancel = () => {
    setShowDateInput(false);
    setTempStartDate('');
    setTempEndDate('');
  };

  useEffect(() => {
    if (!showDateInput && !showMeterDropdown) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (showDateInput && dateRef.current && e.target instanceof Node && !dateRef.current.contains(e.target)) {
        setShowDateInput(false);
      }
      if (showMeterDropdown && meterRef.current && e.target instanceof Node && !meterRef.current.contains(e.target)) {
        setShowMeterDropdown(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowDateInput(false);
        setShowMeterDropdown(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDateInput, showMeterDropdown]);

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
          <div className="relative" ref={dateRef}>
            <button
              onClick={() => setShowDateInput(!showDateInput)}
              className="flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors"
            >
              <Calendar className="w-4 h-4 text-zinc-600" />
              <span className="text-sm text-zinc-700">Date Range</span>
              <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">{selectedDateRange}</span>
            </button>

            {showDateInput && (
              <div className="absolute top-full left-0 mt-2 z-50 w-96 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl ring-1 ring-black/5">
                <div className="p-4 border-b border-zinc-200">
                  <div className="text-sm font-semibold text-zinc-900">Select Date Range</div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={tempStartDate}
                      onChange={(e) => setTempStartDate(e.target.value)}
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={tempEndDate}
                      onChange={(e) => setTempEndDate(e.target.value)}
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleDateApply}
                      className="flex-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      Apply
                    </button>
                    <button
                      onClick={handleDateCancel}
                      className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* All Meters Button */}
          <div className="relative" ref={meterRef}>
            <button
              onClick={() => setShowMeterDropdown(!showMeterDropdown)}
              className="flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors"
            >
              <Filter className="w-4 h-4 text-zinc-600" />
              <span className="text-sm text-zinc-700">All Meters</span>
              <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">{selectedMeter}</span>
            </button>

            {showMeterDropdown && (
              <div className="absolute top-full left-0 mt-2 z-50 w-64 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl ring-1 ring-black/5">
                <div className="max-h-64 overflow-y-auto">
                  {meters.map((meter) => (
                    <button
                      key={meter}
                      onClick={() => {
                        setSelectedMeter(meter);
                        setShowMeterDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-zinc-50 ${
                        selectedMeter === meter ? 'bg-green-50 text-green-700 font-medium' : 'text-zinc-700'
                      }`}
                    >
                      {meter}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
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
