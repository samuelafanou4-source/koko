"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, setUser } = useAppStore();
  const [checking, setChecking] = useState(!user.isAuthenticated);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (cancelled) return;
        if (data?.user) {
          setUser({
            pseudonym: data.user.pseudonym,
            anonId: data.user.anonId,
            role: data.user.role,
            isAuthenticated: true,
          });
          setChecking(false);
          return;
        }
        router.replace("/connexion");
      } catch {
        router.replace("/connexion");
      }
    }
    if (!user.isAuthenticated) {
      check();
    } else {
      setChecking(false);
    }
    return () => {
      cancelled = true;
    };
  }, [router, setUser, user.isAuthenticated]);

  if (checking) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 text-on-surface-variant font-body text-body-md">
        Ouverture de ton espace confidentiel…
      </div>
    );
  }

  return <>{children}</>;
}
