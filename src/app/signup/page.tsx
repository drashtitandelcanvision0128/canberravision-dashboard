"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { setCookie } from "@/lib/cookies";
import { signup } from "@/lib/api";

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupPageInner />
    </Suspense>
  );
}

function SignupPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextPath = useMemo(() => {
    return searchParams.get("next") || "/dashboard";
  }, [searchParams]);

  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@company.com");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-6">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-zinc-900">Create account</h1>
          <p className="text-sm text-zinc-500">Canberra Monitoring System</p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setLoading(true);
            try {
              const data = await signup({
                name,
                email,
                username,
                password,
              });

              const token = data.accessToken || data.token;
              if (!token) {
                throw new Error("Signup succeeded but token not found in response");
              }

              setCookie(AUTH_COOKIE_NAME, token, 1);
              router.push(nextPath);
            } catch (err) {
              const message = err instanceof Error ? err.message : "Signup failed";
              setError(message);
            } finally {
              setLoading(false);
            }
          }}
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700">Name</label>
            <input
              className="h-10 rounded-md border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700">Email</label>
            <input
              className="h-10 rounded-md border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@company.com"
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700">Username</label>
            <input
              className="h-10 rounded-md border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700">Password</label>
            <input
              className="h-10 rounded-md border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
            />
          </div>

          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="h-10 rounded-md bg-zinc-900 text-sm font-medium text-black hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            {loading ? "Creating..." : "Create account"}
          </button>

          <button
            type="button"
            className="h-10 rounded-md border border-zinc-200 bg-white text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            onClick={() => {
              setCookie(AUTH_COOKIE_NAME, "demo", 1);
              router.push("/dashboard");
            }}
          >
            Open Dashboard (Demo)
          </button>

          <div className="text-center text-sm text-zinc-600">
            Already have an account?{" "}
            <Link className="font-medium text-zinc-900 hover:underline" href={`/login?next=${encodeURIComponent(nextPath)}`}>
              Sign in
            </Link>
          </div>

          <div className="text-xs text-zinc-500">
          {/* API: {process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"} */}
          </div>
        </form>
      </div>
    </div>
  );
}
