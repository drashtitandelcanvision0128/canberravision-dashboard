"use client";

import { AppShell } from "@/components/AppShell";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PeoplePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the dashboard
    router.replace("/people/dashboard");
  }, [router]);

  return (
    <AppShell>
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-zinc-600">Redirecting to People Detection Dashboard...</p>
        </div>
      </div>
    </AppShell>
  );
}
