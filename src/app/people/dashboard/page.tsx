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

function LiveFeedCard({ title, location, detections, isLive }: { 
  title: string; 
  location: string; 
  detections: number;
  isLive?: boolean;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      <div className="p-4 border-b border-zinc-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-zinc-900">{title}</h3>
            {location && <p className="text-sm text-zinc-500">{location}</p>}
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

export default function PeopleDetectionPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">People Detection</h1>
          <p className="text-zinc-600">Real-time people counting and direction tracking</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          <MetricCard
            title="Total Count"
            value={247}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <MetricCard
            title="Entered"
            value={142}
            trend={{ value: "+12%", color: "green" }}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            }
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
          <MetricCard
            title="Exited"
            value={105}
            trend={{ value: "+8%", color: "green" }}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            }
            iconBg="bg-red-100"
            iconColor="text-red-600"
          />
          <MetricCard
            title="Currently Inside"
            value={37}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
          />
          <MetricCard
            title="% vs Yesterday"
            value="+18%"
            trend={{ value: "+18%", color: "green" }}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
          <MetricCard
            title="Peak Hour"
            value="12:30"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            iconBg="bg-orange-100"
            iconColor="text-orange-600"
          />
        </div>

        {/* Live Feeds */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zinc-900">Live Feeds</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All Cameras
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <LiveFeedCard
              title="Main Entrance Lobby"
              location=""
              detections={12}
              isLive
            />
            <LiveFeedCard
              title="Side Entrance East Wing"
              location=""
              detections={5}
              isLive
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
