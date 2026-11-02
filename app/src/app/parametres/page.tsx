"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { AuthGate } from "@/components/auth/AuthGate";

export default function ParametresPage() {
  const { user, isDiscreetMode, toggleDiscreetMode, clearLocalTraces, logout } =
    useAppStore();

  const [deleting, setDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [clearToast, setClearToast] = useState(false);
  const [sessions, setSessions] = useState<{ id: string; createdAt: string; expiresAt: string }[]>([]);

  useEffect(() => {
    fetch("/api/auth/sessions")
      .then((res) => (res.ok ? res.json() : { sessions: [] }))
      .then((data) => setSessions(data.sessions || []))
      .catch(() => {});
  }, []);

  const handleClearTraces = () => {
    clearLocalTraces();
    setClearToast(true);
    setTimeout(() => setClearToast(false), 3000);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore
    }
    logout();
    // Full reload on purpose: router.refresh() only clears the current route
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.assign("/");
  };

  const handleDeleteAllData = async () => {
    setDeleting(true);
    try {
      const res = await fetch("/api/auth/delete-data", {
        method: "DELETE",
      });
      if (res.ok) {
        clearLocalTraces();
        setDeleteSuccess(true);
        setTimeout(() => {
          // Full reload on purpose: router.refresh() only clears the current route
          // eslint-disable-next-line @next/next/no-location-assign-relative-destination
          window.location.assign("/");
        }, 2500);
      } else {
        alert("Une erreur est survenue lors de la suppression.");
        setDeleting(false);
      }
    } catch {
      clearLocalTraces();
      setDeleteSuccess(true);
      setTimeout(() => {
        // Full reload on purpose: router.refresh() only clears the current route
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.assign("/");
      }, 2500);
    }
  };

  return (
    <AuthGate>
    <div className="w-full max-w-[800px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md md:py-space-lg flex flex-col gap-space-lg">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label text-label-sm w-fit font-semibold mb-1">
          <span aria-hidden="true" className="material-symbols-outlined text-[16px]">tune</span>
          <span>Contrôle Total &amp; Souveraineté</span>
        </div>
        <h1 className="font-display text-display text-on-surface font-bold">
          Paramètres &amp; Confidentialité
        </h1>
        <p className="font-body text-body-md text-on-surface-variant">
          Ta discrétion et tes données.
        </p>
      </div>

      {clearToast && (
        <div className="p-3.5 rounded-xl bg-primary-fixed text-on-primary-fixed-variant font-label text-label-md flex items-center gap-2 animate-fadeIn">
          <span aria-hidden="true" className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Traces de navigation, formulaires et caches locaux effacés.</span>
        </div>
      )}

      {deleteSuccess && (
        <div className="p-4 rounded-xl bg-primary text-on-primary font-label text-label-md flex items-center gap-2 animate-fadeIn">
          <span aria-hidden="true" className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>
            Toutes tes données d&apos;identité et de santé ont été définitivement
            supprimées. Redirection...
          </span>
        </div>
      )}

      {/* Account Info Card */}
      <div className="rounded-2xl bg-surface-container-low p-6 border border-outline-variant/30 flex flex-col gap-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xl font-bold">
              🌸
            </div>
            <div className="flex flex-col">
              <span className="font-label text-label-xs text-on-surface-variant uppercase font-semibold">
                Pseudonyme Actif
              </span>
              <span className="font-headline text-headline-sm text-on-surface font-bold">
                {user.pseudonym || "Invitée"}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            type="button"
            className="px-4 py-2 rounded-full border border-outline-variant/40 hover:bg-surface-container font-label text-label-sm text-on-surface transition-colors"
          >
            Se déconnecter
          </button>
        </div>

        <div className="p-3 rounded-xl bg-surface-container-lowest text-xs font-mono text-on-surface-variant flex items-center justify-between">
          <span>Identifiant anonyme opaque :</span>
          <span className="font-bold text-primary">
            {user.anonId ? `${user.anonId.slice(0, 14)}...` : "anon_local_guest"}
          </span>
        </div>
      </div>

      {/* Discretion Options */}
      <div className="rounded-2xl bg-surface-container-lowest p-6 border border-outline-variant/30 flex flex-col gap-5 shadow-xs">
        <h2 className="font-headline text-headline-sm text-on-surface font-bold">
          Discrétion &amp; Sécurité physique
        </h2>

        {/* Toggle Mode Discret */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
          <div className="flex flex-col">
            <span className="font-label text-label-md text-on-surface font-semibold">
              Mode Discret (Floutage instantané)
            </span>
            <p className="font-body text-body-sm text-on-surface-variant">
              Floute tes infos sensibles à l&apos;écran.
            </p>
          </div>
          <button
            onClick={toggleDiscreetMode}
            type="button"
            className={`w-12 h-7 rounded-full transition-colors relative shrink-0 ${
              isDiscreetMode ? "bg-primary" : "bg-outline-variant"
            }`}
            title="Activer/Désactiver"
          >
            <span
              className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${
                isDiscreetMode ? "right-1" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Clear Local Traces */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="font-label text-label-md text-on-surface font-semibold">
              Effacer les traces locales
            </span>
            <p className="font-body text-body-sm text-on-surface-variant">
              Efface l&apos;historique de ce navigateur.
            </p>
          </div>
          <button
            onClick={handleClearTraces}
            type="button"
            className="px-4 py-2 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label text-label-sm font-semibold transition-colors shrink-0"
          >
            Nettoyer le cache
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-surface-container-low p-6 border border-outline-variant/30 flex flex-col gap-3">
        <h2 className="font-headline text-headline-sm text-on-surface font-bold">
          Sessions actives
        </h2>
        {sessions.length === 0 ? (
          <p className="font-body text-body-sm text-on-surface-variant">
            Aucune session enregistrée pour le moment.
          </p>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-container-lowest"
            >
              <span className="font-body text-body-sm text-on-surface-variant">
                Ouverte le {new Date(session.createdAt).toLocaleString("fr-FR")}
              </span>
              <button
                type="button"
                className="font-label text-label-sm text-tertiary"
                onClick={async () => {
                  await fetch(`/api/auth/sessions?id=${session.id}`, {
                    method: "DELETE",
                  });
                  setSessions((prev) => prev.filter((s) => s.id !== session.id));
                }}
              >
                Révoquer
              </button>
            </div>
          ))
        )}
      </div>

      {/* Danger Zone: Delete Data */}
      <div className="rounded-2xl bg-tertiary-fixed/20 p-6 border border-tertiary-container/30 flex flex-col gap-4 shadow-xs">
        <div className="flex items-center gap-2 text-tertiary font-headline text-headline-sm font-bold">
          <span aria-hidden="true" className="material-symbols-outlined text-[22px]">
            delete_forever
          </span>
          <span>Droit à l&apos;oubli absolu</span>
        </div>

        <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
          Supprime définitivement ton compte et toutes tes données. C&apos;est irréversible.
        </p>

        {showConfirmDelete ? (
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-error/40 flex flex-col gap-3 animate-fadeIn">
            <span className="font-label text-label-sm text-error font-bold">
              ⚠️ Es-tu certaine de vouloir tout effacer ? Cette action est irréversible.
            </span>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 rounded-full font-label text-label-sm text-on-surface-variant hover:bg-surface-container"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDeleteAllData}
                disabled={deleting}
                className="px-5 py-2 rounded-full bg-error text-on-error font-label text-label-sm font-bold hover:bg-error/90 transition-all shadow-xs disabled:opacity-50"
              >
                {deleting ? "Suppression en cours..." : "Oui, supprimer tout maintenant"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-start">
            <button
              onClick={() => setShowConfirmDelete(true)}
              type="button"
              className="px-5 py-2.5 rounded-full bg-tertiary text-on-tertiary font-label text-label-md font-semibold hover:bg-tertiary-container transition-colors shadow-xs"
            >
              Supprimer toutes mes données
            </button>
          </div>
        )}
      </div>
    </div>
    </AuthGate>
  );
}

