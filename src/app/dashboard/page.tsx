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

function MetricCard({ title, value, trend, icon, iconBg = "bg-green-100", iconColor = "text-green-600" }: MetricCardProps) {
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

function CameraFeed({ title, location, isLive }: { title: string; location: string; isLive?: boolean }) {
  return (
    <div className="relative rounded-lg border border-zinc-200 bg-zinc-900 overflow-hidden">
      <div className="aspect-video flex items-center justify-center text-zinc-600">
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
        <div className="text-xs font-medium text-white">{title}</div>
        <div className="text-xs text-zinc-300">{location}</div>
      </div>
      <div className="absolute top-2 right-2">
        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
          isLive ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          {isLive ? "Live" : "Offline"}
        </span>
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, time, iconBg, iconColor }: { 
  icon: React.ReactNode; 
  title: string; 
  time: string;
  iconBg?: string;
  iconColor?: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-zinc-100 last:border-b-0">
      <div className={`rounded-full p-2 ${iconBg} flex-shrink-0 mt-0.5`}>
        <div className={`h-4 w-4 ${iconColor}`}>{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-zinc-900">{title}</div>
        <div className="text-xs text-zinc-500 mt-0.5">{time}</div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <MetricCard
            title="Total Vehicles Today"
            value={247}
            trend={{ value: "+12%", color: "green" }}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            }
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
          <MetricCard
            title="Parking Occupancy"
            value="78%"
            trend={{ value: "+5%", color: "green" }}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            }
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
          <MetricCard
            title="PPE Compliance"
            value="94%"
            trend={{ value: "-2%", color: "red" }}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
          <MetricCard
            title="Active Cameras"
            value="3/4"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            }
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
          <MetricCard
            title="Active Alerts"
            value={5}
            icon={
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            }
            iconBg="bg-yellow-100"
            iconColor="text-yellow-600"
          />
          <MetricCard
            title="System Health"
            value="98%"
            icon={
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            }
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
        </div>

        {/* Live Cameras */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-zinc-900">Live Cameras</h2>
            <a href="#" className="text-sm text-green-600 hover:text-green-700">View All</a>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CameraFeed title="Gate A - Entry" location="Main Entrance" isLive />
            <CameraFeed title="Gate B - Exit" location="Rear Exit" isLive />
            <CameraFeed title="Parking Lot 1" location="North Parking" isLive />
            <CameraFeed title="Loading Dock" location="Warehouse" />
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-3">Recent Activity</h2>
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="space-y-0">
              <ActivityItem
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Vehicle ABC-1234 entered Gate A"
                time="2 min ago"
                iconBg="bg-green-100"
                iconColor="text-green-600"
              />
              <ActivityItem
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                }
                title="Unauthorized vehicle detected at Gate B"
                time="5 min ago"
                iconBg="bg-red-100"
                iconColor="text-red-600"
              />
              <ActivityItem
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Parking slot P-12 now occupied"
                time="8 min ago"
                iconBg="bg-green-100"
                iconColor="text-green-600"
              />
              <ActivityItem
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                }
                title="PPE violation detected in Zone C"
                time="12 min ago"
                iconBg="bg-red-100"
                iconColor="text-red-600"
              />
              <ActivityItem
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Vehicle XYZ-5678 exited Gate A"
                time="15 min ago"
                iconBg="bg-green-100"
                iconColor="text-green-600"
              />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
