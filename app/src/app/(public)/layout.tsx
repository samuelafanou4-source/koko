import { AppShell } from "@/components/layout/AppShell";
import { PublicNavbar } from "@/components/layout/PublicNavbar";

/** Public pages: landing, sign-up, login, charter, SOS, offline. */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell variant="public" header={<PublicNavbar />}>
      {children}
    </AppShell>
  );
}
