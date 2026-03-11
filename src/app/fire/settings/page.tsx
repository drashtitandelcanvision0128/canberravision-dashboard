"use client";

import { AppShell } from "@/components/AppShell";

export default function FireSettingsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          {/* <h1 className="text-2xl font-bold text-zinc-900">Fire / Smoke Settings</h1>
          <p className="text-zinc-600">Configure fire and smoke detection system settings</p> */}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Detection Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Fire Detection Sensitivity</label>
                <select className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Smoke Detection Sensitivity</label>
                <select className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-zinc-300" />
                  <span className="text-sm text-zinc-700">Enable automatic alerts</span>
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-zinc-300" />
                  <span className="text-sm text-zinc-700">Email notifications</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-zinc-300" />
                  <span className="text-sm text-zinc-700">SMS alerts</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-zinc-300" />
                  <span className="text-sm text-zinc-700">Push notifications</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-zinc-300" />
                  <span className="text-sm text-zinc-700">Sound alerts</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
            Save Settings
          </button>
        </div>
      </div>
    </AppShell>
  );
}
