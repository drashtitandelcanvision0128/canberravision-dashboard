"use client";

import { AppShell } from "@/components/AppShell";

type ReportCardProps = {
  title: string;
  icon: React.ReactNode;
};

function ReportCard({ title, icon }: ReportCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-zinc-100 p-3 mb-4">
          <div className="h-8 w-8 text-zinc-600">
            {icon}
          </div>
        </div>
        <h3 className="font-semibold text-zinc-900 mb-4">{title}</h3>
        <button className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
          View
        </button>
      </div>
    </div>
  );
}

export default function FireReportsPage() {
  const reportIcon = (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  const reports = [
    { title: "Incident Log", icon: reportIcon },
    { title: "System Health", icon: reportIcon },
    { title: "Response Times", icon: reportIcon },
    { title: "False Positives", icon: reportIcon },
    { title: "Zone Coverage", icon: reportIcon },
    { title: "Maintenance Log", icon: reportIcon }
  ];

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            {/* <h1 className="text-2xl font-bold text-zinc-900">Fire/Smoke Reports</h1>
            <p className="text-zinc-600">Incident history and system logs</p> */}
          </div>
          <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors flex items-center gap-2">
            Export
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, index) => (
            <ReportCard 
              key={index}
              title={report.title}
              icon={report.icon}
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
