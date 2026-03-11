"use client";

import { AppShell } from "@/components/AppShell";

type ScheduleCardProps = {
  title: string;
  count: number;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
};

function ScheduleCard({ title, count, iconBg, iconColor, icon }: ScheduleCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-zinc-900">{title}</h3>
          <p className="text-3xl font-bold text-zinc-900 mt-1">{count}</p>
        </div>
        <div className={`rounded-full p-3 ${iconBg}`}>
          <div className={`h-8 w-8 ${iconColor}`}>{icon}</div>
        </div>
      </div>
    </div>
  );
}

type ScheduleTableProps = {
  schedules: Array<{
    id: string;
    name: string;
    module: string;
    timeRange: string;
    days: string;
    status: "active" | "inactive";
  }>;
};

function ScheduleTable({ schedules }: ScheduleTableProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-200">
        <h3 className="text-lg font-semibold text-zinc-900">All Schedules</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Module
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Time Range
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Days
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
            {schedules.map((schedule) => (
              <tr key={schedule.id} className="hover:bg-zinc-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-zinc-900">{schedule.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-zinc-900">{schedule.module}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-zinc-900">{schedule.timeRange}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-zinc-900">{schedule.days}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    schedule.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {schedule.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-3">
                    <button className="text-blue-600 hover:text-blue-900 font-medium flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900 font-medium flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  // Sample data for the schedules
  const schedules = [
    {
      id: "1",
      name: "Business Hours",
      module: "In / Out Detection",
      timeRange: "09:00 - 18:00",
      days: "Mon - Fri",
      status: "active" as const
    },
    {
      id: "2", 
      name: "Weekend Monitoring",
      module: "Parking Detection",
      timeRange: "10:00 - 22:00",
      days: "Sat - Sun",
      status: "active" as const
    },
    {
      id: "3",
      name: "Night Security",
      module: "People Detection",
      timeRange: "22:00 - 06:00",
      days: "Daily",
      status: "inactive" as const
    },
    {
      id: "4",
      name: "PPE Compliance Check",
      module: "PPE Detection", 
      timeRange: "08:00 - 17:00",
      days: "Mon - Fri",
      status: "active" as const
    },
    {
      id: "5",
      name: "Fire Safety Monitoring",
      module: "Fire / Smoke Detection",
      timeRange: "24/7",
      days: "Daily",
      status: "active" as const
    }
  ];

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            {/* <h1 className="text-2xl font-bold text-zinc-900">Schedule</h1>
            <p className="text-zinc-600">Configure time-based rules and schedules</p> */}
          </div>
          <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors">
            Add Schedule
          </button>
        </div>

        {/* Schedule Status Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ScheduleCard
            title="Active Schedules"
            count={4}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <ScheduleCard
            title="Inactive Schedules"
            count={1}
            iconBg="bg-red-100"
            iconColor="text-red-600"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        {/* Schedules Table */}
        <ScheduleTable schedules={schedules} />
      </div>
    </AppShell>
  );
}
