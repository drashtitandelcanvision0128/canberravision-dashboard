"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";

export default function SettingsPasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = () => {
    if (!newPassword || !confirmPassword) {
      setError("Please enter a new password and confirm it.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    setError(null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Password</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Change your account password.</div>
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
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">Current password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">New password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">Confirm new password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100"
              />
            </div>

            {error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
                {error}
              </div>
            ) : null}

            <div className="pt-2">
              <button
                type="button"
                onClick={onSubmit}
                className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Update password
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
