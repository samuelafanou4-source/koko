"use client";

import "./globals.css";
import { BoundaryScreen } from "@/components/errors/BoundaryScreen";

/** Last resort: the root layout itself failed. Renders its own document. */
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="fr">
      <body className="bg-surface text-on-surface antialiased min-h-screen flex flex-col font-body">
        <title>Koko — Un souci est survenu</title>
        <main className="flex-1 flex items-center">
          <BoundaryScreen error={error} retry={retry} where="global" />
        </main>
      </body>
    </html>
  );
}
