"use client";

import { AppShell } from "@/components/AppShell";

type MetricCardProps = {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    color: "green" | "red";
  };
  icon?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
};

function MetricCard({ title, value, trend, icon, iconBg = "bg-blue-100", iconColor = "text-blue-600" }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-zinc-500">{title}</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900">{value}</div>
          {trend && (
            <div className={`mt-1 text-xs font-medium ${
              trend.color === "green" ? "text-green-600" : "text-red-600"
            }`}>
              {trend.value}
            </div>
          )}
        </div>
        {icon && (
          <div className={`rounded-full p-3 ${iconBg}`}>
            <div className={`h-6 w-6 ${iconColor}`}>{icon}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function ActiveMonitoringCard({ title, detections, isLive }: { 
  title: string; 
  detections: number;
  isLive?: boolean;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      <div className="p-4 border-b border-zinc-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-zinc-900">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {detections} detections
            </span>
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              isLive ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}>
              {isLive ? "Live" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <div className="aspect-video bg-zinc-900 flex items-center justify-center">
        <svg className="h-16 w-16 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  );
}

export default function UtilityReaderPage() {
  const recentReadings = [
    { id: 1, parameter: "Temperature", value: "24.5", unit: "°C", location: "Utility Room A", time: "2 mins ago", status: "normal" },
    { id: 2, parameter: "Pressure", value: "2.1", unit: "bar", location: "Boiler Room", time: "5 mins ago", status: "normal" },
    { id: 3, parameter: "Electricity", value: "145.2", unit: "kWh", location: "Main Panel", time: "8 mins ago", status: "normal" },
    { id: 4, parameter: "Water Flow", value: "12.8", unit: "L/min", location: "Utility Room B", time: "12 mins ago", status: "normal" },
    { id: 5, parameter: "Gas", value: "85.3", unit: "m³", location: "Gas Room", time: "15 mins ago", status: "normal" },
    { id: 6, parameter: "Humidity", value: "45.2", unit: "%", location: "Server Room", time: "18 mins ago", status: "normal" },
    { id: 7, parameter: "Voltage", value: "230.1", unit: "V", location: "Main Panel", time: "22 mins ago", status: "normal" },
    { id: 8, parameter: "Current", value: "15.3", unit: "A", location: "Main Panel", time: "25 mins ago", status: "normal" },
  ];

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          <MetricCard
            title="Active Meters"
            value={24}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <MetricCard
            title="Readings Today"
            value="1,247"
            trend={{ value: "+12%", color: "green" }}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
          <MetricCard
            title="Anomalies"
            value={3}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
            iconBg="bg-yellow-100"
            iconColor="text-yellow-600"
          />
          <MetricCard
            title="Critical"
            value={0}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            iconBg="bg-red-100"
            iconColor="text-red-600"
          />
          <MetricCard
            title="Accuracy"
            value="99.2%"
            trend={{ value: "+0.3%", color: "green" }}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
          />
          <MetricCard
            title="Read Interval"
            value="5 min"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            iconBg="bg-orange-100"
            iconColor="text-orange-600"
          />
        </div>

        {/* Active Monitoring and Recent Readings */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Active Monitoring */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-900">Active Monitoring</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Cameras
              </button>
            </div>
            <div className="space-y-4">
              <ActiveMonitoringCard
                title="Utility Room A"
                detections={12}
                isLive
              />
              <ActiveMonitoringCard
                title="Boiler Room"
                detections={8}
                isLive
              />
            </div>
          </div>

          {/* Recent Readings */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-900">Recent Readings</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Readings
              </button>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-50 border-b border-zinc-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Parameter</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Value</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Location</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {recentReadings.map((reading) => (
                      <tr key={reading.id} className="hover:bg-zinc-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-zinc-900">{reading.parameter}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-zinc-900">
                            {reading.value} <span className="text-zinc-500">{reading.unit}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-zinc-500">{reading.location}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-zinc-500">{reading.time}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
