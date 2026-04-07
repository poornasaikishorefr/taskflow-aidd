"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [loading, user, router]);

  return (
    <div className="flex w-full flex-1 items-center justify-center px-4 py-16 sm:px-6">
      <div className="w-full max-w-2xl rounded-2xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/15 dark:bg-zinc-950">
        <h1 className="text-3xl font-semibold tracking-tight">TaskFlow</h1>
        <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-300">
          Create, organize, and track tasks with email/password authentication
          and Firestore persistence.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Go to dashboard
          </Link>
          <div className="text-sm text-zinc-600 dark:text-zinc-300">
            {loading
              ? "Checking session…"
              : user
                ? "Redirecting you to your dashboard…"
                : "Sign in is not built yet — add an auth page when ready."}
          </div>
        </div>
      </div>
    </div>
  );
}
