"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AUTH_COOKIE_NAME, isTokenExpired } from "@/lib/auth";
import { getCookie } from "@/lib/cookies";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie(AUTH_COOKIE_NAME);
    if (token && !isTokenExpired(token)) {
      router.replace("/dashboard");
      return;
    }
    router.replace("/login");
  }, [router]);

  return null;
}
