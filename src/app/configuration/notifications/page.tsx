"use client";

import { AppShell } from "@/components/AppShell";

type NotificationCardProps = {
  title: string;
  count: number;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
};

function NotificationCard({ title, count, iconBg, iconColor, icon }: NotificationCardProps) {
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

type NotificationTableProps = {
  notifications: Array<{
    id: string;
    type: string;
    channel: string;
    recipients: string;
    status: "enabled" | "disabled";
  }>;
};

function NotificationTable({ notifications }: NotificationTableProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-200">
        <h3 className="text-lg font-semibold text-zinc-900">All Notifications</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Channel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Recipients
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
            {notifications.map((notification) => (
              <tr key={notification.id} className="hover:bg-zinc-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-zinc-900">{notification.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-zinc-900">{notification.channel}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-zinc-900">{notification.recipients}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    notification.status === 'enabled' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {notification.status}
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

export default function NotificationsPage() {
  // Sample data for the notifications
  const notifications = [
    {
      id: "1",
      type: "Security Alert",
      channel: "Email",
      recipients: "admin@company.com",
      status: "enabled" as const
    },
    {
      id: "2", 
      type: "System Error",
      channel: "SMS",
      recipients: "+1234567890",
      status: "enabled" as const
    },
    {
      id: "3",
      type: "PPE Violation",
      channel: "Push",
      recipients: "Safety Team",
      status: "disabled" as const
    },
    {
      id: "4",
      type: "Fire Detection",
      channel: "Email",
      recipients: "emergency@company.com",
      status: "enabled" as const
    },
    {
      id: "5",
      type: "Parking Full",
      channel: "In-App",
      recipients: "Facility Manager",
      status: "enabled" as const
    }
  ];

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Notifications</h1>
            <p className="text-zinc-600">Configure notification channels and settings</p>
          </div>
          <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors">
            Add Notification
          </button>
        </div>

        {/* Notification Status Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <NotificationCard
            title="Enabled Notifications"
            count={4}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            }
          />
          <NotificationCard
            title="Disabled Notifications"
            count={1}
            iconBg="bg-red-100"
            iconColor="text-red-600"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            }
          />
        </div>

        {/* Notifications Table */}
        <NotificationTable notifications={notifications} />
      </div>
    </AppShell>
  );
}
