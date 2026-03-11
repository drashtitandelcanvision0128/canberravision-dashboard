"use client";

import { AppShell } from "@/components/AppShell";
import { useState } from "react";

function TabButton({ active, onClick, children }: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        active
          ? "bg-zinc-900 text-white"
          : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
      }`}
    >
      {children}
    </button>
  );
}

function ToggleSwitch({ label, description, checked, onChange }: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-zinc-900">{label}</div>
        <div className="text-sm text-zinc-600">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-zinc-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

export default function PeopleSettingsPage() {
  const [activeTab, setActiveTab] = useState("zones");
  const [directionTracking, setDirectionTracking] = useState(true);
  const [capacityAlerts, setCapacityAlerts] = useState(true);

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          {/* <h1 className="text-2xl font-bold text-zinc-900">People Detection Settings</h1>
          <p className="text-zinc-600">Configure counting zones and thresholds</p> */}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1">
          <TabButton
            active={activeTab === "zones"}
            onClick={() => setActiveTab("zones")}
          >
            Zones
          </TabButton>
          <TabButton
            active={activeTab === "counting"}
            onClick={() => setActiveTab("counting")}
          >
            Counting
          </TabButton>
          <TabButton
            active={activeTab === "alerts"}
            onClick={() => setActiveTab("alerts")}
          >
            Alerts
          </TabButton>
        </div>

        {/* Tab Content */}
        {activeTab === "zones" && (
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-blue-100 p-3">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-zinc-900">Detection Zones</h2>
                <p className="text-sm text-zinc-600">Configure zones for people counting</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "counting" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-green-100 p-3">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">Counting Settings</h2>
                  <p className="text-sm text-zinc-600">Configure counting parameters and accuracy</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="rounded-full bg-blue-100 p-3">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">Direction Tracking</h2>
                  <p className="text-sm text-zinc-600">Track entry and exit directions</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <ToggleSwitch
                  label="Enable Direction Tracking"
                  description="Track whether people are entering or exiting"
                  checked={directionTracking}
                  onChange={setDirectionTracking}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "alerts" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-red-100 p-3">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">Alert Configuration</h2>
                  <p className="text-sm text-zinc-600">Configure alert thresholds and notifications</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="rounded-full bg-orange-100 p-3">
                  <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">Capacity Alerts</h2>
                  <p className="text-sm text-zinc-600">Alert when capacity limits are reached</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <ToggleSwitch
                  label="Enable Capacity Alerts"
                  description="Send alerts when maximum capacity is reached"
                  checked={capacityAlerts}
                  onChange={setCapacityAlerts}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
