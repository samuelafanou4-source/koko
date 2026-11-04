"use client";

import { BoundaryScreen } from "@/components/errors/BoundaryScreen";

/** Platform pages: the error stays inside the logged-in layout (navigation kept). */
export default function PlatformError({ error, retry }: { error: unknown; retry: () => void }) {
  return (
    <BoundaryScreen
      error={error}
      retry={retry}
      where="platform-page"
      homeHref="/tableau-de-bord"
      homeLabel="Retour à mon espace"
    />
  );
}
