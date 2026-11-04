"use client";

import { createContext, useContext } from "react";

export interface SessionUser {
  pseudonym: string;
  role: string;
  /** First characters of the opaque anonId, shown in the settings only. */
  anonIdHint: string;
}

const SessionContext = createContext<SessionUser | null>(null);

/** Filled by the platform layout from the server-verified session. */
export function SessionProvider({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  return <SessionContext.Provider value={user}>{children}</SessionContext.Provider>;
}

/** The logged-in user. Only usable inside the (platform) route group. */
export function useSessionUser(): SessionUser {
  const user = useContext(SessionContext);
  if (!user) {
    throw new Error("useSessionUser must be used inside the platform layout");
  }
  return user;
}
