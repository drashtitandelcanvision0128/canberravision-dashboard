"use client";

import { AppShell } from "@/components/AppShell";

type MetricCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
};

function MetricCard({ title, value, icon, iconBg = "bg-blue-100", iconColor = "text-blue-600" }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-zinc-500">{title}</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900">{value}</div>
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

function LiveFeedCard({ title, detections, isLive }: { 
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

export default function FireSmokeDetectionPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <MetricCard
            title="All Clear"
            value="Status"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
          <MetricCard
            title="Active Zones"
            value={12}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            }
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <MetricCard
            title="Fire Alerts"
            value={0}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            }
            iconBg="bg-red-100"
            iconColor="text-red-600"
          />
          <MetricCard
            title="Smoke Alerts"
            value={0}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            }
            iconBg="bg-gray-100"
            iconColor="text-gray-600"
          />
          <MetricCard
            title="Uptime"
            value="99.9%"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
        </div>

        {/* Detection Time Metric */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <MetricCard
            title="Detection Time"
            value="<1s"
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
              title="Warehouse A"
              detections={0}
              isLive
            />
            <LiveFeedCard
              title="Production Floor"
              detections={0}
              isLive
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
