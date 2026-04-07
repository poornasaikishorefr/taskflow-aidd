"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, loading, logout } = useAuth();
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  const onLogout = useCallback(async () => {
    setLogoutError(null);
    setLoggingOut(true);
    try {
      await logout();
    } catch (err) {
      setLogoutError(err instanceof Error ? err.message : "Failed to log out");
    } finally {
      setLoggingOut(false);
    }
  }, [logout]);

  const displayName = user?.displayName ?? user?.email ?? "Account";

  return (
    <header className="border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/15 dark:bg-black/40">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-zinc-900 hover:opacity-90 dark:text-zinc-50"
          >
            TaskFlow
          </Link>
          <nav className="hidden items-center gap-3 sm:flex">
            <Link
              href="/dashboard"
              className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
            >
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-5 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          ) : user ? (
            <>
              <span className="hidden text-sm text-zinc-700 dark:text-zinc-300 sm:inline">
                {displayName}
              </span>
              <button
                type="button"
                onClick={onLogout}
                disabled={loggingOut}
                className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/15 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
              >
                {loggingOut ? "Logging out…" : "Logout"}
              </button>
            </>
          ) : (
            <Link
              href="/"
              className="text-sm font-medium text-zinc-900 hover:opacity-90 dark:text-zinc-50"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>

      {logoutError ? (
        <div className="mx-auto w-full max-w-6xl px-4 pb-3 text-sm text-red-600 sm:px-6">
          {logoutError}
        </div>
      ) : null}
    </header>
  );
}

