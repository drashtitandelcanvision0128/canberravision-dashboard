"use client";

import { AppShell } from "@/components/AppShell";

type ZoneCardProps = {
  title: string;
  count: number;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
};

function ZoneCard({ title, count, iconBg, iconColor, icon }: ZoneCardProps) {
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

type ZoneTableProps = {
  zones: Array<{
    id: string;
    name: string;
    cameras: number;
    modules: string[];
    status: "active" | "inactive";
  }>;
};

function ZonesTable({ zones }: ZoneTableProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-200">
        <h3 className="text-lg font-semibold text-zinc-900">All Zones</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Zone Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Cameras
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Detection Modules
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
            {zones.map((zone) => (
              <tr key={zone.id} className="hover:bg-zinc-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-zinc-900">{zone.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-zinc-900">{zone.cameras}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {zone.modules.map((module, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    zone.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {zone.status}
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

export default function ZonesPage() {
  // Sample data for the zones
  const zones = [
    {
      id: "1",
      name: "Main Entrance",
      cameras: 3,
      modules: ["In/Out Detection", "People Detection"],
      status: "active" as const
    },
    {
      id: "2",
      name: "Parking Lot A",
      cameras: 5,
      modules: ["Parking Detection", "In/Out Detection"],
      status: "active" as const
    },
    {
      id: "3",
      name: "Production Area",
      cameras: 8,
      modules: ["PPE Detection", "People Detection"],
      status: "active" as const
    },
    {
      id: "4",
      name: "Warehouse Zone",
      cameras: 6,
      modules: ["In/Out Detection", "Utility Reader"],
      status: "active" as const
    },
    {
      id: "5",
      name: "Office Floor",
      cameras: 4,
      modules: ["People Detection", "Fire/Smoke"],
      status: "inactive" as const
    },
    {
      id: "6",
      name: "Loading Dock",
      cameras: 2,
      modules: ["In/Out Detection", "Parking Detection"],
      status: "active" as const
    }
  ];

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            {/* <h1 className="text-2xl font-bold text-zinc-900">Zones</h1>
            <p className="text-zinc-600">Configure monitoring zones and detection areas</p> */}
          </div>
          <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors">
            Add Zone
          </button>
        </div>

        {/* Zone Type Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ZoneCard
            title="Total Zones"
            count={6}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            }
          />
          <ZoneCard
            title="Active Zones"
            count={5}
            iconBg="bg-green-100"
            iconColor="text-green-600"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <ZoneCard
            title="Total Cameras"
            count={28}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            }
          />
        </div>

        {/* Zones Table */}
        <ZonesTable zones={zones} />

        {/* Zone Map Section */}
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-200">
            <h3 className="text-lg font-semibold text-zinc-900">Zone Map</h3>
          </div>
          <div className="p-6">
            <div className="bg-zinc-100 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-zinc-200 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="h-8 w-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <p className="text-zinc-600 font-medium">Interactive Zone Map</p>
                <p className="text-zinc-500 text-sm mt-1">Visual representation of monitoring zones will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
