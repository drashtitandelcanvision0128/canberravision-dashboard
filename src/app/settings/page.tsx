"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";

function SettingsCard({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-950 dark:hover:bg-white/5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-base font-semibold text-zinc-900 group-hover:text-zinc-900 dark:text-zinc-100">
            {title}
          </div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{description}</div>
        </div>
        <div className="shrink-0 rounded-lg bg-zinc-100 p-2 text-zinc-700 transition-colors group-hover:bg-zinc-200 dark:bg-white/10 dark:text-zinc-200 dark:group-hover:bg-white/15">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <SettingsCard href="/settings/profile" title="Profile" description="Manage your name, email and basic user details." />
          <SettingsCard href="/settings/password" title="Password" description="Change your password and improve account security." />
          <SettingsCard href="/settings/theme" title="Theme" description="Switch between light and dark mode for the dashboard." />
        </div>

        <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-zinc-950">
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Quick Tips</div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Use these settings to manage your dashboard experience. More options can be added here later.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
