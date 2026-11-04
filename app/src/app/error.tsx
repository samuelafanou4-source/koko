"use client";

import { BoundaryScreen } from "@/components/errors/BoundaryScreen";

/** Error boundary for every page that has no closer one. */
export default function RootError({ error, retry }: { error: unknown; retry: () => void }) {
  return <BoundaryScreen error={error} retry={retry} where="page" />;
}
