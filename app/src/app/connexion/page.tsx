"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";

export default function ConnexionPage() {
  const { setUser } = useAppStore();

  const [pseudonym, setPseudonym] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pseudonym.trim() || !password || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudonym: pseudonym.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Pseudonyme ou mot de passe incorrect.");
        setLoading(false);
        return;
      }

      setUser({
        pseudonym: data.user.pseudonym,
        anonId: data.user.anonId,
        role: data.user.role,
        isAuthenticated: true,
      });

      // Full page load: the client router cache may still hold the
      // "redirect to /connexion" answers prefetched while she was logged out
      const next = new URLSearchParams(window.location.search).get("next");
      const target =
        next && next.startsWith("/") && !next.startsWith("//")
          ? next
          : "/tableau-de-bord";
      window.location.assign(target);
    } catch {
      setError("Erreur de connexion réseau.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[500px] mx-auto px-margin py-space-md md:py-space-xl flex flex-col gap-space-lg">
      <div className="text-center flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary text-2xl shadow-xs">
          🚪
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-display text-on-surface font-bold">
            Rebonjour
          </h1>
          <p className="font-body text-body-md text-on-surface-variant">
            Frappe à la porte et retrouve ton espace intime confidentiel.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-t-[2.5rem] rounded-b-2xl p-6 md:p-8 shadow-xs border border-outline-variant/30 flex flex-col gap-5">
        {error && (
          <div className="p-3.5 rounded-xl bg-error-container text-on-error-container font-label text-label-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="pseudonym"
              className="font-label text-label-sm text-on-surface font-semibold"
            >
              Ton pseudonyme poétique :
            </label>
            <input
              id="pseudonym"
              type="text"
              value={pseudonym}
              onChange={(e) => setPseudonym(e.target.value)}
              placeholder="Ex : FleurDeBaobab"
              required
              className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary font-body text-body-md text-on-surface"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="font-label text-label-sm text-on-surface font-semibold"
            >
              Mot de passe secret :
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary font-body text-body-md text-on-surface"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !pseudonym.trim() || !password}
            className="mt-2 w-full py-3.5 rounded-full bg-primary text-on-primary font-label text-label-md font-semibold hover:bg-primary-container transition-all shadow-xs disabled:opacity-50"
          >
            {loading ? "Vérification..." : "Ouvrir la porte"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-outline-variant/20">
          <p className="font-body text-body-sm text-on-surface-variant">
            Tu n&apos;as pas encore de refuge ?{" "}
            <Link
              href="/onboarding"
              className="text-primary font-semibold hover:underline"
            >
              Créer mon espace gratuit
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

