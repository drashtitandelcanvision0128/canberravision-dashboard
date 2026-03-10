"use client";

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { 
  Users, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Camera,
  Video,
  AlertTriangle,
  Shield,
  Eye
} from 'lucide-react';

export default function PPEDetectionPage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Key metrics data
  const totalWorkers = 156;
  const compliantWorkers = 142;
  const violations = 14;
  const complianceRate = ((compliantWorkers / totalWorkers) * 100).toFixed(1);

  // Zone compliance data
  const zoneCompliance = [
    { 
      id: 'A', 
      name: 'Construction Area A', 
      compliance: 92.5, 
      compliant: 48, 
      violations: 4,
      total: 52
    },
    { 
      id: 'B', 
      name: 'Warehouse Section B', 
      compliance: 88.2, 
      compliant: 45, 
      violations: 6,
      total: 51
    },
    { 
      id: 'C', 
      name: 'Loading Dock', 
      compliance: 95.1, 
      compliant: 39, 
      violations: 2,
      total: 41
    },
    { 
      id: 'D', 
      name: 'Manufacturing Floor', 
      compliance: 90.8, 
      compliant: 10, 
      violations: 2,
      total: 12
    }
  ];

  // Recent violations data
  const recentViolations = [
    { 
      id: 1, 
      worker: 'John Smith', 
      zone: 'Construction Area A', 
      violation: 'Missing Helmet', 
      severity: 'high',
      time: '2 min ago'
    },
    { 
      id: 2, 
      worker: 'Mike Johnson', 
      zone: 'Warehouse Section B', 
      violation: 'No Safety Vest', 
      severity: 'medium',
      time: '5 min ago'
    },
    { 
      id: 3, 
      worker: 'Sarah Williams', 
      zone: 'Loading Dock', 
      violation: 'Missing Safety Glasses', 
      severity: 'low',
      time: '8 min ago'
    },
    { 
      id: 4, 
      worker: 'Robert Brown', 
      zone: 'Construction Area A', 
      violation: 'No Safety Vest', 
      severity: 'medium',
      time: '12 min ago'
    },
    { 
      id: 5, 
      worker: 'Emily Davis', 
      zone: 'Warehouse Section B', 
      violation: 'Missing Helmet', 
      severity: 'high',
      time: '15 min ago'
    }
  ];

  // Camera feeds data
  const cameras = [
    { id: 1, name: 'Camera 1', zone: 'Construction Area A' },
    { id: 2, name: 'Camera 2', zone: 'Construction Area A' },
    { id: 3, name: 'Camera 3', zone: 'Warehouse Section B' },
    { id: 4, name: 'Camera 4', zone: 'Loading Dock' }
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

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'low':
        return <AlertTriangle className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <AppShell>
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600">Total Workers</p>
                  <p className="text-2xl font-bold text-zinc-900 mt-1">{totalWorkers}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600">Compliant</p>
                  <p className="text-2xl font-bold text-zinc-900 mt-1">{compliantWorkers}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600">Violations</p>
                  <p className="text-2xl font-bold text-zinc-900 mt-1">{violations}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600">Compliance Rate</p>
                  <p className="text-2xl font-bold text-zinc-900 mt-1">{complianceRate}%</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Zone Compliance Status */}
            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">Zone Compliance Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {zoneCompliance.map((zone) => {
                  const isGoodCompliance = zone.compliance >= 90;
                  
                  return (
                    <div 
                      key={zone.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedZone === zone.id ? 'border-green-500 bg-green-50' : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                      onClick={() => setSelectedZone(zone.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-zinc-900">{zone.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Camera className="w-4 h-4 text-zinc-500" />
                          <span className="text-sm text-zinc-500">{zone.compliance > 90 ? '2' : '1'}</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-zinc-600">Compliance</span>
                          <span className={`font-medium ${isGoodCompliance ? 'text-green-600' : 'text-yellow-600'}`}>
                            {zone.compliance}%
                          </span>
                        </div>
                        <div className="w-full bg-zinc-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              isGoodCompliance ? 'bg-green-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${zone.compliance}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-600">
                          <span className="font-medium text-green-600">{zone.compliant}</span> compliant
                        </span>
                        <span className="text-zinc-600">
                          <span className="font-medium text-red-600">{zone.violations}</span> violations
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Violations */}
            <div>
              <div className="bg-white rounded-lg border border-zinc-200 p-4">
                <h2 className="text-lg font-semibold text-zinc-900 mb-4">Recent Violations</h2>
                <div className="space-y-3">
                  {recentViolations.map((violation) => (
                    <div key={violation.id} className="flex items-start space-x-3 py-2 border-b border-zinc-100 last:border-0">
                      <div className="mt-1">
                        {getSeverityIcon(violation.severity)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-zinc-900 truncate">{violation.worker}</p>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getSeverityColor(violation.severity)}`}>
                            {violation.severity}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 mb-1">{violation.violation}</p>
                        <p className="text-xs text-zinc-500">{violation.zone} • {violation.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live Camera Feeds */}
          <div>
            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">Live Camera Feeds</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cameras.map((camera) => (
                  <div key={camera.id} className="relative">
                    <div className="bg-zinc-900 rounded-lg aspect-video flex items-center justify-center">
                      <Video className="w-12 h-12 text-zinc-600" />
                    </div>
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span>Live</span>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {camera.name}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {camera.zone}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
