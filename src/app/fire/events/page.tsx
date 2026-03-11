"use client";

import { AppShell } from "@/components/AppShell";

function AlertCard({ title, value, subtitle, icon, iconBg, iconColor, trend }: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  trend?: {
    value: string;
    color: "green" | "red";
  };
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-zinc-500">{title}</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900">{value}</div>
          {subtitle && <div className="text-sm text-zinc-600 mt-1">{subtitle}</div>}
          {trend && (
            <div className={`mt-2 text-sm font-medium ${
              trend.color === "green" ? "text-green-600" : "text-red-600"
            }`}>
              {trend.value}
            </div>
          )}
        </div>
        <div className={`rounded-full p-3 ${iconBg}`}>
          <div className={`h-6 w-6 ${iconColor}`}>{icon}</div>
        </div>
      </div>
    </div>
  );
}

export default function FireEventsAlertsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          {/* <h1 className="text-2xl font-bold text-zinc-900">Events & Alerts</h1>
          <p className="text-zinc-600">Fire and smoke detection monitoring</p> */}
        </div>

        {/* Alert Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AlertCard
            title="Fire Alerts"
            value={3}
            subtitle="Active alerts"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            }
            iconBg="bg-red-100"
            iconColor="text-red-600"
            trend={{ value: "+2 new today", color: "red" }}
          />
          
          <AlertCard
            title="Smoke Detected"
            value={8}
            subtitle="Total events"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            }
            iconBg="bg-orange-100"
            iconColor="text-orange-600"
            trend={{ value: "+3 from yesterday", color: "red" }}
          />
          
          <AlertCard
            title="False Alarms"
            value={2}
            subtitle="This week"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
            iconBg="bg-yellow-100"
            iconColor="text-yellow-600"
            trend={{ value: "-50% improvement", color: "green" as const }}
          />
          
          <AlertCard
            title="Avg Response"
            value="1.2 min"
            subtitle="Response time"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            iconBg="bg-green-100"
            iconColor="text-green-600"
            trend={{ value: "-25% improvement", color: "green" as const }}
          />
        </div>

        {/* Recent Events Table */}
        <div className="rounded-xl border border-zinc-200 bg-white">
          <div className="p-6 border-b border-zinc-200">
            <h2 className="text-lg font-semibold text-zinc-900">Recent Fire Events</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">10:45 AM</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">Fire Detected</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">Kitchen Area</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      Critical
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">View</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">10:32 AM</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">Smoke Detected</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">Storage Room</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                      Warning
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">View</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">10:15 AM</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">False Alarm</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">Conference Room</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Resolved
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
