"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { 
  FileText, 
  Download, 
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  Shield,
  AlertTriangle
} from 'lucide-react';

export default function PPEReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedReport, setSelectedReport] = useState('compliance');

  const reportData = {
    compliance: {
      title: 'PPE Compliance Report',
      description: 'Overall compliance trends and statistics',
      data: [
        { period: 'Mon', compliance: 94.2, violations: 8 },
        { period: 'Tue', compliance: 91.8, violations: 12 },
        { period: 'Wed', compliance: 93.5, violations: 9 },
        { period: 'Thu', compliance: 89.2, violations: 16 },
        { period: 'Fri', compliance: 90.8, violations: 14 },
        { period: 'Sat', compliance: 95.1, violations: 6 },
        { period: 'Sun', compliance: 96.3, violations: 4 }
      ]
    },
    violations: {
      title: 'Violation Analysis',
      description: 'Detailed breakdown of PPE violations',
      data: [
        { type: 'Missing Helmet', count: 45, percentage: 35.2 },
        { type: 'No Safety Vest', count: 38, percentage: 29.7 },
        { type: 'Missing Safety Glasses', count: 28, percentage: 21.9 },
        { type: 'Improper Footwear', count: 17, percentage: 13.3 }
      ]
    },
    zones: {
      title: 'Zone Performance',
      description: 'Compliance by monitoring zones',
      data: [
        { zone: 'Construction Area A', compliance: 92.5, workers: 52 },
        { zone: 'Warehouse Section B', compliance: 88.2, workers: 51 },
        { zone: 'Loading Dock', compliance: 95.1, workers: 41 },
        { zone: 'Manufacturing Floor', compliance: 90.8, workers: 12 }
      ]
    }
  };

  const currentReport = reportData[selectedReport as keyof typeof reportData];

  // Type guards for different report types
  const isComplianceData = (data: any): data is { period: string; compliance: number; violations: number; }[] => {
    return selectedReport === 'compliance' && data.length > 0 && 'period' in data[0];
  };

  const isViolationData = (data: any): data is { type: string; count: number; percentage: number; }[] => {
    return selectedReport === 'violations' && data.length > 0 && 'type' in data[0];
  };

  const isZoneData = (data: any): data is { zone: string; compliance: number; workers: number; }[] => {
    return selectedReport === 'zones' && data.length > 0 && 'zone' in data[0];
  };

  return (
    <AppShell>
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">PPE Reports</h1>
              <p className="text-zinc-600">Generate and analyze PPE compliance reports</p>
            </div>
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-zinc-200 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-zinc-500" />
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="rounded-lg border border-zinc-300 px-3 py-2 text-sm bg-white text-zinc-900"
                >
                  <option value="day">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-zinc-500" />
                <select 
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="rounded-lg border border-zinc-300 px-3 py-2 text-sm bg-white text-zinc-900"
                >
                  <option value="compliance">Compliance Report</option>
                  <option value="violations">Violation Analysis</option>
                  <option value="zones">Zone Performance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Report Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Report */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-zinc-200 p-6">
                <h2 className="text-lg font-semibold text-zinc-900 mb-2">{currentReport.title}</h2>
                <p className="text-sm text-zinc-600 mb-6">{currentReport.description}</p>
                
                {selectedReport === 'compliance' && isComplianceData(currentReport.data) && (
                  <div className="space-y-4">
                    {currentReport.data.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-sm font-medium text-zinc-900">{item.period}</span>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-sm font-medium text-zinc-900">{item.compliance}%</p>
                            <p className="text-xs text-zinc-500">compliance</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-zinc-900">{item.violations}</p>
                            <p className="text-xs text-zinc-500">violations</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedReport === 'violations' && isViolationData(currentReport.data) && (
                  <div className="space-y-4">
                    {currentReport.data.map((item, index) => (
                      <div key={index} className="p-4 bg-zinc-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-zinc-900">{item.type}</span>
                          <span className="text-sm font-bold text-zinc-900">{item.count}</span>
                        </div>
                        <div className="w-full bg-zinc-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">{item.percentage}% of total violations</p>
                      </div>
                    ))}
                  </div>
                )}

                {selectedReport === 'zones' && isZoneData(currentReport.data) && (
                  <div className="space-y-4">
                    {currentReport.data.map((item, index) => (
                      <div key={index} className="p-4 bg-zinc-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-sm font-medium text-zinc-900">{item.zone}</h3>
                            <p className="text-xs text-zinc-500">{item.workers} workers monitored</p>
                          </div>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            item.compliance >= 90 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.compliance >= 90 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {item.compliance}%
                          </div>
                        </div>
                        <div className="w-full bg-zinc-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.compliance >= 90 ? 'bg-green-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${item.compliance}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-zinc-200 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-600">Total Workers</p>
                    <p className="text-lg font-bold text-zinc-900">156</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-zinc-200 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-600">Avg Compliance</p>
                    <p className="text-lg font-bold text-zinc-900">91.8%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-zinc-200 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-600">Total Violations</p>
                    <p className="text-lg font-bold text-zinc-900">69</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-zinc-200 p-4">
                <h3 className="text-sm font-semibold text-zinc-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Generate PDF Report
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors">
                    <Download className="w-4 h-4 inline mr-2" />
                    Export to Excel
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Schedule Reports
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
