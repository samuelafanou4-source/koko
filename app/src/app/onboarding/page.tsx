"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";

export default function OnboardingPage() {
  const { setUser } = useAppStore();

  const [pseudonym, setPseudonym] = useState("FleurDeBaobab");
  const [password, setPassword] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([
    "FleurDeBaobab",
    "DouceurDeMenthe",
    "PetaleDeLotus",
    "BrinDeKarite",
    "FeuilleDeSauge",
  ]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchSuggestions = async () => {
    setLoadingSuggestions(true);
    try {
      const res = await fetch("/api/auth/pseudonyms");
      const data = await res.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
    } catch {
      // Ignore
    } finally {
      setLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pseudonym.trim() || !password || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudonym: pseudonym.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Impossible de créer ton espace.");
        setSubmitting(false);
        return;
      }

      setUser({
        pseudonym: data.user.pseudonym,
        anonId: data.user.anonId,
        role: data.user.role,
        isAuthenticated: true,
      });

      // Full page load to drop router-cached redirects from the logged-out state
      // (router.refresh() only clears the current route)
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign("/tableau-de-bord");
    } catch {
      setError("Erreur de connexion. Vérifie ta connexion internet.");
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[560px] mx-auto px-margin py-space-md md:py-space-xl flex flex-col gap-space-lg">
      <div className="text-center flex flex-col items-center gap-3">
        {/* Soft Door Emblem */}
        <div className="w-16 h-16 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary text-2xl shadow-xs">
          🌸
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-display text-on-surface font-bold">
            Crée ton espace
          </h1>
          <p className="font-body text-body-md text-on-surface-variant max-w-sm">
            Juste un pseudo. Pas de nom, pas de numéro.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-t-[2.5rem] rounded-b-2xl p-6 md:p-8 shadow-xs border border-outline-variant/30 flex flex-col gap-5">
        {error && (
          <div role="alert" className="p-3.5 rounded-xl bg-error-container text-on-error-container font-label text-label-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Pseudonym Suggestions Chips */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-label text-label-md text-on-surface font-semibold">
                Idées de pseudo
              </p>
              <button
                type="button"
                onClick={fetchSuggestions}
                disabled={loadingSuggestions}
                className="font-label text-label-sm text-primary hover:underline flex items-center gap-1"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
                  refresh
                </span>
                <span>Autres idées</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPseudonym(s)}
                  className={`px-3 py-1.5 rounded-full font-label text-label-sm transition-all border ${
                    pseudonym === s
                      ? "bg-primary text-on-primary font-bold border-primary shadow-xs"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border-outline-variant/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Chosen Pseudonym Input */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="pseudonym"
              className="font-label text-label-sm text-on-surface font-semibold"
            >
              Ton pseudo
            </label>
            <input
              id="pseudonym"
              type="text"
              value={pseudonym}
              onChange={(e) => setPseudonym(e.target.value)}
              placeholder="Ex : FleurDeBaobab"
              required
              minLength={3}
              maxLength={30}
              autoComplete="username"
              className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 font-body text-body-md text-on-surface"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="font-label text-label-sm text-on-surface font-semibold flex items-center justify-between"
            >
              <span>Mot de passe</span>
              <span className="text-label-sm text-on-surface-variant font-normal">
                6 caractères minimum
              </span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 font-body text-body-md text-on-surface"
            />
            <p className="font-body text-body-sm text-on-surface-variant mt-1">
              Retiens-le bien : sans e-mail ni numéro, on ne peut pas le récupérer.
            </p>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={submitting || !pseudonym.trim() || !password}
            className="mt-2 w-full py-3.5 rounded-full bg-primary text-on-primary font-label text-label-md font-semibold hover:bg-primary-container transition-all shadow-xs disabled:opacity-50"
          >
            {submitting ? "Création…" : "Créer mon espace"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-outline-variant/20">
          <p className="font-body text-body-sm text-on-surface-variant">
            Déjà un compte ?{" "}
            <Link
              href="/connexion"
              className="text-primary font-semibold hover:underline"
            >
              Me connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

