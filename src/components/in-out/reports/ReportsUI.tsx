"use client";

import { useState } from "react";

export type AvailableReport = {
  id: string;
  title: string;
  description: string;
  lastRunLabel: string;
  icon: "chart" | "clock" | "shield" | "history" | "trend";
};

export type RecentReport = {
  id: string;
  name: string;
  dateRange: string;
  generated: string;
  status: "Completed" | "Processing" | "Failed";
};

function Icon({ name }: { name: AvailableReport["icon"] }) {
  const base = "h-5 w-5";

  if (name === "chart") {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19V5m0 14h16M8 17V9m4 8V7m4 10v-4" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l8 4v6c0 5-3 9-8 10-5-1-8-5-8-10V7l8-4z" />
      </svg>
    );
  }

  if (name === "history") {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v5l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }

  return (
    <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17l6-6 4 4 8-8" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 7h7v7" />
    </svg>
  );
}

function StatusPill({ status }: { status: RecentReport["status"] }) {
  const styles =
    status === "Completed"
      ? "bg-green-100 text-green-700"
      : status === "Processing"
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-700";

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles}`}>{status}</span>;
}

export function ReportCard({ report, onRun }: { report: AvailableReport; onRun: (id: string) => void }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
            <Icon name={report.icon} />
          </div>
          <div>
            <div className="text-sm font-semibold text-zinc-900">{report.title}</div>
            <div className="mt-1 text-xs text-zinc-600">{report.description}</div>
            <div className="mt-2 text-xs text-zinc-500">Last run: {report.lastRunLabel}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onRun(report.id)}
          className="text-sm font-medium text-green-700 hover:text-green-800"
        >
          Run
        </button>
      </div>
    </div>
  );
}

function ExportButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16V4m0 12l-4-4m4 4l4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20h16" />
      </svg>
      Export
    </button>
  );
}

export function RecentReportsTable({ rows }: { rows: RecentReport[] }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-zinc-200 text-xs font-semibold text-zinc-600">
            <th className="py-3 pr-6">Report Name</th>
            <th className="py-3 pr-6">Date Range</th>
            <th className="py-3 pr-6">Generated</th>
            <th className="py-3 pr-6">Status</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-zinc-800">
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-zinc-100 last:border-b-0">
              <td className="py-4 pr-6 font-medium text-zinc-900">{r.name}</td>
              <td className="py-4 pr-6 text-xs text-zinc-600">{r.dateRange}</td>
              <td className="py-4 pr-6 text-xs text-zinc-600">{r.generated}</td>
              <td className="py-4 pr-6">
                <StatusPill status={r.status} />
              </td>
              <td className="py-4">
                <ExportButton onClick={() => {}} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function QuickReportForm({ onGenerate }: { onGenerate: () => void }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [camera, setCamera] = useState("all");
  const [vehicleType, setVehicleType] = useState("all");

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold text-zinc-900">Quick Report</div>

      <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:flex-nowrap">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap xl:flex-nowrap">
          <div className="relative w-full sm:w-56">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="h-10 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-700 outline-none hover:bg-zinc-100 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            />
          </div>

          <div className="hidden text-sm text-zinc-500 sm:block">to</div>

          <div className="relative w-full sm:w-56">
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="h-10 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-700 outline-none hover:bg-zinc-100 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center xl:flex-nowrap">
          <div className="relative w-full sm:w-44">
            <select
              value={camera}
              onChange={(e) => setCamera(e.target.value)}
              className="h-10 w-full appearance-none rounded-lg border border-zinc-200 bg-zinc-50 px-3 pr-9 text-sm text-zinc-700 outline-none hover:bg-zinc-100 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            >
              <option value="all">All Cameras</option>
              <option value="gate-a">Gate A</option>
              <option value="gate-b">Gate B</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative w-full sm:w-44">
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="h-10 w-full appearance-none rounded-lg border border-zinc-200 bg-zinc-50 px-3 pr-9 text-sm text-zinc-700 outline-none hover:bg-zinc-100 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            >
              <option value="all">All Vehicles</option>
              <option value="sedan">Authorized only </option>
              <option value="suv">Unauthorized only </option>
             
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <button
            type="button"
            onClick={onGenerate}
            className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-green-600 px-4 text-sm font-medium text-white hover:bg-green-700 sm:w-auto"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18l-7 8v6l-4 2v-8L3 4z" />
            </svg>
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}
