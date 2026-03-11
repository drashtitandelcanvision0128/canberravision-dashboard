"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useDarkMode } from "@/contexts/DarkModeContext";

export default function SettingsThemePage() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Theme</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Choose how the dashboard looks.</div>
          </div>
          <Link
            href="/settings"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-white/5"
          >
            Back
          </Link>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-zinc-950">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Dark mode</div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Toggle dark mode for the entire dashboard.</div>
            </div>

            <button
              type="button"
              onClick={toggleDarkMode}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                isDarkMode ? "bg-green-600" : "bg-zinc-300"
              }`}
              aria-label="Toggle dark mode"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
            Current: {isDarkMode ? "Dark" : "Light"}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
