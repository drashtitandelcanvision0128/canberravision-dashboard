"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";

export default function SettingsProfilePage() {
  const [fullName, setFullName] = useState("Admin User");
  const [email, setEmail] = useState("admin@company.com");

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Profile</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Update your basic account details.</div>
          </div>
          <Link
            href="/settings"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-white/5"
          >
            Back
          </Link>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-zinc-950">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">Full name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {}}
                className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
