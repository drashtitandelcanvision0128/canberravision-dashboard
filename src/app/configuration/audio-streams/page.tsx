"use client";

import { AppShell } from "@/components/AppShell";

type AudioMetricCardProps = {
  title: string;
  count: number;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
};

function AudioMetricCard({ title, count, iconBg, iconColor, icon }: AudioMetricCardProps) {
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

type AudioStreamTableProps = {
  streams: Array<{
    id: string;
    name: string;
    type: string;
    endpoint: string;
    format: string;
    status: "active" | "inactive";
  }>;
};

function AudioStreamsTable({ streams }: AudioStreamTableProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-200">
        <h3 className="text-lg font-semibold text-zinc-900">All Audio Streams</h3>
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
                Format
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
                  <div className="text-sm text-zinc-900">{stream.format}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    stream.status === 'active' 
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

export default function AudioStreamsPage() {
  // Sample data for the audio streams
  const streams = [
    {
      id: "1",
      name: "Microphone 01 - Entrance",
      type: "RTMP",
      endpoint: "rtmp://192.168.1.201:1935/live/audio1",
      format: "AAC",
      status: "active" as const
    },
    {
      id: "2", 
      name: "Microphone 02 - Lobby",
      type: "RTMP",
      endpoint: "rtmp://192.168.1.202:1935/live/audio2",
      format: "AAC",
      status: "active" as const
    },
    {
      id: "3",
      name: "Microphone 03 - Parking",
      type: "WebRTC",
      endpoint: "webrtc://192.168.1.203:8080/audio3",
      format: "OPUS",
      status: "inactive" as const
    },
    {
      id: "4",
      name: "Microphone 04 - Corridor",
      type: "RTMP", 
      endpoint: "rtmp://192.168.1.204:1935/live/audio4",
      format: "AAC",
      status: "active" as const
    },
    {
      id: "5",
      name: "Microphone 05 - Exit Gate",
      type: "WebRTC",
      endpoint: "webrtc://192.168.1.205:8080/audio5", 
      format: "OPUS",
      status: "active" as const
    }
  ];

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Audio Streams</h1>
            <p className="text-zinc-600">Configure RTMP and WebRTC audio streams</p>
          </div>
          <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors">
            Add Audio Stream
          </button>
        </div>

        {/* Audio Stream Type Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AudioMetricCard
            title="RTMP Streams"
            count={3}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            }
          />
          <AudioMetricCard
            title="WebRTC Streams"
            count={2}
            iconBg="bg-green-100"
            iconColor="text-green-600"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            }
          />
        </div>

        {/* Audio Streams Table */}
        <AudioStreamsTable streams={streams} />
      </div>
    </AppShell>
  );
}
