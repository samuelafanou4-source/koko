"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { postAuthTarget } from "@/lib/post-auth";

const REASON_MESSAGES: Record<string, string> = {
  expiree: "Ta session a expiré, reconnecte-toi.",
  inactivite: "Tu as été déconnectée après un moment sans activité, pour protéger ton intimité.",
};

export default function LoginForm() {
  const setUser = useAppStore((state) => state.setUser);

  const [pseudonym, setPseudonym] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const reason = new URLSearchParams(window.location.search).get("raison");
    if (reason && REASON_MESSAGES[reason]) setNotice(REASON_MESSAGES[reason]);
  }, []);

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
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Pseudo ou mot de passe incorrect.");
        setPassword("");
        setLoading(false);
        return;
      }

      setUser({
        pseudonym: data.user.pseudonym,
        anonId: data.user.anonId,
        role: data.user.role,
        isAuthenticated: true,
      });

      // Full page load: drops anything the client router cached while logged out.
      // replace(): the Back button must not return to the login form.
      window.location.replace(postAuthTarget(window.location.search));
    } catch {
      setError("Connexion impossible. Vérifie ton accès à internet.");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 font-body text-body-md text-on-surface";

  return (
    <div className="w-full max-w-[500px] mx-auto px-margin py-space-md md:py-space-xl flex flex-col gap-space-lg">
      <div className="text-center flex flex-col items-center gap-3">
        <div aria-hidden="true" className="w-14 h-14 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary text-2xl">
          🚪
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-display text-on-surface font-bold">Rebonjour</h1>
          <p className="font-body text-body-md text-on-surface-variant">
            Ton pseudo et ton mot de passe, rien d&apos;autre.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-t-[2.5rem] rounded-b-2xl p-6 md:p-8 shadow-xs border border-outline-variant/30 flex flex-col gap-5">
        {notice && !error && (
          <div role="status" className="p-3.5 rounded-xl bg-secondary-fixed/60 text-on-surface font-label text-label-md flex items-start gap-2">
            <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-secondary">schedule</span>
            <span>{notice}</span>
          </div>
        )}
        {error && (
          <div role="alert" className="p-3.5 rounded-xl bg-error-container text-on-error-container font-label text-label-md">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pseudonym" className="font-label text-label-md text-on-surface font-semibold">
              Ton pseudo
            </label>
            <input
              id="pseudonym"
              name="username"
              type="text"
              value={pseudonym}
              onChange={(e) => setPseudonym(e.target.value)}
              placeholder="Ex : FleurDeBaobab"
              required
              maxLength={60}
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="font-label text-label-md text-on-surface font-semibold">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                maxLength={200}
                autoComplete="current-password"
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                aria-pressed={showPassword}
                aria-controls="password"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !pseudonym.trim() || !password}
            className="mt-2 w-full py-3.5 rounded-full bg-primary text-on-primary font-label text-label-lg font-semibold hover:bg-primary-container transition-all shadow-xs disabled:opacity-50"
          >
            {loading ? "Connexion…" : "Me connecter"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-outline-variant/20">
          <p className="font-body text-body-md text-on-surface-variant">
            Pas encore d&apos;espace ?{" "}
            <Link href="/onboarding" className="text-primary font-semibold hover:underline">
              Créer mon espace
            </Link>
          </p>
        </div>
      </div>

      <details className="group rounded-2xl bg-surface-container-low border border-outline-variant/40 px-5 py-4">
        <summary className="cursor-pointer list-none flex items-center justify-between gap-3 font-label text-label-md text-on-surface">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-primary">help</span>
            Mot de passe oublié ?
          </span>
          <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform group-open:rotate-180">
            expand_more
          </span>
        </summary>
        <div className="mt-3 flex flex-col gap-2 font-body text-body-sm text-on-surface-variant">
          <p>
            Koko ne connaît ni ton numéro ni ton e-mail : il n&apos;y a donc pas de
            récupération par SMS ou par e-mail, et personne ne peut le réinitialiser pour toi.
          </p>
          <p>
            Si tu l&apos;as oublié, crée un nouvel espace avec un autre pseudo. L&apos;ancien
            reste fermé : personne ne peut y entrer sans ton mot de passe.
          </p>
        </div>
      </details>
    </div>
  );
}
