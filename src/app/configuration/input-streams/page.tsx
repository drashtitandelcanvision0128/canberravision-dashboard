"use client";

import { AppShell } from "@/components/AppShell";

type StreamCardProps = {
  title: string;
  count: number;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
};

function StreamCard({ title, count, iconBg, iconColor, icon }: StreamCardProps) {
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

type StreamTableProps = {
  streams: Array<{
    id: string;
    name: string;
    type: string;
    endpoint: string;
    resolution: string;
    status: "online" | "offline";
  }>;
};

function StreamsTable({ streams }: StreamTableProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-200">
        <h3 className="text-lg font-semibold text-zinc-900">All Input Streams</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Endpoint
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Resolution
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
            {streams.map((stream) => (
              <tr key={stream.id} className="hover:bg-zinc-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-zinc-900">{stream.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-zinc-900">{stream.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-zinc-900">{stream.endpoint}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-zinc-900">{stream.resolution}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    stream.status === 'online' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {stream.status}
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

export default function InputStreamsPage() {
  // Sample data for the streams
  const streams = [
    {
      id: "1",
      name: "Camera 01 - Main Entrance",
      type: "RTSP",
      endpoint: "rtsp://192.168.1.101:554/stream",
      resolution: "1920x1080",
      status: "online" as const
    },
    {
      id: "2", 
      name: "Camera 02 - Parking Lot",
      type: "RTSP",
      endpoint: "rtsp://192.168.1.102:554/stream",
      resolution: "1920x1080",
      status: "online" as const
    },
    {
      id: "3",
      name: "Camera 03 - Lobby",
      type: "JPEG",
      endpoint: "http://192.168.1.103:8080/jpeg",
      resolution: "1280x720",
      status: "offline" as const
    },
    {
      id: "4",
      name: "Camera 04 - Corridor",
      type: "RTSP", 
      endpoint: "rtsp://192.168.1.104:554/stream",
      resolution: "1920x1080",
      status: "online" as const
    },
    {
      id: "5",
      name: "Camera 05 - Exit Gate",
      type: "JPEG",
      endpoint: "http://192.168.1.105:8080/jpeg", 
      resolution: "1280x720",
      status: "online" as const
    }
  ];

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Input Streams</h1>
            <p className="text-zinc-600">Configure RTSP and JPEG camera streams</p>
          </div>
          <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors">
            Add Stream
          </button>
        </div>

        {/* Stream Type Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <StreamCard
            title="RTSP Cameras"
            count={3}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            }
          />
          <StreamCard
            title="JPEG Cameras"
            count={2}
            iconBg="bg-green-100"
            iconColor="text-green-600"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
        </div>

        {/* Streams Table */}
        <StreamsTable streams={streams} />
      </div>
    </AppShell>
  );
}
