"use client";

import { AppShell } from "@/components/AppShell";
import { useMemo, useState } from "react";
import {
  QuickReportForm,
  RecentReportsTable,
  ReportCard,
  type AvailableReport,
  type RecentReport,
} from "@/components/in-out/reports/ReportsUI";

export default function InOutReportsPage() {
  const availableReports = useMemo<AvailableReport[]>(
    () => [
      {
        id: "daily-summary",
        title: "Daily Summary",
        description: "Overview of daily in/out activity with totals and averages",
        lastRunLabel: "Today, 9:00 AM",
        icon: "chart",
      },
      {
        id: "duration",
        title: "Duration Report",
        description: "Analysis of vehicle stay durations and patterns",
        lastRunLabel: "Yesterday, 6:00 PM",
        icon: "clock",
      },
      {
        id: "unauthorized",
        title: "Unauthorized Access",
        description: "List of all unauthorized vehicle entries",
        lastRunLabel: "Today, 8:00 AM",
        icon: "shield",
      },
      {
        id: "peak-hours",
        title: "Peak Hours Analysis",
        description: "Identify busiest entry/exit times",
        lastRunLabel: "Jan 10, 2024",
        icon: "chart",
      },
      {
        id: "vehicle-history",
        title: "Vehicle History",
        description: "Complete history for a specific vehicle",
        lastRunLabel: "Jan 8, 2024",
        icon: "history",
      },
      {
        id: "monthly-trends",
        title: "Monthly Trends",
        description: "Month-over-month comparison of activity",
        lastRunLabel: "Jan 1, 2024",
        icon: "trend",
      },
    ],
    [],
  );

  const [recentReports, setRecentReports] = useState<RecentReport[]>([
    {
      id: "r1",
      name: "Daily Summary",
      dateRange: "Jan 15, 2024",
      generated: "Today, 9:00 AM",
      status: "Completed",
    },
    {
      id: "r2",
      name: "Unauthorized Access",
      dateRange: "Jan 1-15, 2024",
      generated: "Today, 8:00 AM",
      status: "Completed",
    },
    {
      id: "r3",
      name: "Duration Report",
      dateRange: "Jan 14, 2024",
      generated: "Yesterday, 6:00 PM",
      status: "Completed",
    },
    {
      id: "r4",
      name: "Monthly Trends",
      dateRange: "Dec 2023",
      generated: "Jan 1, 2024",
      status: "Completed",
    },
  ]);

  const runReport = (reportId: string) => {
    const report = availableReports.find((r) => r.id === reportId);
    if (!report) return;

    setRecentReports((prev) => [
      {
        id: `r-${Date.now()}`,
        name: report.title,
        dateRange: "Custom",
        generated: "Just now",
        status: "Processing",
      },
      ...prev,
    ]);

    window.setTimeout(() => {
      setRecentReports((prev) =>
        prev.map((r) => (r.name === report.title && r.generated === "Just now" ? { ...r, status: "Completed" } : r)),
      );
    }, 900);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <QuickReportForm onGenerate={() => runReport("daily-summary")} />

        <div>
          <div className="text-sm font-semibold text-zinc-900">Available Reports</div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {availableReports.map((report) => (
              <ReportCard key={report.id} report={report} onRun={runReport} />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-zinc-900">Recent Reports</div>
            <button type="button" className="text-sm font-medium text-green-700 hover:text-green-800">
              View All
            </button>
          </div>

          <RecentReportsTable rows={recentReports} />
        </div>
      </div>
    </AppShell>
  );
}
