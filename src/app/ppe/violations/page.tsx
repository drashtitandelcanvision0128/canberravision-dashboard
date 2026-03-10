"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { 
  AlertTriangle, 
  Search, 
  Filter,
  Calendar,
  User,
  MapPin,
  Eye,
  Download,
  Shield,
  XCircle
} from 'lucide-react';

export default function PPEViolationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');

  const violations = [
    {
      id: 1,
      worker: 'John Smith',
      employeeId: 'EMP001',
      zone: 'Construction Area A',
      violation: 'Missing Helmet',
      severity: 'high',
      time: '2024-03-05 10:30 AM',
      camera: 'Camera 1',
      status: 'unresolved',
      description: 'Worker entered construction area without proper head protection'
    },
    {
      id: 2,
      worker: 'Mike Johnson',
      employeeId: 'EMP002',
      zone: 'Warehouse Section B',
      violation: 'No Safety Vest',
      severity: 'medium',
      time: '2024-03-05 10:15 AM',
      camera: 'Camera 3',
      status: 'resolved',
      description: 'Worker not wearing high-visibility vest in warehouse area'
    },
    {
      id: 3,
      worker: 'Sarah Williams',
      employeeId: 'EMP003',
      zone: 'Loading Dock',
      violation: 'Missing Safety Glasses',
      severity: 'low',
      time: '2024-03-05 09:45 AM',
      camera: 'Camera 4',
      status: 'unresolved',
      description: 'Worker operating machinery without eye protection'
    },
    {
      id: 4,
      worker: 'Robert Brown',
      employeeId: 'EMP004',
      zone: 'Construction Area A',
      violation: 'No Safety Vest',
      severity: 'medium',
      time: '2024-03-05 09:30 AM',
      camera: 'Camera 2',
      status: 'resolved',
      description: 'Worker in construction zone without high-visibility clothing'
    },
    {
      id: 5,
      worker: 'Emily Davis',
      employeeId: 'EMP005',
      zone: 'Warehouse Section B',
      violation: 'Missing Helmet',
      severity: 'high',
      time: '2024-03-05 09:15 AM',
      camera: 'Camera 3',
      status: 'unresolved',
      description: 'Worker entered restricted area without head protection'
    },
    {
      id: 6,
      worker: 'David Wilson',
      employeeId: 'EMP006',
      zone: 'Manufacturing Floor',
      violation: 'Improper Footwear',
      severity: 'medium',
      time: '2024-03-05 08:45 AM',
      camera: 'Camera 1',
      status: 'resolved',
      description: 'Worker wearing open-toed shoes in manufacturing area'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'resolved' 
      ? 'bg-green-100 text-green-800'
      : 'bg-orange-100 text-orange-800';
  };

  const filteredViolations = violations.filter(violation => {
    const matchesSearch = violation.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         violation.violation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         violation.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || violation.severity === selectedSeverity;
    const matchesZone = selectedZone === 'all' || violation.zone === selectedZone;
    
    return matchesSearch && matchesSeverity && matchesZone;
  });

  const stats = {
    total: violations.length,
    high: violations.filter(v => v.severity === 'high').length,
    medium: violations.filter(v => v.severity === 'medium').length,
    low: violations.filter(v => v.severity === 'low').length,
    resolved: violations.filter(v => v.status === 'resolved').length,
    unresolved: violations.filter(v => v.status === 'unresolved').length
  };

  return (
    <AppShell>
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">PPE Violations</h1>
              <p className="text-zinc-600">Track and manage safety violations</p>
            </div>
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              Export Violations
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-600">Total</p>
                  <p className="text-xl font-bold text-zinc-900">{stats.total}</p>
                </div>
                <AlertTriangle className="w-5 h-5 text-zinc-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-600">High</p>
                  <p className="text-xl font-bold text-red-600">{stats.high}</p>
                </div>
                <XCircle className="w-5 h-5 text-red-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-600">Medium</p>
                  <p className="text-xl font-bold text-yellow-600">{stats.medium}</p>
                </div>
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-600">Low</p>
                  <p className="text-xl font-bold text-blue-600">{stats.low}</p>
                </div>
                <AlertTriangle className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-600">Resolved</p>
                  <p className="text-xl font-bold text-green-600">{stats.resolved}</p>
                </div>
                <Shield className="w-5 h-5 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-600">Pending</p>
                  <p className="text-xl font-bold text-orange-600">{stats.unresolved}</p>
                </div>
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-zinc-200 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search violations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900 placeholder-zinc-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <select 
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-3 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
              >
                <option value="all">All Severities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              
              <select 
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="px-3 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
              >
                <option value="all">All Zones</option>
                <option value="Construction Area A">Construction Area A</option>
                <option value="Warehouse Section B">Warehouse Section B</option>
                <option value="Loading Dock">Loading Dock</option>
                <option value="Manufacturing Floor">Manufacturing Floor</option>
              </select>
            </div>
          </div>

          {/* Violations Table */}
          <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 border-b border-zinc-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Worker</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Violation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Zone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {filteredViolations.map((violation) => (
                    <tr key={violation.id} className="hover:bg-zinc-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center">
                            <User className="w-4 h-4 text-zinc-600" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-zinc-900">{violation.worker}</p>
                            <p className="text-xs text-zinc-500">{violation.employeeId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-zinc-900">{violation.violation}</p>
                          <p className="text-xs text-zinc-500">{violation.camera}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-zinc-900">
                          <MapPin className="w-4 h-4 mr-1 text-zinc-500" />
                          {violation.zone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(violation.severity)}`}>
                          {violation.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-zinc-500" />
                          {violation.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(violation.status)}`}>
                          {violation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-2">
                          <button className="text-zinc-600 hover:text-zinc-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-zinc-600 hover:text-zinc-900">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
