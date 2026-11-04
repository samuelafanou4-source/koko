"use client";

import { useEffect } from "react";
import { ErrorScreen } from "./ErrorScreen";
import { reportClientError } from "@/lib/client-errors";

function digestOf(error: unknown): string | undefined {
  return error instanceof Error && "digest" in error
    ? String((error as { digest?: unknown }).digest ?? "") || undefined
    : undefined;
}

/** Shared body of the error.tsx boundaries. */
export function BoundaryScreen({
  error,
  retry,
  where,
  homeHref,
  homeLabel,
}: {
  error: unknown;
  retry: () => void;
  where: string;
  homeHref?: string;
  homeLabel?: string;
}) {
  useEffect(() => {
    reportClientError(where, error);
  }, [error, where]);

  return (
    <ErrorScreen
      title="Oups, cette page n'a pas pu s'afficher"
      message="Ce n'est pas de ta faute et tes données sont en sécurité. Réessaie dans un instant."
      onRetry={retry}
      homeHref={homeHref}
      homeLabel={homeLabel}
      reference={digestOf(error)}
    />
  );
}
