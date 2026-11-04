import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { SessionProvider } from "@/components/auth/SessionProvider";
import { requireSession } from "@/lib/session";
import { parseInactivityTimeout } from "@/lib/inactivity";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Logged-in platform. The session is verified here on the server (JWT +
 * session table), and again by every private page and API route: the proxy
 * is only a first, optimistic filter.
 */
export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();

  return (
    <SessionProvider user={{
        pseudonym: session.pseudonym,
        role: session.role,
        anonIdHint: session.anonId.slice(0, 14),
      }}>
      <AppShell
        variant="platform"
        inactivityTimeoutMinutes={parseInactivityTimeout(process.env.INACTIVITY_TIMEOUT_MINUTES)}
      >
        {children}
      </AppShell>
    </SessionProvider>
  );
}
